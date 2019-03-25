projectUtil.meshUtil = (function () {
    function meshUtil() {}
    meshUtil.prototype = {
        constructor: meshUtil,
        create: async function (meshParams, renderer) {
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
                await this.init(this._type);
            }
        },
        init: async function (type) {
            switch (type) {
                case 0:
                    await this.textMeshUtil();
                    break;
                case 1:
                    await this.fbxMeshUtil();
                    break;
                case 2:
                    await this.fbxNumberMeshUtil();
                    break;
                case 3:
                    await this.fbxSceneMeshUtil();
                    break;
            }
        },
        textMeshUtil: function () {
            var geometry = new THREE.TextGeometry(this._text, {
                font: this._font,
                size: this._size,
                height: 0.05,
            });
            var meshMaterial = new THREE.MeshPhongMaterial({
                emissive: 0xfeb19d,
                side: THREE.DoubleSide,
            });
            var textMesh = new THREE.Mesh(geometry, meshMaterial);
            textMesh.name = this._name;
            textMesh.rotation.copy(this._rotation);
            textMesh.scale.copy(this._scale);
            textMesh.position.copy(this._positon);
            this._arr.push(textMesh);
            this._scene.add(textMesh);
        },
        boxMeshUtil:async function (mesh,arr) {
            if (typeof mesh !== undefined) {
                this._mesh = mesh;
            }
            var box = new THREE.Box3().setFromObject(this._mesh);
            var geo = new THREE.BoxGeometry(Math.abs(box.max.x - box.min.x), Math.abs(box.max.y - box.min.y) + 2, 0.1);
            var material = new THREE.MeshStandardMaterial({
                transparent: true,
                opacity: 0,
            });
            material.envMap = this._rgbmCubeRenderTarget.texture;
            var boxMesh = new THREE.Mesh(geo, material);
            boxMesh.position.copy(this._mesh.position);
            boxMesh.rotation.copy(this._mesh.rotation);
            boxMesh.name = this.name;
            arr.push(boxMesh);
            this._scene.add(boxMesh);
        },
        fbxMeshUtil: async function () {
            var params, mesh;
            params = {
                transparent: this._transparent,
                roughness: 0.5,
                metalness: 0.7,
                color: (this._color !== "") ? this._color : undefined,
                alphaMap: (this._texturealphaMapUrl !== "") ? await this._fbxTextureLoader.awaitLoad(this._texturealphaMapUrl) : null,
                map: (this._textureMapUrl !== "") ? await this._fbxTextureLoader.awaitLoad(this._textureMapUrl) : null,
                normalMap: (this._textureNormalMapUrl !== "") ? await this._fbxTextureLoader.awaitLoad(this._textureNormalMapUrl) : null,
                aoMap: (this._textureAoMapUrl !== "") ? await this._fbxTextureLoader.awaitLoad(this._textureAoMapUrl) : null,
                envMap: this._rgbmCubeRenderTarget.texture,
                needsUpdate: true,
            };
            var material = new THREE.MeshStandardMaterial(params); //重置纹理
            await this._fbxLoader.awaitLoad(this._fbxUrl).then(function(value){mesh=value});
            if (params.normalMap !== null) material.normalMap.wrapS = THREE.RepeatWrapping;
            if (params.map !== null) material.map.wrapS = THREE.RepeatWrapping;
            mesh.children[0].material = material;
            mesh.scale.copy(this._scale);
            this._arr.push(mesh); //添加到场景数组中
            this._scene.add(mesh);
        },
        fbxSceneMeshUtil:async function () {
            var mesh;
            var material = new THREE.MeshStandardMaterial();
            await this._fbxLoader.awaitLoad(this._fbxUrl).then(function(value){mesh=value});
            material.aoMap =await  this._fbxTextureLoader.awaitLoad(this._textureAoMapUrl).catch(function (err) {
                console.log(err);
            });
            material.envMap = this._rgbmCubeRenderTarget.texture;
            material.needsUpdate = true;
            
            material.map = mesh.children[0].material.map;
            mesh.children[0].material = material;
            mesh.scale.copy(this._scale);
            this._arr.push(mesh); //添加到场景数组中
            this._scene.add(mesh);
        },
        fbxNumberMeshUtil: async function () {
            var mesh;
            await this._fbxLoader.awaitLoad(this._fbxUrl).then(function(value){mesh=value;});
            var material = new THREE.MeshStandardMaterial({
                transparent: true
            });
            material.alphaMap =await this._fbxTextureLoader.awaitLoad(this._texturealphaMapUrl);
            material.envMap = this._rgbmCubeRenderTarget.texture;
            material.needsUpdate = true;
            material.color=this._color;
            mesh.children[0].material = material;
            mesh.scale.copy(this._scale);
            mesh.position.copy(this._positon);
            mesh.rotation.copy(this._rotation);
            mesh.children[0].name = this._name;
            await this.boxMeshUtil(mesh, this._boxArray);
            this._arr.push(mesh); //添加到场景数组中
            this._scene.add(mesh);
        },
        envMapLoadUtil: async function (render) {
            var rgbmCubeRenderTarget;
            var cubeTexture = new THREE.CubeTextureLoader();
            cubeTexture.setPath('cube/pisaRGBM16/');
            var rgbmCubeMap = await cubeTexture.awaitLoad(['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png']);
            rgbmCubeMap.encoding = THREE.RGBM16Encoding;
            rgbmCubeMap.format = THREE.RGBAFormat;

            var pmremGenerator = new THREE.PMREMGenerator(rgbmCubeMap);
            pmremGenerator.update(render);
            var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
            pmremCubeUVPacker.update(render);
            rgbmCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
            rgbmCubeMap.magFilter = THREE.LinearFilter;
            rgbmCubeMap.needsUpdate = true;
            // scene.background = rgbmCubeMap;
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