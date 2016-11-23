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
var floorGeo = new THREE.PlaneGeometry(1000,1000,5,8);
var floorMat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("img/floor.PNG"), side: THREE.DoubleSide});
var floor = new THREE.Mesh(floorGeo, floorMat);

floor.position.set(0,-50,100);
floor.rotation.x =  Math.PI * 90 / 180;
floor.receiveShadow = true;
scene.add(floor);


// Roof
var roofGeo = new THREE.PlaneGeometry(1000,1000,5,8);
var roofMat = new THREE.MeshPhongMaterial({color:0xffffff, side: THREE.DoubleSide});
var roof = new THREE.Mesh(roofGeo, roofMat);
roof.position.set(0,100,0);
roof.rotation.x =  Math.PI * 90 / 180;
collidableMeshList.push(roof);
roof.receiveShadow = true;
roof.castShadow = true;
scene.add(roof);




// Left wall
cube = new THREE.BoxGeometry(1000,200,5,8);
var cubeMat = new THREE.MeshPhongMaterial({color:0x88898, side: THREE.DoubleSide});
var lWall = new THREE.Mesh(cube, cubeMat);
lWall.position.set(-100,0,100);
lWall.receiveShadow = true;
lWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(lWall);


// Right wall
var rWall = new THREE.Mesh(cube, cubeMat);
rWall.position.set(100,0,100);
rWall.receiveShadow = true;
rWall.rotation.y =  Math.PI * 90 / 180;
collidableMeshList.push(rWall);


// Front wall
var fWall = new THREE.Mesh(cube, cubeMat);
fWall.position.set(0,0,500);
fWall.receiveShadow = true;
collidableMeshList.push(fWall);

// Door frame definition
// Left Frame
var cube = new THREE.BoxGeometry(100,200,5,8);
var lFrame = new THREE.Mesh(cube, cubeMat);
lFrame.position.set(75,0,0);
collidableMeshList.push(lFrame);
lFrame.receiveShadow = true;

// Right Frame
var rFrame = new THREE.Mesh(cube, cubeMat);
rFrame.position.set(-75,0,0);
collidableMeshList.push(rFrame);
rFrame.receiveShadow = true;

// Top Frame
var tFrame = new THREE.Mesh(cube, cubeMat);
tFrame.position.set(0,150,0);
collidableMeshList.push(tFrame);
tFrame.receiveShadow = true;



doorFrame = new THREE.Object3D();
doorFrame.add(rFrame);
doorFrame.add(lFrame);
doorFrame.add(tFrame);
doorFrame.position.z = -300;
scene.add(doorFrame);

room = new THREE.Object3D();
room.add(lWall);
room.add(rWall);
room.add(fWall);
//room.rotation.y =  Math.PI * 90 / 180;
scene.add(room);

var spotLight1, spotLight2, spotLight3, spotLight4, spotLight5;
var corridorLightsArray = [spotLight1, spotLight2, spotLight3, spotLight4, spotLight5];
corridorLights = new THREE.Object3D();
//console.log(corridorLightsArray.length);
var spotLightHelper;
var min = 400; //Where the light strip starts for corridor. Further down the corridor means a lower number than this.

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
    //spotLightHelper = new THREE.SpotLightHelper(corridorLightsArray[i]);
    //scene.add(spotLightHelper);
}

scene.add(corridorLights);

/*
// Define the Ball
var geometry = new THREE.BoxGeometry(5, 5, 20, 0, 0, 50);
var material = new THREE.MeshPhongMaterial({color:0xFF0000});
var ball = new THREE.Mesh(geometry, material);
ball.position.set(0,0,50);
ball.castShadow = true;
scene.add(ball);
*/

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





//var texture = new THREE.Texture();

var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};

/*
var loader = new THREE.ImageLoader( manager );
				loader.load( 'textures/UV_Grid_Sm.jpg', function ( image ) {

					texture.image = image;
					texture.needsUpdate = true;

				} );

*/

//var material = new THREE.MeshPhongMaterial({color:0xFF0000});

var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
};

var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/sofa.obj', function(object) {

    monkey = object;
    monkey.rotation.y = Math.PI;
    monkey.position.set(200,-50,-50);
    monkey.scale.set(0.05,0.05,0.05);
    object.traverse( function ( child ) {
	   if ( child instanceof THREE.Mesh ) {
		    child.material.color = new THREE.Color(0X00FF00);
            child.geometry.computeVertexNormals();
	   }
    } );
scene.add(monkey);
}, onProgress, onError );





//scene.add(camera);
//camera.add(spotLight1);


function onResize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = ( window.innerWidth / window.innerHeight );
  camera.updateProjectionMatrix();
}
