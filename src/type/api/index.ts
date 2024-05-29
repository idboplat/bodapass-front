import type { RspnData } from "@/model/callTms";

export type Filler = "";
export type FillerRspnData = RspnData<{ F01: Filler }>;
export type StringRspnData = RspnData<{ F01: string }>;

export type B0001AData = RspnData<{
  F01: string;
  F02: string;
}>;

export type B9001QData = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
  F07: string;
  F08: string;
  F09: string;
  F10: string;
  F11: string;
  F12: string;
}>;

export type B9001AData = RspnData<{
  F01: string;
  F02: string;
  F03: string;
}>;

export type B9001BData = RspnData<{
  F01: string;
}>;

export type B9011QData = RspnData<{
  F01: string;
  F02: string;
  F03: string;
  F04: string;
  F05: string;
  F06: string;
}>;

export type B9011AData = RspnData<{
  F01: Filler;
}>;

export type B9011BData = RspnData<{
  F01: Filler;
}>;

export type B9012QData = RspnData<{
  F01: string;
  F02: string;
  F03: string;
}>;

export type B9012AData = RspnData<{
  F01: Filler;
}>;
