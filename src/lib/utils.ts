
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, with Tailwind CSS class merging.
 * @param inputs - A list of class names.
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A collection of utility functions for the design system.
 */

/**
 * Gets the value of a CSS custom property from the root element.
 * @param tokenName - The name of the CSS custom property.
 * @returns The value of the token.
 */
export function getTokenValue(tokenName: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}

/**
 * A collection of breakpoint values.
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * A collection of theme-related utility functions.
 */
export const theme = {
  /**
   * Sets the theme for the application.
   * @param theme - The theme to set.
   */
  set(theme: 'light' | 'dark' | 'system') {
    if (typeof window === 'undefined') return
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },

  /**
   * Toggles the theme between light and dark.
   */
  toggle() {
    if (typeof window === 'undefined') return
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.set(newTheme);
  },

  /**
   * Initializes the theme based on user preference or system settings.
   */
  init() {
    if (typeof window === 'undefined') return
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.set(savedTheme as 'light' | 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.set(prefersDark ? 'dark' : 'light');
    }
  }
};
