# Utility Functions

The S1API Utilities module provides a collection of helper functions and classes that simplify common modding tasks. These utilities work consistently across both Mono and Il2Cpp builds.

## String Utilities

String manipulation utilities to help with common text operations:

```csharp
public static class StringUtils
{
    // Generate a random string with specified length
    public static string GenerateRandomString(int length);
    
    // Check if a string matches a wildcard pattern
    public static bool MatchesWildcard(string text, string pattern);
    
    // Truncate a string to a maximum length with ellipsis
    public static string Truncate(string text, int maxLength, bool addEllipsis = true);
    
    // Parse a string into a safe filename
    public static string ToSafeFilename(string input);
}
```

## Math Utilities

Mathematical helper functions:

```csharp
public static class MathUtils
{
    // Remap a value from one range to another
    public static float Remap(float value, float fromMin, float fromMax, float toMin, float toMax);
    
    // Get a point on a bezier curve
    public static Vector3 GetBezierPoint(Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3, float t);
    
    // Check if a point is inside a polygon
    public static bool IsPointInPolygon(Vector2 point, List<Vector2> polygon);
    
    // Generate a random point inside a circle
    public static Vector2 RandomPointInCircle(float radius);
}
```

## Reflection Utilities

Helpers for reflective operations (especially useful for cross-compatibility):

```csharp
public static class ReflectionUtils
{
    // Get a private field value from an object
    public static T GetPrivateField<T>(object instance, string fieldName);
    
    // Set a private field value on an object
    public static void SetPrivateField(object instance, string fieldName, object value);
    
    // Invoke a private method on an object
    public static T InvokePrivateMethod<T>(object instance, string methodName, params object[] args);
    
    // Check if a type has a specific method
    public static bool HasMethod(Type type, string methodName, params Type[] parameterTypes);
}
```

## Game State Utilities

Utilities for accessing and manipulating game state:

```csharp
public static class GameStateUtils
{
    // Check if the game is paused
    public static bool IsGamePaused();
    
    // Get the current game difficulty
    public static GameDifficulty GetCurrentDifficulty();
    
    // Get the current in-game time
    public static TimeSpan GetGameTime();
    
    // Get the current game season
    public static Season GetCurrentSeason();
}
```

## UI Utilities

Helpers for working with UI elements:

```csharp
public static class UIUtils
{
    // Create a simple notification
    public static void ShowNotification(string message, float duration = 3f);
    
    // Show a confirmation dialog
    public static void ShowConfirmationDialog(string message, Action onConfirm, Action onCancel = null);
    
    // Create a floating text at world position
    public static void CreateFloatingText(Vector3 worldPosition, string text, Color color);
    
    // Get screen position from world position
    public static Vector2 WorldToScreenPoint(Vector3 worldPosition);
}
```

## Logging Utilities

Enhanced logging functionality:

```csharp
public static class Log
{
    // Log levels
    public enum LogLevel { Debug, Info, Warning, Error, Critical }
    
    // Log a message with specified level
    public static void Message(LogLevel level, string message);
    
    // Convenience methods
    public static void Debug(string message);
    public static void Info(string message);
    public static void Warning(string message);
    public static void Error(string message);
    public static void Critical(string message);
    
    // Log with a tag
    public static void Tagged(string tag, string message, LogLevel level = LogLevel.Info);
}
```

## File System Utilities

Safe file system operations:

```csharp
public static class FileUtils
{
    // Get a safe path for mod-specific files
    public static string GetModFilePath(string modId, string relativePath);
    
    // Safely read all text from a file
    public static string SafeReadAllText(string path, string defaultValue = "");
    
    // Safely write all text to a file
    public static bool SafeWriteAllText(string path, string contents);
    
    // Check if a file can be accessed
    public static bool CanAccessFile(string path);
}
```

## Performance Monitoring

Utilities for monitoring performance:

```csharp
public static class PerformanceMonitor
{
    // Start measuring performance
    public static PerformanceSnapshot StartMeasuring(string operationName);
    
    // Stop measuring and get results
    public static PerformanceResult StopMeasuring(PerformanceSnapshot snapshot);
    
    // Log all performance metrics
    public static void LogAllMetrics();
    
    // Clear performance history
    public static void ClearMetrics();
}
```

## Best Practices

1. **Choose the right utility** - S1API provides multiple ways to accomplish some tasks, so select the most appropriate utility for your specific needs
2. **Check for null** - Always validate inputs and outputs, especially when working with reflection
3. **Handle exceptions** - Many utility functions can throw exceptions, so implement proper error handling
4. **Monitor performance** - Use the performance monitoring utilities to identify bottlenecks in your code
5. **Minimize reflection usage** - While the reflection utilities make it easier, reflection should still be used sparingly due to performance considerations 