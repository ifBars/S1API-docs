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
    // Properties
    public string GUID { get; }
    public string ID { get; }
    public string Name { get; }
    public string Description { get; }
    public ItemCategory Category { get; }
    public int StackLimit { get; }
    
    // Methods
    public virtual ItemInstance CreateInstance(int quantity = 1);
    
    // Equality operators
    public override bool Equals(object? obj);
    public override int GetHashCode();
    public static bool operator ==(ItemDefinition? left, ItemDefinition? right);
    public static bool operator !=(ItemDefinition left, ItemDefinition right);
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
    /// <summary>
    /// Represents items such as Cocaine, Weed, etc.
    /// Oddly, SpeedGrow is in this category as of (v0.3.4f8).
    /// </summary>
    Product,
    
    /// <summary>
    /// Represents items such as Baggies, Bricks, Jars, etc.
    /// </summary>
    Packaging,
    
    /// <summary>
    /// Represents items such as Soil, Fertilizer, Pots, etc. 
    /// </summary>
    Growing,
    
    /// <summary>
    /// Represents equipment tools such as the clippers.
    /// Oddly, trash bags is in this category as of (v0.3.4f8).
    /// </summary>
    Tools,
    
    /// <summary>
    /// Represents items such as TV, Trash Can, Bed, etc.
    /// </summary>
    Furniture,
    
    /// <summary>
    /// Represents items such as Floor Lamps, Halogen Lights, etc.
    /// </summary>
    Lighting,
    
    /// <summary>
    /// Represents cash-based items.
    /// </summary>
    Cash,
    
    /// <summary>
    /// Represents items such as Cuke, Energy Drink, etc.
    /// </summary>
    Consumable,
    
    /// <summary>
    /// Represents items such as Drying Rack, Brick Press, Mixing Station, etc.
    /// </summary>
    Equipment,
    
    /// <summary>
    /// Represents items such as Acid, Banana, Chili, etc.
    /// </summary>
    Ingredient,
    
    /// <summary>
    /// Represents items such as GoldBar, WallClock, WoodSign, etc.
    /// </summary>
    Decoration,
    
    /// <summary>
    /// Represents clothing items.
    /// </summary>
    Clothing
}
```

### ItemManager

Static class for managing items across the game.

```csharp
public static class ItemManager
{
    /// <summary>
    /// Gets the definition of an item by its ID.
    /// </summary>
    /// <param name="itemID">The ID of the item.</param>
    /// <returns>An instance of the item definition.</returns>
    public static ItemDefinition GetItemDefinition(string itemID);
}
```

### ItemSlotInstance

Represents an item slot within the game. These are present within storage, the hot bar, etc.

```csharp
public class ItemSlotInstance
{
    /// <summary>
    /// The quantity of item in this slot.
    /// </summary>
    public int Quantity { get; }
    
    /// <summary>
    /// The item instance the slot contains.
    /// </summary>
    public ItemInstance? ItemInstance { get; }
    
    /// <summary>
    /// Adds a quantity to the item in this slot.
    /// NOTE: Negative numbers are supported and allowed.
    /// </summary>
    /// <param name="amount"></param>
    public void AddQuantity(int amount);
}
```

## Specialized Item Types

The API includes several specialized item types that inherit from the base classes:

### ProductDefinition and ProductInstance

```csharp
// Specialized item definition for product items
public class ProductDefinition : ItemDefinition { }

// Specialized item instance for product items
public class ProductInstance : ItemInstance { }
```

### CashDefinition and CashInstance

```csharp
// Specialized item definition for cash items
public class CashDefinition : ItemDefinition { }

// Specialized item instance for cash items
public class CashInstance : ItemInstance { }
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

### Using Specialized Item Types

```csharp
// Working with Cash items (requires both namespaces)
using S1API.Items;
using S1API.Money;

// Get a cash item definition
var cashDef = ItemManager.GetItemDefinition("cash");

// Check if it's a cash definition
if (cashDef is CashDefinition cashDefinition)
{
    // Create a cash instance with initial value
    var cashInstance = (CashInstance)cashDefinition.CreateInstance(100);
    
    // Use cash-specific methods
    cashInstance.AddQuantity(50.5f);  // Add 50.5 to the cash amount
    cashInstance.SetQuantity(1000f);  // Set cash amount directly to 1000
}
```