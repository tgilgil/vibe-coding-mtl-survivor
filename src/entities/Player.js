export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        this.scene = scene;
        this.health = 100;
        this.maxHealth = 100;
        this.xp = 0;
        this.displayXP = 0;
        this.level = 1;
        this.speed = 200;
        this.lastAttackTime = 0;
        this.attackCooldown = 500;
        this.projectileDamage = 1;
        this.xpMultiplier = 1;

        // Aura weapon properties
        this.hasAura = false;
        this.auraRadius = 50;
        this.auraDamage = 1;
        this.auraDamageInterval = 500; // Damage tick every 0.5 seconds
        this.lastAuraDamageTime = 0;
        this.auraGraphics = scene.add.graphics();
        this.updateAuraVisual();

        // Stasis weapon properties
        this.hasStasis = false;
        this.stasisRadius = 200; // Doubled radius
        this.stasisDuration = 5000; // 5 seconds
        this.stasisCooldown = 4000; // 4 seconds
        this.lastStasisTime = 0;
        this.activeStasis = null;
        this.stasisGraphics = scene.add.graphics();

        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set collision boundary
        this.setCircle(20);
        this.setCollideWorldBounds(true);
        
        // Enable physics body
        this.body.enable = true;
        this.body.setAllowGravity(false);
        this.body.setImmovable(false);
        this.body.setBounce(0);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        if (this.health <= 0) {
            this.scene.gameOver();
        }
        this.scene.updateUI();
    }

    gainXP(amount) {
        this.xp += amount * this.xpMultiplier;
        if (this.xp >= this.level * 100) {
            this.levelUp();
        }
        this.scene.updateUI();
    }

    levelUp() {
        this.level++;
        this.xp = 0;
        this.displayXP = 0;
        this.scene.showUpgradeOptions();
    }

    updateAuraVisual() {
        this.auraGraphics.clear();
        if (this.hasAura) {
            this.auraGraphics.lineStyle(2, 0x4CAF50, 0.3);
            this.auraGraphics.fillStyle(0x4CAF50, 0.1);
            this.auraGraphics.strokeCircle(this.x, this.y, this.auraRadius);
            this.auraGraphics.fillCircle(this.x, this.y, this.auraRadius);
        }
    }

    applyUpgrade(type, amount) {
        switch (type) {
            case 'damage':
                this.projectileDamage += amount;
                break;
            case 'attackSpeed':
                this.attackCooldown = Math.max(100, this.attackCooldown - amount);
                break;
            case 'health':
                this.maxHealth += amount;
                this.health = this.maxHealth;
                break;
            case 'xpGain':
                this.xpMultiplier += amount;
                break;
            case 'aura':
                if (!this.hasAura) {
                    this.hasAura = true;
                } else {
                    this.auraRadius += amount.radius || 0;
                    this.auraDamage += amount.damage || 0;
                }
                break;
            case 'stasis':
                if (!this.hasStasis) {
                    this.hasStasis = true;
                } else {
                    this.stasisRadius += amount.radius || 0;
                    this.stasisDuration += amount.duration || 0;
                }
                break;
        }
        this.scene.resumeGame();
    }

    updateDisplayXP() {
        const diff = this.xp - this.displayXP;
        if (Math.abs(diff) < 0.1) {
            this.displayXP = this.xp;
        } else {
            this.displayXP += diff * 0.1; // Smooth animation
        }
    }

    createStasis() {
        if (!this.hasStasis) return;
        
        const time = this.scene.time.now;
        if (time - this.lastStasisTime < this.stasisCooldown) return;

        // Clear any existing stasis
        if (this.activeStasis) {
            this.activeStasis.destroy();
        }

        // Create new stasis field
        this.activeStasis = {
            x: this.x,
            y: this.y,
            radius: this.stasisRadius,
            createdAt: time,
            destroy: () => {
                this.stasisGraphics.clear();
                this.activeStasis = null;
            }
        };

        this.lastStasisTime = time;
    }

    destroy() {
        // Clean up graphics
        if (this.auraGraphics) {
            this.auraGraphics.destroy();
        }
        if (this.stasisGraphics) {
            this.stasisGraphics.destroy();
        }
        super.destroy();
    }

    updateStasisVisual() {
        if (!this.stasisGraphics) return;
        
        this.stasisGraphics.clear();
        if (this.activeStasis) {
            const progress = 1 - ((this.scene.time.now - this.activeStasis.createdAt) / this.stasisDuration);
            if (progress <= 0) {
                this.activeStasis.destroy();
                return;
            }

            // Draw stasis field
            this.stasisGraphics.lineStyle(2, 0x9C27B0, 0.5 * progress);
            this.stasisGraphics.fillStyle(0x9C27B0, 0.2 * progress);
            this.stasisGraphics.strokeCircle(this.activeStasis.x, this.activeStasis.y, this.activeStasis.radius);
            this.stasisGraphics.fillCircle(this.activeStasis.x, this.activeStasis.y, this.activeStasis.radius);
        }
    }

    update() {
        // Movement
        const cursors = this.scene.cursors;
        const speed = this.speed;

        // Reset velocity
        this.body.setVelocity(0);

        const wasd = this.scene.wasd;

        let vx = 0;
        let vy = 0;

        // Handle horizontal movement
        if (cursors.left.isDown || wasd.left.isDown) {
            vx = -speed;
        } else if (cursors.right.isDown || wasd.right.isDown) {
            vx = speed;
        }

        // Handle vertical movement
        if (cursors.up.isDown || wasd.up.isDown) {
            vy = -speed;
        } else if (cursors.down.isDown || wasd.down.isDown) {
            vy = speed;
        }

        // Apply velocity
        if (vx !== 0 || vy !== 0) {
            const vector = new Phaser.Math.Vector2(vx, vy).normalize().scale(speed);
            this.body.setVelocity(vector.x, vector.y);
        }

        // Update aura position and check for damage
        if (this.hasAura) {
            this.updateAuraVisual();
            
            const time = this.scene.time.now;
            if (time - this.lastAuraDamageTime > this.auraDamageInterval) {
                // Get all enemies in range
                const enemies = this.scene.enemies.getChildren();
                enemies.forEach(enemy => {
                    const distance = Phaser.Math.Distance.Between(
                        this.x, this.y,
                        enemy.x, enemy.y
                    );
                    if (distance <= this.auraRadius) {
                        enemy.takeDamage(this.auraDamage);
                    }
                });
                this.lastAuraDamageTime = time;
            }
        }

        // Auto attack
        const time = this.scene.time.now;
        if (time - this.lastAttackTime > this.attackCooldown) {
            this.scene.createProjectile();
            this.lastAttackTime = time;
        }

        // Auto stasis
        this.createStasis();
        this.updateStasisVisual();

        // Apply stasis effect to enemies
        if (this.activeStasis) {
            const enemies = this.scene.enemies.getChildren();
            enemies.forEach(enemy => {
                // Reset enemy tint (debug visualization)
                enemy.setTint(0xffffff);
                
                const distance = Phaser.Math.Distance.Between(
                    enemy.x, enemy.y,
                    this.activeStasis.x, this.activeStasis.y
                );
                
                if (distance <= this.activeStasis.radius) {
                    // Debug visualization: tint enemies in stasis range
                    enemy.setTint(0x9C27B0);
                    
                    const angle = Phaser.Math.Angle.Between(
                        enemy.x, enemy.y,
                        this.activeStasis.x, this.activeStasis.y
                    );
                    
                    // Calculate stasis pull force (stronger near center)
                    const distanceRatio = distance / this.activeStasis.radius;
                    const force = 600 * Math.pow(1 - distanceRatio, 3);
                    
                    // Calculate stasis pull vector
                    const forceVector = new Phaser.Math.Vector2();
                    this.scene.physics.velocityFromRotation(angle, force, forceVector);
                    
                    // Calculate direction to player for normal movement
                    const toPlayer = new Phaser.Math.Vector2(
                        this.scene.player.x - enemy.x,
                        this.scene.player.y - enemy.y
                    ).normalize();
                    
                    // Combine normal movement (slowed) with stasis pull
                    const slowdownFactor = 0.3; // Enemies move at 30% speed in stasis
                    enemy.body.velocity.x = (enemy.speed * toPlayer.x * slowdownFactor) - forceVector.x;
                    enemy.body.velocity.y = (enemy.speed * toPlayer.y * slowdownFactor) - forceVector.y;
                }
            });
        }
    }
}
