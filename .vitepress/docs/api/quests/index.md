# Quests API

The Quests API provides tools for creating and managing custom quests in the game.

## Namespace

```csharp
using S1API.Quests;
```

## Key Classes

### Quest

Represents a quest in the game.

```csharp
public class Quest : SaveableBase
{
    public string QuestID { get; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; }
    public bool IsCompleted { get; }
    public List<QuestObjective> Objectives { get; }
    
    public Quest(string questID, string title, string description);
    
    public void Activate();
    public void Complete();
    public void Abandon();
    public void AddObjective(QuestObjective objective);
    public void SetReward(QuestReward reward);
}
```

### QuestObjective

Represents a single objective within a quest.

```csharp
public class QuestObjective : SaveableBase
{
    public string ObjectiveID { get; }
    public string Description { get; set; }
    public bool IsCompleted { get; }
    public int CurrentProgress { get; }
    public int RequiredProgress { get; }
    
    public QuestObjective(string objectiveID, string description, int requiredProgress = 1);
    
    public void IncrementProgress(int amount = 1);
    public void SetProgress(int progress);
    public void Complete();
}
```

### QuestReward

Defines the rewards given upon quest completion.

```csharp
public class QuestReward
{
    public int Money { get; set; }
    public int Experience { get; set; }
    public List<ItemReward> Items { get; }
    
    public QuestReward();
    public void AddItem(string itemID, int quantity = 1);
}
```

### QuestManager

Static class for managing all quests in the game.

```csharp
public static class QuestManager
{
    public static List<Quest> ActiveQuests { get; }
    public static List<Quest> CompletedQuests { get; }
    
    public static void RegisterQuest(Quest quest);
    public static void UnregisterQuest(Quest quest);
    public static Quest GetQuest(string questID);
    public static bool TryGetQuest(string questID, out Quest quest);
}
```

## Usage Examples

### Creating a Basic Quest

```csharp
// Create a new quest
var quest = new Quest("mymod.mainquest", "The Big Adventure", "Embark on an epic journey!");

// Add objectives
var objective1 = new QuestObjective("mymod.mainquest.find", "Find the ancient artifact", 1);
var objective2 = new QuestObjective("mymod.mainquest.defeat", "Defeat the guardian", 1);
var objective3 = new QuestObjective("mymod.mainquest.return", "Return to the village elder", 1);

quest.AddObjective(objective1);
quest.AddObjective(objective2);
quest.AddObjective(objective3);

// Set rewards
var reward = new QuestReward();
reward.Money = 500;
reward.Experience = 1000;
reward.AddItem("artifact.ancient", 1);
reward.AddItem("potion.health", 5);

quest.SetReward(reward);

// Register the quest
QuestManager.RegisterQuest(quest);

// Activate the quest
quest.Activate();
```

### Updating Quest Progress

```csharp
// Get a registered quest
var quest = QuestManager.GetQuest("mymod.mainquest");

// Get the first objective
var objective = quest.Objectives[0];

// Update progress
objective.IncrementProgress();

// Check if completed
if (objective.IsCompleted)
{
    // Maybe trigger some event or notification
    Debug.Log($"Objective completed: {objective.Description}");
    
    // Check if all objectives are complete
    if (quest.Objectives.All(o => o.IsCompleted))
    {
        // Complete the quest
        quest.Complete();
    }
}
```

## Events

The Quests API provides events to hook into quest state changes:

```csharp
// Quest state changes
QuestManager.OnQuestActivated += (quest) => { /* ... */ };
QuestManager.OnQuestCompleted += (quest) => { /* ... */ };
QuestManager.OnQuestAbandoned += (quest) => { /* ... */ };

// Objective progress
QuestManager.OnObjectiveProgressChanged += (objective, oldProgress, newProgress) => { /* ... */ };
QuestManager.OnObjectiveCompleted += (objective) => { /* ... */ };
```

## Best Practices

1. Use unique, namespaced IDs for all quests and objectives
2. Keep quest descriptions clear and concise
3. Ensure objectives are achievable and have clear completion criteria
4. Balance quest rewards appropriately
5. Consider quest dependencies and prerequisites when designing multi-quest storylines 