projectSevice.meshSevice=(function (){
    function meshSevice(){}
    meshSevice.prototype={
        initMesh:function(projectParams){
            var fbxParams=projectData.meshData.prototype.createLoader(projectParams.scene).fbxDate(projectParams.arr);
            for(i=0,fbxParamsLength=fbxParams.length;i<fbxParamsLength;i++){
                projectUtil.meshUtil.prototype.create(fbxParams[i],projectParams.renderer);
            }
        }
    }
    return meshSevice;
})();