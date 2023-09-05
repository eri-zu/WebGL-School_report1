import { Mesh, LineSegments, Group, MeshPhongMaterial, Color } from "three";
import { radian, map } from "../util/math";
import { random } from "../util/math";

export class Obj {
  constructor(
    boxGeometry,
    edges,
    lineMaterial,
    i,
    j,
    objW,
    gridX,
    gridZ,
    spacing,
    maxScroll,
    buffa
  ) {
    this.boxGeometry = boxGeometry;
    this.edges = edges;
    this.lineMaterial = lineMaterial;
    this.i = i;
    this.j = j;
    this.objW = objW;
    this.gridX = gridX;
    this.gridZ = gridZ;
    this.spacing = spacing;
    this.maxScroll = maxScroll;
    this.buffa = buffa;
    this.boxMesh;
    this.line;

    this.init();
    this.setPosition();
    this.setPameter();
  }

  init() {
    const boxMaterial = new MeshPhongMaterial({
      color: new Color(random(0, 1), random(0, 1), random(0, 1)),
    });
    this.boxMesh = new Mesh(this.boxGeometry, boxMaterial);
    this.line = new LineSegments(this.edges, this.lineMaterial);
    this.wrap = new Group();
    this.wrap.add(this.boxMesh, this.line);
  }

  setPosition() {
    // 親要素を本来おきたいpositionにセット
    const w = this.objW + this.spacing;
    this.wrap.position.x = w * this.i - w * this.gridX * 0.5;
    this.wrap.position.z = w * this.j - w * this.gridZ * 0.5;

    // 回転の中心ずらすために子要素を移動
    this.boxMesh.position.y += 0.05;
    this.boxMesh.position.z -= 0.5;
    this.line.position.y += 0.05;
    this.line.position.z -= 0.5;
  }

  setPameter() {
    const _scroll = this.maxScroll / this.gridZ;
    this._minScroll = _scroll * this.j + this.buffa;
    this._maxScroll = this._minScroll + _scroll - this.buffa;
  }

  onUpdate(scrollY) {
    const deg = map(scrollY, 0, 90, this._minScroll, this._maxScroll);
    this.wrap.rotation.x = radian(deg);
  }

  onResize(w, h) {}
}
