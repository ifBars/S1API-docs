# Cross-Compatibility

One of the main goals of S1API is to enable mod developers to write code that works seamlessly across both Mono and Il2Cpp builds of Schedule One. This guide explains how to achieve cross-compatibility in your mods.

## The Challenge

Schedule One exists in two different build flavors:

1. **Mono**: The original build using Mono as the .NET runtime
2. **Il2Cpp**: A newer build where the .NET code has been converted to C++

These two builds handle many things differently, especially when it comes to:

- Type references and reflection
- Memory management
- Method pointers and delegates
- Native interop

Without S1API, mod developers would need to create separate versions of their mods for each build, duplicating effort and maintenance.

## Best Practices for Cross-Compatible Mods

Follow these guidelines to ensure your mods work across both builds:

### DO:

- ✅ Use S1API interfaces and classes instead of direct game references
- ✅ Use the provided manager classes (ItemManager, ProductManager, etc.)
- ✅ Extend built-in classes like Quest, PhoneApp, etc. for standard functionality
- ✅ Test your mod on both Mono and Il2Cpp if possible

### DON'T:

- ❌ Reference game assemblies directly
- ❌ Use raw reflection on game types
- ❌ Make assumptions about memory layout or object references
- ❌ Use platform-specific code without proper conditional compilation

## Conditional Compilation

In rare cases where you need platform-specific code, S1API provides preprocessor symbols:

```csharp
#if (MONO)
// Mono-specific code
#elif (IL2CPP)
// Il2Cpp-specific code
#endif
```

However, this should be a last resort. Aim to use S1API's cross-platform abstractions whenever possible. 