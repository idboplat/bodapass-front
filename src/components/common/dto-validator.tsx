import { DtoContext } from "@/hooks/use-dto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { z } from "zod";

interface DtoValidatorProps<T> {
  dto: z.ZodSchema<T>;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function DtoValidator<T>({ dto, children, fallback }: DtoValidatorProps<T>) {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      // DTO 검증
      const validationResult = dto.safeParse({ ...router.query });

      if (validationResult.success) {
        setInitialValues(() => validationResult.data);
      } else {
        console.warn("DTO 검증 실패:", validationResult.error);
        // 검증 실패 시 URL 파라미터 초기화
        router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
      }
      setIsLoading(false);
    }
  }, [router, dto]);

  if (isLoading || !initialValues) {
    return fallback || null;
  }

  return <DtoContext value={initialValues}>{children}</DtoContext>;
}
