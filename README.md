# S1API Documentation

## THIS PROJECT IS DEPRECATED IN FAVOR OF THE DOCFX SITE BUILT INTO THE S1API REPO

[![Build Status](https://github.com/ifBars/S1API-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/ifBars/S1API-docs/actions/workflows/deploy.yml)
[![pages-build-deployment](https://github.com/ifBars/S1API-docs/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ifBars/S1API-docs/actions/workflows/pages/pages-build-deployment)

## 📚 Overview

This repository contains the official documentation for S1API, a Schedule One Mono/Il2Cpp cross-compatibility layer. The documentation is built using [VitePress](https://vitepress.dev/), a modern static site generator powered by Vue.js.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/ifBars/S1API-docs.git
cd S1API-docs

# Install dependencies
npm install

# Start the development server
npm run docs:dev
```

The development server will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🏗️ Project Structure

```
S1API-docs/
├── .vitepress/            # VitePress configuration
│   ├── config.mjs         # Site configuration
│   ├── theme/             # Custom theme components
│   └── docs/              # Documentation content
│       ├── guide/         # User guides and tutorials
│       ├── api/           # API reference documentation
│       └── public/        # Static assets (images, etc.)
├── .github/workflows/     # GitHub Actions workflows
└── package.json           # Project dependencies
```

## 📝 Writing Documentation

Documentation files are written in Markdown (`.md`). VitePress enhances standard Markdown with:

### Front Matter

```yaml
---
title: Page Title
description: Page description for SEO
---
```

### Code Blocks with Syntax Highlighting

````markdown
```csharp
// C# code here with syntax highlighting
var api = new S1API();
api.Initialize();
```
````

### Custom Containers

```markdown
::: tip
Helpful tips and information
:::

::: warning
Important warnings
:::

::: danger
Critical information
:::
```

### Internal Links

```markdown
[Getting Started Guide](/guide/getting-started)
```

## 🔄 Development Workflow

1. All development happens on the `dev` branch
2. Push changes to the `dev` branch to trigger the automatic build
3. The CI/CD pipeline builds and deploys to the `prod` branch
4. GitHub Pages serves content from the `prod` branch

## 👥 Contributing

We welcome contributions to improve the S1API documentation!

### Contribution Process

1. Fork the repository and create a branch:
   ```bash
   git checkout dev
   git checkout -b feature/my-documentation-update
   ```

2. Make your changes, commit, and push:
   ```bash
   git add .
   git commit -m "Add documentation for feature X"
   git push origin feature/my-documentation-update
   ```

3. Open a pull request against the `dev` branch

### Style Guide

- Use clear, concise language
- Include code examples where appropriate
- Follow the existing document structure
- Test all code snippets to ensure they work correctly

## 🔗 Useful Links

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
