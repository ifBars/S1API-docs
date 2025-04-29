# Property API

The Property API provides tools for interacting with and managing properties in the game.

## Namespace

```csharp
using S1API.Property;
```

## Key Classes and Interfaces

### BaseProperty

Abstract base class that defines the common interface for property entities.

```csharp
public abstract class BaseProperty
{
    // Gets the name of the property
    public abstract string PropertyName { get; }
    
    // Gets the unique code identifier for the property
    public abstract string PropertyCode { get; }
    
    // Gets the price of the property
    public abstract float Price { get; }
    
    // Gets whether the property is currently owned
    public abstract bool IsOwned { get; }
    
    // Gets or sets the maximum number of employees that can be assigned to the property
    public abstract int EmployeeCapacity { get; set; }
    
    // Marks the property as owned
    public abstract void SetOwned();
    
    // Determines if a point is within the property's boundaries
    public abstract bool IsPointInside(UnityEngine.Vector3 point);
}
```

### PropertyWrapper

Concrete implementation of BaseProperty that wraps the game's internal property class. This class handles the differences between IL2CPP and Mono runtime environments using preprocessor directives.

```csharp
public class PropertyWrapper : BaseProperty 
{
    // Internal property reference, depends on runtime environment
    #if IL2CPPBEPINEX || IL2CPPMELON
    internal readonly Il2CppScheduleOne.Property.Property InnerProperty;
    #else
    internal readonly ScheduleOne.Property.Property InnerProperty;
    #endif
    
    // Constructor accepting the game's internal property instance
    #if IL2CPPBEPINEX || IL2CPPMELON
    public PropertyWrapper(Il2CppScheduleOne.Property.Property property)
    #else
    public PropertyWrapper(ScheduleOne.Property.Property property)
    #endif
    {
        InnerProperty = property;
    }
    
    // Overridden properties and methods from BaseProperty
    public override string PropertyName => InnerProperty.PropertyName;
    public override string PropertyCode => InnerProperty.PropertyCode;
    public override float Price => InnerProperty.Price;
    public override bool IsOwned => InnerProperty.IsOwned;
    public override int EmployeeCapacity { get => InnerProperty.EmployeeCapacity; set => InnerProperty.EmployeeCapacity = value; }
    
    public override void SetOwned() => InnerProperty.SetOwned();
    public override bool IsPointInside(UnityEngine.Vector3 point) => InnerProperty.DoBoundsContainPoint(point);
}
```

### PropertyManager

Static utility class for accessing and managing property data. Uses conditional compilation to handle differences between IL2CPP and Mono environments.

```csharp
public static class PropertyManager
{
    // Gets a list of all properties in the game
    public static List<PropertyWrapper> GetAllProperties();
    
    // Gets a list of all currently owned properties
    public static List<PropertyWrapper> GetOwnedProperties();
    
    // Finds a property by its name
    public static PropertyWrapper FindPropertyByName(string name);
}
```

## BaseProperty Members

### Properties

```csharp
// Gets the name of the property
public abstract string PropertyName { get; }

// Gets the unique code identifier for the property
public abstract string PropertyCode { get; }

// Gets the price of the property
public abstract float Price { get; }

// Gets whether the property is currently owned
public abstract bool IsOwned { get; }

// Gets or sets the maximum number of employees that can be assigned to the property
public abstract int EmployeeCapacity { get; set; }
```

### Methods

```csharp
// Marks the property as owned
public abstract void SetOwned();

// Determines if a point is within the property's boundaries
public abstract bool IsPointInside(UnityEngine.Vector3 point);
```

## PropertyWrapper Implementation

The PropertyWrapper class provides a concrete implementation of BaseProperty, serving as a bridge between the API and the game's internal property system. It handles the differences between IL2CPP and Mono runtime environments through preprocessor directives.

All members inherited from BaseProperty are implemented by delegating to the corresponding functionality in the wrapped property instance. For example:

```csharp
// Property name is directly mapped from the inner property
public override string PropertyName => InnerProperty.PropertyName;

// Employee capacity has both getter and setter that delegate to inner property
public override int EmployeeCapacity 
{
    get => InnerProperty.EmployeeCapacity;
    set => InnerProperty.EmployeeCapacity = value;
}

// IsPointInside delegates to the DoBoundsContainPoint method of the inner property
public override bool IsPointInside(UnityEngine.Vector3 point) => InnerProperty.DoBoundsContainPoint(point);
```

## PropertyManager Methods

```csharp
// Retrieves a list of all properties available in the game by wrapping each
// of the game's internal property objects in a PropertyWrapper instance
public static List<PropertyWrapper> GetAllProperties();

// Retrieves a list of all properties that are currently owned by filtering
// through the game's internal owned properties collection
public static List<PropertyWrapper> GetOwnedProperties();

// Finds a property with the given name from the list of available properties
// Returns null if no property with the specified name is found
public static PropertyWrapper FindPropertyByName(string name);
```

## Usage Examples

### Accessing All Properties

```csharp
using S1API.Property;
using System.Collections.Generic;
using UnityEngine;

public class PropertyExample
{
    public void ListAllProperties()
    {
        List<PropertyWrapper> allProperties = PropertyManager.GetAllProperties();
        
        Debug.Log($"Total properties: {allProperties.Count}");
        
        foreach (var property in allProperties)
        {
            Debug.Log($"Property: {property.PropertyName}, Price: {property.Price}, Owned: {property.IsOwned}");
        }
    }
}
```

### Working with Owned Properties

```csharp
using S1API.Property;
using System.Collections.Generic;
using UnityEngine;

public class OwnedPropertyExample
{
    public void ManageOwnedProperties()
    {
        List<PropertyWrapper> ownedProperties = PropertyManager.GetOwnedProperties();
        
        Debug.Log($"You own {ownedProperties.Count} properties");
        
        // Increase employee capacity for all owned properties
        foreach (var property in ownedProperties)
        {
            // Get current capacity
            int currentCapacity = property.EmployeeCapacity;
            
            // Increase capacity by 2
            property.EmployeeCapacity = currentCapacity + 2;
            
            Debug.Log($"Increased employee capacity for {property.PropertyName} from {currentCapacity} to {property.EmployeeCapacity}");
        }
    }
}
```

### Finding and Purchasing a Property

```csharp
using S1API.Property;
using UnityEngine;

public class PropertyPurchaseExample
{
    public void PurchasePropertyByName(string propertyName)
    {
        // Find the property
        PropertyWrapper property = PropertyManager.FindPropertyByName(propertyName);
        
        if (property == null)
        {
            Debug.LogError($"Property '{propertyName}' not found");
            return;
        }
        
        // Check if already owned
        if (property.IsOwned)
        {
            Debug.Log($"You already own {property.PropertyName}");
            return;
        }
        
        // Purchase the property (game logic would typically handle money transaction)
        Debug.Log($"Purchasing {property.PropertyName} for ${property.Price}");
        property.SetOwned();
        
        // Verify purchase
        Debug.Log($"Property owned status: {property.IsOwned}");
    }
}
```

### Checking if a Point is Inside a Property

```csharp
using S1API.Property;
using UnityEngine;

public class PropertyBoundsExample
{
    public void CheckPointInProperty(UnityEngine.Vector3 position)
    {
        List<PropertyWrapper> allProperties = PropertyManager.GetAllProperties();
        
        foreach (var property in allProperties)
        {
            if (property.IsPointInside(position))
            {
                Debug.Log($"Position {position} is inside property: {property.PropertyName}");
                return;
            }
        }
        
        Debug.Log($"Position {position} is not inside any property");
    }
}
```
