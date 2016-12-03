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

// Separators for the rooms (includes the secret wall for the first left room)
var secretLSep, fRSep, sRSep, fLSep, sLSep;
var leftSeparators = [fLSep, sLSep];
var rightSeparators = [fRSep, sRSep];


// First left room secret separator
cube = new THREE.BoxGeometry(400,200,5,8);
secretLSep = new THREE.Mesh(cube, cubeMat);
secretLSep.position.set(-300,0,350);
secretLSep.receiveShadow = true;
secretLSep.castShadow = true;
collidableMeshList.push(secretLSep);
scene.add(secretLSep);

var min = 100; // Where the first separator is on the Z axis
var startX = -300;

for (i = 0; i < leftSeparators.length; i++){
    leftSeparators[i] = new THREE.Mesh(cube, cubeMat);
    leftSeparators[i].position.set(-300,0,min);
    leftSeparators[i].receiveShadow = true;
    leftSeparators[i].castShadow = true;
    collidableMeshList.push(leftSeparators[i]);
    scene.add(leftSeparators[i]);
    min = min - 200;
}

min = 100;

for (i = 0; i < rightSeparators.length; i++){
    rightSeparators[i] = new THREE.Mesh(cube, cubeMat);
    rightSeparators[i].position.set(300,0,min);
    rightSeparators[i].receiveShadow = true;
    rightSeparators[i].castShadow = true;
    collidableMeshList.push(rightSeparators[i]);
    scene.add(rightSeparators[i]);
    min = min - 200;
}


/*
// First left room secret wall
cube = new THREE.BoxGeometry(400,200,5,8);
var fLSep = new THREE.Mesh(cube, cubeMat);
fLSep.position.set(-300,0,100);
fLSep.receiveShadow = true;
fLSep.castShadow = true;
collidableMeshList.push(fLSep);
scene.add(fLSep);
*/

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

min = 300; // Where the first doorframe is. Lower number means it is further down the corridor

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
    console.log(lFrameArray[i].castShadow);
    console.log(rFrameArray[i].castShadow);
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
cubeMat = new THREE.MeshPhongMaterial({color:0x7A5230, side: THREE.DoubleSide});
var leftDoor = new THREE.Mesh(cube, cubeMat);
leftDoor.position.set(-25,0,-350);
collidableMeshList.push(leftDoor);
leftDoor.castShadow = true;
leftDoor.receiveShadow = true;
scene.add(leftDoor);

var rightDoor = new THREE.Mesh(cube, cubeMat);
rightDoor.position.set(27,0,-337);
rightDoor.rotation.y = Math.PI * 30/180;
collidableMeshList.push(rightDoor);
rightDoor.castShadow = true;
rightDoor.receiveShadow = true;
scene.add(rightDoor);

/*
// Let's make all of the doors
var lDoor1, lDoor2, lDoor3, lDoor4, lDoor5, lDoor6, rDoor1, rDoor2, rDoor3, rDoor4, rDoor5, rDoor6; // If the door is preceeded by 1, it's the left door.
var doorsArray = [lDoor1, lDoor2, lDoor3, lDoor4, lDoor5, lDoor6, rDoor1, rDoor2, rDoor3, rDoor4, rDoor5, rDoor6];
doors = new THREE.Object3D();
var minZ = 225; //Where the left door array starts for left side corridor. Further down the corridor means a lower number than this.
var minX = -100; // Same as above but for X axis.
var rLSideEdited = false;
var lRSideEdited = false;
var rRSideEdited = false;

var doorCounter = 0;

for (i = 0; i < doorsArray.length; i++){
    // Right door left side
    if (doorCounter > 2 && doorCounter <= 5){
        if (rLSideEdited == false){
            minZ = 175;
            rLSideEdited = true;
        }
    }
    
    // Left door right side
    else if (doorCounter > 5 && doorCounter <= 8){
        if (lRSideEdited == false){
            minZ = 175;
            minX = 100;
            lRSideEdited = true;
        }
    }
    
    // Right door right side
    else if (doorCounter > 8 && doorCounter <= 13){
        if (rRSideEdited == false){
            minZ = 225;
            rRSideEdited = true;
        }
    }
    
    doorsArray[i] = new THREE.Mesh(cube, cubeMat);
    doorsArray[i].position.set(minX,0,minZ);
    doorsArray[i].rotation.y = Math.PI * 90/180;
    collidableMeshList.push(doorsArray[i]);
    minZ = minZ - 200;
    doorsArray[i].castShadow = true;
    doors.add(doorsArray[i]);     
    doorCounter++;    
}

scene.add(doors);
*/


var spotLight1, spotLight2, spotLight3, spotLight4;
var corridorLightsArray = [spotLight1, spotLight2, spotLight3, spotLight4];
corridorLights = new THREE.Object3D();
var spotLightHelper;
min = 400; //Where the light strip starts for corridor. Further down the corridor means a lower number than this.

for (i = 0; i < corridorLightsArray.length; i++){
    corridorLightsArray[i] = new THREE.SpotLight(0xFFffff,10); // Tell JS what the light is
    corridorLightsArray[i].position.set(0,95,min);
    corridorLightsArray[i].target.position.set(0,0,min);
    min = min - 200;
    corridorLightsArray[i].penumbra = 1;
    corridorLightsArray[i].angle = 0.5;
    corridorLightsArray[i].castShadow = true;
    corridorLightsArray[i].intensity = 0.7;
    corridorLightsArray[i].target.updateMatrixWorld();
    corridorLights.add(corridorLightsArray[i]);
    //console.log(corridorLightsArray[i]);
    //spotLightHelper = new THREE.SpotLightHelper(corridorLightsArray[i]);
    //scene.add(spotLightHelper);
}

scene.add(corridorLights);


// Final room light
var fallenLamp = new THREE.SpotLight(0xFFffff,10);
fallenLamp.position.set(450,-40,-650);
fallenLamp.target.position.set(45,0,-340);
fallenLamp.penumbra = 1;
fallenLamp.angle = 0.25;
fallenLamp.castShadow = true;
fallenLamp.intensity = 1;
fallenLamp.target.updateMatrixWorld();
scene.add(fallenLamp);
//spotLightHelper = new THREE.SpotLightHelper(fallenLamp);
//scene.add(spotLightHelper);


var camera = new THREE.PerspectiveCamera(90,width/height,0.1,1000);
camera.rotation.x =  Math.PI * 90 / 180;

var ambientLight = new THREE.AmbientLight(0xffffff,0.1);
scene.add(ambientLight);


// Define character
var cubeGeometry = new THREE.CubeGeometry(10,10,10,1,1,1);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
var character = new THREE.Mesh( cubeGeometry, wireMaterial );
character.position.set(0,0,0);
scene.add( character );	

/*
// Define interaction cube
cubeGeometry = new THREE.CubeGeometry(0.1,0.1,0.1,1,1,1);
wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
var interactionCube = new THREE.Mesh( cubeGeometry, wireMaterial );
interactionCube.position.set(0,0,-10);
scene.add(interactionCube);
*/

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
mtlLoader.load( 'Lamp.mtl', function( materials ) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( 'obj/' );
	objLoader.load( 'Lamp.obj', function ( object ) {
		
		object.position.set(450,-40,-650);
        object.rotation.x = Math.PI * 90/180;
        object.rotation.y = Math.PI * 120/180;
		//object.scale.set(0.05,0.05,0.05);
		scene.add( object );
	}, onProgress, onError );
});


mtlLoader.load( 'Bed.mtl', function( materials ) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'obj/' );
    objLoader.load( 'Bed.obj', function ( object ) {
	   object.position.set(-450,-50,300);
        //object.rotation.x = Math.PI * 90/180;
        object.rotation.y = Math.PI * 90/180;
	   object.scale.set(1.5,1.5,1.5);
        object.castShadow = true;
        object.receiveShadow = true;
        collidableMeshList.push(object);
	   scene.add( object );
    }, onProgress, onError );
});

// little cube to test lights
cube = new THREE.BoxGeometry(20,20,20,20);
var testCube = new THREE.Mesh(cube, cubeMat);
testCube.position.set(0,0,0);
testCube.receiveShadow = true;
testCube.castShadow = true;
collidableMeshList.push(testCube);
scene.add(testCube);

// little cube to test lights on wall
cube = new THREE.BoxGeometry(20,20,20,20);
var testCube2 = new THREE.Mesh(cube, cubeMat);
testCube2.position.set(-200,0,-200);
testCube2.receiveShadow = true;
testCube2.castShadow = true;
collidableMeshList.push(testCube2);
scene.add(testCube2);


//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = ( window.innerWidth / window.innerHeight );
  camera.updateProjectionMatrix();
}
