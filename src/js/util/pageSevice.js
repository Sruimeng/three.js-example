projectUtil.pageUtil = (function () {
    function pageUtil() {};
    pageUtil.prototype = {
        step1ChangeUtil: function (flag) {
            showDocumentUtil("#title", true, "block");
            if (flag) {

            }
        },
        showDocumentUtil: function (id, flag, name) {
            if (flag) {
                document.querySelector(id).classList.add(name);
            } else {
                document.querySelector(id).classList.remove(name);
            }
        },
        switchPageUtil: function (arr, flag) { //切换场景工具类
            if (arr.length > 10) {
                for (i = 0, arrLength = arr.length; i < arrLength; i++) {
                    arr[i].visible = flag;
                }
            } else {
                for (i = 0, arrLength = arr.length; i < arrLength; i++) {
                    arr[i].children[0].visible = flag;
                }
            }
        }

    };
    return pageUtil;
})();