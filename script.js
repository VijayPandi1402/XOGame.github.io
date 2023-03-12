const boxs=document.querySelectorAll('.box');
const statusTXT=document.querySelector('.status');
const btnRestart=document.querySelector('#restart');
let X="<img src='Image/IX.png'>";
let O="<img src='Image/IO.png'>";

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

let options=["","","","","","","","",""];
let currentPlayer=X;
let player="X";
let running=false;
strt();

function strt(){
    boxs.forEach(box=>box.addEventListener('click',boxClick));
    btnRestart.addEventListener('click',restartGame);
    statusTXT.textContent=`${player} Your Turn`;
    running=true;
}
function boxClick(){
    const index=this.dataset.index;
    if(options[index]!="" || !running){
        return;
    }
    updateBox(this,index);
    checkWinner();
}
function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentPlayer;

}
function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        if(box1==box2 && box2==box3){
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }
    if(isWon){
        statusTXT.textContent=`${player} Won`;
        running=false;
    }else if(!options.includes("")){
        statusTXT.textContent=`GameDraw`;
        running=false;
    }else{
        playerChange();
    }
}
function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=X;
    player="X";
    running=true;
    statusTXT.textContent=`${player} Your Turn`;
    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    })
}
function playerChange(){
    player=(player=='X') ? "O" : "X";
    currentPlayer=(currentPlayer==X) ? O : X;
    statusTXT.textContent=`${player} Your Turn`;
}
