import { flexCenter } from "@/style/mixin";
import styled from "@emotion/styled";

export const Wrap = styled.div`
  ${flexCenter}
  height: 150px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const List = styled.div`
  column-gap: 10px;
  flex-wrap: wrap;
  display: flex;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
`;

export const CellPlaceholder = styled.div`
  flex: 1;
  min-width: 120px;
  max-width: 120px;
`;

export const Cell = styled(CellPlaceholder)`
  margin-top: 7px;
`;

export const Label = styled.label``;

export const Input = styled.input`
  border: 1px solid #000;
  width: 100%;
  padding: 3px;
`;

export const ButtonBox = styled.div`
  width: 200px;
  gap: 14px;
  ${flexCenter}
`;
