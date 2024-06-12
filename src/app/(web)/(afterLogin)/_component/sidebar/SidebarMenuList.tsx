import SidebarMenuItem from "./SidebarMenuItem";

export default function SidebarMenuList() {
  return (
    <ul>
      <li>1xxxx 공통화면 </li>
      <li>2xxxx 메인 거래소 화면 </li>
      <SidebarMenuItem svg={"20100"} text="회사관리" href="/corp" />
      <SidebarMenuItem svg={"20110"} text="사원관리" href="/empl" />
      <SidebarMenuItem svg={"20200"} text="코인관리" href="/coin" />
      <SidebarMenuItem svg={"20210"} text="코인거래내역" href="/coin/transaction" />
      <li>3xxxx 중개사 화면 </li>
      <SidebarMenuItem svg={"30210"} text="사원관리" href="/empl/brok" />
      <li>4xxxx 하위 거래소 화면</li>
    </ul>
  );
}
