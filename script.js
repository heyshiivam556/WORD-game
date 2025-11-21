let wordList = []
let puzzleWord = ''
let puzzleHint = ''


// Getting a random  words
async function getRandomWordBlock() {
  const res = await fetch("words.json");
  wordList = await res.json();

  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}
// Pick one hint out of the 3
function getRandomHint(hintsArray){
  const index = Math.floor(Math.random()*hintsArray.length)
  return hintsArray[index]
}


async function loadPuzzleWord() {
  
    const wordBlock = await getRandomWordBlock();

    puzzleWord =  wordBlock.word;
    puzzleHint =  getRandomHint(wordBlock.hints);
    console.log(puzzleWord)
    console.log(puzzleWord.length)
    
    giveSegments(puzzleWord.length)
    
      console.log("WORD =", puzzleWord);
      console.log("MEANING =", puzzleHint);

     
      
      document.getElementById("hint").textContent =  puzzleHint;
      
    }


  document.getElementById("hint").textContent = "Click the Start Button!";
 


const startBtn = document.getElementById('start')
const wordGuessArea = document.getElementsByClassName('word-guess-area')[0];
const Segments = document.getElementsByClassName('letter-segment')
//sound import
const errorSound = new Audio('src/errorSound.mp3')
const winSound = new Audio('src/correctWord.mp3')  
const winnerSound = new Audio('src/winnerSound.mp3')
//------------phone workings-------------------//
const mobileKB = document.getElementById('mobileKeyboard')
const hiddenInput = document.getElementById('hiddenInput')


//------------stat and restart button--------------------------//
startBtn.addEventListener('click', (e)=>{
    loadPuzzleWord();
    startBtn.textContent = "RESTART"
     document.querySelector('.live-message').textContent = ''

    //make all elements blank
    for (const box of Segments) {
      box.textContent = ''
      currentIndex = 0
    }
    wordGuessArea.innerHTML = ''

   
})

//------------------show button------------------------------//
const showBtn = document.getElementById('show')

showBtn.addEventListener('click',()=>{
  document.getElementById('answer').toggleAttribute('hidden')
  console.log('show clicked');
   document.getElementById('answer').textContent = puzzleWord
})
//-------------------------- box filling one by one -------------------//
let currentIndex = 0 

function handLetter(key){
  

  // registering any alphabet || fill the letter 
 
    if(currentIndex<Segments.length){
      Segments[currentIndex].textContent = key.toUpperCase()

  //Live check - greeen or red || per-letter validation
  if(key.toUpperCase() === puzzleWord[currentIndex]){
    Segments[currentIndex].classList.add('correct')
    Segments[currentIndex].classList.remove('wrong')
    document.querySelector('.live-message').textContent = 'You\'re Doing Well! 😀😉'
    winSound.play()
  }else{
    Segments[currentIndex].classList.add('wrong')
    Segments[currentIndex].classList.remove('correct')
    document.querySelector('.live-message').textContent = 'Oops! Let\'s Try Again 😗😉'
    errorSound.play()
  }

     currentIndex++
    }   
  

  
 //word completion check if
  if(currentIndex === Segments.length && currentIndex !=0){
    checkWordCompletion()
  }
}
//functionable backspace
  function handBackspace() {
    if(currentIndex>0){
      currentIndex--
      Segments[currentIndex].textContent = ''
      Segments[currentIndex].classList.remove('correct','wrong')
    }
  } 

//pc keyboard handling
document.addEventListener('keydown',(e)=>{
  const key = e.key

  if(key === 'Backspace'){
    handBackspace()
    return
  }

  if(/^[a-zA-Z]$/.test(key)){
    handLetter(key.toUpperCase())
  }
})

//mobile input handling
hiddenInput.addEventListener('input',(e)=>{

  if (e.inputType === 'deleteContentBackward') {
    handleBackspace()
    hiddenInput.value = ''
    return
  }

  const key = e.target.value.slice(-1)
  hiddenInput.value = ''

  if(/^[a-zA-z]$/.test(key)){
    handLetter(key.toUpperCase())
  }
})

// get user guess 
function getUserGuess(){
  let guess = ''
  Segments.forEach(element => {
    guess += element.textContent
  })
  return guess;
}

//number of segments 
function giveSegments(length) {
  wordGuessArea.innerHTML = ''
  currentIndex = 0

  for (let i = 0; i <length; i++) {
   const div = document.createElement('div')
   div.classList.add('letter-segment')
   
   div.addEventListener('click',()=>{
    hiddenInput.focus()
   })

  wordGuessArea.appendChild(div)
    
  }
}

function checkWordCompletion(){
  let guess = ''
  for(let box of Segments){
    guess += box.textContent
  }

  if(guess === puzzleWord){
    console.log('correct!');
    winnerSound.play()
    document.querySelector('.live-message').textContent = 'Correct! 🥳🍾'
  }else{
    console.log('Wrong!');
    errorSound.play()
    document.querySelector('.live-message').textContent = 'Wrong! Try Again! 🙁😕'
    
  }
}


mobileKB.addEventListener('click',()=>{
  hiddenInput.focus()
})
hiddenInput.addEventListener('input',)
