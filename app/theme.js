export const enableDarkMode = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
};

export const enableLightMode = () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
};

export const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
  }

 
  return "light";
};
