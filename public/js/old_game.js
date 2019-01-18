const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})

function preload() {
  // load assets
  game.load.image('sky', 'assets/sky.png')
  game.load.image('player', 'assets/player.png')
  game.load.image('obstacle', 'assets/coin.png')
  game.load.image('star', 'assets/star.png')
  game.load.image('bullet', 'assets/shmup-bullet.png')
}

// initialize objects
let obstacles
let stars
let player
let weapon

let cursors
let fireButton

let score = 0
let scoreText

function create() {
  // initialize world
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.add.sprite(0, 0, 'sky')

  // creating obstacles
  obstacles = game.add.group()
  obstacles.enableBody = true

  let box
  for (let i = 0; i < 30; i++) {
    box = obstacles.create(
      getRandomInt(1, 800),
      getRandomInt(1, 600),
      'obstacle'
    )
    box.body.immovable = true
  }

  // creating star
  stars = game.add.group()
  stars.enableBody = true

  let star
  for (let i = 0; i < 5; i++) {
    star = stars.create(getRandomInt(1, 800), getRandomInt(1, 600), 'star')
    star.body.immovable = true
  }

  // creating player
  player = game.add.sprite(getRandomInt(1, 800), getRandomInt(1, 600), 'player')
  player.anchor.setTo(0.5, 0.5)
  game.physics.arcade.enable(player)
  // player.body.collideWorldBounds = true
  // player.body.gravity.y = 300;

  //  Creates 30 bullets, using the 'bullet' graphic
  weapon = game.add.weapon(30, 'bullet')

  //  The bullet will be automatically killed when it leaves the world bounds
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

  //  The speed at which the bullet is fired
  weapon.bulletSpeed = 600

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
  weapon.fireRate = 100

  //  Tell the Weapon to track the 'player' Sprite
  //  With no offsets from the position
  //  But the 'true' argument tells the weapon to track sprite rotation
  weapon.trackSprite(player, 0, 0, true)

  // fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  // creating movement controls
  cursors = game.input.keyboard.createCursorKeys()

  // create score
  scoreText = game.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  })
}

function update() {
  let hitObstacle = game.physics.arcade.collide(player, obstacles)
  game.physics.arcade.overlap(player, stars, hitStar, null, this)

  // define movement
  player.body.velocity.x = 0
  player.body.velocity.y = 0

  if (cursors.left.isDown) {
    //  Move left
    player.body.velocity.x = -150
  }
  if (cursors.right.isDown) {
    //  Move right
    player.body.velocity.x = 150
  }
  if (cursors.up.isDown) {
    //  Move up
    player.body.velocity.y = -150
  }
  if (cursors.down.isDown) {
    //  Move down
    player.body.velocity.y = 150
  }

  // if (fireButton.isDown) {
  //     weapon.fire();
  // }

  if (game.input.mousePointer.isDown) {
    weapon.fire()
  }

  game.world.wrap(player, 16)

  let targetAngle =
    360 /
    (2 * Math.PI) *
    game.math.angleBetween(
      player.x,
      player.y,
      this.game.input.activePointer.x,
      this.game.input.activePointer.y
    )
  if (targetAngle < 0) {
    targetAngle += 360
  }
  player.angle = targetAngle
}

// Behavior founctions
function hitStar(player, star) {
  // Move the star
  star.x = getRandomInt(1, 800)
  star.y = getRandomInt(1, 600)

  // Add and update the score
  score += 10
  scoreText.text = 'Score: ' + score

  player.alpha = 0
  //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
  let tween = game.add.tween(player).to({alpha: 1}, 100, 'Linear', true, 0, -1)

  //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
  //  The 3000 tells it to wait for 3 seconds before starting the fade back.
  tween.yoyo(true, 3000)
}

// Utility functions
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
