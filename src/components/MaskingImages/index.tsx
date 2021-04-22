import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { BackgroundImageNo } from "../../../common/types";
import { Constants, MASKING_COLORS } from "../../../Constants";
import ActionAPI from "../../../api/ActionAPI";
import RoundButton from "../../../components/RoundButton";
import { rgba } from "./utils";

interface Props {
  resetVideo: () => void;
  closeModal: () => void;
  initialBackgroundImageNo: BackgroundImageNo;
}

export function MaskingImages({ resetVideo, closeModal, initialBackgroundImageNo }: Props) {
  const [backgroundImageNo, setBackgroundImageNo] = useState<BackgroundImageNo>(initialBackgroundImageNo);
  const changeBackgroundImageNo = (imageNo: BackgroundImageNo) => {
    resetVideo();
    setBackgroundImageNo(imageNo);
    localStorage.setItem("background_image_no", JSON.stringify(imageNo));
  };
  const updateBackgroundImageNo = useCallback(async () => {
    const workerUId = localStorage.getItem("uid");
    if (!workerUId) return console.error("マスキング設定の更新に失敗しました。uidがありません。");
    const background_image_no = backgroundImageNo;
    closeModal();

    await ActionAPI.putAction({ workerUId, background_image_no });
  }, [backgroundImageNo, closeModal]);

  return (
    <>
      <Wrap>
        <NoImage isActive={backgroundImageNo === null} onClick={() => changeBackgroundImageNo(null)}>
          なし
        </NoImage>
        {MASKING_COLORS.map((color, index) => {
          const imageNo = index as BackgroundImageNo;
          return (
            <ColorBox
              key={index}
              isActive={imageNo === backgroundImageNo}
              color={rgba(color)}
              onClick={() => changeBackgroundImageNo(imageNo)}
            />
          );
        })}
      </Wrap>
      <SaveButtonWrap>
        <RoundButton onClick={updateBackgroundImageNo} width={"180px"}>
          ビデオ設定を保存
        </RoundButton>
      </SaveButtonWrap>
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
  border: ${({ isActive }) => (isActive ? `5px solid ${Constants.Color.SKY_BLUE}` : "none")};
`;

const NoImage = styled.div<{ isActive: boolean }>`
  ${SelectableBox};
  background-color: ${Constants.Color.GREY};
  color: ${Constants.Color.WHITE};
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
