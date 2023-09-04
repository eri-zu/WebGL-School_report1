import { Scene } from "three";
import { Renderer } from "./renderer";
import { Camera } from "./camera";
import { Obj } from "./obj";
export class Gl {
  constructor(wrap) {
    this.wrap = wrap;

    this.setup();
  }

  setup() {
    this.canvas = this.wrap.querySelector("canvas");
    this.renderer = new Renderer(this.canvas);
    this.scene = new Scene();
    this.camera = new Camera();
    this.obj = new Obj();

    this.scene.add(this.obj.instance);
  }

  load() {}

  onUpdate() {
    this.renderer.instance.render(this.scene, this.camera.instance);
    this.obj.onUpdate();
  }

  onResize() {
    const w = this.wrap.clientWidth;
    const h = this.wrap.clientHeight;
    this.renderer.onResize(w, h);
    this.camera.onResize(w, h);
    this.obj.onResize(w, h);
  }

  setEvents() {}
}
