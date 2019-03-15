projectUtil.meshUtil = (function () {
    function meshUtil() {}
    meshUtil.prototype = {
        constructor: meshUtil,
        create: function (meshParams) {
            if (typeof meshParams !== undefined) {
                this._scene = meshParams.scene;
                this._array = meshParams.arr;
            }
            return this;
        },
        textMeshUtil: function (textParams) {
            if (typeof textParams !== undefined) {
                this._textFont = textParams.font;
                this._text = textParams.text;
                this._textRotation = textParams.rotation;
                this._textPositon = textParams.position;
                this._textScale = textParams.scale;
                this._textSize = textParams.size;
                this._textName = textParams.name;
            }
            var geometry = new THREE.TextGeometry(text, {
                font: this._textFont,
                size: this._textSize,
                height: 0.05,
            });
            var meshMaterial = new THREE.MeshPhongMaterial({
                emissive: 0xfeb19d,
                side: THREE.DoubleSide,
            });
            var textMesh = new THREE.Mesh(geometry, meshMaterial);
            textMesh.name = this._textName;
            textMesh.rotation.copy(this._textRotation);
            textMesh.scale.copy(this._textScale);
            textMesh.position.copy(this._textPositon);
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
            material.envMap = rgbmCubeRenderTarget.texture;
            var boxMesh = new THREE.Mesh(geo, material);
            boxMesh.position.copy(this._mesh.position);
            boxMesh.rotation.copy(this._mesh.rotation);
            boxMesh.name = this._mesh.children[0].name;
            this._boxArray.push(boxMesh);
            this._scene.add(boxMesh);
        },
        fbxMeshUtil: function (fbxParams) {
            if (typeof fbxParams !== undefined) {
                this._fbxLoader = fbxParams.fbxLoader;
                this._fbxUrl = fbxParams.fbxUrl;
                this._fbxTextureLoader = fbxParams.fbxTextureLoader;
                this._fbxTextureMapUrl = fbxParams.textureMapUrl;
                this._fbxTextureAoMapUrl = fbxParams.textureAoMapUrl;
                this._fbxTextureNormalMapUrl = fbxParams.textureNormalMapUrl;
                this._fbxTexturealphaMapUrl = fbxParams.texturealphaMapUrl;
                this._fbxScale = fbxParams.scale;
                this._transparent = fbxParams.transparent;
            }
            this._fbxLoader.load(this._fbxUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial({
                    transparent: this._transparent,
                    alphaMap:(this._fbxTexturealphaMapUrl!=="")?this._fbxTextureLoader.load(this.texturealphaMapUrl):null,
                    map:(this._fbxTextureMapUrl!=="")?this._fbxTextureLoader.load(this._fbxTextureMapUrl):null,
                    normalMap:(this._fbxTextureNormalMapUrl!=="")?this._fbxTextureLoader.load(this._fbxTextureNormalMapUrl):null,
                    
                    envMap:this._rgbmCubeRenderTarget.texture,
                    needsUpdate:true,
                }); //重置纹理
                mesh.children[0].material = material;
                mesh.scale.copy(this._fbxScale);
                this._array.push(mesh); //添加到场景数组中
                this._scene.add(mesh);
            });
        },
        fbxSceneMeshUtil: function (fbxSceneMeshParams) {
            if (typeof fbxSceneMeshParams !== undefined) {
                this._fbxLoader = fbxSceneMeshParams.fbxLoader;
                this._fbxUrl = fbxSceneMeshParams.fbxUrl;
                this._fbxTextureLoader = fbxSceneMeshParams.fbxTextureLoader;
                this._fbxTextureMapUrl = fbxSceneMeshParams.textureMapUrl;
                this._fbxTextureAoMapUrl = fbxSceneMeshParams.textureAoMapUrl;
                this._fbxTextureNormalMapUrl = fbxSceneMeshParams.textureNormalMapUrl;
                this._fbxScale = fbxSceneMeshParams.scale;
                this._transparent = fbxSceneMeshParams.transparent;
            }
        },
        fbxNumberMeshUtil: function (fbxNumberParams) {
            if (typeof fbxNumberParams !== undefined) {
                this._fbxNumberLoader = fbxNumberParams.fbxLoader;
                this._fbxNumberUrl = fbxNumberParams.fbxUrl;
                this._fbxNumberTextureLoader = fbxNumberParams.fbxTextureLoader;
                this._fbxNumberTextureUrl = fbxNumberParams.textureUrl;
                this._fbxNumberScale = fbxNumberParams.scale;
                this._fbxNumberRotation = fbxNumberParams.rotation;
                this._fbxNumberPosition = fbxNumberParams.position;
                this._fbxNumberColor = fbxNumberParams.color;
                this._fbxNumberName = fbxNumberParams.name;
                this._fbxNumberBoxArray = fbxNumberParams.boxArray;
            }
            this._fbxNumberLoader.load(this._fbxNumberUrl, function (mesh) {
                var material = new THREE.MeshStandardMaterial({
                    transparent: true
                }); //重置纹理
                material.alphaMap = this._fbxNumberTextureLoader.load(this._fbxNumberTextureUrl);
                material.envMap = this._rgbmCubeRenderTarget.texture;
                material.needsUpdate = true;
                mesh.children[0].material = material;
                mesh.scale.copy(this._fbxScale);
                mesh.position.copy(this._fbxNumberPosition);
                mesh.rotation.copy(this._fbxNumberRotation);
                mesh.children[0].name = this._fbxNumberName;
                this.boxMeshUtil(mesh, this._fbxNumberBoxArray);
                this._array.push(mesh); //添加到场景数组中
                this._scene.add(mesh);
            });
        }
    }
    return meshUtil;
})();