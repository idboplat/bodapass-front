import { sortDecimal } from "@/app/_lib/numberFormatter";
import { ICellRendererParams } from "ag-grid-community";
import css from "./ExchangeRateInfo.module.scss";

interface Props {
  num: string;
  exchRate: string;
  decimalLength: number;
}

export default function ExchangRateInfo(props: Props) {
  const price = parseFloat(props.num) * parseFloat(props.exchRate);
  const convertedPrice = sortDecimal({
    num: price.toString(),
    decimalLength: props.decimalLength,
    requireComma: true,
  });

  return (
    <div className={css.wrap}>
      <span>{props.num}</span>
      <span>(≒ {convertedPrice})</span>
    </div>
  );
}
