let music

let menuState = {
  create: function() {
    music = game.add.audio('music')
    music.volume = 0.5
    music.play()

    game.add.sprite(0, 0, 'menu')
    this.title = game.add.text(
      game.world.centerX,
      game.world.centerY,
      'Squid Invaders',
      {
        font: '84px Arial',
        fill: '#fff'
      }
    )
    this.title.anchor.setTo(0.5, 0.5)

    this.instructions = game.add.text(
      game.world.centerX,
      game.world.centerY + 60,
      'Press the spacebar to start',
      {
        font: '25px Arial',
        fill: '#fff'
      }
    )
    this.instructions.anchor.setTo(0.5, 0.5)

    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  update: function() {
    if (this.spacebar.isDown) {
      this.start()
    }
  },
  start: function() {
    game.state.start('game')
  }
}
