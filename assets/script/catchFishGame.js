cc.Class({
    extends: cc.Component,

    properties: {
        fish_1:cc.Node,
    },
    start () {
        this.testBezier();
    },
    testBezier:function(){
        this.end = false;
        this.begainPos = this.fish_1.position
        let wuguiAni = this.fish_1.getComponent(cc.Animation);
        wuguiAni.play("wugui");
        wuguiAni.wrapMode = cc.WrapMode.Loop;


        var bezier_1 = [cc.v2(0, cc.winSize.height / 2), cc.v2(300, -cc.winSize.height / 2), cc.v2(500, 100)];
        var bezierTo = cc.bezierTo(10, bezier_1);

        // var bezier_2 = [cc.v2(cc.winSize.width/4, 0), cc.v2(cc.winSize.width*3/4, cc.winSize.height), cc.v2(cc.winSize.width, 0)]
        // var bezierTo_2 = cc.bezierTo(10, bezier_2)
        // var bezier = [cc.p(0,0), cc.p(50,100), cc.p(900,0)];
        // var bezierBy = cc.bezierBy(10, bezier);
        var fc = cc.callFunc(function(){
            this.fish_1.position = this.begainPos
            let wuguiAni = this.fish_1.getComponent(cc.Animation);
             wuguiAni.stop("wugui");
            this.end = true;
        }.bind(this));
        var seq = cc.sequence(bezierTo, fc);
        this.fish_1.runAction(seq);
        this.updateFishRotation();
    },

    restart:function(){
        if(!this.end){
            console.log("not end");
            return
        }
        
        this.testBezier();
    },
    update (dt) {
    
    },
    updateFishRotation(){
        this.updateName = this.schedule(function(){
            let endPos = new cc.v2(900, 100);
            let begainPos = new cc.v2(-430, 8)
            let curPos = this.fish_1.position;
            let lastPosX = curPos.x + 1
            let lastPosY = curPos.y + 1
            if (curPos == endPos||curPos == begainPos){
                this.unschedule( this.updateName);
                return;
            }
            let K = Math.atan((curPos.x - lastPosX)/(curPos.y - lastPosY));
            this.fish_1.rotation = (K * 90/Math.PI);
        }.bind(this),  0.001)
    }
});
