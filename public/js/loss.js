let lossState = {
  create: function() {
    game.add.sprite(0, 0, 'menu')
    this.gameOver = game.add.text(
      game.world.centerX,
      game.world.centerY - 60,
      'GAME OVER',
      {
        font: '84px Arial',
        fill: '#fff'
      }
    )
    this.gameOver.anchor.setTo(0.5, 0.5)

    this.score = game.add.text(
      game.world.centerX,
      game.world.centerY + 10,
      'Score: ' + score,
      {
        font: '50px Arial',
        fill: '#fff'
      }
    )
    this.score.anchor.setTo(0.5, 0.5)

    this.instructions = game.add.text(
      game.world.centerX,
      game.world.centerY + 60,
      'Press the spacebar to restart',
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
