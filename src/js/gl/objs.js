import { EdgesGeometry, BoxGeometry, Group, LineBasicMaterial } from "three";
import { Obj } from "./obj";
import { shuffle } from "../util/math";
export class Objs {
  constructor() {
    this.instance;
    this.group;

    this.init();
  }

  static get MATERIAL_PARAM() {
    return {
      linecolor: 0x0000000,
    };
  }

  static get GEOMETRY_PARAM() {
    return {
      width: 1,
      height: 0.1,
      depth: 1,
      gridX: 10,
      gridZ: 20,
      spacing: 0.1,
    };
  }

  static get SCROLL_PARAM() {
    return {
      maxScroll:
        document.querySelector(".scrollarea").clientHeight - window.innerHeight,
      buffa: [0, 5, 10, 15, 20, 3, 8, 18, 25, 12],
    };
  }

  init() {
    // box
    const boxGeometry = new BoxGeometry(
      Objs.GEOMETRY_PARAM.width,
      Objs.GEOMETRY_PARAM.height,
      Objs.GEOMETRY_PARAM.depth
    );

    // edge
    const edges = new EdgesGeometry(boxGeometry);
    const lineMaterial = new LineBasicMaterial({
      color: Objs.MATERIAL_PARAM.linecolor,
    });

    // group
    this.group = new Group();

    // obj
    this.objArray = [];

    for (let i = 0; i < Objs.GEOMETRY_PARAM.gridX; i++) {
      for (let j = 0; j < Objs.GEOMETRY_PARAM.gridZ; j++) {
        const buffa = shuffle(Objs.SCROLL_PARAM.buffa)[i];
        const obj = new Obj(
          boxGeometry,
          edges,
          lineMaterial,
          i,
          j,
          Objs.GEOMETRY_PARAM.width,
          Objs.GEOMETRY_PARAM.gridX,
          Objs.GEOMETRY_PARAM.gridZ,
          Objs.GEOMETRY_PARAM.spacing,
          Objs.SCROLL_PARAM.maxScroll,
          buffa
        );
        this.group.add(obj.wrap);
        this.objArray.push(obj);
      }
    }
  }

  onUpdate(scrollY) {
    this.objArray.forEach((el, i) => {
      el.onUpdate(scrollY);
    });
  }

  onResize(w, h) {
    this.objArray.forEach((el, i) => {
      el.onResize(w, h);
    });
  }
}
