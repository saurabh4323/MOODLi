// utils/theme.js

export const enableDarkMode = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
};

export const enableLightMode = () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
};

export const getInitialTheme = () => {
  // If there's a saved preference, use it
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
  }

  // Otherwise, default to light mode
  return "light";
};
