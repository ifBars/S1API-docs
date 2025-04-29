# Game Time API

The Game Time API provides tools for working with and manipulating in-game time.

## Namespace

```csharp
using S1API.GameTime;
```

## Key Classes

### Day

Enum representing days of the week.

```csharp
public enum Day
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
```

### GameDateTime

Represents an in-game datetime (elapsed days and 24-hour time).

```csharp
public struct GameDateTime
{
    public int ElapsedDays;
    public int Time;
    
    // Constructors
    public GameDateTime(int elapsedDays, int time);
    public GameDateTime(int minSum);
    
    // Methods
    public int GetMinSum();
    public GameDateTime AddMinutes(int minutes);
    public string GetFormattedTime();
    public bool IsNightTime();
    public bool IsSameDay(GameDateTime other);
    public bool IsSameTime(GameDateTime other);
    public override string ToString();
    
    // Operators
    public static GameDateTime operator +(GameDateTime a, GameDateTime b);
    public static GameDateTime operator -(GameDateTime a, GameDateTime b);
    public static bool operator >(GameDateTime a, GameDateTime b);
    public static bool operator <(GameDateTime a, GameDateTime b);
}
```

### TimeManager

Provides access to various time management functions in the game.

```csharp
public static class TimeManager
{
    // Events
    public static Action OnDayPass;
    public static Action OnWeekPass;
    public static Action OnSleepStart;
    public static Action<int> OnSleepEnd;
    
    // Properties
    public static Day CurrentDay { get; }
    public static int ElapsedDays { get; }
    public static int CurrentTime { get; }
    public static bool IsNight { get; }
    public static bool IsEndOfDay { get; }
    public static bool SleepInProgress { get; }
    public static bool TimeOverridden { get; }
    public static float NormalizedTime { get; }
    public static float Playtime { get; }
    
    // Methods
    public static void FastForwardToWakeTime();
    public static void SetTime(int time24h, bool local = false);
    public static void SetElapsedDays(int days);
    public static string GetFormatted12HourTime();
    public static bool IsCurrentTimeWithinRange(int startTime24h, int endTime24h);
    public static int GetMinutesFrom24HourTime(int time24h);
    public static int Get24HourTimeFromMinutes(int minutes);
}
```

## Usage Examples

### Working with GameDateTime

```csharp
// Create a new game date time (day 3, 2:30 PM)
GameDateTime dateTime = new GameDateTime(3, 1430);

// Add 60 minutes
GameDateTime later = dateTime.AddMinutes(60);

// Check if it's night time
bool isNight = dateTime.IsNightTime();

// Format the time
string timeString = dateTime.GetFormattedTime(); // e.g., "2:30 PM"

// Compare game date times
bool sameDay = dateTime.IsSameDay(later);
bool laterInTime = later > dateTime;
```

### Using TimeManager

```csharp
// Get current day and time information
Day today = TimeManager.CurrentDay;
int currentTime = TimeManager.CurrentTime;
bool isNightTime = TimeManager.IsNight;
float dayProgress = TimeManager.NormalizedTime; // 0.0 to 1.0

// Format current time
string timeString = TimeManager.GetFormatted12HourTime(); // e.g., "2:30 PM"

// Check time conditions
bool isOpeningHours = TimeManager.IsCurrentTimeWithinRange(900, 1700); // 9 AM to 5 PM

// Manipulate time
TimeManager.SetTime(1800); // Set to 6:00 PM
TimeManager.SetElapsedDays(10); // Set to day 10
TimeManager.FastForwardToWakeTime(); // Skip to 7 AM

// Subscribe to time events
TimeManager.OnDayPass += () => {
    // Handle new day starting
    Console.WriteLine("A new day has begun!");
};

TimeManager.OnSleepEnd += (minutesSlept) => {
    Console.WriteLine($"Good morning! You slept for {minutesSlept/60} hours.");
};
``` 