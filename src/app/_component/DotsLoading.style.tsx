import { flexCenter } from "@/style/mixin";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const loadingAni = keyframes({
  "0%": {
    opacity: 0.95,
    transform: "scale(0.95)",
    backgroundColor: "#1075c2",
  },
  "25%": {
    backgroundColor: "#abddf1",
  },
  "50%": {
    opacity: 1,
    transform: "scale(1.02)",
    backgroundColor: "#1075c2",
  },
  "75%": {
    backgroundColor: "#abddf1",
  },
  "100%": {
    opacity: 0.95,
    transform: "scale(0.95)",
    backgroundColor: "#1075c2",
  },
});

export const Wrap = styled.div`
  width: 100%;
  height: 20px;
  ${flexCenter}
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Circle = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: ${loadingAni} 1.6s linear infinite;
  &:nth-of-type(1) {
    animation-delay: 0s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;
