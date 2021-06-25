import * as SINT from 'sint.js'



export default class Bg extends SINT.Container {


    constructor(game) {
        super();
        this.game = game;


        this.filterArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
        this.filter = new SINT.magic.HolesFilter(0xf0f0f0, 0xffffff, 0.2, 0.1);
        this.filters = [this.filter];

        SINT.Tween.to(this.filter, 5, {
            zoom: 0.6,
            delay:2,
        });

        // this.filterColor1 = {
        //     r: 250,
        //     g: 250,
        //     b: 250,
        // }
        // this.filterColor2 = {
        //     r: 250,
        //     g: 250,
        //     b: 250,
        // }
        // SINT.Tween.to(this.filterColor1, 5, {
        //     r: 74,
        //     g: 119,
        //     b: 138,
        //     onUpdate: () => {
        //         this.filter.color1 = [this.filterColor1.r, this.filterColor1.g, this.filterColor1.b];
        //     }
        // });
        // SINT.Tween.to(this.filterColor2, 5, {
        //     r: 243,
        //     g: 249,
        //     b: 241,
        //     onUpdate: () => {
        //        this.filter.color2 = [this.filterColor2.r, this.filterColor2.g, this.filterColor2.b];
        //     }
        // });


    }


    updataOffset(x, y) {
        this.filter.offset[0] += (x  - this.filter.offset[0]) * 0.1;
        this.filter.offset[1] += (y  - this.filter.offset[1]) * 0.1;
    }



    updata() {


    }

}