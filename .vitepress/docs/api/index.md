# S1API Reference

Welcome to the S1API reference documentation. This section provides detailed information about all the classes, methods, and properties available in S1API.

## Core API

The Core API provides the foundation for S1API, containing the base classes and functionality that powers the entire framework.

### S1API Namespace

The main namespace contains the core functionality and entry points for the API. It serves as the foundation for cross-compatibility between Mono and Il2Cpp builds.

```csharp
using S1API;
```

## Game Systems

Modules for interacting with various game systems:
- `S1API.Console` - Interacting with the in-game console
- `S1API.DeadDrops` - Managing dead drop locations and items
- `S1API.GameTime` - Accessing and manipulating game time
- `S1API.Items` - Creating and managing game items
- `S1API.Leveling` - Player progression and experience systems
- `S1API.Logging` - Logging system for debugging
- `S1API.Map` - Interacting with the game map
- `S1API.Money` - Currency management
- `S1API.NPCs` - Non-player character creation and management
- `S1API.PhoneApp` - Phone application functionality
- `S1API.PhoneCalls` - Phone call functionality
- `S1API.Products` - Store products and purchasing
- `S1API.Property` - Property management
- `S1API.Quests` - Creating and managing quests
- `S1API.Storages` - Container and inventory management
- `S1API.UI` - UI and HUD elements

## Utilities

Helper systems for mod development:
- `S1API.SaveSystem` - Data persistence for mods
- `S1API.Internal` - Internal utilities for cross-compatibility

## Key Concepts

### Cross-Compatibility

All API classes and methods are designed to work seamlessly across both Mono and Il2Cpp builds. The implementation details are abstracted away, allowing you to focus on your mod's functionality.

### Type Safety

S1API provides type-safe wrappers around game objects and functions, helping prevent common errors and making your code more robust.