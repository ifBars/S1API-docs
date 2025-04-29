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
- `S1API.DeadDrops` - Managing dead drop locations and items
- `S1API.GameTime` - Accessing and manipulating game time
- `S1API.Items` - Creating and managing game items
- `S1API.Leveling` - Player progression and experience systems
- `S1API.Money` - Currency management
- `S1API.NPCs` - Non-player character creation and management
- `S1API.PhoneApp` - Phone application functionality
- `S1API.Products` - Store products and purchasing
- `S1API.Quests` - Creating and managing quests
- `S1API.Storages` - Container and inventory management

## Utilities

Helper systems for mod development:
- `S1API.SaveSystem` - Data persistence for mods
- `S1API.Internal` - Internal utilities for cross-compatibility

## Key Concepts

### Cross-Compatibility

All API classes and methods are designed to work seamlessly across both Mono and Il2Cpp builds. The implementation details are abstracted away, allowing you to focus on your mod's functionality.

### Type Safety

S1API provides type-safe wrappers around game objects and functions, helping prevent common errors and making your code more robust.

## Usage Example

### Accessing the API

```csharp
using S1API.Items;

var itemDef = ItemManager.GetItemDefinition("cuke");
```