"use client"
import {logger} from '@/apis/logger';
import {ModalCloseButton, ModalHeader, ModalInner} from '@/components/common/modal/Components';
import Portal from '@/components/common/modal/Portal';
import { RemoveScroll, TextInput } from '@mantine/core';
import { useState } from 'react';
import DaumPostcodeEmbed, { Address, DaumPostcodeEmbedProps } from 'react-daum-postcode';

export default function Page() {
  const [showPostCode, setShowPostCode] = useState(false);

  const openPostCode = () => setShowPostCode(() => true);

  const onClose = () => setShowPostCode(() => false);

  const onComplete = (data: Address) => {
    console.log("address", data);
    onClose()
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div>
        <TextInput placeholder='우편번호 검색' onFocus={openPostCode} />
      </div>
      {showPostCode && (
          <Portal>
            <PostCodeModal onClose={onClose} onComplete={onComplete} />
          </Portal>
        )}
    </div>
  )
}


interface PostCodeModalProps extends DaumPostcodeEmbedProps {
  onClose: () => void;
}

function PostCodeModal({onClose, ...props}: PostCodeModalProps) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner outSideClick={onClose} fullSize>
        <ModalCloseButton onClose={onClose} />
        <ModalHeader />
        <DaumPostcodeEmbed {...props} />
      </ModalInner>
    </RemoveScroll>
  )
}