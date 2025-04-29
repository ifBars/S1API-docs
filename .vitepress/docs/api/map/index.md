# Map API

The Map API provides tools for navigating and interacting with the game's world map and regions.

## Namespace

```csharp
using S1API.Map;
```

## Key Classes and Interfaces

### Region

An enumeration representing the different regions available in the game.

```csharp
public enum Region
{
    /// <summary>
    /// The first region in the game.
    /// </summary>
    Northtown,
    
    /// <summary>
    /// The second region in the game.
    /// </summary>
    Westville,
    
    /// <summary>
    /// The third region in the game.
    /// </summary>
    Downtown,
    
    /// <summary>
    /// The fourth region in the game.
    /// </summary>
    Docks,
    
    /// <summary>
    /// The fifth region in the game.
    /// </summary>
    Suburbia,
    
    /// <summary>
    /// The sixth region in the game.
    /// </summary>
    Uptown
}
```

## Usage Examples

### Checking Current Region

```csharp
using S1API.Map;
using S1API.Player;

public class RegionExample
{
    public void CheckPlayerRegion()
    {
        // Get the player's current region
        Region currentRegion = PlayerManager.GetCurrentRegion();
        
        // Perform different actions based on the current region
        switch (currentRegion)
        {
            case Region.Northtown:
                Debug.Log("Welcome to Northtown, the starting area!");
                break;
                
            case Region.Downtown:
                Debug.Log("Downtown is bustling with activity!");
                break;
                
            case Region.Uptown:
                Debug.Log("You've reached Uptown, the most exclusive district!");
                break;
                
            default:
                Debug.Log($"You are currently in {currentRegion}");
                break;
        }
    }
}
```
