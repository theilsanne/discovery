// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.main = {
    // --- Variables
    // canvases
    WIDTH: 1280,
    HEIGHT: 460,
    canvas: undefined,
    ctx: undefined,
    interface: undefined,
    intCtx: undefined,
    lastTime: 0,
    debug: false,
    paused: false,
    animationID: 0,
    
    // experience states
    // 1. begin
    // 2. home
    // 3. space
    // 4. underwater
    expState: undefined,
    EXP_STATE: Object.freeze({
        BEGIN: 0,
        HOME: 1,
        SPACE: 2,
        UNDERWATER: 3,
        INFO: 4
    }),
    
    // sounds
    sound: undefined,
    
    // scene
    //scene: undefined,
    room: {
        width: 1280,
        height: 460,
        map: undefined,
    },
    STEP: undefined,
    camera: undefined,
    
    /*
    // scene scrolling
    speed: 50,
    quickSpeed: false,
    DIRECTION: Object.freeze({
        STATIC: 0,
        LEFT: 1,
        RIGHT: 2
    }),
    */

    // --- Methods
    // initialise main
    init: function() {
        console.log("main-2.js init called");
        
		// --- initialise scroll canvas properties
		this.canvas = document.querySelector('#scrollCanvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
        //console.log(this.canvas.width + ", " + this.canvas.height);
		this.ctx = this.canvas.getContext('2d');
        
		// --- initialise ui canvas properties
		this.interface = document.querySelector('#uiCanvas');
		this.interface.width = 680;
		this.interface.height = this.HEIGHT;
        //console.log(this.interface.width + ", " + this.interface.height);
		this.intCtx = this.interface.getContext('2d');
        
        // --- initialise experience
        this.expState = this.EXP_STATE.BEGIN;
        //this.expState = this.EXP_STATE.SPACE;
        
        // --- initialise audio
        this.bgAudio = document.querySelector("#bgAudio");
        this.bgAudio.volume = 0.25;
        this.effectAudio = document.querySelector("#effectAudio");
        this.effectAudio.volume = 0.3;
        
        this.sound.soundTest();
        
        // --- initialise scene
        // map
        this.room.map = this.scene.map;
        // generate large image texture
        this.room.map.generate();
        // set up camera
        this.camera = this.scene.Camera(0, 0, this.canvas.width, this.canvas.height, this.room.width, this.room.height);
        console.dir(this.camera);
        
        this.scene.sceneTest();
        
        
        //-------SOUND----------
        // start with no audio
        this.sound.stopBGAudio();
        
		// start the animation loop
		this.update();
    },
    
    // animation loop
    update: function() {
        //console.log("update loop called");
        
        // schedule call to update()
        this.animationID = requestAnimationFrame(this.update.bind(this));
        
        // check for pause state
        if (this.paused) {
            // draw pause screen?
            return;
        }
        
        // check for time passed
        var dt = this.calculateDeltaTime();
        
        // draw scene
        //console.log("drawing scene");
        this.drawScene(this.ctx);
        
        /*
        //this.test();
        //console.log("testing: bg");
		this.ctx.fillStyle = "black"; 
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); 
        
        //console.log("testing: circle");
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(200, 200, 50, 0, Math.PI*2, false);
        this.ctx.closePath(0);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.restore();
        */
    },
    
    // debug
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
        this.STEP = 1/fps;
		return 1/fps;
	},
    
    // play/pause
    pause: function() {
        // set boolean to true
        this.paused = true;
        
        // stop animation loop
        cancelAnimationFrame(this.animationID);
        
        // call update() once to draw paused screen
        this.update();
        
        // stop audio
        this.stopBGAudio();
    },
    
    resume: function() {
        // stop animation loop in case it's running
        cancelAnimationFrame(this.animationID);
        
        // set boolean to false
        this.paused = false;
        
        // restart loop
        this.update();
        
        // play audio
        this.sound.playBGAudio();
    },
    
    // set up scene
    drawScene: function(ctx) {
        // clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // redraw all objects
        this.room.map.draw(ctx, this.camera.xView, this.camera.yView);	
        
    },
    
    // === TESSSSTTTTTT
    test: function() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width/2, this.canvas.height/2, 50, 0, Math.PI*2, false);
        this.ctx.closePath(0);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.restore();
    },
    
    // UI & screens
    drawUI: function(ctx) {
        // intro
        
        
        // home
        
        
        // space
        
        
        // underwater
    },
    
    // audio
    stopBGAudio: function() {
        this.sound.stopBGAudio();
    },
    
    playEffect: function() {
        this.effectAudio.src = "assets/sounds/" + this.effectSounds[this.currentEffect];
        this.effectAudio.play();
        
        this.currentEffect += this.currentDirection;
        if (this.currentEffect == this.effectSounds.length || this.currentEffect == -1) {
            this.currentDirection *= -1;
            this.currentEffect += this.currentDirection;
        }
    },
    
    // mouse events
    doMouseDown: function(e) {
        // play audio
        this.sound.playBGAudio();
        
        // unpause on a click
        // just to make sure we never get stuck in a paused state
        if (this.paused) {
            this.paused = false;
            this.update();
            
            return;
        };
        
        // title screen
        if (this.gameState == this.GAME_STATE.BEGIN) {
            this.gameState = this.GAME_STATE.DEFAULT;
            
            return;
        }
        
        var mouse = getMouse(e);
    },
    
};