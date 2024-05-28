import useModalStore from "@/hook/useModalStore";
import { useAtom } from "jotai";
import { Session } from "next-auth";
import { userListAtom } from "../_lib/atom";
import { UserlistRowData } from "./Table";
import UpdateUserModal from "./UpdateUserModal";
import { TbEdit } from "react-icons/tb";

interface UpdateUserButtonProps {
  rowIndex: number | null;
  session: Session;
  rowData: UserlistRowData;
}

export default function UpdateUserButton({ session, rowIndex, rowData }: UpdateUserButtonProps) {
  const [userlist] = useAtom(userListAtom);
  const modalStore = useModalStore();

  const onClick = () => modalStore.push(UpdateUserModal, { props: { session, rowData } });

  if (rowIndex === null || rowIndex !== userlist.rowIndex) {
    // 선택되지 않으면 버튼을 안보이게
    return null;
  }

  return (
    <button onClick={onClick}>
      <TbEdit size={20} />
    </button>
  );
}
