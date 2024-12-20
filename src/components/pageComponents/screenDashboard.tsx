"use client"
import styled, { css } from "styled-components"
import * as styles from "./styled/contentboxStyled"
import { HomeProps } from "@/types/common"

const White_box = styled.div`
  background:#fff; 
  border-radius:15px; 
  padding:16px 24px;
  margin-top:25px !important;
`;

const White_head = styled(White_box)`
  margin:0 0 16px; 
  display:flex; 
  flex-wrap:wrap; 
  align-items:center; 
  justify-content:space-between;

  h2 {
    font-size:14px; 
    color:#494949;
  }

  a {
    display:flex; 
    flex-wrap:wrap; 
    align-items:center; 
    justify-content:center; 
    height:23px; 
    border-radius:5px; 
    padding:0 8px; 
    font-size:12px; 
    color:#fff; 
    background:#667DFF;
  }
`;

const Utube_box = styled.div`
  ul {
    display:flex; 
    flex-wrap:wrap; 
    margin:0 -7px -14px;

    li {
      position:relative; 
      width:calc(33.33% - 14px); 
      margin:0 7px 14px;

      .video {
        position:relative; 
        overflow:hidden;

        &:after {
          display:block; 
          content:""; 
          padding-bottom:56.5%;
        }

        iframe {
          border:0px;
          position:absolute; 
          left:0; 
          top:0; 
          width:100%; 
          height:100%; 
          object-fit:cover;
        }
      }

      .text {
        position:absolute; 
        left:0; 
        bottom:0; 
        width:100%; 
        background:rgba(0,0,0,0.5);

        p {
          padding:7px 0; 
          text-align:center; 
          font-size:14px; 
          color:#fff;
        }
      }
    }
  }
`;

interface ScreenDashboardProps {}

/** 대시보드 */
export default function ScreenDashboard(
  { page, session }: HomeProps<ScreenDashboardProps>
) {

  const clickShowAllInMarket = () => {
  }


  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <styles.State_box>
          <ul>
            {/** 현재 보유 금액 */}
            <li>
              <a className="inner">
                <div>
                  <p>현재 보유 금액</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 포지션 증거금 */}
            <li>
              <a className="inner">
                <div>
                  <p>포지션 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 오더북 증거금 */}
            <li>
              <a className="inner">
                <div>
                  <p>오더북 증거금</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>

            {/** 금일 수익 */}
            <li>
              <a className="inner">
                <div>
                  <p>금일 수익</p>
                  <strong>0,000,000 KRW</strong>
                </div>
              </a>
            </li>
          </ul>
        </styles.State_box>

        {/** 마켓별 현황 */}
        <styles.Table_box mt={"25"}>
          <styles.Table_head>
            <h2>마켓별 현황</h2>
            <a onClick={() => clickShowAllInMarket()}>{"+모두보기"}</a>
          </styles.Table_head>

          <styles.Table_body>
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
                  <td style={{fontWeight: "500"}}>214,426.973357</td>
                  <td>121,633.791355</td>
                  <td>92,793.182002</td>
                  <td style={{color: "#FF0000"}}>-1,354.194075</td>
                  <td style={{textAlign: "right"}}>57,709.033334</td>
                  <td style={{textAlign: "right"}}>3,149.5</td>
                  <td style={{textAlign: "right"}}>994.401563</td>
                  <td style={{textAlign: "right"}}>994.401563</td>
                  <td style={{textAlign: "right"}}>0</td>
                </tr>
                <tr>
								<td>BTCUSDT</td>
								<td>1,246,797.9</td>
								<td style={{fontWeight: "500"}}>214,426.973357</td>
								<td>121,633.791355</td>
								<td>92,793.182002</td>
								<td style={{color: "#0078FF"}}>1,354.194075</td>
								<td style={{textAlign: "right"}}>57,709.033334</td>
								<td style={{textAlign: "right"}}>3,149.5</td>
								<td style={{textAlign: "right"}}>994.401563</td>
								<td style={{textAlign: "right"}}>994.401563</td>
								<td style={{textAlign: "right"}}>0</td>
							</tr>
              </tbody>
            </table>
          </styles.Table_body>

        </styles.Table_box>


        {/** 홍보 영상 */}
        <White_box>
          <White_head>
            <h2>홍보 유튜브</h2>
          </White_head>
        </White_box>

        <div>
          <Utube_box>
            <ul>
              <li>
                <div className="video">
                  <iframe width="1280" height="720" src="https://www.youtube.com/embed/DXk3gBPKzbE" title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 01</p>
                </div>
              </li>
              <li>
                <div className="video">
                  <iframe width="1280" height="720" src="https://www.youtube.com/embed/DXk3gBPKzbE" title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 02</p>
                </div>
              </li>
              <li>
                <div className="video">
                  <iframe width="1280" height="720" src="https://www.youtube.com/embed/DXk3gBPKzbE" title="[2026 FIFA 북중미 월드컵 아시아 2차 예선] 대한민국 vs 태국 풀 하이라이트" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="text">
                  <p>홍보 유튜브 03</p>
                </div>
              </li>
            </ul>
          </Utube_box>
        </div>

      </styles.Content_box>
    </styles.Section>
  );
}