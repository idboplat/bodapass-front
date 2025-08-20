import Camera from "@/components/camera";
import { useCamera } from "@/hooks/use-camera";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";

export default function Page() {
  const camera = useCamera();
  return (
    <div>
      <Camera videoRef={camera.videoRef} canvasRef={camera.canvasRef} isMobile={true} />
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
