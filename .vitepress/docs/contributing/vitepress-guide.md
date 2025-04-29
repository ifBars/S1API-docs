# VitePress Documentation Guide

This guide is intended for contributors who are familiar with Markdown but new to VitePress. It will help you understand how to write effective documentation for the S1API project.

## VitePress Basics

VitePress is a static site generator built on Vue & Vite, that transforms Markdown files into a documentation website. It extends standard Markdown with additional features and allows Vue components to be used directly in Markdown.

## File Structure

All documentation files are stored in the `S1API Docs/.vitepress/docs` directory, organized by topic. The structure of this directory determines the navigation structure of the documentation website.

## Markdown Extensions

While VitePress supports standard Markdown syntax, it also adds several enhancements:

### Frontmatter

You can add YAML frontmatter to the top of your Markdown files to configure page-specific settings:

```yaml
---
title: Page Title
description: Description for SEO purposes
sidebar: auto
---
```

### Internal Links

Use relative paths for linking to other pages within the documentation:

```markdown
[Link to Page](/path/to/page)
```

### Code Blocks

Enhanced code blocks with syntax highlighting and line highlighting:

````markdown
```csharp
public class Example
{
    public void HighlightedMethod() 
    {
        // This method will have line 3 highlighted
    }
}
```
````

### Custom Containers

Special content blocks for tips, warnings, etc.:

```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger warning
:::

::: details
This is a details block that can be toggled
:::
```

## Images and Assets

Place images and other static assets in the `S1API Docs/.vitepress/public` directory and reference them from the root:

```markdown
![Alt text](/images/example.png)
```

## Components

You can use Vue components directly in your Markdown files:

```markdown
<MyComponent prop="value" />
```

## Tables

Standard Markdown tables are supported:

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Emoji Support

VitePress supports emoji shortcodes:

```markdown
:tada: :100:
```

## Best Practices

1. **Keep it simple**: Focus on clarity and simplicity.
2. **Use headers logically**: Structure your content with proper heading levels.
3. **Include code examples**: Provide practical examples when explaining concepts.
4. **Maintain consistency**: Follow the existing style and tone of the documentation.
5. **Preview your changes**: Use a local VitePress dev server to preview your changes before submitting.
6. **Add examples**: Adding examples to sections with limited or no examples is a great and easy way to contribute.

## Additional Resources

- [Official VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Vue Documentation](https://vuejs.org/guide/introduction.html) 