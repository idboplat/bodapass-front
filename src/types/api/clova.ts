// 기본 좌표 구조
interface Vertex {
  x: number;
  y: number;
}

// 다각형 구조 (BoundingPoly 및 MaskingPoly)
interface Poly {
  vertices: Vertex[];
}

// 포맷된 값 구조 (name, personalNum, address, authority 등)
interface FormattedValue {
  value: string;
}

// issueDate의 포맷된 값 구조
interface IssueDateFormatted {
  year: string;
  month: string;
  day: string;
}

// 일반 텍스트 필드 구조 (제네릭을 사용하여 다양한 포맷 지원)
interface ICField<T = any> {
  text: string;
  formatted: T;
  keyText: string;
  confidenceScore: number;
  boundingPolys: Poly[];
  maskingPolys: Poly[];
}

// IC 관련 정보 구조
interface IC {
  name: ICField<FormattedValue>[];
  personalNum: ICField<FormattedValue>[];
  address: ICField<FormattedValue>[];
  issueDate: ICField<IssueDateFormatted>[];
  authority: ICField<FormattedValue>[];
}

// ROI(Region of Interest) 구조
interface ROI {
  vertices: Vertex[];
}

// ID Card의 결과 구조
export interface IDCardResult {
  isConfident: boolean;
  ic: IC;
  rois: ROI[];
  idtype: string;
}

// ID Card 정보 구조
export interface IDCard {
  meta: {
    estimatedLanguage: string;
  };
  result: IDCardResult;
}

// 검증 결과 구조
export interface ValidationResult {
  result: string;
}

// 이미지 정보 구조
export interface OCRImage {
  uid: string;
  name: string;
  inferResult: string;
  message: string;
  validationResult: ValidationResult;
  idCard: IDCard;
}

// 최상위 응답 데이터 구조
export interface OCRResponseData {
  version: string;
  requestId: string;
  timestamp: number;
  images: OCRImage[];
}
