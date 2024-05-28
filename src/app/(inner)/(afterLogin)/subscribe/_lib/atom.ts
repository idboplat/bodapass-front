import dayjs from "@/model/dayjs";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const subscribeDetailsAtom = atom({
  userId: "",
  baseDt: dayjs().format("YYYYMMDD"),
  cntuIqryKey: "",
  history: [] as string[],
  nonce: 0,
});

subscribeDetailsAtom.onMount = (set) => {
  return () => {
    set(() => ({
      userId: "",
      baseDt: dayjs().format("YYYYMMDD"),
      cntuIqryKey: "",
      history: [],
      nonce: 0,
    }));
  };
};

export const nextSubscribeDetailsAtom = atom(null, (_get, set, key: string) => {
  set(subscribeDetailsAtom, (pre) => {
    const next = { ...pre };
    if (next.cntuIqryKey) {
      //기존 키를 히스토리에 저장
      next.history.push(next.cntuIqryKey);
    }
    //새로운 키로 변경
    next.cntuIqryKey = key;
    return next;
  });
});

export const prevSubscribeDetailsAtom = atom(null, (_get, set) => {
  set(subscribeDetailsAtom, (pre) => {
    const next = { ...pre };
    //히스토리에서 키를 꺼내옴
    const cntuIqryKey = next.history.pop();
    if (cntuIqryKey) {
      //현재 키를 변경
      next.cntuIqryKey = cntuIqryKey;
    }
    return next;
  });
});

export const subscribeChartTypeAtom = atomWithReset({
  rowIndex: null as null | number,
  userId: "",
  subscrSn: "",
  nonce: 0,
});

subscribeChartTypeAtom.onMount = (set) => {
  return () => {
    set(() => ({
      rowIndex: null,
      userId: "",
      subscrSn: "",
      nonce: 0,
    }));
  };
};

if (process.env.NODE_ENV === "development") {
  subscribeDetailsAtom.debugLabel = "subscribeDetailsAtom";
  nextSubscribeDetailsAtom.debugLabel = "nextSubscribeDetailsAtom";
  prevSubscribeDetailsAtom.debugLabel = "prevSubscribeDetailsAtom";
  subscribeChartTypeAtom.debugLabel = "subscribeChartTypeAtom";
}
