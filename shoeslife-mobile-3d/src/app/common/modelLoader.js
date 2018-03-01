import TWEEN from './three/tween.min.js';
import Detector from './three/Detector.js';
import { is_pc } from './utils.js';
var animateReset = false;
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isiOS) {
    var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    var appver = parseInt(ver[1], 10);
    if (appver >= 10) {
        animateReset = true;
    }
} else if (is_pc()) {
    animateReset = true;
}
var RENDERWIDTH = document.documentElement.clientWidth;
if (RENDERWIDTH >= 768) {
    RENDERWIDTH = 768
}
var RENDERHEIGHT = RENDERWIDTH;
function ModeScene() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.crossOrigin = '';
    this.loader = new THREE.CTMLoader();
    this.cubeTextureLoader=new THREE.CubeTextureLoader();
    this.cubeTextureLoader.crossOrigin='';
}
ModeScene.prototype = {
    init: function(param) {
        if (this.object3D) {
            this.clearAll();
        }
        var container = param.container;
        if (!container) return;
        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(RENDERWIDTH, RENDERHEIGHT);
        renderer.setClearColor(0xF5F5F5)
        this.renderer = renderer;
        var HEIGHTSTYLE = container.style.height
        RENDERHEIGHT = HEIGHTSTYLE.substring(0, 3) || RENDERWIDTH
        this.renderer.setSize(RENDERWIDTH, RENDERHEIGHT);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, RENDERWIDTH / RENDERHEIGHT, 1, 2000);
        this.camera.position.set(0, 100, 400);
        var x = this.camera.position.x;
        var z = this.camera.position.z;
        this.camera.position.x = z * Math.sin(-Math.PI / 4);
        this.camera.position.z = z * Math.cos(-Math.PI / 4);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);
        this.frameId = null;
        container.appendChild(this.renderer.domElement);
        this.container = container;
        this.orbitControls = new THREE.OrbitControls(this.camera, this.container);
        this.orbitControls.autoRotateSpeed = 50;
        this.orbitControls.minDistance = 200;
        this.orbitControls.maxDistance = 410;
        this.orbitControls.rotateSpeed = 0.5;
        this.ProjectorMeshs = [];
        this.sourceUrl = param.url;
        param = param || {};
        var shoeInfo = param.shoeData.shoe;
        //console.log(param.shoeData, 'shoeData')
        this.rotateNum = 0;
        this.orbitControls.autoRotate = true;
        this.setLight(shoeInfo);
        this.setDefaultMaterial(param.shoeData);
        var scaleSize = 300 / this.disTance(shoeInfo);
        var center = this.toCenter(shoeInfo)
            //console.log(center, 1)
        center.multiplyScalar(scaleSize);
        //console.log(shoeInfo.centz, 'centz')
        this.object3D = new THREE.Object3D;
        this.extGroup = new THREE.Object3D;
        this.object3D.scale.set(scaleSize, scaleSize, scaleSize)
        this.object3D.position.copy(center)
        this.scene.add(this.object3D);
        if (param.enterFrom == "preview") {
            param.loadingFunc();
            this.loadCtmRecusively(param.shoeData, this.sourceUrl);
        } else {
            this.loadCtmJs({
                shoeData: param.shoeData,
                url: shoeInfo.modeUrl,
                extModeUrl: shoeInfo.extModeUrl,
                callBack: param.loadingFunc
            })
        }
        this.PickObj(container, param.tabchangeFunc)
        this.run();
    },
    getSnapshot: function(callback) {
        var renderer2 = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true
        });
        renderer2.setPixelRatio(window.devicePixelRatio);
        renderer2.setSize(RENDERWIDTH, RENDERHEIGHT);
        renderer2.setClearColor(0xF5F5F5)
        var that = this;
        this.orbitControls.reset();
        cancelAnimationFrame(this.frameId);
        this.container.removeChild(this.renderer.domElement);
        this.renderer.domElement.addEventListener('dblclick', null, false);
        this.container.appendChild(renderer2.domElement);
        var frameTem = null;
        render();
        function render() {
            frameTem = requestAnimationFrame(render)
            var directVec = that.camera.position.clone().normalize();
            that.directLight.position.copy(directVec);
            renderer2.render(that.scene, that.camera)
        }
        setTimeout(function() {
            var pic = renderer2.domElement.toDataURL('image/jpeg');
            that.container.removeChild(renderer2.domElement);
            cancelAnimationFrame(frameTem);
            renderer2 = null;
            that.container.appendChild(that.renderer.domElement);
            that.orbitControls.reset();
            that.orbitControls.autoRotate = false;
            that.run();
            callback(pic);
        }, 1200)
    },
    clearAll: function() {
        if (!this.container) return;
        console.log(this.frameId, 'thisfrmaid')
        cancelAnimationFrame(this.frameId);
        try {
            this.container.removeChild(this.renderer.domElement);
        } catch (e) {}
        this.scene.remove(this.amb);
        this.scene.remove(this.directLight)
        this.scene.remove(this.directLight2)
        this.scene.remove(this.spotLight)
        this.scene.remove(this.object3D)
        this.scene.remove(this.camera);
        disposeHierarchy(this.object3D, disposeNode);
        disposeHierarchy(this.extGroup, disposeNode);
        this.ProjectorMeshs = [];
        this.defaultMaterial = null;
        this.matToMesh = null;
        this.extGroup = null;
        this.object3D = null;
        this.amb = null;
        this.directLight = null
        this.directLight2 = null;
        this.spotLight = null;
        this.camera = null;
        this.orbitControls.dispose();
        this.orbitControls = null;
        this.scene = null;
        this.renderer = null;
        this.container = null;
        function disposeNode(node) {
            if (node instanceof THREE.Mesh) {
                if (node.geometry) {
                    node.geometry.dispose();
                    node.geometry = null;
                }
                if (node.material) {
                    if (node.material.map) node.material.map.dispose();
                    if (node.material.bumpMap) node.material.bumpMap.dispose();
                    if (node.material.alphaMap) node.material.alphaMap.dispose();
                    node.material.dispose();
                    node.material = null;
                }
            }
        }
        function disposeHierarchy(node, callback) {
            for (var i = node.children.length - 1; i >= 0; i--) {
                var child = node.children[i];
                disposeHierarchy(child, callback);
                callback(child);
                node.remove(child);
                child = null;
            }
        }
    },
    setLight: function(param) {
        var lightConfig = param;
        var ambientColor = new THREE.Color(lightConfig.ambientColor);
        var changeDirColor = new THREE.Color(lightConfig.changeDirColor);
        var pointColor = new THREE.Color(lightConfig.pointColor);
        this.isChangeDirection = lightConfig.directPointer;
        this.amb = new THREE.AmbientLight(ambientColor, lightConfig.ambientIntensity);
        this.directLight = new THREE.DirectionalLight(changeDirColor, lightConfig.directIntensity);
        this.directLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
        this.spotLight = new THREE.PointLight(pointColor, lightConfig.spotIntensity);
        this.spotLight.position.set(lightConfig.pointMoveX, lightConfig.pointMoveY, lightConfig.pointMoveZ);
        this.scene.add(this.spotLight);
        this.scene.add(this.amb);
        this.scene.add(this.directLight2);
        this.scene.add(this.directLight)
    },
    run: function() {
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
    },
    reset: function() {
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
    },
    toCenter: function(shoeInfo) {
        var x1 = getCenterNum(shoeInfo.centx)
        var y1 = getCenterNum(shoeInfo.centy)
        var z1 = getCenterNum(shoeInfo.centz)
        function getCenterNum(cent) {
            var a = parseFloat(cent.split(",")[0])
            var b = parseFloat(cent.split(",")[1])
            return (a + b) / 2
        }
        return new THREE.Vector3(-x1, -z1, y1);
    },
    disTance: function(shoeInfo) {
        var x1 = getCenterNum(shoeInfo.centx)
        var y1 = getCenterNum(shoeInfo.centy)
        var z1 = getCenterNum(shoeInfo.centz)
        function getCenterNum(cent) {
            var a = parseFloat(cent.split(",")[0])
            var b = parseFloat(cent.split(",")[1])
            return (b - a) * (b - a);
        }
        return Math.sqrt(x1 + y1 + z1)
    },
    loadCtmJs: function(param) {
        var url = this.sourceUrl + param.url;
        var extModeUrl = this.sourceUrl + param.extModeUrl;
        var that = this;
        this.loader.loadParts(url, function(geometries, modelName) {
            for (var i = 0; i < geometries.length; i++) {
                var mat = that.defaultMaterial[modelName[i]];
                var mesh = new THREE.Mesh(geometries[i]);
                if (mat.noMaterial) {
                    mesh.material = new THREE.MeshPhongMaterial({ opacity: 0, transparent: true })
                } else {
                    that.setMaterial(mesh, mat);
                }
                mesh.rotation.set(-Math.PI / 2, 0, 0);
                mesh.name = "modeId" + modelName[i];
                mesh.isCustomizable = mat.isCustomizable;
                if (!mat.isDefaultGroup) {
                    that.extGroup.add(mesh);
                } else {
                    that.ProjectorMeshs.push(mesh);
                    that.object3D.add(mesh);
                }
            }
            if (param.callBack) {
                param.callBack();
            }
            that.loader.loadParts(extModeUrl, function(geometries, modelName) {
                for (var i = 0; i < geometries.length; i++) {
                    var mat = that.defaultMaterial[modelName[i]];
                    var mesh = new THREE.Mesh(geometries[i]);
                    if (mat.noMaterial) {
                        mesh.material.opacity = 0;
                        mesh.material.transparent = true;
                    } else {
                        that.setMaterial(mesh, mat);
                    }
                    mesh.name = "modeId" + modelName[i];
                    mesh.isCustomizable = mat.isCustomizable;
                    mesh.rotation.set(-Math.PI / 2, 0, 0);
                    if (!mat.isDefaultGroup) {
                        that.extGroup.add(mesh);
                    } else {
                        that.ProjectorMeshs.push(mesh);
                        that.object3D.add(mesh);
                    }
                }
            })
        }, {
            //useWorker: true
        });
    },
    reloadName: function(d, dGroup) {
        var that = this;
        for (var i = 0; i < dGroup.length; i++) {
            hidedGroupMesh(dGroup[i].mode)
        }
        // this.object3D.getObjectByName("floor").position.set(0, parseFloat(d.minPointy), 0);
        showGroupMesh(d.mode);
        function hidedGroupMesh(mode) {
            var times = mode.length;
            while (times > 0) {
                times--;
                that.hideMesh(mode[times]["modeId"]);
                hidedGroupMesh(mode[times].mode)
            }
        }
        function showGroupMesh(mode) {
            var times = mode.length;
            while (times > 0) {
                times--;
                that.showMesh(mode[times]["modeId"]);
                showGroupMesh(mode[times].mode)
            }
        }
    },
    setDefaultMaterial: function(shoeData) {
        var defaultMaterial = {};
        var matToMesh = {};
        var isCustomizable;
        for (var i = 0; i < shoeData.heel.length; i++) {
            reFindModeId(shoeData.heel[i].mode, shoeData.heel[i].isDefault)
        }
        for (var i = 0; i < shoeData.upper.length; i++) {
            reFindModeId(shoeData.upper[i].mode, shoeData.upper[i].isDefault);
        }
        function reFindModeId(mode, isDefaultGroup) {
            var times = mode.length;
            while (times > 0) {
                times--;
                if (mode[times].noMaterial) {
                    var temp = mode[times]["modeId"];
                    defaultMaterial[temp] = { noMaterial: true };
                    defaultMaterial[temp].isCustomizable = mode[times].isCustomizable;
                    defaultMaterial[temp].isDefaultGroup = isDefaultGroup;
                }
                for (var j = 0; j < mode[times]["materils"].length; j++) {
                    if (mode[times]["materils"][j].isDefault) {
                        for (var k = 0; k < mode[times]["materils"][j].list.length; k++) {
                            var matIdKey = mode[times]["materils"][j].list[k].modeMaterialId;
                            matToMesh[matIdKey] = mode[times]["materils"][j].list[k];
                            matToMesh[matIdKey].isDefaultGroup = isDefaultGroup;
                            if (mode[times]["materils"][j].list[k].isDefault) {
                                var temp = mode[times]["modeId"];
                                defaultMaterial[temp] = mode[times]["materils"][j].list[k]
                                defaultMaterial[temp].isCustomizable = mode[times].isCustomizable;
                            }
                        }
                    } else {
                        for (var k = 0; k < mode[times]["materils"][j].list.length; k++) {
                            var matIdKey = mode[times]["materils"][j].list[k].modeMaterialId;
                            matToMesh[matIdKey] = mode[times]["materils"][j].list[k];
                            matToMesh[matIdKey].isDefaultGroup = isDefaultGroup;
                        }
                    }
                }
                reFindModeId(mode[times].mode, isDefaultGroup)
            }
        }
        this.defaultMaterial = defaultMaterial;
        this.matToMesh = matToMesh;
    },
    hideDecorate: function(mode) {
        var mesh = this.object3D.getObjectByName("modeId" + mode.modeId);
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        mode.materils.map((item) => {
            item.list.map((materialParams) => {
                if (materialParams.ids) {
                    for (var i = 0; i < materialParams.ids.length; i++) {
                        var matId2 = materialParams.ids[i];
                        var matObj = this.matToMesh[matId2];
                        if (matObj) {
                            var mesh = this.object3D.getObjectByName("modeId" + matObj.modeId);
                            mesh.material.transparent = true;
                            mesh.material.opacity = 0;
                        }
                    }
                }
            })
        })
    },
    highLight: function(item) {
        var that = this;
        var mesh = this.object3D.getObjectByName('modeId' + item.modeId);
        moreBright(mesh)
        if (item.isGroup) {
            item.materils.map((child) => {
                if (child.isDefault) {
                    child.list.map((mat) => {
                        if (mat.isDefault) {
                            if (mat.ids) {
                                mat.ids.map((id) => {
                                    let matObj = that.matToMesh[id];
                                    var mesh = this.object3D.getObjectByName("modeId" + matObj.modeId);
                                    moreBright(mesh)
                                })
                            }
                        }
                    })
                }
            })
        }
        function moreBright(mesh) {
            var TEMEMISSIVE;
            if (mesh) {
                TEMEMISSIVE = mesh.customEmissive.clone();
                mesh.material.emissive.copy(TEMEMISSIVE).add({ r: 0.33, g: 0.33, b: 0.33 });
                new TWEEN.Tween(mesh.material.emissive).to({
                    r: TEMEMISSIVE.r,
                    g: TEMEMISSIVE.g,
                    b: TEMEMISSIVE.b
                }, 1000).start()
            }
        }
    },
    setMaterialById: function(modeId, materialParams) {
        var mesh = this.object3D.getObjectByName("modeId" + modeId);
        if (mesh.material) {
            if (mesh.material.map) mesh.material.map.dispose();
            if (mesh.material.bumpMap) mesh.material.bumpMap.dispose();
            if (mesh.material.alphaMap) mesh.material.alphaMap.dispose();
            mesh.material.dispose();
        }
        if (this.defaultMaterial[modeId]) {
            this.defaultMaterial[modeId] = undefined;
        }
        this.setMaterial(mesh, materialParams);
        if (materialParams.ids) {
            for (var i = 0; i < materialParams.ids.length; i++) {
                var matId2 = materialParams.ids[i];
                var matObj = this.matToMesh[matId2];
                if (matObj && matObj.isDefault) {
                    var mesh = this.object3D.getObjectByName("modeId" + matObj.modeId);
                    if (mesh.material) {
                        if (mesh.material.map) mesh.material.map.dispose();
                        if (mesh.material.bumpMap) mesh.material.bumpMap.dispose();
                        if (mesh.material.alphaMap) mesh.material.alphaMap.dispose();
                        mesh.material.dispose();
                    }
                    if (this.defaultMaterial[modeId]) {
                        this.defaultMaterial[modeId] = undefined;
                    }
                    this.setMaterial(mesh, matObj);
                }
            }
        }
    },
    showMesh: function(id) {
        var meshName = "modeId" + id;
        var that = this;
        var mesh = this.extGroup.getObjectByName(meshName);
        if (mesh) {
            this.extGroup.remove(mesh);
            this.object3D.add(mesh);
            this.ProjectorMeshs.push(mesh);
        }
    },
    hideMesh: function(id) {
        var meshName = "modeId" + id;
        var mesh = this.object3D.getObjectByName(meshName);
        if (mesh) {
            this.object3D.remove(mesh);
            this.extGroup.add(mesh);
            this.removeProjectorMesh(meshName);
        }
    },
    removeProjectorMesh: function(meshName) {
        for (var i = 0; i < this.ProjectorMeshs.length; i++) {
            if (this.ProjectorMeshs[i].name == meshName) {
                this.ProjectorMeshs.splice(i, 1);
                break;
            }
        }
    },
    PickObj: function(containerDom, leftHandCallback) {
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var intersection = new THREE.Vector3();
        var offset = new THREE.Vector3();
        var plane = new THREE.Plane();
        var objects = this.ProjectorMeshs;
        var INTERSECTED, SELECTED;
        var that = this;
        var key = true;
        containerDom.onmousemove = function(e) {
            if (key) {
                that.onDocumentMouseMove(e);
            }
        }
        containerDom.onmousedown = function(e) {
            key = false;
            that.onDocumentMouseDown(e, leftHandCallback);
        }
        containerDom.onmouseup = function(e) {
            that.onDocumentMouseUp(e);
        }
        this.onDocumentMouseMove = function(event) {
            var that = this;
            event.preventDefault();
            var x = event.clientX;
            var y = event.clientY;
            var rect = event.target.getBoundingClientRect();
            mouse.x = ((x - rect.left) - RENDERWIDTH / 2) / (RENDERWIDTH / 2);
            mouse.y = (RENDERHEIGHT / 2 - (y - rect.top)) / (RENDERHEIGHT / 2);
            raycaster.setFromCamera(mouse, that.camera);
            var intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) {
                        INTERSECTED.material.emissive.copy(INTERSECTED.customEmissive)
                        if (INTERSECTED == SELECTED) {
                            INTERSECTED.material.emissive = SELECTED.material.emissive
                        } 
                    }
                    INTERSECTED = intersects[0].object;
                    INTERSECTED.material.emissive.add({ r: 0.33, g: 0.33, b: 0.33 });
                }
            } else {
                if (INTERSECTED) {
                    INTERSECTED.material.emissive.copy(INTERSECTED.customEmissive)
                    if (INTERSECTED == SELECTED) {
                        INTERSECTED.material.emissive = SELECTED.material.emissive
                    } else {
                        INTERSECTED.material.emissive.copy(INTERSECTED.customEmissive)
                    }
                }
                INTERSECTED = null;
            }
        }
        this.onDocumentMouseDown = function(event, leftHandCallback) {
            var that = this;
            event.preventDefault();
            raycaster.setFromCamera(mouse, that.camera);
            var intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                if (!intersects[0].object.isCustomizable) {
                    intersects[0].object.material.emissive.copy(intersects[0].object.customEmissive)
                    return;
                }
                
                SELECTED = intersects[0].object;
                SELECTED.material.emissive.copy(SELECTED.customEmissive).add({ r: 0.33, g: 0.33, b: 0.33 });
                if (leftHandCallback) {
                    leftHandCallback(SELECTED.name);
                }
                new TWEEN.Tween(SELECTED.material.emissive).to({
                        r: SELECTED.customEmissive.r,
                        g: SELECTED.customEmissive.g,
                        b: SELECTED.customEmissive.b
                    }, 1000).start()
                    console.log("--------------xuanzhong de mo xing")
                    console.log(SELECTED);
            }
        }
        this.onDocumentMouseUp = function(event) {
            key = true;
            event.preventDefault();
        }
    },
    rotateTexture: function(mesh, angle) {
        if (!mesh.tempArr) {
            mesh.tempArr = mesh.geometry.attributes.uv.array.slice();
        } else {
            mesh.geometry.attributes.uv.array = mesh.tempArr.slice();
        }
        var e = angle / 180 * Math.PI;
        var ce = Math.cos(e);
        var se = Math.sin(e);
        for (var i = 0, l = mesh.geometry.attributes.uv.array.length; i < l; i += 2) {
            var x = mesh.geometry.attributes.uv.array[i];
            var y = mesh.geometry.attributes.uv.array[i + 1]
            mesh.geometry.attributes.uv.array[i] = ce * x - se * y + (1 - ce) * 0.5 + se * 0.5;
            mesh.geometry.attributes.uv.array[i + 1] = se * x + ce * y + (1 - ce) * 0.5 - se * 0.5
        }
        mesh.geometry.attributes.uv.needsUpdate = true;
    },
    setMaterial: function(mesh, materialParams) {
        var material;
        if (materialParams) {
            if (materialParams.angle) {
                this.rotateTexture(mesh, materialParams.angle);
            }
            material = this.convertMaterial(materialParams);
        } else {
            material = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
        }
        mesh.material = material;
        mesh.customEmissive = material.emissive.clone();
    },
    convertMaterial: function(materialParams) {
        var that = this;
        var material, emissiveVal, reflectionCube;
        if (!materialParams.emissive) {
            emissiveVal = new THREE.Color(0x000000)
        } else {
            emissiveVal = new THREE.Color(materialParams.emissive)
        }
        if (materialParams.opacity === null) {
            materialParams.opacity = 1;
        }
        if (materialParams.envMap&&materialParams.envMap != "null") {
            var pic = this.sourceUrl + materialParams.envMap;
            console.log(pic);
            var url = [
                pic, pic,
                pic, pic,
                pic, pic
            ]
            reflectionCube = this.cubeTextureLoader.load(url);
            reflectionCube.format = THREE.RGBFormat;
            reflectionCube.mapping = materialParams.mappingType;
        } else {
            reflectionCube = null;
        }
        var map, bumpMap, alphaMap;
        if (materialParams.map && materialParams.map != "null") {
            map = that.textureLoader.load(this.sourceUrl + materialParams.map);
        }else{
            map=null;
        }
        if (materialParams.bumpMap && materialParams.bumpMap != "null") {
            bumpMap = that.textureLoader.load(this.sourceUrl + materialParams.bumpMap)
        }else{
            bumpMap=null;
        }
        if (materialParams.alphaMap && materialParams.alphaMap != "null") {
            alphaMap = that.textureLoader.load(this.sourceUrl + materialParams.alphaMap)
        }else{
            alphaMap=null;
        }
        if (materialParams.material3d.type == 1) {
            material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(materialParams.color),
                metalness: materialParams.metalness,
                roughness: materialParams.roughness,
                transparent: materialParams.transparent,
                opacity: materialParams.opacity,
                map: map,
                side: materialParams.side,
                emissive: emissiveVal,
                bumpMap: bumpMap,
                bumpScale: materialParams.bumpScale,
                alphaMap: alphaMap,
                envMap: reflectionCube,
                reflectivity: materialParams.reflectivity,
                refractionRatio: materialParams.refractionRatio
            });
        } else {
            material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(materialParams.color),
                specular: new THREE.Color(materialParams.specular),
                shininess: materialParams.shininess,
                transparent: materialParams.transparent,
                opacity: materialParams.opacity,
                map: map,
                side: materialParams.side,
                emissive: emissiveVal,
                bumpMap: bumpMap,
                bumpScale: materialParams.bumpScale,
                alphaMap: alphaMap,
                envMap: reflectionCube,
                reflectivity: materialParams.reflectivity,
                refractionRatio: materialParams.refractionRatio
            });
        }
        setMap(material.map);
        setMap(material.bumpMap);
        setMap(material.alphaMap);
        function setMap(map) {
            if (!map) return;
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.minFilter = map.magFilter = THREE.LinearFilter;
            map.offset.set(materialParams.offsetx, materialParams.offsety);
            map.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
        }
        material.needsUpdate = true;
        return material;
    },
   
    loadCtmRecusively: function(shoeData, url) {
        var that = this;
        for (var i = 0; i < shoeData.heel.length; i++) {
            reLoads(shoeData.heel[i].mode, shoeData.heel[i].isDefault);
        }
        for (var i = 0; i < shoeData.upper.length; i++) {
            reLoads(shoeData.upper[i].mode, shoeData.upper[i].isDefault);
        }
        function reLoads(mode, isDefault) {
            var times = mode.length;
            while (times > 0) {
                times--;
                if (mode[times]["modeUrl"]) {
                    that.addMesh({
                        url: url + mode[times]["modeUrl"],
                        modeID: mode[times]["modeId"],
                        isDefault: isDefault
                    })
                }
                reLoads(mode[times].mode, isDefault)
            }
        }
    },
    addMesh: function(param) {
        var that = this;
        var url = param.url;
        this.loader.load(url, function(data) {
            var mat = that.defaultMaterial[param.modeID];
            var mesh = new THREE.Mesh(data);
            mesh.castShadow = true;
            that.setMaterial(mesh, mat);
            mesh.name = "modeId" + param.modeID;
            if (mat) {
                mesh.isCustomizable = mat.isCustomizable;
            }
            mesh.rotation.set(-Math.PI / 2, 0, 0);
            if (!param.isDefault) {
                that.extGroup.add(mesh);
            } else {
                that.ProjectorMeshs.push(mesh);
                that.object3D.add(mesh);
            }
        });
    }
}
export default new ModeScene();
