import { NextRequest, NextResponse } from "next/server";

// 그룹 단건조회, 얼굴등록 갯수반환
export async function GET(req: NextRequest) {
  return NextResponse.json({});
}

// 그룹 생성
export async function POST(req: NextRequest) {
  return NextResponse.json({});
}

// 그룹 삭제
// 그룹내 얼굴도 모두 삭제됨
export async function DELETE(req: NextRequest) {
  return NextResponse.json({});
}
