# Save System API

The Save System API provides a framework for persisting mod data alongside the game's save files.

## Namespace

```csharp
using S1API.Saveables;
```

## Key Components

### SaveableField

An attribute that marks fields to be automatically saved and loaded.

```csharp
[AttributeUsage(AttributeTargets.Field)]
public class SaveableField : Attribute
{
    public SaveableField(string saveName)
    {
        // saveName determines the filename for saving this field
    }
}
```

### ISaveable

Internal interface that defines the contract for saveable objects.

```csharp
internal interface ISaveable : IRegisterable
{
    void SaveInternal(string path, ref List<string> extraSaveables);
    void LoadInternal(string folderPath);
    void OnSaved();
    void OnLoaded();
}
```

### Saveable

Base class that implements the ISaveable interface and provides common save/load functionality.

```csharp
public abstract class Saveable : Registerable, ISaveable
{
    // Implementation of ISaveable interface
    
    // This handles loading fields marked with SaveableField attribute
    internal virtual void LoadInternal(string folderPath)
    {
        // Finds fields with SaveableField attribute
        // Loads data from JSON files
        // Sets field values
    }
    
    // Override these methods in derived classes
    public virtual void OnSaved() { }
    public virtual void OnLoaded() { }
}
```

## Usage Examples

### Using SaveableField in Quests and NPCs

The SaveableField attribute works with Quest and NPC classes, automatically handling the saving and loading of marked fields:

```csharp
// Define a custom data class for your save data
public class OrderData
{
    public ProductDefinition? Product;
    public int Amount;
    public int Price;
}

// Use it in your Quest class
public class MyFancyQuest : Quest
{
    // Mark the field to be automatically saved with the SaveableField attribute
    [SaveableField("Order")] 
    private OrderData _orderData = new OrderData();

    public void SetOrderAmount(int amount)
    {
        _orderData.Amount = amount;
    }
    
    public void SetOrderProduct(ProductDefinition product)
    {
        _orderData.Product = product;
    }
    
    public void SetOrderPrice(int price)
    {
        _orderData.Price = price;
    }
}
```

The SaveableField attribute is recognized during the save/load process for NPC and Quest objects, and the data is automatically persisted within the current save file.