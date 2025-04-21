# Game Elements API

The Game Elements API provides classes and methods for creating and manipulating game objects like NPCs, quests, items, and more.

## Common Interfaces

All game elements in S1API implement common interfaces that provide consistent behavior:

```csharp
// Base interface for all game elements
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

Creating and managing NPCs is one of the most common tasks for modders. S1API provides a simple interface for this:

```csharp
// Create a basic NPC
var npc = NpcFactory.Create("Friendly Villager");
npc.SetPosition(new Vector3(100, 0, 100));
npc.SetDialogue("Hello, traveler!");

// Add behaviors
npc.AddBehavior(new PatrolBehavior(new[] {
    new Vector3(100, 0, 100),
    new Vector3(110, 0, 100),
    new Vector3(110, 0, 110),
    new Vector3(100, 0, 110)
}));

// Register the NPC with the game world
GameWorld.AddEntity(npc);
```

## Quest System

The quest system allows you to create custom quests with objectives, rewards, and more:

```csharp
// Create a new quest
var quest = QuestFactory.Create("The Lost Artifact");
quest.SetDescription("Find the ancient artifact hidden in the forest.");

// Add objectives
var objective1 = new LocationObjective("Find the forest shrine", new Vector3(500, 0, 300), 10f);
var objective2 = new ItemObjective("Retrieve the artifact", "ancient_artifact", 1);
quest.AddObjective(objective1);
quest.AddObjective(objective2);

// Add rewards
quest.AddReward(new ItemReward("gold_coin", 100));
quest.AddReward(new ExperienceReward(500));

// Register the quest
QuestManager.RegisterQuest(quest);
```

## Item Creation

S1API provides utilities for creating custom items:

```csharp
// Create a new weapon
var sword = ItemFactory.CreateWeapon("Flaming Sword");
sword.SetDescription("A magical sword engulfed in flames.");
sword.SetDamage(50);
sword.AddEffect(new DamageOverTimeEffect("Burn", 5, 3, DamageType.Fire));

// Create a new consumable
var potion = ItemFactory.CreateConsumable("Health Potion");
potion.SetDescription("Restores 100 health over 5 seconds.");
potion.AddEffect(new HealOverTimeEffect(100, 5));

// Register items with the game
ItemRegistry.RegisterItem(sword);
ItemRegistry.RegisterItem(potion);
```

## World Modification

You can modify the game world using the terrain and object placement APIs:

```csharp
// Place a structure
var house = StructureFactory.Create("small_house");
house.SetPosition(new Vector3(200, 0, 200));
house.SetRotation(Quaternion.Euler(0, 90, 0));
GameWorld.AddStructure(house);

// Modify terrain
TerrainEditor.Flatten(new Vector3(200, 0, 200), 10f, 0.5f);
TerrainEditor.SetTexture(new Vector3(200, 0, 200), 8f, TerrainTexture.Grass, 1.0f);
```

## Event System

S1API provides an event system for responding to game events:

```csharp
// Subscribe to events
EventManager.Subscribe<PlayerDeathEvent>(OnPlayerDeath);
EventManager.Subscribe<QuestCompletedEvent>(OnQuestCompleted);

// Event handler methods
private void OnPlayerDeath(PlayerDeathEvent evt)
{
    Console.WriteLine($"Player died at position {evt.Position}");
}

private void OnQuestCompleted(QuestCompletedEvent evt)
{
    Console.WriteLine($"Quest completed: {evt.QuestName}");
    if (evt.QuestId == "special_quest")
    {
        // Do something special
    }
}
```

## Best Practices

When using the Game Elements API:

1. Always call `Initialize()` before using a newly created element
2. Call `Destroy()` when you're done with an element to prevent memory leaks
3. Register all custom elements with the appropriate registry
4. Check if an element already exists before creating a duplicate
5. Use the factory methods rather than creating instances directly 