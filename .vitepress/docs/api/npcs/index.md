# NPCs API

The NPCs API provides tools for creating and managing non-player characters in the game.

## Namespace

```csharp
using S1API.NPCs;
```

## Key Classes

### NPC

Represents a non-player character in the game.

```csharp
public class NPC : SaveableBase
{
    public string NPCID { get; }
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public NPCType Type { get; set; }
    public bool IsFriendly { get; set; }
    public NPCRelationship PlayerRelationship { get; set; }
    
    public NPC(string npcID, string name, string displayName = null);
    
    public void SetAppearance(NPCAppearance appearance);
    public void SetBehavior(NPCBehavior behavior);
    public void SetSchedule(NPCSchedule schedule);
    public void SetDialogue(NPCDialogue dialogue);
    public void SetShop(NPCShop shop);
    
    public void Spawn(Vector3 position, Quaternion rotation = default);
    public void Despawn();
    public void MoveTo(Vector3 position, float speed = 1.0f);
    public void FaceDirection(Vector3 direction);
    public void PlayAnimation(string animationName);
}
```

### NPCType

Enum representing different types of NPCs.

```csharp
public enum NPCType
{
    Vendor,
    QuestGiver,
    Enemy,
    Civilian,
    Companion,
    Special
}
```

### NPCRelationship

Enum representing the relationship between an NPC and the player.

```csharp
public enum NPCRelationship
{
    Hostile,
    Neutral,
    Friendly,
    Companion,
    Essential
}
```

### NPCAppearance

Defines the visual appearance of an NPC.

```csharp
public class NPCAppearance
{
    public string ModelPath { get; set; }
    public float Height { get; set; }
    public float Scale { get; set; }
    public Color SkinColor { get; set; }
    public Color HairColor { get; set; }
    public string HairStyle { get; set; }
    public Dictionary<string, string> Outfits { get; }
    
    public NPCAppearance();
    public void SetOutfit(string outfitName, string outfitPath);
    public void ApplyOutfit(string outfitName);
}
```

### NPCDialogue

Manages dialogue for an NPC.

```csharp
public class NPCDialogue
{
    public List<DialogueTopic> Topics { get; }
    public List<string> Greetings { get; }
    public List<string> Farewells { get; }
    public List<string> IdleComments { get; }
    
    public NPCDialogue();
    public void AddTopic(DialogueTopic topic);
    public void AddGreeting(string greeting);
    public void AddFarewell(string farewell);
    public void AddIdleComment(string comment);
    public DialogueTopic GetTopic(string topicID);
    public string GetRandomGreeting();
    public string GetRandomFarewell();
    public string GetRandomIdleComment();
}
```

### NPCManager

Static class for managing all NPCs in the game.

```csharp
public static class NPCManager
{
    public static void RegisterNPC(NPC npc);
    public static void UnregisterNPC(string npcID);
    public static NPC GetNPC(string npcID);
    public static bool TryGetNPC(string npcID, out NPC npc);
    public static List<NPC> GetAllNPCs();
    public static List<NPC> GetNPCsByType(NPCType type);
    public static List<NPC> GetNPCsInRadius(Vector3 position, float radius);
}
```

## Usage Examples

### Creating a Basic NPC

```csharp
// Create a vendor NPC
var shopkeeper = new NPC("mymod.shopkeeper", "Marcus", "Marcus the Merchant");
shopkeeper.Type = NPCType.Vendor;
shopkeeper.IsFriendly = true;
shopkeeper.PlayerRelationship = NPCRelationship.Friendly;

// Set appearance
var appearance = new NPCAppearance();
appearance.ModelPath = "Characters/Humans/Male/Merchant";
appearance.Height = 1.8f;
appearance.Scale = 1.0f;
appearance.SkinColor = new Color(0.8f, 0.7f, 0.6f);
appearance.HairColor = new Color(0.3f, 0.2f, 0.1f);
appearance.HairStyle = "Short";
appearance.SetOutfit("Default", "Outfits/Merchant/Default");
appearance.SetOutfit("Formal", "Outfits/Merchant/Formal");

shopkeeper.SetAppearance(appearance);

// Set dialogue
var dialogue = new NPCDialogue();
dialogue.AddGreeting("Welcome to my shop, traveler!");
dialogue.AddGreeting("Looking for something special today?");
dialogue.AddFarewell("Come back soon!");
dialogue.AddIdleComment("Another fine day for business.");

// Add dialogue topic
var generalTopic = new DialogueTopic("general", "General Conversation");
generalTopic.AddLine("player", "How's business?", "business_inquiry");
generalTopic.AddResponse("business_inquiry", "Business is booming! Especially with all the travelers coming through.");
dialogue.AddTopic(generalTopic);

shopkeeper.SetDialogue(dialogue);

// Set up shop inventory
var shop = new NPCShop();
shop.AddItem("game.health_potion", 10, 50.0f);
shop.AddItem("game.mana_potion", 5, 75.0f);
shop.AddItem("game.bread", 20, 10.0f);
shop.AddItem("mymod.special_amulet", 1, 500.0f);

shopkeeper.SetShop(shop);

// Register the NPC
NPCManager.RegisterNPC(shopkeeper);

// Spawn the NPC in the world
shopkeeper.Spawn(new Vector3(100, 0, 120));
```

### Interacting with NPCs

```csharp
// Find an NPC by ID
if (NPCManager.TryGetNPC("mymod.shopkeeper", out var shopkeeper))
{
    // Make the NPC face the player
    shopkeeper.FaceDirection(playerPosition - shopkeeper.Position);
    
    // Get a random greeting
    string greeting = shopkeeper.Dialogue.GetRandomGreeting();
    
    // Display greeting to player
    DisplayDialogue(shopkeeper.DisplayName, greeting);
    
    // Access shop inventory
    var shopInventory = shopkeeper.Shop.GetInventory();
    
    // Change relationship based on player actions
    if (playerIsThreatening)
    {
        shopkeeper.PlayerRelationship = NPCRelationship.Hostile;
        shopkeeper.PlayAnimation("Defensive");
    }
}

// Find all vendors in the area
var nearbyVendors = NPCManager.GetNPCsInRadius(playerPosition, 10f)
    .Where(npc => npc.Type == NPCType.Vendor)
    .ToList();

foreach (var vendor in nearbyVendors)
{
    // Mark on map or highlight
    AddMapMarker(vendor.Position, MarkerType.Vendor);
}
```

## Events

The NPCs API provides events to hook into NPC-related actions:

```csharp
// NPC spawning/despawning
NPCManager.OnNPCSpawned += (npc) => { /* ... */ };
NPCManager.OnNPCDespawned += (npc) => { /* ... */ };

// Relationship changes
NPCManager.OnRelationshipChanged += (npc, oldRelationship, newRelationship) => { /* ... */ };

// Shop interactions
NPCManager.OnPlayerBoughtItem += (npc, item, quantity, price) => { /* ... */ };
NPCManager.OnPlayerSoldItem += (npc, item, quantity, price) => { /* ... */ };
```

## Best Practices

1. Create NPCs with meaningful roles and personalities
2. Use appropriate NPC types to help with categorization
3. Provide varied dialogue for a more immersive experience
4. Carefully balance shop inventories and prices
5. Use schedules to create dynamic, time-based behaviors
6. Keep NPC IDs unique with a mod-specific prefix 