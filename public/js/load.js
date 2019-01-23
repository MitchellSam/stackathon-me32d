let loadState = {
  preload: function() {
    let loadingLabel = game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    })

    game.load.image('menu', 'assets/images/horrorterror.jpg')
    game.load.image('sky', 'assets/images/deep-space.jpg')
    game.load.image('player', 'assets/images/thrust_ship2.png')
    game.load.image('obstacle1', 'assets/images/asteroid1.png')
    game.load.image('obstacle2', 'assets/images/asteroid2.png')
    game.load.image('obstacle3', 'assets/images/asteroid3.png')
    game.load.image('obstacle4', 'assets/images/asteroid4.png')
    game.load.image('obstacle5', 'assets/images/asteroid5.png')
    game.load.image('obstacle6', 'assets/images/asteroid6.png')
    game.load.image('obstacle7', 'assets/images/asteroid7.png')
    game.load.image('obstacle8', 'assets/images/asteroid8.png')
    game.load.image('obstacle9', 'assets/images/asteroid9.png')
    game.load.image('obstacle10', 'assets/images/asteroid10.png')
    game.load.image('obstacle11', 'assets/images/asteroid11.png')
    game.load.image('playerBullet', 'assets/images/shmup-bullet.png')
    game.load.image('purpleSquid', 'assets/images/space-baddie-purple.png')
    game.load.image('greenSquid', 'assets/images/space-baddie.png')
    game.load.image('ufo', 'assets/images/ufo.png')
    game.load.image('enemyBullet', 'assets/images/shmup-baddie-bullet.png')
    game.load.image('bossBullet', 'assets/images/bullet1.png')
    game.load.spritesheet('explosion', 'assets/images/explode1.png', 128, 128)

    game.load.image('crosshair', 'assets/images/flare_point.png');

    // game.load.audio('music', 'assets/sounds/goaman_intro.mp3')
    game.load.audio('music', 'assets/sounds/Scyphe-Goldrunner_(Maccie_Pimp_Me Up_Remix).mp3')
    game.load.audio('bulletAudio', 'assets/sounds/pistol.wav')
    game.load.audio('explosionAudio', 'assets/sounds/sentry_explode.wav')
  },
  create: function() {
    game.state.start('menu')
  }
}
