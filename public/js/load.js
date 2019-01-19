let loadState = {
  preload: function() {
    let loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    })

    game.load.image('sky', 'assets/sky.png')
    game.load.image('player', 'assets/player.png')
    game.load.image('obstacle', 'assets/coin.png')
    game.load.image('star', 'assets/star.png')
    game.load.image('bullet', 'assets/shmup-bullet.png')
    game.load.image('squid', 'assets/space-baddie-purple.png')
  },
  create: function() {
    game.state.start('menu')
  }
}
