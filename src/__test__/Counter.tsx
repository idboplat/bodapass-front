import { useCountStore, useCountAction } from "./counter.store";

export default function Counter() {
  const { count } = useCountStore();
  const { increaseCount, decreaseCount, doubleCount, halfCount } = useCountAction();
  return (
    <div style={{ width: "500px", padding: "10px", border: "1px solid green", margin: "0 auto" }}>
      <h2>Zustand Count Store</h2>
      <div data-testid="count">{count}</div>
      <button onClick={() => increaseCount()}>+</button>
      <button onClick={() => decreaseCount()}>-</button>
      <button onClick={() => doubleCount()}>x2</button>
      <button onClick={() => halfCount()}>/2</button>
    </div>
  );
}
