export class XPOrb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'xporb');
        
        this.scene = scene;
        this.value = 10;
        this.speed = 200;
        this.magnetRadius = 100;
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set collision boundary
        this.setCircle(8);
        
        // Set up lifetime
        scene.time.delayedCall(10000, () => {
            this.destroy();
        });
    }
    
    update() {
        const player = this.scene.player;
        const distance = Phaser.Math.Distance.Between(
            this.x, this.y,
            player.x, player.y
        );
        
        // Move towards player if within magnet radius
        if (distance <= this.magnetRadius + (player.level * 10)) {
            const angle = Phaser.Math.Angle.Between(
                this.x, this.y,
                player.x, player.y
            );
            
            this.scene.physics.velocityFromRotation(
                angle,
                this.speed * (1 - distance / this.magnetRadius), // Faster when closer
                this.body.velocity
            );
        } else {
            this.setVelocity(0);
        }
    }
}
