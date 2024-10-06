const colors = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#F9A8D4",
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
