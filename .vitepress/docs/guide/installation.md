# Installation Guide

This guide covers how to install S1API for both mod users and mod developers.

## For Mod Users

If you're a player who wants to use mods that require S1API, follow these steps:

1. **Install MelonLoader**
   - Download and install MelonLoader for Schedule One following the [official MelonLoader installation guide](https://melonwiki.xyz/#/README).
   - Ensure MelonLoader is properly installed by launching the game once and verifying a `Plugins` folder was created in your game directory.

2. **Install S1API**
   - Download the latest S1API release ZIP file.
   - Extract the ZIP file, which contains a `Plugins` folder, with the S1API DLL and folder.
   - Drag the contents of the extracted `Plugins` folder into the `Plugins` folder in your Schedule One game directory.
   - If prompted to replace files, select "Yes". This should only occur when updating.

3. **Verify Installation**
   - Launch Schedule One.
   - If installed correctly, S1API will load with MelonLoader at game startup.
   - You can verify the installation by checking the MelonLoader console for S1API messages.

## For Mod Developers

If you're a mod developer who wants to use S1API in your mod, follow these steps:

1. **Obtain S1API**
   - Install S1API following the steps in the "For Mod Users" section above.

2. **Add S1API as a Reference**
   - Create or open your mod project in your IDE.
   - Add the S1API DLL as a project reference:
     - In Visual Studio: Right-click "Dependencies" or "References" in your project → Add Reference → Browse → Select the S1API DLL.
   - Ensure you reference the correct version:
     - For IL2CPP games: Use `S1API.Il2Cpp.dll`
     - For Mono games: Use `S1API.Mono.dll`

3. **Set Up Build Configurations**
   - Create IL2CPP and Mono build configurations in your project

4. **Set Requirements**
   - In your mod's documentation, indicate that S1API is a requirement for users to run your mod.

5. **Start Developing**
   - You can now use the S1API classes and methods in your mod code.
   - Import the appropriate namespaces in your code files to access S1API functionality.