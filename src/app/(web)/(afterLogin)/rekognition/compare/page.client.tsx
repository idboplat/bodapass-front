import VideoCapture from '@/components/VideoCapture';

export default function Client() {
  return <VideoCapture onFaceDetected={() => console.log("face detected")} />
}