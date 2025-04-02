import { GameScene } from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth - 40,
    height: window.innerHeight - 40,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);

// Handle window resizing
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth - 40, window.innerHeight - 40);
});

// Enable hot reloading
if (import.meta.hot) {
    import.meta.hot.accept();
}
