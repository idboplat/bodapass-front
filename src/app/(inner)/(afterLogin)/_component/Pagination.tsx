import styled from "@emotion/styled";

const Wrap = styled.div`
  display: flex;
  gap: 14px;
`;

const Button = styled.button`
  &:disabled {
    color: #cccccc;
    cursor: default;
  }
`;

interface PaginationProps {
  next: () => void;
  prev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
  currnetPage: number;
}

export default function Pagination({
  next,
  prev,
  currnetPage,
  disableNext,
  disablePrev,
}: PaginationProps) {
  return (
    <Wrap>
      <Button onClick={prev} disabled={disablePrev}>
        이전
      </Button>
      <span>{currnetPage}</span>
      <Button onClick={next} disabled={disableNext}>
        다음
      </Button>
    </Wrap>
  );
}
