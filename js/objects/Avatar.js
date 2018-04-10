function Avatar(gl) {
    this.vsTex = new Shader(gl, gl.VERTEX_SHADER, "tex_vs.essl");
    this.fsTex = new Shader(gl, gl.FRAGMENT_SHADER, "tex_fs.essl");

    this.texProgram = new TexturedQuadProgram(gl, this.vsTex, this.fsTex);

    this.avatarTexture = new Texture2D(gl, '/textures/YadonDh.png');
    this.avatarEyeTexture = new Texture2D(gl, '/textures/YadonEyeDh.png');

    this.material = new Material(gl, this.texProgram);
    this.material.colorTexture.set(this.avatarTexture);

    this.eyeMaterial = new Material(gl, this.texProgram);
    this.eyeMaterial.colorTexture.set(this.avatarEyeTexture);

    this.multiMesh = new MultiMesh(gl, '/models/Slowpoke.json', [this.material, this.eyeMaterial]);

    this.gameObject = new GameObject(this.multiMesh);
    this.gameObject.scale.set(0.1, 0.1, 0.1);
    this.gameObject.rotation = Math.PI / -12;
    this.gameObject.position.set(0, -0.5, -2.5)
};

Avatar.prototype.draw = function(camera) {
    this.gameObject.draw(camera);
}

Avatar.prototype.move = function(dt, keysPressed, camera) {
    // this.gameObject.rotation += 0.01;
};