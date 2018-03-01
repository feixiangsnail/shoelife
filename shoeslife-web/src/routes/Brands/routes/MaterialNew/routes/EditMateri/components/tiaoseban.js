export function PanelModel(param) {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.materialData = {};
    this.init(param);
}
PanelModel.prototype.init = function(param) {
    param = param || {};
    var container = param.container;
    var renderWidth=param.size;
    var renderHeight=param.size;
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xcccccc);
    renderer.setSize(renderWidth,renderHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 1, 100000);
    camera.position.set(0, 100, 400);
    scene.add(camera);
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    var light = new THREE.PointLight(0xffffff, 0.75);
    light.position.set(-12, 4.6, 5.4);
    light.position.multiplyScalar(30);
    scene.add(light);
    var directLight = new THREE.DirectionalLight(0xffffff, 1);
    directLight.position.set(0, -2, -10).normalize();
    scene.add(directLight);
    var directLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directLight2.position.set(0, 0, 10).normalize();
    scene.add(directLight2);
    scene.add(new THREE.AmbientLight(0xcccccc));
    this.orbitControls = orbitControls;
    this.container = container;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.addModel(param.url, param.materialParams);
    this.run();
}
PanelModel.prototype.addModel = function(url, materialParams) {

    var loaderCTM = new THREE.CTMLoader();
    var scale = new THREE.Vector3(30, 30, 30);
    var group = new THREE.Object3D();

    group.name = 'group1';
    this.scene.add(group);
    this.group = group;
   var that=this;

    loaderCTM.loadParts(url, function(geometries) {
        for (var i = 0; i < geometries.length; i++) {
            var mesh = new THREE.Mesh(geometries[i]);

            mesh.rotation.set(-Math.PI / 2, 0, 0);

            group.add(mesh);
            if(i==geometries.length-1){
                 that.setMaterial(materialParams);
            }
        }
        var bbox = new THREE.Box3().setFromObject(group)
        var mdlen = bbox.max.x - bbox.min.x;
        var mdwid = bbox.max.z - bbox.min.z;
        var mdhei = bbox.max.y - bbox.min.y;
        var centerpoint = new THREE.Vector3();
        var x1 = bbox.min.x + mdlen / 2;
        var y1 = bbox.min.y + mdhei / 2;
        var z1 = bbox.min.z + mdwid / 2;
        group.position.set(-x1, -y1, -z1);
    }, {
        // useWorker: true
    });

}
PanelModel.prototype.setMaterial = function(materialParams,type) {

    var material;
    if (materialParams) {
        if (type) {
            material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(materialParams.color) ,
                metalness: materialParams.metalness ,
                roughness: materialParams.roughness ,
                transparent: materialParams.transparent,
                opacity: materialParams.opacity ,
                side: THREE.DoubleSide
            });
        } else {

            material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(materialParams.color) ,
                specular: new THREE.Color(materialParams.specular),
                shininess: materialParams.shininess,
                transparent: materialParams.transparent ,
                opacity: materialParams.opacity ,
                side: THREE.DoubleSide,
            });
        }
    } else {

        material = new THREE.MeshPhongMaterial({
            color: 0x998722,
            specular: 0x000000,
            shininess: 30,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide,
        })
    }

    for (var i = 0; i < this.group.children.length; i++) {
        this.group.children[i].material = material;
    }
    this.convertToMaterialData(material)
}
PanelModel.prototype.convertToMaterialData = function(currentMaterial) {
    this.materialData.color = "#" + currentMaterial.color.getHexString();
    if(currentMaterial.specular){
      this.materialData.specular = "#" + currentMaterial.specular.getHexString();
    }

    this.materialData.shininess = currentMaterial.shininess;
    this.materialData.transparent = currentMaterial.transparent;
    this.materialData.opacity = currentMaterial.opacity;
    this.materialData.metalness = currentMaterial.metalness;
    this.materialData.roughness = currentMaterial.roughness;
}

PanelModel.prototype.run = function() {
    this.renderer.render(this.scene, this.camera);
    var that = this;
    requestAnimationFrame(function() { that.run(); });
}
