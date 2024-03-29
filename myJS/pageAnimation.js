function meshRotation() {
    if (group.length>0&&rotationFlag)
    {
        for (i = 0, groupLength = group.length; 0 < groupLength; i++) {
            var mesh;
            if (group[i] === undefined) {
                break;
            } else if (group[i].name !== "changjin") {
                mesh=group[i].children[0];
                mesh.rotation.z+=temp;
            } else {
                mesh=group[i].children[0];
                mesh.rotation.y+=temp;
            }
        }
    }
}

function step3Animation() {
    for(i=0,arr1Length=arr[1].length;i<arr1Length;i++)
    {
        arr[1][i].children[0].position.y+=cycleUtil(arr[1][i].children[0].position.y);
        arr[1][i].children[0].rotation.copy(camera.rotation);
    }
    for(i=0,arr1Length=arr[5].length;i<arr1Length;i++)
    {
        arr[5][i].rotation.copy(camera.rotation);
    }
}

function cameraAnimation(startPosition,endPosition,time,func) {
    var tween=new TWEEN.Tween(startPosition).to(endPosition,time).easing(func).start();
}

function textAnimation(callback,arr) {
    var tween=new TWEEN.Tween(new THREE.Vector3()).to(arr[0].scale,500).easing(TWEEN.Easing.Linear.None).start();
    tween.onUpdate(function (num) {
        for (var i = 0 ; i< arr.length;i++){
            textScale(arr[i],num);
        }
    });
    callback;
}

function textScale(arr,num) {
    arr.scale.y=num;
    arr.scale.z=num;
    if(arr.name==="5heng")
    {
        arr.scale.x=5*num;
    }else if(arr.name==="4heng")
    {
        arr.scale.x=4*num;
    }else if(arr.name==="20heng")
    {
        arr.scale.x=20*num;
    }else {
        arr.scale.x=num;
    }
}




