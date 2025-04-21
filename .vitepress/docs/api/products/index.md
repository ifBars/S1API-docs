# Products API

The Products API provides functionality for creating, managing, and purchasing products in the game's shops and storefronts.

## Namespace

```csharp
using S1API.Products;
```

## Key Classes

### Product

Represents a purchasable product in the game.

```csharp
public class Product : SaveableBase
{
    public string ProductID { get; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public Sprite Icon { get; set; }
    public int Stock { get; set; }
    public bool InfiniteStock { get; set; }
    public ProductType Type { get; set; }
    public Dictionary<string, object> Properties { get; }
    public bool IsUnlocked { get; set; }
    public bool RequiresUnlock { get; set; }
    
    public Product(string productID, string name, string description, decimal price);
    
    public bool Purchase(Player player, int quantity = 1);
    public bool CanPurchase(Player player, int quantity = 1);
    public bool AddStock(int amount);
    public bool RemoveStock(int amount);
    public void SetProperty<T>(string key, T value);
    public T GetProperty<T>(string key, T defaultValue = default);
    public void SetUnlockCondition(Func<Player, bool> condition);
}
```

### ProductType

Enum representing different types of products.

```csharp
public enum ProductType
{
    General,
    Weapon,
    Ammo,
    Clothing,
    Consumable,
    Vehicle,
    Property,
    Service,
    Upgrade,
    Special
}
```

### Store

Represents a store or vendor in the game.

```csharp
public class Store : SaveableBase
{
    public string StoreID { get; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Product> Products { get; }
    public decimal ProfitMargin { get; set; }
    public bool IsOpen { get; set; }
    public Schedule OpeningHours { get; }
    public Vector3 Location { get; set; }
    
    public Store(string storeID, string name, string description = "");
    
    public void AddProduct(Product product);
    public void RemoveProduct(string productID);
    public Product GetProduct(string productID);
    public List<Product> GetProductsByType(ProductType type);
    public bool HasProduct(string productID);
    public decimal GetAdjustedPrice(Product product);
    public void Restock(int amount = 10);
    public void SetPriceModifier(ProductType type, float modifier);
}
```

### ProductManager

Static class for managing all products and stores in the game.

```csharp
public static class ProductManager
{
    public static List<Product> AllProducts { get; }
    public static List<Store> AllStores { get; }
    
    public static void RegisterProduct(Product product);
    public static void UnregisterProduct(string productID);
    public static Product GetProduct(string productID);
    public static List<Product> GetProductsByType(ProductType type);
    
    public static void RegisterStore(Store store);
    public static void UnregisterStore(string storeID);
    public static Store GetStore(string storeID);
    public static List<Store> GetNearbyStores(Vector3 position, float radius);
}
```

### PurchaseResult

Enum representing the result of a purchase attempt.

```csharp
public enum PurchaseResult
{
    Success,
    InsufficientFunds,
    OutOfStock,
    InventoryFull,
    ProductLocked,
    InvalidProduct,
    Error
}
```

## Usage Examples

### Creating Products

```csharp
// Create a basic consumable product
var energyDrink = new Product(
    "mymod.energy_drink",
    "Power Surge Energy Drink",
    "Restores stamina and provides a temporary speed boost.",
    15.99m
);
energyDrink.Type = ProductType.Consumable;
energyDrink.Stock = 20;

// Set custom properties
energyDrink.SetProperty("staminaRestore", 50);
energyDrink.SetProperty("speedBoost", 1.2f);
energyDrink.SetProperty("boostDuration", 60.0f); // seconds

// Set icon
energyDrink.Icon = LoadSprite("MyMod/Icons/energy_drink.png");

// Register the product globally
ProductManager.RegisterProduct(energyDrink);

// Create a weapon that requires unlocking
var specialPistol = new Product(
    "mymod.golden_pistol",
    "Golden Pistol",
    "A rare, high-damage pistol with custom engravings.",
    3500.0m
);
specialPistol.Type = ProductType.Weapon;
specialPistol.RequiresUnlock = true;
specialPistol.IsUnlocked = false;
specialPistol.Stock = 1;

// Set unlock condition based on player level
specialPistol.SetUnlockCondition((player) => player.Level >= 20);

ProductManager.RegisterProduct(specialPistol);
```

### Setting Up a Store

```csharp
// Create a convenience store
var convenienceStore = new Store(
    "mymod.convenience_store",
    "Quick Stop",
    "A small convenience store with basic necessities."
);

// Set location
convenienceStore.Location = new Vector3(100, 0, 200);

// Set opening hours (8 AM to 10 PM)
convenienceStore.OpeningHours.SetDailyHours(8, 0, 22, 0);

// Set profit margin (items cost 20% more than base price)
convenienceStore.ProfitMargin = 1.2m;

// Add products
convenienceStore.AddProduct(ProductManager.GetProduct("game.snack_bar"));
convenienceStore.AddProduct(ProductManager.GetProduct("game.soda"));
convenienceStore.AddProduct(ProductManager.GetProduct("game.cigarettes"));
convenienceStore.AddProduct(ProductManager.GetProduct("mymod.energy_drink"));

// Apply a discount to consumables in this store
convenienceStore.SetPriceModifier(ProductType.Consumable, 0.9f);

// Register the store
ProductManager.RegisterStore(convenienceStore);
```

### Purchasing Items

```csharp
// Get a store and product
Store gunShop = ProductManager.GetStore("game.gun_shop");
Product pistol = gunShop.GetProduct("game.pistol");

// Check if player can purchase
Player player = Player.Local;
bool canPurchase = pistol.CanPurchase(player);

if (canPurchase)
{
    // Attempt purchase
    bool purchased = pistol.Purchase(player);
    
    if (purchased)
    {
        // Show success message
        UI.ShowNotification("Purchased " + pistol.Name);
        
        // Play sound effect
        Audio.PlaySound("purchase_success");
    }
}
else
{
    // Check why purchase failed
    if (player.Money < pistol.Price)
    {
        UI.ShowNotification("Not enough money! You need $" + (pistol.Price - player.Money) + " more.");
    }
    else if (pistol.Stock <= 0 && !pistol.InfiniteStock)
    {
        UI.ShowNotification("Out of stock!");
    }
    else if (pistol.RequiresUnlock && !pistol.IsUnlocked)
    {
        UI.ShowNotification("You need to unlock this item first!");
    }
}
```

### Finding and Managing Stores

```csharp
// Find nearby stores
Vector3 playerPosition = Player.Local.Position;
float searchRadius = 100.0f;
List<Store> nearbyStores = ProductManager.GetNearbyStores(playerPosition, searchRadius);

// Display stores on map
foreach (var store in nearbyStores)
{
    // Calculate distance
    float distance = Vector3.Distance(playerPosition, store.Location);
    
    // Add map marker
    MapMarker marker = new MapMarker(
        store.Location,
        store.Name,
        MapMarkerType.Store
    );
    map.AddMarker(marker);
    
    // Check if store is currently open
    bool isOpen = store.IsOpen;
    
    Console.WriteLine($"{store.Name} - {distance:F1}m away - {(isOpen ? "Open" : "Closed")}");
    
    // If closed, check when it opens
    if (!isOpen)
    {
        TimeSpan timeUntilOpen = store.OpeningHours.GetTimeUntilOpen();
        Console.WriteLine($"Opens in {timeUntilOpen.Hours}h {timeUntilOpen.Minutes}m");
    }
}

// Get all weapons from a specific store
Store weaponShop = ProductManager.GetStore("game.weapon_shop");
List<Product> availableWeapons = weaponShop.GetProductsByType(ProductType.Weapon);

Console.WriteLine($"Available weapons at {weaponShop.Name}:");
foreach (var weapon in availableWeapons)
{
    decimal adjustedPrice = weaponShop.GetAdjustedPrice(weapon);
    string stockInfo = weapon.InfiniteStock ? "∞" : weapon.Stock.ToString();
    
    Console.WriteLine($"{weapon.Name} - ${adjustedPrice:F2} - Stock: {stockInfo}");
}

// Restock a store
weaponShop.Restock();
```

## Events

The Products API provides events to hook into product and store interactions:

```csharp
// Purchase events
ProductManager.OnProductPurchased += (product, player, quantity) => { /* ... */ };
ProductManager.OnPurchaseFailed += (product, player, result) => { /* ... */ };

// Store events
ProductManager.OnStoreOpened += (store) => { /* ... */ };
ProductManager.OnStoreClosed += (store) => { /* ... */ };
ProductManager.OnStoreVisited += (store, player) => { /* ... */ };
ProductManager.OnStoreRestocked += (store) => { /* ... */ };

// Product events
ProductManager.OnProductUnlocked += (product, player) => { /* ... */ };
ProductManager.OnProductOutOfStock += (product, store) => { /* ... */ };
ProductManager.OnProductPriceChanged += (product, oldPrice, newPrice) => { /* ... */ };
```

## Best Practices

1. Create balanced pricing for products based on their value and rarity
2. Use custom properties to define special effects or behaviors for products
3. Organize stores logically with appropriate opening hours and locations
4. Use product types to categorize items and apply store-specific discounts
5. Consider using unlockable products as progression rewards
6. Implement store restocking based on game time or events
7. Create unique stores with different selections to encourage exploration
8. Use appropriate icons and descriptions to make products easily identifiable 