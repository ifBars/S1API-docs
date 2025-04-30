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