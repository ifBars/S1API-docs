# Products API

The Products API provides functionality for working with product items in the game, including specialized products like drugs.

## Namespace

```csharp
using S1API.Products;
```

## Key Classes

### ProductDefinition

Represents the definition of a product in the game. Inherits from `ItemDefinition`.

```csharp
public class ProductDefinition : ItemDefinition
{
    // INTERNAL properties and methods omitted
    
    public float Price { get; }
    
    public override ItemInstance CreateInstance(int quantity = 1);
}
```

### ProductInstance

Represents an instance of a product in the game. Inherits from `ItemInstance`.

```csharp
public class ProductInstance : ItemInstance
{
    // INTERNAL properties and methods omitted
    
    public bool IsPackaged { get; }
    public PackagingDefinition AppliedPackaging { get; }
}
```

### ProductManager

Static class for accessing products in the game.

```csharp
public static class ProductManager
{
    public static ProductDefinition[] DiscoveredProducts { get; }
}
```

### Product Type Definitions

The API provides specialized product definition classes for different drug types:

#### WeedDefinition

```csharp
public class WeedDefinition : ProductDefinition
{
    // INTERNAL properties and methods omitted
    
    public override ItemInstance CreateInstance(int quantity = 1);
}
```

#### MethDefinition

```csharp
public class MethDefinition : ProductDefinition
{
    // INTERNAL properties and methods omitted
    
    public override ItemInstance CreateInstance(int quantity = 1);
}
```

#### CocaineDefinition

```csharp
public class CocaineDefinition : ProductDefinition
{
    // INTERNAL properties and methods omitted
    
    public override ItemInstance CreateInstance(int quantity = 1);
}
```

### PackagingDefinition

Represents a type of packaging in the game. Inherits from `ItemDefinition`.

```csharp
public class PackagingDefinition : ItemDefinition
{
    // INTERNAL properties and methods omitted
    
    public int Quantity { get; }
}
```

### ProductDefinitionWrapper

Utility class for wrapping product definitions based on their specialized type.

```csharp
public static class ProductDefinitionWrapper
{
    public static ProductDefinition Wrap(ProductDefinition def);
}
```

## Related Base Classes

These classes are from the `S1API.Items` namespace and serve as base classes for the Products API.

### ItemDefinition

```csharp
public class ItemDefinition
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

```csharp
public class ItemInstance
{
    public ItemDefinition Definition { get; }
}
```

### ItemCategory

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

### Getting Products

```csharp
// Access all discovered products
ProductDefinition[] products = ProductManager.DiscoveredProducts;

// Loop through products
foreach (var product in products)
{
    Console.WriteLine($"Product: {product.Name}, Price: ${product.Price}");
    
    // Check for specific product types
    if (product is WeedDefinition weedProduct)
    {
        // Handle weed-specific functionality
    }
    else if (product is MethDefinition methProduct)
    {
        // Handle meth-specific functionality
    }
    else if (product is CocaineDefinition cocaineProduct)
    {
        // Handle cocaine-specific functionality
    }
}
```

### Creating Product Instances

```csharp
// Get a product definition
ProductDefinition productDef = ProductManager.DiscoveredProducts.FirstOrDefault(p => p.Name == "Product Name");

if (productDef != null)
{
    // Create an instance (e.g., to add to inventory)
    ProductInstance productInstance = (ProductInstance)productDef.CreateInstance(5); // Quantity of 5
    
    // Check if product is packaged
    if (productInstance.IsPackaged)
    {
        PackagingDefinition packaging = productInstance.AppliedPackaging;
        Console.WriteLine($"Product is in packaging that can hold {packaging.Quantity} items");
    }
}
```