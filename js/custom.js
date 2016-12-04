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

/*
var axis = new THREE.AxisHelper(10);
scene.add(axis);
*/

var collidableMeshList = [];


// Define a corridor

/*
// Floor
var floorGeo = new THREE.PlaneGeometry(1000,1750,5,8);
var floorTx = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("img/floortex.jpg"), side: THREE.DoubleSide});
floorMat.wrapS = floorMat.wrapT = THREE.RepeatWrapping;
floorMat.repeat.set(2, 2);


var floor = new THREE.Mesh(floorGeo, floorMat);

floor.position.set(0,-50,100);
floor.rotation.x =  Math.PI * 90 / 180;
floor.receiveShadow = true;
scene.add(floor);
*/


var floorGeo = new THREE.BoxGeometry(1000, 1750, 5, 8);
var floorTx = THREE.ImageUtils.loadTexture('img/floortex.jpg');
var floorNormalTx = THREE.ImageUtils.loadTexture('img/floornormal.png');
floorTx.wrapS = floorTx.wrapT = THREE.RepeatWrapping;
floorTx.repeat.set(10, 10);
floorNormalTx.wrapS = floorTx.wrapT = THREE.RepeatWrapping;
floorNormalTx.repeat.set(10, 10);
var floorMat = new THREE.MeshPhongMaterial({
    map: floorTx
});
floorMat.normalScale.set(0.2, 0.2);
var floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.set(0, -50, 100);
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
cube = new THREE.BoxGeometry(200, 200, 5, 8);
var cubeMat = new THREE.MeshPhongMaterial({
    color: 0x88898,
    side: THREE.DoubleSide
});
var lWall = new THREE.Mesh(cube, cubeMat);
lWall.position.set(-50, 0, 450);
lWall.receiveShadow = true;
lWall.castShadow = true;
lWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(lWall);
scene.add(lWall);

// Right wall
var rWall = new THREE.Mesh(cube, cubeMat);
rWall.position.set(50, 0, 450);
rWall.receiveShadow = true;
rWall.castShadow = true;
rWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(rWall);
scene.add(rWall);


// Back wall
cube = new THREE.BoxGeometry(1000, 200, 5, 8);
var fWall = new THREE.Mesh(cube, cubeMat);
fWall.position.set(0, 0, 500);
fWall.receiveShadow = true;
fWall.castShadow = true;
collidableMeshList.push(fWall);
scene.add(fWall);

// front left wall
cube = new THREE.BoxGeometry(55, 200, 5, 8);
var fLWall = new THREE.Mesh(cube, cubeMat);
fLWall.position.set(-75, 0, 350);
fLWall.receiveShadow = true;
fLWall.castShadow = true;
collidableMeshList.push(fLWall);
scene.add(fLWall);

// front right wall
cube = new THREE.BoxGeometry(55, 200, 5, 8);
var fRWall = new THREE.Mesh(cube, cubeMat);
fRWall.position.set(75, 0, 350);
fRWall.receiveShadow = true;
fRWall.castShadow = true;
collidableMeshList.push(fRWall);
scene.add(fRWall);


// Far left wall
cube = new THREE.BoxGeometry(1500, 200, 5, 8);
var farLWall = new THREE.Mesh(cube, cubeMat);
farLWall.position.set(-500, 0, -250);
farLWall.receiveShadow = true;
farLWall.castShadow = true;
farLWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(farLWall);
scene.add(farLWall);

// Far right wall
var farRWall = new THREE.Mesh(cube, cubeMat);
farRWall.position.set(500, 0, -250);
farRWall.receiveShadow = true;
farRWall.castShadow = true;
farRWall.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(farRWall);
scene.add(farRWall);

// Far front wall
cube = new THREE.BoxGeometry(1000, 200, 5, 8);
var farFWall = new THREE.Mesh(cube, cubeMat);
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
secretLSep = new THREE.Mesh(cube, cubeMat);
secretLSep.position.set(-300, 0, 350);
secretLSep.receiveShadow = true;
secretLSep.castShadow = true;
collidableMeshList.push(secretLSep);
scene.add(secretLSep);

var min = 100; // Where the first separator is on the Z axis
var startX = -300;

for (i = 0; i < leftSeparators.length; i++) {
    leftSeparators[i] = new THREE.Mesh(cube, cubeMat);
    leftSeparators[i].position.set(-300, 0, min);
    leftSeparators[i].receiveShadow = true;
    leftSeparators[i].castShadow = true;
    collidableMeshList.push(leftSeparators[i]);
    scene.add(leftSeparators[i]);
    min = min - 200;
}

min = 100;

for (i = 0; i < rightSeparators.length; i++) {
    rightSeparators[i] = new THREE.Mesh(cube, cubeMat);
    rightSeparators[i].position.set(300, 0, min);
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
var cube = new THREE.BoxGeometry(150, 200, 5, 8);
var tCube = new THREE.BoxGeometry(200, 50, 5, 8);


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

    lFrameArray[i] = new THREE.Mesh(cube, cubeMat); // Define the sides of the frame
    rFrameArray[i] = new THREE.Mesh(cube, cubeMat); // Define the sides of the frame

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


var tCube = new THREE.BoxGeometry(500, 50, 5, 8);
var leftTFrame = new THREE.Mesh(tCube, cubeMat);
leftTFrame.position.set(-100, 75, 0);
leftTFrame.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(leftTFrame);
leftTFrame.castShadow = true;
leftTFrame.receiveShadow = true;
scene.add(leftTFrame);

var rightTFrame = new THREE.Mesh(tCube, cubeMat);
rightTFrame.position.set(100, 75, 0);
rightTFrame.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(rightTFrame);
rightTFrame.castShadow = true;
rightTFrame.receiveShadow = true;
scene.add(rightTFrame);


// Final door Frame
var cube = new THREE.BoxGeometry(500, 200, 5, 8);
finalLFrame = new THREE.Mesh(cube, cubeMat);
finalRFrame = new THREE.Mesh(cube, cubeMat);
finalTFrame = new THREE.Mesh(cube, cubeMat);
finalLFrame.position.set(300, 0, -375); // Define their position
finalRFrame.position.set(-300, 0, -375);
finalTFrame.position.set(0, 150, -375);
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


// Final door
cube = new THREE.BoxGeometry(50, 100, 5, 8);
cube.translate(25,0,0);
cubeMat = new THREE.MeshPhongMaterial({
    color: 0x7A5230,
    side: THREE.DoubleSide
});
var leftDoor = new THREE.Mesh(cube, cubeMat);
leftDoor.position.set(-50, 0, -375);
collidableMeshList.push(leftDoor);
leftDoor.castShadow = true;
leftDoor.receiveShadow = true;
scene.add(leftDoor);

var rightDoor = new THREE.Mesh(cube, cubeMat);
rightDoor.position.set(5, 0, -362); //Z should be -345
rightDoor.rotation.y = Math.PI * 90 / 180;
collidableMeshList.push(rightDoor);
rightDoor.castShadow = true;
rightDoor.receiveShadow = true;
//oppositeDoorIDs.push(rightDoor.id);
scene.add(rightDoor);


// Let's make all of the doors
var Door1, Door2, Door3, Door4, Door5, Door6; // 1 to 3 is left side, 4 to 6 is right
var doorsArray = [Door1, Door2, Door3, Door4, Door5, Door6];
doors = new THREE.Object3D();
var minZ = 225; //Where the left door array starts for left side corridor. Further down the corridor means a lower number than this.
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
            
        }
    }

    doorsArray[i] = new THREE.Mesh(cube, cubeMat);
    doorsArray[i].position.set(minX, 0, minZ);
    doorsArray[i].rotation.y = Math.PI * 90 / 180;
    if (!resetAxis){
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
    lightsArray[i].position.set(minX, 80, min);
    //pointLightsArray[i].position.set(minX,95,min);
    lightsArray[i].target.position.set(minX, 0, min);
    min = min - 230;
    lightsArray[i].penumbra = 1;
    if (expandLightRadius) {
        lightsArray[i].angle = 1;
    } else {
        lightsArray[i].angle = 0.7;
    }

    lightsArray[i].castShadow = true;
    lightsArray[i].target.updateMatrixWorld();
    mapLights.add(lightsArray[i]);
    //mapPointLights.add(pointLightsArray[i]);
    lightCounter++;
    if (lightCounter == 4) {
        expandLightRadius = true;
    }
    //console.log(lightsArray[i]);
    //spotLightHelper = new THREE.SpotLightHelper(lightsArray[i]);
    //scene.add(spotLightHelper);
}

scene.add(mapLights);
scene.add(mapPointLights);

/*
// test light
var testLight = new THREE.SpotLight(0xFFffff,10);
testLight.position.set(-250,95,-200);
testLight.target.position.set(-250,0,-200);
testLight.penumbra = 1;
testLight.angle = 0.5;
testLight.castShadow = true;
testLight.intensity = 1;
testLight.target.updateMatrixWorld();
scene.add(testLight);
var spotLightHelper5 = new THREE.SpotLightHelper(testLight);
scene.add(spotLightHelper5);
*/

// Final room light
var fallenLamp = new THREE.SpotLight(0xFFffff, 10);
fallenLamp.position.set(395, -40, -610);
fallenLamp.target.position.set(45, 0, -340);
fallenLamp.penumbra = 1;
fallenLamp.shadowMapHeight = 2048;
fallenLamp.shadowMapWidth = 2048;
fallenLamp.shadowDarkness = 0.2;
fallenLamp.angle = 0.25;
fallenLamp.castShadow = true;
fallenLamp.intensity = 3;
fallenLamp.distance = 700;
fallenLamp.target.updateMatrixWorld();
scene.add(fallenLamp);
var fallenBulb = new THREE.PointLight(0xFFffff, 2, 100);
fallenBulb.position.set(400, -40, -620);
scene.add(fallenBulb);
//spotLightHelper = new THREE.SpotLightHelper(fallenLamp);
//scene.add(spotLightHelper);


var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
camera.rotation.x = Math.PI * 90 / 180;

var ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
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

// Load the fallen lamp
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('obj/');
mtlLoader.load('Lamp.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('Lamp.obj', function (object) {

        object.position.set(450, -40, -650);
        object.rotation.x = Math.PI * 73 / 180;
        //object.rotation.y = Math.PI * 90/180;
        object.rotation.z = Math.PI * 55 / 180;
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

// Load the beds
mtlLoader.load('Bed.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('obj/');
    objLoader.load('Bed.obj', function (object) {
        object.position.set(-450, -50, 230);
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

var testObject;
min = 170;

for (i = 0; i < 9; i++) {
    //Load the ceiling lights
    mtlLoader.load('ceilingLight.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load('ceilingLight.obj', function (object) {
            object.position.set(0, 80, min);
            min = min - 230;
            //object.rotation.y = Math.PI * 90/180;
            //object.scale.set(1.5,1.5,1.5);
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.geometry.computeVertexNormals();
                    collidableMeshList.push(child);
                }
            })
            testObject = object;
            scene.add(testObject);
            //console.log(testObject.geometry);
        }, onProgress, onError);
    });





}


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



/*
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
*/

//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}