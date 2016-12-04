// Movement code

var raycaster;
var controls;
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var objects = [];
var animating = false;

objects.push(floor);

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {

    var element = document.body;

    var pointerlockchange = function (event) {

        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';

        } else {

            controls.enabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            instructions.style.display = '';

        }

    };

    var pointerlockerror = function (event) {

        instructions.style.display = '';

    };

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {
        instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {
            var fullscreenchange = function (event) {

                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);
                    element.requestPointerLock();
                }
            };
            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

            element.requestFullscreen();
        } else {
            element.requestPointerLock();
        }
    }, false);

} else {

    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var shiftRun = false;
var canJump = false;
var interactable = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

controls = new THREE.PointerLockControls(camera);
controls.getObject().position.set(0, -50, 400);
scene.add(controls.getObject());

var onKeyDown = function (event) {

    switch (event.keyCode) {

    case 38: // up
    case 87: // w
        moveForward = true;
        break;


    case 69: // E        
        interactable = true;
        break

    case 37: // left
    case 65: // a
        moveLeft = true;
        break;

    case 40: // down
    case 83: // s
        moveBackward = true;
        break;

    case 39: // right
    case 68: // d
        moveRight = true;
        break;

    case 32: // space
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;

    case 16: //shift
        shiftRun = true;
        break;

    }

};

var onKeyUp = function (event) {

    switch (event.keyCode) {

    case 38: // up
    case 87: // w
        moveForward = false;
        break;


    case 69: // E        
        interactable = false;
        break;


    case 37: // left
    case 65: // a
        moveLeft = false;
        break;

    case 40: // down
    case 83: // s
        moveBackward = false;
        break;

    case 39: // right
    case 68: // d
        moveRight = false;
        break;

    case 16: //shift
        shiftRun = false;
        break;

    }

};

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

function resetCharacter(character) {
    character.position.x = 0;
    character.position.y = 0;
    character.position.z = 400;
}


// Interaction with objects. We'll have an invisible cube in front of the player at all times. If the cube collides with an object, and the character presses "E", that object will 'interact'. Definition of the cube is in the custom.js

function openDoor(door) {

    var i = 0;
    //console.log(oppositeDoorIDs);
    var animateDoor = setInterval(function () {

        if (i < 100) {
            if (oppositeDoorIDs.includes(door.id)) {
                if (door.name == "closed") {
                    door.rotation.y += Math.PI * 1 / 180;
                    i++;
                } else {
                    door.rotation.y -= Math.PI * 1 / 180;
                    i++;
                }
            } else {
                if (door.name == "closed") {
                    door.rotation.y -= Math.PI * 1 / 180;
                    i++;
                } else {
                    door.rotation.y += Math.PI * 1 / 180;
                    i++;
                }
            }

        } else {
            clearInterval(animateDoor);
            animating = false;
            if (door.name == "closed") {
                door.name = "open";
            } else {
                door.name = "closed";
            }
        }
    }, 40)
}

function itsLocked(){
    
    console.log("Called");
    var lockedText = document.createElement('h2');
    lockedText.style.position = 'absolute';
    lockedText.style.width = 200;
    lockedText.style.height = 100;
    lockedText.style.backgroundColor = "transparent";
    lockedText.style.color = "white";
    lockedText.innerHTML = "It's locked!";
    lockedText.style.top = width / 2;
    lockedText.style.left = width /2;
    document.body.appendChild(lockedText); 
    
    setTimeout(function(){
       document.body.removeChild(lockedText);   
    }, 3000); 
    
    
    
}


raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, 10);
var rayRAY = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, 30);
var lastFreeX;
var lastFreeY;
var lastFreeZ;
var lightOn = true;

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

var mouse = new THREE.Vector2();


function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

var musicPaused = false;


var sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( 'sounds/steps.ogg', function( buffer ) {
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
					sound1.play();
				});
				character.add( sound1 );


function pauseMusic(){
    if (!musicPaused){
        sound1.pause();
        musicPaused = true; 
    } 
}

function playMusic(){
    if (musicPaused){
        sound1.play();
        musicPaused = false; 
    } 
}


function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    if (controlsEnabled) {



        var originPoint = character.position.clone();
        setInterval(function () {
            if (lightOn) {
                lightsArray[3].position.y = 100;
                lightOn = false;
            } else {
                lightsArray[3].position.y = 80;
                lightOn = true;
            }
        }, 10);
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;
        var intersections = raycaster.intersectObjects(objects);
        var isOnObject = intersections.length > 0;
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        var hit = false;


        for (var vertexIndex = 0; vertexIndex < character.geometry.vertices.length; vertexIndex++) {
            var localVertex = character.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(character.matrix);
            var directionVector = globalVertex.sub(character.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(collidableMeshList);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                hit = true;
                //console.log("hit");
            }
        }

        if (hit == false) {
            //console.log("reset free");
            lastFreeX = character.position.x;
            lastFreeY = character.position.y;
            lastFreeZ = character.position.z;
            //console.log(lastFreeX);
            //console.log(lastFreeY);
            //console.log(lastFreeZ);

        }

        if (moveForward) {
            velocity.z -= 800.0 * delta;
        }

        if (moveBackward) {
            velocity.z += 800.0 * delta;
        }


        if (moveLeft) {
            velocity.x -= 800.0 * delta;
        }

        if (moveRight) {
            velocity.x += 800.0 * delta;
        }


        if (shiftRun && moveForward) {
            velocity.z -= 1500.0 * delta;
        }

        if (isOnObject === true) {
            velocity.y = Math.max(0, velocity.y);

            canJump = true;
        }

        //console.log("hit statement");
        //console.log(hit);
        if (!hit) {
            controls.getObject().translateX(velocity.x * delta);
            controls.getObject().translateY(velocity.y * delta);
            controls.getObject().translateZ(velocity.z * delta);
        } else {
            controls.getObject().position.x = lastFreeX;
            controls.getObject().position.y = lastFreeY;
            controls.getObject().position.z = lastFreeZ;
            hit = false;
            //console.log(controls.getObject().position);
            //console.log(lastFreePoint);

        }


        if (controls.getObject().position.y < 10) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }


        // Handle out of bounds
        if (controls.getObject().position.x > 560) {
            resetCharacter(controls.getObject());
            console.log("X was out positive! Reset character.");
        } else if (controls.getObject().position.x < -565) {
            resetCharacter(controls.getObject());
            console.log("X was out negative! Reset character.");
        } else if (controls.getObject().position.z > 500) {
            resetCharacter(controls.getObject());
            console.log("Z was out positive! Reset character.");
        } else if (controls.getObject().position.z < -765) {
            resetCharacter(controls.getObject());
            console.log("Z was out negative! Reset character.");
        }


        //console.log(controls.getObject().position);
        var pos = (controls.getObject().position);
        character.position.set(pos.x, pos.y, pos.z);
        //interactionCube.position.set(pos.x,pos.y, pos.z - 1);
        //console.log(character.position);

        rayRAY.ray.origin.set(controls.getObject().position);
        rayRAY.ray.direction.set(controls.getObject().rotation);
        rayRAY.setFromCamera(mouse, camera);

        
        
        console.log(originPoint);
        console.log(controls.getObject().position);
        if (controls.getObject().position == originPoint){
            
            // This means we stopped moving. So:
            pauseMusic();
        }
        else{
            console.log("Moving");
            playMusic();
        }
        

        var testCollisionResults = rayRAY.intersectObjects(collidableMeshList);
        // For all collisions
        for (var i = 0; i < testCollisionResults.length; i++) {
            // Check whether we can interact with the object (whether E is pressed)
            if (interactable) {
                // Check whether we're already animating
                if (!animating) {
                    // Check whether it's a door
                    if (testCollisionResults[i].object.name == "closed" || testCollisionResults[i].object.name == "open") {
                        openDoor(testCollisionResults[i].object);
                        animating = true;
                        interactable = false;
                    }
                    // Check whether it's locked (might not be a door)
                    if (testCollisionResults[i].object.name == "locked"){
                        itsLocked();
                    }
                }

               

            }

        }









        //console.log(ray);
        //console.log(controls.getObject().rotation.y);

        prevTime = time;


    }
    stats.end();
    renderer.render(scene, camera);

}




animate();
controls.getObject().position.set(0, 10, 400);