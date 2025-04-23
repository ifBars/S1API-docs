# What is S1API?

S1API is an open source collaboration project to help standardize Schedule One modding processes. The goal is to provide a standard place for common functionalities so you can focus on making content versus reverse engineering the game.

> **Note:** If you are just looking to mod your game, please refer to the releases on mod repositories such as Thunderstore and Nexus Mods. This documentation is intended for developers.

## Purpose

S1API serves as a compatibility layer between Mono and Il2Cpp versions of Schedule One, allowing mod developers to:

- Create content that works across different game builds
- Utilize common game functions without using assemblies directly
- Develop in a familiar Managed environment regardless of target build

## What S1API Provides

- **Content Creation**: Tools for creating new game elements (quests, NPCs, etc.)
- **Data Management**: Easy-to-use abstractions for save/load functionality
- **Game Functions**: Simplified access to common game functions
- **Cross-Compatibility**: Build once, deploy anywhere approach
- **Community Support**: Collaborative environment for modders

## How It's Designed to Work

S1API is designed to compile for Mono and Il2Cpp separately. Mod users install the version applicable to their preferred build.

Mod developers can develop their mods on either Mono or Il2Cpp without having to step into the Il2Cpp environment directly. Note that if you utilize Il2Cpp-specific functionality within your mod, you may lose cross compatibility.

S1API is also designed to be a tag-along. If you want to create custom content specific to Mono or Il2Cpp, S1API can still assist with common repetitive tasks.

## Limitations

S1API is designed to cover common use cases but has some limitations:

- It will not cover every possible modding scenario
- Advanced functionality may still require direct assembly references
- Some game-specific features might not be fully abstracted

## Want to Contribute?

This is a massive project with many different areas to specialize in. If you're interested in contributing, please refer to the [Contributing](/contributing/) page for guidance on code standards and the contribution process.