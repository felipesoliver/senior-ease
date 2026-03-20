"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type FontSize = "normal" | "large" | "extra-large";
export type ContrastLevel = "normal" | "high";
export type NavigationMode = "standard" | "simplified";

export interface UserPreferences {
  fontSize: FontSize;
  contrast: ContrastLevel;
  navigationMode: NavigationMode;
  extraConfirmations: boolean;
  remindersEnabled: boolean;
  soundAlerts: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  fontSize: "normal",
  contrast: "normal",
  navigationMode: "standard",
  extraConfirmations: false,
  remindersEnabled: true,
  soundAlerts: false,
};

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const STORAGE_KEY = "senior-ease-preferences";

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {
      setPreferences(DEFAULT_PREFERENCES);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-size-normal", "font-size-large", "font-size-extra-large");
    root.classList.add(`font-size-${preferences.fontSize}`);
    root.classList.remove("contrast-normal", "contrast-high");
    root.classList.add(`contrast-${preferences.contrast}`);

    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [isHydrated, preferences]);

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => setPreferences(DEFAULT_PREFERENCES);

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
};
