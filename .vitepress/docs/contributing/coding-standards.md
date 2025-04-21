# Coding Standards

While we don't want to be overly-strict on coding style, there are specific standards to apply. The standards in place aren't meant to cause headache. They are to keep the project consistent and predictable.

## File and Namespace Structure

* All classes must exist in a logical namespace matching the folder structure.
* Internal API code should be placed in `S1API.Internal` sub-namespaces.

```csharp
namespace S1API.Internal.Utils { ... }
```

## Naming Conventions

* In general, naming follows the default Jetbrains Rider suggestions.
* **PascalCase** is to be utilized for class names, methods, properties, and non-private fields.
* **camelCase** is to be used for local variables and private fields.
* Prefix private fields with `_`.

```csharp
private int _myInteger;
public float AddFloats(float floatOne, float floatTwo) => ...
```

## Access Modifiers

* Internal classes must be marked as `internal` to prevent confusion for modders.
* Modder-facing API classes, methods, properties, and fields should use `public`.

```csharp
public static string GenerateString(int length) { ... }
```

* Explicit usage of access methods at all times.
* Arrow functions (`=>`) are used for simple methods and properties. They are to be placed below the declaration and indented once.
* Use `readonly` or `const` for immutable values.
* Nullable variables should be declared as so using `?`.

## Documentation

* All modder-facing API declarations must have an associated summary.

```csharp
/// <summary>
/// Destroys all game objects in the world.
/// </summary>
public void DestroyGameWorld() { ... }
```

## Conditional Build Compilation

* Use `#if (MONO)` and `#elif (IL2CPP)` for platform-specific logic.
* Wrap and alias `using` statements to provide platform-agonstic support.

## What **NOT** to Do

* Do not leak Il2Cpp types across the API.
* Utilize `CrossType` helper methods when possible instead of repeating logic. 