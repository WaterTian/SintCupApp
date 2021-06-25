import * as SINT from 'sint.js'
import Cup from './Cup';



export default class Top extends SINT.Container {


    constructor(game) {
        super();
        this.game = game;


        this.bg = new SINT.SpriteClip('top_bg');
        this.bg.anchor.set(1, 0);
        this.addChild(this.bg);
        this.bg.alpha = 0.93;
        this.bg.height = game.initHeight;

        this.logo = new SINT.SpriteClip('logo', -85, 60);
        this.logo.anchor.set(0.5, 0);
        this.addChild(this.logo);


        SINT.Tween.from(this.bg, 2, {
            alpha: 0,
            delay: 1,
            ease: Power3.easeInOut,
        });
        SINT.Tween.from(this.logo.scale, 1, {
            x: 0,
            y: 0,
            delay: 2,
            ease: Back.easeOut,
        });



        this.cupList = [];
        for (let i = 1; i <= 8; i++) {
            let _cup = new Cup(i, 85, 100 + (150 * i));
            this.addChild(_cup);
            this.cupList.push(_cup);
        }

    }

    updataCup(_id, _roll, _pitch, _tem, _touch) {
        this.cupList[_id - 1].appear();
        this.cupList[_id - 1].setRoll(_roll);
        this.cupList[_id - 1].setPitch(_pitch);
        this.cupList[_id - 1].setTem(_tem);
        this.cupList[_id - 1].doTouch(_touch);
        

    }




    updata() {
        let appearedCount = 0;
        for (let i = 0; i < this.cupList.length; i++) {
            if (this.cupList[i].appeared) {
                appearedCount++;
                SINT.Tween.to(this.cupList[i], 1, {
                    y: 100 + (150 * appearedCount),
                    ease: Power3.easeOut,
                });

                this.cupList[i].updata();
            }
        }

    }

}