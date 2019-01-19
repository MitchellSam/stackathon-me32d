let gameState = {
  create: function() {
    game.add.sprite(0, 0, 'sky')

    // creating obstacles
    this.obstacles = game.add.group()
    this.obstacles.enableBody = true

    let box
    for (let i = 0; i < 40; i++) {
      box = this.obstacles.create(
        getRandomInt(1, 80) * 10,
        getRandomInt(1, 60) * 10,
        // i*20,
        // 550,
        'obstacle'
      )
      box.body.immovable = true
    }

    // creating enemies
    this.enemies = game.add.group()
    this.enemies.enableBody = true

    let squid
    for (let i = 0; i < 5; i++) {
      squid = this.enemies.create(
        getRandomInt(1, 80) * 10,
        getRandomInt(1, 60) * 10,
        'squid'
      )
      squid.body.immovable = true
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
    // this.player.body.gravity.y = 300;

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon = game.add.weapon(30, 'bullet')

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
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

    // game.world.wrap(this.player, 16)

    let targetAngle =
      360 /
      (2 * Math.PI) *
      game.math.angleBetween(
        this.player.x,
        this.player.y,
        this.game.input.activePointer.x,
        this.game.input.activePointer.y
      )
    if (targetAngle < 0) {
      targetAngle += 360
    }
    this.player.angle = targetAngle
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
