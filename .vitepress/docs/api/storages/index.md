# Storages API

The Storages API provides functionality for creating and managing inventory systems, storage containers, and item transfers within the game.

## Namespace

```csharp
using S1API.Storages;
```

## Key Classes

### Storage

Base class for all storage containers in the game.

```csharp
public class Storage : SaveableBase
{
    public string StorageID { get; }
    public string Name { get; set; }
    public int Capacity { get; set; }
    public float MaxWeight { get; set; }
    public List<ItemStack> Contents { get; }
    public bool IsLocked { get; set; }
    public StorageType Type { get; }
    
    public Storage(string storageID, string name, int capacity, StorageType type = StorageType.Generic);
    
    public bool AddItem(string itemID, int quantity = 1);
    public bool AddItemStack(ItemStack itemStack);
    public bool RemoveItem(string itemID, int quantity = 1);
    public bool RemoveItemStack(ItemStack itemStack);
    public bool HasItem(string itemID, int quantity = 1);
    public ItemStack GetItem(string itemID);
    public List<ItemStack> GetItemsByType(ItemType type);
    public bool CanAddItem(string itemID, int quantity = 1);
    public bool CanAddItemStack(ItemStack itemStack);
    public int GetFreeSpace();
    public float GetCurrentWeight();
    public float GetRemainingWeightCapacity();
    public void Clear();
    public void Lock();
    public void Unlock();
}
```

### StorageType

Enum representing different types of storage containers.

```csharp
public enum StorageType
{
    Generic,
    PlayerInventory,
    PlayerEquipment,
    Container,
    Stash,
    Vehicle,
    Shop,
    Loot,
    Safe,
    Fridge,
    Wardrobe
}
```

### Inventory

Specialized storage for player inventory.

```csharp
public class Inventory : Storage
{
    public List<EquipmentSlot> EquipmentSlots { get; }
    public List<ItemStack> QuickSlots { get; }
    
    public Inventory(string playerID, int capacity = 30);
    
    public bool EquipItem(string itemID);
    public bool EquipItemStack(ItemStack itemStack, EquipmentSlotType slotType);
    public bool UnequipItem(EquipmentSlotType slotType);
    public ItemStack GetEquippedItem(EquipmentSlotType slotType);
    public bool IsEquipped(string itemID);
    public void SetQuickSlot(int slotIndex, ItemStack itemStack);
    public ItemStack GetQuickSlot(int slotIndex);
    public void ClearQuickSlot(int slotIndex);
}
```

### EquipmentSlot

Represents an equipment slot for wearable or usable items.

```csharp
public class EquipmentSlot
{
    public EquipmentSlotType Type { get; }
    public ItemStack EquippedItem { get; }
    public bool IsOccupied { get; }
    
    public EquipmentSlot(EquipmentSlotType type);
    
    public bool CanEquip(ItemStack itemStack);
    public bool Equip(ItemStack itemStack);
    public ItemStack Unequip();
    public void Clear();
}
```

### EquipmentSlotType

Enum representing different types of equipment slots.

```csharp
public enum EquipmentSlotType
{
    Head,
    Face,
    Torso,
    Legs,
    Feet,
    Hands,
    Back,
    Waist,
    Neck,
    Ring,
    PrimaryWeapon,
    SecondaryWeapon,
    Tool
}
```

### StorageManager

Static class for managing all storage containers in the game.

```csharp
public static class StorageManager
{
    public static List<Storage> AllStorages { get; }
    
    public static void RegisterStorage(Storage storage);
    public static void UnregisterStorage(string storageID);
    public static Storage GetStorage(string storageID);
    public static List<Storage> GetStoragesByType(StorageType type);
    public static bool TransferItem(Storage source, Storage destination, string itemID, int quantity = 1);
    public static bool TransferItemStack(Storage source, Storage destination, ItemStack itemStack);
    public static bool SwapItems(Storage storageA, string itemIDA, Storage storageB, string itemIDB);
}
```

## Usage Examples

### Creating Storage Containers

```csharp
// Create a simple container
Storage backpack = new Storage(
    "mymod.backpack_small",
    "Small Backpack",
    15,
    StorageType.Container
);
backpack.MaxWeight = 25.0f; // kg

// Add some starting items
backpack.AddItem("game.medkit", 2);
backpack.AddItem("game.water_bottle", 3);
backpack.AddItem("game.protein_bar", 5);

// Register with the storage manager
StorageManager.RegisterStorage(backpack);

// Create a locked safe
Storage safe = new Storage(
    "mymod.office_safe",
    "Office Safe",
    8,
    StorageType.Safe
);
safe.MaxWeight = 50.0f;
safe.IsLocked = true;

// Add valuable items
safe.AddItem("game.gold_bar", 3);
safe.AddItem("game.documents", 1);

StorageManager.RegisterStorage(safe);
```

### Working with Player Inventory

```csharp
// Create a player inventory
Inventory playerInventory = new Inventory("player123");

// Add items to inventory
playerInventory.AddItem("game.pistol", 1);
playerInventory.AddItem("game.ammo.9mm", 50);
playerInventory.AddItem("game.jacket", 1);
playerInventory.AddItem("game.pants", 1);

// Equip items
playerInventory.EquipItem("game.jacket"); // Automatically goes to the correct slot (Torso)
playerInventory.EquipItem("game.pants"); // Automatically goes to the correct slot (Legs)
playerInventory.EquipItem("game.pistol"); // Automatically goes to the correct slot (PrimaryWeapon)

// Check if an item is equipped
bool hasPistolEquipped = playerInventory.IsEquipped("game.pistol");
Console.WriteLine($"Pistol equipped: {hasPistolEquipped}");

// Unequip an item
ItemStack unequippedWeapon = playerInventory.UnequipItem(EquipmentSlotType.PrimaryWeapon);
Console.WriteLine($"Unequipped: {unequippedWeapon.Item.Name}");

// Set up quick slots
playerInventory.SetQuickSlot(0, playerInventory.GetItem("game.medkit"));
playerInventory.SetQuickSlot(1, playerInventory.GetItem("game.pistol"));

// Use quick slot item
ItemStack quickItem = playerInventory.GetQuickSlot(0);
if (quickItem != null && !quickItem.IsEmpty)
{
    Console.WriteLine($"Using quick slot item: {quickItem.Item.Name}");
    quickItem.Use(); // Automatically decrements quantity if consumable
}
```

### Working with Storage Capacity and Weight

```csharp
// Check if a storage can hold an item
Storage trunk = StorageManager.GetStorage("game.car_trunk");
string heavyItemID = "game.concrete_block";

// Check capacity (slot count)
int freeSlots = trunk.GetFreeSpace();
Console.WriteLine($"Free slots: {freeSlots}");

// Check weight capacity
float currentWeight = trunk.GetCurrentWeight();
float maxWeight = trunk.MaxWeight;
float remainingCapacity = trunk.GetRemainingWeightCapacity();

Console.WriteLine($"Current weight: {currentWeight:F1} kg / {maxWeight:F1} kg");
Console.WriteLine($"Remaining capacity: {remainingCapacity:F1} kg");

// Check if can add specific item
if (trunk.CanAddItem(heavyItemID, 5))
{
    trunk.AddItem(heavyItemID, 5);
    Console.WriteLine("Added 5 concrete blocks to trunk");
}
else
{
    // Find maximum amount that can be added
    int maxAmount = 0;
    while (trunk.CanAddItem(heavyItemID, maxAmount + 1))
    {
        maxAmount++;
    }
    
    Console.WriteLine($"Cannot add 5 concrete blocks. Maximum possible: {maxAmount}");
}
```

### Transferring Items Between Storages

```csharp
// Get source and destination storages
Storage playerStash = StorageManager.GetStorage("player.stash");
Storage playerInventory = StorageManager.GetStorage("player.inventory");

// Transfer a specific amount of an item
bool transferred = StorageManager.TransferItem(
    playerStash,
    playerInventory,
    "game.ammo.rifle",
    30
);

if (transferred)
{
    Console.WriteLine("Transferred 30 rifle ammo from stash to inventory");
}
else
{
    Console.WriteLine("Failed to transfer rifle ammo");
}

// Transfer an entire stack
ItemStack medkits = playerStash.GetItem("game.medkit");
if (medkits != null && !medkits.IsEmpty)
{
    if (StorageManager.TransferItemStack(playerStash, playerInventory, medkits))
    {
        Console.WriteLine($"Transferred {medkits.Quantity} medkits to inventory");
    }
}

// Swap items between storages
bool swapped = StorageManager.SwapItems(
    playerInventory, "game.pistol",
    playerStash, "game.shotgun"
);

if (swapped)
{
    Console.WriteLine("Swapped pistol for shotgun");
}
```

### Handling Locked Storages

```csharp
// Try to access a locked storage
Storage safe = StorageManager.GetStorage("mymod.office_safe");

if (safe.IsLocked)
{
    Console.WriteLine("This safe is locked and requires a key or combination");
    
    // Try to unlock with a key item
    if (playerInventory.HasItem("mymod.safe_key"))
    {
        safe.Unlock();
        Console.WriteLine("Unlocked the safe with your key");
    }
    else
    {
        // Alternative: Show a lockpicking minigame
        bool lockpickSuccess = LockpickingMinigame.Start(safe);
        if (lockpickSuccess)
        {
            safe.Unlock();
            Console.WriteLine("Successfully picked the lock!");
        }
        else
        {
            Console.WriteLine("Failed to pick the lock");
        }
    }
}

// Access contents if unlocked
if (!safe.IsLocked)
{
    Console.WriteLine("Safe contents:");
    foreach (var itemStack in safe.Contents)
    {
        Console.WriteLine($"- {itemStack.Item.Name} x{itemStack.Quantity}");
    }
}
```

## Events

The Storages API provides events to hook into storage-related actions:

```csharp
// Item modification events
StorageManager.OnItemAdded += (storage, itemStack) => { /* ... */ };
StorageManager.OnItemRemoved += (storage, itemStack) => { /* ... */ };
StorageManager.OnItemTransferred += (source, destination, itemStack) => { /* ... */ };

// Equipment events
StorageManager.OnItemEquipped += (inventory, slotType, itemStack) => { /* ... */ };
StorageManager.OnItemUnequipped += (inventory, slotType, itemStack) => { /* ... */ };

// Storage state events
StorageManager.OnStorageLocked += (storage) => { /* ... */ };
StorageManager.OnStorageUnlocked += (storage) => { /* ... */ };
StorageManager.OnStorageOpened += (storage, player) => { /* ... */ };
StorageManager.OnStorageClosed += (storage, player) => { /* ... */ };
```

## Best Practices

1. Design storage containers with realistic weight and capacity limits
2. Use appropriate storage types to categorize containers correctly
3. Create intuitive UI for inventory management
4. Consider locking mechanisms for valuable storage containers
5. Implement weight restrictions that make sense for the game's realism level
6. Use equipment slots appropriately for wearable and holdable items
7. Ensure items can only be equipped in appropriate slots
8. Add visual feedback when containers are full or items cannot be transferred 