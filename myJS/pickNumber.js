function pickNumber(event) {

    var rayCaster = new THREE.Raycaster();
    var rect = renderer.domElement.getBoundingClientRect();
    mousePoint.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mousePoint.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    //从相机发射一条射线，经过鼠标点击位置
    rayCaster.setFromCamera(mousePoint, camera);
    //计算射线相机到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
    var interSection = rayCaster.intersectObjects(arr[1], true);//设置监听模型
    if (interSection.length > 0) {
        pickUtil(parseInt(interSection[0].object.name));
    }
}

function pickUtil(num) {
    rotationFlag = true;
    switch (num) {
        case 31:
            cameraAnimation(camera.position,{x:45,y:27,z:13},1000,TWEEN.Easing.Linear.None);
            document.getElementById("imageNum").style.backgroundImage = "url(\"./img/3damo.png\")";
            break;
        case 32:
            cameraAnimation(camera.position,{x:-39,y:30,z:24},1000,TWEEN.Easing.Linear.None);
            document.getElementById("imageNum").style.backgroundImage = "url(\"./img/3baozhuang.png\")";
            break;
        case 5:
            cameraAnimation(camera.position,{x:-35,y:32,z:-30},1000,TWEEN.Easing.Linear.None);
            document.getElementById("imageNum").style.backgroundImage = "url(\"./img/5paoguang.png\")";
            break;
        case 7:
            cameraAnimation(camera.position,{x:40,y:30,z:-23},1000,TWEEN.Easing.Linear.None);
            document.getElementById("imageNum").style.backgroundImage = "url(\"./img/7miaohui.png\")";
            break;
    }
}

