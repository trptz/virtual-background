import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BACKGROUND_COLOR } from './declarations';
import { maskStream } from './utils/maskStream';
import { getStream } from './utils/getStream';
import ImageSrc from './images/forest.jpg';

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      const stream = await getStream();
      if (videoRef.current !== null) {
        videoRef.current.srcObject = stream;
        await maskStream(videoRef.current, BACKGROUND_COLOR.RED);
      }
    })();
  }, []);

  return (
    <Wrap>
      <video id={'video'} ref={videoRef} autoPlay />
      <img id={'image'} width={320} src={ImageSrc} />
      <canvas id={'maskingImage'} width={320} height={180} />
      <canvas id={'canvas'} width={320} height={180} />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 5%;
`;
