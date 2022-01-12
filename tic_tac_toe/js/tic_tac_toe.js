"use strict";

// flagが pen-flagのときpenguinsのターン、bearflagのときbearのターン
let flag = "pen-flag";

//ターン数カウンター
let counter = 9;

//class="squares" を取得
const squares = document.getElementsByClassName("square");

// Array に変換
// htts://developer.mozella.org/ja/docs/Web/JavaScript/Reference/Global_Object/Array/from
const squaresArray = Array.from(squares);


// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGameボタン取得
const newgamebtn_dsiplay = document.getElementById("newgame-btn");
const newgamebtn  = document.getElementById("btn90");
//Win or Lose Judgement Line
const line1 =Judgline(squaresArray, ["a_1","a_2","a_3"]);
const line2 =Judgline(squaresArray, ["b_1","b_2","b_3"]);
const line3 =Judgline(squaresArray, ["c_1","c_2","c_3"]);
const line4 =Judgline(squaresArray, ["a_1","b_1","c_1"]);
const line5 =Judgline(squaresArray, ["a_2","b_2","c_2"]);
const line6 =Judgline(squaresArray, ["a_3","b_3","c_3"]);
const line7 =Judgline(squaresArray, ["a_1","b_2","c_3"]);
const line8 =Judgline(squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;
//メッセージ
const msgtxt1 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text">Whitebear Attack!</p>';
const msgtxt3 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px></p><p class="text animate__bounceIn">Draw!!</p>';

//Sound
let gameSound =["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

//*****************************************
//ページ本体が読み込まれたタイミングで実行するコード
//*****************************************
window.addEventListener("DOMContentLoaded",
   function(){
       //メッセージ（最初はpenguinsのダーンから）
       setMessage("pen-turn");
   },false
);

//*************************************
// Win or Lose Judgement Lineを配列化
//*************************************
//
function Judgline(targetArray, idArray) {
  return targetArray.filter(function(e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);

  });
}

//*************************************
//squareをクリックしたときにイベント発火
//*************************************
//クリックしたsquareに、penguinsかbearを表示。画像を表示したsquareはクリックできないようにする、　win or lose Judgementの呼び出し
a_1.addEventListener("click",
  function(){
  isSelect(a_1);
  }, false
);
a_2.addEventListener("click",
  function(){
  isSelect(a_2);
  },false
);
a_3.addEventListener("click",
  function(){
  isSelect(a_3);
  },false
);
b_1.addEventListener("click",
  function(){
  isSelect(b_1);
  },false
);
b_2.addEventListener("click",
  function(){
  isSelect(b_2);
  },false );
b_3.addEventListener("click",
  function(){
  isSelect(b_3);
  },false );
c_1.addEventListener("click",
  function(){
  isSelect(c_1);
  },false );
c_2.addEventListener("click",
  function(){
  isSelect(c_2);
  },false );
c_3.addEventListener("click",
  function(){
  isSelect(c_3);
  },false );
//****************************************
//クリックしたsquareにはpenguinsかbearを表示。
//・表示したどころはクリックできないようにする。
//・Win or lose 判定に呼び出し。
//****************************************
function isSelect(selectSquare) {

    if (flag === "pen-flag"){
      // Click sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); 
        selectSquare.classList.add("js-pen-checked"); //squareにはpenguinsを表示
        selectSquare.classList.add("js-unclickable"); //squareをクリックできないようにする
      
        //penguins win 
        if (isWinner ("penguins")) {
          setMessage("pen-win"); // display win message
          gameOver ("penguins");
          return;
        }
        setMessage("bear-turn");
        flag = "bear-flag";

      } else{ 
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play(); 
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");

        // white bear win 
        if (isWinner ("bear")) {
        setMessage("bear-win"); 
        gameOver ("bear");
        return;
        }
        setMessage("pen-turn");
        flag = "pen-flag";
      }

    //ターン数カウンターを−1する
    counter --;

    // ターン数＝0になったら DRAW
    if (counter=== 0){
        setMessage("draw");
        gameOver ("draw");
    }

  }
//*****************************************
//勝敗判定
//****************************************
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
function isWinner(symbol) {
  //some: 1つでも条件を満たしていればtrueを返す
  const result = lineArray.some(function (line) {
    //every: 全て件を満たしていればtrueを返す
    const subResult = line.every(function (square) {
      if (symbol === "penguins") {
        return square.classList.contains("js-pen-checked");
      }
      if (symbol === "bear") {
        return square.classList.contains("js-bear-checked");
      }
    });
    // true を返したlineをwinningLineに代入
    if (subResult) { winningLine = line }

    return subResult;
  });
  return result;
}
//*****************************************
//メッセージ切り替え関数
//****************************************

function setMessage(id){
  switch (id){
    case "pen-turn":
      document.getElementById("msgtext").innerHTML=msgtxt1;
      break;
    case "bear-turn":
      document.getElementById("msgtext").innerHTML=msgtxt2;
      break;
    case "pen-win":
      document.getElementById("msgtext").innerHTML=msgtxt3;
      break;
    case "bear-win":
      document.getElementById("msgtext").innerHTML=msgtxt4;
      break;
        case "draw":
      document.getElementById("msgtext").innerHTML=msgtxt5;
      break;
    default:
      document.getElementById("msgtext").innerHTML=msgtxt1;
     }
   } 

//*****************************************
//ゲームendの処理
//****************************************

function gameOver (status) {
  let w_sound // wk サウンド種類
  switch (status) {
    case "penguins":
      w_sound = gameSound[2];
      break;
    case "bear":
      w_sound = gameSound[3];
      break;
    case "draw":
      w_sound = gameSound[4];
      break;
  }

  let music = new Audio(w_sound);
  music.currentTime = 0;
  music.play();
  // all square unclickable
  squaresArray.forEach(function (square) {
    square.classList.add("js-unclickable");
  });

  // display New Game button : display
  newgamebtn_dsiplay.classList.remove("js-hidden");

// winEffect 
if (status==="penguins"){
  // winner-line penguins high-light
  if (winningLine) {
    winningLine.forEach (function (square) {
    square.classList.add("js-pen_highLight");
    });
  }
// penguins win!! ==>snow color is pink
$(document).snowfall({
  flakeColor : "rgb(255,240,245)", //雪の色
  maxSpeed : 3,
  minSpeed : 1,
  maxSize : 20,
  minSize : 10,
  round : true, //雪の形を丸にする  
});


} else if(status==="bear") {
  //winner-line bear high-light
  if (winningLine) {
    winningLine.forEach (function (square) {
      square.classList.add("js-bear_highLight");
    });
  }
  // penguins win!! ==>snow color is pink
$(document).snowfall({
  flakeColor : "rgb(175,238,238)", //雪の色
  maxSpeed : 3,
  minSpeed : 1,
  maxSize : 20,
  minSize : 10,
  round : true, //雪の形を丸にする  
    });
  }
}
//*****************************************
//NewGameボタン クリック時、ゲーム初期化
//*****************************************
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5

   newgamebtn.addEventListener("click", ()=>{
    flag = "pen-flag";
    counter = 9; 
    winningLine = null; 

  squaresArray.forEach(function(square){
    square.classList.remove("js-pen-checked"); //squareにはpenguinsを表示
    square.classList.remove("js-bear-checked");
    square.classList.remove("js-unclickable"); //squareをクリックできないようにする
    square.classList.remove("js-pen_highLight");
    square.classList.remove("js-bear_highLight");

    //NewGameのbuttonエリアを非表示にする。
    setMessage("pen-turn");
    newgamebtn_dsiplay.classList.add("js-hidden");

    // snowfall stop
    $(document).snowfall("clear");
  })
  });

  
