//Custom javascript

//Define the windows width and height first
var width = window.innerWidth;
var height = window.innerHeight;

//Define renderer and the scene
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

var listener = new THREE.AudioListener();


var audioLoader = new THREE.AudioLoader();

var freshStart = true; // To mark the start of a new game, for setting initial coords.

/*
var axis = new THREE.AxisHelper(10);
scene.add(axis);
*/

var collidableMeshList = [];


// Define a corridor

var floorGeo = new THREE.BoxGeometry(1000, 1750, 5, 8);
var floorTx = THREE.ImageUtils.loadTexture('img/floortex.jpg');
var floorNormalTx = THREE.ImageUtils.loadTexture('img/floornormal.png');
floorTx.wrapS = floorTx.wrapT = THREE.RepeatWrapping;
floorTx.repeat.set(20, 20);
floorNormalTx.wrapS = floorTx.wrapT = THREE.RepeatWrapping;
floorNormalTx.repeat.set(10, 10);
var floorMat = new THREE.MeshPhongMaterial({
    map: floorTx
});
floorMat.normalScale.set(0.2, 0.2);
var floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.set(0, -50, -522.5);
floor.rotation.x = Math.PI * 90 / 180;
floor.castShadow = true;
floor.receiveShadow = true;
floor.name = "floor";
floor.dynamic = true;
scene.add(floor);



// Roof
var roofGeo = new THREE.BoxGeometry(1000, 1500, 5, 8);
var roofMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
var roof = new THREE.Mesh(roofGeo, roofMat);
roof.position.set(0, 100, 0);
roof.rotation.x = Math.PI * 90 / 180;
collidableMeshList.push(roof);
roof.receiveShadow = true;
roof.castShadow = true;
scene.add(roof);


// Define the lift

// Left wall
cube = new THREE.BoxGeometry(150, 100, 5, 8);
var cubeMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/liftwall.jpg'),
    side: THREE.DoubleSide
});
var lWall = new THREE.Mesh(cube, cubeMat);
lWall.position.set(-50, 0, 426);
lWall.receiveShadow = true;
lWall.castShadow = true;
lWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(lWall);
scene.add(lWall);


// Back wall
cube = new THREE.BoxGeometry(100, 100, 5, 8);
var fWall = new THREE.Mesh(cube, cubeMat);
fWall.position.set(0, 0, 500);
fWall.receiveShadow = true;
fWall.castShadow = true;
collidableMeshList.push(fWall);
scene.add(fWall);

// Left wall
cube = new THREE.BoxGeometry(150, 100, 5, 8);
var cubeMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/rightwall.jpg'),
    side: THREE.DoubleSide
});

// Right wall
var rWall = new THREE.Mesh(cube, cubeMat);
rWall.position.set(50, 0, 426);
rWall.receiveShadow = true;
rWall.castShadow = true;
rWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(rWall);
scene.add(rWall);


wallMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/wall.jpg'),
    side: THREE.DoubleSide
});

// front left wall
cube = new THREE.BoxGeometry(55, 200, 5, 8);
var fLWall = new THREE.Mesh(cube, wallMat);
fLWall.position.set(-75, 0, 350);
fLWall.receiveShadow = true;
fLWall.castShadow = true;
collidableMeshList.push(fLWall);
scene.add(fLWall);

// front right wall
cube = new THREE.BoxGeometry(55, 200, 5, 8);
var fRWall = new THREE.Mesh(cube, wallMat);
fRWall.position.set(75, 0, 350);
fRWall.receiveShadow = true;
fRWall.castShadow = true;
collidableMeshList.push(fRWall);
scene.add(fRWall);

// Lift threshold
liftThreshCube = new THREE.BoxGeometry(100, 5, 5, 8);
var cubeMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/leftDoor.jpg'),
    side: THREE.DoubleSide
});
var liftThreshold = new THREE.Mesh(liftThreshCube, cubeMat);
liftThreshold.position.set(0, -50, 355);
liftThreshold.rotation.x = Math.PI * 90 / 180;
liftThreshold.receiveShadow = true;
liftThreshold.castShadow = true;
scene.add(liftThreshold);

// Lift floor
liftFloorCube = new THREE.BoxGeometry(100, 200, 5, 8);
var cubeMat = new THREE.MeshPhongMaterial({
    color: 0x88898,
    side: THREE.DoubleSide
});

var liftFloorTx = THREE.ImageUtils.loadTexture('img/liftfloor.jpg');
liftFloorTx.wrapS = liftFloorTx.wrapT = THREE.RepeatWrapping;
liftFloorTx.repeat.set(1, 1);
var liftFloorMat = new THREE.MeshPhongMaterial({
    map: liftFloorTx
});

var liftFloor = new THREE.Mesh(liftFloorCube, liftFloorMat);
liftFloor.position.set(0, -50, 457.5);
liftFloor.rotation.x = Math.PI * 90 / 180;
liftFloor.receiveShadow = true;
liftFloor.castShadow = true;
scene.add(liftFloor);



var cubeMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});


var liftRoof = new THREE.Mesh(liftFloorCube, cubeMat);
liftRoof.position.set(0, 45, 455);
liftRoof.rotation.x = Math.PI * 90 / 180;
liftRoof.receiveShadow = true;
liftRoof.castShadow = true;
scene.add(liftRoof);


// Lift roof cover
cube = new THREE.BoxGeometry(100, 100, 10, 8);
var liftRoofCover = new THREE.Mesh(cube, wallMat);
liftRoofCover.position.set(0, 90, 353);
liftRoofCover.rotation.x = Math.PI * 180 / 180;
liftRoofCover.receiveShadow = true;
liftRoofCover.castShadow = true;
collidableMeshList.push(liftRoofCover);
scene.add(liftRoofCover);



// front right wall
cube = new THREE.BoxGeometry(55, 200, 5, 8);
var fRWall = new THREE.Mesh(cube, wallMat);
fRWall.position.set(75, 0, 350);
fRWall.receiveShadow = true;
fRWall.castShadow = true;
collidableMeshList.push(fRWall);
scene.add(fRWall);

// Define lift Doors
cube = new THREE.BoxGeometry(50, 100, 5, 8);
var LiftDoorMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/leftDoor.jpg')
});

var liftLeftDoor = new THREE.Mesh(cube, LiftDoorMaterial);
liftLeftDoor.position.set(-25, 0, 355);
collidableMeshList.push(liftLeftDoor);
liftLeftDoor.castShadow = true;
liftLeftDoor.receiveShadow = true;
liftLeftDoor.name = "liftL";
scene.add(liftLeftDoor);

var liftRightDoor = new THREE.Mesh(cube, LiftDoorMaterial);
liftRightDoor.position.set(25, 0, 355); //Z should be -345
collidableMeshList.push(liftRightDoor);
liftRightDoor.castShadow = true;
liftRightDoor.receiveShadow = true;
liftRightDoor.name = "liftR";
scene.add(liftRightDoor);


uWallMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('img/uwall.jpg'),
    side: THREE.DoubleSide
});


// Far left wall
cube = new THREE.BoxGeometry(1500, 200, 5, 8);
var farLWall = new THREE.Mesh(cube, wallMat);
farLWall.position.set(-500, 15, -250);
farLWall.receiveShadow = true;
farLWall.castShadow = true;
farLWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(farLWall);
scene.add(farLWall);

// Far right wall
var farRWall = new THREE.Mesh(cube, wallMat);
farRWall.position.set(500, 15, -250);
farRWall.receiveShadow = true;
farRWall.castShadow = true;
farRWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(farRWall);
scene.add(farRWall);

// Far front wall
cube = new THREE.BoxGeometry(1000, 200, 5, 8);
var farFWall = new THREE.Mesh(cube, wallMat);
farFWall.position.set(0, 0, -750);
farFWall.receiveShadow = true;
farFWall.castShadow = true;
collidableMeshList.push(farFWall);
scene.add(farFWall);

// Separators for the rooms (includes the secret wall for the first left room)
var secretLSep, fRSep, sRSep, fLSep, sLSep;
var leftSeparators = [fLSep, sLSep];
var rightSeparators = [fRSep, sRSep];


// First left room secret separator
cube = new THREE.BoxGeometry(400, 200, 5, 8);
secretLSep = new THREE.Mesh(cube, wallMat);
secretLSep.position.set(-300, 15, 350);
secretLSep.receiveShadow = true;
secretLSep.castShadow = true;
collidableMeshList.push(secretLSep);
scene.add(secretLSep);

// First right room back wall
cube = new THREE.BoxGeometry(400, 200, 5, 8);
secretLSep = new THREE.Mesh(cube, wallMat);
secretLSep.position.set(300, 15, 350);
secretLSep.receiveShadow = true;
secretLSep.castShadow = true;
collidableMeshList.push(secretLSep);
scene.add(secretLSep);

var min = 100; // Where the first separator is on the Z axis
var startX = -300;

for (i = 0; i < leftSeparators.length; i++) {
    leftSeparators[i] = new THREE.Mesh(cube, wallMat);
    leftSeparators[i].position.set(-300, 15, min);
    leftSeparators[i].receiveShadow = true;
    leftSeparators[i].castShadow = true;
    collidableMeshList.push(leftSeparators[i]);
    scene.add(leftSeparators[i]);
    min = min - 200;
}

min = 100;

for (i = 0; i < rightSeparators.length; i++) {
    rightSeparators[i] = new THREE.Mesh(cube, wallMat);
    rightSeparators[i].position.set(300, 15, min);
    rightSeparators[i].receiveShadow = true;
    rightSeparators[i].castShadow = true;
    collidableMeshList.push(rightSeparators[i]);
    scene.add(rightSeparators[i]);
    min = min - 200;
}


// Make 7 door frames
// Define the cube 
var cube = new THREE.BoxGeometry(150, 100, 5, 8);

var doorFrame1, doorFrame2, doorFrame3, doorFrame4, doorFrame5, doorFrame6, doorFrame7;
var doorFrameArray = [doorFrame1, doorFrame2, doorFrame3, doorFrame4];
var lFrame1, lFrame2, lFrame3, lFrame4, lFrame5, lFrame6, lFrame7;
var lFrameArray = [lFrame1, lFrame2, lFrame3, lFrame4];
var rFrame1, rFrame2, rFrame3, rFrame4, rFrame5, rFrame6, rFrame7;
var rFrameArray = [rFrame1, rFrame2, rFrame3, rFrame4];

var doorFrames = new THREE.Object3D();

min = 300; // Where the first doorframe is. Lower number means it is further down the corridor

// Loop through the door frame array and define where and what each one is
for (i = 0; i < doorFrameArray.length; i++) {

    doorFrameArray[i] = new THREE.Object3D(); // Define each doorFrame in the array as an object	

    lFrameArray[i] = new THREE.Mesh(cube, wallMat); // Define the sides of the frame
    rFrameArray[i] = new THREE.Mesh(cube, wallMat); // Define the sides of the frame

    lFrameArray[i].position.set(100, 0, min); // Define their position
    rFrameArray[i].position.set(-100, 0, min);

    lFrameArray[i].rotation.y = Math.PI * 90 / 180;
    rFrameArray[i].rotation.y = Math.PI * 90 / 180;

    collidableMeshList.push(lFrameArray[i], rFrameArray[i]); // Make it collidable


    lFrameArray[i].receiveShadow = true; // Make them all receive and cash shadow
    rFrameArray[i].receiveShadow = true;
    lFrameArray[i].castShadow = true;
    rFrameArray[i].castShadow = true;

    doorFrameArray[i].add(lFrameArray[i], rFrameArray[i]);
    scene.add(doorFrameArray[i]);
    min = min - 200;
}

var tCube = new THREE.BoxGeometry(750, 50, 5, 8);
var leftTFrame = new THREE.Mesh(tCube, uWallMat);
leftTFrame.position.set(-100, 75, 0);
leftTFrame.rotation.y = Math.PI * 90 / 180;
leftTFrame.rotation.x = Math.PI * 180 / 180;
collidableMeshList.push(leftTFrame);
leftTFrame.castShadow = true;
leftTFrame.receiveShadow = true;
scene.add(leftTFrame);

var rightTFrame = new THREE.Mesh(tCube, uWallMat);
rightTFrame.position.set(100, 75, 0);
rightTFrame.rotation.y = Math.PI * 90 / 180;
rightTFrame.rotation.x = Math.PI * 180 / 180;
collidableMeshList.push(rightTFrame);
rightTFrame.castShadow = true;
rightTFrame.receiveShadow = true;
scene.add(rightTFrame);



// Final door Frame
var cube = new THREE.BoxGeometry(500, 200, 5, 8);
var tCube = new THREE.BoxGeometry(100, 100, 5, 8);
finalLFrame = new THREE.Mesh(cube, wallMat);
finalRFrame = new THREE.Mesh(cube, wallMat);
finalTFrame = new THREE.Mesh(tCube, uWallMat);
finalLFrame.position.set(300, 15, -375); // Define their position
finalRFrame.position.set(-300, 15, -375);
finalTFrame.position.set(0, 100, -375);
finalTFrame.rotation.x = Math.PI * 180 / 180;
collidableMeshList.push(finalLFrame, finalRFrame, finalTFrame);
finalRFrame.castShadow = true;
finalRFrame.receiveShadow = true;
finalTFrame.receiveShadow = true;
finalLFrame.castShadow = true;
finalTFrame.castShadow = true;
finalLFrame.receiveShadow = true;
scene.add(finalLFrame);
scene.add(finalTFrame);
scene.add(finalRFrame);
var oppositeDoorIDs = [];

var doorMat = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
])


var doorMatFlipped = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoorflipped.jpg')
    }),
    new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/woodendoor.jpg')
    }),
])


// Final door
cube = new THREE.BoxGeometry(50, 100, 5, 8);
cube.translate(25, 0, 0);
cubeMat = new THREE.MeshPhongMaterial({
    color: 0x7A5230,
    side: THREE.DoubleSide
});

var leftDoor = new THREE.Mesh(cube, doorMat);
leftDoor.position.set(-50, 0, -375);
collidableMeshList.push(leftDoor);
leftDoor.castShadow = true;
leftDoor.receiveShadow = true;
leftDoor.name = "locked";
scene.add(leftDoor);

cubeFinal = new THREE.BoxGeometry(50, 100, 5, 8);
cubeFinal.translate(-25, 0, 0);

var rightDoor = new THREE.Mesh(cubeFinal, doorMatFlipped);
rightDoor.position.set(50, 0, -375); //Z should be -345
rightDoor.rotation.y = Math.PI * 15 / 360;
collidableMeshList.push(rightDoor);
rightDoor.castShadow = true;
rightDoor.receiveShadow = true;
rightDoor.name = "closed";
oppositeDoorIDs.push(rightDoor.id);
scene.add(rightDoor);

// En-suite door
var ensuiteDoor = new THREE.Mesh(cube, doorMat);
ensuiteDoor.position.set(170, 0, -377);
ensuiteDoor.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(ensuiteDoor);
ensuiteDoor.castShadow = true;
ensuiteDoor.receiveShadow = true;
ensuiteDoor.name = "locked";
scene.add(ensuiteDoor);

// en-suite door cover
var esCoverCube = new THREE.BoxGeometry(65, 100, 5, 8);
var esCover = new THREE.Mesh(esCoverCube, uWallMat);
esCover.position.set(170, 100, -405);
esCover.receiveShadow = true;
esCover.castShadow = true;
esCover.rotation.x = Math.PI * 180 / 180;
esCover.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(esCover);
scene.add(esCover);

// Dynamic left wall final room

var dLCube = new THREE.BoxGeometry(500, 200, 5, 8);
var dLWall = new THREE.Mesh(dLCube, wallMat);
dLWall.position.set(-100, 15, -625);
dLWall.receiveShadow = true;
dLWall.castShadow = true;
dLWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(dLWall);
scene.add(dLWall);



// Dynamic right wall final room
var dRCube = new THREE.BoxGeometry(400, 200, 5, 8);
var dRWall = new THREE.Mesh(dRCube, wallMat);
dRWall.position.set(170, 15, -627);
dRWall.receiveShadow = true;
dRWall.castShadow = true;
dRWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(dRWall);
scene.add(dRWall);




// En-suite left wall
var ensuiteCube = new THREE.BoxGeometry(100, 200, 5, 8);
var ensuiteLWall = new THREE.Mesh(ensuiteCube, wallMat);
ensuiteLWall.position.set(218, 15, -550);
ensuiteLWall.receiveShadow = true;
ensuiteLWall.castShadow = true;
//ensuiteWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(ensuiteLWall);
scene.add(ensuiteLWall);


// En-suite back wall
var ensuiteCube = new THREE.BoxGeometry(200, 200, 5, 8);
var ensuiteBWall = new THREE.Mesh(ensuiteCube, wallMat);
ensuiteBWall.position.set(250, 15, -475);
ensuiteBWall.receiveShadow = true;
ensuiteBWall.castShadow = true;
ensuiteBWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(ensuiteBWall);
scene.add(ensuiteBWall);


// Let's make all of the doors
var Door1, Door2, Door3, Door4, Door5, Door6; // 1 to 3 is left side, 4 to 6 is right
var doorsArray = [Door1, Door2, Door3, Door4, Door5, Door6];
doors = new THREE.Object3D();
var minZ = 225; //Where the door array starts for left side corridor. Further down the corridor means a lower number than this.
var minX = -100; // Same as above but for X axis.
var resetAxis = false;


var doorCounter = 0;

for (i = 0; i < doorsArray.length; i++) {
    // right side
    if (doorCounter > 2) {
        if (!resetAxis) {
            minX = 100;
            minZ = 225;
            resetAxis = true;
            //doorMat = doorMatFlipped;
        }
    }

    doorsArray[i] = new THREE.Mesh(cube, doorMat);
    doorsArray[i].position.set(minX, 0, minZ);
    doorsArray[i].rotation.y = Math.PI * 90 / 180;
    if (!resetAxis) {
        oppositeDoorIDs.push(doorsArray[i].id);
    }
    doorsArray[i].name = "closed";

    collidableMeshList.push(doorsArray[i]);
    minZ = minZ - 200;
    doorsArray[i].castShadow = true;
    doors.add(doorsArray[i]);
    doorCounter++;
}

scene.add(doors);



var spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6, spotLight7, spotLight8, spotLight9, spotLight10;
var lightsArray = [spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6, spotLight7, spotLight8, spotLight9, spotLight10]; // 1-4 is for the corridor, 5-7 is for the left rooms, 8-10 is for the right rooms
//var pointLightsArray = [pointLight1, pointLight2, pointLight3, pointLight4, pointLight5, pointLight6, pointLight7, pointLight8, pointLight9, pointLight10]; // 1-4 is for the corridor, 5-7 is for the left rooms, 8-10 is for the right rooms
mapLights = new THREE.Object3D();
mapPointLights = new THREE.Object3D();
var spotLightHelper;
min = 400; //Where the light strip starts for corridor. Further down the corridor means a lower number than this.
var minX = 0;
var lightCounter = 1;
var leftSideEdited = false;
var rightSideEdited = false;
var expandLightRadius = false;

for (i = 0; i < lightsArray.length; i++) {
    if (lightCounter > 4 && lightCounter <= 7) {
        if (!leftSideEdited) {
            min = 220;
            minX = 350;
            leftSideEdited = true;
        }
    } else if (lightCounter > 7 && lightCounter <= 10) {
        if (!rightSideEdited) {
            min = 220;
            minX = -350;
            rightSideEdited = true;
        }
    }


    lightsArray[i] = new THREE.SpotLight(0xFFffff, 0.7); // Tell JS what the light is
    //pointLightsArray[i] = new THREE.PointLight( 0xFFffff, 2, 100 );
    if (i == 0) {
        lightsArray[i].position.set(minX, 35, min);
    } else {
        lightsArray[i].position.set(minX, 80, min);
    }

    //pointLightsArray[i].position.set(minX,95,min);
    lightsArray[i].target.position.set(minX, 0, min);
    min = min - 230;
    lightsArray[i].penumbra = 1;
    if (expandLightRadius) {
        lightsArray[i].angle = 1.2;
    } else {
        lightsArray[i].angle = 0.8;
    }

    lightsArray[i].castShadow = true;
    lightsArray[i].target.updateMatrixWorld();
    mapLights.add(lightsArray[i]);
    //mapPointLights.add(pointLightsArray[i]);
    lightCounter++;
    if (lightCounter == 5) {
        expandLightRadius = true;
    }
    //console.log(lightsArray[i]);
    //spotLightHelper = new THREE.SpotLightHelper(lightsArray[i]);
    //scene.add(spotLightHelper);
}

scene.add(mapLights);
scene.add(mapPointLights);


// Final room light
var fallenLamp = new THREE.SpotLight(0xFFffff, 10);
fallenLamp.position.set(150, -40, -550);
fallenLamp.target.position.set(35, 0, -340);
fallenLamp.penumbra = 1;
fallenLamp.shadowMapHeight = 2048;
fallenLamp.shadowMapWidth = 2048;
fallenLamp.shadowDarkness = 0.2;
fallenLamp.angle = 0.5;
fallenLamp.castShadow = true;
fallenLamp.intensity = 3;
fallenLamp.distance = 450;
fallenLamp.target.updateMatrixWorld();
scene.add(fallenLamp);
var fallenBulb = new THREE.SpotLight(0xFFffff, 1);
fallenBulb.position.set(440, -30, -650);
fallenBulb.target.position.set(500, 0, -700);
fallenBulb.penumbra = 1;
fallenBulb.shadowMapHeight = 2048;
fallenBulb.shadowMapWidth = 2048;
fallenBulb.shadowDarkness = 0.2;
fallenBulb.angle = 0.25;
fallenBulb.castShadow = true;
fallenBulb.intensity = 3;
fallenBulb.distance = 700;
fallenBulb.target.updateMatrixWorld();
scene.add(fallenBulb);
//spotLightHelper = new THREE.SpotLightHelper(fallenLamp);
//scene.add(spotLightHelper);

// Wardrobe light
var wardrobeLight = new THREE.SpotLight(0xFFffff, 10);
wardrobeLight.position.set(-70, 40, -605);
wardrobeLight.target.position.set(-50, 0, -605);
wardrobeLight.penumbra = 1;
wardrobeLight.angle = 0.7;
wardrobeLight.castShadow = true;
wardrobeLight.intensity = 2;
wardrobeLight.target.updateMatrixWorld();
scene.add(wardrobeLight);
//spotLightHelper = new THREE.SpotLightHelper(wardrobeLight);
//scene.add(spotLightHelper);

// Wardrobe Doors
var rCube = new THREE.BoxGeometry(45, 78, 5, 8);
rCube.translate(22.5, 0, 0);
var lCube = new THREE.BoxGeometry(45, 78, 5, 8);
lCube.translate(-22.5, 0, 0);
cubeMat = new THREE.MeshPhongMaterial({
    color: 0x7A5230,
    side: THREE.DoubleSide
});
var lWardrobeDoor = new THREE.Mesh(rCube, cubeMat);
lWardrobeDoor.position.set(-43, 2, -558);
lWardrobeDoor.receiveShadow = true;
lWardrobeDoor.castShadow = true;
lWardrobeDoor.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(lWardrobeDoor);
scene.add(lWardrobeDoor);

var rWardrobeDoor = new THREE.Mesh(lCube, cubeMat);
rWardrobeDoor.position.set(-43, 2, -643);
rWardrobeDoor.receiveShadow = true;
rWardrobeDoor.castShadow = true;
rWardrobeDoor.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(rWardrobeDoor);
scene.add(rWardrobeDoor);




var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
camera.rotation.x = Math.PI * 90 / 180;

camera.add(listener);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);


// Define character
var cubeGeometry = new THREE.BoxGeometry(20, 20, 10, 1, 1, 1);
var wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: false
});
var character = new THREE.Mesh(cubeGeometry, wireMaterial);
character.position.set(0, 0, 0);
scene.add(character);



/*
// Define interaction cube
cubeGeometry = new THREE.CubeGeometry(0.1,0.1,0.1,1,1,1);
wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
var interactionCube = new THREE.Mesh( cubeGeometry, wireMaterial );
interactionCube.position.set(0,0,-10);
scene.add(interactionCube);
*/

var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        //console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
};

var onError = function (xhr) {};



var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};

// Bathroom

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('cubicals.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('cubicals.obj', function (object) {
        object.position.set(300, -50, -150);
        object.rotation.y = Math.PI * 180 / 180;
        object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            //object.scale.set(0.05,0.05,0.05);
        scene.add(object);
    }, onProgress, onError);
});

// Sink
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('sink.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('sink.obj', function (object) {
        object.position.set(450, -50, -355);
        //object.rotation.y = Math.PI * 180 / 180;
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
                collidableMeshList.push(child);
            }
        })
        object.scale.set(1.3, 1.3, 1.3);
        scene.add(object);
    }, onProgress, onError);
});

// urinal
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('urinal.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('urinal.obj', function (object) {
        object.position.set(250, -35, -360);
        //object.rotation.y = Math.PI * 180 / 180;
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
                collidableMeshList.push(child);
            }
        })
        object.scale.set(1.3, 1.3, 1.3);
        scene.add(object);
    }, onProgress, onError);
});

// Cubical doors
cube = new THREE.BoxGeometry(80, 100, 5, 8);
var cubicalDoor1 = new THREE.Mesh(cube, cubeMat);
cubicalDoor1.position.set(455, 15, -205);
cubicalDoor1.receiveShadow = true;
cubicalDoor1.castShadow = true;
cubicalDoor1.name = "locked";
collidableMeshList.push(cubicalDoor1);
scene.add(cubicalDoor1);

var cubicalDoor2 = new THREE.Mesh(cube, cubeMat);
cubicalDoor2.position.set(350, 15, -205);
cubicalDoor2.receiveShadow = true;
cubicalDoor2.castShadow = true;
cubicalDoor2.name = "locked";
collidableMeshList.push(cubicalDoor2);
scene.add(cubicalDoor2);

var cubicalDoor3 = new THREE.Mesh(cube, cubeMat);
cubicalDoor3.position.set(250, 15, -205);
cubicalDoor3.receiveShadow = true;
cubicalDoor3.castShadow = true;
cubicalDoor3.name = "locked";
collidableMeshList.push(cubicalDoor3);
scene.add(cubicalDoor3);







// Load the fallen lamp
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('fallenlamp.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('fallenlamp.obj', function (object) {

        object.position.set(140, 0, -530);
        object.rotation.y = Math.PI * 140 / 180;
        object.rotation.x = Math.PI * 5 / 180;
        object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            //object.scale.set(0.05,0.05,0.05);
        scene.add(object);
    }, onProgress, onError);
});


// Load tipped sofa in final room
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('tippedSofa.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('tippedSofa.obj', function (object) {

        object.position.set(110, -50, -600);
        //object.rotation.x = Math.PI * 180 / 180;
        object.rotation.y = Math.PI * -65 / 180;
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
                collidableMeshList.push(child);
            }
        })
        object.scale.set(1.5, 1.5, 1.5);
        scene.add(object);
    }, onProgress, onError);
});

// As the sofa and lamp aren't collidable for some reason, add an invisble box over it that is collidable
var collideMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0
})
var collideCube = new THREE.BoxGeometry(300, 100, 70, 8);
var sofaCollideMesh = new THREE.Mesh(collideCube, collideMaterial);
sofaCollideMesh.position.set(135, -50, -620);
sofaCollideMesh.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(sofaCollideMesh);
scene.add(sofaCollideMesh);


// Load the beds
var beds = [];

mtlLoader.load('Bed.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('Bed.obj', function (object) {
        beds = [object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone()];
        for (i = 0; i < beds.length - 1; i++) {
            //console.log(i);
            //console.log(min);
            if (i == 0) {
                min = -460;
                minZ = 230;

            } else if (i == 3) {
                //do the other side
                min = 460;
                minZ = 230;

            }
            if (i < 3) {
                beds[i].rotation.y = Math.PI * 90 / 180;
            } else {
                beds[i].rotation.y = Math.PI * -90 / 180;
            }
            beds[i].position.set(min, -50, minZ);
            beds[i].scale.set(1.5, 1.5, 1.5);
            beds[i].traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.geometry.computeVertexNormals();
                        collidableMeshList.push(child);
                    }
                })
                //console.log(beds[i]);
            minZ -= 230;
            scene.add(beds[i]);
        }

    }, onProgress, onError);
});

// Load final bed
mtlLoader.load('Bed.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('Bed.obj', function (object) {
        object.position.set(50, -50, -700);
        object.rotation.y = Math.PI * 0 / 180;
        object.scale.set(1.5, 1.5, 1.5);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
                collidableMeshList.push(child);
            }
        })
        scene.add(object);
    }, onProgress, onError);
});


// As the bed isn't collidable for some reason, add an invisble box over it that is collidable
collideMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0
})
collideCube = new THREE.BoxGeometry(150, 100, 70, 8);
var bedMesh = new THREE.Mesh(collideCube, collideMaterial);
bedMesh.position.set(50, -50, -720);
bedMesh.receiveShadow = true;
bedMesh.castShadow = true;
bedMesh.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(bedMesh);
scene.add(bedMesh);


var bedSideTables = [];
// Load the bedside tables
mtlLoader.load('bedSideTable.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('bedSideTable.obj', function (object) {
        bedSideTables = [object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone()];

        var sameRoom = true;
        var firstRun = true;
        min = 280;
        minX = -475;
        var intervalLength = 105;

        for (i = 0; i < bedSideTables.length; i++) {
            if (sameRoom) {
                if (firstRun) {
                    firstRun = false;
                } else {
                    min -= intervalLength;
                    sameRoom = false;
                }
            } else {
                min -= 126;
                sameRoom = true;
            }
            // Other side
            if (i == 6) {
                min = 287;
                minX = 475;
                sameRoom = true;
            }
            //console.log(i);
            bedSideTables[i].position.set(minX, -50, min);
            bedSideTables[i].rotation.y = Math.PI * 90 / 180;
            bedSideTables[i].scale.set(1.5, 1.5, 1.5);
            bedSideTables[i].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            scene.add(bedSideTables[i]);
            //console.log(bedSideTables[i].position);

        }

    }, onProgress, onError);
});

var wardrobes = [];

// Load closed wardrobe
mtlLoader.load('closedWardrobe.mtl', function (materials) {

    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('closedWardrobe.obj', function (object) {
        wardrobes = [object.clone(), object.clone(), object.clone(), object.clone(), object.clone()];
        minZ = 330;
        minX = -300;

        for (i = 0; i < wardrobes.length; i++) {
            //console.log(minZ);
            if (i == 3) {
                minX = 300;
                minZ = 342;
            }
            wardrobes[i].position.set(minX, -45, minZ);
            //console.log(wardrobes[i].position);
            wardrobes[i].rotation.y = Math.PI;
            wardrobes[i].scale.set(1.5, 1.5, 1.5);
            wardrobes[i].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            scene.add(wardrobes[i]);
            if (i == 4) {
                minZ = minZ - 200;
            } else {
                minZ = minZ - 250;
            }


        }
        wardrobes[2].position.z += 45;
    }, onProgress, onError);
});

// Load sofas
mtlLoader.load('sofa.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('sofa.obj', function (object) {
        sofas = [object.clone(), object.clone(), object.clone(), object.clone(), object.clone()];
        minZ = 135;
        minX = -320;

        for (i = 0; i < sofas.length; i++) {
            //console.log(minZ);
            if (i == 3) {
                minX = 320;
                minZ = 135;
            }
            sofas[i].position.set(minX, -45, minZ);
            //console.log(wardrobes[i].position);
            //sofas[i].rotation.y = Math.PI * 180 / 180;
            sofas[i].scale.set(1.5, 1.5, 1.5);
            sofas[i].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            scene.add(sofas[i]);
            if (i == 1) {
                minZ = minZ - 275;
            } else {
                minZ = minZ - 200;
            }
        }
    }, onProgress, onError);
});






// Load open wardrobe
mtlLoader.load('openWardrobe.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('openWardrobe.obj', function (object) {
        object.position.set(-80, -45, -600);
        object.rotation.y = Math.PI * 90 / 180;
        object.scale.set(1.5, 1.5, 1.5);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
                collidableMeshList.push(child);
            }
        })
        scene.add(object);
    }, onProgress, onError);
});






// Load the ghost

var ghostLoaded = false;
var ghostOBJ;
var ghostAttacking = false;

function loadGhost() {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('obj/');
    mtlLoader.load('ghost.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load('ghost.obj', function (object) {
            object.position.set(-100, -25, -620);
            object.rotation.y = Math.PI * 90 / 180;
            object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.geometry.computeVertexNormals();
                        collidableMeshList.push(child);
                    }
                })
                //object.scale.set(0.05,0.05,0.05);
            ghostOBJ = object;
            scene.add(ghostOBJ);
        }, onProgress, onError);

    });
    ghostLoaded = true;

}


var testObject;

var innerCounter = 0;
var lightModels = [];

//Load the ceiling lights
mtlLoader.load('ceilingLight.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('ceilingLight.obj', function (object) {
        lightModels = [object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone(), object.clone()];
        min = 170;
        minX = 0;
        for (i = 0; i < lightModels.length; i++) {
            if (min < -320) {
                //console.log("Reached the end");
                if (innerCounter == 0) {
                    //console.log("Setting to left side");
                    min = 220;
                    minX = -350;
                    innerCounter++;
                } else if (innerCounter == 1) {
                    //console.log("Setting to right side");
                    min = 220;
                    minX = 350;
                    innerCounter++;
                } else if (innerCounter == 2) {
                    minX = 40;
                    min = -600;
                }
            }

            lightModels[i].position.set(minX, 80, min);
            lightModels[i].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            scene.add(lightModels[i]);
            min = min - 230;
        }
        //console.log(testObject.geometry);
    }, onProgress, onError);
});


var pointLight1 = new THREE.PointLight(0xFFffff, 0.7, 100);
pointLight1.position.set(-350, 60, 220);
scene.add(pointLight1);

//var testObject2 = testObject.clone();
//testObject2.position.set(0,80,0);
//scene.add(testObject2);

/*
min = 175;
minX = 0;

var pointLight1, pointLight2, pointLight3, pointLight4, pointLight5, pointLight6, pointLight7, pointLight8, pointLight9;
var pointLights = [pointLight1, pointLight2, pointLight3, pointLight4, pointLight5, pointLight6, pointLight7, pointLight8, pointLight9];



for (i=0; i < pointLights.length; i++){
    
    
    if (i > 2 && i <=5){
        min = 175;
        minX = -350;
    }
    else if (i > 5){
        min = 175;
        minX = 350;
    }
    
    pointLights[i] = new THREE.PointLight( 0xFFffff, 1.5, 100 );
    pointLights[i].position.set(minX,55,min);
    scene.add(pointLights[i]); 
    min = min - 230;
    
    console.log(i);
}
*/



//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}