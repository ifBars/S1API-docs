# NPCs API

The NPCs API provides tools for creating and managing non-player characters in the game.

## Namespace

```csharp
using S1API.NPCs;
```

## Key Classes

### NPC

Represents a non-player character in the game. This is an abstract class that should be derived from to create custom NPCs.

```csharp
public abstract class NPC : Saveable
{
    protected readonly System.Collections.Generic.List<Response> Responses;
    
    // Optional custom mugshot icon sprite
    protected virtual Sprite? NPCIcon => null;
    
    // Base constructor for a new NPC
    public NPC(string guid, string firstName, string lastName);
    
    // Sends a text message from this NPC to the players
    public void SendTextMessage(string message, Response[]? responses = null, float responseDelay = 1f, bool network = true);
    
    // Called when a response is loaded from the save file
    protected virtual void OnResponseLoaded(Response response);
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

### NPCManager

Static class for managing all NPCs in the game.

```csharp
public class NPCManager
{
    // Currently in development
}
```

### NPCInstance

Represents an instance of an NPC in the game.

```csharp
public class NPCInstance
{
    // Currently in development
}
```

## Usage Examples

### Creating a Custom NPC

To create a custom NPC, derive from the abstract NPC class:

```csharp
using S1API.NPCs;
using UnityEngine;

public class ShopkeeperNPC : NPC
{
    // Override this for a custom icon
    protected override Sprite? NPCIcon => ImageUtils.LoadImage("shopkeeper_icon.png");
    
    // Create your NPC with a unique ID and name
    public ShopkeeperNPC() : base("mymod.shopkeeper", "Marcus", "Merchant")
    {
        // Setup is done in your constructor
    }
    
    // Override this to handle responses loaded from a save file
    protected override void OnResponseLoaded(Response response)
    {
        // Match responses by label and assign callbacks
        if (response.Label == "buy_items")
        {
            response.OnTriggered = OpenShop;
        }
        else if (response.Label == "quest_info")
        {
            response.OnTriggered = GiveQuestInfo;
        }
    }
    
    // Your custom methods
    private void OpenShop()
    {
        // Implementation for opening shop
    }
    
    private void GiveQuestInfo()
    {
        // Implementation for providing quest information
    }
    
    // Example method to interact with the player
    public void Greet()
    {
        // Create response options
        var responses = new[]
        {
            new Response { Label = "buy_items", Text = "I'd like to see your wares.", OnTriggered = OpenShop },
            new Response { Label = "quest_info", Text = "Tell me about that quest you mentioned.", OnTriggered = GiveQuestInfo },
            new Response { Label = "goodbye", Text = "Goodbye.", OnTriggered = () => { /* Do nothing */ } }
        };
        
        // Send a message with these response options
        SendTextMessage("Hello traveler! What can I do for you today?", responses);
    }
}
```

### Using Text Messages and Responses

```csharp
// In your mod code:
public void StartConversation()
{
    // Create a new instance of your custom NPC
    var shopkeeper = new ShopkeeperNPC();
    
    // Start interaction
    shopkeeper.Greet();
    
    // You can also send messages without responses
    shopkeeper.SendTextMessage("Meet me at the town square at noon.");
    
    // Or create dynamic responses
    var questResponses = new[]
    {
        new Response { 
            Label = "accept_quest", 
            Text = "I'll help you.", 
            OnTriggered = () => AcceptQuest("village_defense") 
        },
        new Response { 
            Label = "decline_quest", 
            Text = "Not interested.", 
            OnTriggered = () => DeclineQuest("village_defense") 
        }
    };
    
    shopkeeper.SendTextMessage("Our village needs your help. Will you defend us?", questResponses);
}

private void AcceptQuest(string questId)
{
    // Quest acceptance logic
}

private void DeclineQuest(string questId)
{
    // Quest rejection logic
}
```

## Implementation Notes

The NPCs API is currently under development. Upcoming features include:
- Full NPC management through the NPCManager class
- Support for NPC instances, behaviors, and schedules
- Advanced dialogue systems and relationship management

Check for updates in future releases as more functionality is added to this API. 