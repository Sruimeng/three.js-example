/// <reference path="c:/Users/WeShape3D/Desktop/pbr/test/node_modules/@types/three/index.d.ts" />
/// <reference path="c:/Users/WeShape3D/Desktop/pbr/test/node_modules/@types/three/index.d.ts" />
projectSevice.pageSevice = (function () {
    function pageSevice() {};
    var current = 1,
        target = 1;
    pageSevice.prototype = {
        buttonClick: function (flag) {
            if (flag) {
                target++;
            }else{

            }
        },
        changePage: function (current, target) {

        }
    }
    return pageSevice;
})();