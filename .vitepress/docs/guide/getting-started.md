# Getting Started with S1API

This guide will help you get started with S1API for your Schedule One modding projects.

## Prerequisites

Before starting with S1API, make sure you have:

- A development environment set up for .netstandard2.1
- Basic knowledge of C# programming
- Visual Studio or another IDE that supports .NET development (e.g. Rider)
- Ownership of Schedule One on Steam
- Followed the [Installation Guide](/guide/installation)

## Understanding S1API Structure

S1API is organized into logical namespaces that correspond to different game systems:

```csharp
// Core functionality
using S1API;

// Game systems
using S1API.GameTime;     // Date/time manipulation
using S1API.Leveling;     // Player progression
using S1API.NPCs;         // NPC interactions
using S1API.Items;        // Item management
using S1API.Quests;       // Quest system
using S1API.Money;        // Currency handling
using S1API.DeadDrops;    // Dead drop locations
using S1API.PhoneApp;     // Phone interface
using S1API.Products;     // Store products
using S1API.Storages;     // Inventory management
```

## Exploring the API Documentation

1. **Start with the API Overview**
   - Begin at the [API Reference](/api/) page to get a high-level understanding
   - This page outlines all major namespaces and their purposes

2. **Understand Core Concepts**
   - The [Saveables System](/api/#saveables-system) is fundamental to most mods
   - Learn about [Cross-Compatibility](/guide/cross-compatibility) between Mono and IL2CPP

3. **Explore Specific Systems**
   - Navigate to specific system documentation based on your needs:
     - Creating NPCs? Visit the [NPCs documentation](/api/npcs/)
     - Managing time? Check [Game Time](/api/game-time/)
     - Working with items? See the [Items API](/api/items/)

4. **Review Examples**
   - Each API section contains practical examples
   - Copy and modify these examples as starting points for your mod

## Common Tasks with S1API

### Creating a Custom NPC

```csharp
using S1API.NPCs;

public class MyCustomNPC : NPC
{
    protected override string FirstName => "Custom";
    protected override string LastName => "NPC";
    protected override string ID => "my_custom_npc";

    public MyCustomNPC() : base("my_custom_npc", "Custom", "NPC")
    {
      // NPC Constructor
    }
    
    protected override void OnInitialized()
    {
        // Called when NPC is first initialized
    }
    
    protected override void OnResponseLoaded(Response response)
    {
        // Handle player responses to messages
    }
}
```

### Handling Game Time Events

```csharp
using S1API.GameTime;

// Subscribe to time-based events
TimeManager.OnDayPass += OnNewDay;
TimeManager.OnWeekPass += OnWeekStart;
TimeManager.OnSleepStart += OnPlayerSleep;
TimeManager.OnSleepEnd += OnPlayerWakeUp;

private void OnNewDay()
{
    // Logic that runs at the start of each day
}

private void OnWeekStart()
{
    // Logic that runs at the start of each week
}

private void OnPlayerSleep()
{
    // Logic that runs when player starts sleeping
}

private void OnPlayerWakeUp(int minutesSkipped)
{
    // Logic that runs when player wakes up
    // minutesSkipped: total minutes passed during sleep
}

// Working with game time
void TimeExamples()
{
    // Get current time information
    Day today = TimeManager.CurrentDay;          // Current day (Monday, Tuesday, etc.)
    int daysPassed = TimeManager.ElapsedDays;    // Total days elapsed in game
    int currentTime = TimeManager.CurrentTime;   // Current time in 24h format (e.g., 1330)
    string formatted = TimeManager.GetFormatted12HourTime(); // e.g., "1:30 PM"
    
    // Check time conditions
    if (TimeManager.IsNight)
    {
        // Night-time specific logic
    }
    
    if (TimeManager.IsCurrentTimeWithinRange(800, 1200))
    {
        // Logic for morning hours (8 AM to 12 PM)
    }
    
    // Manipulate time
    TimeManager.SetTime(1400);                   // Set time to 2:00 PM
    TimeManager.FastForwardToWakeTime();         // Skip to morning (7:00 AM)
    
    // Create a GameDateTime for specific points in time
    GameDateTime futureTime = new GameDateTime(daysPassed + 1, 900);  // Tomorrow at 9:00 AM
    GameDateTime laterToday = new GameDateTime().AddMinutes(120);     // 2 hours from now
}
```

## Development Workflow

1. **Plan Your Mod**
   - Identify which game systems your mod will interact with
   - Review the relevant API documentation sections

2. **Set Up Your Project**
   - Create a new C# project targeting .netstandard2.1
   - Add the S1API NuGet package as a reference
   - Import the necessary S1API namespaces

3. **Implement Core Functionality**
   - Start with the essential components (NPCs, items, etc.)
   - Use the API for all game interactions rather than direct access

4. **Test Incrementally**
   - Test each component in-game before moving to the next
   - Check the MelonLoader logs for any errors or warnings

5. **Publish Your Mod**
   - Document S1API as a dependency
   - Provide installation instructions for users

## Next Steps

- Explore the complete [API Reference](/api/) for detailed documentation on all available systems
- Check out the [Cross-Compatibility Guide](/guide/cross-compatibility) to ensure your mod works across game versions
- Review [Mono vs IL2CPP](/guide/mono-il2cpp) differences if you're developing for both platforms