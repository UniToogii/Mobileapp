"use strict" ;

// ページ本体が読み込まれたダイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function () {

    // 1.localStorageが使えるか確認
    if (typeof localStorage === "undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
      } else {
      viewStorage();     //localStorageからのデータ取得とテーブル表示
      saveLocalStorage(); //2.LocalStorageへの保存
      delLocalStorage(); //3.LocalStorageから1件削除
      allClearStorage(); // 4.LocalStorageから全て削除
      selectTable();      //5.データ選択
    }
   }
);

//2.localStorageへの保存
function saveLocalStorage() {
   const save = document.getElementById("save");
   save.addEventListener ("click",

     function(e) {
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value; 

        //値の入力チェック
        if (key=="" || value== "") {
            window.alert("Key,Memoはいずれも必須です。");
            return;
        }else{
          let w_confirm = confirm("LocalStorageに\n" + key +  " " + value + "\nを保存します。\nよろしですか?");
      if(w_confirm=== true){
        localStorage.setItem(key,value);
        viewStorage() ;     //localStorageからのデータ取得とテーブル表示
        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }  
        }
     },false
   );
}

//3.LocalStorageから1件削除
function  delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener ("click",

  function(e) {
     e.preventDefault();
     let w_sel = "0"; //選択されていれば"1"件が返却される
     w_sel = selectCheckBox();

     if(w_sel === "1"){
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value; 
      let w_confirm = confirm("LocalStorageから\n" + key +  " " + value + "\nを削除します。\nよろしですか?");
      if(w_confirm=== true){
        localStorage.removeItem(key);
        viewStorage(); //LocalStorageからのデータのしゅとくとテーブルへ表示
        let w_msg = "LocalStorageから" + key + " " + value + "を削除しました。";
        window.alert(w_msg);
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      };

      }
    },false
   );
};
// 4.LocalStorageから全て削除
  function  allClearStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener ("click",

    function(e) {
    e.preventDefault();
    let w_confirm = confirm("LocalStorageから全て削除します.\nよろしですか?")
//確認ダイアログ 「OK』押されたとき、全て削除する
    if(w_confirm === true ) { 
    localStorage.clear();
    viewStorage(); //LocalStorageからのデータの取得とテーブルへ表示
    let w_msg = "LocalStorageのデータを全て削除しました";
    window.alert(w_msg);
    document.getElementById("textKey").value = "";
    document.getElementById("textMemo").value = "";
      }
    },false
   );
};

  //5.データ選択
function selectTable () {
  const select= document.getElementById("select");
  select.addEventListener("click",
     function(e) {
        e.preventDefault();
        selectCheckBox(); //テーブルからデータ選択
    },false
  )
};

//テーブルからデータ選択
function selectCheckBox() {
   let w_sel ="0"; //選択されていれば "1"にする
   let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");     
    let w_textKey = "";
    let w_textMemo = "";

  for(let i=0; i<chkbox1.length; i++){
    if (chkbox1[i].checked){
      if(w_cnt===0){
        w_textKey = table1.rows[i+1].cells[1].firstChild.data;
        w_textMemo= table1.rows[i+1].cells[2].firstChild.data;
        // return w_sel = "1";

      }
      w_cnt++;
    }
  }
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;
   if (w_cnt===1) {
    return w_sel = "1"; 
   } else {
    window.alert("1つ選択してください")
   }
};
  //localStorageからのデータ取得とテーブル表示
  function viewStorage(){
    const list = document.getElementById("list");
    // htmlのテーブル初期化
    while(list.rows[0] ) list.deleteRow(0);
    //viewStorage すべての情報の取得
    for (let i=0; i<localStorage.length; i++){
    let w_key =localStorage.key(i)

    //localStorageのキーと値を表示
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild (tr);
    tr.appendChild (td1);
    tr.appendChild (td2);
    tr.appendChild (td3);

    td1.innerHTML = "<input name='chkbox1' type= 'checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }
  //jQueryのplugin tablesorterを使ってテーブルのソート -->
  // sortList: 引数1...最初ソートしておく列を指定、引数2...0...昇順,..降順
  $("#table1").tablesorter({      //tablesorter add
     sortList: [[1, 0]]           //tablesorter add
  });
  $("#table1").trigger("update"); //tablesorter add
};