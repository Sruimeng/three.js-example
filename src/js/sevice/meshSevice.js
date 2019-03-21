
projectSevice.meshSevice = (function () {
    function meshSevice() {};
    meshSevice.prototype = {
        initMesh: function (projectParams) {
            var fbxParams;
            projectData.meshData.prototype.createLoader(projectParams.scene, projectParams.renderer).then(function (value) {
                // fbxParams = projectData.meshData.prototype.fbxDate(projectParams.arr, value);
                // var arr=[]
                //     for (i = 0, fbxParamsLength = fbxParams.length; i < fbxParamsLength; i++) {
                //         await projectUtil.meshUtil.prototype.create(fbxParams[i], projectParams).then(function(value){console.log(value)});
                //     }
            }).catch(function(error){console.log(error)});
        }
    }
    return meshSevice;
})();