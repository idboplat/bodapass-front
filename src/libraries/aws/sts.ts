import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { AMPLIFY_CLIENT_ROLE_ARN, RECOGNITION_REGION } from "./config";
import { InternalServerError } from "../error";

export const assumeStartFaceLivenessSessionRole = async (sessionId: string) => {
  const stsClient = new STSClient({
    region: RECOGNITION_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS,
      secretAccessKey: process.env.AWS_SECRET,
    },
  });

  const command = new AssumeRoleCommand({
    RoleArn: AMPLIFY_CLIENT_ROLE_ARN,
    RoleSessionName: sessionId, // 세션 이름 (고유해야 함)
    DurationSeconds: 900, // 임시 자격증명의 유효 기간 (초) - 최대 43200 (12시간), 최소 900 (15분)
  });

  const response = await stsClient.send(command);
  const credentials = response.Credentials;
  console.log("credential created!", response);

  if (!credentials) throw new InternalServerError("failed to assume role");
  return response.Credentials;
};
