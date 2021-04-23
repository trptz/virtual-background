import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import WebCam from 'react-webcam';
import { BackgroundColor, BACKGROUND_COLOR, COLOR } from './declarations';
import { maskStream } from './logics/maskStream';

export function App() {
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>(BACKGROUND_COLOR.RED);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 180 },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      await maskStream(videoRef.current as HTMLVideoElement, backgroundColor);
    })();
  }, []);

  return (
    <>
      {/*<WebCam id={"video"} ref={videoRef} width={320} height={180} />*/}
      <video id={'video'} ref={videoRef} autoPlay />
      <canvas id={'canvas'} width={320} height={180} />
      {/*<Wrap>*/}
      {/*    <NoImage isActive={backgroundColor === null} onClick={() => setBackgroundColor(null)}>*/}
      {/*        なし*/}
      {/*    </NoImage>*/}
      {/*    {Object.values(BACKGROUND_COLOR).map((color) => <ColorBox*/}
      {/*        key={color}*/}
      {/*        isActive={color === backgroundColor}*/}
      {/*        color={rgba(BACKGROUND_RGBA[color])}*/}
      {/*        onClick={() => setBackgroundColor(color)}*/}
      {/*    />)}*/}
      {/*</Wrap>*/}
    </>
  );
}

const Wrap = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
`;

const SelectableBox = css<{ isActive: boolean }>`
  border-radius: 16px;
  cursor: pointer;
  border: ${({ isActive }) => (isActive ? `5px solid ${COLOR.BLUE}` : 'none')};
`;

const NoImage = styled.div<{ isActive: boolean }>`
  ${SelectableBox};
  background-color: ${COLOR.GREY};
  color: ${COLOR.WHITE};
  font-weight: bold;
  opacity: 0.3;
  text-align: center;
  line-height: 100px;
`;

const ColorBox = styled.div<{ color: string; isActive: boolean }>`
  ${SelectableBox};
  background-color: ${({ color }) => color};
`;

const SaveButtonWrap = styled.div`
  margin-top: 16px;
`;
