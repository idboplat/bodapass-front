import { flexCenter } from "@/style/mixin";
import styled from "@emotion/styled";

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: ${({ theme }) => theme.zIndex.modal};
  ${flexCenter}
`;

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const ModalCenterContent = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 500px;
  padding: 14px;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  margin-bottom: 7px;
`;

export const Title = styled.h3`
  font-size: 16px;
`;

export const Inner = styled.div``;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > button {
    width: 100px;
  }
`;
