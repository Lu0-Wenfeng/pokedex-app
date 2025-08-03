// Utility types for common patterns across the application

import type React from 'react';

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type NonNullable<T> = T extends null | undefined ? never : T;

// API response wrapper types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// Async state types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Event handler types
export type EventHandler<T = void> = () => T;
export type EventHandlerWithParam<P, T = void> = (param: P) => T;
export type AsyncEventHandler<T = void> = () => Promise<T>;
export type AsyncEventHandlerWithParam<P, T = void> = (param: P) => Promise<T>;

// React event types
export type ClickHandler = EventHandler<void>;
export type ChangeHandler<T = string> = EventHandlerWithParam<T, void>;
export type SubmitHandler = EventHandlerWithParam<React.FormEvent, void>;
export type InputChangeHandler = EventHandlerWithParam<React.ChangeEvent<HTMLInputElement>, void>;
export type SelectChangeHandler = EventHandlerWithParam<React.ChangeEvent<HTMLSelectElement>, void>;

// Component prop utility types
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WithClassName<T = {}> = T & {
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WithOptionalClassName<T = {}> = T & {
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WithTestId<T = {}> = T & {
  'data-testid'?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type WithAriaLabel<T = {}> = T & {
  'aria-label'?: string;
};

// Form-related utility types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Pagination utility types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Filter utility types
export interface FilterOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface FilterState<T = Record<string, unknown>> {
  filters: T;
  isActive: boolean;
}

// Sort utility types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T = string> {
  field: T;
  direction: SortDirection;
}

// Search utility types
export interface SearchState<T = unknown> {
  query: string;
  results: T[];
  isSearching: boolean;
  hasSearched: boolean;
}

// Modal utility types
export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: unknown;
}

// Theme utility types
export type ThemeMode = 'light' | 'dark';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Size utility types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

// Position utility types
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'start' | 'center' | 'end';
export type Placement = `${Position}-${Alignment}` | Position;

// Responsive utility types
export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

// Animation utility types
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce';

// Data transformation utility types
export type KeyValuePair<K = string, V = unknown> = {
  key: K;
  value: V;
};

export type Dictionary<T = unknown> = Record<string, T>;
export type StringDictionary = Dictionary<string>;
export type NumberDictionary = Dictionary<number>;

// Function utility types
export type Predicate<T> = (item: T) => boolean;
export type Mapper<T, U> = (item: T) => U;
export type Reducer<T, U> = (accumulator: U, current: T) => U;
export type Comparator<T> = (a: T, b: T) => number;

// Promise utility types
export type PromiseValue<T> = T extends Promise<infer U> ? U : T;
export type PromiseReturnType<T extends (...args: never[]) => unknown> = PromiseValue<
  ReturnType<T>
>;

// Array utility types
export type ArrayElement<T> = T extends (infer U)[] ? U : never;
export type NonEmptyArray<T> = [T, ...T[]];

// Object utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// String utility types
export type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;
export type Capitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : T;

// ID utility types
export type ID = string | number;
export type UUID = string;
export type Timestamp = number;

// Status utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type RequestStatus = 'pending' | 'fulfilled' | 'rejected';

// Component state utility types
export interface ComponentState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

// Validation utility types
export type ValidationRule<T> = (value: T) => string | undefined;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

// Route utility types
export interface RouteParams {
  [key: string]: string | undefined;
}

export interface RouteState {
  pathname: string;
  search: string;
  hash: string;
  state?: unknown;
}

// Environment utility types
export type Environment = 'development' | 'staging' | 'production';

// Feature flag utility types
export type FeatureFlag = boolean;
export interface FeatureFlags {
  [key: string]: FeatureFlag;
}

// Breakpoint utility types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Generic component props
export interface BaseProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Conditional types for better type safety
export type If<C extends boolean, T, F> = C extends true ? T : F;
export type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
