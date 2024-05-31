import { create } from "zustand";
import { v1 as uuid } from "uuid";

export type ModalBaseProps = {
  onSuccess: (value: any) => void;
  onClose: () => void;
};

export type ModalProps<T = {}> = T & ModalBaseProps;

export type ModalInfo<T = {}> = {
  /** 유니크한 값, id */
  key: string;
  Component: React.FC<ModalProps<T>>;
  props: ModalProps<T>;
};

const initState = {
  modalInfos: [] as ModalInfo<any>[],
  actions: {
    _checkKey: (key: string) => true,
  },
};

const modalStore = create(() => ({
  ...initState,
}));
