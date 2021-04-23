import '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';
import { BACKGROUND_RGBA, BackgroundColor } from '../declarations';
import { imageToCanvas } from './imageToCanvas';

/**
 * @descriptio バーチャル背景付与
 */
export async function maskStream(video: HTMLVideoElement, backgroundColor: BackgroundColor) {
  video.onloadeddata = async () => {
    imageToCanvas();
    const { canvas, model } = await initBodyPix();

    await drawMaskedStream({
      video,
      canvas,
      model,
      backgroundColor,
    });
  };
}

/**
 * @description マスキング処理の初期化
 */
async function initBodyPix() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const model = await bodyPix.load();

  return { canvas, model };
}

/**
 * @description マスキングして描画
 */
async function drawMaskedStream({
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

  const maskingImage = document.getElementById('maskingImage') as HTMLCanvasElement;

  const context = maskingImage.getContext('2d');
  if (context === null) return;

  const imageData = context.getImageData(0, 0, 320, 180);
  const pixel = imageData.data;
  for (let p = 0; p < pixel.length; p += 4) {
    if (segmentation.data[p / 4] === 0) {
      pixel[p + 3] = 0;
    }
  }
  context.imageSmoothingEnabled = true;
  context.putImageData(imageData, 0, 0);

  // bodyPix.drawMask(canvas, video, mask, 1, 0, false);

  requestAnimationFrame(() =>
    drawMaskedStream({
      video,
      canvas,
      model,
      backgroundColor,
    }),
  );
}
