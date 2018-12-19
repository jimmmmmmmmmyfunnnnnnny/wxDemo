"use strict";
cc._RF.push(module, '76b85CaLEJCLInBJoOrhYz2', 'catchFishGame');
// script/catchFishGame.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        fish_1: cc.Node
    },
    start: function start() {
        this.testBezier();
    },

    testBezier: function testBezier() {
        this.end = false;
        this.begainPos = this.fish_1.position;
        var wuguiAni = this.fish_1.getComponent(cc.Animation);
        wuguiAni.play("wugui");
        wuguiAni.wrapMode = cc.WrapMode.Loop;

        var bezier_1 = [cc.v2(0, cc.winSize.height / 2), cc.v2(300, -cc.winSize.height / 2), cc.v2(500, 100)];
        var bezierTo = cc.bezierTo(10, bezier_1);

        // var bezier_2 = [cc.v2(cc.winSize.width/4, 0), cc.v2(cc.winSize.width*3/4, cc.winSize.height), cc.v2(cc.winSize.width, 0)]
        // var bezierTo_2 = cc.bezierTo(10, bezier_2)
        // var bezier = [cc.p(0,0), cc.p(50,100), cc.p(900,0)];
        // var bezierBy = cc.bezierBy(10, bezier);
        var fc = cc.callFunc(function () {
            this.fish_1.position = this.begainPos;
            var wuguiAni = this.fish_1.getComponent(cc.Animation);
            wuguiAni.stop("wugui");
            this.end = true;
        }.bind(this));
        var seq = cc.sequence(bezierTo, fc);
        this.fish_1.runAction(seq);
        this.updateFishRotation();
    },

    restart: function restart() {
        if (!this.end) {
            console.log("not end");
            return;
        }

        this.testBezier();
    },
    update: function update(dt) {},
    updateFishRotation: function updateFishRotation() {
        this.updateName = this.schedule(function () {
            var endPos = new cc.v2(900, 100);
            var begainPos = new cc.v2(-430, 8);
            var curPos = this.fish_1.position;
            var lastPosX = curPos.x + 1;
            var lastPosY = curPos.y + 1;
            if (curPos == endPos || curPos == begainPos) {
                this.unschedule(this.updateName);
                return;
            }
            var K = Math.atan((curPos.x - lastPosX) / (curPos.y - lastPosY));
            this.fish_1.rotation = K * 90 / Math.PI;
        }.bind(this), 0.001);
    }
});

cc._RF.pop();