import { CustomServerError } from "./server-error";
import { TmsError } from "./tms-error";

export const isCustomServerError = (error: unknown): error is CustomServerError => {
  if (typeof error === "object" && error !== null) {
    return (error as CustomServerError).isCustomError === true;
  }

  return false;
};

export const serverErrorHandler = (error: unknown) => {
  let name = "UnknownError";
  let message = "알수없는 에러가 발생했습니다.";
  let status = 499;

  if (isCustomServerError(error)) {
    name = error.name;
    message = error.message;
    status = error.status;
  }

  if (TmsError.isCheckTmsError(error)) {
    name = "TmsError";
    message = error.message;
    status = 500;
  }

  return { name, message, status };
};
