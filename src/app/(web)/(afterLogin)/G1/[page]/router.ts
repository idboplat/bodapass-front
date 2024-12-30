import { TPath } from "@/utils/getPage";
import Adminlist from "@/components/adminlist/Home";
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
import ScreenDashboard from "@/components/pageComponents/screenDashboard";
import ScreenMy from "@/components/pageComponents/screenMy";
import Userlist from "@/components/userlist/Home";
import ScreenMarketList from "@/components/pageComponents/userMarket/screenMarketList";
import ScreenChargeNPay from "@/components/pageComponents/chargeNpay/screenChargeNPay";
import PositionStatus from "@/components/pageComponents/order/PositionStatus";
import PnlStatus from "@/components/pageComponents/order/PnlStatus";
import TradeStatus from "@/components/pageComponents/order/TradeStatus";
import OpenOrderStatus from "@/components/pageComponents/order/OpenOrderStatus";
import OrderStatus from "@/components/pageComponents/order/OrderStatus";
import ScreenAgentStatistics from "@/components/pageComponents/statistics/screenAgentStatistics";
import ScreenManagement from "@/components/pageComponents/statistics/screenManagement";
import ScreenSubAgentStatistics from "@/components/pageComponents/statistics/screenSubAgentStatistics";
import ScreenAgentStatus from "@/components/pageComponents/agents/screenAgentStatus";

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
        Home: ScreenDashboard,
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
        Home: ScreenMy,
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
        Home: Userlist,
      },
      {
        title: "관리자 목록",
        description: "",
        pid: "100202",
        Home: Adminlist,
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
        Home: ScreenMarketList,
      },
      {
        title: "입출금 관련",
        description: "",
        pid: "100302",
        Home: ScreenChargeNPay,
      },
      {
        title: "환율",
        description: "",
        pid: "100303",
        Home: ScreenChargeNPay,
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
        Home: Adminlist,
      },
      {
        title: "당사 입금 신청",
        description: "입금내역과 출금내역을 확인 할 수 있습니다.",
        pid: "100502",
        Home: Adminlist,
      },
      {
        title: "위탁 입금 신청",
        description: "입금내역과 출금내역을 확인 할 수 있습니다.",
        pid: "100503",
        Home: Adminlist,
      },
      {
        title: "회원 입출금 신청",
        description: "",
        pid: "100504",
        Home: Adminlist,
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
        Home: ScreenAgentStatus,
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
      { title: "정산관리", description: "", pid: "100701", Home: ScreenManagement },
      {
        title: "에이전트 수익 통계",
        description: "",
        pid: "100711",
        Home: ScreenAgentStatistics,
      },
      {
        title: "하부 에이전트 수익 통계",
        description:
          "소수점 자리는 첫째 자리에서 반올림 되어집니다. 매일 00시 기준으로 업데이트 됩니다.",
        pid: "100721",
        Home: ScreenSubAgentStatistics,
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
      { title: "회원 로그", description: "", pid: "100801", Home: Adminlist },
      { title: "회원 접속 이력", description: "", pid: "100802", Home: Adminlist },
      { title: "관리자 로그", description: "", pid: "100803", Home: Adminlist },
      { title: "관리자 접속 이력", description: "", pid: "100804", Home: Adminlist },
    ],
  },
];
