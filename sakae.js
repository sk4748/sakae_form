function sendMailGoogleForm() {
 Logger.log('sendMailGoogleForm() debug start');

 //------------------------------------------------------------
 // 設定エリアここから
 //------------------------------------------------------------

 // 件名、本文、フッター
 var subject = "[さかえ幼稚園園見学について]";
 var body
 = "栄幼稚園園見学にご応募いただき、ありがとうございます。以下の情報で登録させていただきます。\n当日は人数分の上履きと靴袋をご持参いただくようお願いしております。\nまたキャンセルご希望の場合や詳しいお問い合わせなどはお手数ですが、００００００００までお電話いただくようにお願いいたします。\n"
 + "------------------------------------------------------------\n";
 var footer
 = "------------------------------------------------------------\n\n"
 + "当日お会いできるのを楽しみにしております。";

 // 入力カラム名の指定
 var NAME_COL_NAME = '保護者氏名（人数分）';
 var MAIL_COL_NAME = 'メールアドレス';


 // メール送信先
 var admin = "skdivas4748@gmail.com"; // 管理者（必須）
 var cc = ""; // Cc:
 var bcc = admin; // Bcc:
 var reply = admin; // Reply-To:
 var to = ""; // To: （入力者のアドレスが自動で入ります）


 //------------------------------------------------------------
 // 設定エリアここまで
 //------------------------------------------------------------

 try{
 // スプレッドシートの操作
 var sheet = SpreadsheetApp.getActiveSheet();
 var rows = sheet.getLastRow();
 var cols = sheet.getLastColumn();
 var rg = sheet.getDataRange();
 Logger.log("rows="+rows+" cols="+cols);

 // メール件名・本文作成と送信先メールアドレス取得
 for (var i = 1; i <= cols; i++ ) {
 var col_name = rg.getCell(1, i).getValue(); // カラム名
 var col_value = rg.getCell(rows, i).getValue(); // 入力値

 if (col_name === "タイムスタンプ"){
	continue;
}
 body += "【"+col_name+"】\n";
 body += col_value + "\n\n";
 if ( col_name === NAME_COL_NAME ) {
 body = col_value+" 様\n\n"+body;
 }
 if ( col_name === MAIL_COL_NAME ) {
 to = col_value;
 }
 }
 body += footer;

 // 送信先オプション
 var options = {};
 if ( cc ) options.cc = cc;
 if ( bcc ) options.bcc = bcc;
 if ( reply ) options.replyTo = reply;

 // メール送信
 if ( to ) {
 MailApp.sendEmail(to, subject, body, options);
 }else{
 MailApp.sendEmail(admin, "【失敗】Googleフォームにメールアドレスが指定されていません", body);
 }
 }catch(e){
 MailApp.sendEmail(admin, "【失敗】Googleフォームからメール送信中にエラーが発生", e.message);
 }
}
