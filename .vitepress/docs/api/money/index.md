# Money API

The Money API provides functionality for managing in-game currency, including player balance, transactions, and currency conversion.

## Namespace

```csharp
using S1API.Money;
```

## Key Classes

### CurrencyManager

The main class for managing all currency operations.

```csharp
public static class CurrencyManager
{
    // Player currency properties
    public static decimal PlayerBalance { get; }
    
    // Basic currency operations
    public static bool AddMoney(decimal amount);
    public static bool RemoveMoney(decimal amount);
    public static bool SetMoney(decimal amount);
    public static bool HasEnoughMoney(decimal amount);
    
    // Transaction handling
    public static Transaction CreateTransaction(decimal amount, string description);
    public static bool ExecuteTransaction(Transaction transaction);
    public static void CancelTransaction(Transaction transaction);
    
    // Currency history
    public static List<Transaction> GetTransactionHistory(int maxEntries = 50);
    public static List<Transaction> GetTransactionHistory(DateTime startDate, DateTime endDate);
    public static void ClearTransactionHistory();
}
```

### Transaction

Represents a currency transaction.

```csharp
public class Transaction
{
    public string TransactionID { get; }
    public decimal Amount { get; }
    public string Description { get; set; }
    public DateTime Timestamp { get; }
    public TransactionType Type { get; }
    public TransactionStatus Status { get; }
    public string Source { get; set; }
    public string Target { get; set; }
    
    public Transaction(decimal amount, string description, TransactionType type = TransactionType.PlayerTransaction);
    
    public void AddMetadata(string key, string value);
    public string GetMetadata(string key);
    public Dictionary<string, string> GetAllMetadata();
}
```

### TransactionType

Enum representing different types of transactions.

```csharp
public enum TransactionType
{
    PlayerTransaction,
    ShopPurchase,
    ShopSale,
    QuestReward,
    BankTransfer,
    Gambling,
    Gift,
    Theft,
    Tax,
    Custom
}
```

### TransactionStatus

Enum representing the status of a transaction.

```csharp
public enum TransactionStatus
{
    Pending,
    Completed,
    Failed,
    Cancelled
}
```

### CurrencyFormatter

Utility class for formatting currency values.

```csharp
public static class CurrencyFormatter
{
    public static string Format(decimal amount);
    public static string Format(decimal amount, string currencySymbol);
    public static string FormatWithColor(decimal amount, bool useColorCoding = true);
    public static Color GetAmountColor(decimal amount);
}
```

## Usage Examples

### Basic Money Operations

```csharp
// Check current player balance
decimal playerMoney = CurrencyManager.PlayerBalance;
Console.WriteLine($"Current balance: {CurrencyFormatter.Format(playerMoney)}");

// Add money to player
if (CurrencyManager.AddMoney(150.75m))
{
    Console.WriteLine("Money added successfully!");
}

// Remove money from player
if (CurrencyManager.HasEnoughMoney(50.0m))
{
    CurrencyManager.RemoveMoney(50.0m);
    Console.WriteLine("Paid 50 credits");
}
else
{
    Console.WriteLine("Not enough money!");
}

// Set absolute amount
CurrencyManager.SetMoney(1000.0m);
```

### Working with Transactions

```csharp
// Create a transaction
var purchaseTransaction = CurrencyManager.CreateTransaction(
    -75.0m, 
    "Purchased health potion"
);

// Add metadata to the transaction
purchaseTransaction.AddMetadata("item_id", "health_potion");
purchaseTransaction.AddMetadata("vendor", "alchemist_shop");
purchaseTransaction.Source = "Player";
purchaseTransaction.Target = "Alchemist Shop";

// Execute the transaction
if (CurrencyManager.ExecuteTransaction(purchaseTransaction))
{
    // Transaction succeeded
    ShowNotification("Purchase successful!");
    GiveItemToPlayer("health_potion");
}
else
{
    // Transaction failed (probably not enough money)
    ShowNotification("Insufficient funds for purchase!");
}

// Create and execute a quest reward transaction
var questReward = new Transaction(
    250.0m,
    "Reward for completing 'The Lost Artifact' quest",
    TransactionType.QuestReward
);
questReward.AddMetadata("quest_id", "lost_artifact");

CurrencyManager.ExecuteTransaction(questReward);
```

### Viewing Transaction History

```csharp
// Get recent transactions
var recentTransactions = CurrencyManager.GetTransactionHistory(10);

foreach (var transaction in recentTransactions)
{
    string amountText = CurrencyFormatter.FormatWithColor(transaction.Amount);
    string description = transaction.Description;
    string timestamp = transaction.Timestamp.ToString("g");
    
    Console.WriteLine($"[{timestamp}] {description}: {amountText}");
    
    // Show metadata for detailed view
    if (showDetailed)
    {
        foreach (var meta in transaction.GetAllMetadata())
        {
            Console.WriteLine($"  {meta.Key}: {meta.Value}");
        }
    }
}

// Get transactions from a specific time period
var lastWeekTransactions = CurrencyManager.GetTransactionHistory(
    DateTime.Now.AddDays(-7),
    DateTime.Now
);

// Calculate total spent on shop purchases
decimal totalSpent = lastWeekTransactions
    .Where(t => t.Type == TransactionType.ShopPurchase)
    .Sum(t => Math.Abs(t.Amount));

Console.WriteLine($"Total spent on purchases last week: {CurrencyFormatter.Format(totalSpent)}");
```

## Events

The Money API provides events to hook into currency changes:

```csharp
// Money changes
CurrencyManager.OnBalanceChanged += (oldBalance, newBalance) => { /* ... */ };

// Transaction events
CurrencyManager.OnTransactionCreated += (transaction) => { /* ... */ };
CurrencyManager.OnTransactionCompleted += (transaction) => { /* ... */ };
CurrencyManager.OnTransactionFailed += (transaction, reason) => { /* ... */ };
CurrencyManager.OnTransactionCancelled += (transaction) => { /* ... */ };
```

## Best Practices

1. Always use transactions for complex money operations to ensure consistency
2. Add descriptive metadata to transactions for better tracking and debugging
3. Handle transaction failures gracefully with appropriate user feedback
4. Use the currency formatter for consistent display of money values
5. Consider impact on game balance when adding money to the player
6. Subscribe to money events to update UI elements when the player's balance changes
7. Group related money operations in a single transaction for atomic operations 