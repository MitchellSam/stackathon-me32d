const DidThisRun2 = here => {
  console.log(`did this run in: ${here}`)
}
DidThisRun2('boot.js')

let bootState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.state.start('load')
  }
}
