export default class TmsError extends Error {
  static readonly isTmsError = true;
  readonly requestSvcId: string;
  /**
   * 응답받은 서비스 아이디
   * 서버에서 null로 내려올 수 있음
   */
  readonly responseSvcId: string | null;
  readonly errCode: string | null;
  /** 에러 핸들링 여부 */
  readonly ignore: boolean;

  protected static subscribe = (tmsError: TmsError) => {
    if (typeof window === "undefined") {
      // console.log("TmsError::observer", tmsError);
    }
  };

  public static onSubscribe(observer: typeof TmsError.subscribe) {
    TmsError.subscribe = observer;
  }

  constructor({
    requestSvcId,
    responseSvcId = null,
    message,
    ignore,
  }: {
    requestSvcId: string;
    responseSvcId?: string | null;
    message: string;
    ignore?: boolean;
  }) {
    super(message);
    this.requestSvcId = requestSvcId;
    this.responseSvcId = responseSvcId;
    this.errCode = this.extractErrorCode(message);
    this.ignore = ignore === true;

    this.printConsole();

    TmsError.subscribe(this);
  }

  /** 서버 디버깅용 */
  private printConsole() {
    if (typeof window === "undefined") {
      console.log("=============  TMS Instance Error  =============");
      console.error(
        ` Errored) svcId >> ${this.requestSvcId} => ${this.responseSvcId} \n Message) ${this.message} \n`,
      );
    }
  }

  /** 서버 err Code 내용중 code number 추출하는 로직 */
  protected extractErrorCode(message: string) {
    const regex = /\[(.*?)\]/; // 정규식을 사용하여 [숫자] 패턴 매칭
    const match = regex.exec(message);

    if (match && match.length > 1) {
      return match[1]; // [20002]에서 숫자 부분만 반환
    }

    // 일치하는 패턴이 없을 경우 null 반환
    return null;
  }

  public get isMatchSvcId() {
    return this.requestSvcId === this.responseSvcId;
  }
}
