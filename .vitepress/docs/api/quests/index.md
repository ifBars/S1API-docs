# Quests API

The Quests API provides tools for creating and managing custom quests in the game.

## Namespace

```csharp
using S1API.Quests;
```

## Key Classes

### Quest

Abstract base class for creating custom quests in the game.

```csharp
public abstract class Quest : Saveable
{
    protected abstract string Title { get; }
    protected abstract string Description { get; }
    protected virtual bool AutoBegin => true;
    protected readonly QuestEntry[] QuestEntries;
    protected virtual Sprite? QuestIcon => null;
    
    public void Begin();
    public void Cancel();
    public void Expire();
    public void Fail();
    public void Complete();
    public void End();
    
    protected QuestEntry AddEntry(string title, Vector3? poiPosition = null);
}
```

### QuestEntry

Represents a single entry (task) within a quest.

```csharp
public class QuestEntry
{
    public event Action OnComplete;
    
    public string Title { get; set; }
    public Vector3 POIPosition { get; set; }
    
    public void Begin();
    public void Complete();
    public void SetState(QuestState questState);
}
```

### QuestState

Enum representing possible states for quests and quest entries.

```csharp
public enum QuestState
{
    Inactive,
    Active,
    Completed,
    Failed,
    Expired,
    Cancelled
}
```

### QuestManager

Static class for managing all quests in the game.

```csharp
public static class QuestManager
{
    public static Quest CreateQuest<T>(string? guid = null) where T : Quest;
    public static Quest CreateQuest(Type questType, string? guid = null);
}
```

## Usage Examples

### Creating a Custom Quest

```csharp
// Create a custom quest class
public class MyCustomQuest : Quest
{
    protected override string Title => "The Big Adventure";
    protected override string Description => "Embark on an epic journey!";
    
    // Optional: Override the auto-begin behavior
    protected override bool AutoBegin => false;
    
    // Optional: Custom quest icon
    protected override Sprite? QuestIcon => ImageUtils.LoadImage("icon.png");
    
    private QuestEntry? findArtifactEntry;
    private QuestEntry? defeatGuardianEntry;
    
    protected override void OnCreated()
    {
        // Add quest entries (objectives)
        findArtifactEntry = AddEntry("Find the ancient artifact", new Vector3(100, 0, 200));
        defeatGuardianEntry = AddEntry("Defeat the guardian", new Vector3(150, 0, 250));
        
        // Setup entry completion events
        findArtifactEntry.OnComplete += OnArtifactFound;
    }
    
    private void OnArtifactFound()
    {
        // Activate the next entry
        defeatGuardianEntry?.SetState(QuestState.Active);
    }
}

// Create an instance of the quest
var quest = QuestManager.CreateQuest<MyCustomQuest>();

// Begin the quest (if AutoBegin is false)
quest.Begin();
```

### More Complex Example

```csharp
public class DeliveryQuest : Quest
{
    protected override string Title => "Delivery Request";
    protected override string Description => 
        $"Deliver the requested product and collect payment from the drop.";
    
    [SaveableField("OrderData")]
    private OrderData _orderData = new();
    
    private QuestEntry? _deliveryEntry;
    private QuestEntry? _rewardEntry;
    
    protected override void OnCreated()
    {
        _deliveryEntry = AddEntry(
            $"Deliver {_orderData.Amount}x {_orderData.Product?.Name}.",
            _orderData.DeliveryLocation
        );
        
        _rewardEntry = AddEntry(
            $"Collect ${_orderData.Price:N0}.",
            _orderData.RewardLocation
        );
        
        // Initially set reward entry as inactive
        _rewardEntry.SetState(QuestState.Inactive);
    }
    
    public void CompleteDelivery()
    {
        _deliveryEntry?.Complete();
        _rewardEntry?.SetState(QuestState.Active);
    }
    
    public void CollectReward()
    {
        _rewardEntry?.Complete();
        // Quest will auto-complete when all entries are completed
    }
}
```

## Quest States

Quests and quest entries can be in the following states:

- **Inactive**: Not yet started
- **Active**: Currently in progress
- **Completed**: Successfully finished
- **Failed**: Not completed successfully
- **Expired**: Time ran out
- **Cancelled**: Manually cancelled

## Best Practices

1. Create a custom class for each quest type that extends the `Quest` abstract class
2. Override `Title` and `Description` properties to provide clear quest information
3. Use `AddEntry` to create quest entries (objectives) with descriptive titles
4. Use `POIPosition` to mark locations on the map for quest entries
5. Use `SaveableField` attributes for data that needs to be saved with the quest
6. Consider quest dependencies by activating entries sequentially
7. Use appropriate quest states to manage the quest lifecycle 