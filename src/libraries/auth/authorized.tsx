import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import Portal from "@/components/common/modal/portal";
import { Button, RemoveScroll } from "@mantine/core";
import { AnimatePresence } from "motion/react";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function Authorized({ children, fallback }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null) {
      router.replace("/signin");
    }
  }, [session, router]);

  if (session === undefined) return <>{fallback}</>;
  if (session === null) return null;
  return <>{children}</>;
}

export function AuthorizedWithModal({ children, fallback }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null) {
      setShowModal(() => true);
    }
  }, [session, router]);

  if (showModal) {
    return (
      <AnimatePresence>
        <Portal id={PORTAL_MODAL_CONTAINER_ID}>
          <RequireSignInModal />
        </Portal>
      </AnimatePresence>
    );
  }

  if (session === undefined) return <>{fallback}</>;
  if (session === null) return null;

  return <>{children}</>;
}

function RequireSignInModal() {
  const router = useRouter();

  const onClick = () => router.replace("/signin");

  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }}>
        <ModalHeader>
          <div>
            <ModalTitle>알림</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>로그인이 필요한 서비스입니다.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClick} variant="default" type="button">
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
