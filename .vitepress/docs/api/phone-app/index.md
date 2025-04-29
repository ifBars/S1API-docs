# Phone App API

The Phone App API provides functionality for creating custom applications for the in-game phone, allowing mods to integrate seamlessly with the game's UI system.

## Namespace

```csharp
using S1API.PhoneApp;
```

## Key Classes

### PhoneApp

Abstract base class for creating custom phone applications.

```csharp
public abstract class PhoneApp
{
    protected GameObject Player;
    protected GameObject AppPanel;
    protected bool AppCreated;
    protected bool IconModified;
    protected bool InitializationStarted;
    
    protected abstract string AppName { get; }
    protected abstract string AppTitle { get; }
    protected abstract string IconLabel { get; }
    protected abstract string IconFileName { get; }
    
    protected abstract void OnCreatedUI(GameObject container);
    
    public void Init(MelonLogger.Instance logger);
}
```

### UIFactory

Utility class for creating UI elements for phone apps.

```csharp
public static class UIFactory
{
    public static GameObject Panel(string name, Transform parent, Color bgColor, Vector2? anchorMin = null, Vector2? anchorMax = null, bool fullAnchor = false);
    public static Text Text(string name, string content, Transform parent, int fontSize = 16, TextAnchor anchor = TextAnchor.UpperLeft, FontStyle style = FontStyle.Normal);
    public static GameObject Button(string name, string label, Transform parent, Color color);
    public static RectTransform ScrollableVerticalList(string name, Transform parent, out VerticalLayoutGroup layoutGroup);
}
```

### PhoneAppManager

Static class for managing phone apps and their integration with the game.

```csharp
public static class PhoneAppManager
{
    private static readonly List<PhoneApp> registeredApps;
    
    public static void Register(PhoneApp app);
    public static void InitAll(MelonLogger.Instance logger);
}
```

## Usage Examples

### Creating a Simple Phone App

```csharp
// Create a custom phone app by extending the PhoneApp class
public class MyAwesomeApp : PhoneApp
{
    // Required app metadata
    protected override string AppName => "MyAwesomeApp";
    protected override string AppTitle => "My Awesome App";
    protected override string IconLabel => "Awesome";
    protected override string IconFileName => "my_icon.png";
    
    // Called when the app UI is being created
    protected override void OnCreatedUI(GameObject container)
    {
        // Create a panel with black background
        GameObject panel = UIFactory.Panel("MainPanel", container.transform, Color.black);
        
        // Add a text element to the panel
        UIFactory.Text("HelloText", "Hello from My Awesome App!", panel.transform, 
                      22, TextAnchor.MiddleCenter, FontStyle.Bold);
    }
}
```

### Registering Your App with the Phone System

```csharp
using MelonLoader;
using S1API.PhoneApp;

public class MyMod : MelonMod
{
    public override void OnApplicationStart()
    {
        // Register your app
        PhoneAppManager.Register(new MyAwesomeApp());
    }

    public override void OnSceneWasLoaded(int buildIndex, string sceneName)
    {
        // Initialize all registered apps when the game scene loads
        if (sceneName == "MainScene") // Replace with your in-game scene
        {
            PhoneAppManager.InitAll(LoggerInstance);
        }
    }
}
```

## Icon Setup

1. Create a PNG file for your app icon (recommended size: 128x128 or 256x256)
2. Save it in the UserData folder with the name matching your `IconFileName` property
3. Transparent background is preferred for better visual integration