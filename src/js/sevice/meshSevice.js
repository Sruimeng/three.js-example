projectSevice.meshSevice = (function () {
    function meshSevice() {};
    meshSevice.prototype = {
        initMesh: async function (projectParams) {
            var scope, fbxParams;
            scope = await projectData.meshData.prototype.createLoader(projectParams.scene, projectParams.renderer);
            fbxParams = projectData.meshData.prototype.fbxDate(projectParams.arr, scope);
            await projectUtil.meshUtil.prototype.create(fbxParams[0], projectParams.renderer);
            for (i = 0, fbxParamsLength = fbxParams.length; i < fbxParamsLength; i++) {
                
            }
        }
    }
    return meshSevice;
})();