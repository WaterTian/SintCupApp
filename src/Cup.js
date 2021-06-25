import * as SINT from 'sint.js'



export default class Cup extends SINT.Container {


    constructor(_id, _x = 0, _y = 0) {
        super();
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.appeared = false;
        this.hideTime = 100;


        this.bg = new SINT.SpriteClip('top_d1');
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);


        let numTextures = [];
        for (let i = 1; i <= 8; i++) {
            numTextures.push(SINT.Texture.fromImage('./assets/top_n' + i + '.png'));
        }
        this.numAS = new SINT.AnimatedSprite(numTextures);
        this.addChild(this.numAS);
        this.numAS.anchor.set(0.5);
        this.numAS.gotoAndStop(_id - 1);



        this.rollLine = new SINT.SpriteClip('top_d2');
        this.rollLine.anchor.set(1, 0.5);
        this.addChild(this.rollLine);

        this.pitchLine = new SINT.SpriteClip('top_d2');
        this.pitchLine.anchor.set(1, 0.5);
        this.pitchLine.scale.set(-1, 1);
        this.addChild(this.pitchLine);


        this.rollTxt = new SINT.TextClip('0', -75, 20, {
            fontFamily: 'Arial',
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#000000',
        })
        this.addChild(this.rollTxt);

        this.pitchTxt = new SINT.TextClip('0', 75, 20, {
            fontFamily: 'Arial',
            fontSize: 28,
            fontWeight: 'bold',
            fill: '#000000',
        })
        this.pitchTxt.anchor.set(1, 0)
        this.addChild(this.pitchTxt);

        this.temTxt = new SINT.TextClip('0 °C', 0, 50, {
            fontFamily: 'Arial',
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#000000',
        })
        this.temTxt.anchor.set(0.5, 0)
        this.addChild(this.temTxt);

    }


    setRoll(_v) {
        this.rollLine.rotation = Math.PI / 180 * _v;
        this.rollTxt.text = _v;


    }
    setPitch(_v) {
        this.pitchLine.rotation = Math.PI / 180 * _v;
        this.pitchTxt.text = _v;

    }
    setTem(_v) {
        this.temTxt.text = _v + ' °C';
    }

    doTouch(_v) {

        if (_v < 1000) return;

        let bg = new SINT.SpriteClip('top_d1');
        bg.anchor.set(0.5);
        bg.scale.set(0);
        this.addChild(bg);
        SINT.Tween.to(bg.scale, 1, {
            x: 1,
            y: 1,
            ease: Power2.easeOut,
            onCompleteParams:[this],
            onComplete: (e) => {
                e.removeChild(bg);
            }
        });

    }

    appear() {
        this.appeared = true;
        this.hideTime = 1000;
        SINT.Tween.to(this, 1, {
            x: -85,
            alpha: 1,
            ease: Power3.easeOut,
        });

    }

    updata() {
        if (!this.appeared) return;

        this.hideTime--;
        if (this.hideTime < 0) {
            this.appeared = false;
            SINT.Tween.to(this, 1, {
                x: 85,
                alpha: 0,
                ease: Power3.easeOut,
            });
        }
    }


}