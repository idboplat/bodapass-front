import { signInDto } from "@/libraries/auth/auth.dto";
import { signService } from "@/libraries/auth/auth.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dto = signInDto.safeParse(body);

    if (!dto.success) {
      throw new BadRequestError(dto.error.message);
    }

    const signinData = await signService(dto.data.externalId, dto.data.password, "1");

    const session: JWT = {
      ...signinData,
      loginAt: new Date().toISOString(),
      iss: new Date().toISOString(),
    };

    return NextResponse.json({ session });
  } catch (error) {
    const { status, message } = serverErrorHandler(error);
    console.error("server error", status, message);
    return NextResponse.json({ message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
