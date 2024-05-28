import { Circle, Inner, Wrap } from "./DotsLoading.style";

export default function DotsLoading({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <Inner>
        <Circle />
        <Circle />
        <Circle />
      </Inner>
    </Wrap>
  );
}
