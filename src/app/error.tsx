"use client";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button, RemoveScroll } from "@mantine/core";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/Components";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import { AnimatePresence } from "motion/react";
import Portal from "@/components/common/modal/Portal";

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Sentry.captureException(error);
    setIsOpen(() => true);
  }, [error]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal id={PORTAL_MODAL_CONTAINER_ID}>
          <ErrorModal message={error.message} />
        </Portal>
      )}
    </AnimatePresence>
  );
}

function ErrorModal({ message }: { message: string }) {
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
            <p>{message}</p>
            <br />
            <p>반복적으로 발생시 관리자에게 문의해주세요.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button component="a" href="/" variant="default" type="button">
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
