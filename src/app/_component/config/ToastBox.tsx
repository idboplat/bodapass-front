import { Toaster } from "sonner";
import module from "./ToastBox.module.scss";

export default function ToastBox() {
  return (
    <Toaster
      toastOptions={{ className: module.toast }}
      closeButton
      visibleToasts={3}
      position="bottom-right"
      theme="light"
      duration={1200}
      gap={7}
      icons={{
        success: "✅",
        info: "ℹ️",
        warning: "⚠️",
        error: "❌",
        loading: "⏳",
      }}
    />
  );
}
