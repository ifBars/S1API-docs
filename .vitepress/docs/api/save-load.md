# Save/Load System

The S1API Save/Load system provides a standardized way to persist mod data across game sessions. This system is designed to work consistently across both Mono and Il2Cpp builds.

## Overview

The save/load system handles:
- Serialization and deserialization of mod data
- File I/O operations
- Version migration support
- Data validation

## Core Classes

### ModData

The `ModData` class is the foundation of the save/load system:

```csharp
public class ModData
{
    public string ModId { get; }
    public Version Version { get; }
    public Dictionary<string, object> Data { get; }
    
    public ModData(string modId, Version version)
    {
        ModId = modId;
        Version = version;
        Data = new Dictionary<string, object>();
    }
    
    public T GetValue<T>(string key, T defaultValue = default);
    public void SetValue<T>(string key, T value);
    public bool HasKey(string key);
    public void RemoveKey(string key);
}
```

### SaveLoadManager

The `SaveLoadManager` provides static methods for saving and loading mod data:

```csharp
public static class SaveLoadManager
{
    public static bool SaveModData(ModData data);
    public static ModData LoadModData(string modId, Version currentVersion);
    public static bool DeleteModData(string modId);
    public static bool ModDataExists(string modId);
}
```

## Basic Usage

### Saving Data

```csharp
// Create a new ModData instance
var modData = new ModData("MyAwesomeMod", new Version(1, 0, 0));

// Store your mod's data
modData.SetValue("playerScore", 100);
modData.SetValue("unlockedItems", new List<string> { "sword", "shield", "potion" });
modData.SetValue("lastPosition", new Vector3(10, 5, 20));

// Save the data
SaveLoadManager.SaveModData(modData);
```

### Loading Data

```csharp
// Load existing data or create new data if none exists
var modData = SaveLoadManager.LoadModData("MyAwesomeMod", new Version(1, 0, 0));

// Retrieve values with defaults if the key doesn't exist
int playerScore = modData.GetValue<int>("playerScore", 0);
List<string> unlockedItems = modData.GetValue<List<string>>("unlockedItems", new List<string>());
Vector3 lastPosition = modData.GetValue<Vector3>("lastPosition", Vector3.zero);
```

## Advanced Features

### Version Migration

The save/load system supports automatic version migration:

```csharp
// Register a migration handler
SaveLoadManager.RegisterMigration("MyAwesomeMod", new Version(1, 0, 0), new Version(2, 0, 0), 
    (oldData) => {
        var newData = new ModData("MyAwesomeMod", new Version(2, 0, 0));
        
        // Migrate player score with a multiplier for the new version
        int oldScore = oldData.GetValue<int>("playerScore", 0);
        newData.SetValue("playerScore", oldScore * 2);
        
        // Migrate other data...
        
        return newData;
    });
```

### Custom Type Serialization

For custom types, you'll need to register serialization handlers:

```csharp
// Register custom type serializer
SaveLoadManager.RegisterTypeSerializer<MyCustomClass>(
    // Serialization function
    (value) => {
        return JsonUtility.ToJson(value);
    },
    // Deserialization function
    (json) => {
        return JsonUtility.FromJson<MyCustomClass>(json);
    }
);
```

### Data Validation

You can validate data during loading:

```csharp
var modData = SaveLoadManager.LoadModData("MyAwesomeMod", new Version(1, 0, 0));

// Validate player score
int playerScore = modData.GetValue<int>("playerScore", 0);
if (playerScore < 0 || playerScore > 1000000) {
    // Reset to a reasonable value if invalid
    playerScore = 0;
    modData.SetValue("playerScore", playerScore);
    // Save the corrected data
    SaveLoadManager.SaveModData(modData);
}
```

## Best Practices

1. **Always specify default values** when retrieving data
2. **Keep serialized data simple** - avoid complex object graphs 
3. **Handle version migrations gracefully** - be prepared for missing or differently structured data
4. **Save infrequently** - avoid performance issues by only saving when necessary
5. **Validate loaded data** - never trust saved data to be valid
6. **Use descriptive key names** - choose clear, namespaced keys to avoid conflicts 