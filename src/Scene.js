import * as SINT from 'sint.js';
import io from 'socket.io-client';
import isMobile from 'ismobilejs';

import Bg from './Bg';
import Top from './Top';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

let That;
let SCREEN_SIZE = isMobile(window.navigator).phone ? 0.7 : 1;

let game, stage, copyright, bg, top;
let pages = [];
let currentPageNum;




const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 1536 * SCREEN_SIZE,
	initHeight: 2048 * SCREEN_SIZE,
	showFPS: 0,
	backgroundColor: 0xfafafa,
};

const assets = {
	logo: './assets/logo.png',
	top_bg: './assets/top_bg.png',
	top_bar: './assets/top_bar.png',
	top_d1: './assets/top_d1.png',
	top_d2: './assets/top_d2.png',

	page1_p1: './assets/p1_1.png',
	page1_p2: './assets/p1_2.png',
	page1_p3: './assets/p1_3.png',
	page1_p4: './assets/p1_4.png',
	page1_t0: './assets/p1_t0.png',
	page1_t1: './assets/p1_t1.png',
	page1_t2: './assets/p1_t2.png',
	page1_t3: './assets/p1_t3.png',
	page1_t4: './assets/p1_t4.png',
	page1_t5: './assets/p1_t5.png',

	page2_p1: './assets/p2_1.png',
	page2_p2: './assets/p2_2.png',
	page2_p3: './assets/p2_3.png',
	page2_t0: './assets/p2_t0.png',
	page2_t1: './assets/p2_t1.png',
	page2_t2: './assets/p2_t2.png',
	page2_t3: './assets/p2_t3.png',

	page3_p1: './assets/p3_1.png',
	page3_p2: './assets/p3_2.png',
	page3_p3: './assets/p3_3.png',
	page3_t0: './assets/p3_t0.png',
	page3_t1: './assets/p3_t1.png',
	page3_t2: './assets/p3_t2.png',
	page3_t3: './assets/p3_t3.png',

	page4_p1: './assets/p4_1.png',
	page4_p2: './assets/p4_2.png',
	page4_p3: './assets/p4_3.png',
	page4_p4: './assets/p4_4.png',
	page4_t0: './assets/p4_t0.png',
	page4_t1: './assets/p4_t1.png',
	page4_t2: './assets/p4_t2.png',
	page4_t3: './assets/p4_t3.png',

}


export default class Scene {

	constructor() {
		That = this;


		this.socket = io("ws://localhost:3434");
		this.socket.on('cupData', (e) => {
			// console.log(e);
			try {
				let message = e.toString();
				let messageArr = message.split('>');

				let SceneNum = Number(messageArr[0]);
				let CupID = Number(messageArr[1].slice(-1));
				let CupRoll = Number(messageArr[2]);
				let CupPitch = Number(messageArr[3]);
				let CupTemperature = Number(messageArr[4]);
				let CupTouch = Number(messageArr[5]);

				// console.log(" Num" + SceneNum + " ID" + CupID + " Roll" + CupRoll + " Pitch" + CupPitch + " Tempe" + CupTemperature);

				if (top) top.updataCup(CupID, CupRoll, CupPitch, CupTemperature, CupTouch);
			} catch (err) {
				console.log("Cup socket " + err);
			}

		})


		this.init();
		this.updata();
	}


	init() {
		game = new SINT.Game(config);
		let loadingTxt = new SINT.TextClip('0%', game.initWidth / 2, game.initHeight / 3, {
			fontFamily: 'Arial',
			fontSize: 30,
			fontWeight: 'bold',
			fill: ['#bbb', '#aaa']
		})
		loadingTxt.anchor.set(0.5)
		game.addChild(loadingTxt)
		game.preload({
			assets: assets,
			loading: (e) => {
				loadingTxt.text = Math.floor(e.progress) + '%'
			},
			loaded: () => {
				game.remove(loadingTxt)
				That.initStage()
			},
		})

	}

	initStage() {
		stage = new SINT.Container();
		game.addChild(stage);


		top = new Top(game);
		game.addChild(top);
		top.position.set(game.initWidth, 0);

		bg = new Bg(game);
		stage.addChild(bg);


		pages = [new Page1(game), new Page2(game), new Page3(game), new Page4(game)];

		currentPageNum = 0;
		stage.addChild(pages[0]);
		pages[0].start();


		if (this.socket) this.socket.emit('setNum', currentPageNum + 1);





		///copyright
		copyright = new SINT.TextClip('© Sintlab.com 2021 .', game.initWidth - 30, game.initHeight - 20, {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: ['#ffffff'],
			dropShadow: true,
			dropShadowColor: '#121212',
			dropShadowBlur: 2,
			dropShadowAngle: Math.PI / 2,
			dropShadowDistance: 1,
		});
		game.addChild(copyright);
		copyright.anchor.set(1);
		copyright.alpha = .5;




		window.addEventListener('resize', this.onWindowResized);
		if (window.DeviceOrientationEvent) window.addEventListener("deviceorientation", this.onOrientation);
		this.onWindowResized();

		window.addEventListener('keydown', function (e) {
			if (e.keyCode === 38) {
				//key ↑
				That.prePage();
			}

			if (e.keyCode === 40) {
				//key ↓
				That.nextPage();
			}

			if (e.keyCode === 80) {
				//key P
				var de = document.documentElement;
				if (de.requestFullscreen) {
					de.requestFullscreen();
				} else if (de.mozRequestFullScreen) {
					de.mozRequestFullScreen();
				} else if (de.webkitRequestFullScreen) {
					de.webkitRequestFullScreen();
				}

				That.onWindowResized();
			}

		});



		stage.interactive = true;
		stage.hitArea = new SINT.Rectangle(0, 0, game.initWidth, game.initHeight);
		stage
			.on('pointerdown', this.onDragStart)
			.on('pointerup', this.onDragEnd)
			.on('pointerupoutside', this.onDragEnd)
			.on('pointermove', this.onPointMove)

	}

	nextPage() {
		if (!pages[currentPageNum].appeared) return;

		pages[currentPageNum].removeThis(-1);
		setTimeout(() => {
			currentPageNum++;
			if (currentPageNum > 3) currentPageNum = 0;
			stage.addChild(pages[currentPageNum]);
			pages[currentPageNum].start();

			if (this.socket) this.socket.emit('setNum', currentPageNum + 1);
		}, 1000);



	}
	prePage() {
		if (!pages[currentPageNum].appeared) return;

		pages[currentPageNum].removeThis(1);
		setTimeout(() => {
			currentPageNum--;
			if (currentPageNum < 0) currentPageNum = 3;
			stage.addChild(pages[currentPageNum]);
			pages[currentPageNum].start();

			if (this.socket) this.socket.emit('setNum', currentPageNum + 1);
		}, 1000);
	}

	onDragStart(event) {
		this.dragging = true
		this.startY = event.data.global.y
		this.moveY = 0
	}
	onDragEnd(event) {
		this.dragging = false
		// console.log(this.moveY)
		if (this.moveY < -2) That.nextPage();
		if (this.moveY > 2) That.prePage();

	}
	onPointMove(event) {
		let p = event.data.global.clone();
		bg.updataOffset(p.x / game.initWidth, p.y / game.initHeight);


		for (let i = 0; i < pages.length; i++) {
			if (pages[i].parent) pages[i].updataLayers(p.x / game.initWidth, p.y / game.initHeight);
		}


		if (this.dragging) {
			this.moveY = event.data.global.y - this.startY
			this.startY = event.data.global.y
		}
	}



	onWindowResized() {
		for (let i = 0; i < pages.length; i++) {
			pages[i].scale.set(SCREEN_SIZE);
			pages[i].filterArea.width = game.initWidth;
			pages[i].filterArea.height = game.initHeight;
		}


		bg.filterArea.width = game.initWidth;
		bg.filterArea.height = game.initHeight;

		top.bg.height = game.initHeight;

		copyright.x = game.initWidth - 30;
		copyright.y = game.initHeight - 20;

	}

	onOrientation(event) {

		// let alpha = event.alpha ? SINT.Unit.degToRad(event.alpha) : 0 // Z
		let beta = event.beta ? SINT.Unit.degToRad(event.beta) : 0 // X'
		let gamma = event.gamma ? SINT.Unit.degToRad(event.gamma) : 0 // Y''

		bg.updataOffset(beta, gamma);
		for (let i = 0; i < pages.length; i++) {
			if (pages[i].parent) pages[i].updataLayers(beta, gamma);
		}
	}

	updata() {
		requestAnimationFrame(this.updata.bind(this));

		for (let i = 0; i < pages.length; i++) {
			if (pages[i].parent) pages[i].updata();
		}


		if (top) top.updata();

	}



}