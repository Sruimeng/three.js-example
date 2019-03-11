

function mouseEnter() {
    setTimeout(
        function () {
            rotationFlag=true;
        },2000
    )
}
function mouseOver() {
    rotationFlag=false;
}
function smallButtonClick(step) {
    console.log("step:" + step);
    document.querySelectorAll("#iconsTop li").forEach(function (item) {
        item.classList.remove("active");
    });
    if (step === 4) {
        document.querySelectorAll("#iconsBottom li").forEach(function (item) {
            item.classList.remove("active");
        });
        cameraAnimation(camera.position, {x: 0, y: 34, z: 67}, 500, TWEEN.Easing.Linear.None);
    } else {
        document.querySelector("#value").classList.remove("medium");
    }

}

function mediumButtonClick(step) {
    console.log("step:" + step);
    document.querySelectorAll("#iconsTop li").forEach(function (item) {
        item.classList.add("active");
    });
    if (step === 4) {
        document.querySelectorAll("#iconsBottom li").forEach(function (item) {
            item.classList.add("active");
        });
        cameraAnimation(camera.position, {x: 0, y: 29, z: 53}, 500, TWEEN.Easing.Linear.None);
    } else {
        document.querySelector("#value").classList.add("medium");
    }

}

//左边按钮点击事件
function leftButtonClick() {
    document.getElementById("icons").children[tempStep - 1].classList.remove("active");
    if (tempStep === 1) {
        document.getElementById("icons").children[4].classList.add("active");
    } else {
        document.getElementById("icons").children[tempStep - 2].classList.add("active");
    }
    switch (tempStep) {
        case 1:
            step1Change(false);
            break;
        case 5:
            step5Change(false);
            break;
        case 4:
            step4Change(false);
            break;
        case 3:
            step3Change(false);
            break;
        case 2:
            step2Change(false);
            break;
    }
}

function rightButtonClick() {
    document.getElementById("icons").children[tempStep - 1].classList.remove("active");
    if (tempStep === 5) {
        document.getElementById("icons").children[0].classList.add("active");
    } else {
        document.getElementById("icons").children[tempStep].classList.add("active");
    }

    switch (tempStep) {
        case 1:
            step1Change(true);
            break;
        case 2:
            step2Change(true);
            break;
        case 3:
            step3Change(true);
            break;
        case 4:
            step4Change(true);
            break;
        case 5:
            step5Change(true);
            break;

    }
}

function buyButtonClick() {
    window.location.href = "https://weidian.com/item.html?itemID=2570250336"
}

function showDocumentUtil(id, flag, name) {
    if (flag) {
        document.querySelector(id).classList.add(name);
    } else {
        document.querySelector(id).classList.remove(name);
    }
}

//第一页变化方法
function step1Change(flag) {
    mouseEnter();
    showDocumentUtil("#step1", true, "none");
    group=arr[0].concat(arr[2]);
    if (flag) {
        showDocumentUtil("#title", true, "block");
        showDocumentUtil("#message", true, "block");
        camera.position.set(0, -20, 80);
        cameraAnimation(camera.position, {x: 0, y: 0, z: 100}, 500, TWEEN.Easing.Quartic.In);
        switchPageUtil(arr[1], false);
        tempStep++;
    } else {
        showDocumentUtil("#value", true, "block");
        showDocumentUtil("#button", true, "block");
        document.querySelectorAll("#iconsTop li").forEach(function (item) {
            item.classList.add("step5");
        });
        switchPageUtil(arr[1], false);
        switchPageUtil(arr[0], false);
        camera.position.set(0, 20, 51);
        controls.target.set(0, 0, 0);
        showDocumentUtil("#iconsTop", true, "active");
        tempStep = 5;
    }
}

function step5Change(flag) {
    showDocumentUtil("#value", false, "block");
    if (flag) {
        showDocumentUtil("#iconsTop", false, "active");
        showDocumentUtil("#step1", false, "none");
        showDocumentUtil("#button", false, "block");
        showDocumentUtil("#title", false, "step4");
        showDocumentUtil("#title", false, "step3");
        showDocumentUtil("#message", false, "step3");
        camera.position.set(0, 0, 100);
        document.querySelectorAll("#iconsTop li").forEach(function (item) {
            item.classList.remove("step5");
        });
        switchPageUtil(arr[0], true);
        tempStep = 1;
    } else {
        showDocumentUtil("#button", false, "block");
        showDocumentUtil("#title", true, "block");
        showDocumentUtil("#title", true, "step4");
        showDocumentUtil("#iconsBottom", true, "active");
        showDocumentUtil("#imageNum", true, "hide");
        document.querySelectorAll("#iconsTop li").forEach(function (item) {
            item.classList.remove("step5");
            item.classList.remove("active");
        });
        cameraAnimation(camera.position, {x: 0, y: 34, z: 66}, 500, TWEEN.Easing.Linear.None);
        controls.target.set(0, 10, 0);
        tempStep--;
    }
}

function step2Change(flag) {
    if (flag) {
        showDocumentUtil("#title", true, "step3");
        showDocumentUtil("#message", true, "step3");
        switchPageUtil(arr[1], true);
        switchPageUtil(arr[0], false);
        cameraAnimation(camera.position, {x: 0, y: 10, z: 50}, 500, TWEEN.Easing.Quartic.In);
        controls.target = new THREE.Vector3(0, 10, 0);
        tick.push(step3Animation);
        tempStep++;
    } else {
        showDocumentUtil("#title", false, "block");
        showDocumentUtil("#message", false, "block");
        showDocumentUtil("#step1", false, "none");
        tempStep--;
    }
}

function step3Change(flag) {
    switchPageUtil(arr[1], false);
    showDocumentUtil("#imageNum", true, "hide");
    if (flag) {
        showDocumentUtil("#title", true, "step4");
        showDocumentUtil("#message", false, "block");
        showDocumentUtil("#iconsBottom", true, "active");
        showDocumentUtil("#iconsTop", true, "active");
        camera.position.set(0, 34, 66);
        tempStep++;
    } else {
        showDocumentUtil("#title", false, "step3");
        showDocumentUtil("#message", false, "step3");
        switchPageUtil(arr[0], true);
        camera.position.set(0, -20, 80);
        controls.target.set(0, 5, 0);
        cameraAnimation(camera.position, {x: 0, y: 0, z: 100}, 500, TWEEN.Easing.Quartic.In);
        tempStep--;
    }
}

function step4Change(flag) {
    showDocumentUtil("#iconsBottom", false, "active");
    if (flag) {
        showDocumentUtil("#value", true, "block");
        showDocumentUtil("#button", true, "block");
        showDocumentUtil("#title", false, "block");
        document.querySelectorAll("#iconsTop li").forEach(function (item) {
            item.classList.add("step5");
            item.classList.remove("active");
        });
        document.querySelectorAll("#iconsBottom li").forEach(function (item) {
            item.classList.remove("active");
        });
        cameraAnimation(camera.position, {x: 0, y: 20, z: 51}, 500, TWEEN.Easing.Linear.None);
        controls.target.set(0, 0, 0);
        tempStep++;
    } else {
        showDocumentUtil("#title", true, "step3");
        showDocumentUtil("#title", false, "step4");
        showDocumentUtil("#iconsTop", false, "active");
        showDocumentUtil("#message", true, "step3");
        showDocumentUtil("#message", true, "block");
        showDocumentUtil("#imageNum", false, "hide");
        switchPageUtil(arr[1], true);
        cameraAnimation(camera.position, {x: 0, y: 10, z: 50}, 500, TWEEN.Easing.Quartic.In);
        controls.target = new THREE.Vector3(0, 10, 0);
        tick.push(step3Animation);
        tempStep--;
    }
}
