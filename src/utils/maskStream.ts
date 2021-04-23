import '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import { BACKGROUND_RGBA, BackgroundColor } from '../declarations';

export async function maskVideo(video: HTMLVideoElement, backgroundColor: BackgroundColor) {
  video.onloadeddata = async () => {
    const { canvas, model } = await initBodyPix();

    await drawMaskedVideo({
      video,
      canvas,
      model,
      backgroundColor,
    });
  };
}

/**
 * @description bodypixモデルのロード
 */
async function initBodyPix() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const model = await bodyPix.load({
    architecture: 'ResNet50',
    outputStride: 16,
    multiplier: 1,
    quantBytes: 4,
  });

  return { canvas, model };
}

/**
 * @description マスキング、描画
 */
async function drawMaskedVideo({
  video,
  canvas,
  model,
  backgroundColor,
}: {
  video: HTMLVideoElement;
  canvas: any;
  model: bodyPix.BodyPix;
  backgroundColor: BackgroundColor;
}) {
  const segmentation = await model.segmentPerson(video);

  const mask = bodyPix.toMask(segmentation, BACKGROUND_RGBA.TRANSPARENT, BACKGROUND_RGBA[backgroundColor]);

  const isNotFitMaskSize = video.videoWidth !== mask.width || video.videoHeight !== mask.height;
  if (isNotFitMaskSize) return;

  bodyPix.drawMask(canvas, video, mask, 1, 0, false);

  requestAnimationFrame(() =>
    drawMaskedVideo({
      video,
      canvas,
      model,
      backgroundColor,
    }),
  );
}
