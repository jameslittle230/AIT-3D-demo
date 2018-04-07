"use strict";
const Scene = function(gl) {
  gl.enable(gl.DEPTH_TEST);

  this.vsTex = new Shader(gl, gl.VERTEX_SHADER, "tex_vs.essl");
  this.fsTex = new Shader(gl, gl.FRAGMENT_SHADER, "tex_fs.essl");

  this.texProgram = new TexturedQuadProgram(gl, this.vsTex, this.fsTex);

  this.texture2D = new Texture2D(gl, '/textures/YadonDh.png');
  this.eyeTex = new Texture2D(gl, '/textures/YadonEyeDh.png');

  this.material = new Material(gl, this.texProgram);
  this.material.colorTexture.set(this.texture2D);

  this.eyeMaterial = new Material(gl, this.texProgram);
  this.eyeMaterial.colorTexture.set(this.eyeTex);

  this.multiMesh = new MultiMesh(gl, '/models/Slowpoke.json', [this.material, this.eyeMaterial]);

  this.timeAtLastFrame = new Date().getTime();
  this.frameCount = 0;

  this.gameObjects = [];
  this.thing = new GameObject(this.multiMesh);
  this.thing.scale.set(0.1, 0.1, 0.1);
  this.camera = new PerspectiveCamera();
};

Scene.prototype.update = function(gl, keysPressed) {
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;
  this.frameCount++;

  // Clear screen
  gl.clearColor(190/255, 227/255, 180/255, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.camera.move(dt, keysPressed);
  this.thing.draw(this.camera);
};


