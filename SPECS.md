# Vampire Survivor Clone - Game Specifications

## Game Overview
A top-down survival game where the player must survive waves of enemies while automatically attacking and gaining experience to level up.

## Technical Stack
- Framework: Phaser.js 3.60.0
- Language: JavaScript
- Rendering: WebGL (with Canvas fallback)
- Physics: Phaser Arcade Physics

## Core Mechanics

### Player
- **Movement**
  - WASD or Arrow keys for 8-directional movement
  - Movement speed: 200 pixels/second
  - Collision with screen boundaries
  - Normalized diagonal movement

- **Combat**
  - Auto-attack system
  - Base attack cooldown: 500ms
  - Attack cooldown decreases with level
  - Minimum attack cooldown: 100ms

- **Stats**
  - Health: 100
  - Experience points (XP)
  - Level system
  - Collision radius: 20 pixels

### Enemies
- **Spawning**
  - Spawn interval: 1000ms
  - Spawn location: Outside screen boundaries
  - Multiple enemies can spawn simultaneously

- **Behavior**
  - Chase player
  - Movement speed: 100 pixels/second
  - Collision radius: 15 pixels
  - Deals 10 damage on contact

### Projectiles
- **Properties**
  - Speed: 300 pixels/second
  - Targets closest enemy
  - Collision radius: 5 pixels
  - Lifetime: 2 seconds
  - Seeks new target if original is destroyed

- **Behavior**
  - Destroyed on enemy hit
  - Destroyed when off-screen
  - One-hit kill on enemies

### XP Orbs
- **Properties**
  - Spawns when enemy dies
  - Collision radius: 8 pixels
  - Magnet radius: 100 pixels
  - Movement speed: 200 pixels/second
  - Lifetime: 10 seconds
  - Value: 10 XP

- **Behavior**
  - Floats in place when spawned
  - Moves toward player when in magnet radius
  - Collected on player contact
  - Disappears after lifetime expires

### Progression System
- **Experience**
  - XP gained by collecting orbs
  - Level up at: current_level * 100 XP
  - Level-up benefits:
    - Decreased attack cooldown
    - Maintains health
    - Increased magnet radius

### UI Elements
- **HUD**
  - Health display
  - Level counter
  - XP progress
  - Fixed position overlay
  - White text on game canvas

### Game States
1. **Playing**
   - Active gameplay
   - Enemy spawning
   - Player movement
   - Collision detection

2. **Game Over**
   - Triggered at 0 health
   - Display "Game Over" message
   - Click to restart option

## Future Enhancements (Planned)
1. **Weapons System**
   - Multiple weapon types
   - Weapon upgrades
   - Different projectile patterns

2. **Enemy Variety**
   - Different enemy types
   - Enemy health scaling
   - Special abilities

3. **Power-ups**
   - Temporary buffs
   - Health pickups
   - Experience multipliers

4. **Visual Improvements**
   - Sprite animations
   - Particle effects
   - Screen shake
   - Hit feedback

5. **Audio**
   - Background music
   - Sound effects
   - Volume controls

6. **Meta Progression**
   - Permanent upgrades
   - Unlockable characters
   - Achievement system

## Performance Targets
- 60 FPS minimum
- Support for mobile browsers
- Responsive design
- Low memory footprint
- Efficient collision detection
