/**
 * Copyright 2023 Nordcloud Oy or its affiliates. All Rights Reserved.
 */

import { createContext, useContext, useMemo } from "react";
import { useThemeSwitcher, THEME_OPTIONS } from "@nordcloud/gnui";

const initialState = {
  currentTheme: THEME_OPTIONS.LIGHT,
  toggleTheme: () => undefined,
  setTheme: () => undefined,
};

type Context = {
  currentTheme: THEME_OPTIONS;
  toggleTheme: () => void;
  setTheme: (newTheme: THEME_OPTIONS) => void;
};

const GNUIThemeContext = createContext<Context>(initialState);
GNUIThemeContext.displayName = "GNUIThemeContext";

export function GNUIThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme, setTheme } = useThemeSwitcher();

  const nextTheme =
    currentTheme === THEME_OPTIONS.LIGHT
      ? THEME_OPTIONS.DARK
      : THEME_OPTIONS.LIGHT;

  const contextValue = useMemo(() => {
    const toggleTheme = () => setTheme(nextTheme);

    return {
      currentTheme,
      setTheme,
      toggleTheme,
    };
  }, [currentTheme, setTheme, nextTheme]);

  return (
    <GNUIThemeContext.Provider value={contextValue}>
      {children}
    </GNUIThemeContext.Provider>
  );
}

export function useGNUITheme() {
  const context = useContext(GNUIThemeContext);

  if (context === undefined) {
    throw new Error("useGNUITheme must be used within a GNUIThemeProvider");
  }
  return context;
}
