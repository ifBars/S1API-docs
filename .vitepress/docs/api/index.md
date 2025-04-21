# S1API Reference

Welcome to the S1API reference documentation. This section provides detailed information about all the classes, methods, and properties available in S1API.

## Core API

The Core API provides the foundation for S1API, containing the base classes and functionality that powers the entire framework.

### S1API Namespace

The main namespace contains the core functionality and entry points for the API. It serves as the foundation for cross-compatibility between Mono and Il2Cpp builds.

```csharp
using S1API;
```

### Saveables System

The Saveables system provides base classes and interfaces for creating objects that can be saved and loaded as part of the game's save system.

```csharp
using S1API.Saveables;
```

#### Key Saveables Classes

- `ISaveable` - The base interface for all saveable objects
- `SaveableBase` - An abstract base class implementing common save/load functionality
- `SaveableManager` - Manages registration and tracking of saveable objects

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

### Performance Considerations

While S1API abstracts away many implementation details, it's designed to minimize performance overhead. However, for extremely performance-critical operations, you might want to consider direct access to game functions.

## Usage Examples

### Accessing the API

```csharp
// Basic API initialization
var api = S1API.Instance;

// Check if the game is running in Il2Cpp mode
bool isIl2Cpp = S1API.IsIl2Cpp;
```

### Creating a Saveable Object

```csharp
public class MyModData : SaveableBase
{
    public string PlayerNickname { get; set; }
    public int CustomScore { get; set; }
    
    // Override to save custom properties
    public override void Save(SaveData saveData)
    {
        base.Save(saveData);
        saveData.WriteValue("playerNickname", PlayerNickname);
        saveData.WriteValue("customScore", CustomScore);
    }
    
    // Override to load custom properties
    public override void Load(SaveData saveData)
    {
        base.Load(saveData);
        PlayerNickname = saveData.ReadValue<string>("playerNickname");
        CustomScore = saveData.ReadValue<int>("customScore");
    }
} 
```

## Getting Started

If you're new to S1API, we recommend starting with the Core section to understand the fundamental concepts, then exploring the specific game systems relevant to your mod development needs. 