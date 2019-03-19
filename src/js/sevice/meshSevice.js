projectSevice.meshSevice=(function (){
    function meshSevice(){}
    meshSevice.prototype={
        initMesh:function(projectParams){
            var fbxParams=projectData.meshData.prototype.createLoader(projectParams.scene,projectParams.renderer).fbxDate(projectParams.arr);;
            // fbxParams.fbxDate(projectParams.arr);
            console.log(fbxParams);
            for(i=0,fbxParamsLength=fbxParams.length;i<fbxParamsLength;i++){
                projectUtil.meshUtil.prototype.create(fbxParams[i],projectParams);
            }
        }
    }
    return meshSevice;
})();