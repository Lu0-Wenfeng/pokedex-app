@ -1,280 +0,0 @@
# 📚 Storybook Documentation

## Overview

This project uses **Storybook 9.1.8** with **RSBuild** for component development, testing, and documentation. Storybook provides an isolated environment to develop UI components independently from the main application.

## 🚀 Quick Start

### Running Storybook

```bash
# Start Storybook development server
pnpm run storybook

# Build Storybook for production
pnpm run build-storybook
```

Storybook will be available at: **http://localhost:6006/**

## 📁 Project Structure

```
.storybook/
├── main.ts          # Main configuration
└── preview.ts       # Global decorators and parameters

src/
└── components/
    └── **/*.stories.tsx  # Component stories
```

## ⚙️ Configuration

### Main Configuration (`.storybook/main.ts`)

- **Framework**: `storybook-react-rsbuild` (RSBuild-based)
- **Stories Pattern**: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- **TypeScript**: Full support with React docgen (type checking disabled for performance)
- **Path Aliases**: All project aliases are configured and working
- **Port**: Configured to run on port 6006 with auto-open
- **Performance**: Telemetry disabled, optimized for development speed

### Preview Configuration (`.storybook/preview.ts`)

- **Global Styles**: RSuite CSS, App.css, and index.css imported in correct order
- **Controls**: Auto-detection for color and date props
- **Framework**: Uses `storybook-react-rsbuild` types

## 🧩 Available Addons

| Addon | Purpose |
|-------|---------|
| `@storybook/addon-docs` | Auto-generated documentation and controls |

*Note: This is a minimal setup focused on documentation. Additional addons can be added as needed.*

## 📖 Writing Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from "storybook-react-rsbuild";
import { YourComponent } from "./YourComponent";

const meta: Meta<typeof YourComponent> = {
  title: "Components/YourComponent",
  component: YourComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Define controls for props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### Story Naming Convention

- **File**: `ComponentName.stories.tsx`
- **Title**: `"Category/ComponentName"`
- **Stories**: `Default`, `WithProps`, `StateVariant`, etc.

## 🎯 Current Stories

This Storybook setup includes a basic test story to verify the configuration:

### Core Components
- **Header** - `src/components/header/Header.stories.tsx`
- **Loader** - `src/components/loader/Loader.stories.tsx`
- **PokemonCard** - `src/components/pokemonCard/PokemonCard.stories.tsx` & `PokemonCard.simple.stories.tsx`

### Filter Components
- **AppFilter** - `src/components/filter/AppFilter.stories.tsx`
- **SearchFilter** - `src/components/filter/search/SearchFilter.stories.tsx`
- **MultiSelectDropDown** - `src/components/filter/multiSelectDropdown/MultiSelectDropdown.stories.tsx`

### Pokemon Details Components
- **ColorfulTag** - `src/components/pokemonDetailsCard/colorfulTags/ColorfulTag.stories.tsx`
- **DetailsHeader** - `src/components/pokemonDetailsCard/detailsHeader/DetailsHeader.stories.tsx`
- **EvolutionChainCard** - `src/components/pokemonDetailsCard/evolutionChainCard/EvolutionChainCard.stories.tsx`
- **PropertyCard** - `src/components/pokemonDetailsCard/propertyCard/PropertyCard.stories.tsx`
- **StatCard** - `src/components/pokemonDetailsCard/statCard/StatCard.stories.tsx`

### Utility Components
- **AppTooltip** - `src/hooks/tooltip/AppTooltip.stories.tsx`
  - `Default` - Basic tooltip with bottom placement
  - `AllPlacements` - Demonstrates all 12 placement options
  - `LongContent` - Shows text wrapping behavior
  - `WithCustomStyling` - Custom CSS styling example
  - `PokemonExample` - Real-world usage in Pokemon descriptions
  - `InteractiveDemo` - Multiple tooltips with different content types

## 🚀 Getting Started with Stories

The current setup is ready for component development! To add your first real component story:

1. **Create your component** in `src/components/YourComponent/`
2. **Add the story file** as `YourComponent.stories.tsx`
3. **Use the provided template** above to create comprehensive stories
4. **Test different states** and prop combinations

### Story Development Workflow

1. **Component First**: Build your component with TypeScript
2. **Story Creation**: Document all component states and variations
3. **Visual Testing**: Use Storybook's visual testing capabilities
4. **Documentation**: Leverage auto-generated docs with `tags: ["autodocs"]`

## 📋 Expanding Story Coverage

### Adding Component Stories

When creating new components for your Pokemon app, follow this pattern:

1. **Create the story file** alongside your component
2. **Include multiple variants** to showcase different states and props
3. **Add comprehensive documentation** using the `parameters` and `argTypes`
4. **Test edge cases** like loading, error, and empty states
5. **Update this documentation** to track your progress

### Story Checklist for New Components

- [ ] Story file created with `.stories.tsx` extension
- [ ] Default story with basic props
- [ ] Variant stories for different states/props
- [ ] Documentation with component description
- [ ] ArgTypes defined for interactive controls
- [ ] Edge cases covered (loading, error, empty)
- [ ] Accessibility considerations included

### Automated Coverage Verification

To ensure all components have stories, you can run:

```bash
# Check for components without stories
find src/components -name "*.tsx" -not -name "*.stories.tsx" -not -name "*.test.tsx" | \
  while read file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .tsx)
    if [ ! -f "$dir/$base.stories.tsx" ] && [ ! -f "$dir/${base^}.stories.tsx" ]; then
      echo "Missing story: $file"
    fi
  done
```

## 🛠️ Development Guidelines

### Creating New Stories

1. **Create story file** next to your component:
   ```
   src/components/myComponent/
   ├── MyComponent.tsx
   ├── MyComponent.scss
   └── MyComponent.stories.tsx
   ```

2. **Use TypeScript** for better type safety and IntelliSense

3. **Include multiple variants** to showcase different states:
   ```typescript
   export const Loading: Story = { args: { isLoading: true } };
   export const Error: Story = { args: { error: "Something went wrong" } };
   export const Empty: Story = { args: { data: [] } };
   ```

4. **Add documentation** using JSDoc comments:
   ```typescript
   argTypes: {
     onClick: {
       description: "Callback fired when the component is clicked",
       action: "clicked",
     },
   }
   ```

### Best Practices

- ✅ **Use mock data** instead of real API calls
- ✅ **Test edge cases** (loading, error, empty states)
- ✅ **Include accessibility** features in stories
- ✅ **Document prop types** with clear descriptions
- ✅ **Use actions** to test event handlers
- ❌ **Don't import** heavy dependencies unnecessarily
- ❌ **Avoid** real network requests in stories

## 🎨 Styling

### Global Styles
- **RSuite**: UI component library styles
- **App.css**: Application-specific styles
- **index.css**: Base styles

### Component Styles
- **SASS**: Preferred for component styling
- **CSS Modules**: Supported via CRA preset
- **Inline Styles**: Use for story-specific styling

## 🔧 Path Aliases

All project path aliases are configured and available in Storybook:

```typescript
import { Pokemon } from "@app-types/pokemon.types";
import { SomeComponent } from "@components/SomeComponent";
import { API_URLS } from "@constants/apiUrls";
// ... etc
```

## 🧪 Testing Integration

### ESLint Configuration
- **Storybook ESLint plugin** enabled
- **Story-specific rules** configured
- **Import rules** relaxed for stories

### TypeScript Support
- **Full TypeScript** integration
- **React docgen** for automatic prop documentation
- **Type checking** disabled for faster builds

## 🚨 Troubleshooting

### Common Issues

1. **SASS compilation errors**
   - Use inline styles for simple story components
   - Ensure SASS files are properly imported

2. **Path alias not working**
   - Check `.storybook/main.ts` webpack configuration
   - Verify `tsconfig.json` paths match

3. **Component not rendering**
   - Check for missing dependencies
   - Verify story export structure

### Performance Tips

- Use **lazy loading** for heavy components
- **Mock external dependencies** in stories
- **Minimize bundle size** by avoiding unnecessary imports

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [React Storybook Guide](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook 9.0 Migration Guide](https://storybook.js.org/docs/9/migration-guide)

## 🔄 Migration Notes

This project has been updated to **Storybook 9.0**, which includes:
- ✅ Removed deprecated `@storybook/addon-actions` (now built-in)
- ✅ Updated to latest React Webpack 5 framework
- ✅ Enhanced TypeScript support
- ✅ Improved performance and build times

---

*For questions or issues with Storybook setup, please refer to the troubleshooting section or check the official documentation.*
