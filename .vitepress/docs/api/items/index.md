# Items API

The Items API provides functionality for working with in-game items, item definitions, and item instances.

## Namespace

```csharp
using S1API.Items;
```

## Key Classes

### ItemDefinition

Represents an item definition in-game. A definition describes "what" the item is, such as "This is a Soda".

```csharp
public class ItemDefinition : IGUIDReference
{
    public string GUID { get; }
    public string ID { get; }
    public string Name { get; }
    public string Description { get; }
    public ItemCategory Category { get; }
    public int StackLimit { get; }
    
    public virtual ItemInstance CreateInstance(int quantity = 1);
}
```

### ItemInstance

Represents an item instance in the game. An instance is the item existing in the game world, such as "I have five sodas in my hand."

```csharp
public class ItemInstance
{
    public ItemDefinition Definition { get; }
}
```

### ItemCategory

Enum representing different categories of items.

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

### ItemManager

Static class for managing items across the game.

```csharp
public static class ItemManager
{
    public static ItemDefinition GetItemDefinition(string itemID);
}
```

### ItemSlotInstance

Represents an item slot within the game. These are present within storage, the hot bar, etc.

```csharp
public class ItemSlotInstance
{
    public int Quantity { get; }
    public ItemInstance? ItemInstance { get; }
    
    public void AddQuantity(int amount);
}
```

## Usage Examples

### Getting an Item Definition

```csharp
// Get an item definition by its ID
var sodaDefinition = ItemManager.GetItemDefinition("cuke");

// Access properties of the definition
Console.WriteLine($"Name: {sodaDefinition.Name}");
Console.WriteLine($"Description: {sodaDefinition.Description}");
Console.WriteLine($"Category: {sodaDefinition.Category}");
Console.WriteLine($"Stack Limit: {sodaDefinition.StackLimit}");
```

### Creating an Item Instance

```csharp
// Get an item definition
var cukeDefinition = ItemManager.GetItemDefinition("cuke");

// Create an instance of the item with a quantity of 5
var cukeInstance = cukeDefinition.CreateInstance(5);
```

### Working with Item Slots

```csharp
// Example: Working with an item slot
public void AddItemToSlot(ItemSlotInstance slot, ItemDefinition itemDef, int quantity)
{
    // Check if slot is empty or contains the same item type
    if (slot.ItemInstance == null || slot.ItemInstance.Definition.ID == itemDef.ID)
    {
        // Create a new instance if needed
        if (slot.ItemInstance == null)
        {
            var instance = itemDef.CreateInstance(quantity);
            // Code to add instance to slot would go here
        }
        else
        {
            // Add to existing quantity
            slot.AddQuantity(quantity);
        }
    }
}
```

### Checking Item Categories

```csharp
// Get an item definition
var itemDef = ItemManager.GetItemDefinition("cuke");

// Check item category
if (itemDef.Category == ItemCategory.Consumable)
{
    // Handle consumable item
    Console.WriteLine("This is a consumable item");
}
else if (itemDef.Category == ItemCategory.Tools)
{
    // Handle tool item
    Console.WriteLine("This is a tool item");
}
```