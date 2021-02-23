export default class Sun {
  constructor() {
    this.sun = new Image();
    this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  }

  draw(ctx) {
    // restore original canvas (canvas 0)
    ctx.restore();

    // Earth orbit path
    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.stroke();

    // draw Sun
    ctx.drawImage(this.sun, 0, 0, 300, 300);
  }
}
