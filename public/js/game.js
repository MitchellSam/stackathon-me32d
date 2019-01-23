/* eslint-disable no-loop-func */
/* eslint-disable complexity */
/* eslint-disable max-statements */

let score = 0

let gameState = {
    create: function () {
        //creating background
        this.sky = game.add.sprite(0, 0, 'sky')
        this.sky.scale.x = 2
        this.sky.scale.y = 2

        // sound
        music.mute = false
        this.explosionAudio = game.add.audio('explosionAudio')
        this.explosionAudio.volume = 0.5
        this.bulletAudio = game.add.audio('bulletAudio')
        this.bulletAudio.volume = 0.3

        // creating obstacles
        this.obstacles = game.add.group()
        this.obstacles.enableBody = true
        const randomObstacle = ['obstacle1', 'obstacle2', 'obstacle3', 'obstacle4', 'obstacle5', 'obstacle6', 'obstacle7', 'obstacle8', 'obstacle9', 'obstacle10', 'obstacle11']

        for (let i = 0; i < 40; i++) {
            let singleObstacle = this.obstacles.create(
                game.rnd.integerInRange(1, 80) * 10,
                game.rnd.integerInRange(1, 60) * 10,
                randomObstacle[game.rnd.integerInRange(0, 11)]
            )
            singleObstacle.body.velocity.x = game.rnd.integerInRange(0, 20)
            singleObstacle.body.velocity.y = game.rnd.integerInRange(0, 20)
            // singleObstacle.body.immovable = true
        }

        // Player bullet group
        this.playerBullets = game.add.group()
        this.playerBullets.enableBody = true
        this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE
        this.playerBullets.createMultiple(30, 'playerBullet')
        this.playerBullets.setAll('anchor.x', 0.5)
        this.playerBullets.setAll('anchor.y', 0.5)
        this.playerBullets.setAll('scale.x', 1.5)
        this.playerBullets.setAll('scale.y', 1.5)
        this.playerBullets.setAll('outOfBoundsKill', true)
        this.playerBullets.setAll('checkWorldBounds', true)
        this.playerBulletTimer = 0

        // enemy bullets
        this.enemyBullets = game.add.group()
        this.enemyBullets.enableBody = true
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE
        this.enemyBullets.createMultiple(30, 'enemyBullet')
        this.enemyBullets.setAll('anchor.x', 0.5)
        this.enemyBullets.setAll('anchor.y', 0.5)
        this.enemyBullets.setAll('scale.x', 1.5)
        this.enemyBullets.setAll('scale.y', 1.5)
        this.enemyBullets.setAll('outOfBoundsKill', true)
        this.enemyBullets.setAll('checkWorldBounds', true)
        this.enemyBulletTimer = 0

        // creating player
        this.player = game.add.sprite(400, 500, 'player')
        this.player.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this.player)
        this.player.body.collideWorldBounds = true
        this.player.body.setCircle()

        // creating player controls
        this.keyboard = game.input.keyboard

        // creating green squid enemy group
        this.greenSquid = game.add.group()
        this.greenSquid.enableBody = true
        this.greenSquid.physicsBodyType = Phaser.Physics.ARCADE

        for (let i = 0; i < 25; i++) {
            let singleGreenSquid = this.greenSquid.create(
                game.rnd.integerInRange(1, 80) * 10,
                game.rnd.integerInRange(1, 40) * 10,
                'greenSquid'
            )
            singleGreenSquid.anchor.setTo(0.5, 0.5)
            singleGreenSquid.scale.x = 2
            singleGreenSquid.scale.y = 2
            singleGreenSquid.damageAmount = 20
            singleGreenSquid.health = 10
            singleGreenSquid.body.velocity.x = game.rnd.integerInRange(0, 20)
            singleGreenSquid.body.velocity.y = game.rnd.integerInRange(0, 20)
        }

        // creating purple squid enemy group
        this.purpleSquid = game.add.group()
        this.purpleSquid.enableBody = true
        this.purpleSquid.physicsBodyType = Phaser.Physics.ARCADE

        for (let i = 0; i < 10; i++) {
            let singlePurpleSquid = this.purpleSquid.create(
                game.rnd.integerInRange(1, 80) * 10,
                game.rnd.integerInRange(1, 40) * 10,
                'purpleSquid'
            )
            singlePurpleSquid.anchor.setTo(0.5, 0.5)
            singlePurpleSquid.scale.x = 2
            singlePurpleSquid.scale.y = 2
            singlePurpleSquid.damageAmount = 20
            singlePurpleSquid.health = 30
            singlePurpleSquid.body.velocity.x = game.rnd.integerInRange(0, 20)
            singlePurpleSquid.body.velocity.y = game.rnd.integerInRange(0, 20)

            this.game.time.events.loop(
                game.rnd.integerInRange(1, 4) * 1000,
                function () {
                    this.game.add.tween(singlePurpleSquid).to(
                        {
                            x: this.game.world.randomX,
                            y: this.game.world.randomY
                        },
                        3000,
                        Phaser.Easing.Quadratic.InOut,
                        true
                    )
                },
                this
            )
        }

        // boss bullets
        this.bossBullets = game.add.group()
        this.bossBullets.enableBody = true
        this.bossBullets.physicsBodyType = Phaser.Physics.ARCADE
        this.bossBullets.createMultiple(30, 'bossBullet')
        this.bossBullets.setAll('anchor.x', 0.5)
        this.bossBullets.setAll('anchor.y', 0.5)
        this.bossBullets.setAll('outOfBoundsKill', true)
        this.bossBullets.setAll('checkWorldBounds', true)
        this.bossBulletTimer = 0

        // creating boss
        this.boss = game.add.sprite(400, 150, 'ufo')
        this.boss.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this.boss)
        this.boss.enableBody = true
        this.boss.physicsBodyType = Phaser.Physics.ARCADE
        this.boss.scale.x = 2
        this.boss.scale.y = 2
        this.boss.body.maxVelocity.setTo(100, 80)
        this.boss.body.collideWorldBounds = true
        this.boss.damageAmount = 50
        this.boss.health = 200

        //  creating explosion group
        this.explosions = game.add.group()
        this.explosions.enableBody = true
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE
        this.explosions.createMultiple(30, 'explosion')
        this.explosions.setAll('anchor.x', 0.5)
        this.explosions.setAll('anchor.y', 0.5)
        this.explosions.forEach(function (explosion) {
            explosion.animations.add('explosion')
        })

        //  create player health display
        this.player.health = 100
        this.playerHealth = game.add.text(
            game.world.width - 150,
            10,
            'Health: ' + this.player.health + '%',
            { font: '20px Arial', fill: '#fff' }
        )
        this.playerHealth.updateHealth = health => {
            this.playerHealth.text = 'Health: ' + health + '%'
        }

        // create score display
        this.score = 0
        this.scoreText = game.add.text(10, 10, '', {
            font: '20px Arial',
            fill: '#fff'
        })
        this.scoreText.updateScore = () => {
            this.scoreText.text = 'Score: ' + this.score
        }
        this.scoreText.updateScore()

        // create crosshair
        this.crosshair = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'crosshair')
        this.crosshair.anchor.setTo(0.5, 0.5)
        this.crosshair.scale.x = 0.5
        this.crosshair.scale.y = 0.5
    },
    update: function () {
        // define movement
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0

        if (this.keyboard.isDown(Phaser.Keyboard.A)) {
            //  Move left
            this.player.body.velocity.x = -150
        }
        if (this.keyboard.isDown(Phaser.Keyboard.D)) {
            //  Move right
            this.player.body.velocity.x = 150
        }
        if (this.keyboard.isDown(Phaser.Keyboard.W)) {
            //  Move up
            this.player.body.velocity.y = -150
        }
        if (this.keyboard.isDown(Phaser.Keyboard.S)) {
            //  Move down
            this.player.body.velocity.y = 150
        }

        // update the angle of the player sprite to the mouse cursor
        this.player.rotation = game.physics.arcade.angleToPointer(this.player)

        //update crosshair location
        this.moveCrosshair()

        // fire bullets from the player sprite
        if (this.player.alive && game.input.mousePointer.isDown) {
            this.fireBullet()
        }

        // move the enemies
        this.greenSquid.forEachAlive(this.moveGreenSquid, this)
        this.moveBoss()

        // make a purple squid fire at the player
        if (game.time.now > this.enemyBulletTimer) {
            this.purpleSquidFires()
        }

        //make the boss fire at the player
        if (game.time.now > this.bossBulletTimer) {
            this.bossFires()
        }

        //  Check collisions
        game.physics.arcade.collide(this.obstacles, this.obstacles)
        game.physics.arcade.collide(this.player, this.obstacles)
        game.physics.arcade.collide(this.greenSquid, this.obstacles)
        game.physics.arcade.collide(this.purpleSquid, this.obstacles)
        game.physics.arcade.collide(this.boss, this.obstacles)
        game.physics.arcade.collide(this.greenSquid, this.greenSquid)

        // touch damage
        game.physics.arcade.overlap(
            this.player,
            this.greenSquid,
            this.playerCollide,
            null,
            this
        )
        game.physics.arcade.overlap(
            this.player,
            this.purpleSquid,
            this.playerCollide,
            null,
            this
        )
        game.physics.arcade.overlap(
            this.player,
            this.boss,
            this.playerCollide,
            null,
            this
        )

        // shooting enemies
        game.physics.arcade.overlap(
            this.greenSquid,
            this.playerBullets,
            this.playerHitEnemy,
            null,
            this
        )
        game.physics.arcade.overlap(
            this.purpleSquid,
            this.playerBullets,
            this.playerHitEnemy,
            null,
            this
        )
        game.physics.arcade.overlap(
            this.boss,
            this.playerBullets,
            this.playerHitEnemy,
            null,
            this
        )

        // shot by enemies
        game.physics.arcade.overlap(
            this.enemyBullets,
            this.player,
            this.enemyHitPlayer,
            null,
            this
        )
        game.physics.arcade.overlap(
            this.bossBullets,
            this.player,
            this.enemyHitPlayer,
            null,
            this
        )
        //shot obstacle
        // game.physics.arcade.overlap(
        //     this.obstacles,
        //     this.playerBullets,
        //     this.shotObstacle,
        //     null,
        //     this
        // )
        game.physics.arcade.collide(
            this.obstacles, 
            this.playerBullets, 
            this.shotObstacle, 
            null, 
            this
        )
        game.physics.arcade.collide(
            this.obstacles,
            this.enemyBullets,
            this.shotObstacle,
            null,
            this
        )

        //  Game over
        if (!this.player.alive) {
            this.loss()
        }

        // Game won
        let livingEnemies = []
        this.purpleSquid.forEachAlive(function (squid) {
            livingEnemies.push(squid)
        })
        this.greenSquid.forEachAlive(function (squid) {
            livingEnemies.push(squid)
        })
        if (livingEnemies.length === 0 && !this.boss.alive) {
            this.win()
        }
    },
    fireBullet: function () {
        if (game.time.now > this.playerBulletTimer) {
            const BULLET_SPEED = 400
            const BULLET_SPACING = 100
            let bullet = this.playerBullets.getFirstExists(false)
            if (bullet) {
                let bulletOffset = Math.sin(game.math.degToRad(this.player.angle))
                bullet.reset(this.player.x + bulletOffset, this.player.y)
                bullet.angle = this.player.angle
                game.physics.arcade.velocityFromAngle(
                    bullet.angle,
                    BULLET_SPEED,
                    bullet.body.velocity
                )
                this.playerBulletTimer = game.time.now + BULLET_SPACING
                this.bulletAudio.play()
            }
        }
    },
    moveGreenSquid: function (squid) {
        this.accelerateToObject(squid, this.player, 50)
    },
    moveBoss: function () {
        if (this.boss.y > 140) {
            this.boss.body.acceleration.y = -50
        } else {
            this.boss.body.acceleration.y = 50
        }

        if (this.boss.x > this.player.x + 50) {
            this.boss.body.acceleration.x = -50
        } else if (this.boss.x < this.player.x - 50) {
            this.boss.body.acceleration.x = 50
        } else {
            this.boss.body.acceleration.x = 0
        }
    },
    accelerateToObject: function (obj1, obj2, speed) {
        if (typeof speed === 'undefined') {
            speed = 60
        }
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x)
        obj1.body.rotation = angle + game.math.degToRad(90)
        obj1.body.velocity.x = Math.cos(angle) * speed
        obj1.body.velocity.y = Math.sin(angle) * speed
    },
    purpleSquidFires: function () {
        let enemyBullet = this.enemyBullets.getFirstExists(false)
        let livingEnemies = []

        this.purpleSquid.forEachAlive(function (squid) {
            livingEnemies.push(squid)
        })

        if (enemyBullet && livingEnemies.length > 0) {
            let random = game.rnd.integerInRange(0, livingEnemies.length - 1)
            let shooter = livingEnemies[random]
            enemyBullet.reset(shooter.body.x + 20, shooter.body.y + 20)

            enemyBullet.damageAmount = 10
            let angle = game.physics.arcade.moveToObject(
                enemyBullet,
                this.player,
                120
            )
            enemyBullet.angle = game.math.radToDeg(angle) + 180
            this.enemyBulletTimer = game.time.now + 1000
            this.bulletAudio.play()
        }
    },
    bossFires: function () {
        let bossBullet = this.bossBullets.getFirstExists(false)
        if (bossBullet && this.boss.alive) {
            bossBullet.reset(this.boss.body.x + 25, this.boss.body.y + 30)
            bossBullet.damageAmount = 20
            let angle = game.physics.arcade.moveToObject(bossBullet, this.player, 120)
            bossBullet.angle = game.math.radToDeg(angle) + 90
            this.bossBulletTimer = game.time.now + 1000
            this.bulletAudio.play()
        }
    },
    playerCollide: function (player, enemy) {
        let explosion = this.explosions.getFirstExists(false)
        explosion.reset(
            enemy.body.x + enemy.body.halfWidth,
            enemy.body.y + enemy.body.halfHeight
        )
        explosion.body.velocity.y = enemy.body.velocity.y
        explosion.alpha = 0.7
        explosion.play('explosion', 30, false, true)
        this.explosionAudio.play()

        enemy.damage(this.player.health)
        player.damage(enemy.damageAmount)
        this.playerHealth.updateHealth(player.health)
    },
    playerHitEnemy: function (enemy, bullet) {
        let explosion = this.explosions.getFirstExists(false)
        explosion.reset(
            bullet.body.x + bullet.body.halfWidth,
            bullet.body.y + bullet.body.halfHeight
        )
        explosion.body.velocity.y = enemy.body.velocity.y
        explosion.alpha = 0.7
        explosion.play('explosion', 30, false, true)
        this.explosionAudio.play()
        enemy.damage(10)
        bullet.kill()

        this.score += 10
        this.scoreText.updateScore()
    },
    enemyHitPlayer: function (player, bullet) {
        let explosion = this.explosions.getFirstExists(false)
        explosion.reset(
            bullet.body.x + bullet.body.halfWidth,
            bullet.body.y + bullet.body.halfHeight
        )
        explosion.body.velocity.y = player.body.velocity.y
        explosion.alpha = 0.7
        explosion.play('explosion', 30, false, true)
        this.explosionAudio.play()

        bullet.kill()
        player.damage(bullet.damageAmount)
        this.playerHealth.updateHealth(player.health)
    },
    shotObstacle: function (obstacle, bullet) {
        bullet.kill()
    },
    requestLock: function () {
        game.input.mouse.requestPointerLock();
    },
    moveCrosshair: function () {
        this.crosshair.x = game.input.mousePointer.x
        this.crosshair.y = game.input.mousePointer.y
    },
    win: function () {
        score = this.score
        game.state.start('win')
    },
    loss: function () {
        score = this.score
        game.state.start('loss')
    }
}
