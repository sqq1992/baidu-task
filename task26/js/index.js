requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**
 * 绘制图表
 */
;
(function () {

    //set options
    var SCREEN_WIDTH = 800;
    var SCREEN_HEIGHT = 800;
    var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
    var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;
    var PLANE_RADIUS = 50;
    var BOAT_SPEED = 2;     //飞船的速度

    /**
     * 画图组件
     */
    ;(function () {
        var cache = document.createElement("canvas");
        cacheCxt = cache.getContext("2d");
        cache.width = 800;
        cache.height = 800;


        var DrawImg = function (options) {
            this.options = $.extend({}, DrawImg.default, options);

            this.init();
        };
        DrawImg.prototype = {
            constructor:DrawImg,
            init:function(){
                this.drawBg();
                this.initDrawBoat();
                //this.drawBoat();
            },

            //绘制背景
            drawBg:function(){
                var _this = this,
                    options = this.options;
                var screen = document.getElementById("background");

                //set width and height
                screen.width = SCREEN_WIDTH;
                screen.height = SCREEN_HEIGHT;

                //设置背景
                var context = screen.getContext("2d");
                var img = new Image();
                img.src= './img/min-iconfont-planet.png';
                img.onload = function () {
                    context.drawImage(img, SCREEN_CENTER_X-PLANE_RADIUS, SCREEN_CENTER_Y-PLANE_RADIUS,PLANE_RADIUS*2,PLANE_RADIUS*2);
                };

                _this._drawBgLin(context);
            },

            //绘制园线
            _drawBgLin:function(cxt){
                var radius = 50;
                for(var i= 1;i<5;i++){
                    cxt.beginPath();
                    cxt.strokeStyle = "red";
                    cxt.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y,radius*(i+1), 0, Math.PI * 2);
                    cxt.stroke();
                }
            },

            initDrawBoat:function(){
                var _this = this,
                    options = this.options;

                var boat = document.getElementById("screen");
                //set width and height
                boat.width = SCREEN_WIDTH;
                boat.height = SCREEN_HEIGHT;
                //set context
                _this.boatCxt = boat.getContext("2d");



            },
            drawBoat:function(){
                var _this = this,
                    boatCxt = _this.boatCxt;

                BOAT_SPEED += 2;

                var temp = 0;
                //test
                for(var i= 0;i<4;i++){

                    ;
                    (function (i) {
                        var img = new Image();
                        img.src= './img/min-iconfont-rocket-active.png';
                        img.onload = function () {
                            temp++;
                            cacheCxt.save();
                            cacheCxt.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                            cacheCxt.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);
                            cacheCxt.rotate(-BOAT_SPEED * Math.PI / 180);

                            cacheCxt.drawImage(img, 80+50*i, 0,40,40);
                            cacheCxt.drawImage(img, 120+50*i, 0,40,40);
                            cacheCxt.restore();
                            boatCxt.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                            boatCxt.drawImage(cache, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                        };
                    })(i);

                }

                //var img = new Image();
                //img.src= './img/min-iconfont-rocket-active.png';
                //img.onload = function () {
                //    cacheCxt.save();
                //    cacheCxt.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                //    cacheCxt.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);
                //    cacheCxt.rotate(-BOAT_SPEED * Math.PI / 180);
                //
                //    cacheCxt.drawImage(img, 80, 0,40,40);
                //    boatCxt.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                //    boatCxt.drawImage(cache, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                //    cacheCxt.restore();
                //};




            }
        };

        window['DrawImg'] = DrawImg;
    })();

})();


//test
var a = new DrawImg({});


document.getElementById("test").onclick = function () {
    setInterval(function () {
        a.drawBoat();
    }, 30);

};







