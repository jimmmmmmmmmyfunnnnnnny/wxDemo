"use strict";
cc._RF.push(module, '39c85mbz1JJyIIGzskvaiap', 'demo');
// script/demo.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        testNode: cc.Node,
        testCricle: {
            default: [],
            type: [cc.Node]
        },
        posNode: cc.Node,
        edboxX: cc.EditBox,
        edboxY: cc.EditBox

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log("onLoad ");
        this.logRet();
    },
    start: function start() {
        console.log("start ");
        this.logRet();
    },

    logMenuBounding: function logMenuBounding() {
        console.log("logMenuBounding ");
        this.logRet();
    },
    logRet: function logRet() {
        var visibleSize = cc.view.getVisibleSize();
        console.log("visibleSize", visibleSize);
        if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME) {
            var rect = wx.getMenuButtonBoundingClientRect();
            console.log("rect =", rect);
            if (rect !== undefined && rect.width !== undefined && rect.height !== undefined) {
                var designSize = cc.view.getDesignResolutionSize();
                var pos_x = (rect.left + rect.right) / 2 * designSize.width / window.innerWidth;
                var pos_y = (window.innerHeight - (rect.bottom + rect.top) / 2) * designSize.height / window.innerHeight;
                this.edboxX.string = pos_x;
                this.edboxY.string = pos_y;
                this.posNode.setPosition(cc.v2(pos_x, pos_y));
                console.log("pos_x pos_y", pos_x, pos_y);
                console.log("designSize ", designSize);
                console.log("window.innerHeight window.innerWidth", window.innerHeight, window.innerWidth);
                // for (let i = 0;i<this.testCricle.length;i++){
                //     console.log("testCricle =",this.testCricle[i])
                //     this.testCricle[i].setPosition(cc.v2(pos_x,pos_y))
                // }
            }
        }
    },
    modify: function modify() {
        console.log("this.edboxX.string this.edboxY.string", this.edboxX.string, this.edboxY.string);
        this.posNode.setPosition(cc.v2(this.edboxX.string, this.edboxY.string));
    }

    // update (dt) {},
});

cc._RF.pop();