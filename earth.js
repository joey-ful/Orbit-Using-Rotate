export default class Earth {
  constructor() {
    this.earth = new Image();
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  }

  draw(ctx, time) {
    // save original canvas (canvas 0)
    ctx.save();

    // set the canvas
    ctx.translate(150, 150);
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );
    ctx.translate(105, 0);
    
    // Earth's shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, -12, 40, 24);

    // draw Earth
    ctx.drawImage(this.earth, -12, -12);
  }
}
