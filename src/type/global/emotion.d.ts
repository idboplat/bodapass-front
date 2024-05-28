import "@emotion/react";
import { GlobalTheme } from "@/style/globalTheme";

//해당 파일에서 타입수정을 하지않고 @/public/style/themeStyle 에서 타입을 수정부탁드립니다.
declare module "@emotion/react" {
  interface Theme extends GlobalTheme {}
}
