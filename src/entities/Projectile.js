export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'projectile');
        
        this.scene = scene;
        this.speed = 300;
        this.target = null;
        this.damage = scene.player.projectileDamage;

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set collision boundary
        this.setCircle(5);

        // Find closest enemy and set initial direction
        this.findTarget();

        // Destroy after 2 seconds
        scene.time.delayedCall(2000, () => {
            this.destroy();
        });
    }

    findTarget() {
        const enemies = this.scene.enemies.getChildren();
        if (enemies.length === 0) {
            // No enemies? Just go in the direction the player is facing or right if not moving
            const player = this.scene.player;
            const velocity = player.body.velocity;
            const angle = velocity.length() > 0 ? 
                Math.atan2(velocity.y, velocity.x) : 
                0;
            this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
            return;
        }

        // Find the closest enemy
        let closestEnemy = enemies[0];
        let closestDistance = Phaser.Math.Distance.Between(
            this.x, this.y,
            closestEnemy.x, closestEnemy.y
        );

        for (let i = 1; i < enemies.length; i++) {
            const enemy = enemies[i];
            const distance = Phaser.Math.Distance.Between(
                this.x, this.y,
                enemy.x, enemy.y
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }

        this.target = closestEnemy;
        this.updateVelocity();
    }

    updateVelocity() {
        if (!this.target || !this.target.active) {
            this.findTarget();
            return;
        }

        // Calculate angle to target
        const angle = Phaser.Math.Angle.Between(
            this.x, this.y,
            this.target.x, this.target.y
        );

        // Set velocity towards target
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
    }
}
