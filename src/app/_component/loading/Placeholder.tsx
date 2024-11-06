import module from "./Placeholder.module.scss";

type PlaceHolderProps = {
  style?: React.CSSProperties;
};

export default function PlaceHolder({ style }: PlaceHolderProps) {
  return <div className={module.placeholder} style={style} />;
}
