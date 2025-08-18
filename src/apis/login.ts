import { frontApi } from "./fetcher";
import { TSignInDto } from "@/libraries/auth/auth.dto";

const emailLoginFn = async (dto: TSignInDto) => {
  const json = await frontApi
    .post<{ session: Session }>("api/auth/signin", {
      json: dto,
    })
    .json();

  return json.session;
};

export default emailLoginFn;
