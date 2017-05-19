var express = require('express');
var router = express.Router();
var walk = require('walk');

/* GET home page. */
router.get(['/','/index.html'], function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/landing.html',function(req, res, next) {
   res.render('landing', { title: 'Express' });
});
router.get('/elements.html', function(req, res, next) {
   res.render('elements', { title: 'Express', Subject: [
      {
         'id': 'html',
         'title': 'HTML+CSS',
         'text': 'Html是用來寫網頁的程式語言，使用廣泛，且簡單好懂，Css則是幫助你美化你的網頁頁面，使頁面更加人性化與美觀'
      },
      {
         'id': 'js',
         'title': 'Javascript',
         'text': 'JavaScript，一種高階程式語言，通過解釋執行，是一門動態型別，物件導向（基於原型）的直譯語言，隨著最新的HTML5和CSS3語言標準的推行它還可用於遊戲、桌面和行動應用程式的開發和在伺服器端網路環境執行'
      },
      {
         'id': 'ai',
         'title': '3D Logo',
         'text': 'Adobe illustrater，簡稱 AI，是一個能夠畫出許多圖的軟體，也是許多設計師愛用的軟體，我們將會介紹 AI 的許多功能以及工具的使用方法，只要有方法，技巧不好也能輕鬆畫出好插圖!'
      },
      {
         'id': 'sai',
         'title': 'SAI Sketchup',
         'text': 'Easy PaintTool SAI，簡稱 SAI，是一個已經轉型商業化的繪圖軟體，是由日本的 SYSTEAMAX 開發的。2008 年 02月 25 日，Easy PaintTool SAI Ver.1.0.0 正式版行。目前 SAI 還在持續更新，新版本仍在繼續開發調試中。在正式版發行之前， SAI 是作為自由軟體試用的形式對外發布的。'
      },
      {
         'id': 'BBS',
         'title': 'BBS',
         'text': 'BBS是一種網站系統，是目前流行網路論壇的前身，它允許使用者使用終端程式通過數據機撥接或者網際網路來進行連線，BBS站台提供布告欄、分類討論區、新聞閱讀、軟體下載與上傳、遊戲、與其它使用者線上對話等功能'
      },
      {
         'id': 'cpp',
         'title': 'C/C++',
         'text': 'C++是一門是接觸資訊產業的人必學的基礎程式語言，希望藉由C++基礎的教學，激發國中生對於程式的興趣及熱忱，我們將介紹運算子、變數等基礎功能。'
      },
      {
         'id': 'rpg',
         'title': 'RPG Maker',
         'text': 'RPG Maker是由日本的Enterbrain公司開發的角色扮演遊戲製作軟體，用它的人不用學習任何程式語言，只要在相對的位置輸入文字或設定數值，加上工具中提供了圖片、聲音等等素材檔案，即使不懂繪畫的人，也可以輕易製作出完美的遊戲作品，並且透過網路發表作品！'
      }
   ]});
});
router.get('/generic.html', function(req, res, next) {
   var files = [];
   var walker = walk.walk('assets/images/2015', {followLinks: false});
   walker.on('file', function(root, start, next){
      files.push(root + '/' + start.name);
      next();
   });
   walker = walk.walk('assets/images/2016', {followLinks: false});
   walker.on('file', function(root, start, next){
      files.push(root + '/' + start.name);
      next();
   });
   walker.on('end', function(){
      files.sort();
      res.render('generic', { title: 'Express', ImageFiles: files });
   });
});

module.exports = router;
