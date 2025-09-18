import { Button, TextInput, Paper, Title, Stack, Group } from "@mantine/core";
import css from "./index.module.scss";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useState } from "react";
import ky from "ky";

export default function Page() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const sendPush = async () => {
    try {
      setIsLoading(() => true);
      const json = await ky
        .post<{ success: boolean; data: Record<string, string>[] }>(
          "/middleware/apiEas/send-notifications",
          {
            json: {
              notifications: [
                {
                  to: token,
                  title: title,
                  body: body,
                },
              ],
            },
          },
        )
        .json();

      console.log("json", json);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.content}>
        <Paper className={css.card} shadow="sm" p="xl" radius="md">
          <Title order={1} className={css.title}>
            Push 알림 테스트
          </Title>

          <Stack className={css.form}>
            <TextInput
              label="토큰"
              placeholder="디바이스 토큰을 입력하세요."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              size="md"
            />
            <TextInput
              label="제목"
              placeholder="푸시 알림 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="md"
            />
            <TextInput
              label="내용"
              placeholder="푸시 알림 내용"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              size="md"
            />
          </Stack>

          <Group justify="center" className={css.buttonGroup}>
            <Button
              onClick={() => sendPush()}
              size="lg"
              className={css.sendButton}
              loading={isLoading}
            >
              전송
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
