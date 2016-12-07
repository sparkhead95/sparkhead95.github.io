// Movement code

var raycaster;
var controls;
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var passout = document.getElementById('passout');
var objects = [];
var animating = false;
var stageOne = true;
var stageTwo = false;
var stageTwo = false;

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
        //if (canJump === true) velocity.y += 350;
        //canJump = false;
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

var doorMove = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/door.ogg', function (buffer) {
    doorMove.setBuffer(buffer);
    doorMove.setRefDistance(20);

});

var ghostScream = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/scream.ogg', function (buffer) {
    ghostScream.setBuffer(buffer);
    ghostScream.setRefDistance(20);

});

var doorLocked = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/doorlocked.ogg', function (buffer) {
    doorLocked.setBuffer(buffer);
    doorLocked.setRefDistance(20);

});

var liftArrived = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/ping.ogg', function (buffer) {
    liftArrived.setBuffer(buffer);
    liftArrived.setRefDistance(20);

});

var openLift = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/openlift.ogg', function (buffer) {
    openLift.setBuffer(buffer);
    openLift.setRefDistance(20);

});


// Load footsteps
var foot1 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot1.ogg', function (buffer) {
    foot1.setBuffer(buffer);
    foot1.setRefDistance(20);
});
var foot2 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot2.ogg', function (buffer) {
    foot2.setBuffer(buffer);
    foot2.setRefDistance(20);

});
var foot3 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot3.ogg', function (buffer) {
    foot3.setBuffer(buffer);
    foot3.setRefDistance(20);

});
var foot4 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot4.ogg', function (buffer) {
    foot4.setBuffer(buffer);
    foot4.setRefDistance(20);

});
var foot5 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot5.ogg', function (buffer) {
    foot5.setBuffer(buffer);
    foot5.setRefDistance(20);

});
var foot6 = new THREE.PositionalAudio(listener);
//console.log("Playing..");
audioLoader.load('sounds/foot6.ogg', function (buffer) {
    foot6.setBuffer(buffer);
    foot6.setRefDistance(20);

});


function playFootstep() {
    var num = Math.floor(Math.random() * 6) + 1;
    var choice;
    switch (num) {
    case 1:
        choice = foot1;
        break;
    case 2:
        choice = foot2;
        break;
    case 3:
        choice = foot3;
        break;
    case 4:
        choice = foot4;
        break;
    case 5:
        choice = foot5;
        break;
    case 6:
        choice = foot6;
        break;
    }
    character.add(choice);
    choice.play();
}




function openDoor(door) {
    door.add(doorMove);
    doorMove.play();
    var i = 0;
    var intervalNo = 40;
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
    }, intervalNo);
}

function itsLocked(door) {
    door.add(doorLocked);
    doorLocked.play();
    console.log("Called");
    var lockedText = document.createElement('h2');
    lockedText.style.position = 'absolute';
    lockedText.style.width = 200;
    lockedText.style.height = 100;
    lockedText.style.backgroundColor = "transparent";
    lockedText.style.color = "white";
    lockedText.innerHTML = "It's locked!";
    lockedText.style.top = width / 2;
    lockedText.style.left = width / 2;
    document.body.appendChild(lockedText);

    setTimeout(function () {
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

function OpenLiftDoors() {
    var i = 0;
    liftLeftDoor.add(liftArrived);
    liftLeftDoor.add(openLift);
    liftRightDoor.add(openLift);
    openLift.play();
    liftArrived.play();
    var animateDoor = setInterval(function () {


        if (i < 200) {
            liftLeftDoor.position.x -= Math.PI * 10 / 180;
            liftRightDoor.position.x += Math.PI * 10 / 180;
            i++;
        } else {
            clearInterval(animateDoor);
        }
    }, 10);
}



function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

var musicPaused = false;

/*
var sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( 'sounds/steps.ogg', function( buffer ) {
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
					sound1.play();
				});
				character.add( sound1 );
*/



function pauseMusic() {
    if (!musicPaused) {
        sound1.pause();
        musicPaused = true;
    }
}

function playMusic() {
    if (musicPaused) {
        //sound1.play();
        musicPaused = false;
    }
}

var wardrobeDoorsOpened = false;

function OpenWardrobeDoors() {
    lWardrobeDoor.add(doorMove);
    doorMove.play();
    var i = 0;

    var animateDoor = setInterval(function () {
        if (i < 100) {
            lWardrobeDoor.rotation.y -= Math.PI * 1 / 180;
            rWardrobeDoor.rotation.y += Math.PI * 1 / 180;
            i++;
        } else {
            clearInterval(animateDoor);
        }

    }, 40);
}



var wait = false;
var canTouchLights = true;
setInterval(function () {

    if (!wait) {
        wait = true;
        canTouchLights = false;
        //console.log("Setting wait to true");
    } else {
        wait = false;
        canTouchLights = true;
        //console.log("Setting wait to false");

    }
}, 2000);




var diffZAbs = 100;
var diffXAbs = 101;
var ghostAttacked = false;
var j = 0;
var x = 1;
var stageTwoStarted = false;
var addedDiv = false;
var canPlayFootstep = true;
var canPlayFootstepShift = false;


setInterval(function () {
    if (canPlayFootstep) {
        canPlayFootstep = false;
    } else {
        canPlayFootstep = true;
    }

}, 600);

setInterval(function () {
    if (canPlayFootstepShift) {
        canPlayFootstepShift = false;
    } else {
        canPlayFootstepShift = true;
    }

}, 300);


function partTwo() {
    stageOne = false;
    stageTwo = true;
    controls.getObject().position.set(0, 0, 400);
    ghostOBJ.position.set(-100, -25, -620);

}

function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    if (controlsEnabled) {
        var originPoint = character.position.clone();
        if (!wait) {
            //console.log("Not waiting, so move lights");
            if (lightOn) {
                setInterval(function () {
                    if (canTouchLights) {
                        lightsArray[3].position.y = 100;
                        lightOn = false;
                    }
                }, 500);
            } else {
                setInterval(function () {
                    if (canTouchLights) {
                        lightsArray[3].position.y = 80;
                        lightOn = true;
                    }


                }, 500);
            }
        }

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

        // Footsteps check
        if ((moveForward == true) || (moveLeft == true) || (moveRight == true) || (moveBackward == true)) {
            if (shiftRun) {
                if (canPlayFootstepShift) {
                    playFootstep();
                    canPlayFootstepShift = false;
                }
            } else {
                if (canPlayFootstep) {
                    playFootstep();
                    canPlayFootstep = false;
                }
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



        //console.log(originPoint);
        //console.log(controls.getObject().position);
        if (controls.getObject().position == originPoint) {

            // This means we stopped moving. So:
            pauseMusic();
        } else {
            //console.log("Moving");
            //playMusic();
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
                    if (testCollisionResults[i].object.name == "locked") {
                        itsLocked(testCollisionResults[i].object);
                    }
                }
            }
        }


        if (freshStart) {
            //console.log("Moving char");
            controls.getObject().position.set(0, 0, 400);
            OpenLiftDoors();
            freshStart = false;
        }


        // Open wardrobe doors after reach certain Z axes
        if (controls.getObject().position.z < -380) {
            if (!wardrobeDoorsOpened) {
                //console.log("Opening doors");
                wardrobeDoorsOpened = true;
                OpenWardrobeDoors();
                if (!ghostLoaded) {
                    loadGhost();
                }
            }
        }

        // After reaching another Z axis, ghost flies at you
        if ((controls.getObject().position.z < -580) && (controls.getObject().position.x < 40)) {
            ghostAttacking = true;
            ghostOBJ.add(ghostScream);
            ghostScream.play();
        }
        if (wardrobeDoorsOpened) {
            if (ghostAttacking) {
                //console.log("Diff z = " + diffZAbs);
                //console.log("Diff x = " + diffXAbs);
                if (diffZAbs > 2 || diffXAbs > 2) {
                    if (ghostOBJ.position.z < controls.getObject().position.z) {
                        ghostOBJ.position.z += 2;
                    } else {
                        ghostOBJ.position.z -= 2;
                    }
                    if (ghostOBJ.position.x < controls.getObject().position.x) {
                        ghostOBJ.position.x += 2;
                    } else {
                        ghostOBJ.position.x -= 2;
                    }
                    diffZ = ghostOBJ.position.z - controls.getObject().position.z;
                    diffZAbs = Math.abs(diffZ);


                    diffX = ghostOBJ.position.x - controls.getObject().position.x;
                    diffXAbs = Math.abs(diffX);


                    ghostOBJ.lookAt(character);


                } else {
                    ghostAttacking = false;
                    ghostAttacked = true;
                    ghostScream.pause();
                }
            } else if (ghostAttacked) {
                //ghostAttacked = false;
                if (!addedDiv) {
                    passout.style.opacity = "0";
                    passout.style.display = "block";
                    addedDiv = true;
                }
                if (j < 1) {
                    passout.style.opacity = j;
                    j += 0.01;
                    //console.log(j);
                } else if (!stageTwo) {
                    passout.style.opacity = "1";
                    partTwo();
                }
            }

        }

        if (stageTwo) {
            if (!stageTwoStarted) {
                setTimeout(function () {
                    passout.style.display = "none";
                    //console.log("Set to none");
                }, 2000);
                stageTwoStarted = true;
            }


        }


        prevTime = time;

    }
    stats.end();
    renderer.render(scene, camera);

}

animate();
controls.getObject().position.set(0, 10, 400);