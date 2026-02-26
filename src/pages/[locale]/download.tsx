import Image from "next/image";
import css from "./download.module.scss";

export default function Download() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <Image src="/assets/images/logo.png" alt="Logo" width={200} height={200} />
        <p className={css.firstText}>쉽고 간편한 건설노동자 관리! </p>
        <p>
          <strong>보다패스</strong> 어플로 시작하세요.
        </p>
      </div>
      <div className={css.content}>
        <a
          href="https://play.google.com/apps/internaltest/4700762729987241818"
          className={css.DownloadAppBtn}
          target="_blank"
        >
          <Image
            src="/assets/svg/google-play-store-button.svg"
            alt="Google Play"
            width={250}
            height={100}
          />
        </a>
      </div>
    </div>
  );
}
