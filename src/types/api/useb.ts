export type TOCRReturn = {
  success: boolean;
  message: string;
  error_code?: string;
  extra_message?: string;
  extra_code?: string;
  data: {
    idType: string;
    juminNo1: string;
    juMinNo2: string;
    _juMinNo2: string;
    issueDate: string;
    id_real?: boolean; // 사본 판별결과
    id_confidence?: string; // 정확도 0.5이상일시 실물
  };
  transaction_id: string;
};

export type TUsebFaceMatchReturn = {
  confidence: number;
  is_live: boolean;
  threshold_info: {
    fin_code: string;
    fin_name: string;
    auto_approve: {
      min: number;
      max: number;
    };
    auto_reject: {
      min: number;
      max: number;
    };
  };
  return_msg: {
    return_code: string;
    return_msg: string;
  };
};
