# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-04-01

### Added
- XP Orb system
  - Enemies drop XP orbs on death
  - Orbs must be collected to gain XP
  - Orbs are attracted to the player within a radius
  - Magnet radius increases with player level
  - Orbs disappear after 10 seconds

## [0.2.1] - 2025-04-01

### Changed
- Updated projectile behavior to target closest enemy instead of shooting in random directions
- Added fallback direction when no enemies are present

## [0.2.0] - 2025-04-01

### Changed
- Refactored entire game to use Phaser.js framework
  - Improved physics using Phaser's Arcade Physics system
  - Better game state management using Phaser's Scene system
  - Enhanced sprite rendering and animation capabilities
  - Improved collision detection using Phaser's physics system
  - More robust input handling with Phaser's input system
  - Better game scaling and window resize handling

## [0.1.0] - 2025-04-01

### Added
- Initial game implementation
  - Player movement using WASD/arrow keys
  - Enemy spawning system with basic chase AI
  - Auto-attack system with projectiles
  - Basic leveling system with XP gain
  - Health system with game over state
  - Simple UI showing health, level, and XP
- Basic HTML structure with canvas
- CSS styling for game UI
- Core game engine with main loop
- Collision detection system
