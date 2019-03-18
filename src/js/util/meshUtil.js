projectUtil.meshUtil = (function () {
    function meshUtil() {}
    meshUtil.prototype = {
        constructor: meshUtil,
        create: function (meshParams) {
            if (typeof meshParams !== undefined) {
                this._type = meshParams.type;
                this._scene = meshParams.scene;
                this._rgbmCubeRenderTarget = meshParams.rgbmCubeRenderTarget;
                this._fbxTextureLoader = meshParams.fbxTextureLoader;
                this._fbxLoader = meshParams.fbxLoader;

                this._array = meshParams.arr;
                this._textFont = meshParams.font;
                this._text = meshParams.text;
                this._rotation = meshParams.rotation;
                this._positon = meshParams.position;
                this._scale = meshParams.scale;
                this._textSize = meshParams.size;
                this._name = meshParams.name;
                this._color = meshParams.color;
                this._fbxUrl = meshParams.fbxUrl;
                this._fbxTextureMapUrl = meshParams.textureMapUrl;
                this._fbxTextureAoMapUrl = meshParams.textureAoMapUrl;
                this._fbxTextureNormalMapUrl = meshParams.textureNormalMapUrl;
                this._fbxTexturealphaMapUrl = meshParams.texturealphaMapUrl;
                this._transparent = meshParams.transparent;
                this._fbxNumberBoxArray = meshParams.boxArray;
            }
            this.init(this._type);
            return this;
        },
        init: function (type) {
            switch (type) {
                case 0:
                    this.textMeshUtil();
                    break;
                case 1:
                    this.fbxMeshUtil();
                    break;
                case 2:
                    this.fbxNumberMeshUtil();
                    break;
                case 3:
                    this.fbxSceneMeshUtil();
                    break;
            }
        },
        textMeshUtil: function () {
            var geometry = new THREE.TextGeometry(this._text, {
                font: this._textFont,
                size: this._textSize,
                height: 0.05,
            });
            var meshMaterial = new THREE.MeshPhongMaterial({
                emissive: 0xfeb19d,
                side: THREE.DoubleSide,
            });
            var textMesh = new THREE.Mesh(geometry, meshMaterial);
            textMesh.name = this.name;
            textMesh.rotation.copy(this._rotation);
            textMesh.scale.copy(this._scale);
            textMesh.position.copy(this._positon);
            this._array.push(textMesh);
            this._scene.add(textMesh);
        },
        boxMeshUtil: function (mesh, arr) {
            if (typeof mesh !== undefined) {
                this._mesh = mesh;
                this._boxArray = arr;
            }
            var box = new THREE.Box3().setFromObject(this._mesh);
            var geo = new THREE.BoxGeometry(Math.abs(box.max.x - box.min.x), Math.abs(box.max.y - box.min.y) + 2, 0.1);
            var material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0,
            });
            material.envMap = this._rgbmCubeRenderTarget.texture;
            var boxMesh = new THREE.Mesh(geo, material);
            boxMesh.position.copy(this._position);
            boxMesh.rotation.copy(this._rotation);
            boxMesh.name = this.name;
            this._boxArray.push(boxMesh);
            this._scene.add(boxMesh);
            console.log(boxMesh);
        },
        fbxMeshUtil: function () {
            this._fbxLoader.load(this._fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial({
                    transparent: this._transparent,
                    roughness: 0.5,
                    metalness: 0.7,
                    color: (this._color !== "") ? this._color : undefined,
                    alphaMap: (this._fbxTexturealphaMapUrl !== "") ? this._fbxTextureLoader.load(this.texturealphaMapUrl) : null,
                    map: (this._fbxTextureMapUrl !== "") ? this._fbxTextureLoader.load(this._fbxTextureMapUrl) : null,
                    normalMap: (this._fbxTextureNormalMapUrl !== "") ? this._fbxTextureLoader.load(this._fbxTextureNormalMapUrl) : null,
                    aoMap: (this._fbxTextureAoMapUrl !== "") ? this._fbxTextureLoader.load(this._fbxTextureAoMapUrl) : null,
                    envMap: this._rgbmCubeRenderTarget.texture,
                    needsUpdate: true,
                }); //重置纹理
                material.normalMap.wrapS = THREE.RepeatWrapping;
                material.map.wrapS = THREE.RepeatWrapping;
                mesh.children[0].material = material;
                mesh.scale.copy(this._scale);
                this._array.push(mesh); //添加到场景数组中
                this._scene.add(mesh);
            });
        },
        fbxSceneMeshUtil: function () {
            this._fbxLoader.load(this._fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial();
                material.map = mesh.children[0].material.map;
                material.aoMap = this._fbxTextureLoader.load(this._fbxTextureAoMapUrl);
                material.envMap = this._rgbmCubeRenderTarget.texture;
                material.needsUpdate = true;
                mesh.children[0].material = material;
                mesh.scale.copy(this.scale);
                this._array.push(mesh); //添加到场景数组中
                this._scene.add(mesh);
            });
        },
        fbxNumberMeshUtil: function () {
            this._fbxLoader.load(this._fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial({
                    transparent: true
                }); //重置纹理
                material.alphaMap = this._fbxTextureLoader.load(this._fbxTexturealphaMapUrl);
                material.envMap = this._rgbmCubeRenderTarget.texture;
                material.needsUpdate = true;
                mesh.children[0].material = material;
                mesh.scale.copy(this._scale);
                mesh.position.copy(this._positon);
                mesh.rotation.copy(this._rotation);
                mesh.children[0].name = this.name;
                this.boxMeshUtil(mesh, this._fbxNumberBoxArray);
                this._array.push(mesh); //添加到场景数组中
                this._scene.add(mesh);
            });
        },
        envMapLoadUtil: function () {
            var rgbmCubeRenderTarget
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

                });
            return rgbmCubeRenderTarget;
        }
    }
    return meshUtil;
})();