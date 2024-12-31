"use client";
import { Button, TextInput } from "@mantine/core";
import css from "./Home.module.scss";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TUserHistoryDto } from "@/types/dto";

interface NavProps {
  dto: TUserHistoryDto;
}

export default function Nav({ dto }: NavProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");
  const pathname = usePathname();

  const onChangeAdminId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(() => e.target.value);
  };

  const onChangeAdminName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminName(() => e.target.value);
  };

  const onSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("adminId", adminId);
    params.set("adminName", adminName);
    params.set("enabled", "true");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.writeBox}>
      <ul>
        <li>
          <strong>관리자 ID</strong>
          <div>
            <TextInput value={adminId} onChange={onChangeAdminId} w={200} />
          </div>
        </li>
        <li>
          <strong>관리자 명</strong>
          <div>
            <TextInput value={adminId} onChange={onChangeAdminName} w={200} />
          </div>
        </li>
        <li>
          <Button variant="filled" w={110} h={29} onClick={onSearch}>
            검색
          </Button>
        </li>
      </ul>
    </div>
  );
}
