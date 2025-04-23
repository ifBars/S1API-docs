# Money API

The Money API provides functionality for handling in-game currency through the cash item system.

## Namespace

```csharp
using S1API.Money;
```

## Key Classes

### CashDefinition

Represents the definition of a cash type in the game.

```csharp
public class CashDefinition : ItemDefinition
{
    // Properties inherited from ItemDefinition
    public override string GUID { get; }
    public string ID { get; }
    public string Name { get; }
    public string Description { get; }
    public ItemCategory Category { get; } // Will be ItemCategory.Cash
    public int StackLimit { get; }
    
    // Methods
    public override ItemInstance CreateInstance(int quantity = 1);
}
```

### CashInstance

Represents an instance of cash within the game.

```csharp
public class CashInstance : ItemInstance
{
    // Properties inherited from ItemInstance
    public ItemDefinition Definition { get; }
    
    // Cash-specific methods
    public void AddQuantity(float amount);
    public void SetQuantity(float newQuantity);
}
```

## Integration with Item System

Cash is implemented as a special type of item in the game, leveraging the item system infrastructure. Cash items have the `ItemCategory.Cash` category and use specialized instances to handle currency operations.

## Usage Examples

### Getting Cash Definition

```csharp
// Get a reference to a cash definition
CashDefinition cashDef = (CashDefinition)ItemManager.GetItemDefinition("cash");
```

### Creating Cash Instances

```csharp
// Create a new instance of cash with a specific amount
CashDefinition cashDef = (CashDefinition)ItemManager.GetItemDefinition("cash");
CashInstance cashInstance = (CashInstance)cashDef.CreateInstance(100); // 100 units of currency
```

### Manipulating Cash Amount

```csharp
// Add currency to a cash instance
cashInstance.AddQuantity(50.0f); // Add 50 to the balance

// Remove currency from a cash instance
cashInstance.AddQuantity(-25.0f); // Remove 25 from the balance

// Set currency to a specific amount
cashInstance.SetQuantity(200.0f); // Set to exactly 200
```

### Working with Item Slots

Cash can be stored in item slots just like other items:

```csharp
// Get a cash instance from an item slot
ItemSlotInstance slot = /* get a slot from inventory */;
if (slot.ItemInstance is CashInstance cashInSlot)
{
    // Now we can work with the cash instance
    float currentAmount = slot.Quantity;
    
    // Add more cash to the slot
    slot.AddQuantity(50);
}
```

## Best Practices

1. Always check if an ItemInstance is a CashInstance before casting
2. Use the AddQuantity method to add or subtract from cash balances
3. Remember that cash is treated as an item in the inventory system
4. Cash follows the item stacking rules based on its stack limit
5. The game represents cash as float values rather than decimal to maintain compatibility with the item system 