import TWEEN from './tween.min.js';
export function LoadScene(param) {
    Sim.App.call(this);
    this.isChangeDirection = false;
    this.init(param)
}
LoadScene.prototype = new Sim.App();
LoadScene.prototype.init = function(param) {
    Sim.App.prototype.init.call(this, param);
    this.camera.position.set(0, 100, 400);
    this.camera.lookAt(this.scene.position);
    this.amb = new THREE.AmbientLight(0xffffff, 0.3);
    this.directLight = new THREE.DirectionalLight(0xffffff, 0.3);
    this.directLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
    this.rotateNum = 0;
    this.pointLight = new THREE.PointLight(0xffffff, 0.1, 800);

    this.scene.add(this.pointLight);
    this.scene.add(this.amb);
    this.renderer.setClearColor(0xf5f5f5)


    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMapAutoUpdate = true;
    this.directLight2.castShadow = true;

    this.directLight2.shadow.mapSize.width = 2048;
    this.directLight2.shadow.mapSize.height = 2048;
    this.directLight2.shadow.camera.far = 1300;
    this.directLight2.shadow.camera.left = -1500;
    this.directLight2.shadow.camera.right = 1500;
    this.directLight2.shadow.camera.top = 1600;
    this.directLight2.shadow.camera.bottom = -1600;
    this.scene.add(this.directLight2);
    this.scene.add(this.directLight)
    this.addCameraControls();

    var pointSphere = new THREE.SphereGeometry(2, 6, 6);
    var pointMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var lamp = new THREE.Mesh(pointSphere, pointMaterial);
    lamp.name = "lamp";
    this.lamp = lamp;
    this.lamp.add(this.pointLight);
    this.lamp.position.set(0, 20, 0);
    this.scene.add(this.lamp);








}
LoadScene.prototype.run = function() {
    this.update();
    this.renderer.render(this.scene, this.camera);
    var that = this;

    if (this.orbitControls.autoRotate && this.orbitControls.autoRotateSpeed) {
        this.rotateNum++;
        if (this.rotateNum >= (3600 / this.orbitControls.autoRotateSpeed)) {
            this.orbitControls.autoRotate = false;
        }
    }
    TWEEN.update();
    requestAnimationFrame(function() { that.run(); });
}
LoadScene.prototype.update = function() {
    if (this.orbitControls) {
        this.orbitControls.update();
    }
    // if (this.isChangeDirection) {
        var directVec = this.camera.position.clone().normalize();
        this.directLight.position.copy(directVec);
    // }

    Sim.App.prototype.update.call(this);
}
LoadScene.prototype.addModel = function(model) {
    this.scene.add(model.object3D)
}
LoadScene.prototype.removeModel = function(model) {
    this.removeObject(model);
}
LoadScene.prototype.addCameraControls = function(config) {
    var orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls = orbitControls;
    this.orbitControls.minDistance = 100;
    this.orbitControls.maxDistance = 410;
    this.orbitControls.autoRotate = true;
    this.orbitControls.autoRotateSpeed = 50;
}
LoadScene.prototype.ambientColor = function(color) {
    this.amb.color = new THREE.Color(color);
}
LoadScene.prototype.ambientIntensity = function(i) {
    this.amb.intensity = i;
}
LoadScene.prototype.changeDirColor = function(color) {
    this.directLight.color = new THREE.Color(color);
}
LoadScene.prototype.directIntensity = function(i) {
    this.directLight.intensity = i;
}
LoadScene.prototype.directPointer = function(bool) {
    this.isChangeDirection = bool;
}
LoadScene.prototype.spotIntensity = function(i) {
    this.pointLight.intensity = i;
}
LoadScene.prototype.pointMoveX = function(i) {
    this.lamp.position.x = i;
}
LoadScene.prototype.pointMoveY = function(i) {
    this.lamp.position.y = i;
}
LoadScene.prototype.pointMoveZ = function(i) {
    this.lamp.position.z = i;
}
LoadScene.prototype.decay = function(i) {
    this.pointLight.decay = i;
}
LoadScene.prototype.pointColor = function(color) {

    this.pointLight.color = new THREE.Color(color);
}
LoadScene.prototype.updateShadow = function() {
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMapAutoUpdate = false;
    this.renderer.clearTarget(this.directLight2.shadowMap);


}
LoadScene.prototype.clearAll = function() {
    cancelAnimationFrame(this.frameId); // Stop the animation
    this.renderer.domElement.addEventListener('dblclick', null, false);

    while (this.scene.children.length > 0) { this.scene.remove(this.scene.children[0]); }

    this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
}
