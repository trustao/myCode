/**
 * Created by TR0000009 on 2016/11/18.
 */
leafDown();
var mouseFlag = true;
function leafDown() {
    var setLeafT = setInterval(setLeaf, 2000);

    function setLeaf() {
        var leaf = document.createElement("div");
        document.body.appendChild(leaf);
        leaf.classList.add("leaf");
        var kkk = Math.random() * 700 + 100;
        leaf.style.left = kkk + 'px';
        leaf.innerHTML = "<div></div>";
        document.body.style.perspective = "300px";
        leaf.style.width = "50px";
        leaf.style.height = "50px";
        leaf.style.position = "absolute";
        leaf.style.zIndex = 999999;
        leaf.firstElementChild.style.zIndex = 999999;
        leaf.firstElementChild.style.width = "100%";
        leaf.firstElementChild.style.height = "100%";
        leaf.firstElementChild.style.background = "url('img/leaf.png') no-repeat";
        leaf.leafDT = setInterval(leafDown, 30);          //叶子下落
        var n = 0;
        var m = 0;
        var c = Math.PI / 2;

        function leafDown() {
            n++;
            m++;
            console.log("下落了1");
            leaf.style.left = leaf.offsetLeft + Math.sin(0.05/*控制摆动周期*/ * m + c) * (Math.pow(2, -n) + 10/*控制摆动幅度*/) + "px";
            //飘的效果还不好
            leaf.style.top = leaf.offsetTop + 1 + "px"; //匀速下落；
            if (leaf.offsetTop >= 500) {
                leaf.remove();
                clearInterval(leaf.leafDT);
                // clearInterval(setLeafT);
            } else if (leaf.offsetTop >= 400) {

                leaf.style.transition = "opacity 1s linear";
                leaf.style.opacity = 0;
            }
        }

        var count = 0;
        leaf.onmousemove = function (event) {
            console.log(count);
            if (count == 0) {
                event = event || window.event;
                var x = event.clientX;
                var y = event.clientY;
                var lX = leaf.offsetLeft;
                var lY = leaf.offsetTop;
                var lH = leaf.offsetHeight;
                var lW = leaf.offsetWidth;
                if (lX < x && x < lX + lW / 2 && lY < y && y < lY + lH / 2) {
                    yTA30();
                    xTA150();
                } else if (lX + lW / 2 < x && x < lX + lW && lY < y && y < lY + lH / 2) {
                    yTA30();
                    xTB150();
                } else if (lX < x && x < lX + lW / 2 && lY + lH / 2 < y && y < lY + lH) {
                    yTB30();
                    xTA150();
                } else if (lX + lW / 2 < x && x < lX + lW && lY + lH / 2 < y && y < lY + lH) {
                    yTB30();
                    xTB150();
                }
                function yTA30() {           //Y方向增加
                    clearInterval(leaf.leafDT);
                    clearInterval(yTA);
                    count++;
                    console.log(count);
                    var i = 0;
                    var yTA = setInterval(function () {
                        i++;
                        leaf.style.top = leaf.offsetTop + 2 + "px";
                        if (i == 15) {
                            clearInterval(yTA);
                            count = 0
                        }
                    }, 50)
                }

                function yTB30() {
                    //Y方向减少
                    clearInterval(leaf.leafDT);
                    clearInterval(yTA);
                    count++;
                    console.log(count);
                    var i = 0;
                    var yTA = setInterval(function () {
                        i++;
                        count++;
                        leaf.style.top = leaf.offsetTop - 4 * Math.sin(i * Math.PI / 16) + "px";
                        if (i == 15) {
                            count = 0;
                            clearInterval(yTA);
                        }
                    }, 50)
                }

                function xTA150() {      //X 方向增加
                    clearInterval(leaf.leafDT);
                    clearInterval(yTA);
                    var i = 0;
                    var yTA = setInterval(function () {
                        i++;
                        leaf.style.left = leaf.offsetLeft + 12 + "px";
                        if (i == 15) {
                            n = 0;
                            m = 0;
                            c = Math.PI / 4;
                            clearInterval(yTA);
                            leaf.leafDT = setInterval(leafDown, 30);
                        }
                    }, 50)
                }

                function xTB150() {          //X 方向减少
                    clearInterval(leaf.leafDT);
                    clearInterval(yTA);
                    var i = 0;
                    var yTA = setInterval(function () {
                        i++;
                        leaf.style.left = leaf.offsetLeft - 12 + "px";
                        if (i == 15) {
                            n = 0;
                            m = 0;
                            c = -c;
                            clearInterval(yTA);
                            leaf.leafDT = setInterval(leafDown, 30);
                        }
                    }, 50)
                }
            }
        };
        zhuans();//叶子旋转效果
        function zhuans() {
            var x = randomDeg();
            var y = randomDeg();
            var z =randomDeg();
            var d = randomDeg();
            leaf.firstElementChild.style.transform = "rotate3d(" + x + "," + y + "," + z + "," + d + "deg)";
            leaf.firstElementChild.style.transition = "1200ms linear";
            setTimeout(zhuans, 1200);
        }
        function randomDeg(){
            return [Math.random() * 30 + 60, -Math.random() * 30 - 60].sort(function () { return Math.random() > 0.5 })[0];
        }
}

    window.onblur = function (event) {
        event = event || window.event;
        mouseFlag = false;
        clearInterval(setLeafT);
    };
}
document.body.onmousemove =function(){
    if(!mouseFlag){
        leafDown();
        mouseFlag = true;
    }
};