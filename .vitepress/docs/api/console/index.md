# Console API

The Console API provides tools for interacting with the in-game console system.

## Namespace

```csharp
using S1API.Console;
```

## Key Classes and Interfaces

### ConsoleHelper

Utility class that provides easy access to the in-game console system.

```csharp
public static class ConsoleHelper
{
    // Executes the ChangeCashCommand with the given amount
    public static void RunCashCommand(int amount);
}
```

## ConsoleHelper Methods

### Game Commands

```csharp
// Executes the ChangeCashCommand with the given amount.
// This method works across both IL2CPP and Mono builds.
public static void RunCashCommand(int amount);
```

## Usage Examples

### Modifying Player Cash

```csharp
using S1API.Console;

public class ConsoleExample
{
    public void ModifyPlayerCash()
    {
        // Add 1000 cash to the player
        ConsoleHelper.RunCashCommand(1000);
        
        // Remove 500 cash from the player
        ConsoleHelper.RunCashCommand(-500);
    }
}
```
