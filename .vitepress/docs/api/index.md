# API Reference

Welcome to the S1API reference documentation. This section provides detailed information about all the classes, methods, and properties available in S1API.

## API Structure

S1API is organized into several namespaces:

- `S1API` - Core functionality and common utilities
- `S1API.GameElements` - Classes for creating and manipulating game objects
- `S1API.SaveLoad` - Save and load system for mod data
- `S1API.Utils` - Helper utilities for common operations

## Key Concepts

### Cross-Compatibility

All API classes and methods are designed to work seamlessly across both Mono and Il2Cpp builds. The implementation details are abstracted away, allowing you to focus on your mod's functionality.

### Type Safety

S1API provides type-safe wrappers around game objects and functions, helping prevent common errors and making your code more robust.

### Performance Considerations

While S1API abstracts away many implementation details, it's designed to minimize performance overhead. However, for extremely performance-critical operations, you might want to consider direct access to game functions.

## Getting Started with the API

If you're new to S1API, we recommend starting with the [Game Elements](/api/game-elements) documentation, which covers the most commonly used functionality. 