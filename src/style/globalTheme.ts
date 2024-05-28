export type GlobalTheme = ReturnType<typeof globalTheme>;

export default function globalTheme() {
  const color = {
    blueActive: "#4F66D8", // 20%
    blueHover: "#354CBE", // 10%
    blueDefault: "#1C33A5", // 0%
    blueDisabled: "#02198B", // -10%

    grayActive: "#E6E6E6", // 10%
    grayHover: "#D9D9D9", // 5%
    grayDefault: "#cccccc", // 0%
    grayDisabled: "#B3B3B3", // -10%
  };

  const zIndex = {
    modal: 1000,
    header: 500,
  };

  return { color, zIndex };
}
