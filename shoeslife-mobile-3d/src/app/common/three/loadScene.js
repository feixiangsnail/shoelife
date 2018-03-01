// import Sim from './sim.js';
import TWEEN from './tween.min.js';
import Detector from './Detector.js';
import { is_pc } from '../utils.js';
export function LoadScene() {}
var animateReset = false;
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isiOS) {
    var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    var appver = parseInt(ver[1], 10);
    if (appver >=10) {
        animateReset = true;
    }
} else if (is_pc()) {
    animateReset = true;
}
LoadScene.prototype.init = function(param) {
    console.log(param);
        if (!Detector.webgl) Detector.addGetWebGLMessage();
        param = param || {};
        var container = param.container;
        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0xF5F5F5)
        //renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 600);
        scene.add(camera);
        this.container = container;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.frameId = null;
        this.rotateNum = 0;
        this.setLight(param);
        var orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls = orbitControls;
        this.orbitControls.autoRotateSpeed = 50;
        this.orbitControls.minDistance = 200;
        this.orbitControls.maxDistance = 410;
        this.orbitControls.autoRotate = true;
        this.orbitControls.rotateSpeed = 0.5;
    }

LoadScene.prototype.setLight = function(param) {
    var lightConfig = param.lightConfig;
    var ambientColor = new THREE.Color(lightConfig.ambientColor);
    var changeDirColor = new THREE.Color(lightConfig.changeDirColor);
    var pointColor = new THREE.Color(lightConfig.pointColor);
    this.isChangeDirection = lightConfig.directPointer;
    this.camera.position.set(0, 100, 400);
    this.camera.lookAt(this.scene.position);
    this.amb = new THREE.AmbientLight(ambientColor, lightConfig.ambientIntensity);
    this.directLight = new THREE.DirectionalLight(changeDirColor, lightConfig.directIntensity);
    this.directLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
    this.spotLight = new THREE.PointLight(pointColor, lightConfig.spotIntensity);
    this.spotLight.position.set(lightConfig.pointMoveX, lightConfig.pointMoveY, lightConfig.pointMoveZ);
    this.scene.add(this.spotLight);
    this.scene.add(this.amb);
    // this.directLight2.castShadow = true;
    // this.directLight2.shadow.mapSize.width = 1024;
    // this.directLight2.shadow.mapSize.height = 1024;
    // this.directLight2.shadow.camera.left = -800;
    // this.directLight2.shadow.camera.right = 800;
    // this.directLight2.shadow.camera.top = 800;
    // this.directLight2.shadow.camera.bottom = -800;
    this.scene.add(this.directLight2);
    this.scene.add(this.directLight)
}
LoadScene.prototype.run = function() {
    // if (this.isChangeDirection) {
    var directVec = this.camera.position.clone().normalize();
    this.directLight.position.copy(directVec);
    // }
    this.renderer.render(this.scene, this.camera);
    var that = this;
    this.orbitControls.update();
    if (this.orbitControls.autoRotate && this.orbitControls.autoRotateSpeed) {
        this.rotateNum++;
        if (this.rotateNum >= (3600 / this.orbitControls.autoRotateSpeed)) {
            this.orbitControls.autoRotate = false;
        }
    }
    TWEEN.update();
    this.frameId = requestAnimationFrame(function() { that.run(); });
}
LoadScene.prototype.addModel = function(model) {
    this.scene.add(model.object3D);
}
LoadScene.prototype.reset = function() {
    if (animateReset) {
        var x = this.camera.position.x;
        var y = this.camera.position.y;
        var z = this.camera.position.z;
        var v = Math.sqrt(x * x + (y - 100) * (y - 100) + (z - 400) * (z - 400));
        new TWEEN.Tween(this.camera.position).to({
            x: 0,
            y: 100,
            z: 400
        }, v * 2).start();
    } else {
        this.orbitControls.reset();
    }
}
LoadScene.prototype.clearAll = function() {
    if(!this.container) return;
    cancelAnimationFrame(this.frameId);
    this.renderer.domElement.addEventListener('dblclick', null, false);
    disposeHierarchy(this.scene, disposeNode);
    this.container.removeChild(this.renderer.domElement);
    this.camera = null;
    // this.container = null;
    this.amb = null;
    this.directLight = null
    this.directLight2 = null;
    this.orbitControls = null;
    this.spotLight = null;
    this.scene = null
    this.renderer = null;
    function disposeNode(node) {
        if (node instanceof THREE.Mesh) {
            if (node.geometry) {
                node.geometry.dispose();
            }
            if (node.material) {
                if (node.material.map) node.material.map.dispose();
                if (node.material.bumpMap) node.material.bumpMap.dispose();
                if (node.material.alphaMap) node.material.alphaMap.dispose();
                node.material.dispose();
            }
        }
    }
    function disposeHierarchy(node, callback) {
        for (var i = node.children.length - 1; i >= 0; i--) {
            var child = node.children[i];
            disposeHierarchy(child, callback);
            callback(child);
        }
    }
}
LoadScene.prototype.getSnapshot = function(callback) {
    var that = this;
    this.orbitControls.reset();
    cancelAnimationFrame(this.frameId);
    this.container.removeChild(this.renderer.domElement);
    this.renderer = new THREE.WebGLRenderer({
        
        preserveDrawingBuffer: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setClearColor(0xF5F5F5)
        //this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.run();
    setTimeout(function() {
        var pic = that.renderer.domElement.toDataURL('image/jpeg');
    
        callback(pic);
    }, 1200)
}
