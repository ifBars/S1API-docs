# S1API Game Elements

The S1API Game Elements module provides classes and methods for creating and manipulating game objects like NPCs, quests, items, and more within the S1 game ecosystem.

## Common Interfaces

All game elements in S1API implement common interfaces that provide consistent behavior:

```csharp
// Base interface for all S1API game elements
public interface IGameElement
{
    string Id { get; }
    string Name { get; set; }
    bool IsActive { get; set; }
    void Initialize();
    void Destroy();
}

// Interface for elements that can be interacted with
public interface IInteractable : IGameElement
{
    void OnInteract(IPlayer player);
    string GetInteractionPrompt();
}
```

## NPC Creation

Creating and managing NPCs is one of the most common tasks for S1API modders. S1API provides a simple interface for this:

```csharp
// Create a basic NPC with S1API
var npc = S1API.NpcFactory.Create("Friendly Villager");
npc.SetPosition(new Vector3(100, 0, 100));
npc.SetDialogue("Hello, traveler!");

// Add behaviors
npc.AddBehavior(new S1API.PatrolBehavior(new[] {
    new Vector3(100, 0, 100),
    new Vector3(110, 0, 100),
    new Vector3(110, 0, 110),
    new Vector3(100, 0, 110)
}));

// Register the NPC with the S1API game world
S1API.GameWorld.AddEntity(npc);
```

## Quest System

The S1API quest system allows you to create custom quests with objectives, rewards, and more:

```csharp
// Create a new quest using S1API
var quest = S1API.QuestFactory.Create("The Lost Artifact");
quest.SetDescription("Find the ancient artifact hidden in the forest.");

// Add objectives
var objective1 = new S1API.LocationObjective("Find the forest shrine", new Vector3(500, 0, 300), 10f);
var objective2 = new S1API.ItemObjective("Retrieve the artifact", "ancient_artifact", 1);
quest.AddObjective(objective1);
quest.AddObjective(objective2);

// Add rewards
quest.AddReward(new S1API.ItemReward("gold_coin", 100));
quest.AddReward(new S1API.ExperienceReward(500));

// Register the quest with S1API
S1API.QuestManager.RegisterQuest(quest);
```

## Item Creation

S1API provides utilities for creating custom items:

```csharp
// Create a new weapon with S1API
var sword = S1API.ItemFactory.CreateWeapon("Flaming Sword");
sword.SetDescription("A magical sword engulfed in flames.");
sword.SetDamage(50);
sword.AddEffect(new S1API.DamageOverTimeEffect("Burn", 5, 3, S1API.DamageType.Fire));

// Create a new consumable
var potion = S1API.ItemFactory.CreateConsumable("Health Potion");
potion.SetDescription("Restores 100 health over 5 seconds.");
potion.AddEffect(new S1API.HealOverTimeEffect(100, 5));

// Register items with the S1API game
S1API.ItemRegistry.RegisterItem(sword);
S1API.ItemRegistry.RegisterItem(potion);
```

## World Modification

You can modify the game world using the S1API terrain and object placement APIs:

```csharp
// Place a structure using S1API
var house = S1API.StructureFactory.Create("small_house");
house.SetPosition(new Vector3(200, 0, 200));
house.SetRotation(Quaternion.Euler(0, 90, 0));
S1API.GameWorld.AddStructure(house);

// Modify terrain using S1API
S1API.TerrainEditor.Flatten(new Vector3(200, 0, 200), 10f, 0.5f);
S1API.TerrainEditor.SetTexture(new Vector3(200, 0, 200), 8f, S1API.TerrainTexture.Grass, 1.0f);
```

## Event System

S1API provides an event system for responding to game events:

```csharp
// Subscribe to S1API events
S1API.EventManager.Subscribe<S1API.PlayerDeathEvent>(OnPlayerDeath);
S1API.EventManager.Subscribe<S1API.QuestCompletedEvent>(OnQuestCompleted);

// Event handler methods
private void OnPlayerDeath(S1API.PlayerDeathEvent evt)
{
    Console.WriteLine($"Player died at position {evt.Position}");
}

private void OnQuestCompleted(S1API.QuestCompletedEvent evt)
{
    Console.WriteLine($"Quest completed: {evt.QuestName}");
    if (evt.QuestId == "special_quest")
    {
        // Do something special
    }
}
```

## Best Practices

When using the S1API Game Elements module:

1. Always call `Initialize()` before using a newly created element
2. Call `Destroy()` when you're done with an element to prevent memory leaks
3. Register all custom elements with the appropriate S1API registry
4. Check if an element already exists before creating a duplicate
5. Use the S1API factory methods rather than creating instances directly 