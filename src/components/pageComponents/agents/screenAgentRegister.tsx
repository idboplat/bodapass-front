"use client"
import styled, { css } from "styled-components"
import * as styles from "../styled/contentboxStyled"
import { HomeProps } from "@/types/common"
import { Input_box } from "../styled/inputboxStyled"
import { Write_box } from "../styled/writeboxStyled"
import { Calendar_box } from "../styled/calendarboxStyled"
import { Select_box } from "../styled/selectboxStyled"
import { Button_box } from "../styled/buttonboxStyled"
import { Line_box } from "../styled/lineboxStyled"

import { useState } from "react"
import { Message_box } from "../styled/messageboxStyled"


const Flex_vt = styled.li`
  align-items:flex-start !important;
`;

const Textarea_box = styled.div`
  textarea {
    background:#fff; 
    display:block; 
    border-radius:15px; 
    width:100%; 
    height:230px; 
    padding:20px; 
    font-size:16px; 
    color:#494949; 
    line-height:1.4;
  }
`;

interface ScreenAgentRegisterProps {}

/** 에이전트 관리 - 생성 */
export default function ScreenAgentRegister(
  { page, session }: HomeProps<ScreenAgentRegisterProps>
) {

  const [openAgent, setOpenAgent] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState("---");
  const [selectedAgent, setSelectedAgent] = useState(0);


  return (
    <styles.Section>
      <styles.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styles.TitleBox>

      <styles.Content_box>
        <Write_box>
          <ul>
            <li>
              <strong>소속 에이전트</strong>
              <div>
                <Select_box openType={openAgent} >
                  <button type="button" onClick={() => setOpenAgent(!openAgent)}><p id="select-button">{selectedAgentName}</p></button>
                  <div>
                    <dl>
                      <dd className={(selectedAgent === 0)? "active" : ""}><a onClick={() => {setSelectedAgent(0); setSelectedAgentName("에이전트 1");}}><p>에이전트 1</p></a></dd>
                      <dd className={(selectedAgent === 1)? "active" : ""}><a onClick={() => {setSelectedAgent(1); setSelectedAgentName("에이전트 2");}}><p>에이전트 2</p></a></dd>
                    </dl>
                  </div>
                </Select_box>
              </div>
            </li>
            <li>
              <strong>등급</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                </Input_box>
              </div>
					  </li>
            <li>
              <strong>아이디</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                </Input_box>
              </div>
					  </li>
            <li>
              <strong>타입</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                </Input_box>
              </div>
					  </li>
            <li>
              <strong>닉네임</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                </Input_box>
              </div>
					  </li>
            <li>
              <strong>수수료</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                </Input_box>
              </div>
					  </li>
            <Flex_vt>
              <strong>비밀번호</strong>
              <div>
                <Input_box>
                  <input type="password" style={{textAlign: "center"}}></input>
                </Input_box>
                <Message_box>
                  <p>{"숫자+영문+특수문자로 입력해주시기 바랍니다. 아이디를 포함할 수 없으며, 최소 8글자 이상으로 입력해야 합니다."}</p>
                </Message_box>
              </div>
            </Flex_vt>
            <li>
              <strong>아이피</strong>
              <div>
                <Input_box>
                  <input type="text" placeholder="---" style={{textAlign: "center"}}></input>
                  <a >재발급</a>
                </Input_box>
              </div>
					  </li>
            <li className="grid-1" style={{alignItems: "flex-start"}}>
						<strong>메모</strong>
						<div>
              <Textarea_box>
                <textarea></textarea>
              </Textarea_box>
						</div>
					</li>


          </ul>
        </Write_box>

        <Button_box mt="45">
          <div style={{width: "100px", marginRight: "10px"}}>
            <a className="btn-bd-active">취소</a>
          </div>
          <div style={{width: "100px"}}>
            <a className="btn-active">생성</a>
          </div>
        </Button_box>

      </styles.Content_box>
    </styles.Section>
  );
}