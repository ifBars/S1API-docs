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
    
    protected abstract void OnCreated(GameObject container);
    
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
    public static List<PhoneApp> RegisteredApps { get; }
    
    public static void RegisterApp(PhoneApp app);
    public static void UnregisterApp(string appName);
    public static PhoneApp GetApp(string appName);
    public static void OpenApp(string appName);
    public static void CloseApp(string appName);
    public static void CloseAllApps();
    public static bool IsAppOpen(string appName);
}
```

### Notification

Class for displaying phone notifications to the player.

```csharp
public class Notification
{
    public string Title { get; set; }
    public string Message { get; set; }
    public Sprite Icon { get; set; }
    public float Duration { get; set; }
    public NotificationType Type { get; set; }
    
    public Notification(string title, string message, NotificationType type = NotificationType.Default);
    
    public void Show();
    public void SetAction(string actionText, Action onClick);
}
```

### NotificationType

Enum representing different types of phone notifications.

```csharp
public enum NotificationType
{
    Default,
    Info,
    Warning,
    Error,
    Success,
    Message
}
```

## Usage Examples

### Creating a Simple Phone App

```csharp
// Create a custom phone app by extending the PhoneApp class
public class WeatherApp : PhoneApp
{
    // Required app metadata
    protected override string AppName => "WeatherApp";
    protected override string AppTitle => "Weather Forecast";
    protected override string IconLabel => "Weather";
    protected override string IconFileName => "weather_icon.png";
    
    // Weather data
    private readonly List<string> _cities = new List<string>{"Downtown", "Harbor District", "Suburbs", "Industrial Zone"};
    private readonly List<string> _conditions = new List<string>{"Sunny", "Cloudy", "Rainy", "Foggy", "Stormy"};
    private readonly System.Random _random = new System.Random();
    
    // Called when the app UI is being created
    protected override void OnCreated(GameObject container)
    {
        // Create app header
        UIFactory.Panel("Header", container.transform, new Color(0.2f, 0.2f, 0.4f), fullAnchor: true);
        UIFactory.Text("Title", AppTitle, container.transform, 24, TextAnchor.MiddleCenter, FontStyle.Bold);
        
        // Create scrollable content for the forecast
        UIFactory.ScrollableVerticalList("WeatherList", container.transform, out var layoutGroup);
        layoutGroup.spacing = 10;
        layoutGroup.padding = new RectOffset(10, 10, 10, 10);
        
        // Generate weather data for each city
        foreach (string city in _cities)
        {
            GameObject cityPanel = UIFactory.Panel(city, layoutGroup.transform, new Color(0.15f, 0.15f, 0.3f));
            UIFactory.Text("CityName", city, cityPanel.transform, 18, TextAnchor.UpperLeft, FontStyle.Bold);
            
            string condition = _conditions[_random.Next(_conditions.Count)];
            int temperature = _random.Next(50, 95);
            UIFactory.Text("Condition", $"{condition}, {temperature}°F", cityPanel.transform, 16);
            
            // Create refresh button
            GameObject refreshButton = UIFactory.Button("RefreshButton", "Refresh", cityPanel.transform, new Color(0.3f, 0.3f, 0.6f));
            Button button = refreshButton.GetComponent<Button>();
            string capturedCity = city; // Capture for lambda
            button.onClick.AddListener(() => RefreshWeather(capturedCity, cityPanel));
        }
    }
    
    // Method to update the weather display
    private void RefreshWeather(string city, GameObject panel)
    {
        string newCondition = _conditions[_random.Next(_conditions.Count)];
        int newTemperature = _random.Next(50, 95);
        
        // Find and update the condition text
        Transform conditionText = panel.transform.Find("Condition");
        if (conditionText != null)
        {
            Text text = conditionText.GetComponent<Text>();
            text.text = $"{newCondition}, {newTemperature}°F";
        }
        
        // Show a notification
        var notification = new Notification(
            "Weather Updated", 
            $"Latest forecast for {city}: {newCondition}", 
            NotificationType.Info
        );
        notification.Show();
    }
}

// Initialize the app
public void Initialize()
{
    WeatherApp weatherApp = new WeatherApp();
    weatherApp.Init(MelonLogger.CreateInstance("WeatherApp"));
    
    // Register with the phone app manager
    PhoneAppManager.RegisterApp(weatherApp);
}
```

### Working with Notifications

```csharp
// Create and show a basic notification
var basicNotification = new Notification(
    "New Message", 
    "You have received a new message from an unknown contact.",
    NotificationType.Message
);
basicNotification.Show();

// Create a notification with an action
var actionNotification = new Notification(
    "Quest Completed", 
    "You have completed 'The Missing Package' quest. Reward: $500",
    NotificationType.Success
);
actionNotification.SetAction("View Details", () => {
    // Open quest log or quest details screen
    PhoneAppManager.OpenApp("QuestApp");
    // Navigate to specific quest
    QuestApp.NavigateToQuest("missing_package");
});
actionNotification.Show();

// Create a warning notification that will be displayed for a longer time
var warningNotification = new Notification(
    "Low Battery", 
    "Your phone battery is below 20%. Connect to a charger soon.",
    NotificationType.Warning
);
warningNotification.Duration = 8.0f; // Show for 8 seconds
warningNotification.Show();
```

### Managing Phone Apps

```csharp
// Get a registered app
var noteApp = PhoneAppManager.GetApp("NoteApp");

// Check if an app is already open
if (!PhoneAppManager.IsAppOpen("MessagesApp"))
{
    // Open the app
    PhoneAppManager.OpenApp("MessagesApp");
}

// Close a specific app
PhoneAppManager.CloseApp("SettingsApp");

// Close all open apps
PhoneAppManager.CloseAllApps();

// Unregister an app (removes it from the phone)
PhoneAppManager.UnregisterApp("DebugApp");
```

## Events

The Phone App API provides events to hook into phone-related actions:

```csharp
// App lifecycle events
PhoneAppManager.OnAppOpened += (app) => { /* ... */ };
PhoneAppManager.OnAppClosed += (app) => { /* ... */ };
PhoneAppManager.OnAppRegistered += (app) => { /* ... */ };
PhoneAppManager.OnAppUnregistered += (appName) => { /* ... */ };

// Phone state events
PhoneAppManager.OnPhoneOpened += () => { /* ... */ };
PhoneAppManager.OnPhoneClosed += () => { /* ... */ };

// Notification events
NotificationManager.OnNotificationShown += (notification) => { /* ... */ };
NotificationManager.OnNotificationDismissed += (notification) => { /* ... */ };
NotificationManager.OnNotificationActionTriggered += (notification) => { /* ... */ };
```

## Best Practices

1. Use the PhoneApp base class for all custom apps to ensure proper integration
2. Place your app icon PNG files in the UserData directory with appropriate names
3. Design UI that matches the game's visual style for a seamless experience
4. Keep phone apps lightweight and focused on specific functionality
5. Use notifications sparingly to avoid overwhelming the player
6. Include clear feedback when actions are performed in your app
7. Consider the phone screen size when designing your UI layout 