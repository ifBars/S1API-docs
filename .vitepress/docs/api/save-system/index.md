# Save System API

The Save System API provides a framework for persisting mod data alongside the game's save files.

## Namespace

```csharp
using S1API.Saveables;
```

## Key Components

### SaveableField

An attribute that marks fields to be automatically saved and loaded.

```csharp
[AttributeUsage(AttributeTargets.Field)]
public class SaveableField : Attribute
{
    public SaveableField(string saveName)
    {
        // saveName determines the filename for saving this field
    }
}
```

### ISaveable

Internal interface that defines the contract for saveable objects.

```csharp
internal interface ISaveable : IRegisterable
{
    void SaveInternal(string path, ref List<string> extraSaveables);
    void LoadInternal(string folderPath);
    void OnSaved();
    void OnLoaded();
}
```

### Saveable

Base class that implements the ISaveable interface and provides common save/load functionality.

```csharp
public abstract class Saveable : Registerable, ISaveable
{
    // Implementation of ISaveable interface
    
    // This handles loading fields marked with SaveableField attribute
    internal virtual void LoadInternal(string folderPath)
    {
        // Finds fields with SaveableField attribute
        // Loads data from JSON files
        // Sets field values
    }
    
    // Override these methods in derived classes
    public virtual void OnSaved() { }
    public virtual void OnLoaded() { }
}
```

## Usage Examples

### Basic Save/Load Implementation

```csharp
// Create a class that extends Saveable
public class MyModData : Saveable
{
    // Mark fields to be saved with the SaveableField attribute
    [SaveableField("playerStats")]
    private PlayerStats _playerStats = new PlayerStats();
    
    [SaveableField("unlockedItems")]
    private List<string> _unlockedItems = new List<string>();
    
    // Optional: Override callbacks
    public override void OnSaved()
    {
        Console.WriteLine("Data has been saved!");
    }
    
    public override void OnLoaded()
    {
        Console.WriteLine($"Loaded {_unlockedItems.Count} unlocked items");
        RefreshUI();
    }
}
```

### Handling Complex Objects

```csharp
public class ModConfig : Saveable
{
    [SaveableField("settings")]
    private Dictionary<string, object> _settings = new Dictionary<string, object>();
    
    [SaveableField("playerProgress")]
    private PlayerProgress _playerProgress = new PlayerProgress();
    
    // Provide helper methods to work with your data
    public T GetSetting<T>(string key, T defaultValue = default)
    {
        if (_settings.TryGetValue(key, out var value) && value is T typedValue)
            return typedValue;
        return defaultValue;
    }
    
    public void SetSetting<T>(string key, T value)
    {
        _settings[key] = value;
    }
}
```

### Cross-compatibility Support

The save system is designed to work consistently across both Mono and Il2Cpp builds:

```csharp
// This code works the same way in both Mono and Il2Cpp builds
public class MyQuestData : Saveable
{
    [SaveableField("questProgress")]
    private Dictionary<string, int> _questProgress = new Dictionary<string, int>();
    
    // Method to update quest progress
    public void UpdateQuestProgress(string questId, int progress)
    {
        _questProgress[questId] = progress;
        // Data will be automatically saved through the Saveable system
    }
}
```

## Best Practices

1. Keep your saveable classes organized and focused on specific data domains
2. Use appropriate serializable types for fields marked with SaveableField
3. Implement versioning for your saved data to handle format changes
4. Override OnSaved() and OnLoaded() for any custom logic needed during save/load operations
5. Keep your save data minimal - only save what's needed to restore state
6. Test both saving and loading thoroughly, including edge cases 