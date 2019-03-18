projectSevice.meshSevice=(function (){
    function meshSevice(){}
    meshSevice.prototype={
        initMesh:function(scene,arr){
            var fbxParams=projectData.meshData.prototype.createLoader(scene).fbxDate(arr);
            for(i=0,fbxParamsLength=fbxParams.length;i<fbxParamsLength;i++){
                projectUtil.meshUtil.prototype.create(fbxParams[i]);
            }
        }
    }
    return meshSevice;
})();