import { VIDEO_CONSTRAINTS } from '../declarations';

export async function getStream() {
  return navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS);
}
