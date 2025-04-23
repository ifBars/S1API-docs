# Dead Drops API

The Dead Drops API provides functionality for accessing and managing dead drop locations in the game, allowing for interactions with hidden item stashes, message exchanges, and quest-related activities.

## Namespace

```csharp
using S1API.DeadDrops;
```

## Key Classes

### DeadDropInstance

Represents a physical dead drop location in the game world.

```csharp
public class DeadDropInstance : IGUIDReference
{
    public string GUID { get; }
    public StorageInstance Storage { get; }
    public Vector3 Position { get; }
    
    internal DeadDropInstance(S1Economy.DeadDrop deadDrop);
    internal static DeadDropInstance? GetFromGUID(string guid);
}
```

### DeadDropManager

Static class for accessing all dead drop locations in the game.

```csharp
public static class DeadDropManager
{
    public static DeadDropInstance[] All { get; }
}
```

### StorageInstance

A container for items stored in a dead drop. Accessible through the `Storage` property of a `DeadDropInstance`.

## Usage Examples

### Accessing Dead Drops

```csharp
// Get all dead drops in the scene
DeadDropInstance[] allDeadDrops = DeadDropManager.All;

// Process each dead drop
foreach (var deadDrop in allDeadDrops)
{
    Debug.Log($"Found dead drop with ID: {deadDrop.GUID}");
    Debug.Log($"Position: {deadDrop.Position}");
    
    // Access the storage associated with the dead drop
    StorageInstance storage = deadDrop.Storage;
    
    // Now you can work with the storage to add/remove items
    // (See StorageInstance documentation for details)
}
```

### Finding Specific Dead Drops

```csharp
// Example: Find dead drops near a specific location
Vector3 playerPosition = player.Position;
float searchRadius = 50.0f;

var nearbyDrops = DeadDropManager.All
    .Where(drop => Vector3.Distance(playerPosition, drop.Position) <= searchRadius)
    .ToArray();

foreach (var drop in nearbyDrops)
{
    float distance = Vector3.Distance(playerPosition, drop.Position);
    Debug.Log($"Dead drop {drop.GUID} is {distance:F1} meters away");
}

// Example: Find a specific dead drop by GUID
string targetGuid = "some-guid-value";
DeadDropInstance? specificDrop = DeadDropInstance.GetFromGUID(targetGuid);

if (specificDrop != null)
{
    Debug.Log($"Found specific dead drop at: {specificDrop.Position}");
}
```

### Working with Dead Drop Storage

```csharp
// Get a dead drop instance
DeadDropInstance deadDrop = DeadDropManager.All.FirstOrDefault();

if (deadDrop != null)
{
    // Access its storage
    StorageInstance storage = deadDrop.Storage;
    
    // Now you can use StorageInstance methods to interact with items
    // (See StorageInstance documentation for details)
}
```

## Best Practices

1. Always check if a dead drop exists before attempting to access its properties
2. For quest-related features, associate dead drops with quest objectives using their GUID
3. When finding nearby dead drops, consider using a reasonable search radius to avoid performance issues
4. Consider caching dead drop references that you'll use frequently instead of searching every time
5. Use the storage system appropriately for adding or removing items from dead drops 