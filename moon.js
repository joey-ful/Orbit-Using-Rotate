export default class Moon {
  constructor() {
    this.moon = new Image();
    this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  }

  draw(ctx, time) {
    // save Earth's rotated version (canvas 1)
    ctx.save();
    
    // set the canvas
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctx.translate(0, 28.5);

    // draw Moon
    ctx.drawImage(this.moon, -3.5, -3.5);
    
    // restore Earth's rotated version (canvas 1)
    ctx.restore();
  }
}
