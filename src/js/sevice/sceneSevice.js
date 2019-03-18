projectSevice.sceneSevice=(function (){
    function sceneSevice(){};
    sceneSevice.prototype={
        initScene:function(){
            var sceneParams=projectUtil.sceneUtil.prototype.creatScene();
            return sceneParams;
        }
    }
    return sceneSevice;
})();