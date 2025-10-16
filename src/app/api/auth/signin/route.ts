import { signInDto } from "@/libraries/auth/auth.dto";
import { emailSignInService } from "@/libraries/auth/auth.service";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "@/libraries/dayjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dto = signInDto.safeParse(body);

    if (!dto.success) {
      throw new BadRequestError(dto.error.message);
    }

    const signinData = await emailSignInService(dto.data.externalId, dto.data.password);

    const iso = dayjs().toISOString();

    const session: JWT = {
      ...signinData,
      loginAt: iso,
      iss: iso,
    };

    return NextResponse.json({ session });
  } catch (error) {
    console.error("/api/auth/signin", error);
    const { status, message } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status: status });
  }
}

export const dynamic = "force-dynamic";
