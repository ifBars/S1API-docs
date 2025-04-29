# Mono vs Il2Cpp: Practical Differences for Modders

::: tip Note
While S1API abstracts away the differences between Mono and Il2Cpp, understanding these concepts provides valuable insight into what development without S1API would be like. This guide helps you appreciate how S1API simplifies modding by handling the complexities of both backends for you.
:::

This guide explains the key differences between Mono and Il2Cpp builds of Unity games, with a focus on modding using MelonLoader and S1API. It includes practical advice, code examples, and best practices to help you write mods that work on both platforms.

## What is Mono?

Mono is an open-source implementation of the .NET Framework in Unity games:

- C# code is compiled to Intermediate Language (IL)
- IL is interpreted or JIT-compiled at runtime
- Game assemblies are distributed as .dll files with readable metadata
- Reflection and .NET features work as expected
- Modding is straightforward: you can use standard C# features, reflection, and direct type access

## What is Il2Cpp?

Il2Cpp is Unity's technology for converting C# code to C++:

- IL code is converted to C++ at build time
- C++ is compiled to native machine code (native libraries: .dll, .so, etc.)
- Reflection and some .NET features are limited or behave differently
- Type information may be stripped or obfuscated
- Modding is more challenging: direct access to types and methods is restricted

## Key Differences for Modders

| Feature                | Mono (.NET)         | Il2Cpp (Native)         |
|------------------------|---------------------|-------------------------|
| Assembly Format        | .dll (managed)      | .dll/.so (native)       |
| Reflection             | Full support        | Limited/stripped        |
| Method Pointers        | Directly accessible | Special handling needed |
| Type Information       | Complete            | Often stripped/limited  |
| Coroutines             | Standard Unity      | Special handling        |
| Custom Components      | Standard C#         | Requires registration   |
| Casting                | Standard C#         | Use Il2CppInterop       |
| Events                 | Standard C#         | Use generated methods   |
| Modding Difficulty     | Easier              | More challenging        |

## Best Practices for Cross-Platform Mods

- **Use S1API abstractions**: Always prefer S1API's interfaces and helpers over direct game references.
- **Avoid direct reflection**: Use S1API's reflection helpers or type mapping.
- **Test on both platforms**: If possible, test your mods on both Mono and Il2Cpp builds.
- **Conditional compilation**: Use only as directed by S1API documentation.
- **Register custom Il2Cpp types**: Always register your custom components if inheriting from Il2Cpp types.
- **Use MelonCoroutines**: For coroutines, always use `MelonCoroutines` for compatibility.

## How S1API Bridges the Gap

S1API provides a unified interface for modding both Mono and Il2Cpp builds by:

1. **Abstraction Layer**: Wrapping platform-specific code behind common interfaces
2. **Type Mapping**: Handling differences in type systems automatically
3. **Reflection Helpers**: Providing alternatives to reflection where needed
4. **Function Proxying**: Creating proxy methods that work correctly on both platforms

By following these guidelines and using S1API, you can write mods that are robust and compatible with both Mono and Il2Cpp versions of Schedule One. 