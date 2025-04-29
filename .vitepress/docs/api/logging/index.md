# Logging API

The Logging API provides a unified logging system that works with both BepInEx and MelonLoader.

## Namespace

```csharp
using S1API.Logging;
```

## Key Classes and Interfaces

### Log

Centralized logging class that handles both BepInEx and MelonLoader logging.

```csharp
public class Log
{
    // Constructor that creates a new logger with the specified source name
    public Log(string sourceName);
    
    // BepInEx-specific constructor that uses an existing log source
    public Log(ManualLogSource loggerInstance);
    
    // Logs a message with Info level
    public void Msg(string message);
    
    // Logs a message with Warning level
    public void Warning(string message);
    
    // Logs a message with Error level
    public void Error(string message);
    
    // Logs a message with Fatal level
    public void BigError(string message);
}
```

## Log Methods

### Constructors

```csharp
// Default constructor that creates a new logger with the specified source name
public Log(string sourceName);

// BepInEx-specific constructor that uses an existing log source (only available in BepInEx builds)
#if (MONOBEPINEX || IL2CPPBEPINEX)
public Log(ManualLogSource loggerInstance);
#endif
```

### Logging Methods

```csharp
// Logs a message with Info level
public void Msg(string message);

// Logs a message with Warning level
public void Warning(string message);

// Logs a message with Error level
public void Error(string message);

// Logs a message with Fatal level
public void BigError(string message);
```

## Usage Examples

### Basic Logging

```csharp
using S1API.Logging;

public class MyMod
{
    private Log _logger;
    
    public MyMod()
    {
        // Create a new logger with your mod name as the source
        _logger = new Log("MyAwesomeMod");
        
        // Log some messages with different levels
        _logger.Msg("Mod initialized successfully");
        _logger.Warning("This is a warning message");
        _logger.Error("Something went wrong!");
        _logger.BigError("Critical error occurred!");
    }
}
```

### Using with Existing Logger (BepInEx)

```csharp
using BepInEx;
using S1API.Logging;

[BepInPlugin("com.example.myplugin", "My Plugin", "1.0.0")]
public class MyPlugin : BaseUnityPlugin
{
    private Log _logger;
    
    private void Awake()
    {
        // Use the BepInEx logger with S1API Log wrapper
        _logger = new Log(Logger);
        
        _logger.Msg("Plugin is awake");
    }
}
```
