import { ModalCloseButton, ModalHeader, ModalInner } from "@/components/common/modal/components";
import Portal from "@/components/common/modal/portal";
import { RemoveScroll, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import DaumPostcodeEmbed, { Address, DaumPostcodeEmbedProps } from "react-daum-postcode";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import PostCodeModal from "@/components/common/modal/post-code-modal";

export default function Page() {
  const [showPostCode, setShowPostCode] = useState(false);
  const postCodeInputRef = useRef<HTMLInputElement>(null);

  const openPostCode = () => {
    postCodeInputRef.current?.blur();
    setShowPostCode(() => true);
  };

  const onClose = () => setShowPostCode(() => false);

  const onComplete = (data: Address) => {
    console.log("address", data);
    onClose();
  };

  return (
    <div className={"mobileLayout"}>
      <div style={{ padding: "1rem" }}>
        <div>
          <TextInput ref={postCodeInputRef} placeholder="우편번호 검색" onFocus={openPostCode} />
        </div>
        {showPostCode && (
          <Portal>
            <PostCodeModal onClose={onClose} onComplete={onComplete} />
          </Portal>
        )}
      </div>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
