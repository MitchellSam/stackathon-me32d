// let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
let game = new Phaser.Game(800, 600, Phaser.AUTO, '')

game.state.add('boot', bootState)
game.state.add('load', loadState)
game.state.add('menu', menuState)
game.state.add('game', gameState)
game.state.add('win', winState)
game.state.add('loss', lossState)

game.state.start('boot')
