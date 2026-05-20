declare module "playcanvas/scripts/esm/camera-controls.mjs" {
  import type { Script } from "playcanvas";
  export class CameraControls extends Script {
    enableFly: boolean;
    enableOrbit: boolean;
    enablePan: boolean;
    focusDamping: number;
    focusPoint: import("playcanvas").Vec3;
  }
}
