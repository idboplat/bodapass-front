import { TRegistInfo } from "@/types/common";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import css from "./Liveness.module.scss";

type Props = {
  info: TRegistInfo;
  updateInfo: (state: TRegistInfo) => void;
};

export default function RegistForm({ info, updateInfo }: Props) {
  const [userName, setUserName] = useState(info.userName);
  // const [collectionId, setCollectionId] = useState(info.collectionId);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(() => e.target.value);
  };

  // const onChangeCollectionId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCollectionId(() => e.target.value);
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateInfo({ userName });
  };

  return (
    <form onSubmit={onSubmit} className={css.registForm}>
      {/* <TextInput label="콜렉션 ID" value={collectionId} onChange={onChangeCollectionId} /> */}
      <TextInput label="이름" value={userName} onChange={onChangeUserName} />

      <div className={css.buttonBox}>
        <Button variant="outline" type="submit">
          다음
        </Button>
      </div>
    </form>
  );
}
