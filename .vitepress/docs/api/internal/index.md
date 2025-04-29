# Internal Utilities API

The Internal Utilities API provides low-level functionality for cross-compatibility between Mono and Il2Cpp builds of the game. These utilities are primarily used internally by S1API but can be leveraged by advanced mod developers when needed.

## Namespace

```csharp
using S1API.Internal.Utils;
```

## Key Classes

### ButtonUtils

Provides utilities for working with Unity UI buttons, ensuring compatibility across different runtime environments.

```csharp
public static class ButtonUtils
{
    public static void AddListener(Button button, Action action);
    public static void RemoveListener(Button button, Action action);
    public static void ClearListeners(Button button);
    public static void Enable(Button button, Text label = null, string text = null);
    public static void Disable(Button button, Text label = null, string text = null);
    public static void SetLabel(Text label, string text);
    public static void SetStyle(Button button, Text label, string text, Color bg);
}
```

### ImageUtils

Provides utilities for loading and manipulating images in the game.

```csharp
public static class ImageUtils
{
    public static Sprite LoadImage(string fileName);
}
```

### RandomUtils

A utility class providing random selection functionality for lists and numeric ranges.

```csharp
public static class RandomUtils
{
    public static T PickOne<T>(this IList<T> list);
    public static T PickUnique<T>(this IList<T> list, Func<T, bool> isDuplicate, int maxTries = 10);
    public static List<T> PickMany<T>(this IList<T> list, int count);
    public static int RangeInt(int minInclusive, int maxExclusive);
}
```

### CrossType

Provides cross-compatibility methods to assist between Mono and Il2Cpp runtime environments.

```csharp
internal static class CrossType
{
    internal static Type Of<T>();
    internal static bool Is<T>(object obj, out T result);
    internal static T As<T>(object obj);
}
```

### ReflectionUtils

Provides generic reflection-based methods for easier API development.

```csharp
internal static class ReflectionUtils
{
    internal static List<Type> GetDerivedClasses<TBaseClass>();
    internal static Type? GetTypeByName(string typeName);
    internal static FieldInfo[] GetAllFields(Type? type, BindingFlags bindingFlags);
    public static MethodInfo? GetMethod(Type? type, string methodName, BindingFlags bindingFlags);
}
```

## Usage Examples

### Working with Buttons

```csharp
// Add a click listener to a button
Button myButton = someGameObject.GetComponent<Button>();
ButtonUtils.AddListener(myButton, () => {
    // Your button click handling code here
    Debug.Log("Button was clicked!");
});

// Enable/disable a button with label
Text buttonLabel = myButton.GetComponentInChildren<Text>();
ButtonUtils.Disable(myButton, buttonLabel, "Currently Unavailable");

// Later, re-enable the button
ButtonUtils.Enable(myButton, buttonLabel, "Click Me!");
```

### Loading Images

```csharp
// Load an image file and convert it to a sprite
Sprite iconSprite = ImageUtils.LoadImage("icons/myIcon.png");
if (iconSprite != null)
{
    // Use the sprite, for example:
    someImage.sprite = iconSprite;
}
```

### Using Random Utilities

```csharp
// Get a random item from a list
List<string> options = new List<string> { "Option A", "Option B", "Option C" };
string randomOption = options.PickOne();

// Get multiple random items
List<string> selectedOptions = options.PickMany(2);

// Get a random number in a range
int randomValue = RandomUtils.RangeInt(1, 100);
```

### Cross-Type Compatibility

```csharp
// Get the type of a class that works in both Mono and IL2CPP
Type playerType = CrossType.Of<PlayerController>();

// Check if an object is of a specific type
if (CrossType.Is<Inventory>(someObject, out var inventory))
{
    // Use the inventory object safely
}

// Cast an object to a compatible type
var character = CrossType.As<Character>(someGameObject);
```

### Using Reflection Utilities

```csharp
// Find all classes that derive from a base class
List<Type> allItemTypes = ReflectionUtils.GetDerivedClasses<BaseItem>();

// Find a type by its name
Type itemType = ReflectionUtils.GetTypeByName("InventoryItem");

// Get all fields from a type and its base types
FieldInfo[] allFields = ReflectionUtils.GetAllFields(typeof(Player), 
    BindingFlags.Instance | BindingFlags.NonPublic);
```

## Use Cases

1. **Button Handlers**: Use ButtonUtils for managing button interactions.

2. **Image Loading**: When loading external images, use ImageUtils.LoadImage rather than implementing your own loading logic.

3. **Random Selection**: Use the RandomUtils extension methods for collections rather than implementing your own random selection logic.

4. **Reflection Usage**: Minimize the use of reflection in performance-critical code. When reflection is necessary, use the ReflectionUtils methods.