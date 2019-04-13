import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect
} from "react";

const WRAPPER_STYLES = {
  border: "1px dashed grey",
  padding: "1rem",
  width: 250,
  height: 250
};

const useCameraStream = () => {
  const [stream, setStream] = useState();
  const hasGetUserMedia = !!(
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia
  );
  const constraints = useMemo(
    () => ({
      video: { width: { exact: 640 }, height: { exact: 480 } }
    }),
    []
  );

  if (hasGetUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        setStream(stream);
      },
      err => {
        if (err && err.name === "NotAllowedError") {
          // alert("Give camera access");
        } else {
          // alert("No camera found");
        }
      }
    );
  } else {
    alert("getUserMedia() is not supported by your browser");
  }

  return stream;
};

const useCaptureImageFromVideo = video => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  return canvas.toDataURL("image/webp");
};

const CameraView = React.memo(({ onClickHandler }) => {
  const videoRef = useRef();
  const cameraStream = useCameraStream();
  const onClick = useCallback(() => {
    const image = useCaptureImageFromVideo(videoRef.current);
    onClickHandler(image);
  }, []);

  useEffect(() => {
    videoRef.current.srcObject = cameraStream;
  }, [cameraStream]);

  return (
    <div>
      <video height="100%" width="100%" autoPlay ref={videoRef} />
      <button onClick={onClick}>Capture</button>
    </div>
  );
});

const ImageView = ({ image }) => <img alt="some pic" src={image} />;

const Scan = () => {
  const [image, setImage] = useState(false);
  const [showCamView, setCamView] = useState(false);
  const onClick = () => setCamView(true);
  const onCameraClickHandler = dataURL => {
    setCamView(false);
    setImage(dataURL);
  };
  return (
    <div style={WRAPPER_STYLES}>
      {image && <ImageView image={image} />}
      {showCamView && <CameraView onClickHandler={onCameraClickHandler} />}
      {!showCamView && !image && <button onClick={onClick}>Show Camera</button>}
    </div>
  );
};

export default Scan;
