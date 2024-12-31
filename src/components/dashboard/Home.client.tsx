"use client";
import { TClientPage } from "@/utils/getPage";
import { Session } from "next-auth";
import css from "./Home.module.scss";
import { CSSProperties } from "react";
import iconState01 from "@/assets/images/icon_state_01.png";
import iconState02 from "@/assets/images/icon_state_02.png";
import iconState03 from "@/assets/images/icon_state_03.png";
import iconState04 from "@/assets/images/icon_state_04.png";

interface ClientProps {
  page: TClientPage;
  session: Session;
}

export default function Client({ page, session }: ClientProps) {
  const clickShowAllInMarket = () => {};

  return (
    <section className="main">
      <div className={css.titleBox}>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </div>

      <div className={css.contentBox}>
        <div className={css.stateBox}>
          <ul>
            {/** 현재 보유 금액 */}
            <li>
              <a
                className="inner"
                style={
                  {
                    "--icon-url": `url(${iconState01})`,
                  } as CSSProperties
                }
              >
                <div>
                  <p>현재 보유 금액</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 포지션 증거금 */}
            <li>
              <a
                className="inner"
                style={
                  {
                    "--icon-url": `url(${iconState02})`,
                  } as CSSProperties
                }
              >
                <div>
                  <p>포지션 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 오더북 증거금 */}
            <li>
              <a
                className="inner"
                style={
                  {
                    "--icon-url": `url(${iconState03})`,
                  } as CSSProperties
                }
              >
                <div>
                  <p>오더북 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 금일 수익 */}
            <li>
              <a
                className="inner"
                style={
                  {
                    "--icon-url": `url(${iconState04})`,
                  } as CSSProperties
                }
              >
                <div>
                  <p>금일 수익</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/** 마켓별 현황 */}
        <div>
          <div className={css.tableHead}>
            <h2>마켓별 현황</h2>
            <a onClick={() => clickShowAllInMarket()}>{"+모두보기"}</a>
          </div>

          <div className={css.tableBody}>
            <table>
              {/** 테이블 헤더 (마켓별 현황) */}
              <thead>
                <tr>
                  <th>마켓</th>
                  <th>포지션 거래금액</th>
                  <th>포지션 증거금</th>
                  <th>롱포지션 증거금</th>
                  <th>숏포지션 증거금</th>
                  <th>금일 실현수익</th>
                  <th>오더북 롱진입 증거금</th>
                  <th>오더북 숏진입 증거금</th>
                  <th>오더북 청산 증거금</th>
                  <th>오더북 롱청산 증거금</th>
                  <th>오더북 숏청산 증거북</th>
                </tr>
              </thead>

              {/* 마켓별 현황 리스트 (예시) */}
              <tbody>
                <tr>
                  <td>BTCUSDT</td>
                  <td>1,246,797.9</td>
                  <td style={{ fontWeight: "500" }}>214,426.973357</td>
                  <td>121,633.791355</td>
                  <td>92,793.182002</td>
                  <td style={{ color: "#FF0000" }}>-1,354.194075</td>
                  <td style={{ textAlign: "right" }}>57,709.033334</td>
                  <td style={{ textAlign: "right" }}>3,149.5</td>
                  <td style={{ textAlign: "right" }}>994.401563</td>
                  <td style={{ textAlign: "right" }}>994.401563</td>
                  <td style={{ textAlign: "right" }}>0</td>
                </tr>
                <tr>
                  <td>BTCUSDT</td>
                  <td>1,246,797.9</td>
                  <td style={{ fontWeight: "500" }}>214,426.973357</td>
                  <td>121,633.791355</td>
                  <td>92,793.182002</td>
                  <td style={{ color: "#0078FF" }}>1,354.194075</td>
                  <td style={{ textAlign: "right" }}>57,709.033334</td>
                  <td style={{ textAlign: "right" }}>3,149.5</td>
                  <td style={{ textAlign: "right" }}>994.401563</td>
                  <td style={{ textAlign: "right" }}>994.401563</td>
                  <td style={{ textAlign: "right" }}>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/** 홍보 영상 */}
        <div className={css.whiteBox}>
          <div className={css.whiteHead}>
            <h2>홍보 유튜브</h2>
          </div>
        </div>

        <div>
          <div className={css.ytubeBox}>
            <ul>
              <li>
                <div className="video">
                  <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/DXk3gBPKzbE"
                    title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 01</p>
                </div>
              </li>
              <li>
                <div className="video">
                  <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/DXk3gBPKzbE"
                    title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 02</p>
                </div>
              </li>
              <li>
                <div className="video">
                  <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/DXk3gBPKzbE"
                    title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 03</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
