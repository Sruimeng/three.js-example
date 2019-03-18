var Project = function Project() {
    
};

Project.prototype={
    cionstructor:Project,
    createScene:function(){
        
    }
}
Project.prototype.createScene=function createScene() {
    console.log (typeof scope);
    scope.prototype.add=function(controls) {
        controls.enableRotate = true; //开启旋转
        controls.rotateSpeed = 0.1;  //旋转速度
        controls.enableZoom = true; //开启旋转
        controls.zoomSpeed = 0.5;  //旋转速度
        controls.enableDamping = true;//开启阻尼效果
        controls.dampingFactor = 0.1;
        controls.autoRotate = false;//关闭自动旋转
        controls.enablePan = true;//右键拖拽
        controls.minPolarAngle = Math.PI / 18; //设置最小视角1
        controls.maxPolarAngle = Math.PI / 2;   //设置最大视角
        controls.maxDistance = 200;//最大最小缩放距离
        controls.minDistance = 20;
    };
    scope.prototype={
        addSupports:function addSupports(helper) {
            helper = new THREE.AxesHelper(); //在原点添加辅助线
            _scene.add(helper);
        },
        addCamera:function (camera) {
            camera.position.set(0, 0, 1000);
            _scene.add(camera);
        },
        addRenderer : function (renderer) {
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
        },
    }
    scope.addControls(scope._controls);
    scope.addCamera(scope._camera);
    scope.addRenderer(scope._renderer);
}
// Project.create.addControls = function (controls) {
//     controls.enableRotate = true; //开启旋转
//     controls.rotateSpeed = 0.1;  //旋转速度
//     controls.enableZoom = true; //开启旋转
//     controls.zoomSpeed = 0.5;  //旋转速度
//     controls.enableDamping = true;//开启阻尼效果
//     controls.dampingFactor = 0.1;
//     controls.autoRotate = false;//关闭自动旋转
//     controls.enablePan = true;//右键拖拽
//     controls.minPolarAngle = Math.PI / 18; //设置最小视角1
//     controls.maxPolarAngle = Math.PI / 2;   //设置最大视角
//     controls.maxDistance = 200;//最大最小缩放距离
//     controls.minDistance = 20;
// };
//
// Project.create.addCamera = function (camera) {
//     camera.position.set(0, 0, 1000);
//     _scene.add(camera);
// };
//
// Project.create.addRenderer = function (renderer) {
//     renderer = new THREE.WebGLRenderer({
//         antialias: true,  //开启抗锯齿
//         alphe: true,     //开始混合
//     });
//     renderer.setPixelRatio(window.devicePixelRatio); //设置像素比率
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.gammaInput = true;
//     renderer.gammaOutput = true;
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 0.7;
// };
