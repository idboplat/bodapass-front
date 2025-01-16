import { bytesToBlob } from "@/utils/convert";
import { AwsCredentialProvider } from "@aws-amplify/ui-react-liveness";
import {
  CreateFaceLivenessSessionCommandOutput,
  GetFaceLivenessSessionResultsCommandOutput,
} from "@aws-sdk/client-rekognition";
import { Credentials } from "@aws-sdk/client-sts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLiveness = () => {
  const query = useQuery({
    queryKey: ["createLivenessSession"],
    queryFn: async () => {
      const res = await fetch("/api/aws/liveness/create_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json: {
        message: string;
        data: CreateFaceLivenessSessionCommandOutput;
        credentials: Credentials;
      } = await res.json();
      console.log("create liveness session", json.data);
      return {
        sessionId: json.data.SessionId!,
        credentials: json.credentials,
      };
    },
  });

  const mutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await fetch("/api/aws/liveness/get_result?" + `sessionId=${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json: {
        message: string;
        data: GetFaceLivenessSessionResultsCommandOutput;
      } = await res.json();

      const bytes = json.data.AuditImages?.[0].Bytes;

      if (!bytes) throw new Error("No audit image");

      const blob = bytesToBlob(bytes);
      return blob;
    },
  });

  const credentialProvider: AwsCredentialProvider = async () => {
    if (query.data === undefined) {
      throw new Error("No credentials");
    }

    return {
      accessKeyId: query.data.credentials.AccessKeyId!,
      secretAccessKey: query.data.credentials.SecretAccessKey!,
      sessionToken: query.data.credentials.SessionToken!,
    };
  };

  return {
    query,
    mutation,
    credentialProvider,
  };
};
