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

var collidableMeshList = [];


// Define a corridor

// Floor
var floorGeo = new THREE.PlaneGeometry(1000,1750,5,8);
var floorMat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("img/floor.PNG"), side: THREE.DoubleSide});
var floor = new THREE.Mesh(floorGeo, floorMat);

floor.position.set(0,-50,100);
floor.rotation.x =  Math.PI * 90 / 180;
floor.receiveShadow = true;
scene.add(floor);


// Roof
var roofGeo = new THREE.BoxGeometry(1000,1500,5,8);
var roofMat = new THREE.MeshPhongMaterial({color:0xffffff, side: THREE.DoubleSide});
var roof = new THREE.Mesh(roofGeo, roofMat);
roof.position.set(0,100,0);
roof.rotation.x =  Math.PI * 90 / 180;
collidableMeshList.push(roof);
roof.receiveShadow = true;
roof.castShadow = true;
scene.add(roof);


// Define the lift

// Left wall
cube = new THREE.BoxGeometry(200,200,5,8);
var cubeMat = new THREE.MeshPhongMaterial({color:0x88898, side: THREE.DoubleSide});
var lWall = new THREE.Mesh(cube, cubeMat);
lWall.position.set(-50,0,450);
lWall.receiveShadow = true;
lWall.castShadow = true;
lWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(lWall);
scene.add(lWall);

// Right wall
var rWall = new THREE.Mesh(cube, cubeMat);
rWall.position.set(50,0,450);
rWall.receiveShadow = true;
rWall.castShadow = true;
rWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(rWall);
scene.add(rWall);


// Back wall
cube = new THREE.BoxGeometry(1000,200,5,8);
var fWall = new THREE.Mesh(cube, cubeMat);
fWall.position.set(0,0,500);
fWall.receiveShadow = true;
fWall.castShadow = true;
collidableMeshList.push(fWall);
scene.add(fWall);

// front left wall
cube = new THREE.BoxGeometry(55,200,5,8);
var fLWall = new THREE.Mesh(cube, cubeMat);
fLWall.position.set(-75,0,350);
fLWall.receiveShadow = true;
fLWall.castShadow = true;
collidableMeshList.push(fLWall);
scene.add(fLWall);

// front right wall
cube = new THREE.BoxGeometry(55,200,5,8);
var fRWall = new THREE.Mesh(cube, cubeMat);
fRWall.position.set(75,0,350);
fRWall.receiveShadow = true;
fRWall.castShadow = true;
collidableMeshList.push(fRWall);
scene.add(fRWall);


// Far left wall
cube = new THREE.BoxGeometry(1500,200,5,8);
var farLWall = new THREE.Mesh(cube, cubeMat);
farLWall.position.set(-500,0,-250);
farLWall.receiveShadow = true;
farLWall.castShadow = true;
farLWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(farLWall);
scene.add(farLWall);

// Far right wall
var farRWall = new THREE.Mesh(cube, cubeMat);
farRWall.position.set(500,0,-250);
farRWall.receiveShadow = true;
farRWall.castShadow = true;
farRWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(farRWall);
scene.add(farRWall);

// Far front wall
cube = new THREE.BoxGeometry(1000,200,5,8);
var farFWall = new THREE.Mesh(cube, cubeMat);
farFWall.position.set(0,0,-750);
farFWall.receiveShadow = true;
farFWall.castShadow = true;
collidableMeshList.push(farFWall);
scene.add(farFWall);




// Make 7 door frames
// Define the cube 
var cube = new THREE.BoxGeometry(100,200,5,8);
var tCube = new THREE.BoxGeometry(200,50,5,8);

	
var doorFrame1, doorFrame2, doorFrame3, doorFrame4, doorFrame5, doorFrame6, doorFrame7;
var doorFrameArray = [doorFrame1, doorFrame2, doorFrame3, doorFrame4];
var lFrame1, lFrame2, lFrame3, lFrame4, lFrame5, lFrame6, lFrame7;
var lFrameArray = [lFrame1, lFrame2, lFrame3, lFrame4];
var rFrame1, rFrame2, rFrame3, rFrame4, rFrame5, rFrame6, rFrame7;
var rFrameArray = [rFrame1, rFrame2, rFrame3, rFrame4];

var doorFrames = new THREE.Object3D();

var min = 300; // Where the first doorframe is. Lower number means it is further down the corridor

// Loop through the door frame array and define where and what each one is
for (i = 0; i < doorFrameArray.length; i++){
	
	doorFrameArray[i] = new THREE.Object3D(); // Define each doorFrame in the array as an object	
	
	lFrameArray[i] = new THREE.Mesh(cube, cubeMat); // Define the sides of the frame
	rFrameArray[i] = new THREE.Mesh(cube, cubeMat); // Define the sides of the frame
	
	lFrameArray[i].position.set(100,0,min); // Define their position
	rFrameArray[i].position.set(-100,0,min);

	lFrameArray[i].rotation.y = Math.PI * 90 / 180;
	rFrameArray[i].rotation.y = Math.PI * 90 / 180;

	collidableMeshList.push(lFrameArray[i],rFrameArray[i]); // Make it collidable

	
	lFrameArray[i].receiveShadow = true; // Make them all receive and cash shadow
	rFrameArray[i].receiveShadow = true;
	lFrameArray[i].castShadow = true;
	rFrameArray[i].castShadow = true;

	doorFrameArray[i].add(lFrameArray[i],rFrameArray[i]);
	scene.add(doorFrameArray[i]);
	min = min - 200;
}


var tCube = new THREE.BoxGeometry(500,50,5,8);
var leftTFrame = new THREE.Mesh(tCube, cubeMat);
leftTFrame.position.set(-100,75,0);
leftTFrame.rotation.y = Math.PI * 90/180;
collidableMeshList.push(leftTFrame);
leftTFrame.castShadow = true;
leftTFrame.receiveShadow = true;
scene.add(leftTFrame);

var rightTFrame = new THREE.Mesh(tCube, cubeMat);
rightTFrame.position.set(100,75,0);
rightTFrame.rotation.y = Math.PI * 90/180;
collidableMeshList.push(rightTFrame);
rightTFrame.castShadow = true;
rightTFrame.receiveShadow = true;
scene.add(rightTFrame);


// Final door Frame
var cube = new THREE.BoxGeometry(500,200,5,8);
finalLFrame = new THREE.Mesh(cube, cubeMat); 
finalRFrame = new THREE.Mesh(cube, cubeMat); 
finalTFrame = new THREE.Mesh(cube, cubeMat); 
finalLFrame.position.set(300,0,-350); // Define their position
finalRFrame.position.set(-300,0,-350);
finalTFrame.position.set(0,150,-350);
collidableMeshList.push(finalLFrame,finalRFrame,finalTFrame);
finalRFrame.castShadow = true;
finalRFrame.receiveShadow = true;
finalTFrame.receiveShadow = true;
finalLFrame.castShadow = true;
finalTFrame.castShadow = true;
finalLFrame.receiveShadow = true;
scene.add(finalLFrame);
scene.add(finalTFrame);
scene.add(finalRFrame);

// Final door
cube = new THREE.BoxGeometry(50,100,5,8);
var leftDoor = new THREE.Mesh(cube, cubeMat);
leftDoor.position.set(-25,0,-350);
collidableMeshList.push(leftDoor);
leftDoor.castShadow = true;
leftDoor.receiveShadow = true;
scene.add(leftDoor);

var rightDoor = new THREE.Mesh(cube, cubeMat);
rightDoor.position.set(25,0,-343);
rightDoor.rotation.y = Math.PI * 13/180;
collidableMeshList.push(rightDoor);
rightDoor.castShadow = true;
rightDoor.receiveShadow = true;
scene.add(rightDoor);



var spotLight1, spotLight2, spotLight3, spotLight4;
var corridorLightsArray = [spotLight1, spotLight2, spotLight3, spotLight4];
corridorLights = new THREE.Object3D();
var spotLightHelper;
min = 400; //Where the light strip starts for corridor. Further down the corridor means a lower number than this.

for (i = 0; i < corridorLightsArray.length; i++){
    corridorLightsArray[i] = new THREE.SpotLight(0xFFffff,10); // Tell JS what the light is
    corridorLightsArray[i].position.set(0,100,min);
    corridorLightsArray[i].target.position.set(0,0,min);
    min = min - 200;
    corridorLightsArray[i].penumbra = 1;
    corridorLightsArray[i].angle = 0.5;
    corridorLightsArray[i].castShadow = true;
    corridorLightsArray[i].intensity = 0.7;
    corridorLightsArray[i].target.updateMatrixWorld();
    corridorLights.add(corridorLightsArray[i]);
    //console.log(corridorLightsArray[i]);
    spotLightHelper = new THREE.SpotLightHelper(corridorLightsArray[i]);
    scene.add(spotLightHelper);
}

scene.add(corridorLights);


// Final room light
var fallenLamp = new THREE.SpotLight(0xFFffff,10);
fallenLamp.position.set(450,-40,-650);
fallenLamp.target.position.set(45,0,-340);
fallenLamp.penumbra = 1;
fallenLamp.angle = 0.25;
fallenLamp.castShadow = true;
fallenLamp.intensity = 2;
fallenLamp.target.updateMatrixWorld();
scene.add(fallenLamp);
//spotLightHelper = new THREE.SpotLightHelper(fallenLamp);
//scene.add(spotLightHelper);


var camera = new THREE.PerspectiveCamera(90,width/height,0.1,1000);
camera.rotation.x =  Math.PI * 90 / 180;

var ambientLight = new THREE.AmbientLight(0xffffff,0.1);
scene.add(ambientLight);


// Define character
var cubeGeometry = new THREE.CubeGeometry(5,5,5,1,1,1);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
var character = new THREE.Mesh( cubeGeometry, wireMaterial );
character.position.set(0,0,0);
scene.add( character );	

/*
var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};



var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};


var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'obj/' );
mtlLoader.load( 'sofa.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( 'obj/' );
	objLoader.load( 'sofa.obj', function ( object ) {
		object.position.y = Math.PI / 2;
		object.position.set(-150,-50,0);
		object.scale.set(0.05,0.05,0.05);
		scene.add( object );
	}, onProgress, onError );
});
*/



//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = ( window.innerWidth / window.innerHeight );
  camera.updateProjectionMatrix();
}
