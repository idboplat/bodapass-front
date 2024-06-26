import Accordion from "@/app/_component/accordion/Accordion";
import SidebarMenuItem from "./SidebarMenuItem";
import { useState } from "react";

export default function SidebarMenuList() {
  // const [show, setShow] = useState(false);

  // const onClick = () => setShow(() => !show);
  return (
    <ul>
      {/* <li>2xxxx 메인 거래소 화면 </li> */}
      {/* <Accordion title="1xxxx 공통화면" isShow={show} onClick={onClick}>
        <div>asdasdad</div>
        <div>asdasdad</div>
        <div>asdasdad</div>
        <div>asdasdad</div>
        <div>asdasdad</div>
      </Accordion> */}
      <SidebarMenuItem svg={"200100"} text="회사관리" href="/corp" />
      <SidebarMenuItem svg={"200200"} text="사원관리" href="/empl" />
      <SidebarMenuItem svg={"200300"} text="코인관리(발행)" href="/coin" />
      <SidebarMenuItem svg={"200400"} text="코인입출금내역" href="/coin/transaction" />
      {/* <li>3xxxx 중개사 화면 </li>
      <SidebarMenuItem svg={"30210"} text="사원관리" href="/empl/brok" />
      <li>4xxxx 하위 거래소 화면</li> */}
    </ul>
  );
}
