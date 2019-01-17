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
}

// initialize objects
let obstacles
let stars
let player

let cursors
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
      getRandomInt(100, 800),
      getRandomInt(100, 500),
      'obstacle'
    )
    box.body.immovable = true
  }

  // creating star
  stars = game.add.group()
  stars.enableBody = true

  let star
  for (let i = 0; i < 5; i++) {
    star = stars.create(getRandomInt(100, 800), getRandomInt(100, 500), 'star')
    star.body.immovable = true
  }

  // creating player
  player = game.add.sprite(
    getRandomInt(100, 800),
    getRandomInt(100, 500),
    'player'
  )
  game.physics.arcade.enable(player)
  player.body.collideWorldBounds = true
  // player.body.gravity.y = 300;

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
}

// Behavior founctions
function hitStar(player, star) {
  // Move the star
  star.x = getRandomInt(100, 800)
  star.y = getRandomInt(100, 500)

  // Add and update the score
  score += 10
  scoreText.text = 'Score: ' + score
}

// Utility functions
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
