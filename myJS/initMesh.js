function initMesh() {
    loader.load("fbx/WAT_tuzi.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial(); //重置纹理
        material.map = textureLoader.load("fbx/WAT_tou_d.png");
        material.color = new THREE.Color(0xFDDFC5);
        material.roughness = 0.5; // attenuates roughnessMap
        material.metalness = 0.7; // attenuates metalnessMap
        material.normalMap = textureLoader.load("fbx/WAT_tou_n.png");
        material.aoMap = textureLoader.load("fbx/WAT_di__AO.jpg");
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].material = material;
        mesh.scale.set(0.1, 0.1, 0.1);
        arr[2].push(mesh);//添加到场景数组中
        scene.add(mesh);
    });

    loader.load("fbx/WAT_yifu.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial(); //重置纹理
        material.map = textureLoader.load("fbx/WAT_shen_d.png");
        material.color = new THREE.Color(0xFDD7B7);
        material.roughness = 0.5; // attenuates roughnessMap
        material.metalness = 0.2; // attenuates metalnessMap
        //material.color=0xFDD7B7;
        material.normalMap = textureLoader.load("fbx/WAT_shen_n.png");
        material.normalScale = new THREE.Vector2(0.5, 0.5);
        material.aoMap = textureLoader.load("fbx/WAT_di__AO.jpg");
        material.normalMap.wrapS = THREE.RepeatWrapping;
        material.map.wrapS = THREE.RepeatWrapping;
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].material = material;
        mesh.scale.set(0.1, 0.1, 0.1);
        arr[2].push(mesh);//添加到场景数组中
        scene.add(mesh);

    });

    loader.load("fbx/WAT_yingzi.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial(
            {transparent: true}
        ); //重置纹理
        material.alphaMap = textureLoader.load("fbx/WAT_yingzii_Ao.jpg");
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].material = material;
        mesh.scale.set(0.1, 0.1, 0.1);
        arr[2].push(mesh);//添加到场景数组中
        scene.add(mesh);

    });

    //开始添加第一步到数组中
    // 加载底座
    loader.load("fbx/changjin.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial(); //重置纹理
        material.map = mesh.children[0].material.map; //获取加载模型的纹理
        material.roughness = 0.7; // 设置粗糙度
        material.metalness = 0.7; // 设置金属光泽
        material.aoMap = textureLoader.load("fbx/changjing_AO.jpg"); //加载AO图
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].material = material;
        mesh.scale.set(0.01, 0.01, 0.01);
        arr[0].push(mesh);//添加到场景数组中
        scene.add(mesh);
    });

    //结束添加
    // 加载数字
    loader.load("fbx/3.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial({transparent: true}); //重置纹理
        material.alphaMap = textureLoader.load("fbx/bian.jpg"); //获取加载模型的纹理
        material.roughness = 0.7; // 设置粗糙度
        material.metalness = 0.7; // 设置金属光泽
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        material.color = new THREE.Color(0x3f48cc);
        mesh.children[0].material = material;
        mesh.rotation.x += Math.PI / 2;
        mesh.scale.set(40, 40, 40);
        mesh.position.set(5, 5, 5);
        mesh.children[0].name = "31";
        var mesh1 = mesh.clone();
        mesh1.children[0].material.color = new THREE.Color(0x3e8c85);
        mesh1.position.set(-5, 18, -5);
        mesh1.scale.set(30, 30, 30);
        mesh1.children[0].name = "32";
        arr[1].push(mesh);
        arr[1].push(mesh1);
        scene.add(mesh1);
        scene.add(mesh);
    });

    // 加载数字
    loader.load("fbx/5.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial({transparent: true}); //重置纹理
        material.alphaMap = textureLoader.load("fbx/bian.jpg"); //获取加载模型的纹理
        material.roughness = 0.7; // 设置粗糙度
        material.metalness = 0.7; // 设置金属光泽
        material.color = new THREE.Color(0xffb59f);
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].name = "5";
        mesh.children[0].material = material;
        mesh.rotation.x += Math.PI / 2;
        mesh.scale.set(40, 40, 40);
        mesh.position.set(-5, 7, 2);
        arr[1].push(mesh);
        scene.add(mesh);
    });

    // 加载数字
    loader.load("fbx/7.FBX", function (mesh) {
        material = new THREE.MeshStandardMaterial({transparent: true}); //重置纹理
        material.alphaMap = textureLoader.load("fbx/bian.jpg"); //获取加载模型的纹理
        material.roughness = 0.7; // 设置粗糙度
        material.metalness = 0.7; // 设置金属光泽
        material.color = new THREE.Color(0xf4c760);
        material.envMap = rgbmCubeRenderTarget.texture;
        material.needsUpdate = true;
        mesh.children[0].material = material;
        mesh.rotation.x += Math.PI / 2;
        mesh.scale.set(40, 40, 40);
        mesh.position.set(5, 14, -2);
        mesh.children[0].name = "7";
        arr[1].push(mesh);
        scene.add(mesh);
    });

    textMeshUtil("6cm", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, -1), arr[3], "left6cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, -3), arr[3], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0.2, -3.2), arr[3], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, 1), arr[3], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0.2, 3), arr[3], "dian",new THREE.Vector3(1,1,1),2);

    textMeshUtil("6cm", new THREE.Euler(0,0,0), new THREE.Vector3(-1, -1.5, 0), arr[3], "bottom6cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,0,0), new THREE.Vector3(-3, -1.5, 0), arr[3], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,0), new THREE.Vector3(-3.2, -1.3, 0), arr[3], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,0,0), new THREE.Vector3(1.5, -1.5, 0), arr[3], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,0), new THREE.Vector3(3.5, -1.3, 0), arr[3], "dian",new THREE.Vector3(1,1,1),2);

    textMeshUtil("22cm", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, 8, 0), arr[3], "right22cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, 11, 0), arr[3], "20heng",new THREE.Vector3(20,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(4.8, 19.5, 0), arr[3], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, -1, 0), arr[3], "20heng",new THREE.Vector3(20,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(4.8, -0.5, 0), arr[3], "dian",new THREE.Vector3(1,1,1),2);

    textMeshUtil("11cm", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, -1.5), arr[4], "left6cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, -3.5), arr[4], "4heng",new THREE.Vector3(4,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0.2, -3.7), arr[4], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0, 1.5), arr[4], "4heng",new THREE.Vector3(4,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,-Math.PI/2,0), new THREE.Vector3(-4, 0.2, 3), arr[4], "dian",new THREE.Vector3(1,1,1),2);

    textMeshUtil("10cm", new THREE.Euler(0,0,0), new THREE.Vector3(-1.5, -1.5, 0), arr[4], "bottom6cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,0,0), new THREE.Vector3(-4, -1.5, 0), arr[4], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,0), new THREE.Vector3(-4, -1.3, 0), arr[4], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,0,0), new THREE.Vector3(1.5, -1.5, 0), arr[4], "5heng",new THREE.Vector3(5,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,0), new THREE.Vector3(3.5, -1.3, 0), arr[4], "dian",new THREE.Vector3(1,1,1),2);

    textMeshUtil("35cm", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, 8, 0), arr[4], "right22cm",new THREE.Vector3(1,1,1),1);
    textMeshUtil("-", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, 11, 0), arr[4], "20heng",new THREE.Vector3(20,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(4.8, 19.5, 0), arr[4], "dian",new THREE.Vector3(1,1,1),2);
    textMeshUtil("-", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(5, -1, 0), arr[4], "20heng",new THREE.Vector3(20,1,1),1);
    textMeshUtil(".", new THREE.Euler(0,0,Math.PI/2), new THREE.Vector3(4.8, -0.5, 0), arr[4], "dian",new THREE.Vector3(1,1,1),2);
}

function textMeshUtil(text, rotation, position, array, name,scale,size) {
    new THREE.FontLoader().load("font/gentilis_bold.typeface.json", function (font) {
        var geometry = new THREE.TextGeometry(text, {
            font: font,
            size: size,
            height: 0.05,
        });
        var meshMaterial = new THREE.MeshPhongMaterial({color: 0xfeb19d, emissive: 0xfeb19d, side: THREE.DoubleSide,});
        var textMesh = new THREE.Mesh(geometry, meshMaterial);
        textMesh.name = name;
        textMesh.rotation.copy(rotation);
        textMesh.scale.copy(scale);
        textMesh.position.copy(position);
        array.push(textMesh);
        scene.add(textMesh);
    });
}

function initCubeMap(callback) {

    new THREE.CubeTextureLoader().setPath('cube/pisaRGBM16/')
        .load(['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png'], function (rgbmCubeMap) {
            rgbmCubeMap.encoding = THREE.RGBM16Encoding;
            rgbmCubeMap.format = THREE.RGBAFormat;
            var pmremGenerator = new THREE.PMREMGenerator(rgbmCubeMap);
            pmremGenerator.update(renderer);
            var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
            pmremCubeUVPacker.update(renderer);
            rgbmCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
            rgbmCubeMap.magFilter = THREE.LinearFilter;
            rgbmCubeMap.needsUpdate = true;
            //scene.background = rgbmCubeMap;
            pmremGenerator.dispose();
            pmremCubeUVPacker.dispose();
            callback();
        });
}