# Internal Utilities API

The Internal Utilities API provides low-level functionality for cross-compatibility between Mono and Il2Cpp builds of the game. These utilities are primarily used internally by S1API but can be leveraged by advanced mod developers when needed.

## Namespace

```csharp
using S1API.Internal;
```

## Key Classes

### GameBridge

The core bridge between Mono and Il2Cpp implementations.

```csharp
public static class GameBridge
{
    public static bool IsIl2Cpp { get; }
    public static RuntimeEnvironment Environment { get; }
    
    public static TResult InvokeGameMethod<TResult>(string typeName, string methodName, params object[] args);
    public static void InvokeGameMethod(string typeName, string methodName, params object[] args);
    public static object GetGameProperty(string typeName, string propertyName);
    public static void SetGameProperty(string typeName, string propertyName, object value);
    public static object GetGameField(string typeName, string fieldName);
    public static void SetGameField(string typeName, string fieldName, object value);
    public static object CreateGameInstance(string typeName, params object[] args);
}
```

### RuntimeEnvironment

Enum representing the current runtime environment.

```csharp
public enum RuntimeEnvironment
{
    Mono,
    Il2Cpp
}
```

### TypeMapper

Handles the mapping of types between Mono and Il2Cpp environments.

```csharp
public static class TypeMapper
{
    public static Type MapType(string typeName);
    public static MethodInfo MapMethod(Type type, string methodName, Type[] parameterTypes = null);
    public static PropertyInfo MapProperty(Type type, string propertyName);
    public static FieldInfo MapField(Type type, string fieldName);
    public static bool TryMapType(string typeName, out Type type);
}
```

### GameObjectWrapper

A wrapper for game objects to provide consistent behavior across runtimes.

```csharp
public class GameObjectWrapper
{
    public object UnderlyingObject { get; }
    
    public GameObjectWrapper(object gameObject);
    public GameObjectWrapper(string typeName, params object[] constructorArgs);
    
    public TResult InvokeMethod<TResult>(string methodName, params object[] args);
    public void InvokeMethod(string methodName, params object[] args);
    public object GetProperty(string propertyName);
    public void SetProperty(string propertyName, object value);
    public object GetField(string fieldName);
    public void SetField(string fieldName, object value);
}
```

### Logger

Provides consistent logging across both runtimes.

```csharp
public static class Logger
{
    public static void Debug(string message);
    public static void Info(string message);
    public static void Warning(string message);
    public static void Error(string message);
    public static void Exception(Exception ex, string context = null);
    
    public static void SetLogLevel(LogLevel level);
    public static void SetLogPrefix(string prefix);
}
```

### LogLevel

Enum representing different logging levels.

```csharp
public enum LogLevel
{
    Debug,
    Info,
    Warning,
    Error,
    None
}
```

## Usage Examples

### Accessing Game Functionality

```csharp
// Check runtime environment
if (GameBridge.IsIl2Cpp)
{
    Logger.Info("Running in Il2Cpp mode");
}
else
{
    Logger.Info("Running in Mono mode");
}

// Invoke a game method
int playerLevel = GameBridge.InvokeGameMethod<int>("PlayerStats", "GetLevel");

// Set a game property
GameBridge.SetGameProperty("GameSettings", "DifficultyLevel", 2);

// Create a game instance
var inventory = GameBridge.CreateGameInstance("Inventory", 100); // capacity parameter
```

### Working with Game Objects

```csharp
// Create a wrapper for an existing game object
var playerWrapper = new GameObjectWrapper(GameBridge.GetGameProperty("GameManager", "CurrentPlayer"));

// Access properties and methods safely
string playerName = playerWrapper.GetProperty("Name") as string;
int playerHealth = (int)playerWrapper.GetProperty("Health");

// Invoke methods
playerWrapper.InvokeMethod("AddExperience", 100);
```

### Type Mapping

```csharp
// Get a mapped type
Type itemType = TypeMapper.MapType("Item");

// Check if a type exists and get it
if (TypeMapper.TryMapType("QuestManager", out Type questManagerType))
{
    // Use the type...
    MethodInfo completeQuestMethod = TypeMapper.MapMethod(
        questManagerType, 
        "CompleteQuest", 
        new Type[] { typeof(string) }
    );
    
    // Invoke the method using reflection
    completeQuestMethod.Invoke(null, new object[] { "mainquest.001" });
}
```

### Advanced Logging

```csharp
// Set up logging
Logger.SetLogPrefix("[MyAwesomeMod]");
Logger.SetLogLevel(LogLevel.Debug);

// Log at different levels
Logger.Debug("Detailed diagnostic information");
Logger.Info("General information");
Logger.Warning("Something might be wrong");
Logger.Error("Something definitely went wrong");

try
{
    // Some risky operation
    var result = GameBridge.InvokeGameMethod<int>("NonExistentClass", "NonExistentMethod");
}
catch (Exception ex)
{
    Logger.Exception(ex, "Failed to invoke game method");
}
```

## Best Practices

1. Only use the Internal utilities when other API modules don't provide the functionality you need
2. Be aware that direct access to game methods may break with game updates
3. Always check the runtime environment before using environment-specific code
4. Use proper error handling when accessing game functionality
5. Consider wrapping your use of Internal utilities in try-catch blocks
6. Create extension methods or wrapper classes to encapsulate your use of Internal utilities 
7. Be mindful of performance - accessing methods via reflection is slower than direct calls 