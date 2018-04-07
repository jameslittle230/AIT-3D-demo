"use strict";
const Scene = function(gl) {
  gl.enable(gl.DEPTH_TEST);

  this.timeAtLastFrame = new Date().getTime();
  this.frameCount = 0;

  this.avatar = new Avatar(gl);

  this.gameObjects = [
    this.avatar,
    // new GroundPlane(),
  ];

  this.camera = new PerspectiveCamera();
};

Scene.prototype.update = function(gl, keysPressed) {
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  this.frameCount++;

  // Clear screen
  gl.clearColor(0.61,0.47,0.15, 1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.camera.move(dt, keysPressed);
  this.gameObjects.forEach(gameObject => {
    gameObject.move(dt, keysPressed, this.camera);
    gameObject.draw(this.camera);
  });
};


