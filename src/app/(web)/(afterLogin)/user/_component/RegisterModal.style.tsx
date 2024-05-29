import { flexCenter } from "@/style/mixin";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const List = styled.ul``;

export const InputBox = styled.li`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-top: 7px;
`;

export const Input = styled.input`
  border: 1px solid #000;
  padding: 3px;
`;

export const ButtonBox = styled.div`
  margin-top: 24px;
  ${flexCenter}
`;

export const Select = styled.select`
  border: 1px solid #000;
  padding: 3px;
  width: 100px;
`;

export const TextArea = styled(TextareaAutosize)`
  border: 1px solid #000;
  padding: 3px;
`;
