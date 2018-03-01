export function BasicMesh(meshtype){
	Sim.Object.call(this);

	this.material=new THREE.MeshPhongMaterial({color:0x00ff00});
	var group = new THREE.Object3D;
        this.setObject3D(group);
        this.createMesh(meshtype)
}
BasicMesh.prototype = new Sim.Object();

BasicMesh.prototype.createMesh=function(meshtype){
	var object;
	switch(meshtype){
		case "SphereGeometry":
				object=new THREE.Mesh(new THREE.SphereGeometry( 75, 20, 10 ),this.material)

				break;
		case "IcosahedronGeometry":
				 object=new THREE.Mesh(new THREE.IcosahedronGeometry( 75, 1 ),this.material)
				break;

		case "OctahedronGeometry":
				object=new THREE.Mesh(new THREE.OctahedronGeometry( 75, 20, 10 ),this.material)
				break;


		case "TetrahedronGeometry":
				object=new THREE.Mesh(new THREE.TetrahedronGeometry( 75, 20, 10 ),this.material)
				break;
		case "BoxGeometry":
				 object=new THREE.Mesh(new THREE.BoxGeometry( 75, 20, 10 ),this.material)
				break;
		case "CircleGeometry":
				object=new THREE.Mesh(new THREE.CircleGeometry( 75, 20, 10 ),this.material)
				break;
		case "RingGeometry":
				 object=new THREE.Mesh(new THREE.RingGeometry( 75, 20, 10 ),this.material)
				break;
		case "CylinderGeometry":
				 object=new THREE.Mesh(new THREE.CylinderGeometry( 75, 20, 10 ),this.material)
				break;
		default :
				object=new THREE.Mesh(new THREE.PlaneGeometry( 75, 20, 10 ),this.material)



	}
	this.object3D.add(object)
}
BasicMesh.prototype.setPosition=function(x,y,z){
	this.object3D.position.set(x,y,z);
}
BasicMesh.prototype.setScale=function(x,y,z){
	this.object3D.scale.set(x,y,z);
}
