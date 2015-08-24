/**
 * Created by linyazhen on 15/8/3.
 */
window.onload=function(){
   waterfall('main','box');
    var data=[];
    for(var i=0;i<98;i++){
        var cur="images/"+i+".jpg";
        data.push(cur);
    }
   // var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
    window.onscroll=function() {
        if(checkScorlll){
            var oParent=document.getElementById('main');
            for(var i=0;i<data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src=data[i];
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
};
function waterfall(parent,box){
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    var oBoxw=oBoxs[0].offsetWidth;//获取第一个的宽度
    var cols=Math.floor((document.documentElement.clientWidth||document.body.clientWidth)/oBoxw);//页面宽度/每列的宽
    //console.log(cols);//6

    //设置main的宽，并且居中
    oParent.style.cssText='width:'+oBoxw*cols+'px;margin:0 auto';

    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            //把第一行盒子的高度都存放在数组里面
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);//得到最小高度的哪一张
            var index=getminHIndex(hArr,minH);//取出最小高度的索引
            oBoxs[i].style.position="absolute";//从第七张开始所有得图片都要加绝对定位
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxw*index+'px';//法一
            //oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";//法二
            hArr[index]+=oBoxs[i].offsetHeight;//把加完的那个高度加进去
        }
    }
}

//取class
function getByClass(parent,className){
    var boxArr=[],oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className===className){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getminHIndex(arr,val){
    for(var i in arr){
        if(arr[i]===val){
            return i;
        }
    }
}


//检测是否具备滚动加载的条件
function checkScorlll(){
    var oParent=document.getElementById('mian');
    var oBoxs=getByClass(oParent,box);
    var lastBoxH=oBoxs[oBoxs.length-1].offsetLeft+Math.floor(oBoxs[oBoxs.length-1].clientHeight/2)+'px';
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var height=document.documentElement.clientHeight||document.body.clientHeight;
    return (scrollTop+height>lastBoxH)?true:false;
}
















