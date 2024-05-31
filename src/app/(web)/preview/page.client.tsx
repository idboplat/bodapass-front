"use client";
import AlertModal from "@/app/_component/modal/AlertModal";
import ConfirmModal from "@/app/_component/modal/ConfirmModal";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useSetModalStore } from "@/app/_lib/modalStore";

export default function Home() {
  const modalStore = useSetModalStore();

  const openAlertModal = async () => {
    const result = await modalStore.push(AlertModal, {
      props: {
        content: "알림 내용",
      },
    });
    console.log("alert result", result);
  };

  const openErrorModal = async () => {
    const result = await modalStore.push(ErrorModal, {
      props: {
        error: new Error("에러 내용"),
      },
    });
    console.log("error result", result);
  };

  const openConfirmModal = async () => {
    const result = await modalStore.push(ConfirmModal, {
      props: {
        content: "취소 또는 확인",
      },
    });
    console.log("confirm result", result);
  };

  return (
    <div>
      <br />
      <div>
        <div>Mixin: style 함수</div>
      </div>
      <br />
      <div>
        <div>Alert Modal</div>
        <button onClick={openAlertModal}>열기</button>
        <pre>닫기버튼을 누르면 내부의 onClose 함수가 실행되고 undefind가 return</pre>
      </div>
      <br />
      <div>
        <div>Error Modal</div>
        <button onClick={openErrorModal}>열기</button>
        <pre>error 객체를 모달 props로 넘겨준다.</pre>
      </div>
      <br />
      <div>
        <div>Confirm Modal</div>
        <button onClick={openConfirmModal}>열기</button>
        <pre>
          확인을 누를때에는 onSuccess 함수가 실행되고 임의의 값을 return 하여 전달 가능, 취소를
          누를때에는 onClose 함수가 실행되고 undefind가 return
        </pre>
      </div>
      <br />
      <div>
        <div>모달정리</div>
        <br />
        <div>구현방법</div>
        <div>
          모달정리 모달컴포넌트 리스트는 class의 인스턴스 메모리에 저장되고 contextApi를 통해
          상태관리, useState를 사용하지 않기 때문에 숫자를 랜더링 상태값으로 사용하여 화면을 직접
          랜더링한다. promise를 사용하여 모달을 호출하여 async await를 사용하지만 open함수내에서
          에러는 발생하지 않으므로 try catch를 사용하지 않아도 된다.
        </div>
        <br />
        <div>사용법</div>
        <div>
          modalStore에 push시 option으로 props를 전달할 수 있고, 전달된 props는 modalContainer에서
          랜더링시 따로 onSucess, onClose함수와 함께 전달된다. id를 부여시 같은 id의 모달을 함께
          열리지 않는다. (모달내부 id랑은 별개로 취급)
        </div>
        <br />
        <div>부가기능</div>
        <div>부가기능 외부클릭시 닫기, esc키 닫기, backdrop visible 여부</div>
      </div>
    </div>
  );
}
