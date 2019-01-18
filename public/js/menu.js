const DidThisRun4 = here => {
  console.log(`did this run in: ${here}`)
}
DidThisRun4('menu.js')

let menuState = {
  create: function() {
    let titleLabel = game.add.text(80, 80, 'Title', {
      font: '50px Arial',
      fill: '#ffffff'
    })
    let startLabel = game.add.text(80, 150, 'Press W to start', {
      font: '25px Arial',
      fill: '#ffffff'
    })
    let startKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    startKey.onDown.addOnce(this.start, this)
  },
  start: function() {
    game.state.start('game')
  }
}
