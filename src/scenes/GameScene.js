import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Projectile } from '../entities/Projectile';
import { XPOrb } from '../entities/XPOrb';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Create background tiles and decorations
        const bgGraphics = this.add.graphics();

        // Grass tile (32x32)
        bgGraphics.clear();
        // Base grass
        bgGraphics.fillStyle(0x66BB6A);  // Light green
        bgGraphics.fillRect(0, 0, 32, 32);
        // Grass detail
        bgGraphics.fillStyle(0x4CAF50);  // Darker green
        bgGraphics.fillRect(4, 8, 2, 4);   // Grass blade 1
        bgGraphics.fillRect(12, 4, 2, 6);  // Grass blade 2
        bgGraphics.fillRect(20, 6, 2, 4);  // Grass blade 3
        bgGraphics.fillRect(28, 8, 2, 4);  // Grass blade 4
        bgGraphics.generateTexture('grass', 32, 32);

        // Path tile (32x32)
        bgGraphics.clear();
        bgGraphics.fillStyle(0xD7CCC8);  // Light brown
        bgGraphics.fillRect(0, 0, 32, 32);
        // Path texture
        bgGraphics.fillStyle(0xBCAAA4);  // Darker brown
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((i + j) % 2 === 0) {
                    bgGraphics.fillRect(i * 8, j * 8, 4, 4);
                }
            }
        }
        bgGraphics.generateTexture('path', 32, 32);

        // Tree (64x64)
        bgGraphics.clear();
        // Trunk
        bgGraphics.fillStyle(0x795548);  // Brown
        bgGraphics.fillRect(28, 32, 8, 32);
        // Leaves
        bgGraphics.fillStyle(0x2E7D32);  // Dark green
        bgGraphics.fillRect(16, 8, 32, 32);
        bgGraphics.fillRect(8, 16, 48, 24);
        // Leaf highlights
        bgGraphics.fillStyle(0x388E3C);  // Lighter green
        bgGraphics.fillRect(20, 12, 8, 8);
        bgGraphics.fillRect(36, 12, 8, 8);
        bgGraphics.fillRect(12, 20, 8, 8);
        bgGraphics.fillRect(44, 20, 8, 8);
        bgGraphics.generateTexture('tree', 64, 64);

        // Bench (48x24)
        bgGraphics.clear();
        // Bench legs
        bgGraphics.fillStyle(0x4E342E);  // Dark brown
        bgGraphics.fillRect(4, 16, 4, 8);
        bgGraphics.fillRect(40, 16, 4, 8);
        // Bench seat
        bgGraphics.fillStyle(0x795548);  // Brown
        bgGraphics.fillRect(0, 8, 48, 8);
        // Bench back
        bgGraphics.fillRect(0, 0, 48, 4);
        bgGraphics.fillRect(0, 4, 4, 4);
        bgGraphics.fillRect(44, 4, 4, 4);
        bgGraphics.generateTexture('bench', 48, 24);

        // Bush (32x24)
        bgGraphics.clear();
        bgGraphics.fillStyle(0x388E3C);  // Green
        bgGraphics.fillRect(4, 4, 24, 16);
        bgGraphics.fillRect(0, 8, 32, 12);
        // Bush highlights
        bgGraphics.fillStyle(0x43A047);  // Lighter green
        bgGraphics.fillRect(8, 6, 6, 6);
        bgGraphics.fillRect(20, 6, 6, 6);
        bgGraphics.generateTexture('bush', 32, 24);

        bgGraphics.destroy();

        // Create pixel art graphics
        const graphics = this.add.graphics();
        
        // Player (pixel art hipster)
        graphics.clear();
        
        // Base color for skin
        graphics.fillStyle(0xFFD7B5);
        graphics.fillRect(12, 8, 16, 16);  // Head
        
        // Hair (dark brown)
        graphics.fillStyle(0x4A3421);
        graphics.fillRect(10, 4, 20, 8);   // Top hair
        graphics.fillRect(8, 8, 4, 12);    // Side hair left
        graphics.fillRect(28, 8, 4, 12);   // Side hair right
        
        // Glasses (black)
        graphics.fillStyle(0x000000);
        graphics.fillRect(12, 12, 6, 2);   // Left lens
        graphics.fillRect(22, 12, 6, 2);   // Right lens
        graphics.fillRect(18, 12, 4, 1);   // Bridge
        
        // Beard (dark brown)
        graphics.fillStyle(0x4A3421);
        graphics.fillRect(14, 20, 12, 4);  // Beard
        
        // Plaid shirt (pixel pattern)
        graphics.fillStyle(0x2E4A9F);      // Dark blue base
        graphics.fillRect(10, 24, 20, 12); // Shirt body
        graphics.fillStyle(0xCC0000);      // Red plaid
        graphics.fillRect(12, 26, 2, 8);   // Vertical stripes
        graphics.fillRect(20, 26, 2, 8);
        graphics.fillRect(10, 28, 20, 2);  // Horizontal stripes
        graphics.fillRect(10, 32, 20, 2);
        
        // Generate final texture
        graphics.generateTexture('player', 40, 40);
        
        // Enemy (Montreal construction cone)
        graphics.clear();
        
        // Base shape (orange)
        graphics.fillStyle(0xFF6D00);  // Bright orange
        graphics.beginPath();
        graphics.moveTo(15, 2);      // Top point
        graphics.lineTo(28, 28);     // Bottom right
        graphics.lineTo(2, 28);      // Bottom left
        graphics.closePath();
        graphics.fill();
        
        // White reflective stripes
        graphics.fillStyle(0xFFFFFF);
        // Top stripe
        graphics.fillRect(8, 10, 14, 3);
        // Middle stripe
        graphics.fillRect(6, 16, 18, 3);
        // Bottom stripe
        graphics.fillRect(4, 22, 22, 3);
        
        // Black base
        graphics.fillStyle(0x000000);
        graphics.fillRect(2, 28, 26, 2);
        
        // Add subtle glow
        graphics.lineStyle(1, 0xFFA726, 0.4);  // Light orange glow
        graphics.strokePath();
        
        graphics.generateTexture('enemy', 30, 30);
        
        // Projectile (glowing pixel)
        graphics.clear();
        graphics.fillStyle(0xFFC107);
        graphics.fillRect(3, 3, 4, 4);
        graphics.lineStyle(1, 0xFFE082, 0.6);
        graphics.strokeRect(2, 2, 6, 6);
        graphics.generateTexture('projectile', 10, 10);

        // XP Orb (Montreal-style sesame bagel)
        graphics.clear();

        // Base bagel shape (golden brown)
        graphics.fillStyle(0xD4A44C);  // Bagel base color
        graphics.beginPath();
        graphics.arc(8, 8, 7, 0, Math.PI * 2);
        graphics.fill();

        // Hole in the middle
        graphics.fillStyle(0x000000);
        graphics.beginPath();
        graphics.arc(8, 8, 2, 0, Math.PI * 2);
        graphics.fill();

        // Darker crust edges
        graphics.lineStyle(1, 0xA67C3D);
        graphics.strokeCircle(8, 8, 7);
        graphics.strokeCircle(8, 8, 2);

        // Sesame seeds (small white dots)
        graphics.fillStyle(0xFFF3E0);
        // Top seeds
        graphics.fillRect(8, 2, 1, 1);
        graphics.fillRect(6, 3, 1, 1);
        graphics.fillRect(10, 3, 1, 1);
        // Right seeds
        graphics.fillRect(13, 8, 1, 1);
        graphics.fillRect(12, 6, 1, 1);
        // Bottom seeds
        graphics.fillRect(8, 14, 1, 1);
        graphics.fillRect(6, 13, 1, 1);
        graphics.fillRect(10, 13, 1, 1);
        // Left seeds
        graphics.fillRect(3, 8, 1, 1);
        graphics.fillRect(4, 6, 1, 1);

        // Add subtle glow for fresh-baked effect
        graphics.lineStyle(1, 0xFFB74D, 0.3);
        graphics.strokeCircle(8, 8, 8);

        graphics.generateTexture('xporb', 16, 16);
        
        graphics.destroy();
    }

    createParkBackground() {
        // Create a grid of grass tiles as base
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        for (let x = 0; x < width; x += 32) {
            for (let y = 0; y < height; y += 32) {
                this.add.image(x, y, 'grass').setOrigin(0, 0);
            }
        }

        // Add winding pathway
        const pathPoints = [
            {x: 0, y: height/2},
            {x: width/4, y: height/3},
            {x: width/2, y: height/2},
            {x: 3*width/4, y: 2*height/3},
            {x: width, y: height/2}
        ];

        // Create path tiles along the curve
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const start = pathPoints[i];
            const end = pathPoints[i + 1];
            const steps = 10;
            for (let j = 0; j <= steps; j++) {
                const x = start.x + (end.x - start.x) * (j/steps);
                const y = start.y + (end.y - start.y) * (j/steps);
                // Add path tile and surrounding tiles for width
                for (let ox = -32; ox <= 32; ox += 32) {
                    this.add.image(x + ox, y, 'path').setOrigin(0, 0);
                }
            }
        }

        // Add trees
        const treePositions = [
            {x: 100, y: 100},
            {x: width - 200, y: 150},
            {x: width/2, y: height - 200},
            {x: 150, y: height - 150},
            {x: width - 150, y: height - 250}
        ];
        treePositions.forEach(pos => {
            this.add.image(pos.x, pos.y, 'tree').setDepth(pos.y);
        });

        // Add benches
        const benchPositions = [
            {x: width/4, y: height/3 + 50},
            {x: 3*width/4, y: 2*height/3 - 50}
        ];
        benchPositions.forEach(pos => {
            this.add.image(pos.x, pos.y, 'bench').setDepth(pos.y);
        });

        // Add bushes
        const bushPositions = [
            {x: 50, y: 200},
            {x: width - 80, y: 180},
            {x: width/2 - 200, y: height - 100},
            {x: width/2 + 200, y: height - 120},
            {x: 120, y: height - 80},
            {x: width - 100, y: height - 150}
        ];
        bushPositions.forEach(pos => {
            this.add.image(pos.x, pos.y, 'bush').setDepth(pos.y);
        });
    }

    create() {
        // Game state
        this.isPaused = false;
        this.gameTime = 0;
        this.difficultyLevel = 1;
        this.debugMode = false;
        this.showSpeedLabels = false;

        // Setup physics pause group
        this.physicsGroup = this.add.group();

        // Create park background
        this.createParkBackground();

        // Setup debug console
        this.setupDebugConsole();
        
        // Start difficulty scaling timer
        this.time.addEvent({
            delay: 45000, // Every 45 seconds (slower difficulty scaling)
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });

        // Display game time
        this.timeText = this.add.text(16, this.cameras.main.height - 40, 'Time: 0:00', {
            fontSize: '24px',
            fill: '#fff'
        });
        this.timeText.setScrollFactor(0);

        // Update game time every second
        this.time.addEvent({
            delay: 1000,
            callback: this.updateGameTime,
            callbackScope: this,
            loop: true
        });
        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create player
        this.player = new Player(
            this,
            this.cameras.main.centerX,
            this.cameras.main.centerY
        );

        // Create groups
        this.enemies = this.add.group();
        this.projectiles = this.add.group();
        this.xporbs = this.add.group();

        // Setup enemy spawning
        this.spawner = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Setup collisions
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.projectiles,
            this.enemies,
            this.handleProjectileEnemyCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.xporbs,
            this.handlePlayerXPOrbCollision,
            null,
            this
        );

        // Create UI
        this.createUI();
    }

    createUI() {
        const padding = 20;
        const textStyle = {
            fontSize: '24px',
            fill: '#fff'
        };

        // Create UI container
        this.uiContainer = this.add.container(0, 0);
        
        // Level text
        this.levelText = this.add.text(padding, padding, 'Level: 1', textStyle);

        // XP Bar
        const barWidth = 300;
        const barHeight = 20;
        const barX = padding;
        const barY = padding + 30;

        // Health Bar
        const healthBarY = barY + barHeight + 10;
        
        // Health Bar background
        this.healthBarBg = this.add.rectangle(
            barX,
            healthBarY,
            barWidth,
            barHeight,
            0x333333
        );
        this.healthBarBg.setOrigin(0, 0);

        // Health Bar fill
        this.healthBarFill = this.add.rectangle(
            barX,
            healthBarY,
            barWidth, // Initial width (will be updated)
            barHeight,
            0xF44336 // Red color for health
        );
        this.healthBarFill.setOrigin(0, 0);

        // XP Bar background
        this.xpBarBg = this.add.rectangle(
            barX,
            barY,
            barWidth,
            barHeight,
            0x333333
        );
        this.xpBarBg.setOrigin(0, 0);

        // XP Bar fill
        this.xpBarFill = this.add.rectangle(
            barX,
            barY,
            0, // Initial width (will be updated)
            barHeight,
            0x2196F3 // Same blue as XP orbs
        );
        this.xpBarFill.setOrigin(0, 0);

        // Add everything to the UI container
        this.uiContainer.add([
            this.levelText,
            this.xpBarBg,
            this.healthBarBg,
            this.healthBarFill,
            this.xpBarFill
        ]);

        // Make UI stay fixed to camera
        this.uiContainer.setScrollFactor(0);
    }

    updateUI() {
        // Update text
        this.levelText.setText(`Level: ${this.player.level}`);

        // Update XP bar with smooth animation
        const xpNeeded = this.player.level * 100;
        const progress = this.player.displayXP / xpNeeded;
        this.xpBarFill.width = this.xpBarBg.width * progress;

        // Update health bar
        const healthProgress = this.player.health / this.player.maxHealth;
        this.healthBarFill.width = this.healthBarBg.width * healthProgress;
    }

    increaseDifficulty() {
        this.difficultyLevel++;
        
        // Calculate diminishing returns for difficulty scaling
        const diminishingFactor = 1 / (1 + this.difficultyLevel * 0.1); // Reduces impact of higher levels
        
        // Update spawn timer with diminishing returns
        const baseDelay = 1000;
        const reductionPerLevel = 15 * diminishingFactor; // Slower spawn rate reduction
        const newDelay = Math.max(600, baseDelay - (this.difficultyLevel * reductionPerLevel));
        
        // Remove old spawner
        if (this.spawner) {
            this.spawner.destroy();
        }
        
        // Create new spawner
        this.spawner = this.time.addEvent({
            delay: newDelay,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }

    updateGameTime() {
        this.gameTime++;
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        this.timeText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    spawnEnemy() {
        if (this.isPaused) return;

        const padding = 50;
        let x, y;
        
        // Spawn outside the visible area
        if (Phaser.Math.Between(0, 1)) {
            x = Phaser.Math.Between(0, this.cameras.main.width);
            y = Phaser.Math.Between(0, 1) ? -padding : this.cameras.main.height + padding;
        } else {
            x = Phaser.Math.Between(0, 1) ? -padding : this.cameras.main.width + padding;
            y = Phaser.Math.Between(0, this.cameras.main.height);
        }

        // Calculate enemy stats with diminishing returns
        const diminishingFactor = 1 / (1 + this.difficultyLevel * 0.15);
        const stats = {
            health: Math.ceil(1 + (this.difficultyLevel * 0.2 * diminishingFactor)),
            speed: Math.min(200, 100 + (this.difficultyLevel * 3 * diminishingFactor)),
            damage: Math.ceil(3 + (this.difficultyLevel * 0.15 * diminishingFactor)),
            erraticness: Math.min(0.3, this.difficultyLevel * 0.03 * diminishingFactor)
        };

        // Spawn multiple enemies at higher difficulties
        const spawnCount = Math.min(5, 1 + Math.floor(this.difficultyLevel / 3));
        
        for (let i = 0; i < spawnCount; i++) {
            const offsetX = Phaser.Math.Between(-50, 50);
            const offsetY = Phaser.Math.Between(-50, 50);
            const enemy = new Enemy(this, x + offsetX, y + offsetY, stats);
            if (this.showSpeedLabels) {
                enemy.enableSpeedTooltip();
            }
            this.enemies.add(enemy);
        }
    }

    createProjectile() {
        const projectile = new Projectile(
            this,
            this.player.x,
            this.player.y
        );
        this.projectiles.add(projectile);
    }

    handlePlayerEnemyCollision(player, enemy) {
        enemy.destroy();
        player.takeDamage(10);
    }

    handleProjectileEnemyCollision(projectile, enemy) {
        if (enemy.takeDamage(projectile.damage)) {
            // Enemy was destroyed, spawn XP orb
            const xporb = new XPOrb(this, enemy.x, enemy.y);
            this.xporbs.add(xporb);
        }
        projectile.destroy();
    }

    handlePlayerXPOrbCollision(player, xporb) {
        player.gainXP(xporb.value);
        xporb.destroy();
    }



    gameOver() {
        this.scene.pause();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const gameOverText = this.add.text(
            width / 2,
            height / 2,
            'Game Over!\nClick to restart',
            {
                fontSize: '48px',
                fill: '#fff',
                align: 'center'
            }
        ).setOrigin(0.5);
        
        gameOverText.setScrollFactor(0);
        
        this.input.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    showUpgradeOptions() {
        this.isPaused = true;
        this.physics.pause();
        this.spawner.paused = true;

        // Define all possible upgrades
        let upgrades = [
            { type: 'damage', amount: 1, text: 'Increase projectile damage by 1' },
            { type: 'attackSpeed', amount: 50, text: 'Increase attack speed by 10%' },
            { type: 'health', amount: 20, text: 'Increase max health by 20' },
            { type: 'xpGain', amount: 0.2, text: 'Increase XP gain by 20%' }
        ];

        // Add aura upgrades based on player state
        if (!this.player.hasAura) {
            upgrades.push({ type: 'aura', amount: null, text: 'Gain Damage Aura' });
        } else {
            upgrades.push(
                { type: 'aura', amount: { radius: 20 }, text: 'Increase aura radius by 20' },
                { type: 'aura', amount: { damage: 1 }, text: 'Increase aura damage by 1' }
            );
        }

        // Add stasis upgrades based on player state
        if (!this.player.hasStasis) {
            upgrades.push({ type: 'stasis', amount: null, text: 'Gain Stasis Field' });
        } else {
            upgrades.push(
                { type: 'stasis', amount: { radius: 30 }, text: 'Increase stasis radius by 30' },
                { type: 'stasis', amount: { duration: 1000 }, text: 'Increase stasis duration by 1s' }
            );
        }

        // Randomly select 3 unique upgrades
        const selectedUpgrades = Phaser.Utils.Array.Shuffle(upgrades.slice()).slice(0, 3);

        // Create semi-transparent black overlay
        const overlay = this.add.rectangle(
            0, 0,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000, 0.7
        );
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0);

        // Create upgrade options
        const centerX = this.cameras.main.width / 2;
        const startY = this.cameras.main.height / 2 - 100;

        // Level up text
        const levelUpText = this.add.text(centerX, startY - 50, 'Level Up!', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center'
        });
        levelUpText.setOrigin(0.5);
        levelUpText.setScrollFactor(0);

        // Create upgrade buttons
        selectedUpgrades.forEach((upgrade, index) => {
            const button = this.add.rectangle(
                centerX,
                startY + index * 60,
                400,
                50,
                0x4CAF50
            );
            button.setScrollFactor(0);
            button.setInteractive();

            const text = this.add.text(centerX, startY + index * 60, upgrade.text, {
                fontSize: '20px',
                fill: '#fff',
                align: 'center'
            });
            text.setOrigin(0.5);
            text.setScrollFactor(0);

            // Hover effect
            button.on('pointerover', () => button.setFillStyle(0x66BB6A));
            button.on('pointerout', () => button.setFillStyle(0x4CAF50));

            // Click handler
            button.on('pointerdown', () => {
                this.player.applyUpgrade(upgrade.type, upgrade.amount);
                overlay.destroy();
                levelUpText.destroy();
                selectedUpgrades.forEach((_, i) => {
                    this.children.list
                        .filter(child => child.y === startY + i * 60)
                        .forEach(child => child.destroy());
                });
            });
        });
    }

    resumeGame() {
        this.isPaused = false;
        this.physics.resume();
        this.spawner.paused = false;
    }

    setupDebugConsole() {
        // Create console background (hidden by default)
        this.consoleBackground = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            this.cameras.main.width,
            40,
            0x000000,
            0.8
        );
        this.consoleBackground.setDepth(999);
        this.consoleBackground.setScrollFactor(0);
        this.consoleBackground.setOrigin(0.5);
        this.consoleBackground.visible = false;

        // Create console text indicator (hidden by default)
        this.consoleIndicator = this.add.text(
            10,
            this.cameras.main.height - 70,
            '-- CONSOLE ACTIVE --',
            {
                fontSize: '14px',
                fill: '#ffeb3b',
                backgroundColor: '#000000cc',
                padding: { x: 6, y: 4 }
            }
        );
        this.consoleIndicator.setDepth(1000);
        this.consoleIndicator.setScrollFactor(0);
        this.consoleIndicator.visible = false;

        // Create console input (hidden by default)
        const consoleStyle = {
            fontSize: '16px',
            fill: '#fff',
            padding: { x: 10, y: 5 }
        };

        this.consoleInput = this.add.text(10, this.cameras.main.height - 50, '> ', consoleStyle);
        this.consoleInput.setDepth(1000);
        this.consoleInput.setScrollFactor(0);
        this.consoleInput.visible = false;

        // Command aliases
        this.commandAliases = {
            'lu': 'levelup',
            'aa': 'addaura',
            'as': 'addstasis',
            'ls': 'l_speed',
            'h': 'help'
        };

        // Available commands
        this.debugCommands = {
            'levelup': () => {
                this.player.gainXP(this.player.level * 100);
            },
            'addaura': () => {
                this.player.hasAura = true;
                console.log('Aura weapon added');
            },
            'addstasis': () => {
                this.player.hasStasis = true;
                console.log('Stasis weapon added');
            },
            'l_speed': () => {
                this.showSpeedLabels = !this.showSpeedLabels;
                this.enemies.getChildren().forEach(enemy => {
                    if (this.showSpeedLabels) {
                        enemy.enableSpeedTooltip();
                    } else {
                        enemy.disableSpeedTooltip();
                    }
                });
                console.log(this.showSpeedLabels ? 'Speed labels enabled' : 'Speed labels disabled');
            },
            'help': () => {
                console.log('Available commands:\n' +
                    'levelup (lu) - Level up the player\n' +
                    'addaura - Add aura weapon\n' +
                    'addstasis - Add stasis weapon\n' +
                    'l_speed - Toggle speed labels\n' +
                    'help - Show this help message');
            }
        };

        // Toggle console with forward slash key
        this.input.keyboard.on('keydown-FORWARD_SLASH', (event) => {
            event.preventDefault(); // Prevent the slash from being typed
            this.debugMode = !this.debugMode;
            this.consoleInput.visible = this.debugMode;
            
            if (this.debugMode) {
                this.consoleInput.setText('> ');
                this.consoleInput.visible = true;
                this.consoleBackground.visible = true;
                this.consoleIndicator.visible = true;
                // Pause game elements but keep input active
                this.isPaused = true;
                this.physics.pause();
                this.time.paused = true;
                this.spawner.paused = true;
            } else {
                // Hide console elements
                this.consoleInput.visible = false;
                this.consoleBackground.visible = false;
                this.consoleIndicator.visible = false;
                // Resume all game elements
                this.isPaused = false;
                this.physics.resume();
                this.time.paused = false;
                this.spawner.paused = false;
            }
        });

        // Handle input
        this.input.keyboard.on('keydown', (event) => {
            if (!this.debugMode) return;

            if (event.key === 'Enter') {
                let command = this.consoleInput.text.substring(2).trim().toLowerCase();
                
                // Remove leading slash if present
                if (command.startsWith('/')) {
                    command = command.slice(1);
                }

                // Check for alias
                if (this.commandAliases[command]) {
                    command = this.commandAliases[command];
                }

                if (this.debugCommands[command]) {
                    // Temporarily resume game to execute command
                    const wasPaused = this.isPaused;
                    this.isPaused = false;
                    this.physics.resume();
                    this.time.paused = false;
                    this.spawner.paused = false;
                    
                    this.debugCommands[command]();
                    
                    // Restore pause state
                    if (wasPaused) {
                        this.isPaused = true;
                        this.physics.pause();
                        this.time.paused = true;
                        this.spawner.paused = true;
                    }
                } else {
                    console.log('Unknown command. Type "help" for available commands');
                }
                this.consoleInput.setText('> ');
            } else if (event.key === 'Backspace') {
                if (this.consoleInput.text.length > 2) {
                    this.consoleInput.setText(this.consoleInput.text.slice(0, -1));
                }
            } else if (event.key.length === 1) {
                this.consoleInput.setText(this.consoleInput.text + event.key);
            }
        });
    }

    update() {
        if (this.isPaused) return;
        this.player.update();
        this.enemies.getChildren().forEach(enemy => enemy.update());

        // Update XP display animation
        this.player.updateDisplayXP();
        this.updateUI();
    }
}
