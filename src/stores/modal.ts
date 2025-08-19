export type ModalBaseProps = {
  onSuccess: (value: any) => void;
  onClose: () => void;
};

export type ModalProps<T = {}> = T & ModalBaseProps;

export type ModalType<T = {}> = {
  /** 유니크한 값, id */
  key: string;
  Component: React.FC<ModalProps<T>>;
  props: ModalProps<T>;
};
