import { NextRequest, NextResponse } from "next/server";

// 안티스푸핑 체크
export async function POST(req: NextRequest) {
  return NextResponse.json({});
}
