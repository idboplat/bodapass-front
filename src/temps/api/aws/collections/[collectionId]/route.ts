import { NextRequest, NextResponse } from "next/server";
import { rekognition } from "@/libraries/aws/rekognition";
import { serverErrorHandler } from "@/libraries/error";
import { ResourceAlreadyExistsException } from "@aws-sdk/client-rekognition";

export async function GET(req: NextRequest, props: { params: Promise<{ collectionId: string }> }) {
  try {
    //TODO: paginationToken 사용
    const collecitonId = (await props.params).collectionId;
    const maxResults = 100; // 한 번에 가져올 최대 얼굴 수, 최대 1000개?
    // const paginationToken = req.query.paginationToken as string | undefined;

    const response = await rekognition.listFaces({
      CollectionId: collecitonId,
      MaxResults: maxResults,
      // NextToken: undefined,
    });

    return NextResponse.json({ message: "콜렉션 조회", data: response });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(
  _req: NextRequest,
  props: { params: Promise<{ collectionId: string }> },
) {
  try {
    const collecitonId = (await props.params).collectionId;
    const response = await rekognition.createCollection({ CollectionId: collecitonId });
    console.log(`컬렉션 ARN: ${response.CollectionArn}`);
    console.log(`상태 코드: ${response.StatusCode}`);
    return NextResponse.json({ message: "컬렉션 생성 완료", data: response }, { status: 201 });
  } catch (error) {
    if (error instanceof ResourceAlreadyExistsException) {
      // if (error.code === "ResourceAlreadyExistsException") {
      return NextResponse.json({ message: "이미 존재하는 컬렉션" }, { status: 409 });
    }

    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

// 업데이트는 삭제후에 새로 만드는 방법으로 구현

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ collectionId: string }> },
) {
  try {
    const collecitonId = (await props.params).collectionId;
    const resonse = await rekognition.deleteCollection({ CollectionId: collecitonId });

    return NextResponse.json({ message: "컬렉션 삭제 완료", data: resonse });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
