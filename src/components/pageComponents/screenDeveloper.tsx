"use client"
import * as styled from "./styled/contentboxStyled"
import { HomeProps } from "@/types/common"


interface ScreenDeveloperProps {}

/** 개발자 */
export default function ScreenDeveloper(
  { page, session }: HomeProps<ScreenDeveloperProps>
) {

  return (
    <styled.Section>
      <styled.TitleBox>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
      </styled.TitleBox>

      <styled.Content_box>

      </styled.Content_box>
    </styled.Section>
  );
}