import * as SINT from 'sint.js'
import isMobile from 'ismobilejs';


export default class Page1 extends SINT.Container {


    constructor(game) {
        super();
        this.game = game;
        this.appeared = false;
        this.filterArea = new SINT.Rectangle(0, 0, this.game.initWidth, this.game.initHeight);


        this.p1 = new SINT.SpriteClip('page1_p1');
        this.p2 = new SINT.SpriteClip('page1_p2');
        this.p3 = new SINT.SpriteClip('page1_p3');
        this.p4 = new SINT.SpriteClip('page1_p4');

        this.t0 = new SINT.SpriteClip('page1_t0');
        this.t1 = new SINT.SpriteClip('page1_t1');
        this.t2 = new SINT.SpriteClip('page1_t2');
        this.t3 = new SINT.SpriteClip('page1_t3');
        this.t4 = new SINT.SpriteClip('page1_t4');
        this.t5 = new SINT.SpriteClip('page1_t5');


        this.layers = [];
        for (let i = 0; i < 5; i++) {
            let _layer = new SINT.Container();
            this.addChild(_layer);
            this.layers.push(_layer);
        }

        this.layers[0].addChild(this.p3);
        this.layers[0].addChild(this.t0);

        this.layers[1].addChild(this.p2);
        this.layers[1].addChild(this.p4);
        this.layers[2].addChild(this.p1);


        this.layers[2].addChild(this.t1);
        this.layers[2].addChild(this.t2);
        this.layers[3].addChild(this.t3);
        this.layers[3].addChild(this.t4);
        this.layers[4].addChild(this.t5);


    }

    start() {
        this.appeared = false;


        this.p1.scale.set(1);
        this.p1.position.set(800, 1600);
        this.p1.alpha = 0;
        SINT.Tween.to(this.p1.scale, 5, {
            x: 3,
            y: 3,
            ease: Power1.easeOut,
        });
        SINT.Tween.to(this.p1, 5, {
            x: -1100,
            y: -500,
            alpha: 1,
            ease: Power3.easeOut,
        });




        this.p2.scale.set(0.25);
        this.p2.position.set(800, 1600);
        this.p2.alpha = 0;
        SINT.Tween.to(this.p2.scale, 5, {
            x: 2,
            y: 2,
            ease: Power1.easeOut,
        });
        SINT.Tween.to(this.p2, 5, {
            x: -2100,
            y: -1400,
            alpha: 1,
            ease: Power2.easeOut,
        });




        this.p3.scale.set(0.1);
        this.p3.position.set(1130, 1800);
        this.p3.alpha = 0;
        SINT.Tween.to(this.p3.scale, 5, {
            x: 1,
            y: 1,
            ease: Power1.easeInOut,
        });
        SINT.Tween.to(this.p3, 5, {
            x: -280,
            y: -100,
            alpha: 1,
            ease: Power2.easeOut,
        });


        this.p4.scale.set(0.1);
        this.p4.position.set(1130, 1800);
        this.p4.alpha = 0;
        SINT.Tween.to(this.p4.scale, 5, {
            x: 1,
            y: 1,
            delay: 1,
            ease: Power1.easeInOut,
        });
        SINT.Tween.to(this.p4, 5, {
            x: -350,
            y: 1500,
            alpha: 1,
            ease: Power1.easeOut,
        });




        this.t0.position.set(1100, 1200);
        this.t1.position.set(1214, 100);
        this.t2.position.set(1150, 100);
        this.t3.position.set(280, 1024);
        this.t4.position.set(200, 1024);
        this.t5.position.set(840, 1060);
        let _ts = [this.t0, this.t1, this.t2, this.t3, this.t4, this.t5];
        for (let i = 0; i < _ts.length; i++) {
            _ts[i].alpha = 0;
            SINT.Tween.to(_ts[i], 3, {
                alpha: 1,
                delay: 2 + i * 0.3,
                ease: Power2.easeInOut,
            });
        }


         if (!isMobile(window.navigator).phone) {
            this.filter = new SINT.magic.DisplacementFilter(0.0, 0.1, 0);
            this.filters = [this.filter];
            SINT.Tween.to(this.filter, 3, {
                density: .2,
                ease: Power2.easeOut,
            });
        }


        setTimeout(() => {
            this.appeared = true;
        }, 4000);


    }



    removeThis(_y = -1, _callback = null) {
        let _ts = [this.p4, this.p3, this.p2, this.p1, this.t0, this.t1, this.t2, this.t3, this.t4, this.t5];
        for (let i = 0; i < _ts.length; i++) {
            SINT.Tween.to(_ts[i], 2, {
                y: _ts[i].y + _y * 800,
                alpha: 0,
                delay: i * 0.1,
                ease: Power2.easeInOut,
            });
        }


        if (!isMobile(window.navigator).phone) {
            SINT.Tween.to(this.filter, 3, {
                density: 3,
                ease: Power2.easeInOut,
            });
        }

        setTimeout(() => {
            if (_callback) _callback();
            this.filters = [];
            if (this.parent) this.parent.removeChild(this);
        }, 3000);

    }

    updataLayers(x, y) {

        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].x += ((0.5 - x) * (this.layers.length - i) * 60 - this.layers[i].x) * 0.1;
            this.layers[i].y += ((0.5 - y) * (this.layers.length - i) * 60 - this.layers[i].y) * 0.1;
        }

    }

    updata() {

    }

}