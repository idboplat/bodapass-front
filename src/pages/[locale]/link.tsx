import { Button } from "@mantine/core";

export default function Private() {
  const onClick = () => {
    const appUrl = "com.idboplat.bodapass.production://";
    window.location.href = appUrl;
  };

  return (
    <div>
      <Button onClick={onClick}>앱으로 이동</Button>
    </div>
  );
}
