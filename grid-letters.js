let inputForm;
let submitButton;
let txtArray;
let splitString = [];

function setup() {
  createCanvas(400, 400);
  inputForm = createInput("")
  submitButton = createButton("submit")
  submitButton.mousePressed(inputVal)
  textAlign(CENTER)
  textSize(40)
  frameRate(4)
}

function draw() {
  background(220);
  let w = 30;
  let h = 30; 
  let offset = 60
if(inputForm.value() !== null){
  for(i=0;i<splitString.length;i++){
    let index = (i+(frameCount)) % splitString.length
    text(splitString[index],10+w,10+h)
    // text(splitString[i],10+w,10+h)
    w+=offset
    if(w>width){
      w = 0;
      h += offset
    }
  }
}
}

function inputVal(){
  txt = inputForm.value()
  if(inputForm.value()!=null){
  splitString = split(txt,",")
  console.log(splitString, splitString.length)
  }
//   
}

//1,@,#,$,%,^,&,*,(,),:,;,{,},[,],dra.ft