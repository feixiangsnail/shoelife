/**
 * 调色板配置
 * @param  string url 路径
 * @param  string size 调色版大小
 * @return function succ 回调
 */
export function shoethree(config) {
    var scene, camera, renderer,palette,lightings,orbitControls
      ,size = config.size
    ;
    //相机场景初始化
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, size / size, 0.1, 10000);

    camera.position.set(0, 100, 400);
    camera.lookAt(scene.position);
    //渲染器初始化

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    //渲染器设置
    renderer.setSize(size, size);
    renderer.setClearColor( 0xcccccc);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    //相机控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    //配置灯光
    lightings = lighting();
    for(var i in lightings){
      scene.add(lightings[i]);
    }

    //初始化加载器
    var loaderCTM = new THREE.CTMLoader();

    var scale = new THREE.Vector3(30, 30, 30);
    var group = new THREE.Object3D();
    group.name = 'group1';
    scene.add(group);
    //加载 加载器
    var meshMaterial = new THREE.MeshPhongMaterial({
      color: 'blue',
      side: THREE.DoubleSide
    })
      //加载模型
    loaderCTM.loadParts(config.url, function(geometries, modelName) {

      var bbox,postion = {x:'',y:'',z:''} ;
      for (var i = 0; i < geometries.length; i++) {

        var mesh = new THREE.Mesh(geometries[i], meshMaterial);
        mesh.name = modelName[i];

        mesh.rotation.set(-Math.PI / 2, 0, 0);
        group.add(mesh);

      }
      bbox = new THREE.Box3().setFromObject(group);
      for(var i in postion){
        postion[i] = bbox.max[i] - bbox.min[i];
        postion[i] = bbox.min[i] + postion[i] / 2;
      }
      group.position.set(-postion.x, -postion.y, -postion.z);

    }, {
    });
    //渲染
    function render() {
      requestAnimationFrame(render)
      orbitControls.update();
      renderer.render(scene, camera);
    }
    palette = setSpGui(meshMaterial);

    setMaterial(meshMaterial,config.material);
    updateDisplay(config.material,palette.spGui);
    config.succ(palette.spGui.domElement,renderer.domElement);
    render();
    return palette.controls;
}
export function lighting (){
    var light = new THREE.PointLight(0xffffff, 0.75);
    light.position.set(-12, 4.6, 5.4);
    light.position.multiplyScalar(30);

    var directLight = new THREE.DirectionalLight(0xffffff, 1);
    directLight.position.set(0, -2, -10).normalize();

    var directLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directLight2.position.set(0, 0, 10).normalize();

    return {
      light:light
      ,direct:directLight
      ,direct2:directLight2
      ,ambient:new THREE.AmbientLight(0xcccccc)
    }
}

export function setSpGui(meshMaterial,config){
    var spGui = new dat.GUI()
      ;

    var controls = new function() {
      this.opacity = meshMaterial.opacity;
      this.transparent = meshMaterial.transparent;

      this.color = meshMaterial.color.getStyle();
      this.specular = meshMaterial.specular.getHex();
      this.shininess = meshMaterial.shininess;
    }

      //配置面板
    spGui.add(controls, 'opacity', 0, 1).onChange(function(e) {
      meshMaterial.opacity = e;
    });

    spGui.add(controls, 'transparent').onChange(function(e) {
      meshMaterial.transparent = e
    });
    spGui.add(controls, 'shininess', 0, 200).onChange(function(e) {
      meshMaterial.shininess = e
    });

    spGui.addColor(controls, 'color').onChange(function(e) {
      meshMaterial.color = new THREE.Color(e)
    });
    spGui.addColor(controls, 'specular').onChange(function(e) {
      meshMaterial.specular = new THREE.Color(e)
    });

    return {controls:controls,spGui:spGui}
}


export function setMaterial(meshMaterial,newMaterial){
    if(!newMaterial) return;
    meshMaterial.opacity=newMaterial.opacity;
    meshMaterial.transparent=newMaterial.transparent;
    meshMaterial.color=new THREE.Color(newMaterial.color);
    meshMaterial.specular=new THREE.Color(newMaterial.specular);
    meshMaterial.shininess=newMaterial.shininess;

}

export function updateDisplay(newMaterial,gui) {
    for (var i in gui.__controllers) {
        gui.__controllers[i].setValue(newMaterial[gui.__controllers[i].property])
    }
    for (var f in gui.__folders) {
        updateDisplay(gui.__folders[f]);
    }
}
