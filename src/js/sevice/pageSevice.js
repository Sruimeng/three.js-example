/// <reference path="c:/Users/WeShape3D/Desktop/pbr/test/node_modules/@types/three/index.d.ts" />
/// <reference path="c:/Users/WeShape3D/Desktop/pbr/test/node_modules/@types/three/index.d.ts" />
projectSevice.pageSevice = (function () {
    function pageSevice() {};
    var current = 1,target=1;
    pageSevice.prototype = {
        buttonClick: function (flag) {
            if (flag) {
                if(current===5){
                    target=1;
                }else{
                    target++;
                }
            } else {
                if (current === 1) {
                    target = 5;
                } else {
                    target--;
                }
            }
            this.changePage(current,target);
            current=target;
        },
        changePage: function (current, target) {
            switch (current) {
                case 1:
                    
                    break;
            
                default:
                    break;
            }
        }
    }
    return pageSevice;
})();