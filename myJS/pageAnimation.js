
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
                //meshRotationUtil(mesh,mesh.rotation.z, mesh.rotation.z+Math.PI*2,6000);
            } else {
                mesh=group[i].children[0];
                mesh.rotation.y+=temp;
                //meshRotationUtil(mesh,mesh.rotation.y, mesh.rotation.y+Math.PI*2,6000);
            }
        }
    }
}

function meshRotationUtil(mesh,startRotation,endRotation,time) {
    meshRotationTween=new TWEEN.Tween(startRotation).to(endRotation,time).easing(TWEEN.Easing.Linear.None).onComplete(function () {
        //meshRotationUtil(mesh,startRotation,endRotation,time);
        console.log(meshRotationTween)
    }).start();
    meshRotationTween.onUpdate(function (rotation) {
        if(mesh.name==="changjin_01")
        {
            mesh.rotation.y=rotation*2*Math.PI;
        }else {
            mesh.rotation.z=rotation*2*Math.PI;
        }
    })

}//

function step3Animation() {
    for(i=0,arr1Length=arr[1].length;i<arr1Length;i++)
    {
        arr[1][i].children[0].position.y+=cycleUtil(arr[1][i].children[0].position.y);
        arr[1][i].children[0].rotation.copy(camera.rotation);
    }
}

function cameraAnimation(startPosition,endPosition,time,func) {
    var tween=new TWEEN.Tween(startPosition).to(endPosition,time).easing(func).start();
}




