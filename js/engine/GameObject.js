"use strict";
const GameObject = function(mesh) {
    this.mesh = mesh;

    this.position = new Vec3(0, 0, 0);
    this.rotation = 0;
    this.rotationAxes = new Vec3(0, 1, 0);
    this.scale = new Vec3(1, 1, 0);

    this.modelMatrix = new Mat4();
};

GameObject.prototype.updateModelMatrix = function() {
    this.modelMatrix.set()
        .scale(this.scale)
        .rotate(this.rotation, this.rotationAxes)
        .translate(this.position);
};

GameObject.prototype.draw = function(camera) {
    this.updateModelMatrix();

    // Set model matrix uniform
    Material.modelMatrix.set(this.modelMatrix);

    // Set model matrix inverse uniform
    let modelMatrixInverse = Material.modelMatrix.clone();
    modelMatrixInverse.invert();
    Material.modelMatrixInverse.set(this.modelMatrixInverse);

    // Set model view projection matrix uniform
    this.modelMatrix.mul(camera.viewProjMatrix);
    Material.modelViewProjMatrix.set(this.modelMatrix)
    this.mesh.draw();
};