import { placeHolder } from "./placeholder.css";

type PlaceHolderProps = {
  style?: React.CSSProperties;
};

export default function PlaceHolder({ style }: PlaceHolderProps) {
  return <div className={placeHolder} style={style} />;
}
