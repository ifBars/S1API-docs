# Installation Guide

This guide covers how to install S1API for both mod users and mod developers.

## For Mod Users

If you're a player who wants to use mods that require S1API, follow these steps:

1. **Install MelonLoader**
   - Download and install MelonLoader for Schedule One following the [official MelonLoader installation guide](https://melonwiki.xyz/#/README).
   - Ensure MelonLoader is properly installed by launching the game once and verifying a `Plugins` folder was created in your game directory.

2. **Install S1API**
   - Download the latest S1API release ZIP file.
   - Drag the `Plugins` folder into your Schedule One game directory.
   - If prompted to replace files, select "Yes". This should only occur when updating S1API.

3. **Verify Installation**
   - Launch Schedule One.
   - If installed correctly, S1API will load with MelonLoader at game startup.
   - You can verify the installation by checking the MelonLoader console for S1API messages.

## For Mod Developers

If you're a mod developer who wants to use S1API in your mod, follow these steps:

1. **Obtain S1API**
   - Install S1API following the steps in the "For Mod Users" section above.

2. **Add S1API as a Reference**
   - Install the S1API NuGet package in your mod project:
     - Using NuGet Package Manager: Search for "S1API" and install the latest version
     - Using Package Manager Console: `Install-Package S1API`
     - Using .NET CLI: `dotnet add package S1API`
     - Using PackageReference: Add `<PackageReference Include="S1API" Version="1.2.3" />` to your project file
   - The NuGet package automatically handles the correct references for both IL2CPP and Mono builds

   > **Important Warning:** Do not add the game's `Assembly-CSharp.dll` as a reference when using S1API. Referencing the game's assembly directly can cause conflicts and issues with your mod.
   
3. **Start Developing**
   - You can now use the S1API classes and methods in your mod code.
   - Import the appropriate namespaces in your code files to access S1API functionality.

4. **Publishing Your Mod**
   - When publishing your mod, always include S1API as a dependency in your documentation.
   - Make it clear to users that they need to install S1API for your mod to function properly.