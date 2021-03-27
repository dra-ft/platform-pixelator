let canvas;
let noise;
let sliderRange;
let sliderTolerance;
let myPalette;
let img;
let input;
let changeMode;
// let modeSelected;
let currentMode;
let palleteChanger;
let colorInput;

function preload(){
    img = loadImage("paaps.png")
}
function setup(){
    canvas = createCanvas(400,400,WEBGL)
    canvas.hide()
    pixelDensity(1)
    changeMode = createSelect();
		changeMode.option('Mode: Default');
		changeMode.option('Mode: Gradients');
		changeMode.option('Mode: Blocks');
		changeMode.selected('Mode: Gradients');
		changeMode.changed(modeSelected);
	changeMode.changed(modeSelected);

    createP("range")
    sliderRange = createSlider(0, 1, 1, 0.001);
		sliderRange.input( () => {
			pixelator.set({
				range: sliderRange.value()
			})
		})
	
    createP("tolerance")
    sliderTolerance = createSlider(0, 1, 0.2,0);
    sliderTolerance.input( () => {
        pixelator.set({
            tolerance: sliderTolerance.value()
        })
    })

    createP("add image")
    input = createFileInput(handleFile);

    colorInput = createInput('')
    // colorInput.input(addColors);
    palleteChanger = createButton('change colors')
    palleteChanger.mousePressed(addColors)

    myPalette = [
        color('#5c0423'),
        color('#02205e'),
        color('#453a14'),
        color('#2d260c'),
        color('#451a0b'),
        color('#0b3b8d'),
        color('#171717'),
        color('#1e1e20'),
        color('#212025'),
        color('#2664c7'),
        color('#3b3a38'),
        color('#91cec9'),
        color('#9e9171'),
        color('#9fd4ca'),
        color('#b89a20'),
        color('#c70b23'),
        color('#cecdc9'),
        color('#d0b7ba'),
        color('#d6e8fc'),
        color('#d8d5d0'),
        color('#e86d1f'),
        color('#e8eeea'),
        color('#ec4942'),
        color('#f5e865'),
        color('#f697c3'),
        color('#fa79b9'),
        color('#fbe343'),
        color('#fc6320'),
        color('#fecb3c')
    ];

    noiseCanvas = createGraphics(64, 30);
    noiseCanvas.background(100);
    noiseCanvas.fill(255)


    // pixelator = new Pixelator(window, noiseCanvas, { type: "blocks", palette: myPalette });
    // pixelator = new Pixelator(window, noiseCanvas, { type: "gradients", palette: myPalette });
    pixelator = new Pixelator(window, noiseCanvas, { type: "image", image: img });
    pixelator.changeSource( noiseCanvas );
}

function draw(){
    pixelator.update()
    // pixelator.set({ range: 0.6 })
    // pixelator.set({ tolerance: 0.001 })
    // noiseCanvas.background(100)
    noiseCanvas.loadPixels();
    for(let i=0; i<noiseCanvas.pixels.length/4; i++) {
        let x = i % noiseCanvas.width;
        let y = Math.floor( i / noiseCanvas.width );
        let mx = pixelator.mouseX;
        let my = pixelator.mouseY;
        let nx = noiseCanvas.noise(x*0.005,y*0.005,frameCount*0.0006+(mx+my)*0.25)
        let c = floor( constrain( map(nx,0.3,0.7,0,255), 0, 255));
        noiseCanvas.pixels[i*4] = c;
        noiseCanvas.pixels[i*4+1] = c;
        noiseCanvas.pixels[i*4+2] = c;
    }
    noiseCanvas.updatePixels();
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
      img = loadImage(file.data, () => {
        changeMode.selected('Mode: Image');
        pixelator.set( { type: "image", image: img } );		
			});
    } else {
      img = null;
    }
  }

function modeSelected(){
    let v = changeMode.value();
    switch (v) {

        case "Mode: Default":
            currentMode = "";
            pixelator.clear();
            break;
        case "Mode: Gradients":
				currentMode = "gradients";
				pixelator.set( { type: "gradients", palette: myPalette } );
				break;

        case "Mode: Blocks":
            currentMode = "blocks";
            pixelator.set( { type: "blocks", palette: myPalette } );
            break;

        case "Mode: Image":
            currentMode = "image";
            pixelator.set( { type: "image", image: myFile } );
            break;
    }
}

function addColors(){
    myPalette = [];
    colors = colorInput.value();
    let splitString = split(colors, ',');
    // console.log(splitString);
    for(i=0;i<splitString.length;i++){
        // color('#5c0423')
        addHex = color(str('#'+splitString[i]))
        console.log(addHex)
        myPalette.push(addHex)
    }
    pixelator.set( { type: "blocks", palette: myPalette } );
}