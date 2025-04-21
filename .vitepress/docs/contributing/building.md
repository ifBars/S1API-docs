# Building the S1API Project

This guide explains how to set up your development environment and build the S1API project.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Visual Studio 2019 or later](https://visualstudio.microsoft.com/) with the following workloads:
  - .NET desktop development
  - Game development with Unity
- [.NET Framework 4.7.2 SDK](https://dotnet.microsoft.com/download/dotnet-framework)
- [Git](https://git-scm.com/downloads) for version control

## Setting Up the Development Environment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/KaBooMa/S1API.git
   cd S1API
   ```

2. **Open the Solution**

   Open the `S1API.sln` file in Visual Studio.

## Building the Project

S1API needs to be built for both Mono and Il2Cpp environments:

### Building for Mono

1. In Visual Studio, set the solution configuration to `Debug_Mono` or `Release_Mono`
2. Build the solution (F6 or Ctrl+Shift+B)
3. The output will be located in the `bin/[Configuration]/S1API.dll` directory

### Building for Il2Cpp

1. In Visual Studio, set the solution configuration to `Debug_Il2Cpp` or `Release_Il2Cpp`
2. Build the solution (F6 or Ctrl+Shift+B)
3. The output will be located in the `bin/[Configuration]/S1API.dll` directory

## Running Tests

1. Open the Test Explorer in Visual Studio (Test > Test Explorer)
2. Click "Run All Tests" to run the unit tests

## Creating a Release

To create a release:

1. Build both Mono and Il2Cpp versions in Release configuration
2. Run all tests to ensure everything works correctly
3. Zip the output files into a package for distribution

## Troubleshooting

### Common Issues

- **Missing References**: Make sure you have the correct game assemblies referenced
- **Build Errors**: Check that you have the correct .NET Framework version installed
- **Test Failures**: Ensure your changes don't break existing functionality

### Getting Help

If you encounter issues while building the project, feel free to:

1. Check the GitHub issues to see if it's a known problem
2. Ask for help on the Discord server
3. Create a new issue with details about your problem 