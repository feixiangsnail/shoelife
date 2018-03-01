 import TWEEN from './tween.min.js';
 export function CTMModel(shoeData, camera, url) {
     this.init(shoeData, url);
     console.log(shoeData)
     this.camera = camera;
 }
 CTMModel.prototype.init = function(shoeData, url) {
         this.shoeData = shoeData;
         this.ProjectorMeshs = [];
         this.setDefaultMaterial();
         this.sourceUrl = url;
         this.textureLoader = new THREE.TextureLoader();
         this.textureLoader.crossOrigin = '';
         this.object3D = new THREE.Object3D;
         this.extGroup = new THREE.Object3D;
         var center = this.toCenter(shoeData)
         this.object3D.position.copy(center)
         var planeGeometry = new THREE.PlaneGeometry(800, 800, 1, 1);
         var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x666666, opacity: 0.1, transparent: true });
         var plane = new THREE.Mesh(planeGeometry, planeMaterial);
         plane.name = "floor";
         plane.receiveShadow = true;
         plane.rotation.x = -0.5 * Math.PI;
         var a = parseFloat(shoeData.shoe.centz.split(",")[0]);
         plane.position.set(0, a, 0);
         this.object3D.add(plane);
         this.plane = plane;
         this.loader = new THREE.CTMLoader();
     }
     //取中间值
 CTMModel.prototype.toCenter = function(shoeData) {
     var x1 = getCenterNum(shoeData.shoe.centx)
     var y1 = getCenterNum(shoeData.shoe.centy)
     var z1 = getCenterNum(shoeData.shoe.centz)
     function getCenterNum(cent) {
         var a = parseFloat(cent.split(",")[0])
         var b = parseFloat(cent.split(",")[1])
         return (a + b) / 2
     }
     return new THREE.Vector3(-x1, -z1, y1);
 }
 CTMModel.prototype.loadCtmJs = function(param) {
         var url = this.sourceUrl + param.url;
         var extModeUrl = this.sourceUrl + param.extModeUrl;
         var that = this;
         this.loader.loadParts(url, function(geometries, modelName) {
             for (var i = 0; i < geometries.length; i++) {
                 var mat = that.defaultMaterial[modelName[i]];
                 var mesh = new THREE.Mesh(geometries[i]);
                 //mesh.castShadow = true;
                 that.setMaterial(mesh, mat);
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
             if (param.callBack) {
                 param.callBack();
             }
             that.loader.loadParts(extModeUrl, function(geometries, modelName) {
                 for (var i = 0; i < geometries.length; i++) {
                     var mat = that.defaultMaterial[modelName[i]];
                     var mesh = new THREE.Mesh(geometries[i]);
                     // mesh.castShadow = true;
                     that.setMaterial(mesh, mat);
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
     }
     //切换部位显示。
 CTMModel.prototype.reloadName = function(d, dGroup) {
         var that = this;
         for (var i = 0; i < dGroup.length; i++) {
             hidedGroupMesh(dGroup[i].mode)
         }
         this.object3D.getObjectByName("floor").position.set(0, parseFloat(d.minPointy), 0);
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
     }
     //将模型所对应的材质找出来，放入defaultMaterial中；将材质所对应的模型也找出来放入matToMesh中
 CTMModel.prototype.setDefaultMaterial = function(id) {
         var shoeData = this.shoeData;
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
     }
     //隐藏装饰
 CTMModel.prototype.hideDecorate = function(mode) {
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
 }
 CTMModel.prototype.highLight = function(item) {
    
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
         if (mesh) {
             mesh.material.emissive = new THREE.Color(0x555555);
             new TWEEN.Tween(mesh.material.emissive).to({
                 r: 0,
                 g: 0,
                 b: 0
             }, 1000).start()
         }
     }
 }
 CTMModel.prototype.setMaterialById = function(modeId, materialParams) {
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
             if (matObj) {
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
 }
 CTMModel.prototype.showMesh = function(id) {
     var meshName = "modeId" + id;
     var that = this;
     var mesh = this.extGroup.getObjectByName(meshName);
     if (mesh) {
         this.extGroup.remove(mesh);
         this.object3D.add(mesh);
         this.ProjectorMeshs.push(mesh);
     }
 }
 CTMModel.prototype.hideMesh = function(id) {
         var meshName = "modeId" + id;
         var mesh = this.object3D.getObjectByName(meshName);
         if (mesh) {
             this.object3D.remove(mesh);
             this.extGroup.add(mesh);
             this.removeProjectorMesh(meshName);
         }
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
 CTMModel.prototype.PickObj = function(containerDom, leftHandCallback) {
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
             mouse.x = ((x - rect.left) - containerDom.clientWidth / 2) / (containerDom.clientWidth / 2);
             mouse.y = (containerDom.clientHeight / 2 - (y - rect.top)) / (containerDom.clientHeight / 2);
             raycaster.setFromCamera(mouse, that.camera);
             var intersects = raycaster.intersectObjects(objects);
             if (intersects.length > 0) {
                 if (INTERSECTED != intersects[0].object) {
                     if (INTERSECTED) {
                         INTERSECTED.material.emissive = new THREE.Color(0x000000);
                         if (INTERSECTED == SELECTED) {
                             INTERSECTED.material.emissive = SELECTED.material.emissive
                         } else { INTERSECTED.material.emissive = new THREE.Color(0x000000); }
                     }
                     INTERSECTED = intersects[0].object;
                     INTERSECTED.material.emissive = new THREE.Color(0x555555);
                 }
             } else {
                 if (INTERSECTED) {
                     INTERSECTED.material.emissive = new THREE.Color(0x000000);
                     if (INTERSECTED == SELECTED) {
                         INTERSECTED.material.emissive = SELECTED.material.emissive
                     } else { INTERSECTED.material.emissive = new THREE.Color(0x000000); }
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

                     intersects[0].object.material.emissive = new THREE.Color(0x000000);
                     return;
                 }
                 if (SELECTED) {
                     SELECTED.material.emissive = new THREE.Color(0x000000);
                 }
                 SELECTED = intersects[0].object
                 SELECTED.material.emissive = new THREE.Color(0.33, 0.33, 0.33)
                 leftHandCallback(SELECTED.name);
                 new TWEEN.Tween(SELECTED.material.emissive).to({
                     r: 0,
                     g: 0,
                     b: 0
                 }, 1000).start()
             } else {
                 if (SELECTED) {
                     SELECTED.material.emissive = new THREE.Color(0x000000);
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
     //设置材质
 CTMModel.prototype.setMaterial = function(mesh, materialParams) {
    
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
         // mesh.isUsingMat = {
         //     transparent: material.transparent,
         //     opacity: material.opacity
         // }
         // if (mesh.name == "modeId" + this.haveChoosed) {
         //     this.haveChoosedMesh = mesh;
         //     mesh.material.emissive = new THREE.Color(0x555555);
         // }
     }
     //转换后台材质为模型可用材质
 CTMModel.prototype.convertMaterial = function(materialParams) {
         var that = this;
         var material;
         if (materialParams.opacity === null) {
             materialParams.opacity = 1;
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
                 side: THREE.DoubleSide,
                 bumpMap: bumpMap,
                 bumpScale: materialParams.bumpScale,
                 alphaMap: alphaMap
             });
             if (material.opacity < 1.0 && material.transparent == true) {
                 material.side = THREE.FrontSide;
             }
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
                 side: THREE.DoubleSide,
                 bumpMap: bumpMap,
                 bumpScale: materialParams.bumpScale,
                 alphaMap: alphaMap
             });
             if (material.opacity < 1.0 && material.transparent == true) {
                 material.side = THREE.FrontSide;
             }
         }
         if (material.map) {
             material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
             material.map.minFilter = material.map.magFilter = THREE.LinearFilter;
             material.map.offset.set(materialParams.offsetx, materialParams.offsety);
             material.map.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
         }
         if (material.bumpMap) {
             material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
             material.bumpMap.minFilter = material.bumpMap.magFilter = THREE.LinearFilter;
             material.bumpMap.offset.set(materialParams.offsetx, materialParams.offsety);
             material.bumpMap.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
         }
         if (material.alphaMap) {
             material.alphaMap.wrapS = material.alphaMap.wrapT = THREE.RepeatWrapping;
             material.alphaMap.minFilter = material.alphaMap.magFilter = THREE.LinearFilter;
             material.alphaMap.offset.set(materialParams.offsetx, materialParams.offsety);
             material.alphaMap.repeat.set(materialParams.scaleValuex, materialParams.scaleValuey);
         }
         material.needsUpdate = true;
         return material;
     }
     //释放内存
 CTMModel.prototype.clearAll = function() {
         this.ProjectorMeshs = null;
         this.defaultMaterial = null;
         this.matToMesh = null;
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
         disposeHierarchy(this.extGroup, disposeNode);
         disposeHierarchy(this.object3D, disposeNode);
         this.extGroup = null;
         this.object3D = null;
     }
     //-------------------从后台加载----------
 CTMModel.prototype.loadCtmRecusively = function(url) {
     var that = this;
     for (var i = 0; i < this.shoeData.heel.length; i++) {
         reLoads(this.shoeData.heel[i].mode, this.shoeData.heel[i].isDefault);
     }
     for (var i = 0; i < this.shoeData.upper.length; i++) {
         reLoads(this.shoeData.upper[i].mode, this.shoeData.upper[i].isDefault);
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
 }
 CTMModel.prototype.addMesh = function(param) {
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
