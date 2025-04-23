# Building the S1API Project

This guide explains how to set up your development environment and build the S1API project.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Visual Studio 2019 or later](https://visualstudio.microsoft.com/) with the following workloads:
  - .NET desktop development
  - Game development with Unity
- [.NET Standard 2.1 SDK](https://dotnet.microsoft.com/download/dotnet)
- [Git](https://git-scm.com/downloads) for version control
- [MelonLoader](https://github.com/LavaGang/MelonLoader) installed for your Schedule One game installation

## Setting Up the Development Environment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KaBooMa/S1API.git
   cd S1API
   ```

2. **Configure Build Properties**

   The project uses build property files to specify paths to dependencies:
   
   - If building from the GitHub repository, `github.build.props` will be used
   - For local development, create a `local.build.props` file in the root directory with paths to your game assemblies

   Example `local.build.props`:
   ```xml
   <Project>
       <PropertyGroup>
           <MelonLoaderAssembliesPath>C:\Path\To\MelonLoader\MelonLoader\Managed</MelonLoaderAssembliesPath>
           <MonoAssembliesPath>C:\Path\To\Schedule One\Mono\Managed</MonoAssembliesPath>
           <Il2CppAssembliesPath>C:\Path\To\Schedule One\Il2Cpp\Managed</Il2CppAssembliesPath>
           <AutomateLocalDeployment>true</AutomateLocalDeployment>
           <LocalMonoDeploymentPath>C:\Path\To\Schedule One\Mono</LocalMonoDeploymentPath>
           <LocalIl2CppDeploymentPath>C:\Path\To\Schedule One\Il2Cpp</LocalIl2CppDeploymentPath>
       </PropertyGroup>
   </Project>
   ```

3. **Open the Solution**

   Open the `S1API.sln` file in Visual Studio.

## Building the Project

S1API needs to be built for both Mono and Il2Cpp environments:

### Building for Mono

1. In Visual Studio, set the solution configuration to `Mono`
2. Build the solution (F6 or Ctrl+Shift+B)
3. The output will be located in the `bin/Mono/netstandard2.1/S1API.dll` directory

### Building for Il2Cpp

1. In Visual Studio, set the solution configuration to `Il2Cpp`
2. Build the solution (F6 or Ctrl+Shift+B)
3. The output will be located in the `bin/Il2Cpp/netstandard2.1/S1API.dll` directory

## Automated Deployment

If you've configured `AutomateLocalDeployment` to `true` in your `local.build.props`, the build process will automatically copy the compiled DLLs to your game's plugins folder:

- When building the `Mono` configuration, both Mono and Il2Cpp versions will be copied to your Mono game installation
- When building the `Il2Cpp` configuration, both versions will be copied to your Il2Cpp game installation

## Running Tests

If the project includes tests:

1. Open the Test Explorer in Visual Studio (Test > Test Explorer)
2. Click "Run All Tests" to run the unit tests

## Troubleshooting

### Common Issues

- **Missing References**: Make sure your `local.build.props` file has the correct paths to game assemblies
- **Build Errors**: Check that you have the correct .NET Standard version installed
- **Deployment Errors**: Verify your game paths in the `local.build.props` file

### Getting Help

If you encounter issues while building the project, feel free to:

1. Check the GitHub issues to see if it's a known problem
2. Ask for help on the Discord server
3. Create a new issue with details about your problem 