import { signInDto } from "@/libraries/auth/auth.dto";
import { signService } from "@/libraries/auth/auth.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isSecure = req.nextUrl.protocol === "https:";
    const dto = signInDto.safeParse(req.body);

    if (!dto.success) {
      throw new BadRequestError(dto.error.message);
    }

    const signinData = await signService(dto.data.externalId, dto.data.password);

    const session: JWT = {
      ...signinData,
      loginAt: new Date().toISOString(),
      iss: new Date().toISOString(),
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error(error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
