var cycleUtilParams={
    pro:0,   //当前数值
    end:1,    //结束数值
    direction:1, //方向标志位
    speed :0.007,  //步长
    offset :0.001,  //偏移量
    result:0,
    realY:0,
    tempY:0,
};
//场景3动画工具类
function cycleUtil(positionY) {
    cycleUtilParams.tempY=positionY;
    cycleUtilParams.realY=positionY;
    cycleUtilParams.pro+=cycleUtilParams.speed*cycleUtilParams.direction;
    if(cycleUtilParams.direction>0)
    {
        cycleUtilParams.end=Math.max(cycleUtilParams.end,cycleUtilParams.pro);
        if(cycleUtilParams.pro>=1)
        {
            cycleUtilParams.end=0;
            cycleUtilParams.direction=-1;
        }
    }else if(cycleUtilParams.direction<0)
    {
        cycleUtilParams.end=Math.min(cycleUtilParams.end,cycleUtilParams.pro);
        if(cycleUtilParams.pro<=-1)
        {
            cycleUtilParams.end=1;
            cycleUtilParams.direction=1;
        }
    }
    cycleUtilParams.result=cycleUtilParams.pro*cycleUtilParams.offset;
    cycleUtilParams.realY=cycleUtilParams.tempY+cycleUtilParams.result;
    return cycleUtilParams.result
}
//切换场景工具类
function switchPageUtil(arr,flag) {
    for(i=0,arrLength=arr.length;i<arrLength;i++){
        arr[i].children[0].visible=flag;
    }
}