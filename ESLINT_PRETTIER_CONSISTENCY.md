# ESLint and Prettier Consistency Configuration

## Overview

This document outlines the configuration improvements made to ensure consistency between ESLint and Prettier, specifically addressing import order issues and maintaining code quality standards.

## ✅ Issues Resolved

### Import Order Errors Fixed

**Before:**
```
src/components/filter/filter.tsx
[eslint] 
  Line 13:1:  `react` import should occur before type import of `@app-types/component.types`      import/order
  Line 14:1:  `rsuite` import should occur before type import of `@app-types/component.types`     import/order
  Line 15:1:  `rxjs` type import should occur before type import of `@app-types/component.types`  import/order
  Line 16:1:  `rxjs` import should occur before type import of `@app-types/component.types`       import/order

src/components/filter/multiSelectdropDown/multiSelectdropDown.tsx
  Line 1:1:  `@app-types/component.types` type import should occur after import of `rsuite`  import/order
```

**After:** ✅ All import order errors resolved

## 🔧 Configuration Changes

### ESLint Configuration (`.eslintrc.json`)

#### Enhanced Import Order Rules
```json
{
  "import/order": [
    "error",
    {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "internal"
        }
      ],
      "pathGroupsExcludedImportTypes": ["builtin"],
      "newlines-between": "never",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }
  ]
}
```

#### Key Features:
- **Alphabetical ordering** within import groups
- **Case-insensitive sorting** for better consistency
- **No newlines between import groups** for compact formatting
- **Internal path grouping** for `@/**` patterns

### Prettier Configuration (`.prettierrc.json`)

#### Maintained Consistent Settings
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "bracketSameLine": false,
  "quoteProps": "as-needed"
}
```

#### Key Features:
- **Consistent with ESLint** - No conflicting rules
- **Standard formatting** following project conventions
- **Cross-platform compatibility** with `endOfLine: "lf"`

## 📋 Import Order Standards

### Correct Import Order
```typescript
// 1. External libraries (React, third-party)
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';

// 2. Type imports (after regular imports)
import type { Observable } from 'rxjs';
import type { FilterProps } from '@app-types/component.types';
import type { GenderOption, TypeOption } from '@app-types/context.types';
import type { Pokemon, PokemonListItem } from '@app-types/pokemon.types';

// 3. Internal imports (constants, context, services)
import { baseURL, SEARCH_SLICED } from '@constants/apiUrls';
import { getCamleCaseString } from '@constants/pokemon.types';
import PokemonContext from '@context/pokemonContext/pokmon.context';
import {
  getAllParallelCall,
  getPokemonGenders,
  getPokemonTypes,
  removeDuplicateBy,
} from '@services/common.service';

// 4. Relative imports (styles, components)
import './filter.scss';
import AppMultiSelectDropDown from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';
```

### Import Grouping Rules

1. **Builtin modules** (Node.js built-ins)
2. **External libraries** (React, third-party packages)
3. **Internal modules** (project-specific with `@/` paths)
4. **Parent imports** (`../`)
5. **Sibling imports** (`./`)
6. **Index imports** (`./index`)

### Type Import Handling

- **Type imports** are sorted alphabetically within their respective groups
- **Mixed imports** (both types and values) follow the same grouping rules
- **Consistent with `@typescript-eslint/consistent-type-imports`** rule

## 🛠️ Automation and Maintenance

### Auto-fix Commands
```bash
# Fix import order issues automatically
npx eslint "src/**/*.{js,jsx,ts,tsx}" --fix

# Check Prettier formatting
npx prettier --check "src/**/*.{js,jsx,ts,tsx}"

# Fix Prettier formatting
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

### IDE Integration

#### VS Code Settings (recommended)
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 📊 Benefits Achieved

### Code Quality
- **Consistent import ordering** across the entire codebase
- **Automated enforcement** through ESLint rules
- **Reduced merge conflicts** from inconsistent formatting

### Developer Experience
- **Clear import structure** makes code easier to read
- **Automatic fixing** reduces manual work
- **IDE integration** provides real-time feedback

### Maintainability
- **Standardized patterns** for new developers
- **Automated checks** in CI/CD pipeline
- **Consistent codebase** regardless of developer preferences

## 🔄 Workflow Integration

### Pre-commit Hooks (recommended)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

### CI/CD Checks
```bash
# In your CI pipeline
npm run lint
npm run type-check
npx prettier --check "src/**/*.{js,jsx,ts,tsx}"
```

## 📝 Best Practices

1. **Always run ESLint auto-fix** before committing code
2. **Use consistent import patterns** across components
3. **Group related imports** for better readability
4. **Leverage IDE extensions** for real-time feedback
5. **Regular maintenance** of configuration files

## 🎯 Next Steps

1. **Set up pre-commit hooks** to enforce standards automatically
2. **Configure IDE settings** for all team members
3. **Document import conventions** in team guidelines
4. **Regular review** of ESLint and Prettier configurations

This configuration ensures a consistent, maintainable codebase with automated enforcement of import order and formatting standards.
