# Game Time API

The Game Time API provides tools for working with and manipulating in-game time, including day/night cycles, seasons, and time-based events.

## Namespace

```csharp
using S1API.GameTime;
```

## Key Classes

### GameClock

The main class for accessing and controlling the game's time system.

```csharp
public static class GameClock
{
    // Current time properties
    public static int Hour { get; }
    public static int Minute { get; }
    public static int Day { get; }
    public static int Month { get; }
    public static int Year { get; }
    public static Season CurrentSeason { get; }
    public static WeatherType CurrentWeather { get; }
    public static DayPhase CurrentDayPhase { get; }
    public static bool IsNight { get; }
    
    // Time flow control
    public static float TimeScale { get; set; }
    public static bool IsPaused { get; }
    
    // Methods
    public static void AdvanceTime(int hours = 0, int minutes = 0, int days = 0);
    public static void PauseTime();
    public static void ResumeTime();
    public static float GetDayProgress(); // 0.0 to 1.0 representing progress through the day
    public static TimeSpan GetTimeUntil(int hour, int minute);
    public static void SetTime(int hour, int minute);
    public static void SetDate(int day, int month, int year);
    
    // Formatted time strings
    public static string GetTimeString(bool use24HourFormat = false);
    public static string GetDateString(string format = "d MMM yyyy");
}
```

### Season

Enum representing seasons in the game.

```csharp
public enum Season
{
    Spring,
    Summer,
    Fall,
    Winter
}
```

### DayPhase

Enum representing different phases of the day.

```csharp
public enum DayPhase
{
    Dawn,
    Morning,
    Noon,
    Afternoon,
    Dusk,
    Evening,
    Midnight
}
```

### WeatherType

Enum representing different weather conditions.

```csharp
public enum WeatherType
{
    Clear,
    Cloudy,
    Rainy,
    Stormy,
    Foggy,
    Snowy
}
```

### TimeEvent

A class for scheduling events at specific times.

```csharp
public class TimeEvent
{
    public string EventID { get; }
    public string Description { get; set; }
    public bool IsRecurring { get; set; }
    public TimeSpan RecurrenceInterval { get; set; }
    
    public TimeEvent(string eventID, string description, DateTime triggerTime);
    public TimeEvent(string eventID, string description, int hour, int minute, bool triggerToday = true);
    
    public void SetRecurring(TimeSpan interval);
    public void SetRecurringDaily(int hour, int minute);
    public void SetRecurringWeekly(DayOfWeek day, int hour, int minute);
    public void Cancel();
}
```

### TimeEventManager

Static class for managing time-based events.

```csharp
public static class TimeEventManager
{
    public static event Action<TimeEvent> OnEventTriggered;
    
    public static void RegisterEvent(TimeEvent timeEvent);
    public static void UnregisterEvent(string eventID);
    public static TimeEvent GetEvent(string eventID);
    public static List<TimeEvent> GetUpcomingEvents(int maxCount = 10);
}
```

## Usage Examples

### Basic Time Manipulation

```csharp
// Get current time information
int currentHour = GameClock.Hour;
int currentMinute = GameClock.Minute;
string timeString = GameClock.GetTimeString(); // e.g. "3:45 PM"
string dateString = GameClock.GetDateString(); // e.g. "15 Jun 2025"

// Check time conditions
bool isNighttime = GameClock.IsNight;
bool isWinter = GameClock.CurrentSeason == Season.Winter;
bool isStormy = GameClock.CurrentWeather == WeatherType.Stormy;

Console.WriteLine($"It's {timeString} on {dateString}");
Console.WriteLine($"Current day phase: {GameClock.CurrentDayPhase}");

// Manipulate time
GameClock.AdvanceTime(hours: 2, minutes: 30); // Advance 2.5 hours
GameClock.SetTime(18, 0); // Set time to 6:00 PM
```

### Time Flow Control

```csharp
// Speed up time (2x normal speed)
GameClock.TimeScale = 2.0f;

// Pause time for a cutscene
GameClock.PauseTime();

// Resume normal time flow
GameClock.ResumeTime();
GameClock.TimeScale = 1.0f;

// Skip to morning
if (GameClock.IsNight)
{
    // Calculate hours until 7:00 AM
    var hoursUntilMorning = GameClock.GetTimeUntil(7, 0).TotalHours;
    GameClock.AdvanceTime(hours: (int)hoursUntilMorning);
}
```

### Scheduling Time Events

```csharp
// Create a one-time event for shop closing
var shopClosingEvent = new TimeEvent(
    "mymod.shop_closing", 
    "Local shop closes for the night", 
    hour: 20, 
    minute: 0,
    triggerToday: true
);

// Register the event
TimeEventManager.RegisterEvent(shopClosingEvent);

// Create a recurring daily event for shop opening
var shopOpeningEvent = new TimeEvent(
    "mymod.shop_opening",
    "Local shop opens for the day",
    hour: 8,
    minute: 0
);
shopOpeningEvent.SetRecurringDaily(8, 0);

// Register the event
TimeEventManager.RegisterEvent(shopOpeningEvent);

// Listen for events
TimeEventManager.OnEventTriggered += (timeEvent) => {
    if (timeEvent.EventID == "mymod.shop_closing")
    {
        // Handle shop closing
        CloseShop();
        DisplayNotification("The shop has closed for the night!");
    }
    else if (timeEvent.EventID == "mymod.shop_opening")
    {
        // Handle shop opening
        OpenShop();
        DisplayNotification("The shop is now open!");
    }
};

// Get upcoming events
var upcomingEvents = TimeEventManager.GetUpcomingEvents(5);
foreach (var evt in upcomingEvents)
{
    Console.WriteLine($"Upcoming: {evt.Description}");
}
```

## Events

The Game Time API provides events to hook into time changes:

```csharp
// Time changes
GameClock.OnHourChanged += (oldHour, newHour) => { /* ... */ };
GameClock.OnDayChanged += (oldDay, newDay) => { /* ... */ };
GameClock.OnSeasonChanged += (oldSeason, newSeason) => { /* ... */ };

// Day/night cycle
GameClock.OnDayPhaseChanged += (oldPhase, newPhase) => { /* ... */ };
GameClock.OnNightBegin += () => { /* ... */ };
GameClock.OnDayBegin += () => { /* ... */ };

// Weather changes
GameClock.OnWeatherChanged += (oldWeather, newWeather) => { /* ... */ };
```

## Best Practices

1. Use the GameClock for all time-related operations rather than implementing your own time system
2. Consider performance when scheduling many recurring events
3. Be mindful of time scale changes and how they affect gameplay
4. Use time events for scheduling rather than continuously checking time conditions
5. When advancing time, consider the impact on scheduled events and NPC schedules
6. Use the day/night and season events to adjust your mod's behavior appropriately 