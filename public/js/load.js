let loadState = {
  preload: function() {
    let loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    })

    game.load.image('menu', 'assets/horrorterror.jpg')
    game.load.image('sky', 'assets/deep-space.jpg')
    game.load.image('player', 'assets/thrust_ship2.png')
    game.load.image('obstacle1', 'assets/asteroid1.png')
    game.load.image('obstacle2', 'assets/asteroid2.png')
    game.load.image('obstacle3', 'assets/asteroid3.png')
    game.load.image('obstacle4', 'assets/asteroid4.png')
    game.load.image('obstacle5', 'assets/asteroid5.png')
    game.load.image('obstacle6', 'assets/asteroid6.png')
    game.load.image('obstacle7', 'assets/asteroid7.png')
    game.load.image('obstacle8', 'assets/asteroid8.png')
    game.load.image('obstacle9', 'assets/asteroid9.png')
    game.load.image('obstacle10', 'assets/asteroid10.png')
    game.load.image('obstacle11', 'assets/asteroid11.png')
    game.load.image('playerBullet', 'assets/shmup-bullet.png')
    game.load.image('purpleSquid', 'assets/space-baddie-purple.png')
    game.load.image('greenSquid', 'assets/space-baddie.png')
    game.load.image('ufo', 'assets/ufo.png')
    game.load.image('enemyBullet', 'assets/shmup-baddie-bullet.png')
    game.load.image('bossBullet', 'assets/bullet1.png')
    game.load.spritesheet('explosion', 'assets/explode1.png', 128, 128)
  },
  create: function() {
    game.state.start('menu')
  }
}
