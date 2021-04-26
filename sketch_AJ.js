
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
// let arr = ["dra.ft","!",]

let inputForm;
let submitButton;
let txtArray;
let splitString = [];

let myfont;
let sliderFont;
let state = true;

function preload(){
    img = loadImage("anisha.jpeg")
    myfont = loadFont("IBMPlexMono-MediumItalic.ttf")
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
    sliderRange = createSlider(0.07, 0.1, 0.1, 0.0001);
		sliderRange.input( () => {
			pixelator.set({
				range: sliderRange.value()
			})
		})
	
    createP("tolerance")
    sliderTolerance = createSlider(0, 1, 0.2,0.001);
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
    palleteChanger.style("margin-right:30px")

    myPalette = [
      color('#3eb489'),
      color('#ffffff'),
      color('#0000ff')
    ];


    inputForm = createInput("")
    submitButton = createButton("add letters to grid")
    submitButton.mousePressed(inputVal)
    textAlign(CENTER)
    textSize(10)
    
    createP("fontsize")
    sliderFont = createSlider(8, 100, 0.2,0);
    sliderFont.input( () => {
        pixelator.set({
            tolerance: sliderTolerance.value()
        })
    })
    noiseCanvas = createGraphics(64, 64);
    noiseCanvas.background(100);
    noiseCanvas.fill(255)
    noiseCanvas.frameRate(4)
    frameRate(4)

    pixelator = new Pixelator(window, noiseCanvas, { type: "blocks", palette: myPalette });
    // pixelator = new Pixelator(window, noiseCanvas, { type: "gradients", palette: myPalette });
    // pixelator = new Pixelator(window, noiseCanvas, { type: "image", image: img });
    pixelator.changeSource( noiseCanvas );
    noiseCanvas.textFont(myfont)
    noiseCanvas.textAlign(CENTER)
  
    stoploop = createButton("stop animation");
    stoploop.mousePressed(frameStop)
    if (state) {
      frameRate(4)
    } else {
      frameRate(0)
    }
  }
  
  function draw(){
    pixelator.update()
    noiseCanvas.textSize(sliderFont.value())
    // pixelator.set({ range: 0.6 })
    pixelator.set({ tolerance: 0.001 })
    noiseCanvas.background(100)
    // noiseCanvas.loadPixels();
    // for(let i=0; i<noiseCanvas.pixels.length/4; i++) {
    //     let x = i % noiseCanvas.width;
    //     let y = Math.floor( i / noiseCanvas.width );
    //     let mx = pixelator.mouseX;
    //     let my = pixelator.mouseY;
    //     let nx = noiseCanvas.noise(x*0.005,y*0.005,0.0006+(mx+my)*0.25)
    //     let c = floor( constrain( map(nx,0.3,0.7,0,255), 0, 255));
    //     noiseCanvas.pixels[i*4] = c;
    //     noiseCanvas.pixels[i*4+1] = c;
    //     noiseCanvas.pixels[i*4+2] = c;
    // }
    // noiseCanvas.image(img, 0, 0, 64, 64)
    let w = 0;
    let h = 5; 
    let offset = 13;
if(inputForm.value() !== null){
  for(i=0;i<splitString.length;i++){
    let index = (i) % splitString.length
    noiseCanvas.text(splitString[index],10+w,10+h)
    // text(splitString[i],10+w,10+h)
    w+=offset
    if(w>noiseCanvas.width){
      w = 0;
      h += offset
    }
  }
}
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

function inputVal(){
    txt = inputForm.value()
    if(inputForm.value()!=null){
    splitString = split(txt,",")
    console.log(splitString, splitString.length)
    }
  //   
  }

function frameStop(){
  state != state
  
}
