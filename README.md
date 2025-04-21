# S1API Documentation

This repository contains the documentation for S1API, a Schedule One Mono/Il2Cpp cross-compatibility layer. The documentation is built using [VitePress](https://vitepress.dev/).

## Contributing to Documentation

We welcome contributions to improve the S1API documentation! Follow these steps to get started:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/todo/S1API-docs.git
   cd S1API-docs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run docs:dev
   ```

   This will start a local development server at `http://localhost:5173` (or another port if 5173 is in use).

### Documentation Structure

- `.vitepress/config.js` - VitePress configuration
- `.vitepress/docs/` - Documentation content
  - `guide/` - User guides and tutorials
  - `api/` - API reference documentation
  - `public/` - Images like the logo
  - `contributing/` - Contribution guidelines

### Editing Documentation

Documentation files are written in Markdown format (`.md` files). You can edit these files with any text editor.

#### Markdown Features

VitePress extends standard Markdown with additional features:

- **Front Matter**: Add YAML metadata at the top of the file:
  ```yaml
  ---
  title: Page Title
  description: Page description
  ---
  ```

- **Code Blocks**: Syntax highlighting with language specification:
  ```md
  ```csharp
  // C# code here
  ```
  ```

- **Custom Containers**: Create styled callouts:
  ```md
  ::: tip
  This is a tip
  :::

  ::: warning
  This is a warning
  :::

  ::: danger
  This is a dangerous warning
  :::
  ```

- **Links**: Create internal links using relative paths:
  ```md
  [Getting Started](/guide/getting-started)
  ```

### Deployment Workflow

This repository uses an automated deployment workflow:

1. All development work happens on the `dev` branch
2. When changes are pushed to `dev`, they are automatically:
   - Pulled by the server
   - Built into static HTML
   - Deployed to the `main` branch
3. GitHub Pages serves the content from the `main` branch

As a contributor, you only need to focus on making changes to the `dev` branch. The build and deployment process is handled automatically.

### Submitting Changes

1. Create a new branch from `dev`:
   ```bash
   git checkout dev
   git checkout -b feature/my-documentation-update
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add documentation for feature X"
   ```

3. Push your branch:
   ```bash
   git push origin feature/my-documentation-update
   ```

4. Create a pull request to merge into the `dev` branch on GitHub.

Thank you for contributing to S1API!
