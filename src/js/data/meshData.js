projectData.meshData=(function () {
    function meshData(){};
    meshData.prototype={
        createLoader:function(){
            this._fbxLoader=new THREE.FBXLoader();
            this._fbxTextureLoader=new THREE.TextureLoader();
            this._rgbmCubeRenderTarget=projectUtil.meshUtil.prototype.envMapLoadUtil();
            this._scene=scene;
            return this;
        },
        fbxDate:function(){
            var fbxPath="fbx/"
            var fbxParams=new Array();
            fbxParams[0]={
                arr:arr[2],
                fbxLoader:this._fbxLoader,
                fbxUrl:fbxPath+"WAT_tuzi.FBX",
                fbxTextureLoader:this._fbxTextureLoader,
                textureUrl:fbxPath+""
            };
        }
    }
})();