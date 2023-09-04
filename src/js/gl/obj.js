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
      wireframe: true,
    });
    this.instance = new Mesh(g, m);
  }

  load() {}

  onUpdate() {
    this.instance.rotation.x += 0.01;
    this.instance.rotation.y += 0.007;
    // this.instance.rotation.z += 0.05;
  }

  onResize(w, h) {}
}
