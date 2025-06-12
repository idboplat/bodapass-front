"use client";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/Components";
import { Button, RemoveScroll } from "@mantine/core";
import { AnimatePresence } from "motion/react";
import MantineProvider from "@/components/config/MantineProvider";

/*
 * global-error.tsx
 * global-error.tsx에서는 모든 컴포넌트가 client에서 동작합니다.
 * client에서 동작하기 때문에 서버컴포넌트, js/ts/css/scss 파일을 import 하더라도 동작하지 않을 수 있습니다.
 * RootLayout 랜더링중 에러가 발생하면 발생시점에 따라서 RootLayout에 import된 css/scss가 적용되지 않을 수 있습니다.
 * next-view-transitions Link를 import 해서 랜더링시 에러가 발생하여 화면이 깨집니다.
 *
 *
 * style 적용 방법
 *
 * 1. scss 사용시 스타일을 작성하여 Document.tsx 에 미리 import
 * 2. style 태그 사용
 */

type Props = {
  error: Error & { digest?: string };
};

export default function GlobalError(props: Props) {
  return (
    <html lang="ko">
      <head>
        <style>
          {`
            html, 
            body, 
            #app {
             width: 100%;
             height: 100%;
            }

            #app {
              background-color: rgba(0, 0, 0, 0.5);
            }
          `}
        </style>
      </head>
      <body>
        <MantineProvider>
          <App {...props} />
        </MantineProvider>
      </body>
    </html>
  );
}

function App({ error }: { error: Error & { digest?: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Sentry.captureException(error);
    setIsOpen(() => true);
  }, [error]);

  return (
    <div id="app">
      <AnimatePresence>{isOpen && <ErrorModal message={error.message} />}</AnimatePresence>
    </div>
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
