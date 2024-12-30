"use client";
import { Button, TextInput } from "@mantine/core";
import css from "./Home.module.scss";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TOrderStatusDto } from "@/types/dto";

interface NavProps {
  dto: TOrderStatusDto;
}

export default function Nav({ dto }: NavProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userId, setUserId] = useState(dto.userId);
  const pathname = usePathname();

  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(() => e.target.value);
  };

  const onSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("userId", userId);
    params.set("enabled", "true");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.writeBox}>
      <ul>
        <li>
          <strong>사용자 ID</strong>
          <div>
            <TextInput value={userId} onChange={onChangeUserId} w={200} />
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
