# NPCs API

The NPCs API provides tools for creating and managing non-player characters in the game.

## Namespace

```csharp
using S1API.Entities;
using S1API.Messaging;
using S1API.Vehicles;
```

## Key Classes and Interfaces

### NPC

Represents a non-player character in the game. This is an abstract class that should be derived from to create custom NPCs.

```csharp
public abstract class NPC : Saveable, IEntity, IHealth
{
    protected readonly System.Collections.Generic.List<Response> Responses;
    
    // Base constructor for a new NPC
    protected NPC(string id, string? firstName, string? lastName, Sprite? icon = null);
    
    // Sends a text message from this NPC to the players
    public void SendTextMessage(string message, Response[]? responses = null, float responseDelay = 1f, bool network = true);
    
    // Called when a response is loaded from the save file
    protected virtual void OnResponseLoaded(Response response);
    
    // Static method to get an instance of an NPC
    public static NPC? Get<T>() where T : NPC;
}
```

### Response

Represents a message response displayed for the player.

```csharp
public class Response
{
    // A callback for when the response is triggered
    public Action? OnTriggered { get; set; }
    
    // The unique identifier for this response
    public string Label { get; set; }
    
    // The text displayed in-game for the player
    public string Text { get; set; }
    
    // Creates a new response for displaying in-game
    public Response();
}
```

### IEntity Interface

The NPC class implements the IEntity interface which provides basic entity functionality.

```csharp
public interface IEntity
{
    // The GameObject associated with this entity
    GameObject gameObject { get; }
    
    // The world position of the entity
    Vector3 Position { get; set; }
    
    // The scale of the entity
    float Scale { get; set; }
}
```

### IHealth Interface

The NPC class implements the IHealth interface which provides health-related functionality.

```csharp
public interface IHealth
{
    // The current health of the entity
    float CurrentHealth { get; }
    
    // The max health of the entity
    float MaxHealth { get; set; }
    
    // Whether the entity is dead or not
    bool IsDead { get; }
    
    // Whether the entity is invincible
    bool IsInvincible { get; set; }
    
    // Revives the entity
    void Revive();
    
    // Deals damage to the entity
    void Damage(int amount);
    
    // Heals the entity
    void Heal(int amount);
    
    // Kills the entity
    void Kill();
    
    // Called when entity's health is less than or equal to 0
    event Action OnDeath;
}
```

## NPC Properties

### Basic Properties

```csharp
// The world position of the NPC
public Vector3 Position { get; set; }

// The transform of the NPC (read-only)
public Transform Transform { get; }

// The first name of this NPC
public string FirstName { get; set; }

// The last name of this NPC
public string LastName { get; set; }

// The full name of this NPC (read-only)
public string FullName { get; }

// The unique identifier of this NPC
public string ID { get; protected set; }

// The icon assigned to this NPC
public Sprite Icon { get; set; }

// The scale of the NPC
public float Scale { get; set; }

// The current NPCAppearance instance (read-only)
public NPCAppearance Appearance { get; }
```

### State Properties

```csharp
// Whether the NPC is currently conscious
public bool IsConscious { get; }

// Whether the NPC is currently inside a building
public bool IsInBuilding { get; }

// Whether the NPC is currently inside a vehicle
public bool IsInVehicle { get; }

// Whether the NPC is currently panicking
public bool IsPanicking { get; }

// Whether the NPC is currently unsettled
public bool IsUnsettled { get; }

// Whether the NPC is currently visible to the player
public bool IsVisible { get; }

// Whether the NPC is knocked out
public bool IsKnockedOut { get; }

// How aggressive this NPC is towards others
public float Aggressiveness { get; set; }

// The region the NPC is associated with
public Region Region { get; }

// How long the NPC will panic for
public float PanicDuration { get; set; }

// Whether the NPC requires the region unlocked to deal with
public bool RequiresRegionUnlocked { get; set; }

// The current vehicle the NPC is occupying, if any
public LandVehicle? CurrentVehicle { get; }
```

### Health Properties

```csharp
// The current health the NPC has
public float CurrentHealth { get; }

// The maximum health the NPC has
public float MaxHealth { get; set; }

// Whether the NPC is dead or not
public bool IsDead { get; }

// Whether the NPC is invincible or not
public bool IsInvincible { get; set; }
```

## NPC Methods

### Movement and State Methods

```csharp
// Causes the NPC to become unsettled
public void Unsettle(float duration);

// Smoothly scales the NPC over time
public void LerpScale(float scale, float lerpTime);

// Causes the NPC to become panicked
public void Panic();

// Causes the NPC to stop panicking
public void StopPanicking();

// Knocks the NPC out
public void KnockOut();

// Tells the NPC to travel to a specific position
public void Goto(Vector3 position);
```

### Health Methods

```csharp
// Revives the NPC
public void Revive();

// Deals damage to the NPC
public void Damage(int amount);

// Heals the NPC
public void Heal(int amount);

// Kills the NPC
public void Kill();
```

### Communication Methods

```csharp
// Sends a text message from this NPC to the players
public void SendTextMessage(string message, Response[]? responses = null, float responseDelay = 1f, bool network = true);

// Sets whether the text message conversation can be deleted/hidden
public bool ConversationCanBeHidden { get; set; }
```

## Events

```csharp
// Called when the NPC died
public event Action OnDeath;

// Called when the NPC's inventory contents change
public event Action OnInventoryChanged;
```

## Static Members

```csharp
// List of all NPCs within the base game and modded
public static readonly System.Collections.Generic.List<NPC> All;

// Gets the instance of an NPC
public static NPC? Get<T>();
```

## Usage Examples

### Creating a Custom NPC

To create a custom NPC, derive from the abstract NPC class:

```csharp
using S1API.Entities;
using S1API.Messaging;
using System.Collections.Generic;
using UnityEngine;

public class CustomerNPC : NPC
{
    // Track customer preferences and state
    private Dictionary<string, int> _cart = new Dictionary<string, int>();
    private float _budget;
    private bool _hasPurchased = false;
    private int _lastMessageDay = -1;
    
    // Create the customer NPC with a unique ID and name
    public CustomerNPC() : base("s1api_customer", "S1API", "Customer")
    {
        // Initialize customer properties
        IsInvincible = true;
        Aggressiveness = 0.0f;
        Scale = 1.0f;
        _budget = UnityEngine.Random.Range(400f, 2000f);
        
        // Subscribe to the day passing event
        GameEvents.OnDayPass += HandleDayPass;
    }
    
    // Handle when a day passes in the game
    private void HandleDayPass(int newDay)
    {
        // Only send a message if we haven't sent one today
        if (newDay != _lastMessageDay)
        {
            _lastMessageDay = newDay;
            SendDailyMessage();
        }
    }
    
    // Send a daily message to the player
    private void SendDailyMessage()
    {
        var responses = new[]
        {
            new Response { Label = "sellproduct", Text = "Okay bet.", OnTriggered = SellProduct },
        };
        
        SendTextMessage($"Day {_lastMessageDay}: Hey! I'm looking to buy some product today. Got anything for ${_budget:F0}?", responses);
    }
    
    // Override to handle responses loaded from save file
    protected override void OnResponseLoaded(Response response)
    {
        // Match responses by label and assign callbacks
        switch(response.Label)
        {
            case "sellproduct":
                response.OnTriggered = SellProduct;
                break;
        }
    }
    
    private void SellProduct()
    {
        // In a real implementation, you have do something like send the player to a dropoff dead drop with a quest
        _hasPurchased = true;
        SendTextMessage("Thanks for the product! See you tomorrow maybe.");
    }
}
```