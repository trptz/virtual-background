import { Color } from '@tensorflow-models/body-pix/dist/types';

export const COLOR = {
  WHITE: '#fff',
  GREY: '#ddd',
  BLUE: '#4169e1',
} as const;

export const BACKGROUND_COLOR = {
  RED: 'RED',
  BLUE: 'BLUE',
  TRANSPARENT: 'TRANSPARENT',
} as const;

export type BackgroundColor = keyof typeof BACKGROUND_COLOR;

export const BACKGROUND_RGBA: { [Key in BackgroundColor]: Color } = {
  [BACKGROUND_COLOR.RED]: { r: 255, g: 50, b: 50, a: 255 },
  [BACKGROUND_COLOR.BLUE]: { r: 0, g: 191, b: 255, a: 255 },
  [BACKGROUND_COLOR.TRANSPARENT]: { r: 0, g: 0, b: 0, a: 0 },
} as const;

export const WIDTH = 640;
export const HEIGHT = 360;

export const VIDEO_CONSTRAINTS = {
  video: { width: WIDTH, height: HEIGHT },
};
