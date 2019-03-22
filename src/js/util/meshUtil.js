projectUtil.meshUtil = (function () {
    function meshUtil() {}
    meshUtil.prototype = {
        constructor: meshUtil,
        create: function (meshParams, renderer) {
            if (typeof meshParams !== undefined) {
                this._type = meshParams.type;
                this._scene = meshParams.scene;
                this._rgbmCubeRenderTarget = meshParams.rgbmCubeRenderTarget;
                this._fbxTextureLoader = meshParams.fbxTextureLoader;
                this._fbxLoader = meshParams.fbxLoader;
                this._renderer = renderer;
                this._arr = meshParams.arr;
                this._font = meshParams.font;
                this._text = meshParams.text;
                this._rotation = meshParams.rotation;
                this._positon = meshParams.position;
                this._scale = meshParams.scale;
                this._size = meshParams.size;
                this._name = meshParams.name;
                this._color = meshParams.color;
                this._fbxUrl = meshParams.fbxUrl;
                this._textureMapUrl = meshParams.textureMapUrl;
                this._textureAoMapUrl = meshParams.textureAoMapUrl;
                this._textureNormalMapUrl = meshParams.textureNormalMapUrl;
                this._texturealphaMapUrl = meshParams.texturealphaMapUrl;
                this._transparent = meshParams.transparent;
                this._boxArray = meshParams.boxArray;
                this.init(this._type);
            }
        },
        init: function (type) {
            switch (type) {
                // case 0:
                //     this.textMeshUtil();
                //     break;
                case 1:
                    this.fbxMeshUtil();
                    break;
                    // case 2:
                    //     this.fbxNumberMeshUtil();
                    //     break;
                    // case 3:
                    //     this.fbxSceneMeshUtil();
                    //     break;
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
        fbxMeshUtil: async function () {
            var params,mesh;
            // this._fbxLoader.load(this._fbxUrl, function (mesh) {
            //     params = {
            //         transparent: this._transparent,
            //         roughness: 0.5,
            //         metalness: 0.7,
            //         color: (this._color !== "") ? this._color : undefined,
            //         alphaMap: (this._texturealphaMapUrl !== "") ? this._fbxTextureLoader.load(this._texturealphaMapUrl) : null,
            //         map: (this._textureMapUrl !== "") ? this._fbxTextureLoader.load(this._textureMapUrl) : null,
            //         normalMap: (this._textureNormalMapUrl !== "") ? this._fbxTextureLoader.load(this._textureNormalMapUrl) : null,
            //         aoMap: (this._textureAoMapUrl !== "") ? this._fbxTextureLoader.load(this._textureAoMapUrl) : null,
            //         envMap: this._rgbmCubeRenderTarget.texture,
            //         needsUpdate: true,
            //     };

            //     var material = new THREE.MeshStandardMaterial(params); //重置纹理
            //     // material.normalMap.wrapS = THREE.RepeatWrapping;
            //     // material.map.wrapS = THREE.RepeatWrapping;
            //     mesh.children[0].material = material;
            //     mesh.scale.copy(this._scale);
            //     this._arr.push(mesh); //添加到场景数组中
            //     this._scene.add(mesh);
            // });
            params = {
                transparent: this._transparent,
                roughness: 0.5,
                metalness: 0.7,
                color: (this._color !== "") ? this._color : undefined,
                alphaMap: (this._texturealphaMapUrl !== "") ?await this._fbxTextureLoader.awaitLoad(this._texturealphaMapUrl) : null,
                map: (this._textureMapUrl !== "") ?await this._fbxTextureLoader.awaitLoad(this._textureMapUrl) : null,
                normalMap: (this._textureNormalMapUrl !== "") ?await this._fbxTextureLoader.awaitLoad(this._textureNormalMapUrl) : null,
                aoMap: (this._textureAoMapUrl !== "") ?await this._fbxTextureLoader.awaitLoad(this._textureAoMapUrl) : null,
                envMap: this._rgbmCubeRenderTarget.texture,
                needsUpdate: true,
            };

            var material = new THREE.MeshStandardMaterial(params); //重置纹理
            console.log(material)
            mesh = await this._fbxLoader.awaitLoad(this._fbxUrl);
            material.normalMap.wrapS = THREE.RepeatWrapping;
            material.map.wrapS = THREE.RepeatWrapping;
            mesh.children[0].material = material;
            mesh.scale.copy(this._scale);
            this._arr.push(mesh); //添加到场景数组中
            this._scene.add(mesh);
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
        envMapLoadUtil: async function (render) {
            var rgbmCubeRenderTarget;
            var cubeTexture = new THREE.CubeTextureLoader();
            cubeTexture.setPath('cube/pisaRGBM16/');
            rgbmCubeMap = await cubeTexture.load(['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png']);
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
            return rgbmCubeRenderTarget;
        },
        fontLoadUtil: async function () {
            var fontLoader = new THREE.FontLoader();
            var json = await fontLoader.awaitLoad("font/gentilis_bold.typeface.json");
            console.log(json);
            return json;
        }
    }
    return meshUtil;
})();