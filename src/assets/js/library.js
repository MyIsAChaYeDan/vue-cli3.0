import Vue from 'vue'
import code from './code';
// -----------------------------------------修改原生对象方法（不推荐）--------------------------------------------
// ios使用 传入格式如果为 2019-1-1 须改为 2019/1/1【replace】 否则ios new Date()不识别
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 数组chunk
Array.prototype.chunk = function(n){
    for(var i = 0, temp = [], l = ~~this.length / n; temp.length < l; temp[i++] = this.splice(0, n));
    return temp;
}
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')
        dialogHeaderEl.style.cursor = 'move'
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop
            // 获取到的值带px 正则匹配替换
            let styL, styT
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
            } else {
                styL = +sty.left.replace(/\px/g, '')
                styT = +sty.top.replace(/\px/g, '')
            }
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX
                const t = e.clientY - disY
                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`
                dragDom.style.top = `${t + styT}px`
            }
            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
})
// 格式化金额  千分位  tu小数
Vue.filter('amountFormat', function (s) {
    /*
     * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    // if (!s) {
    //     s = 0;
    // }
    s = s + "";
    s = s.trim();
    if (!s || s == 'null' || s == 'undefined') {
        return "-";
    }
    var n = 0;
    s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse();
    // var r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
})
// 格式化金额  千分位  保留两位小数
Vue.filter('amountFormat2', function (s) {
    /* * 参数说明：
     * s：要格式化的数字
     * n：保留几位小数
     * */
    s = s + "";
    s = s.trim();
    if (!s || s == 'null' || s == 'undefined') {
        return "-";
    }
    var n = 2;
    s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse();
    var r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
})
// 格式化日期格式
Vue.filter('dateDay', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    let date = new Date(parseInt(s));
    return date.Format("yyyy-MM-dd");
})
Vue.filter('dateDayString', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    let date = s.split(' ')[0];
    return date;
})
Vue.filter('dateFormat', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    let date = new Date(parseInt(s));
    return date.Format("yyyy-MM-dd hh:mm:ss");
})
Vue.filter('getMinute', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    let date = new Date(parseInt(s));
    return date.Format("hh:mm");
})
// 格式化日期格式(yyyy-MM-dd hh:mm)
Vue.filter('dateFormatMinutes', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    let date = new Date(parseInt(s));
    return date.Format("yyyy-MM-dd hh:mm");
})
//两个时间格式化，优先第一个
Vue.filter('dateDayMulti', function ([time1, time2]) {
    var s = (time1 == null || time1 == '') ? time2 : time1;
    if (s == '' || s == null) {
        return '-'
    }
    let date = new Date(parseInt(s));
    return date.Format("yyyy-MM-dd");
})
// 过滤字段为null时处理
Vue.filter('defaultDisplay', function (s) {
    if (s == '' || s == null) {
        return '-'
    }
    return s;
})
// 格式化序号 不足两位补零
Vue.filter('formatSeriaNum', function (value) {
    return value < 10 ? '0' + value : value;
})

/**
 *
 * @param {number | string} begin 开始值
 * @param {number | string} end 结束值
 * @param {number | string} speed 计时器间隔时间 值越小速度越快
 * @param timer
 */
function buffer(begin = 0, end = 0, speed = 10, timer = null) {
	begin = parseInt(begin);
	end = parseInt(end);
	speed = parseInt(speed);
	clearInterval(timer); // 清楚计时器
	timer = setInterval(function() {
		begin += (end - begin) / 10; // 缓动公式
		window.scrollTo(0, begin);
		begin = begin < end ? Math.ceil(begin) : Math.floor(begin); // 如果向下移动就向上取整，反之向下取整
		if (begin === end) {
			// 滚动到指定位置清除计时器
			//console.log(begin, end);
			clearInterval(timer);
		}
	}, speed);
}
// -----------------------------------------共用方法--------------------------------------------
export default {
    code,
    dateFormatTime(time,status){
        if(time<0){
            return '时间小于1秒'
        }
        // 日期格式
        var min=Math.floor(time%3600)
        var hour=Math.floor(time/3600)>9?Math.floor(time/3600):'0'+Math.floor(time/3600)
        var minutes=Math.floor(min/60)>9?Math.floor(min/60):'0'+Math.floor(min/60)
        var second=time%60>9?time%60:'0'+time%60
        if(status){
            return hour +"时"+ minutes +"分"+ second+"秒";
        }
        return hour + ":" + minutes + ":"+ second;
    },
    dateFormat(s,format){
        // 日期格式
        if(typeof(s)=='object'){ 
            return s.Format(format);
        }
        // 非日期格式 
        if (s == '' || s == null) {
            return '-'
        }
        let date
        if(s==s*1){
            // 时间戳 字符串时间戳
            date = new Date(parseInt(s));
        }else {
            // 字符串日期格式
            date = new Date(s);
        }
        return date.Format(format);
    },
    // 日期format
    Format(date, fmt) {
        let self = new Date(date)
        var o = {
            "M+": self.getMonth() + 1, //月份
            "d+": self.getDate(), //日
            "h+": self.getHours(), //小时
            "m+": self.getMinutes(), //分
            "s+": self.getSeconds(), //秒
            "q+": Math.floor((self.getMonth() + 3) / 3), //季度
            "S": self.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (self.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // FormData格式化
    transFormData(json, data, ) {
        var formData = new FormData();
        formData.append("data", JSON.stringify(json.data));
        return formData;
    },
    // 数字转中文
    NoToChinese(num) {
        if (!/^\d*(\.\d*)?$/.test(num)) {
            // alert("Number is wrong!");
            return "Number is wrong!";
        }
        var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
        var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
        var a = ("" + num).replace(/(^0*)/g, "").split("."),
            k = 0,
            re = "";
        for (var i = a[0].length - 1; i >= 0; i--) {
            switch (k) {
                case 0:
                    re = BB[7] + re;
                    break;
                case 4:
                    if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                        re = BB[4] + re;
                    break;
                case 8:
                    re = BB[5] + re;
                    BB[7] = BB[5];
                    k = 0;
                    break;
            }
            if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
            if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            k++;
        }

        if (a.length > 1) //加上小数部分(如果有小数部分)
        {
            re += BB[6];
            for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
        }
        if (num >= 10 && num < 20) {
            re = re.substring(1);
        }
        return re;
    },
    decimal(x) {
        //格式化 保留2为小数
        if (x.trim() === "") {
            return ""
        }
        // var f = parseFloat(x);
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    //  校验输入：输入规则为数字且保留两位小数并且禁止非数字字符输入
    dataHand(value) {
        value = value.replace(/[^\d.]/g, "");
        value = value.replace(/^\./g, "");
        value = value.replace(/\.{2,}/g, ".");
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        return value
    },
    setCookie(key, v, t) {
        let d = new Date();
        d.setTime(d.getTime() + t);
        document.cookie += key + "=" + v + ";expires=" + d.toGMTString();
    },
    getCookie(key) {
        let arr, result, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            result = arr[2];
        }
        return result;
    },
    //获取url参数
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    },
    //模糊搜索
    fuzzySearch(list, keyWord, key) {
        //list要搜索的数据数组，keyWord搜索的关键词，key搜索的key值
        let len = list.length;
        let arr = [];
        for (let i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (list[i][key].indexOf(keyWord) >= 0) {
                arr.push(list[i]);
            }
        }
        return arr;
    },
    setIndex(arr, num) {
        if (Array.isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].index = num ? num + 1 : i + 1
            }
        }
        return arr
    },
    formatText(str) {
        let regexEmpty = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
        let newStr = String(str).replace(regexEmpty, '')
        return newStr
    },
    //生成指定长度的随机字母数字字符串
    getRandomStr: function (len) {
        var str = "";
        for (; str.length < len; str += Math.random().toString(36).substring(2));
        return str.substring(0, len);
    },
    //上传文件格式限制(IE9及其以下版本不支持)
    beforeAvatarUpload(maximum = 200) { //默认限制上传不超过200M
        // let _self = this;
        return function (file) {
            const sizeIsZero = file.size == 0;
            const max = parseInt(maximum) <= 200 ? parseInt(maximum) : 200;
            // console.log('file',file,max,parseInt(maximum),maximum);
            const isMAX = file.size / 1024 / 1000 > max ? true : false;
            const isEXE = file.name.split('.').splice(-1, 1)[0] === 'exe';
            const isBAT = file.name.split('.').splice(-1, 1)[0] === 'bat';
            if (isEXE || isBAT) {
                this.$message.error('上传文件不能是bat与exe格式!');
                return false
            }
            if (sizeIsZero) {
                this.$message.error("上传文件大小不能是0kb!");
                return false
            }
            if (isMAX) {
                this.$message.error("上传文件大小不能大于" + max + "M!");
                return false
            }
            return true
            // return !isEXE && !isBAT && !sizeIsZero && !isMAX;
        }
    },
    // 上传组件文件点击下载公共方法
    fileHandlePreview(url) {
        return function (file) {
            if (!file.hasOwnProperty('percentage')) {
                var downLoadBox = document.createElement('a');
                downLoadBox.href = url + 'fileId=' + (file.fileId || file.fileid || file.id || file.uid);
                downLoadBox.download = file.name;
                document.body.appendChild(downLoadBox);
                downLoadBox.click();
                document.body.removeChild(downLoadBox);
            }
        }
    },
    // 判断内核是否为IE 兼容数据回显
    isActiveXObject(val) {
        let privkName;
        if (window.ActiveXObject || 'ActiveXObject' in window) {
            privkName = '';
        } else {
            privkName = val;
        }
        return privkName;
    },
    // 清除ie中页面一加载就效验的问题
    /**
     * @param {this}newVue
     * @param {string}refs
     */
    myResetFields(newVue, refs) {
        if (window.ActiveXObject || 'ActiveXObject' in window) {
            newVue.$nextTick(function () {
                newVue.$refs[refs].resetFields();
            });
        }
    },
    beforeFileUpload(file) {
        const isJPG =
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/png' ||
            file.type === 'application/pdf';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
            this.$message.error('仅支持上传JPG、JPEG、PNG、PDF格式文件');
        }
        if (!isLt10M) {
            this.$message.error('文件大小不超过10M');
        }
        return isJPG && isLt10M;
    },
    beforeFileUploadYX(file) {
        const name = file.name && file.name.split('.')[1];
        const isDoc =
            name === 'xlsx' ||
            name === 'xls' ||
            name === 'XLSX' ||
            name === 'XLS' ||
            name === 'doc' ||
            name === 'docx' ||
            name === 'DOC' ||
            name === 'DOCX' ||
            name === 'ppt' ||
            name === 'PPT' ||
            name === 'pptx' ||
            name === 'PPTX' ||
            name === 'zip' ||
            name === 'rar' ||
            name === 'ZIP' ||
            name === 'RAR';

        const isJPG =
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/png' ||
            file.type === 'application/pdf' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
            file.type === 'application/vnd.ms-excel' ||
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/zip';
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isJPG && !isDoc) {
            this.$message.error('仅支持上传JPG、JPEG、PNG、PDF、word、excel、ppt、zip格式文件');
        }
        if (!isLt10M) {
            this.$message.error('文件大小不超过10M');
        }
        return (isDoc || isJPG) && isLt10M;
    },
    // 页面缓动
    /**
     *
     * @param {number | string}begin(开始值)
     * @param {number | string}end (结束值)
     * @param {number | string} speed (计时器间隔时间)
     */
    scrollBuffer(begin, end, speed) {
        buffer(begin, end, speed);
    },
    /*
     * 兼容scrollLeft && scrollTop
     * */
    scroll() {
        if (window.pageXOffset) {
            return {
                left: window.pageXOffset,
                top: window.pageYOffset
            };
        } else if (document.compatMode === 'CSS1Compat') {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            };
        }
        return {
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        };
    },
    /**
     * 获取元素距离屏幕顶部的距离
     * @param {string}el (dom)
     * @returns {number}
     */
    getElementTop(el) {
        // 获取ele元素距离父元素的offsetTop值
        let actualTop = el.offsetTop;
        // 获取该元素的有定位的父级元素
        let current = el.offsetParent;

        while (current !== null) {
            // 判断当前元素是否循环到html根节点了
            // offsetTop值循环相加
            actualTop += current.offsetTop;
            // 当current为html根元素时，current.offsetParent值为null
            current = current.offsetParent;
        }
        // 得到offsetTop值相加的值之和，即元素距离顶部的高度
        return actualTop - 100;
    },
    // 简易克隆 如果存在function 或者prototype 不会克隆 只能克隆纯数据
    cloneObject(obj){
        let data=JSON.parse(JSON.stringify(obj));
        return data
    },
    // 浏览器复制文本
    copyText(text,status){
        let url=text;
        if(!status){
            shortUrl(text,(res)=>{
                url=res
            })
        }
        if(url){
            let copyObj = document.createElement('textarea');
            document.body.appendChild(copyObj);
            copyObj.value=url;
            copyObj.select();
            document.execCommand("copy");
            document.body.removeChild(copyObj);
            return true
        }else{
            return false
        }
    },
    // 下载文件流
    downloadFile(fileName,data){
        const a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data]);
        const blobUrl = window.URL.createObjectURL(blob);
        a.style.display = 'none';
        a.download = fileName;
        a.href = blobUrl;
        a.click();
        document.body.removeChild(a);
    },
    // 判断两个对象是否相等
    isObjectValueEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    // 判断对象类型
    getType(obj){
        if(Object.prototype.toString.call(obj)=='[object Object]'){
            return 'Object';
        }else if(Object.prototype.toString.call(obj)=='[object Array]'){
            return 'Array';
        }else{
            return 'nomal';
        }
    },
    // 获得code值
    getAtValue(value,key){
        if(value==undefined){
            return {
                value: '',
                label: '',
            }
        }
        if(value!='allData'){
            let data=code[key]
            if(Array.isArray(data)&&data[0]){
                let returnData;
                if(Object.keys(data[0]).length>2){
                    returnData={
                        value: '',
                        label: '',
                        code: ''
                    }
                }else{
                    returnData={
                        value: '',
                        label: '',
                    }
                }
                data.map(v =>{
                    if(v.value==value||v.label==value){ 
                        returnData=v
                    }
                })
                return returnData
            }
        }else if(value=='allData'){
            return code[key]
        }
    },
};
