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

Represents an item slot within the game. These are present within storage containers.

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

## Best Practices

1. Always check if an item can fit before adding it to a storage container
2. Use the `AddQuantity` method with negative values to remove items from slots
3. Check if a slot's `ItemInstance` is null before accessing it
4. When working with storage containers, subscribe to the `OnOpened` and `OnClosed` events to handle UI updates
5. Remember that storage slots can contain different item types, so check each item's definition when processing storage contents 