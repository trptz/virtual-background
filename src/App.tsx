import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from './declarations';
import { maskVideo } from './utils/maskStream';
import { getStream } from './utils/getStream';

export function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      const stream = await getStream();
      if (videoRef.current !== null) {
        videoRef.current.srcObject = stream;
        await maskVideo(videoRef.current, BACKGROUND_COLOR.BLUE);
      }
    })();
  }, []);

  return (
    <Wrap>
      <video id={'video'} ref={videoRef} autoPlay />
      <canvas id={'canvas'} width={WIDTH} height={HEIGHT} />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 5%;
`;
