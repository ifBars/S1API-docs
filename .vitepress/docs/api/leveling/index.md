# Leveling API

The Leveling API provides functionality for managing player progression, experience points, and ranks in the game.

## Namespace

```csharp
using S1API.Leveling;
```

## Key Classes

### PlayerLevel

The main class for managing player level and experience.

```csharp
public static class PlayerLevel
{
    // Player level properties
    public static int Level { get; }
    public static int Experience { get; }
    public static int ExperienceToNextLevel { get; }
    public static float LevelProgress { get; }
    public static Rank CurrentRank { get; }
    
    // Level manipulation
    public static void AddExperience(int amount, bool showNotification = true);
    public static void SetLevel(int level, bool resetExperience = true);
    public static void SetRank(Rank rank);
    
    // Level calculations
    public static int GetExperienceForLevel(int level);
    public static int GetLevelFromExperience(int experience);
    public static Rank GetRankForLevel(int level);
    public static bool TryLevelUp();
}
```

### Rank

Enum representing different player ranks in the game.

```csharp
public enum Rank
{
    StreetRat,
    Hoodlum,
    Peddler,
    Hustler,
    Bagman,
    Enforcer,
    ShotCaller,
    BlockBoss,
    Underlord,
    Baron,
    Kingpin
}
```

### PerkSystem

Manages player perks that can be unlocked through leveling.

```csharp
public static class PerkSystem
{
    public static List<Perk> AvailablePerks { get; }
    public static List<Perk> UnlockedPerks { get; }
    public static int PerkPoints { get; }
    
    public static void AddPerkPoints(int amount);
    public static bool UnlockPerk(string perkID);
    public static bool IsPerkUnlocked(string perkID);
    public static Perk GetPerk(string perkID);
    public static List<Perk> GetPerksForRank(Rank rank);
}
```

### Perk

Represents a player perk that can be unlocked through the leveling system.

```csharp
public class Perk
{
    public string PerkID { get; }
    public string Name { get; }
    public string Description { get; }
    public Sprite Icon { get; }
    public int Cost { get; }
    public Rank RequiredRank { get; }
    public List<string> RequiredPerkIDs { get; }
    
    public Perk(string perkID, string name, string description);
    
    public bool CanUnlock();
    public void OnUnlocked();
    public void ApplyEffect(float intensity = 1.0f);
    public void RemoveEffect();
}
```

## Usage Examples

### Managing Player Experience

```csharp
// Get current player level info
int currentLevel = PlayerLevel.Level;
int currentXP = PlayerLevel.Experience;
int xpNeeded = PlayerLevel.ExperienceToNextLevel;
Rank playerRank = PlayerLevel.CurrentRank;

Console.WriteLine($"Player is level {currentLevel} ({playerRank}) with {currentXP} XP");
Console.WriteLine($"Needs {xpNeeded} more XP to level up");

// Add experience points
PlayerLevel.AddExperience(250); // Shows notification by default

// Check progress 
float progress = PlayerLevel.LevelProgress; // 0.0 to 1.0
UpdateLevelProgressBar(progress);

// Force level up if possible
if (PlayerLevel.TryLevelUp())
{
    PlayLevelUpEffect();
    DisplayLevelUpMessage(PlayerLevel.Level);
}

// Set specific level or rank (for development/testing)
PlayerLevel.SetLevel(10);
PlayerLevel.SetRank(Rank.ShotCaller);
```

### Working with Perks

```csharp
// Check available perk points
int perkPoints = PerkSystem.PerkPoints;
DisplayPerkPoints(perkPoints);

// Browse available perks
foreach (var perk in PerkSystem.AvailablePerks)
{
    bool canUnlock = perk.CanUnlock();
    bool alreadyUnlocked = PerkSystem.IsPerkUnlocked(perk.PerkID);
    
    Console.WriteLine($"Perk: {perk.Name}");
    Console.WriteLine($"Description: {perk.Description}");
    Console.WriteLine($"Cost: {perk.Cost} points");
    Console.WriteLine($"Required Rank: {perk.RequiredRank}");
    Console.WriteLine($"Status: {(alreadyUnlocked ? "Unlocked" : canUnlock ? "Available" : "Locked")}");
    
    // Check perk requirements
    if (!canUnlock && !alreadyUnlocked)
    {
        if (PlayerLevel.CurrentRank < perk.RequiredRank)
        {
            Console.WriteLine($"You need to reach {perk.RequiredRank} rank to unlock this perk");
        }
        
        foreach (string requiredPerkID in perk.RequiredPerkIDs)
        {
            if (!PerkSystem.IsPerkUnlocked(requiredPerkID))
            {
                Perk requiredPerk = PerkSystem.GetPerk(requiredPerkID);
                Console.WriteLine($"Requires {requiredPerk.Name} perk first");
            }
        }
    }
}

// Unlock a perk
string desiredPerkID = "agility.faster_movement";
if (PerkSystem.UnlockPerk(desiredPerkID))
{
    Console.WriteLine("Perk unlocked successfully!");
    
    // Get the unlocked perk
    Perk unlockedPerk = PerkSystem.GetPerk(desiredPerkID);
    
    // Apply its effect
    unlockedPerk.ApplyEffect();
}
else
{
    Console.WriteLine("Cannot unlock this perk");
}

// Get all perks for specific rank
var enforcerPerks = PerkSystem.GetPerksForRank(Rank.Enforcer);
Console.WriteLine($"There are {enforcerPerks.Count} perks available at Enforcer rank");
```

### Level-based Game Mechanics

```csharp
// Check if player can access a high-level area
if (PlayerLevel.Level >= 15)
{
    UnlockArea("downtown_district");
}

// Adjust enemy difficulty based on player level
float difficultyMultiplier = 0.8f + (PlayerLevel.Level * 0.05f);
SetEnemyStrength(difficultyMultiplier);

// Scale rewards with player rank
int baseReward = 100;
float rankMultiplier = 1.0f + (int)(PlayerLevel.CurrentRank) * 0.2f;
int adjustedReward = (int)(baseReward * rankMultiplier);

Console.WriteLine($"Completed mission! Earned {adjustedReward} XP");
PlayerLevel.AddExperience(adjustedReward);
```

## Events

The Leveling API provides events to hook into progression changes:

```csharp
// Level changes
PlayerLevel.OnLevelUp += (oldLevel, newLevel) => { /* ... */ };
PlayerLevel.OnExperienceGained += (amount, newTotal) => { /* ... */ };
PlayerLevel.OnRankChanged += (oldRank, newRank) => { /* ... */ };

// Perk events
PerkSystem.OnPerkUnlocked += (perk) => { /* ... */ };
PerkSystem.OnPerkPointsChanged += (oldPoints, newPoints) => { /* ... */ };
```

## Best Practices

1. Balance experience rewards with the effort required to complete tasks
2. Make higher ranks feel meaningful with better perks and abilities
3. Consider creating multiple progression paths for different playstyles
4. Use level requirements to gate content and provide a sense of progression
5. Display clear feedback when players gain experience or level up
6. Design perks that enhance gameplay without making the player overpowered
7. Consider resetting or adjusting perks when implementing a new game+ mode 