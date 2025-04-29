# Storages API

The Storages API provides functionality for working with storage containers in the game.

## Namespace

```csharp
using S1API.Storages;
```

## Key Classes

### StorageInstance

Represents a storage container in-game.

```csharp
public class StorageInstance
{
    public ItemSlotInstance[] Slots { get; }
    
    public bool CanItemFit(ItemInstance itemInstance, int quantity = 1);
    public void AddItem(ItemInstance itemInstance);
    
    public event Action OnOpened;
    public event Action OnClosed;
}
```

## Related Classes from Items API

### ItemSlotInstance

Represents an item slot within the game. These are present within storage containers, the hot bar, etc.

```csharp
public class ItemSlotInstance
{
    public int Quantity { get; }
    public ItemInstance? ItemInstance { get; }
    
    public void AddQuantity(int amount);
}
```

### ItemInstance

Represents an item instance in the game.

```csharp
public class ItemInstance
{
    public ItemDefinition Definition { get; }
}
```

### ItemDefinition

Represents an item definition in-game.

```csharp
public class ItemDefinition
{
    public string GUID { get; }
    public string ID { get; }
    public string Name { get; }
    public string Description { get; }
    public ItemCategory Category { get; }
    public int StackLimit { get; }
    
    public ItemInstance CreateInstance(int quantity = 1);
}
```

### ItemManager

Provides access to managing items across the game.

```csharp
public static class ItemManager
{
    public static ItemDefinition GetItemDefinition(string itemID);
}
```

### ItemCategory

A list of item categories available in-game.

```csharp
public enum ItemCategory
{
    Product,
    Packaging,
    Growing,
    Tools,
    Furniture,
    Lighting,
    Cash,
    Consumable,
    Equipment,
    Ingredient,
    Decoration,
    Clothing
}
```

## Usage Examples

### Working with Storage Containers

```csharp
// Access slots in a storage container
public void DisplayStorageContents(StorageInstance storage)
{
    Console.WriteLine($"Storage contains {storage.Slots.Length} slots:");
    
    foreach (var slot in storage.Slots)
    {
        if (slot.ItemInstance != null)
        {
            Console.WriteLine($"- {slot.ItemInstance.Definition.Name} x{slot.Quantity}");
        }
        else
        {
            Console.WriteLine("- Empty slot");
        }
    }
}

// Check if an item can fit in storage
public bool TryAddItemToStorage(StorageInstance storage, ItemInstance item, int quantity)
{
    if (storage.CanItemFit(item, quantity))
    {
        storage.AddItem(item);
        return true;
    }
    
    Console.WriteLine("Item doesn't fit in this storage container.");
    return false;
}
```

### Listening to Storage Events

```csharp
// Subscribe to storage events
public void SetupStorageListeners(StorageInstance storage)
{
    storage.OnOpened += () => 
    {
        Console.WriteLine("Storage has been opened!");
        // Play sound effect, show UI, etc.
    };
    
    storage.OnClosed += () => 
    {
        Console.WriteLine("Storage has been closed!");
        // Hide UI, save state, etc.
    };
}
```

### Managing Items in Slots

```csharp
// Remove items from storage
public void RemoveItemsFromStorage(StorageInstance storage, string itemID, int quantityToRemove)
{
    foreach (var slot in storage.Slots)
    {
        if (slot.ItemInstance != null && slot.ItemInstance.Definition.ID == itemID)
        {
            int amountToRemove = Math.Min(slot.Quantity, quantityToRemove);
            slot.AddQuantity(-amountToRemove);
            quantityToRemove -= amountToRemove;
            
            if (quantityToRemove <= 0)
                break;
        }
    }
}

// Count items in storage
public int CountItemsInStorage(StorageInstance storage, string itemID)
{
    int total = 0;
    
    foreach (var slot in storage.Slots)
    {
        if (slot.ItemInstance != null && slot.ItemInstance.Definition.ID == itemID)
        {
            total += slot.Quantity;
        }
    }
    
    return total;
}
```

### Finding Item Definitions

```csharp
// Get an item definition by ID
public ItemDefinition GetItemByID(string itemID)
{
    return ItemManager.GetItemDefinition(itemID);
}

// Create a new instance of an item to add to storage
public void CreateAndAddToStorage(StorageInstance storage, string itemID, int quantity)
{
    var itemDef = ItemManager.GetItemDefinition(itemID);
    if (itemDef != null)
    {
        var itemInstance = itemDef.CreateInstance(quantity);
        if (storage.CanItemFit(itemInstance, quantity))
        {
            storage.AddItem(itemInstance);
            Console.WriteLine($"Added {quantity}x {itemDef.Name} to storage");
        }
    }
}
```