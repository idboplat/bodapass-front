import { atom } from "jotai";

export const userListAtom = atom({
  rowIndex: null as null | number,
  id: "",
  name: "",
  email: "",
  tel: "",
  level: "",
  startDate: "",
  endDate: "",
  cntuIqryKey: "",
  history: [] as string[],
  nonce: 0,
});

userListAtom.onMount = (set) => {
  return () => {
    set(() => ({
      rowIndex: null,
      id: "",
      name: "",
      email: "",
      tel: "",
      level: "",
      startDate: "",
      endDate: "",
      cntuIqryKey: "",
      history: [],
      nonce: 0,
    }));
  };
};

export const userListKeyAtom = atom((get) => {
  const userlist = get(userListAtom);
  const { rowIndex, ...rest } = userlist;
  return rest;
});

export const nextUserListAtom = atom(null, (_get, set, key: string) => {
  set(userListAtom, (pre) => {
    const next = { ...pre };

    //기존 키를 히스토리에 저장
    next.history.push(next.cntuIqryKey);

    //새로운 키로 변경
    next.cntuIqryKey = key;
    next.rowIndex = null;
    return next;
  });
});

export const prevUserListAtom = atom(null, (_get, set) => {
  set(userListAtom, (pre) => {
    const back = { ...pre };
    //히스토리에서 키를 꺼내옴
    const cntuIqryKey = back.history.pop() || "";

    //현재 키를 변경
    back.cntuIqryKey = cntuIqryKey;
    back.rowIndex = null;
    return back;
  });
});

if (process.env.NODE_ENV === "development") {
  userListAtom.debugLabel = "userListAtom";
  userListKeyAtom.debugLabel = "userListKeyAtom";
  nextUserListAtom.debugLabel = "nextUserListAtom";
  prevUserListAtom.debugLabel = "prevUserListAtom";
}
