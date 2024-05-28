import styled from "@emotion/styled";

export const ModalButton = styled.button`
  background-color: ${({ theme }) => theme.color.blueDefault};
  width: 100%;
  padding: 7px 0;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  transition: background-color 0.2s ease, color 0.2s ease;
  color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.color.blueHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.blueDisabled};
  }
`;

export const DefaultButton = styled.button<{ width?: number }>`
  background-color: ${({ theme }) => theme.color.blueDefault};
  width: ${({ width }) => (width ? width + "px" : "100%")};
  padding: 3px;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  transition: background-color 0.2s ease, color 0.2s ease;
  color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.color.blueHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.blueDisabled};
  }
`;
