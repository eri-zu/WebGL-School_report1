import { PerspectiveCamera, Vector3 } from "three";

export class Camera {
  constructor() {
    this.instance;
    this.init();
  }

  static get CAMERA_PARAM() {
    return {
      fovy: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 10000,
      x: 0.0,
      y: 2.0,
      z: 10.0,
      lookAt: new Vector3(0.0, 0.0, 0.0),
    };
  }

  init() {
    this.instance = new PerspectiveCamera(
      Camera.CAMERA_PARAM.fovy,
      Camera.CAMERA_PARAM.aspect,
      Camera.CAMERA_PARAM.near,
      Camera.CAMERA_PARAM.far
    );
    this.setPixelPosition(window.innerHeight);
    this.instance.lookAt(Camera.CAMERA_PARAM.lookAt);
  }

  onResize(w, h) {
    this.instance.aspect = w / h;
    this.setPixelPosition(h);
  }

  setPixelPosition(h) {
    const fovRad = (Camera.CAMERA_PARAM.fovy / 2) * (Math.PI / 180);
    this.instance.position.z = h / 2 / Math.tan(fovRad);
    this.instance.updateProjectionMatrix();
  }
}
