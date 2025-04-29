# UI API

The UI API provides tools for creating and managing user interface elements in the game.

## Namespace

```csharp
using S1API.UI;
```

## Key Classes and Interfaces

### UIFactory

Utility class for constructing and configuring various UI elements in Unity.

```csharp
public static class UIFactory
{
    // Creates a UI panel with a background color and optional anchoring
    public static GameObject Panel(string name, Transform parent, Color bgColor, Vector2? anchorMin = null,
        Vector2? anchorMax = null, bool fullAnchor = false);
    
    // Creates a Text UI element with specified properties
    public static Text Text(string name, string content, Transform parent, int fontSize = 14,
        TextAnchor anchor = TextAnchor.UpperLeft, FontStyle style = FontStyle.Normal);
    
    // Creates a scrollable vertical list UI component
    public static RectTransform ScrollableVerticalList(string name, Transform parent, out ScrollRect scrollRect);
    
    // Creates a rounded button with a label inside a mask container for rounded corners
    public static (GameObject, Button, Text) RoundedButtonWithLabel(string name, string label, Transform parent,
        Color bgColor, float width, float height, int fontSize, Color textColor);
    
    // Additional methods for creating and manipulating UI elements...
}
```

### ClickHandler

Represents a handler that encapsulates a callback action to be invoked when a click event occurs.

```csharp
public class ClickHandler
{
    // Constructor to create a new click handler with the specified callback
    public ClickHandler(UnityAction callback);
    
    // Invokes the callback action associated with a click event
    public void OnClick();
}
```

## UIFactory Methods

### Basic UI Elements

```csharp
// Creates a UI panel with a background color and optional anchoring
public static GameObject Panel(string name, Transform parent, Color bgColor, Vector2? anchorMin = null,
    Vector2? anchorMax = null, bool fullAnchor = false);

// Creates a Text UI element with specified properties
public static Text Text(string name, string content, Transform parent, int fontSize = 14,
    TextAnchor anchor = TextAnchor.UpperLeft, FontStyle style = FontStyle.Normal);

// Sets an icon as a child of the specified parent transform with the given sprite
public static void SetIcon(Sprite sprite, Transform parent);

// Creates a text block consisting of a title, subtitle, and an optional completed status label
public static void CreateTextBlock(Transform parent, string title, string subtitle, bool isCompleted);
```

### Layout Management

```csharp
// Creates a horizontal row of buttons using a HorizontalLayoutGroup with configurable spacing and alignment
public static GameObject ButtonRow(string name, Transform parent, float spacing = 12f, TextAnchor alignment = TextAnchor.MiddleCenter);

// Configures a GameObject to use a VerticalLayoutGroup with specified spacing and padding
public static void VerticalLayoutOnGO(GameObject go, int spacing = 10, RectOffset? padding = null);

// Adds a HorizontalLayoutGroup component to the specified GameObject and configures its settings
public static void HorizontalLayoutOnGO(GameObject go, int spacing = 10, int padLeft = 0, int padRight = 0, int padTop = 0, int padBottom = 0, TextAnchor alignment = TextAnchor.MiddleCenter);

// Adjusts the height of the RectTransform content to fit its children's preferred layout size
public static void FitContentHeight(RectTransform content);

// Sets the padding of a given LayoutGroup
public static void SetLayoutGroupPadding(LayoutGroup layoutGroup, int left, int right, int top, int bottom);
```

### Buttons and Interactive Elements

```csharp
// Creates a button with a label and specific dimensions
public static (GameObject, Button, Text) ButtonWithLabel(string name, string label, Transform parent,
    Color bgColor, float Width, float Height);

// Creates a rounded button with a label inside a mask container for rounded corners
public static (GameObject, Button, Text) RoundedButtonWithLabel(string name, string label, Transform parent,
    Color bgColor, float width, float height, int fontSize, Color textColor);

// Adds a button to the specified GameObject
public static void CreateRowButton(GameObject go, UnityAction clickHandler, bool enabled);

// Binds an action to a button and updates its label text
public static void BindAcceptButton(Button btn, Text label, string text, UnityAction callback);
```

### Scrolling and Content Management

```csharp
// Creates a scrollable vertical list UI component
public static RectTransform ScrollableVerticalList(string name, Transform parent, out ScrollRect scrollRect);

// Clears all child objects of the specified parent transform
public static void ClearChildren(Transform parent);
```

### Complex UI Elements

```csharp
// Creates a quest row GameObject with a specific layout
public static GameObject CreateQuestRow(string name, Transform parent, out GameObject iconPanel,
    out GameObject textPanel);

// Creates a top bar UI element with customizable title and layout settings
public static GameObject TopBar(string name, Transform parent, string title,
    float topbarSize, int paddingLeft, int paddingRight, int paddingTop, int paddingBottom);
```

## Usage Examples

### Creating a Panel with Text

```csharp
using S1API.UI;
using UnityEngine;

public class UIExample
{
    public void CreateSimpleUI(Transform parent)
    {
        // Create a background panel
        var panel = UIFactory.Panel("MainPanel", parent, new Color(0.1f, 0.1f, 0.1f, 0.8f), fullAnchor: true);
        
        // Add a title text to the panel
        UIFactory.Text("Title", "My Custom UI", panel.transform, 24, TextAnchor.MiddleCenter, FontStyle.Bold);
        
        // Add a description text
        UIFactory.Text("Description", "This is an example of creating UI with S1API", 
            panel.transform, 16, TextAnchor.UpperLeft);
    }
}
```

### Creating Buttons and Handling Clicks

```csharp
using S1API.UI;
using UnityEngine;
using UnityEngine.UI;

public class ButtonExample
{
    public void CreateButtonUI(Transform parent)
    {
        // Create a button row
        var buttonRow = UIFactory.ButtonRow("ActionButtons", parent);
        
        // Create a standard button
        var (stdButton, stdBtn, stdText) = UIFactory.ButtonWithLabel(
            "StandardButton", "Click Me", buttonRow.transform, 
            new Color(0.2f, 0.4f, 0.8f), 120f, 40f);
        
        // Set up the button's click handler
        stdBtn.onClick.AddListener(() => {
            Debug.Log("Standard button clicked!");
        });
        
        // Create a rounded button
        var (roundedContainer, roundedBtn, roundedText) = UIFactory.RoundedButtonWithLabel(
            "RoundedButton", "Rounded Button", buttonRow.transform,
            new Color(0.8f, 0.2f, 0.2f), 150f, 40f, 16, Color.white);
        
        // Set up the rounded button's click handler
        roundedBtn.onClick.AddListener(() => {
            Debug.Log("Rounded button clicked!");
        });
    }
}
```

### Creating a Scrollable List

```csharp
using S1API.UI;
using UnityEngine;
using UnityEngine.UI;

public class ScrollableListExample
{
    public void CreateScrollableList(Transform parent)
    {
        // Create a scrollable list and get its content transform
        var contentRT = UIFactory.ScrollableVerticalList("ItemList", parent, out ScrollRect scrollRect);
        
        // Add several items to the list
        for (int i = 0; i < 10; i++)
        {
            // Create each item
            var item = UIFactory.Panel($"Item_{i}", contentRT, new Color(0.2f, 0.2f, 0.2f));
            UIFactory.HorizontalLayoutOnGO(item);
            
            // Add an icon panel
            GameObject iconPanel, textPanel;
            var row = UIFactory.CreateQuestRow($"Quest_{i}", item.transform, out iconPanel, out textPanel);
            
            // Add text to the row
            UIFactory.CreateTextBlock(textPanel.transform, $"Item #{i}", "This is an example item", i > 5);
            
            // Make the row clickable
            UIFactory.CreateRowButton(row, () => {
                Debug.Log($"Clicked on item {i}");
            }, true);
        }
        
        // Adjust content height to fit all items
        UIFactory.FitContentHeight(contentRT);
    }
}
```
