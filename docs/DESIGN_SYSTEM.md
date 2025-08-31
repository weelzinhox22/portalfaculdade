
# FisioWel Design System

Welcome to the official documentation for the FisioWel Design System. This document provides guidelines, component APIs, and best practices for building consistent and high-quality user experiences.

## 1. Introduction

### 1.1. Philosophy

Our design system is built on the following principles:

- **Consistency**: Provide a single source of truth for UI components and styles.
- **Efficiency**: Accelerate development by providing reusable and well-tested components.
- **Accessibility**: Ensure all components are accessible to users with disabilities.
- **Flexibility**: Allow for customization and extension while maintaining design integrity.

### 1.2. Technology Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS 4.x**
- **Vite**
- **Framer Motion** for animations
- **Lucide React** for icons
- **Radix UI** for accessible component primitives
- **class-variance-authority (CVA)** for component variants

## 2. Design Tokens

Design tokens are the foundation of our design system. They are defined as CSS custom properties in `src/styles/tokens.css` and are consumed by Tailwind CSS.

### 2.1. Colors

We use a semantic color system with support for light and dark themes.

- **Primary**: Used for main actions and highlights. (`--color-primary`)
- **Secondary**: Used for secondary actions and information. (`--color-secondary`)
- **Accent**: Used for accents and special highlights. (`--color-accent`)
- **Destructive**: Used for destructive actions. (`--color-destructive`)
- **Background**: The main background color. (`--color-background`)
- **Foreground**: The main text color. (`--color-foreground`)
- **Muted**: For muted text and elements. (`--color-muted`)
- **Border**: For borders and dividers. (`--color-border`)

**Example Usage:**

```css
.my-component {
  background-color: hsl(var(--color-background));
  color: hsl(var(--color-foreground));
  border: 1px solid hsl(var(--color-border));
}
```

### 2.2. Typography

- **Font Families**: `sans` (Inter) and `display` (Plus Jakarta Sans).
- **Font Sizes**: From `xs` to `5xl`.
- **Font Weights**: From `light` to `extrabold`.

**Example Usage:**

```html
<p class="text-lg font-semibold">This is a large, bold text.</p>
```

### 2.3. Spacing

We use a numeric spacing scale from `0` to `20`.

**Example Usage:**

```html
<div class="p-4 m-8">...</div>
```

## 3. UI Components

All UI components are located in `src/components/ui` and exported from the barrel file `src/components/ui/index.ts`.

### 3.1. Button

The `Button` component supports multiple variants, sizes, and states.

**Props:**

- `variant`: `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- `size`: `xs`, `sm`, `md`, `lg`, `xl`
- `loading`: `boolean`
- `disabled`: `boolean`
- `asChild`: `boolean` (for Radix-style polymorphism)

**Example Usage:**

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">Click me</Button>
<Button variant="outline" loading>Loading...</Button>
```

### 3.2. Card

The `Card` component system provides a flexible way to display content in containers.

**Components:**

- `Card.Root`
- `Card.Header`
- `Card.Title`
- `Card.Description`
- `Card.Content`
- `Card.Footer`

**Example Usage:**

```tsx
import { Card } from '@/components/ui';

<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card content goes here.</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="secondary">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card.Root>
```

### 3.3. Input

The `Input` component provides a consistent way to handle user input.

**Props:**

- `variant`: `default`, `filled`, `outline`
- `size`: `sm`, `md`, `lg`
- `loading`: `boolean`
- `leftIcon`: `React.ReactNode`
- `rightIcon`: `React.ReactNode`

**Example Usage:**

```tsx
import { Input } from '@/components/ui';
import { Mail } from 'lucide-react';

<Input type="email" placeholder="Email" leftIcon={<Mail />} />
```

## 4. Migration Guide

This section provides instructions for migrating existing components to the new design system.

### 4.1. From Hardcoded Styles to Tokens

**Before:**

```jsx
<div style={{ color: '#0d9488', padding: '16px' }}>...</div>
```

**After:**

```jsx
<div className="text-primary p-4">...</div>
```

### 4.2. From Old Button to New Button

**Before:**

```jsx
<button className="btn btn-primary">Click me</button>
```

**After:**

```tsx
import { Button } from '@/components/ui';

<Button variant="primary">Click me</Button>
```

## 5. Best Practices

- **Always use tokens**: Avoid hardcoded values for colors, spacing, etc.
- **Use Tailwind classes**: Prefer Tailwind classes over inline styles.
- **Compose components**: Build complex UI by composing simple components.
- **Follow accessibility guidelines**: Ensure all components are accessible.

By following these guidelines, we can maintain a consistent and high-quality codebase.
