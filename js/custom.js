//Custom javascript

//Define the windows width and height first
var width = window.innerWidth;
var height = window.innerHeight;

//Define renderer and the scene
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

var axis = new THREE.AxisHelper(10);
scene.add(axis);



// Define a room

// Floor
var floorGeo = new THREE.PlaneGeometry(1000,1000,5,8);
var floorMat = new THREE.MeshPhongMaterial({color:0x88898, side: THREE.DoubleSide});
var floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.set(0,-20,0);
floor.rotation.x =  Math.PI * 90 / 180;
floor.receiveShadow = true;
scene.add(floor);


// Roof
var roofGeo = new THREE.PlaneGeometry(500,500,5,8);
var roofMat = new THREE.MeshPhongMaterial({color:0x88898, side: THREE.DoubleSide});
var roof = new THREE.Mesh(roofGeo, floorMat);
roof.position.set(0,100,0);
roof.rotation.x =  Math.PI * 90 / 180;
roof.receiveShadow = true;
roof.castShadow = true;
scene.add(roof);

// Back left wall
var cube = new THREE.BoxGeometry(100,500,5,8);
var cubeMat = new THREE.MeshPhongMaterial({color:0x88898, side: THREE.DoubleSide});
var blWall = new THREE.Mesh(cube, cubeMat);
blWall.position.set(50,0,-300);
blWall.receiveShadow = true;

// Back right wall
var brWall = new THREE.Mesh(cube, cubeMat);
brWall.position.set(-75,0,-300);
brWall.receiveShadow = true;


// Left wall
cube = new THREE.BoxGeometry(1000,200,5,8);
var lWall = new THREE.Mesh(cube, cubeMat);
lWall.position.set(-75,0,100);
lWall.receiveShadow = true;
lWall.rotation.y =  Math.PI * 90 / 180;


// Right wall
var rWall = new THREE.Mesh(cube, cubeMat);
rWall.position.set(100,0,100);
rWall.receiveShadow = true;
rWall.rotation.y =  Math.PI * 90 / 180;


// Front wall
var fWall = new THREE.Mesh(cube, cubeMat);
fWall.position.set(0,0,200);
fWall.receiveShadow = true;


room = new THREE.Object3D();
room.add(lWall);
room.add(rWall);
room.add(fWall);
room.add(blWall);
room.add(brWall);
//room.rotation.y =  Math.PI * 90 / 180;
scene.add(room);



// Define the Ball
var geometry = new THREE.BoxGeometry(20, 20, 20, 0, 0, 50);
var material = new THREE.MeshPhongMaterial({color:0xFF0000});
var ball = new THREE.Mesh(geometry, material);
ball.position.set(0,0,50);
ball.castShadow = true;
scene.add(ball);

var camera = new THREE.PerspectiveCamera(90,width/height,0.1,1000);
camera.position.set(0, -10, 90);
//camera.lookAt(ball);
camera.rotation.x =  Math.PI * 90 / 180;

var ambientLight = new THREE.AmbientLight(0xffffff,0.1);
scene.add(ambientLight);

// Define spotlight grid
var spotLight1 = new THREE.SpotLight(0xFFffff,10);
spotLight1.position.set(0,0,100);
spotLight1.penumbra = 1;
spotLight1.angle = 0.5;
spotLight1.castShadow = true;
spotLight1.intensity = 1;

/*
var spotLight2 = new THREE.SpotLight(0xFFffff,10);
spotLight2.position.set(85,0,100);
spotLight2.target.position.set(85,0,0)
spotLight2.penumbra = 1;
spotLight2.angle = 0.5;
spotLight2.castShadow = true;
spotLight2.intensity = 1;
spotLight2.target.updateMatrixWorld();

var spotLight3 = new THREE.SpotLight(0xFFffff,10);
spotLight3.position.set(-85,0,100);
spotLight3.target.position.set(-85,0,0)
spotLight3.penumbra = 1;
spotLight3.angle = 0.5;
spotLight3.castShadow = true;
spotLight3.intensity = 1;
spotLight3.target.updateMatrixWorld();

var spotLight4 = new THREE.SpotLight(0xFFffff,10);
spotLight4.position.set(0,85,100);
spotLight4.target.position.set(0,85,0)
spotLight4.penumbra = 1;
spotLight4.angle = 0.5;
spotLight4.castShadow = true;
spotLight4.intensity = 1;
spotLight4.target.updateMatrixWorld();


var spotLight5 = new THREE.SpotLight(0xFFffff,10);
spotLight5.position.set(0,-85,100);
spotLight5.target.position.set(0,-85,0)
spotLight5.penumbra = 1;
spotLight5.angle = 0.5;
spotLight5.castShadow = true;
spotLight5.intensity = 1;
spotLight5.target.updateMatrixWorld();
*/

lights = new THREE.Object3D();
lights.add(spotLight1);
/*
lights.add(spotLight2);
lights.add(spotLight3);
lights.add(spotLight4);
lights.add(spotLight5);
*/
scene.add(lights);


//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = ( window.innerWidth / window.innerHeight );
  camera.updateProjectionMatrix();
}
