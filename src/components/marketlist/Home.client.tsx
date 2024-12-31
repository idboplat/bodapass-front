"use client";
import * as styles from "../pageComponents/styled/contentboxStyled";
import * as colors from "../pageComponents/styled/colorboxStyled";
import { Line_box } from "../pageComponents/styled/lineboxStyled";
import css from "./Home.module.scss";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import { TMarketlistDto } from "@/types/dto";

interface ClientProps {
  page: TClientPage;
  session: Session;
  dto: TMarketlistDto;
}

export default function Client({ page, session, dto }: ClientProps) {
  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        {/** 마켓 갯수 / 신규등록 */}
        <styles.Table_box noWhite={true}>
          <styles.Table_head>
            <p>{"전체 : 4"}</p>
            <a>{"+ 마켓 신규등록"}</a>
          </styles.Table_head>
        </styles.Table_box>

        <Line_box></Line_box>

        <styles.Table_box>
          <styles.Table_body>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>마켓심벌</th>
                  <th>거래 코인</th>
                  <th>결제 코인</th>
                  <th>
                    <a>최소 거래수량</a>
                  </th>
                  <th>
                    <a>호가 단위</a>
                  </th>
                  <th>
                    <a>최소 주문금액</a>
                  </th>
                  <th>
                    <a>최대 주문금액</a>
                  </th>
                  <th>마켓상태</th>
                  <th>거래가능</th>
                  <th>액션</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>BTCUSDT</td>
                  <td>BTC</td>
                  <td>USDT</td>
                  <td>
                    0.0001 <em>(BTC)</em>
                  </td>
                  <td>
                    0.1 <em>(USDT)</em>
                  </td>
                  <td>
                    10 <em>(USDT)</em>
                  </td>
                  <td>
                    1,000,000 <em>(USDT)</em>
                  </td>
                  <colors.Ft_red>마켓운영</colors.Ft_red>
                  <colors.Ft_green>거래정상</colors.Ft_green>
                  <td></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>BTCUSDT</td>
                  <td>BTC</td>
                  <td>USDT</td>
                  <td>
                    0.0001 <em>(BTC)</em>
                  </td>
                  <td>
                    0.1 <em>(USDT)</em>
                  </td>
                  <td>
                    10 <em>(USDT)</em>
                  </td>
                  <td>
                    1,000,000 <em>(USDT)</em>
                  </td>
                  <colors.Ft_red>마켓중지</colors.Ft_red>
                  <colors.Ft_green>거래정상</colors.Ft_green>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </styles.Table_body>
        </styles.Table_box>
      </div>
    </section>
  );
}
