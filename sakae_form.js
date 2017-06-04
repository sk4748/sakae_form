function endFormCheck() {
  var LIMIT_COUNT = 3; //ここで席数上限を設定
  var ANSWER_LENGTH = 5; //時間帯の数
  var answerCount = [0,0,0];//カウント用：時間帯の数分配列を準備します
  var itemID = 0;

  var form = FormApp.getActiveForm(); //アクティブフォームを取得

  var formResponses = form.getResponses(); // 全回答内容を取得

  for (var i = 0; i < formResponses.length; i++) {
   var formResponse = formResponses[i]; // 回答ひとつ分を取得
   var itemResponses = formResponse.getItemResponses(); // 質問項目を取得

   for (var j = 0; j < itemResponses.length; j++) {　// 回答内容をひとつずつチェック
     var itemResponse = itemResponses[j];
     var question = itemResponse.getItem().getTitle();
     var answer = itemResponse.getResponse();
     if(question == '希望日時'){ // 申込み数カウント
       if(answer == '8/21'){ answerCount[0]++; }
       else if( answer == '8/22'){ answerCount[1]++; }
       else if( answer == '8/23'){ answerCount[2]++; }
       else if( answer == '8/24'){ answerCount[3]++; }
       else if( answer == '8/25'){ answerCount[4]++; }
     }
    }
  }

  // LIMIT_COUNTになっている選択肢があるかチェック
  var answerCheck = 0;
  var choiceArray = [];
  var arrayCount = 0;
  for(var i = 0; i < ANSWER_LENGTH; i++){
        if(answerCount[i] == LIMIT_COUNT){
          answerCheck++;
       }
       else{ // LIMIT_COUNTになっていない選択肢は残す
         if ( i == 0 ){ choiceArray[arrayCount] = '8/21'; arrayCount++; }
         else if( i== 1 ){choiceArray[arrayCount] = '8/22'; arrayCount++;}
         else if( i== 2 ){choiceArray[arrayCount] = '8/23'; arrayCount++;}
         else if( i== 3 ){choiceArray[arrayCount] = '8/24'; arrayCount++;}
         else if( i== 4 ){choiceArray[arrayCount] = '8/25'; arrayCount++;}
       }
    }

    // 全てLIMIT_COUNTなら申込みフォームを受付終了
    if(answerCheck == ANSWER_LENGTH){
        form.setAcceptingResponses(false);
    }

    // LIMIT_COUNTになっていない選択肢を「参加する時間」の選択肢に設定する
    if( (answerCheck != ANSWER_LENGTH) && (answerCheck >= 1)){
    var items = form.getItems();
    for (var i= 0; i< items.length; i++ ){
      var item = items[i];
      if( item.getTitle() == '希望日時' ){
        var choice = item.asMultipleChoiceItem().getChoices();
        item.asMultipleChoiceItem().setChoiceValues(choiceArray);
      }
    }
  }
}
