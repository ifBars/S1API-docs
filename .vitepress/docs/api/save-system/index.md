# Save System API

The Save System API provides a comprehensive framework for persisting mod data alongside the game's save files.

## Namespace

```csharp
using S1API.SaveSystem;
```

## Key Classes

### SaveManager

The central manager for all save/load operations.

```csharp
public static class SaveManager
{
    // Events
    public static event Action OnBeforeSave;
    public static event Action OnAfterSave;
    public static event Action OnBeforeLoad;
    public static event Action OnAfterLoad;
    
    // Methods
    public static void RegisterMod(string modID, ISaveDataProvider provider);
    public static void UnregisterMod(string modID);
    public static void SaveModData(string modID);
    public static void LoadModData(string modID);
    public static bool ModDataExists(string modID);
    public static void DeleteModData(string modID);
}
```

### ISaveDataProvider

Interface for classes that provide data to be saved.

```csharp
public interface ISaveDataProvider
{
    string ModID { get; }
    SaveData GetSaveData();
    void SetSaveData(SaveData data);
}
```

### SaveData

Container for serializable data.

```csharp
public class SaveData
{
    // Read methods
    public T ReadValue<T>(string key, T defaultValue = default);
    public bool HasKey(string key);
    
    // Write methods
    public void WriteValue<T>(string key, T value);
    public void RemoveKey(string key);
    
    // Collections
    public SaveData GetSubData(string key);
    public void SetSubData(string key, SaveData data);
    
    // Serialization
    public string ToJson();
    public static SaveData FromJson(string json);
}
```

### ModSaveDataProvider

A default implementation of ISaveDataProvider for simple mod data storage.

```csharp
public class ModSaveDataProvider : ISaveDataProvider
{
    public string ModID { get; }
    
    public ModSaveDataProvider(string modID);
    public SaveData GetSaveData();
    public void SetSaveData(SaveData data);
    
    // Helper methods
    public void SetValue<T>(string key, T value);
    public T GetValue<T>(string key, T defaultValue = default);
}
```

## Usage Examples

### Basic Save/Load Implementation

```csharp
// Create a save data provider for your mod
var provider = new ModSaveDataProvider("myAwesomeMod");

// Register with the save system
SaveManager.RegisterMod("myAwesomeMod", provider);

// Save some data
provider.SetValue("playerName", "Steve");
provider.SetValue("score", 1000);
provider.SetValue("unlocked", true);

// Save the data to disk
SaveManager.SaveModData("myAwesomeMod");

// Later, load the data
SaveManager.LoadModData("myAwesomeMod");

// Retrieve values
string name = provider.GetValue<string>("playerName");
int score = provider.GetValue<int>("score");
bool unlocked = provider.GetValue<bool>("unlocked");

Console.WriteLine($"Player {name} has score {score} and unlocked status: {unlocked}");
```

### Custom Save Data Provider

```csharp
public class MyModData : ISaveDataProvider
{
    public string ModID => "myCustomMod";
    
    // Your mod's custom data
    public string PlayerName { get; set; }
    public Dictionary<string, int> Achievements { get; }
    public List<string> UnlockedItems { get; }
    
    public MyModData()
    {
        Achievements = new Dictionary<string, int>();
        UnlockedItems = new List<string>();
        
        // Register with save system
        SaveManager.RegisterMod(ModID, this);
    }
    
    public SaveData GetSaveData()
    {
        var data = new SaveData();
        
        // Write simple values
        data.WriteValue("playerName", PlayerName);
        
        // Write collections
        var achievementsData = new SaveData();
        foreach (var kvp in Achievements)
        {
            achievementsData.WriteValue(kvp.Key, kvp.Value);
        }
        data.SetSubData("achievements", achievementsData);
        
        // Write lists
        data.WriteValue("unlockedItems", string.Join(",", UnlockedItems));
        
        return data;
    }
    
    public void SetSaveData(SaveData data)
    {
        // Read simple values
        PlayerName = data.ReadValue<string>("playerName", "Unknown");
        
        // Read collections
        Achievements.Clear();
        if (data.HasKey("achievements"))
        {
            var achievementsData = data.GetSubData("achievements");
            // Process achievement data...
        }
        
        // Read lists
        UnlockedItems.Clear();
        var itemsStr = data.ReadValue<string>("unlockedItems", "");
        if (!string.IsNullOrEmpty(itemsStr))
        {
            UnlockedItems.AddRange(itemsStr.Split(','));
        }
    }
}
```

### Using Save Events

```csharp
// Set up event handlers
SaveManager.OnBeforeSave += () => {
    Debug.Log("About to save game data");
    // Prepare anything needed before saving
};

SaveManager.OnAfterLoad += () => {
    Debug.Log("Game data has been loaded");
    // Initialize your mod with the loaded data
    RefreshUI();
    SyncGameState();
};
```

## Best Practices

1. Always handle data versioning to support future updates to your save format
2. Implement error handling for corrupted or incompatible save data
3. Keep save data minimal - only save what's needed to restore state
4. Use namespaced keys to avoid conflicts with other mods
5. Test both saving and loading thoroughly, including edge cases
6. Consider backup/restore functionality for important user data 