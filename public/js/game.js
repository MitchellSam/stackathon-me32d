/* eslint-disable max-statements */

let gameState = {
  create: function() {
    //creating background
    game.add.sprite(0, 0, 'sky')

    // creating obstacles
    this.obstacles = game.add.group()
    this.obstacles.enableBody = true

    let box
    for (let i = 0; i < 40; i++) {
      box = this.obstacles.create(
        getRandomInt(1, 80) * 10,
        getRandomInt(1, 60) * 10,
        'obstacle'
      )
      box.body.immovable = true
    }

    //  An explosion pool
    this.explosions = game.add.group()
    this.explosions.createMultiple(30, 'kaboom')
    this.explosions.forEach(this.setupExplosion, this)

    // // creating enemy weapon
    // this.enemyWeapon = game.add.weapon(30, 'enemyBullet')
    // this.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    // this.enemyWeapon.bulletSpeed = 400
    // this.enemyWeapon.fireRate = 25
    // // make the enemyWeapon to track the 'squid' Sprite
    // this.enemyWeapon.trackSprite(this.enemies, 0, 0, true)

    // The enemy's bullets
    this.enemyBullets = game.add.group()
    this.enemyBullets.enableBody = true
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE
    this.enemyBullets.createMultiple(30, 'enemyBullet')
    this.enemyBullets.setAll('anchor.x', 0.5)
    this.enemyBullets.setAll('anchor.y', 1)
    this.enemyBullets.setAll('outOfBoundsKill', true)
    this.enemyBullets.setAll('checkWorldBounds', true)

    // creating enemies
    this.enemies = game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE

    let squid
    for (let i = 0; i < 5; i++) {
      squid = this.enemies.create(
        getRandomInt(1, 80) * 10,
        getRandomInt(1, 60) * 10,
        'squid'
      )
      squid.anchor.setTo(0.5, 0.5)
      // squid.body.immovable = true
    }

    // creating star
    this.stars = game.add.group()
    this.stars.enableBody = true

    for (let i = 0; i < 5; i++) {
      let singleStar = this.stars.create(
        getRandomInt(1, 80) * 10,
        getRandomInt(1, 60) * 10,
        'star'
      )
      singleStar.body.immovable = true
    }

    // creating player
    this.player = game.add.sprite(
      getRandomInt(1, 80) * 10,
      getRandomInt(1, 60) * 10,
      'player'
    )
    this.player.anchor.setTo(0.5, 0.5)
    game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true
    this.player.body.setCircle()

    // creating player weapon
    this.weapon = game.add.weapon(30, 'bullet')
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
    this.weapon.bulletSpeed = 600
    this.weapon.fireRate = 100
    // make the weapon to track the 'player' Sprite
    this.weapon.trackSprite(this.player, 0, 0, true)

    // creating movement controls
    this.keyboard = game.input.keyboard

    // create score
    this.score = 0
    this.scoreText = game.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    })
  },
  update: function() {
    this.hitObstacle = game.physics.arcade.collide(this.player, this.obstacles)
    game.physics.arcade.overlap(
      this.player,
      this.stars,
      this.touchStar,
      null,
      this
    )
    game.physics.arcade.overlap(
      this.weapon.bullets,
      this.enemies,
      this.shotSquid,
      null,
      this
    )
    game.physics.arcade.overlap(
      this.weapon.bullets,
      this.obstacles,
      this.shotObstacle,
      null,
      this
    )

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

    if (game.input.mousePointer.isDown) {
      this.weapon.fire()
    }

    // update the angle of the player sprite to the mouse cursor
    this.player.rotation = game.physics.arcade.angleToPointer(this.player)
  },
  setupExplosion: function(exp) {
    exp.anchor.x = 0.5
    exp.anchor.y = 0.5
    exp.animations.add('kaboom')
  },
  touchStar: function(player, star) {
    // // Move the star
    star.x = getRandomInt(1, 80) * 10
    star.y = getRandomInt(1, 60) * 10

    // Add and update the score
    this.score += 10
    this.scoreText.text = 'Score: ' + this.score
  },
  shotSquid: function(bullet, squid) {
    bullet.kill()

    let explosion = this.explosions.getFirstExists(false)
    explosion.reset(squid.body.x, squid.body.y)
    explosion.play('kaboom', 30, false, true)

    squid.x = getRandomInt(1, 80) * 10
    squid.y = getRandomInt(1, 60) * 10

    // Add and update the score
    this.score += 10
    this.scoreText.text = 'Score: ' + this.score
  },
  shotObstacle: function(bullet, obstacle) {
    bullet.kill()
  },
  win: function() {
    game.state.start('win')
  },
  loss: function() {
    game.state.start('loss')
  }
}

// Utility functions
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
