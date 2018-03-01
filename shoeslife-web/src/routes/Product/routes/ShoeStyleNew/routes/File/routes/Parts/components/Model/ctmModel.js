import { IMG_URL } from 'static/apiAlias';
import TWEEN from './tween.min.js';
export function CTMModel(shoeData) {
    Sim.Object.call(this);
    this.shoeData = shoeData;
    this.ProjectorMeshs = [];
    this.sonGroupName = [];
    this.sourceUrl = IMG_URL;
    this.init(shoeData);
}
CTMModel.prototype = new Sim.Object();
CTMModel.prototype.init = function(shoeData) {
    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.crossOrigin = '';
    var that = this;
    var group = new THREE.Object3D;
    this.setObject3D(group);
    var x1 = this.getCenterNum(shoeData.shoe.centx)
    var y1 = this.getCenterNum(shoeData.shoe.centy)
    var z1 = this.getCenterNum(shoeData.shoe.centz)
    this.object3D.position.set(-x1, -z1, y1);
    var planeGeometry = new THREE.PlaneGeometry(800, 800, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x666666, opacity: 0.1, transparent: true });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.name = "floor";
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    var a = parseFloat(shoeData.shoe.centz.split(",")[0]);
    plane.position.set(0, a, 0);
    this.object3D.add(plane)
    this.loader = new THREE.CTMLoader();
}
CTMModel.prototype.getCenterNum = function(cent) {
        var a = parseFloat(cent.split(",")[0])
        var b = parseFloat(cent.split(",")[1])
        return (a + b) / 2
    }
    //添加模型
CTMModel.prototype.addMesh = function(param) {
        var that = this;
        var url = this.sourceUrl + param.url;
        var material = param.material;
        var fullMesh = param.fullMesh;
        var groupName = param.groupName;
        if (url) {
            this.loader.load(url, function(data) {
                data.name = "modeId" + param.modeID;
                data.parentId = param.parentId;
                data.isEye = param.isEye;
                that.handleLoaded(data, material, groupName, fullMesh);
                if (param.isToCenter && param.groupName && param.meshLoadFinish == 0) {}
            });
        } else {
            console.warn("url is err")
        }
    }
    //处理模型
CTMModel.prototype.handleLoaded = function(data, material, groupName, fullMesh) {
        var mesh = new THREE.Mesh(data);
        mesh.name = data.name;
        mesh.parentId = data.parentId;
        mesh.isEye = data.isEye;
        mesh.castShadow = true;
        this.setMaterial(mesh, material, fullMesh);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        if (groupName) {
            this.object3D.getObjectByName(groupName).add(mesh);
            this.ProjectorMeshs.push(mesh);
        } else {
            this.object3D.add(mesh);
            this.ProjectorMeshs.push(mesh);
        }
        if (!mesh.isEye) {
            mesh.material.transparent = true;
            mesh.material.opacity = 0;
            mesh.material.depthTest = false;
            this.removeProjectorMesh(mesh.name);
        }
    }
    //设置材质
CTMModel.prototype.setMaterial = function(mesh, materialParams, fullMesh) {
        var material;
        if (materialParams) {
            if (materialParams.angle) {
                this.rotateTexture(mesh, materialParams.angle);
            }
            material = this.convertMaterial(materialParams);
        } else {
            material = new THREE.MeshPhongMaterial({ color: 0x566782, side: THREE.DoubleSide })
        }
        if (fullMesh) {
            mesh.materialData = fullMesh;
        }
        mesh.material = material;
        mesh.isUsingMat = {
            transparent: material.transparent,
            opacity: material.opacity
        }
        if (mesh.name == "modeId" + this.haveChoosed) {
            this.haveChoosedMesh = mesh;
            // mesh.material.emissive = new THREE.Color(0x555555);
        }
    }
    //转换后台材质为模型可用材质
CTMModel.prototype.convertMaterial = function(materialParams) {

    
    var that = this;
    var material, emissiveVal;
    if (!materialParams.emissive) {
        emissiveVal = new THREE.Color(0x000000)
    } else {
        emissiveVal = new THREE.Color(materialParams.emissive)
    }
    if (materialParams.material3d.type == 1) {
        var map, bumpMap, alphaMap;
        if (materialParams.map && materialParams.map != "null") {
            map = that.textureLoader.load(this.sourceUrl + materialParams.map);
        } else {
            map = null;
        }
        if (materialParams.bumpMap && materialParams.bumpMap != "null") {
            bumpMap = that.textureLoader.load(this.sourceUrl + materialParams.bumpMap)
        } else {
            bumpMap = null;
        }
        if (materialParams.alphaMap && materialParams.alphaMap != "null") {
            alphaMap = that.textureLoader.load(this.sourceUrl + materialParams.alphaMap)
        } else {
            alphaMap = null;
        }
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
            alphaMap: alphaMap
        });
        // if (material.opacity < 1.0 && material.transparent == true) {
        //     material.side = THREE.FrontSide;
        //     // material.depthTest=false;
        // } else {
        //     material.side = THREE.DoubleSide;
        // }
    } else {
        var map, bumpMap, alphaMap;
        if (materialParams.map && materialParams.map != "null") {
            map = that.textureLoader.load(this.sourceUrl + materialParams.map);
        } else {
            map = null;
        }
        if (materialParams.bumpMap && materialParams.bumpMap != "null") {
            bumpMap = that.textureLoader.load(this.sourceUrl + materialParams.bumpMap)
        } else {
            bumpMap = null;
        }
        if (materialParams.alphaMap && materialParams.alphaMap != "null") {
            alphaMap = that.textureLoader.load(this.sourceUrl + materialParams.alphaMap)
        } else {
            alphaMap = null;
        }
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
            alphaMap: alphaMap
        });
        // if (material.opacity < 1.0 && material.transparent == true) {
        //     material.side = THREE.FrontSide;
        //     // material.depthTest=false;
        // } else {
        //     material.side = THREE.DoubleSide;
        // }
    }
    if (material.map) {
        material.map.wrapS = THREE.RepeatWrapping;
        material.map.wrapT = THREE.RepeatWrapping;
        material.map.minFilter = material.map.magFilter = THREE.LinearFilter;
        material.map.offset.set(materialParams.offsetx, materialParams.offsety);
        material.map.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
    }
    if (material.bumpMap) {
        material.bumpScale = materialParams.bumpScale;
        material.bumpMap.wrapS = THREE.RepeatWrapping;
        material.bumpMap.wrapT = THREE.RepeatWrapping;
        material.bumpMap.minFilter = material.bumpMap.magFilter = THREE.LinearFilter;
        material.bumpMap.offset.set(materialParams.offsetx, materialParams.offsety);
        material.bumpMap.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
    }
    if (material.alphaMap) {
        material.alphaMap.wrapS = THREE.RepeatWrapping;
        material.alphaMap.wrapT = THREE.RepeatWrapping;
        material.alphaMap.minFilter = material.alphaMap.magFilter = THREE.LinearFilter;
        material.alphaMap.offset.set(materialParams.offsetx, materialParams.offsety);
        material.alphaMap.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
    }
    material.needsUpdate = true;
    return material;
}
CTMModel.prototype.findGroupById = function(id) {
    var groupName = "styleId" + id;
    var group = this.object3D.getObjectByName(groupName);
    return group;
}
CTMModel.prototype.findMeshById = function(id) {
    var meshName = "modeId" + id;
    var mesh = this.object3D.getObjectByName(meshName);
    // if (this.haveChoosedMesh) {
    //     this.haveChoosedMesh.material.emissive = new THREE.Color(0x000000);
    //     this.haveChoosedMesh = null;
    // }
    this.haveChoosedMesh = mesh;
    var tempEmissive = mesh.material.emissive.clone();
    mesh.material.emissive.add({ r: 0.33, g: 0.33, b: 0.33 });
    new TWEEN.Tween(mesh.material.emissive).to({
            r: tempEmissive.r,
            g: tempEmissive.g,
            b: tempEmissive.b
        }, 1000).start()
        // return mesh;
}
CTMModel.prototype.setCurrentMaterial = function(materialParams) {
    if (this.haveChoosedMesh.material) {
        if (this.haveChoosedMesh.material.texture) {
            this.haveChoosedMesh.material.texture.dispose();
        }
        this.haveChoosedMesh.material.dispose();
    }
    this.setMaterial(this.haveChoosedMesh, materialParams)
}
CTMModel.prototype.hideGroup = function(id) {
    var group = this.findGroupById(id);
    var that = this;
    if (group.children.length > 0) {
        group.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.depthTest = false;
                that.removeProjectorMesh(child.name);
            }
        })
    } else {}
}
CTMModel.prototype.showGroup = function(id) {
    var group = this.findGroupById(id);
    var that = this;
    group.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.needsUpdate = true;
            child.material.depthTest = true;
            if (child.isUsingMat) {
                child.material.transparent = child.isUsingMat.transparent;
                child.material.opacity = child.isUsingMat.opacity;
            } else {
                child.material.transparent = false;
            }
            that.ProjectorMeshs.push(child);
        }
    });
}
CTMModel.prototype.showMesh = function(id) {
    var meshName = "modeId" + id;
    var that = this;
    var mesh = this.object3D.getObjectByName(meshName);
    if (!mesh) {
        this.object3D.traverse(function(child) {
            if (child.parentId == id) {
                child.material.transparent = false;
                child.material.opacity = 1.0
                that.ProjectorMeshs.push(child);
            }
        })
        return;
    }
    if (mesh.isUsingMat) {
        mesh.material.transparent = mesh.isUsingMat.transparent;
        mesh.material.opacity = mesh.isUsingMat.opacity;
    } else {
        mesh.material.transparent = false;
        mesh.material.opacity = 1;
    }
    this.ProjectorMeshs.push(mesh);
}
CTMModel.prototype.hideMesh = function(id) {
        var meshName = "modeId" + id;
        var mesh = this.object3D.getObjectByName(meshName);
        var that = this;
        if (!mesh) {
            this.object3D.traverse(function(child) {
                if (child.parentId == id) {
                    child.material.transparent = true;
                    child.material.opacity = 0;
                    child.material.depthTest = false;
                    that.removeProjectorMesh(child.name);
                }
            })
            return;
        }
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        this.removeProjectorMesh(meshName);
    }
    //移除模型部件
CTMModel.prototype.removeMesh = function(meshName) {
        var that = this;
        var url = param.url || "";
        this.object3D.remove(this.object3D.getObjectByName(meshName));
    }
    //将模型至为中间
CTMModel.prototype.setToCenter = function(group) {
        var bbox = new THREE.Box3().setFromObject(group)
        var mdlen = bbox.max.x + bbox.min.x;
        var mdhei = bbox.max.y + bbox.min.y;
        var mdwid = bbox.max.z + bbox.min.z;
        group.position.set(-mdlen / 2, -mdhei / 2, -mdwid / 2);
        var planeGeometry = new THREE.PlaneGeometry(300, 300, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 0.1, transparent: true });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = (bbox.min.y - bbox.max.y) / 2;
        group.parent.add(plane);
        group.parent.position.y -= 50;
    }
    //移除数组中指定的模型
CTMModel.prototype.removeProjectorMesh = function(meshName) {
        for (var i = 0; i < this.ProjectorMeshs.length; i++) {
            if (this.ProjectorMeshs[i].name == meshName) {
                this.ProjectorMeshs.splice(i, 1);
                break;
            }
        }
    }
    //模型拾取
CTMModel.prototype.PickObj = function(containerDom, leftHandCallback, rightHandCallback) {
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var intersection = new THREE.Vector3();
        var offset = new THREE.Vector3();
        var plane = new THREE.Plane();
        var objects = this.ProjectorMeshs;
        var INTERSECTED, SELECTED, TEMEMISSIVE, TEMEMISSIVEADDED;
        var that = this;
        var key = true;

        containerDom.onmousemove = function(e) {
            if (key) {
                that.onDocumentMouseMove(e);
            }
        }
        containerDom.onmousedown = function(e) {
            key = false;
            that.onDocumentMouseDown(e, leftHandCallback, rightHandCallback);
        }
        containerDom.onmouseup = function(e) {
            that.onDocumentMouseUp(e);
        }
        this.onDocumentMouseMove = function(event) {
            event.preventDefault();
            var x = event.clientX;
            var y = event.clientY;
            var rect = event.target.getBoundingClientRect();
            mouse.x = ((x - rect.left) - containerDom.clientWidth / 2) / (containerDom.clientWidth / 2);
            mouse.y = (containerDom.clientHeight / 2 - (y - rect.top)) / (containerDom.clientHeight / 2);
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) {

                        INTERSECTED.material.emissive.copy(TEMEMISSIVE)

                        if (INTERSECTED == SELECTED) {

                            INTERSECTED.material.emissive = SELECTED.material.emissive
                        } else { INTERSECTED.material.emissive.copy(TEMEMISSIVE) }
                    }
                    INTERSECTED = intersects[0].object;
                    TEMEMISSIVE = INTERSECTED.material.emissive.clone();

                    INTERSECTED.material.emissive.add({ r: 0.33, g: 0.33, b: 0.33 });
                    TEMEMISSIVEADDED = INTERSECTED.material.emissive.clone();


                }
            } else {
                if (INTERSECTED) {
                    INTERSECTED.material.emissive.copy(TEMEMISSIVE)
                    if (INTERSECTED == SELECTED) {
                        INTERSECTED.material.emissive = SELECTED.material.emissive
                    } else { INTERSECTED.material.emissive.copy(TEMEMISSIVE) }
                }
                INTERSECTED = null;
            }
        }
        this.onDocumentMouseDown = function(event, leftHandCallback) {

            event.preventDefault();
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                if (this.haveChoosedMesh) {
                    //this.haveChoosedMesh.material.emissive = new THREE.Color(0x000000);
                }
                if (SELECTED) {
                    //SELECTED.material.emissive = new THREE.Color(0x000000);
                }
                SELECTED = intersects[0].object

                SELECTED.material.emissive.copy(TEMEMISSIVEADDED)
                this.haveChoosedMesh = SELECTED;
                leftHandCallback(SELECTED.materialData);
                new TWEEN.Tween(SELECTED.material.emissive).to({
                    r: TEMEMISSIVE.r,
                    g: TEMEMISSIVE.g,
                    b: TEMEMISSIVE.b
                }, 1000).start()
                console.log("--------------xuanzhong de mo xing")
                console.log(SELECTED);
            } else {
                if (SELECTED) {
                    // SELECTED.material.emissive = new THREE.Color(0x000000);
                }
            }
        }
        this.onDocumentMouseUp = function(event) {
            key = true;
            event.preventDefault();
        }
    }
    //旋转贴图
CTMModel.prototype.rotateTexture = function(mesh, angle) {
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
}
CTMModel.prototype.addDiffuseMap = function(mesh, diffuseTexture) {
    mesh.material.map = this.textureLoader.load(diffuseTexture);
    mesh.material.needsUpdate = true;
    mesh.material.map.needsUpdate = true;
}
CTMModel.prototype.addBumpMap = function(mesh, normalTexture) {
    mesh.material.bumpMap = this.textureLoader.load(normalTexture);
    mesh.material.needsUpdate = true;
    mesh.material.bumpScale = 3.0;
    mesh.material.bumpMap.needsUpdate = true;
}
CTMModel.prototype.removeDiffuseMap = function(mesh) {
    mesh.material.map.dispose();
    mesh.material.needsUpdate = true;
}
CTMModel.prototype.removeBumpMap = function(mesh) {
    mesh.material.bumpMap.dispose();
    mesh.material.needsUpdate = true;
}
CTMModel.prototype.clearAll = function() {
    this.ProjectorMeshs = null;
    var a = this.object3D.children
    for (var i = this.object3D.children.length - 1; i >= 0; i--) {
        var obj = this.object3D.children[i];
        for (var j = obj.children.length - 1; j >= 0; j--) {
            var m = obj.children[j];
            if (m.material.map) {
                m.material.map.dispose();
            }
            m.material.dispose();
            m.geometry.dispose();
            obj.remove(m);
        }
        this.object3D.remove(obj);
    }
    this.object3D = null;
}
