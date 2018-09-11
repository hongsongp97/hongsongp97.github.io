 // - Global variables -
 const STARPIC = 'textures/stars.jpg';
 const SUNPIC = 'textures/sun.jpg';
 const EARTHPIC = 'textures/earth.jpg';
 const VENUSPIC = 'textures/venus.jpg';
 const MERCURYPIC = 'textures/mercury.jpg';
 const MARSPIC = 'textures/mars.jpg';
 //const DOGEPIC = 'textures/doge.jpg';
 const SATURNPIC = 'textures/saturn.jpg';
 const URANUSPIC = 'textures/uranus.png';
 const NEPTUNEPIC = 'textures/neptune.jpg';
 const JUPITORPIC = 'textures/jupitor.jpg';
 const SATURNRINGPIC = 'textures/saturnring.png';
 const URANUSRINGPIC = 'textures/uranusring.png';
 const PLUTOPIC = 'textures/pluto.jpg';


 // Graphics variables
 var container, stats;
 var camera, controls, scene, renderer;
 var txtureLoader;
 var rotateInterval;
 var direction;

 var clock = new THREE.Clock();

 //var orbitController;

 var sun, mercury, venus, earth, mars, jupitor, saturn, uranus, neptune, pluto;
 var saturn_ring, uranus_ring;
 var moon;


 // - Main code -
 init();
 animate();

 // - Functions -
 // initialize
 function init() {
     initGraphics();
     createObjects();
     initInput();
     initEventListeners();
 }

 //initialize event listeners
 function initEventListeners() {
     window.addEventListener('resize', onWindowResize, false);
 }

 //initialize graphics and background panorama
 function initGraphics() {
     if (!Detector.webgl) {
         Detector.addGetWebGLMessage();
         document.getElementById('solar-system').innerHTML = "";
     }
     container = document.getElementById("solar-system");
    //  document.body.appendChild(container);

     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 30000);
     camera.position.z = 10000;
     camera.position.y = 1000;
     camera.position.x = 0;

     scene = new THREE.Scene();
     renderer = new THREE.WebGLRenderer();

     //lighting and colors
     scene.add(new THREE.AmbientLight(0x505050));
     var light = new THREE.SpotLight(0xffffff, 1.5);
     light.position.set(0, 500, 2000);
     //  shadows
     light.castShadow = true;
     light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
     light.shadow.bias = - 0.00022;
     light.shadow.mapSize.width = 2048;
     light.shadow.mapSize.height = 2048;
     scene.add(light);

     var ambLight = new THREE.AmbientLight(0x909090);
     var light = new THREE.PointLight(0xffffff, 2, 10000);

     scene.add(ambLight);
     scene.add(light);

     txtureLoader = new THREE.TextureLoader();
     createPanorama();
 }

 //algorithm to create fish eye panorama
 function createPanorama() {

     var geometry = new THREE.SphereBufferGeometry(15000, 15, 15).toNonIndexed();
     geometry.scale(- 1, 1, 1);
     // Remap UVs
     var correction;
     var normals = geometry.attributes.normal.array;
     var uvs = geometry.attributes.uv.array;
     for (var i = 0, l = normals.length / 3; i < l; i++) {
         var x = normals[i * 3];
         var y = normals[i * 3 + 1];
         var z = normals[i * 3 + 2];
         if (i < l / 2) {
             correction = (x == 0 && z == 0) ? 1 : (Math.acos(y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
             uvs[i * 2] = x * (404 / 1920) * correction + (447 / 1920);
             uvs[i * 2 + 1] = z * (404 / 1080) * correction + (582 / 1080);
         } else {
             correction = (x == 0 && z == 0) ? 1 : (Math.acos(- y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
             uvs[i * 2] = - x * (404 / 1920) * correction + (1460 / 1920);
             uvs[i * 2 + 1] = z * (404 / 1080) * correction + (582 / 1080);
         }
     }
     geometry.rotateZ(- Math.PI / 4);
     
     var texture = new THREE.TextureLoader().load(STARPIC);
     texture.format = THREE.RGBFormat;
     var material = new THREE.MeshBasicMaterial({ map: texture });
     var mesh = new THREE.Mesh(geometry, material);
     scene.add(mesh);
 }

 //initialize user control
 function initInput() {

     //first person controls
     controls = new THREE.FirstPersonControls(camera);
     controls.movementSpeed = 1000;
     controls.lookSpeed = 0.100;
     controls.lookVertical = false;
     controls.enabled = false;


     //automatic orbit
     // orbitController = new THREE.OrbitControls( camera, renderer.domElement );
     orbitController = new THREE.OrbitControls(camera);
     orbitController.enableDamping = false;
     orbitController.dampingFactor = 0.25;
     orbitController.autoRotate = false;
     orbitController.rotateSpeed = 5;

     rotateInterval = setInterval(() => {
         orbitController.rotateLeft(-0.0003);
     }, 5);
     direction = 0;
     $(document).on('mousemove', (e) => {
         let width = $(window).width();
         if (e.pageX < width * 2 / 3) {
             if (direction == 0) return;
             clearInterval(rotateInterval);
             rotateInterval = setInterval(() => {
                 orbitController.rotateLeft(-0.0003);
             }, 5);
             direction = 0;
         } else {
             if (direction == 1) return;
             clearInterval(rotateInterval);
             rotateInterval = setInterval(() => {
                 orbitController.rotateLeft(0.0003);
             }, 5);
             direction = 1;
         }
     });


     /*
     //controls
     controls = new THREE.TrackballControls( camera );
     controls.rotateSpeed = 2.0;
     controls.zoomSpeed = 0.5;
     controls.panSpeed = 0.8;
     controls.noRotate = false;
     controls.noZoom = false;
     controls.noPan = false;
     controls.staticMoving = true;
     controls.dynamicDampingFactor = 0.3;
     */

 }

 //create planets and stars
 function createObjects() {

     //sun
     txtureLoader.load(SUNPIC, function (texture) {
         var geometry_sun = new THREE.SphereGeometry(2000, 40, 40);
         var material_sun = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
         sun = new THREE.Mesh(geometry_sun, material_sun);
         sun.castShadow = true;
         sun.receiveShadow = true;
         scene.add(sun);
     });

     //planets
     txtureLoader.load(MERCURYPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(35, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         mercury = new THREE.Mesh(geometry, material);
         mercury.castShadow = true;
         mercury.receiveShadow = true;
         mercury.position.x = 2400;
         scene.add(mercury);
     });

     txtureLoader.load(VENUSPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(80, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         venus = new THREE.Mesh(geometry, material);
         venus.castShadow = true;
         venus.receiveShadow = true;
         venus.position.x = 2800;
         scene.add(venus);
     });

     txtureLoader.load(EARTHPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(80, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         earth = new THREE.Mesh(geometry, material);
         earth.castShadow = true;
         earth.receiveShadow = true;
         earth.position.x = 3300;
         scene.add(earth);
     });

     txtureLoader.load(MARSPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(70, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         mars = new THREE.Mesh(geometry, material);
         mars.castShadow = true;
         mars.receiveShadow = true;
         mars.position.x = 3800;
         scene.add(mars);
     });

     txtureLoader.load(JUPITORPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(280, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         jupitor = new THREE.Mesh(geometry, material);
         jupitor.castShadow = true;
         jupitor.receiveShadow = true;
         jupitor.position.x = 5200;
         scene.add(jupitor);
     });

     txtureLoader.load(SATURNPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(200, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         saturn = new THREE.Mesh(geometry, material);
         saturn.castShadow = true;
         saturn.receiveShadow = true;
         saturn.position.x = 7000;
         scene.add(saturn);
     });

     txtureLoader.load(SATURNRINGPIC, function (texture) {
         var geometry = new THREE.RingGeometry(220, 420, 32);
         geometry.rotateX(Math.PI / 3);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5, side: THREE.DoubleSide });
         saturn_ring = new THREE.Mesh(geometry, material);
         saturn_ring.castShadow = true;
         saturn_ring.receiveShadow = true;
         saturn_ring.position.x = 7000;
         scene.add(saturn_ring);
     });

     txtureLoader.load(URANUSPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(100, 32, 32);
         var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
         uranus = new THREE.Mesh(geometry, material);
         uranus.castShadow = true;
         uranus.receiveShadow = true;
         uranus.position.x = 8400;
         scene.add(uranus);
     });

     txtureLoader.load(URANUSRINGPIC, function (texture) {
         var geometry = new THREE.RingGeometry(220, 270, 32);
         var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5, side: THREE.DoubleSide });
         uranus_ring = new THREE.Mesh(geometry, material);
         uranus_ring.rotateX(-Math.PI / 3);
         uranus_ring.castShadow = true;
         uranus_ring.receiveShadow = true;
         uranus_ring.position.x = 8400;
         scene.add(uranus_ring);
     });

     txtureLoader.load(NEPTUNEPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(100, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         neptune = new THREE.Mesh(geometry, material);
         neptune.castShadow = true;
         neptune.receiveShadow = true;
         neptune.position.x = 9500;
         scene.add(neptune);
     });

     txtureLoader.load(PLUTOPIC, function (texture) {
         var geometry = new THREE.SphereGeometry(80, 32, 32);
         var material = new THREE.MeshLambertMaterial({ map: texture, overdraw: 0.5 });
         var angle = (17 / 180) * Math.PI;
         pluto = new THREE.Mesh(geometry, material);
         pluto.castShadow = true;
         pluto.receiveShadow = true;
         pluto.position.x = 10500;
         scene.add(pluto);
     });

     function drawCircles(radius) {

         var segments = 64;
         var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
         var geometry = new THREE.CircleGeometry(radius, segments);

         geometry.vertices.shift();
         geometry.rotateX(Math.PI / 2);
         scene.add(new THREE.Line(geometry, material));
     }

     function drawCirclesTilted(radius, theta) {

         var segments = 64;
         var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
         var geometry = new THREE.CircleGeometry(radius, segments);

         geometry.vertices.shift();
         geometry.rotateX((Math.PI / 2) - theta);
         scene.add(new THREE.Line(geometry, material));
     }

     drawCircles(2400);
     drawCircles(2800);
     drawCircles(3300);
     drawCircles(3800);
     drawCircles(5200);
     drawCircles(7000);
     drawCircles(8400);
     drawCircles(9500);
     drawCirclesTilted(10500, (17 * Math.PI) / 180);

     //rendering
     renderer.setClearColor(0x000000);
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.sortObjects = false;
     container.appendChild(renderer.domElement);

     stats = new Stats();
 }

 //event function for resizing window
 function onWindowResize() {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 }


 //loop
 function animate() {

     requestAnimationFrame(animate);

     render();

     /*
     if (orbitController.autoRotate) {

         var multiplier = 2;
         if (Math.abs(camera.position.y) >= 1000)
             multiplier *= -1;
         camera.position.y += multiplier;
     }
     orbitController.update();
     */


     stats.update();

 }

 //loop

 var theta = 0;
 var rotationSpeed = 0.01;
 function render() {

     controls.update(clock.getDelta());

     // objects[3].rotation.y += 0.005;
     // planet.rotation.y += 0.03;

     if (mercury) {
         mercury.position.x = 2400 * Math.cos((47.4 / 5.4) * theta);
         mercury.position.z = 2400 * Math.sin((47.4 / 5.4) * theta);
         mercury.rotation.y += rotationSpeed;
         mercury.rotation.x += 0.01 * rotationSpeed;
     }
     if (sun) {
         sun.rotation.y += 0.01 * rotationSpeed;
         sun.rotation.x += 0.02 * rotationSpeed;

     }
     if (venus) {
         venus.position.x = 2800 * Math.cos((35 / 5.4) * theta);
         venus.position.z = 2800 * Math.sin((35 / 5.4) * theta);
         venus.rotation.y += rotationSpeed;
         venus.rotation.x += 0.01 * rotationSpeed;
     }
     if (earth) {
         earth.position.x = 3300 * Math.cos((29.8 / 5.4) * theta);
         earth.position.z = 3300 * Math.sin((29.8 / 5.4) * theta);
         earth.rotation.y += rotationSpeed;
         earth.rotation.x += 0.01 * rotationSpeed;
     }
     if (mars) {
         mars.position.x = 3800 * Math.cos((24.1 / 5.4) * theta);
         mars.position.z = 3800 * Math.sin((24.1 / 5.4) * theta);
         mars.rotation.y += rotationSpeed;
         mars.rotation.x += 0.01 * rotationSpeed;
     }
     if (jupitor) {
         jupitor.position.x = 5200 * Math.cos((13.1 / 5.4) * theta);
         jupitor.position.z = 5200 * Math.sin((13.1 / 5.4) * theta);
         jupitor.rotation.y += rotationSpeed;
         jupitor.rotation.x += 0.01 * rotationSpeed;
     }
     if (saturn && saturn_ring) {
         saturn.position.x = 7000 * Math.cos((9.7 / 5.4) * theta);
         saturn.position.z = 7000 * Math.sin((9.7 / 5.4) * theta);
         saturn_ring.position.x = 7000 * Math.cos((9.7 / 5.4) * theta);
         saturn_ring.position.z = 7000 * Math.sin((9.7 / 5.4) * theta);
         saturn.rotation.y += rotationSpeed;
         saturn.rotation.x += 0.01 * rotationSpeed;
         saturn_ring.rotation.y += rotationSpeed;
         saturn_ring.rotation.x += 0.01 * rotationSpeed;

     }
     if (uranus && uranus_ring) {
         uranus.position.x = 8400 * Math.cos((6.8 / 5.4) * theta);
         uranus.position.z = 8400 * Math.sin((6.8 / 5.4) * theta);
         uranus_ring.position.x = 8400 * Math.cos((6.8 / 5.4) * theta);
         uranus_ring.position.z = 8400 * Math.sin((6.8 / 5.4) * theta);
         uranus.rotation.y += rotationSpeed;
         uranus.rotation.x += 0.01 * rotationSpeed;
         uranus_ring.rotation.y += rotationSpeed;
         uranus_ring.rotation.x += 0.01 * rotationSpeed;

     }
     if (neptune) {
         neptune.position.x = 9500 * Math.cos(theta);
         neptune.position.z = 9500 * Math.sin(theta);
         neptune.rotation.y += rotationSpeed;
         neptune.rotation.x += 0.01 * rotationSpeed;
     }
     if (pluto) {
         pluto.position.x = 10500 * Math.cos(theta);
         pluto.position.y = 10500 * Math.sin(theta) * Math.cos((73 / 180) * Math.PI);
         pluto.position.z = 10500 * Math.sin(theta);
         pluto.rotation.x += rotationSpeed;
         pluto.rotation.y += rotationSpeed;
     }

     theta += 0.001;
     if (theta == Math.PI * 2 - 0.001) {
         theta = 0;
         pluto.position.x = 10500;
         pluto.position.y = 0;
         pluto.position.z = 0;
     }

     renderer.render(scene, camera);
 }
