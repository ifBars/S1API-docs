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