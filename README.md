키 발급 문서

https://docs.google.com/document/d/1WnlhoEiEPwL2qwO-Mbh5f32Q5H6wNAV8tvCqMKGv7Ys/edit?tab=t.0

API Routes

### aws collections

0. POST /api/aws - 1 대 1 이미지 비교
   header application/json
   비고 해당 API는 데모에서 사용하고 있진 않습니다.

1. POST /api/aws/collections/[collectionId] - 콜렉션 생성
   header application/json
   비고 임의의 collectionId 생성, face 등록전 collection 생성 필요

2. GET /api/aws/collections - collections 다건 조회
   header application/json

3. GET /api/aws/collections/[collectionId] - 단건 조회
   header application/json

4. DELETE /api/aws/collections/[collectionId] - 콜렉션 삭제
   header application/json

---

### aws faces

1. POST /api/aws/collections/${info.collectionId}/faces/[userId] - face 등록
   header multipart/form-data
   input image-capture.png
   비고 userId를 faceId로 함, 비슷한 얼굴이 중복으로 등록되지 않도록 검증필요.

2. GET /api/aws/collections/${info.collectionId}/faces/[userId] - face 단건 조회
   header application/json
   비고 해당 API는 데모에서 사용하고 있진 않습니다.

3. DELETE /api/aws/collections/[collectionId]/faces - face 다건 삭제
   header application/json
   input { faceIds: string[]}

4. POST /api/aws/collections/[collectionId]/faces/search_by_image - faces 다건 이미지 검색
   header multipart/form-data
   input image-capture.png
   비고 임계치에 해당하는 이미지 배열이 여러개 들어온다.

---

### aws liveness

1. POST /api/aws/liveness/create_session - 라이브니스 세션 생성
   header application/json

2. GET /api/aws/liveness/get_result?sessionId=[sessionId] - 라이브니스 결과 조회
   header application/json
   비고 라이브니스 세션에서 발급된 sessionId로 결과 조회

---

### naver clova

1. POST /api/clova
   header multipart/formdata
   input image-capture.png, type-string, requestId-string, name-string
   성공응답으로 촬영된 이미지가 Blob로 내려옴

---

### NHN

1. GET /api/nhn
   그룹목록 조회

2. POST /api/nhn/anti-spoofing
   안티스푸핑 체크

3. GET /api/nhn/[groudId]
   그룹단건 조회, 얼굴등록 갯수 반환

4. POST /api/nhn/[groupId]
   그룹생성

5. DELETE /api/nhn/[groupId]
   그룹삭제

6. GET /api/nhn/[groupId]/faces
   특정 그룹내 모든 얼굴목록 조회

7. POST /api/nhn/[groupId]/faces
   얼굴등록 + 안티스푸핑

8. POST /api/nhn/[groupId]/faces/search_by_images
   이미지로 검색 + 안티스푸핑

9. GET /api/nhn/[groupId]/faces/[faceId]
   이미지 벡터 조회

10. DELETE /api/nhn/[groupId]/faces/[faceId]
    얼굴삭제

11. POST /api/nhn/[groupId]/faces/[faceId]/validation
    얼굴검증, 얼굴 id와 이미지 사이 유사도 측정 + 안티스푸핑

---

### useB.

1. POST /api/useb/oauth
   로그인, 토큰 발급

2. POST /api/useb/ocr/[type]
   신분증 OCR

3. POST /api/useb/liveness
   라이브니스 체크

4. POST /api/useb/face
   이미지 1대1 매칭
