import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BACKGROUND_COLOR } from './declarations';
import { maskStream } from './utils/maskStream';
import { getStream } from './utils/getStream';

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
      <canvas id={'canvas'} width={320} height={180} />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 5%;
`;
