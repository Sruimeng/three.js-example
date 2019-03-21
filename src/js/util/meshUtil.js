
projectUtil.meshUtil = (function () {
    function meshUtil() {}
    meshUtil.prototype = {
        constructor: meshUtil,
        create: function (meshParams, renderer) {
            return new Promise(function(resolve, reject) {
            if (typeof meshParams !== undefined) {
                // this._type = meshParams.type;
                // this._scene = meshParams.scene;
                // this._rgbmCubeRenderTarget = meshParams.rgbmCubeRenderTarget;
                // this._fbxTextureLoader = meshParams.fbxTextureLoader;
                // this._fbxLoader = meshParams.fbxLoader;
                // this._renderer = renderer;
                // this._array = meshParams.arr;
                // this._textFont = meshParams.font;
                // this._text = meshParams.text;
                // this._rotation = meshParams.rotation;
                // this._positon = meshParams.position;
                // this._scale = meshParams.scale;
                // this._textSize = meshParams.size;
                // this._name = meshParams.name;
                // this._color = meshParams.color;
                // this._fbxUrl = meshParams.fbxUrl;
                // this._fbxTextureMapUrl = meshParams.textureMapUrl;
                // this._fbxTextureAoMapUrl = meshParams.textureAoMapUrl;
                // this._fbxTextureNormalMapUrl = meshParams.textureNormalMapUrl;
                // this._fbxTexturealphaMapUrl = meshParams.texturealphaMapUrl;
                // this._transparent = meshParams.transparent;
                // this._fbxNumberBoxArray = meshParams.boxArray;
                //this.init(meshParams);
                projectUtil.meshUtil.prototype.init(meshParams);
                resolve("a");
            }
            
            });
        },
        init: function (params) {
            switch (params.type) {
                case 0:
                    this.textMeshUtil(params);
                    break;
                case 1:
                    this.fbxMeshUtil(params);
                    break;
                case 2:
                    this.fbxNumberMeshUtil(params);
                    break;
                case 3:
                    this.fbxSceneMeshUtil(params);
                    break;
            }
        },
        textMeshUtil: function (params) {
            var geometry = new THREE.TextGeometry(params.text, {
                font: params.font,
                size: params.size,
                height: 0.05,
            });
            var meshMaterial = new THREE.MeshPhongMaterial({
                emissive: 0xfeb19d,
                side: THREE.DoubleSide,
            });
            var textMesh = new THREE.Mesh(geometry, meshMaterial);
            textMesh.name = params.name;
            textMesh.rotation.copy(params.rotation);
            textMesh.scale.copy(params.scale);
            textMesh.position.copy(params.positon);
            params.arr.push(textMesh);
            params.scene.add(textMesh);
        },
        boxMeshUtil: function (mesh, meshParams) {
            if (typeof mesh !== undefined) {
                meshParams._mesh = mesh;
            }
            var box = new THREE.Box3().setFromObject(meshParams._mesh);
            var geo = new THREE.BoxGeometry(Math.abs(box.max.x - box.min.x), Math.abs(box.max.y - box.min.y) + 2, 0.1);
            var material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0,
            });
            material.envMap = meshParams._rgbmCubeRenderTarget.texture;
            var boxMesh = new THREE.Mesh(geo, material);
            boxMesh.position.copy(meshParams._mesh.position);
            boxMesh.rotation.copy(meshParams._mesh.rotation);
            boxMesh.name = meshParams.name;
            meshParams._fbxNumberBoxArray.push(boxMesh);
            meshParams._scene.add(boxMesh);
        },
        fbxMeshUtil: function (meshParams) {
            var params;
            meshParams.fbxLoader.load(meshParams.fbxUrl, function (mesh) {
                params={
                    transparent: meshParams.transparent,
                    roughness: 0.5,
                    metalness: 0.7,
                    color: (meshParams.color !== "") ? meshParams.color : undefined,
                    alphaMap: (meshParams.texturealphaMapUrl !== "") ? meshParams.fbxTextureLoader.load(meshParams.texturealphaMapUrl) : null,
                    map: (meshParams.textureMapUrl !== "") ? meshParams.fbxTextureLoader.load(meshParams.textureMapUrl) : null,
                    normalMap: (meshParams.textureNormalMapUrl !== "") ? meshParams.fbxTextureLoader.load(meshParams.textureNormalMapUrl) : null,
                    aoMap: (meshParams.textureAoMapUrl !== "") ? meshParams.fbxTextureLoader.load(meshParams.textureAoMapUrl) : null,
                    envMap: meshParams.rgbmCubeRenderTarget.texture,
                    needsUpdate: true,
                };
                
                var material = new THREE.MeshStandardMaterial(params); //重置纹理
             // material.normalMap.wrapS = THREE.RepeatWrapping;
                // material.map.wrapS = THREE.RepeatWrapping;
                mesh.children[0].material = material;
                mesh.scale.copy(meshParams.scale);
                meshParams.arr.push(mesh); //添加到场景数组中
                meshParams.scene.add(mesh);
            });
        },
        fbxSceneMeshUtil: function (meshParams) {
            meshParams.fbxLoader.load(meshParams._fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial();
                material.map = mesh.children[0].material.map;
                material.aoMap = meshParams.fbxTextureLoader.load(meshParams.textureAoMapUrl);
                material.envMap = meshParams.rgbmCubeRenderTarget.texture;
                material.needsUpdate = true;
                mesh.children[0].material = material;
                mesh.scale.copy(meshParams.scale);
                meshParams.arr.push(mesh); //添加到场景数组中
                meshParams.scene.add(mesh);
            });
        },
        fbxNumberMeshUtil: function (meshParams) {
            meshParams.fbxLoader.load(meshParams.fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial({
                    transparent: true
                }); //重置纹理
                material.alphaMap = meshParams.fbxTextureLoader.load(meshParams.texturealphaMapUrl);
                material.envMap = meshParams.rgbmCubeRenderTarget.texture;
                material.needsUpdate = true;
                mesh.children[0].material = material;
                mesh.scale.copy(meshParams.scale);
                mesh.position.copy(meshParams.positon);
                mesh.rotation.copy(meshParams.rotation);
                mesh.children[0].name = meshParams.name;
                meshParams.boxMeshUtil(mesh, meshParams);
                meshParams.arr.push(mesh); //添加到场景数组中
                meshParams.scene.add(mesh);
            });
        },
        envMapLoadUtil: function (render) {
            var rgbmCubeRenderTarget;
            return new Promise(function (resolve, reject) {
                new THREE.CubeTextureLoader().setPath('cube/pisaRGBM16/')
                    .load(['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png'], function (rgbmCubeMap) {
                        rgbmCubeMap.encoding = THREE.RGBM16Encoding;
                        rgbmCubeMap.format = THREE.RGBAFormat;
                        var pmremGenerator = new THREE.PMREMGenerator(rgbmCubeMap);
                        pmremGenerator.update(render);
                        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
                        pmremCubeUVPacker.update(render);
                        rgbmCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
                        rgbmCubeMap.magFilter = THREE.LinearFilter;
                        rgbmCubeMap.needsUpdate = true;
                        //scene.background = rgbmCubeMap;
                        pmremGenerator.dispose();
                        pmremCubeUVPacker.dispose();
                        resolve(rgbmCubeRenderTarget);
                    });
            });
        },
        fontLoadUtil:async function(){
            var fontLoader= new THREE.FontLoader();
            var json = await fontLoader.awaitLoad("font/gentilis_bold.typeface.json");
            return json;
        }
    }
    return meshUtil;
})();

