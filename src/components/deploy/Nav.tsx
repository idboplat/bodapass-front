"use client";
import { Button } from "@mantine/core";
import CustomRangePickerInput from "../common/datepicker/CustomDatePicker";
import { useState } from "react";
import { TDeployDto } from "@/types/dto";
import dayjs from "@/libraries/dayjs";
import { TRangePickerValue } from "@/types/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import css from "./Home.module.scss";
import { useSetModalStore } from "@/stores/modal";
import PostModal from "./PostModal";
import { Session } from "next-auth";

interface Props {
  session: Session;
  dto: TDeployDto;
}

export default function Nav({ dto, session }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const modalStore = useSetModalStore();
  const [range, setRange] = useState<TRangePickerValue>([
    dayjs(dto.startDd || undefined).toDate(),
    dayjs(dto.endDd || undefined).toDate(),
  ]);

  const onChangeRange = (range: TRangePickerValue) => {
    setRange(() => range);
  };

  const onSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("startDd", dayjs(range[0]).format("YYYYMMDD"));
    params.set("endDd", dayjs(range[1]).format("YYYYMMDD"));
    params.set("enabled", dayjs().unix().toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const openAddModal = async () => {
    const result: true | undefined = await modalStore.push(PostModal, {
      props: { session },
    });
  };

  return (
    <div className={css.nav}>
      <div className={css.navInnerTop}>
        <div className={css.inputWrapper}>
          <label>기간</label>
          <CustomRangePickerInput
            value={range}
            onChange={onChangeRange}
            classNames={{ root: css.datePicker }}
          />
        </div>
      </div>
      <div className={css.navInnerBottom}>
        <Button variant="filled" onClick={onSearch} w={110} h={29}>
          검색
        </Button>
        <Button ml={24} variant="outline" w={110} h={29} onClick={openAddModal}>
          추가
        </Button>
      </div>
    </div>
  );
}
