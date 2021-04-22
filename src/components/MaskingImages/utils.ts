import { Color } from "@tensorflow-models/body-pix/dist/types";

/**
 * @description tensorflowのColorオブジェクトをcssのrgbaに変換する
 * @param color
 */
export function rgba({ r, g, b, a }: Color) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
