# Dead Drops API

The Dead Drops API provides functionality for creating and managing dead drop locations in the game, allowing for hidden item stashes, message exchanges, and quest-related interactions.

## Namespace

```csharp
using S1API.DeadDrops;
```

## Key Classes

### DeadDrop

Represents a physical dead drop location in the game world.

```csharp
public class DeadDrop : SaveableBase
{
    public string DropID { get; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Vector3 Position { get; }
    public bool IsDiscovered { get; }
    public bool IsEmpty { get; }
    public ItemContainer Contents { get; }
    public DeadDropType Type { get; }
    public bool RequiresKey { get; set; }
    public string RequiredKeyID { get; set; }
    
    public DeadDrop(string dropID, Vector3 position, DeadDropType type = DeadDropType.Generic);
    
    public bool TryOpen(Player player);
    public bool CanAccess(Player player);
    public void SetAsDiscovered();
    public bool AddItem(string itemID, int quantity = 1);
    public bool RemoveItem(string itemID, int quantity = 1);
    public void ClearContents();
    public void OnInteract(Player player);
    public void SetInteractionCallback(Action<DeadDrop, Player> callback);
}
```

### DeadDropType

Enum representing different types of dead drops.

```csharp
public enum DeadDropType
{
    Generic,
    Stash,
    LetterDrop,
    DrugDrop,
    WeaponCache,
    MoneyDrop,
    QuestItem,
    Secret
}
```

### ItemContainer

A container for items stored in a dead drop.

```csharp
public class ItemContainer : SaveableBase
{
    public string ContainerID { get; }
    public int MaxCapacity { get; set; }
    public float MaxWeight { get; set; }
    public List<ItemStack> Items { get; }
    public bool IsEmpty { get; }
    public float CurrentWeight { get; }
    public int ItemCount { get; }
    
    public ItemContainer(string containerID, int maxCapacity = 10, float maxWeight = 50.0f);
    
    public bool AddItem(string itemID, int quantity = 1);
    public bool AddItemStack(ItemStack itemStack);
    public bool RemoveItem(string itemID, int quantity = 1);
    public bool RemoveItemStack(ItemStack itemStack);
    public ItemStack GetItem(string itemID);
    public bool HasItem(string itemID, int quantity = 1);
    public void Clear();
    public bool CanFit(ItemStack itemStack);
}
```

### DeadDropManager

Static class for managing all dead drop locations in the game.

```csharp
public static class DeadDropManager
{
    public static List<DeadDrop> AllDeadDrops { get; }
    public static List<DeadDrop> DiscoveredDeadDrops { get; }
    
    public static void RegisterDeadDrop(DeadDrop deadDrop);
    public static void UnregisterDeadDrop(string dropID);
    public static DeadDrop GetDeadDrop(string dropID);
    public static List<DeadDrop> GetDeadDropsByType(DeadDropType type);
    public static List<DeadDrop> GetDeadDropsInRadius(Vector3 position, float radius);
    public static void ResetAllDeadDrops();
}
```

## Usage Examples

### Creating a Basic Dead Drop

```csharp
// Create a simple weapon cache dead drop
Vector3 location = new Vector3(123.4f, 5.6f, 78.9f);
DeadDrop weaponCache = new DeadDrop(
    "mymod.weapon_cache_01", 
    location, 
    DeadDropType.WeaponCache
);

// Set properties
weaponCache.Name = "Hidden Weapon Cache";
weaponCache.Description = "A well-hidden stash containing valuable weapons.";

// Add items to the dead drop
weaponCache.AddItem("game.pistol", 1);
weaponCache.AddItem("game.ammo.9mm", 24);
weaponCache.AddItem("game.medkit", 2);

// Require a key to access
weaponCache.RequiresKey = true;
weaponCache.RequiredKeyID = "mymod.cache_key_01";

// Register the dead drop
DeadDropManager.RegisterDeadDrop(weaponCache);
```

### Creating a Quest-related Dead Drop

```csharp
// Create a quest-related dead drop
DeadDrop questDrop = new DeadDrop(
    "mymod.quest_evidence", 
    new Vector3(234.5f, 0.5f, 345.6f), 
    DeadDropType.QuestItem
);

questDrop.Name = "Suspicious Package";
questDrop.Description = "A package containing evidence about the recent robberies.";

// Add a specific quest item
questDrop.AddItem("mymod.evidence_folder", 1);

// Set up a custom interaction
questDrop.SetInteractionCallback((deadDrop, player) => {
    // When the player interacts with this dead drop
    if (player.HasActiveQuest("mymod.investigate_robberies"))
    {
        // Get the quest
        var quest = QuestManager.GetQuest("mymod.investigate_robberies");
        
        // Complete a quest objective
        quest.GetObjective("find_evidence").Complete();
        
        // Show a notification
        player.ShowNotification("You found the evidence!");
        
        // Maybe add some experience
        player.AddExperience(250);
    }
    else
    {
        // If player doesn't have the quest
        player.ShowMessage("This looks like important evidence. Maybe someone is looking for this...");
    }
});

DeadDropManager.RegisterDeadDrop(questDrop);
```

### Finding and Managing Dead Drops

```csharp
// Get a specific dead drop
DeadDrop stash = DeadDropManager.GetDeadDrop("mymod.drug_stash_03");
if (stash != null && !stash.IsEmpty)
{
    Console.WriteLine($"Found stash: {stash.Name}");
    Console.WriteLine($"Contains {stash.Contents.ItemCount} items");
}

// Find all weapon caches
var weaponCaches = DeadDropManager.GetDeadDropsByType(DeadDropType.WeaponCache);
Console.WriteLine($"Found {weaponCaches.Count} weapon caches in the world");

// Find dead drops near the player
Vector3 playerPosition = player.Position;
float searchRadius = 50.0f;
var nearbyDrops = DeadDropManager.GetDeadDropsInRadius(playerPosition, searchRadius);

foreach (var drop in nearbyDrops)
{
    float distance = Vector3.Distance(playerPosition, drop.Position);
    Console.WriteLine($"{drop.Name} is {distance:F1} meters away");
    
    if (!drop.IsDiscovered)
    {
        // Mark on map if in range but not yet discovered
        MapMarker marker = new MapMarker(drop.Position, "Unknown Stash", MapMarkerType.DeadDrop);
        map.AddTemporaryMarker(marker, 60); // Show for 60 seconds
    }
}

// Check if player can access a locked dead drop
DeadDrop lockedDrop = DeadDropManager.GetDeadDrop("mymod.locked_cache");
if (lockedDrop != null)
{
    if (lockedDrop.CanAccess(player))
    {
        lockedDrop.TryOpen(player);
    }
    else if (lockedDrop.RequiresKey)
    {
        player.ShowMessage($"This cache requires a key. Find the {lockedDrop.RequiredKeyID} to open it.");
    }
}
```

### Handling Dead Drop Persistence

```csharp
// Clear a dead drop's contents when the player takes everything
stash.ClearContents();

// Reset a specific dead drop to its original state
stash.ResetToDefault();

// Reset all dead drops in the game (e.g., for a new game)
DeadDropManager.ResetAllDeadDrops();

// Remove a dead drop permanently from the game
DeadDropManager.UnregisterDeadDrop("mymod.temporary_drop");
```

## Events

The Dead Drops API provides events to hook into dead drop interactions:

```csharp
// Dead drop discovery and interaction
DeadDropManager.OnDeadDropDiscovered += (deadDrop, player) => { /* ... */ };
DeadDropManager.OnDeadDropInteraction += (deadDrop, player) => { /* ... */ };

// Content changes
DeadDropManager.OnItemAddedToDeadDrop += (deadDrop, itemStack) => { /* ... */ };
DeadDropManager.OnItemRemovedFromDeadDrop += (deadDrop, itemStack) => { /* ... */ };
DeadDropManager.OnDeadDropEmptied += (deadDrop, player) => { /* ... */ };
DeadDropManager.OnDeadDropRefilled += (deadDrop) => { /* ... */ };

// Access-related events
DeadDropManager.OnDeadDropUnlocked += (deadDrop, player) => { /* ... */ };
DeadDropManager.OnDeadDropAccessDenied += (deadDrop, player, reason) => { /* ... */ };
```

## Best Practices

1. Use meaningful IDs for your dead drops that include your mod name
2. Place dead drops in logical, somewhat hidden locations that fit their purpose
3. Consider creating a quest to guide players to important dead drops
4. Balance the contents of dead drops to avoid giving players overpowered items too early
5. Use custom interactions to create unique gameplay moments around important dead drops
6. Group related dead drops by using consistent naming and the same drop type
7. Consider using map markers or environmental clues to help players discover important drops 