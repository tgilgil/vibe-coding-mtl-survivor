export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, stats = {}) {
        super(scene, x, y, 'enemy');
        
        this.scene = scene;
        this.health = stats.health || 1;
        this.speed = stats.speed || 100;
        this.damage = stats.damage || 5;
        this.erraticness = stats.erraticness || 0;

        // Setup hover tooltip (disabled by default)
        this.speedTooltip = scene.add.text(0, 0, '', {
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: '#000000cc',
            padding: { x: 3, y: 1 },
            visible: false,
            fixedWidth: 80,
            align: 'center'
        });
        this.speedTooltip.alpha = 0;
        this.speedTooltip.setDepth(1000);
        this.speedTooltipEnabled = false;
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set collision boundary
        this.setCircle(15);
        
        // Random movement timer
        if (this.erraticness > 0) {
            this.changeDirectionTimer = scene.time.addEvent({
                delay: Phaser.Math.Between(500, 2000),
                callback: this.randomizeMovement,
                callbackScope: this,
                loop: true
            });
        }
    }
    
    randomizeMovement() {
        if (!this.scene) return; // Check if enemy still exists
        
        // Add random velocity components
        const randomX = Phaser.Math.Between(-50, 50) * this.erraticness;
        const randomY = Phaser.Math.Between(-50, 50) * this.erraticness;
        this.body.velocity.x += randomX;
        this.body.velocity.y += randomY;
        
        // Normalize speed
        const currentSpeed = Math.sqrt(this.body.velocity.x ** 2 + this.body.velocity.y ** 2);
        if (currentSpeed > this.speed) {
            this.body.velocity.x = (this.body.velocity.x / currentSpeed) * this.speed;
            this.body.velocity.y = (this.body.velocity.y / currentSpeed) * this.speed;
        }
    }
    
    showDamageNumber(amount) {
        // Create floating text
        const text = this.scene.add.text(this.x, this.y - this.height/2, `-${amount}`, {
            fontSize: '16px',
            fontStyle: 'bold',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 2
        });
        text.setOrigin(0.5);
        text.setDepth(1000);

        // Animate it floating up and fading out
        this.scene.tweens.add({
            targets: text,
            y: text.y - 30,
            alpha: 0,
            duration: 1000,
            ease: 'Cubic.out',
            onComplete: () => text.destroy()
        });
    }

    takeDamage(amount) {
        this.health -= amount;
        this.showDamageNumber(amount);

        if (this.health <= 0) {
            if (this.changeDirectionTimer) {
                this.changeDirectionTimer.destroy();
            }
            if (this.speedTooltip) {
                this.speedTooltip.destroy();
            }
            this.destroy();
            return true;
        }
        return false;
    }
    
    enableSpeedTooltip() {
        this.speedTooltipEnabled = true;
        this.speedTooltip.alpha = 1;
        this.setInteractive();
        this.on('pointerover', this.showSpeedTooltip, this);
        this.on('pointerout', this.hideSpeedTooltip, this);
    }

    disableSpeedTooltip() {
        this.speedTooltipEnabled = false;
        this.removeInteractive();
        this.off('pointerover', this.showSpeedTooltip, this);
        this.off('pointerout', this.hideSpeedTooltip, this);
        if (this.speedTooltip) {
            this.speedTooltip.setVisible(false);
            this.speedTooltip.alpha = 0;
        }
    }

    showSpeedTooltip() {
        if (!this.scene || !this.speedTooltipEnabled) return;
        const currentSpeed = Math.sqrt(this.body.velocity.x ** 2 + this.body.velocity.y ** 2).toFixed(0);
        const speedRatio = (currentSpeed / this.speed * 100).toFixed(0);
        
        // Add stasis indicator if enemy is affected
        const inStasis = this.scene.player.activeStasis && 
            Phaser.Math.Distance.Between(
                this.x, this.y,
                this.scene.player.activeStasis.x,
                this.scene.player.activeStasis.y
            ) <= this.scene.player.stasisRadius;

        this.speedTooltip.setText(
            `Spd: ${currentSpeed}\n` +
            `${speedRatio}%` +
            (inStasis ? '\n*STASIS*' : '')
        );
        this.speedTooltip.setVisible(true);
    }

    hideSpeedTooltip() {
        if (this.speedTooltip) {
            this.speedTooltip.setVisible(false);
        }
    }

    update() {
        if (!this.scene || !this.scene.player) return;
        
        // Check if in stasis field
        const inStasis = this.scene.player.activeStasis && 
            Phaser.Math.Distance.Between(
                this.x, this.y,
                this.scene.player.activeStasis.x,
                this.scene.player.activeStasis.y
            ) <= this.scene.player.stasisRadius;

        // Only update velocity if not in stasis (stasis handles movement in Player.js)
        if (!inStasis) {
            // Calculate direction to player
            const dx = this.scene.player.x - this.x;
            const dy = this.scene.player.y - this.y;
            const angle = Math.atan2(dy, dx);
            
            // Set velocity towards player
            this.scene.physics.velocityFromRotation(
                angle,
                this.speed,
                this.body.velocity
            );
        }

        // Update tooltip position if visible
        if (this.speedTooltip && this.speedTooltip.visible) {
            this.speedTooltip.setPosition(
                this.x - this.speedTooltip.width / 2,
                this.y - this.height - this.speedTooltip.height - 5
            );
            this.showSpeedTooltip(); // Update the text
        }
    }

}
