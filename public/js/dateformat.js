/**
 * Created by maggie on 16/11/7.
 */

/***
 *
 *    date.format("yyyy-MM-dd hh:mm:ss")
 *    date.format("yy/M/d h:m:s")
 *    date.format("yy年M月d日 h:m:s")
 *
 *
 * */
Date.prototype.format = function (fmStr) {


    var o ={
        "M+":this.getMonth()+1,//月
        "d+":this.getDate(),//日
        "h+":this.getHours(),//小时
        "m+":this.getMinutes(),//分钟
        "s+":this.getSeconds()//秒
    };
    //单独处理 年份  年份  4位  3位  2位
    if(/(y+)/.test(fmStr))
    {
        fmStr=fmStr.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    }

//替换时间的 月 日  小时  分钟 和 秒
    for( var key in o)
    {
        if(new RegExp("("+key+")").test(fmStr))
        {
            var str=  RegExp.$1.length=== 1? o[key] :  ("00"+o[key]).substr((""+o[key]).length);
            fmStr=fmStr.replace(RegExp.$1,str);
        }
    }
    //console.log(fmStr);


    return fmStr;
}