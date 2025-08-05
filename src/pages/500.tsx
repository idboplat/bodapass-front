import { useEffect, useState } from "react";
import { Button, RemoveScroll } from "@mantine/core";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import Portal from "@/components/common/modal/portal";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import { AnimatePresence } from "motion/react";

// getServerSideProps 실행중 에러발생시 랜더링
// https://nextjs.org/docs/pages/building-your-application/routing/custom-error
export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sentry.captureException(error);
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
            <ModalTitle>{"common.0009"}</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>{message}</p>
            <br />
            <p>{"error.0000"}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button component="a" href="/" variant="default" type="button">
            {"common.0111"}
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
