# Leveling API

The Leveling API provides functionality for managing player ranks in the game.

## Namespace

```csharp
using S1API.Leveling;
```

## Key Classes

### LevelManager

The main class for managing player rank.

```csharp
public static class LevelManager
{
    /// <summary>
    /// The current rank of the save file.
    /// </summary>
    public static Rank Rank { get; }
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

## Usage Examples

### Getting Player Rank

```csharp
// Get current player rank
Rank playerRank = LevelManager.Rank;

Console.WriteLine($"Player's current rank is {playerRank}");

// Check if player has reached a certain rank
if (LevelManager.Rank >= Rank.ShotCaller)
{
    UnlockSpecialContent();
}

// Rank-based game mechanics
switch (LevelManager.Rank)
{
    case Rank.StreetRat:
    case Rank.Hoodlum:
        SetDifficulty("Easy");
        break;
    case Rank.Peddler:
    case Rank.Hustler:
    case Rank.Bagman:
        SetDifficulty("Medium");
        break;
    case Rank.Enforcer:
    case Rank.ShotCaller:
    case Rank.BlockBoss:
        SetDifficulty("Hard");
        break;
    default:
        SetDifficulty("Expert");
        break;
}
```