# Items API

The Items API provides functionality for creating, managing, and interacting with in-game items.

## Namespace

```csharp
using S1API.Items;
```

## Key Classes

### Item

Represents a single item in the game.

```csharp
public class Item : SaveableBase
{
    public string ItemID { get; }
    public string Name { get; set; }
    public string Description { get; set; }
    public float Weight { get; set; }
    public float Value { get; set; }
    public Sprite Icon { get; set; }
    public GameObject Model { get; set; }
    public ItemType Type { get; set; }
    public Dictionary<string, object> Properties { get; }
    
    public Item(string itemID, string name, string description);
    
    public bool CanUse();
    public void Use();
    public Item Clone();
    public void SetProperty<T>(string key, T value);
    public T GetProperty<T>(string key, T defaultValue = default);
}
```

### ItemStack

Represents a stack of items with a quantity.

```csharp
public class ItemStack : SaveableBase
{
    public Item Item { get; }
    public int Quantity { get; set; }
    public float TotalWeight { get; }
    public float TotalValue { get; }
    
    public ItemStack(Item item, int quantity = 1);
    
    public ItemStack Split(int quantity);
    public bool CanMerge(ItemStack other);
    public void Merge(ItemStack other);
    public bool CanUse();
    public void Use();
}
```

### ItemType

Enum representing different types of items.

```csharp
public enum ItemType
{
    General,
    Weapon,
    Armor,
    Consumable,
    Quest,
    Key,
    Material,
    Tool,
    Valuable,
    Special
}
```

### ItemManager

Static class for managing all items in the game.

```csharp
public static class ItemManager
{
    public static void RegisterItem(Item itemTemplate);
    public static void UnregisterItem(string itemID);
    public static Item GetItemTemplate(string itemID);
    public static bool TryGetItemTemplate(string itemID, out Item itemTemplate);
    public static Item CreateItem(string itemID);
    public static ItemStack CreateItemStack(string itemID, int quantity = 1);
    public static List<Item> GetAllItems();
    public static List<Item> GetItemsByType(ItemType type);
}
```

## Usage Examples

### Creating a Custom Item

```csharp
// Create a new item template
var medkit = new Item("mymod.medkit", "Advanced Medkit", "Fully restores health and cures ailments");
medkit.Weight = 0.5f;
medkit.Value = 150.0f;
medkit.Type = ItemType.Consumable;

// Set custom properties
medkit.SetProperty("healAmount", 100);
medkit.SetProperty("curesPoison", true);
medkit.SetProperty("cooldown", 30.0f);

// Load and set the icon
medkit.Icon = Resources.Load<Sprite>("MyMod/Icons/medkit_icon");

// Register the item with the item manager
ItemManager.RegisterItem(medkit);
```

### Working with ItemStacks

```csharp
// Create an item stack from a registered item
var medkitStack = ItemManager.CreateItemStack("mymod.medkit", 3);

// Split the stack
var splitStack = medkitStack.Split(1);
Console.WriteLine($"Original stack: {medkitStack.Quantity}"); // 2
Console.WriteLine($"Split stack: {splitStack.Quantity}"); // 1

// Merge compatible stacks
if (medkitStack.CanMerge(splitStack))
{
    medkitStack.Merge(splitStack);
    Console.WriteLine($"Merged stack: {medkitStack.Quantity}"); // 3
}

// Use an item from the stack
if (medkitStack.CanUse())
{
    medkitStack.Use(); // Automatically decrements quantity
    Console.WriteLine($"After use: {medkitStack.Quantity}"); // 2
}
```

### Querying Items

```csharp
// Get all consumable items
var consumables = ItemManager.GetItemsByType(ItemType.Consumable);
foreach (var item in consumables)
{
    Console.WriteLine($"{item.Name}: {item.Description}");
}

// Check if an item exists and get it
if (ItemManager.TryGetItemTemplate("mymod.medkit", out var medkit))
{
    float healAmount = medkit.GetProperty<float>("healAmount", 0);
    bool curesPoison = medkit.GetProperty<bool>("curesPoison", false);
    
    Console.WriteLine($"Medkit heals {healAmount} and cures poison: {curesPoison}");
}
```

## Events

The Items API provides events to hook into item-related actions:

```csharp
// Item creation
ItemManager.OnItemCreated += (item) => { /* ... */ };

// Item use
ItemManager.OnItemUsed += (item, user) => { /* ... */ };

// Item registration
ItemManager.OnItemRegistered += (itemTemplate) => { /* ... */ };
ItemManager.OnItemUnregistered += (itemID) => { /* ... */ };
```

## Best Practices

1. Always register item templates at mod startup
2. Use unique, namespaced IDs for all items
3. Consider performance when designing items with complex behaviors
4. Keep item property keys consistent across related items
5. Set reasonable weight and value properties based on game balance
6. Implement proper usage logic in the CanUse and Use methods 