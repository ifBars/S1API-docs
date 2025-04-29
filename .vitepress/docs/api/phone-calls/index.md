# PhoneCalls API

The PhoneCalls API provides tools for creating and managing phone calls in the game.

## Namespace

```csharp
using S1API.PhoneCalls;
using S1API.PhoneCalls.Constants;
```

## Key Classes and Interfaces

### PhoneCallDefinition

An abstract base class that represents a phone call definition. This should be derived from to create custom phone calls.

```csharp
public abstract class PhoneCallDefinition
{
    // The caller of the PhoneCallDefinition instance
    public CallerDefinition? Caller;
    
    // Base constructors for a new phone call
    protected PhoneCallDefinition(string name, Sprite? profilePicture = null);
    protected PhoneCallDefinition(NPC? npcCallerID);
    
    // Set's a new CallerID definition to the PhoneCall
    protected CallerDefinition AddCallerID(string name, Sprite? profilePicture = null);
    
    // Set's a new CallerID definition based of an existing NPC instance
    protected CallerDefinition AddCallerID(NPC? npc);
    
    // Add's a CallStageEntry instance to the phone call
    protected CallStageEntry AddStage(string text);
    
    // Completes the phone call data instance
    public void Completed();
}
```

### CallManager

A static class that manages phone calls in the game.

```csharp
public static class CallManager
{
    // Queues a phone call for the player
    public static void QueueCall(PhoneCallDefinition phoneCallDefinition);
}
```

### CallerDefinition

Represents the caller in a phone call with a name and profile picture.

```csharp
public class CallerDefinition
{
    // The name of the caller
    public string Name { get; set; }
    
    // The profile picture of the caller
    public Sprite? ProfilePicture { get; set; }
}
```

### CallStageEntry

Represents a stage in a phone call, with text and optional triggers.

```csharp
public class CallStageEntry
{
    // The text to display in this Stage
    public string Text { get; set; }
    
    // Adds a start trigger to the CallStageEntry instance
    public SystemTriggerEntry AddSystemTrigger(SystemTriggerType triggerType);
}
```

### SystemTriggerEntry

Represents a system trigger in a call stage.

```csharp
public class SystemTriggerEntry
{
    // Properties and methods related to system triggers
    // (From the code samples, this class seems to exist but its detailed structure is not shown)
}
```

## Enums

### EvaluationType

Defines the evaluation type for conditions.

```csharp
public enum EvaluationType
{
    PassOnTrue,
    PassOnFalse
}
```

### SystemTriggerType

Defines the type of system trigger.

```csharp
public enum SystemTriggerType
{
    StartTrigger,
    DoneTrigger
}
```

## PhoneCallDefinition Properties

```csharp
// The caller of the PhoneCallDefinition instance
public CallerDefinition? Caller;
```

## PhoneCallDefinition Methods

```csharp
// Set's a new CallerID definition to the PhoneCall
protected CallerDefinition AddCallerID(string name, Sprite? profilePicture = null);

// Set's a new CallerID definition based of an existing NPC instance
protected CallerDefinition AddCallerID(NPC? npc);

// Add's a CallStageEntry instance to the phone call
protected CallStageEntry AddStage(string text);

// Completes the phone call data instance
public void Completed();
```

## CallManager Methods

```csharp
// Queues a phone call for the player
public static void QueueCall(PhoneCallDefinition phoneCallDefinition);
```

## CallerDefinition Properties

```csharp
// The name of the caller
public string Name { get; set; }

// The profile picture of the caller
public Sprite? ProfilePicture { get; set; }
```

## CallStageEntry Properties

```csharp
// The text to display in this Stage
public string Text { get; set; }
```

## CallStageEntry Methods

```csharp
// Adds a start trigger to the CallStageEntry instance
public SystemTriggerEntry AddSystemTrigger(SystemTriggerType triggerType);
```

## Usage Examples

### Creating a Custom Phone Call

To create a custom phone call, derive from the abstract PhoneCallDefinition class:

```csharp
using S1API.PhoneCalls;
using S1API.PhoneCalls.Constants;
using S1API.Entities;
using UnityEngine;

public class CustomPhoneCall : PhoneCallDefinition
{
    // Create a phone call with a custom caller
    public CustomPhoneCall() : base("Custom Caller", null)
    {
        // Add stages to the phone call
        CallStageEntry firstStage = AddStage("Hello, this is a custom phone call!");
        
        // Add a start trigger to the first stage
        SystemTriggerEntry startTrigger = firstStage.AddSystemTrigger(SystemTriggerType.StartTrigger);
        
        // Add a done trigger to the first stage
        SystemTriggerEntry doneTrigger = firstStage.AddSystemTrigger(SystemTriggerType.DoneTrigger);
        
        // Add another stage
        CallStageEntry secondStage = AddStage("This is the second stage of the call.");
        
        // Mark the phone call as completed
        Completed();
    }
}
```

### Creating a Phone Call from an NPC

```csharp
using S1API.PhoneCalls;
using S1API.Entities;

public class NPCPhoneCall : PhoneCallDefinition
{
    // Create a phone call with an NPC caller
    public NPCPhoneCall(NPC npc) : base(npc)
    {
        // Add stages to the phone call
        CallStageEntry stage = AddStage($"Hello, this is {npc.FullName} calling.");
        
        // Add another stage
        CallStageEntry responseStage = AddStage("I need your help with something important.");
        
        // Mark the phone call as completed
        Completed();
    }
}
```

### Queueing a Phone Call

```csharp
using S1API.PhoneCalls;
using S1API.Entities;

// Create and queue a custom phone call
public void MakeCustomCall()
{
    // Create a custom phone call
    CustomPhoneCall customCall = new CustomPhoneCall();
    
    // Queue the phone call to be displayed to the player
    CallManager.QueueCall(customCall);
}

// Create and queue a phone call from an NPC
public void MakeNPCCall(NPC npc)
{
    // Create a phone call from an NPC
    NPCPhoneCall npcCall = new NPCPhoneCall(npc);
    
    // Queue the phone call to be displayed to the player
    CallManager.QueueCall(npcCall);
}
``` 