function initControls() {
    controls = new THREE.OrbitControls(camera);//参数选择
    controls.enableRotate = true; //开启旋转
    controls.rotateSpeed = 0.1;  //旋转速度
    controls.enableZoom = true; //开启旋转
    controls.zoomSpeed = 0.5;  //旋转速度
    controls.enableDamping = true;//开启阻尼效果
    controls.dampingFactor = 0.15;
    controls.autoRotate = false;//关闭自动旋转
    controls.enablePan = true;//右键拖拽
    controls.minPolarAngle = Math.PI / 18; //设置最小视角1
    controls.maxPolarAngle = Math.PI / 18 * 7;   //设置最大视角
    controls.maxDistance = 200;//最大最小缩放距离
    controls.minDistance = 20;
    window.addEventListener("mousedown", pickNumber);
    window.addEventListener("mousemove", mouseEnter);
}

function initSupports() {
    helper = new THREE.AxesHelper(); //在原点添加辅助线
    scene.add(helper);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0,0,1000);
    scene.add(camera);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,  //开启抗锯齿
        alphe: true,     //开始混合
    });
    renderer.setPixelRatio(window.devicePixelRatio); //设置像素比率
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.7;
    renderer.gammaFactor = 2.2;
}

function initScene() {
    scene = new THREE.Scene(); //新建场景
    scene.background = new THREE.Color(0xffffff);
}