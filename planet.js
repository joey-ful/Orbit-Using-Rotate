import Satellite from './satellite.js';

export default class Planet {
  constructor(name, radius, color, orbitRadius, velocity) {
    this.name = name;
    this.radius = radius;
    this.color = color;
    this.orbitRadius = orbitRadius;
    this.velocity = velocity;

    this.img = new Image();
    this.img.src = `./srcs/${name}.png`;
    this.moon = new Satellite();
  }

  update(ctx, time, stageWidth, stageHeight, pathctx) {
    ctx.save();
    pathctx.save();
    this.rotateAndTranslate(ctx, time, stageWidth, stageHeight);
    this.rotateAndTranslate(pathctx, time, stageWidth, stageHeight);

    this.drawShadow(ctx);
    this.draw(ctx, time, pathctx);
    ctx.restore();

    this.drawPath(pathctx, stageWidth, stageHeight);
  }

  rotateAndTranslate(ctx, time, stageWidth, stageHeight) {
    ctx.translate(stageWidth / 2, stageHeight / 2);
    ctx.rotate(
      (((Math.PI * 2) / 60) * time.getSeconds() +
        ((Math.PI * 2) / 60000) * time.getMilliseconds()) *
        this.velocity
    );
    ctx.translate(-this.orbitRadius, 0);
  }

  drawShadow(ctx) {
    let shadowLength = this.radius + 20;
    if (this.name === 'mars') {
      shadowLength = this.radius + 30;
    }
    ctx.fillStyle = 'rgba(33, 69, 104, 0.4)';
    ctx.fillRect(-shadowLength, -this.radius, shadowLength, this.radius * 2);
  }

  draw(ctx, time, pathctx) {
    ctx.drawImage(
      this.img,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );

    if (this.name === 'earth') {
      this.moon.update(ctx, time, this.radius, this.velocity, pathctx);
    }
  }

  drawPath(pathctx, stageWidth, stageHeight) {
    pathctx.restore();
    pathctx.beginPath();
    pathctx.arc(
      stageWidth / 2,
      stageHeight / 2,
      this.orbitRadius,
      0,
      Math.PI * 2,
      false
    );
    pathctx.globalAlpha = 0.3;
    pathctx.strokeStyle = this.color;
    pathctx.stroke();
  }
}
