var GameOverLayer = cc.Layer.extend({
    ctor:function (filename) {
        this._super();
        this.initMenuLayer(filename);
    },
    initMenuLayer: function(filename){
        var baselayer = new cc.LayerColor.create(cc.color(0,0,0,50));
        baselayer.ignoreAnchorPointForPosition(false);
        baselayer.setAnchorPoint(cc.p(0.5,0.5));
        baselayer.setContentSize(cc.size(cc.winSize.width * 3/4, cc.winSize.height/2));
        baselayer.setPosition(cc.winSize.width/2,cc.winSize.height);
        this.addChild(baselayer);
        baselayer.runAction(cc.moveBy(0.8,cc.p(0,-cc.winSize.height/2)).easing(cc.easeBackOut()));

        var winner = new Hero(filename);
        winner.setPosition(baselayer.getContentSize().width/2, baselayer.getContentSize().height/2);
        baselayer.addChild(winner);

        var winnerlabel = new cc.LabelTTF("Winner", "", 64);
        winnerlabel.setPosition(baselayer.getContentSize().width/2,baselayer.getContentSize().height*3/4);
        baselayer.addChild(winnerlabel);

        //add refresh tip
        var refreshlabel = new cc.LabelTTF("Please press            to restart game", "", 32);
        refreshlabel.setPosition(baselayer.getContentSize().width/2,baselayer.getContentSize().height/4);
        baselayer.addChild(refreshlabel);

        var startitem = new cc.MenuItemImage(res.key_dot, res.key_dot, function(pSender){
            audioEngine.playEffect(res.audio_item_taken);
            this.runAction(cc.sequence(cc.moveBy(0.8,cc.p(0,cc.winSize.height*3/4)).easing(cc.easeBackOut()),cc.callFunc(function(sender){
                cc.director.runScene(new GameScene(false));
            })));
        },this);
        startitem.runAction(cc.sequence(cc.scaleTo(0.8,1.2),cc.scaleTo(0.8,0.8)).repeatForever());
        var startMenu = new cc.Menu(startitem);
        startMenu.setPosition(baselayer.getContentSize().width/2,baselayer.getContentSize().height/4);
        baselayer.addChild(startMenu);
    }
});