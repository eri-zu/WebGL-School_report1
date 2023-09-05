import { WebGLRenderer, Color } from "three";
import { random } from "../util/math";
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.instance;

    this.init();
  }

  static get RENDERER_PARAM() {
    return {
      clearColor: 0x666666,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  init() {
    this.instance = new WebGLRenderer({ canvas: this.canvas });
    this.instance.setPixelRatio(window.devicePixelRatio);
    this.instance.setClearColor(
      new Color(random(0, 1), random(0, 1), random(0, 1))
    );
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }

  onResize(w, h) {
    this.instance.setSize(w, h);
  }
}
