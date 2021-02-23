import {SunInfo} from './planetInfo.js';

export default class Sun {
  constructor(stageWidth, stageHeight) {
    this.name = SunInfo.name;
    this.radius = SunInfo.radius;
    this.color = SunInfo.color;
    this.x = stageWidth / 2 - this.radius;
    this.y = stageHeight / 2 - this.radius;
    this.sun = new Image();
    this.sun.src = './srcs/sun.png';
  }

  draw(ctx) {
    ctx.restore();

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.radius;
    
    ctx.drawImage(this.sun, this.x, this.y, this.radius * 2, this.radius * 2);
    ctx.restore();
    
    
  }
}
