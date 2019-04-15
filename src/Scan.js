import React, { useState, useMemo, useEffect } from "react";

const WRAPPER_STYLES = {
  border: "1px dashed grey",
  padding: "1rem",
  width: 250,
  height: 250
};

const VIDEO_STYLES = {
  objectFit: "fill"
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

const CameraView = React.forwardRef((props, videoRef) => {
  const cameraStream = useCameraStream();
  useEffect(() => {
    videoRef.current.srcObject = cameraStream;
  }, [cameraStream]);

  return (
    <>
      <video
        height="100%"
        width="100%"
        style={VIDEO_STYLES}
        ref={videoRef}
        autoPlay
      />
      {props.children}
    </>
  );
});

const ImageView = ({ image }) => (
  <img width="100%" height="100%" alt="some pic" src={image} />
);

const Scan = () => {
  const [image, setImage] = useState(false);
  const [showCamView, setCamView] = useState(false);
  const onClick = () => setCamView(true);
  const videoRef = React.createRef();
  const onCapture = () => {
    const image = useCaptureImageFromVideo(videoRef.current);
    setCamView(false);
    setImage(image);
  };
  return (
    <div style={WRAPPER_STYLES}>
      {image && <ImageView image={image} />}
      {showCamView && (
        <CameraView ref={videoRef}>
          <button onClick={onCapture}>Capture</button>
        </CameraView>
      )}
      {!showCamView && !image && <button onClick={onClick}>Show Camera</button>}
    </div>
  );
};

export default Scan;
