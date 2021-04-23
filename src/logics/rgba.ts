import { Color } from "@tensorflow-models/body-pix/dist/types";


export function rgba({ r, g, b, a }: Color) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
