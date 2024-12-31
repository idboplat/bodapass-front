import { TPath } from "@/utils/getPage";
import iconCate1 from "@/assets/images/icon_header_cate_01.png";
import iconCate1On from "@/assets/images/icon_header_cate_on_01.png";
import iconCate2 from "@/assets/images/icon_header_cate_02.png";
import iconCate2On from "@/assets/images/icon_header_cate_on_02.png";
import iconCate3 from "@/assets/images/icon_header_cate_03.png";
import iconCate3On from "@/assets/images/icon_header_cate_on_03.png";
import iconCate4 from "@/assets/images/icon_header_cate_04.png";
import iconCate4On from "@/assets/images/icon_header_cate_on_04.png";
import iconCate5 from "@/assets/images/icon_header_cate_05.png";
import iconCate5On from "@/assets/images/icon_header_cate_on_05.png";
import iconCate6 from "@/assets/images/icon_header_cate_06.png";
import iconCate6On from "@/assets/images/icon_header_cate_on_06.png";
import iconCate7 from "@/assets/images/icon_header_cate_07.png";
import iconCate7On from "@/assets/images/icon_header_cate_on_07.png";
import iconCate8 from "@/assets/images/icon_header_cate_08.png";
import iconCate8On from "@/assets/images/icon_header_cate_on_08.png";
import iconCate9 from "@/assets/images/icon_header_cate_09.png";
import iconCate9On from "@/assets/images/icon_header_cate_on_09.png";

import AdminList from "@/components/adminList/Home";
import Dashboard from "@/components/dashboard/Home";
import My from "@/components/my/Home";
import UserList from "@/components/userList/Home";
import PositionStatus from "@/components/positionStatus/Home";
import PnlStatus from "@/components/pnlStatus/Home";
import TradeStatus from "@/components/tradeStatus/Home";
import OpenOrderStatus from "@/components/openOrderStatus/Home";
import OrderStatus from "@/components/orderStatus/Home";
import Settlement from "@/components/settlement/Home";
import AgentStatus from "@/components/agentstatus/Home";
import Deploy from "@/components/deploy/Home";
import B2b from "@/components/b2b/Home";
import B2bConsign from "@/components/b2bConsign/Home";
import B2c from "@/components/b2c/Home";
import MarketList from "@/components/marketlist/Home";
import MartketCurrencies from "@/components/marketCurrencies/Home";
import MarketTransaction from "@/components/marketTransaction/Home";
import AgentProfit from "@/components/agentProfit/Home";
import SubAgentProfit from "@/components/subAgentProfit/Home";
import UserLog from "@/components/userLog/Home";
import UserHistory from "@/components/userHistory/Home";
import AdminLog from "@/components/adminLog/Home";
import AdminHistory from "@/components/adminHistory/Home";

export const G1_PATH_LIST: TPath[] = [
  {
    category: "대시보드",
    icons: {
      default: iconCate1.src,
      hover: iconCate1On.src,
    },
    pages: [
      {
        title: "대시보드",
        description:
          "현황 등의 통계 데이터는 마지막 접속 시각을 기준으로 1시간 뒤에 새롭게 업데이트하여 반영됩니다.",
        pid: "100101",
        Home: Dashboard,
      },
    ],
  },
  {
    category: "마이페이지",
    icons: {
      default: iconCate1.src,
      hover: iconCate1On.src,
    },
    pages: [
      {
        title: "마이페이지",
        description:
          "관리자 개인의 정보와 관련된 기능을 제공. 계정 정보를 확인하고 수정하거나, 시스템과 관련된 일부 설정을 관리할 수 있습니다",
        pid: "100102",
        Home: My,
      },
    ],
  },
  {
    category: "사용자",
    icons: {
      default: iconCate2.src,
      hover: iconCate2On.src,
    },
    pages: [
      {
        title: "유저 목록",
        description: "",
        pid: "100201",
        Home: UserList,
      },
      {
        title: "관리자 목록",
        description: "",
        pid: "100202",
        Home: AdminList,
      },
    ],
  },
  {
    category: "마켓",
    icons: {
      default: iconCate2.src,
      hover: iconCate2On.src,
    },
    pages: [
      {
        title: "마켓 목록",
        description: "",
        pid: "100301",
        Home: MarketList,
      },
      {
        title: "입출금 관련",
        description: "",
        pid: "100302",
        Home: MarketTransaction,
      },
      {
        title: "환율",
        description: "",
        pid: "100303",
        Home: MartketCurrencies,
      },
    ],
  },
  {
    category: "주문/체결",
    icons: {
      default: iconCate3.src,
      hover: iconCate3On.src,
    },
    pages: [
      { title: "주문 내역", description: "", pid: "100401", Home: OrderStatus },
      { title: "미체결 내역", description: "", pid: "100402", Home: OpenOrderStatus },
      { title: "체결 내역", description: "", pid: "100403", Home: TradeStatus },
      { title: "포지션 내역", description: "", pid: "100404", Home: PositionStatus },
      { title: "고객 손익 내역", description: "", pid: "100405", Home: PnlStatus },
    ],
  },
  {
    category: "입금/출금",
    icons: {
      default: iconCate6.src,
      hover: iconCate6On.src,
    },
    pages: [
      {
        title: "발행",
        description: "입금내역과 출금내역을 확인 할 수 있습니다.",
        pid: "100501",
        Home: Deploy,
      },
      {
        title: "당사 입금 신청",
        description: "입금내역과 출금내역을 확인 할 수 있습니다.",
        pid: "100502",
        Home: B2b,
      },
      {
        title: "위탁 입금 신청",
        description: "입금내역과 출금내역을 확인 할 수 있습니다.",
        pid: "100503",
        Home: B2bConsign,
      },
      {
        title: "회원 입출금 신청",
        description: "",
        pid: "100504",
        Home: B2c,
      },
    ],
  },
  {
    category: "에이전트 관리",
    icons: {
      default: iconCate5.src,
      hover: iconCate5On.src,
    },
    pages: [
      {
        title: "에이전트 관리",
        description: "",
        pid: "100601",
        Home: AgentStatus,
      },
    ],
  },
  {
    category: "정산현황",
    icons: {
      default: iconCate7.src,
      hover: iconCate7On.src,
    },
    pages: [
      { title: "정산관리", description: "", pid: "100701", Home: Settlement },
      {
        title: "에이전트 수익 통계",
        description: "",
        pid: "100711",
        Home: AgentProfit,
      },
      {
        title: "하부 에이전트 수익 통계",
        description:
          "소수점 자리는 첫째 자리에서 반올림 되어집니다. 매일 00시 기준으로 업데이트 됩니다.",
        pid: "100721",
        Home: SubAgentProfit,
      },
    ],
  },
  {
    category: "로그",
    icons: {
      default: iconCate9.src,
      hover: iconCate9On.src,
    },
    pages: [
      { title: "회원 로그", description: "", pid: "100801", Home: UserLog },
      { title: "회원 접속 이력", description: "", pid: "100802", Home: UserHistory },
      { title: "관리자 로그", description: "", pid: "100803", Home: AdminLog },
      { title: "관리자 접속 이력", description: "", pid: "100804", Home: AdminHistory },
    ],
  },
];
