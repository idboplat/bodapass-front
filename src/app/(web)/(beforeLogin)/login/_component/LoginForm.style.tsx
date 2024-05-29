import DotsLoading from "@/app/_component/DotsLoading";
import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  width: 60px;
`;

export const InputWrap = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputBox = styled.div`
  border: none;
  display: flex;
  border-bottom: 1px solid #000;
`;

export const Input = styled.input`
  border: none;
  width: 100%;
  padding: 7px;
  &:focus {
    outline: none;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.blueDefault};
  padding: 7px 0;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  border-radius: 3px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.blueHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.blueDisabled};
  }
`;

export const Loading = styled(DotsLoading)`
  height: 24px;
`;
