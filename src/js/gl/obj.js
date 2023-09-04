import { Mesh, MeshBasicMaterial, TextureLoader, BoxGeometry } from "three";

export class Obj {
  constructor() {
    this.instance;
    this.init();
  }

  static get MATERIAL_PARAM() {
    return {
      color: 0xffffff,
    };
  }

  init() {
    const g = new BoxGeometry(100, 100, 100);
    const m = new MeshBasicMaterial({
      color: Obj.MATERIAL_PARAM.color,
      // transparent: false,
      // opacity: 1,
    });
    this.instance = new Mesh(g, m);
  }

  load() {}

  onUpdate() {}

  onResize(w, h) {}
}
