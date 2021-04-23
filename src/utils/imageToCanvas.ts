import ImageSrc from '../images/forest.jpg';

export function imageToCanvas() {
  const canvas = document.getElementById('maskingImage') as HTMLCanvasElement;
  const context = canvas.getContext('2d');

  const image = document.getElementById('image') as HTMLImageElement;

  context?.drawImage(image, 0, 0, 320, 180);
}
