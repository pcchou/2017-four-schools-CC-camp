var express = require('express');
var router = express.Router();
var walk = require('walk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/guide',function(req, res, next) {
   res.render('guide', { title: 'Express' });
});
router.get('/schedule', function(req, res, next) {
   res.render('schedule', { title: 'Express', Subject: [
      {
         'id': 'html',
         'title': '網頁前端設計',
         'text': 'HTML是用來寫網頁的程式語言，使用廣泛，且簡單好懂，CSS則是幫助你美化你的網頁頁面，使網頁界面更加人性化與美觀，而JS更可以幫助你的網頁增加更多變化',
         'img': 'html.jpg'
      },
      {
         'id': 'processing',
         'title': 'Processing',
         'text': '使用 Processing 寫程式就是比其他語言更有趣，因為它著重在「繪圖」，讓你天馬行空的創意能夠藉由撰寫程式發揮出來，讓每個人都能發揮與生俱來的創造藝術能力。',
         'img': 'processing.png'
      },
      {
         'id': 'python',
         'title': 'Python 圖像處裡',
         'text': 'Python 是一種相當容易入門的程式語言，屬於直譯式，不同於如C++等編譯式語言，不需事先進行編譯，執行起來較有彈性，又因 Python 有統一的撰寫格式，可讀性高，語法簡單，且有大量功能及函式庫可供使用，因此成為許多企業及研究人員進行專案開發、網頁、乃至於科學研究、資料分析、數學模型等都會善用的熱門語言。',
         'img': 'python.jpg'
      },
      {
         'id':'aviutl',
         'title': 'AviUtl',
         'text': 'AviUtl是由KENくん（匿名的程式開發者）個人開發的免費動畫編輯軟體，AviUtl本身所占硬碟空間並不大、起動時對電腦負荷很小，同時卻擁有著許多完善的功能，除了影片可以隨使用者選擇輕易轉檔成方便上傳至niconico或youtube上所需要的格式外，各種能簡單使用的特效功能使影片成品並不輸給市售的影片剪輯軟體，且網路上有許多AviUtl的使用者願意將自己研究出來的特效的專案檔分享配布出來，供其他使用者使用，也使得AviUtl能做到的事情更加全面化。',
         'img': 'aviutl.gif'
      },
      {
         'id': 'BBS',
         'title': 'BBS',
         'text': 'BBS是一種網站系統，是目前流行網路論壇的前身，它允許使用者使用終端程式通過數據機撥接或者網際網路來進行連線，BBS站台提供布告欄、分類討論區、新聞閱讀、軟體下載與上傳、遊戲、與其它使用者線上對話等功能。',
         'img': 'BBS.jpg'
      },
      {
         'id': 'cpp',
         'title': 'C/C++',
         'text': 'C++是一門號稱接觸資訊領域的人必學的基礎程式語言，希望藉由C++基礎的教學，激發國中生對於程式的興趣及熱忱，我們將介紹運算子、變數等基礎功能。',
         'img': 'cpp.jpg'
      },
      {
         'id': 'rpg',
         'title': 'RPG Maker',
         'text': 'RPG Maker是由日本的Enterbrain公司開發的角色扮演遊戲製作軟體，用它的人不用學習任何程式語言，只要在相對的位置輸入文字或設定數值，加上工具中提供了圖片、聲音等等素材檔案，即使不懂繪畫的人，也可以輕易製作出完美的遊戲作品，並且透過網路發表作品！',
         'img': 'rpg.jpg'
      },
      {
         'id': 'ps',
         'title': 'Adobe Photoshop',
         'text': 'Photoshop是Adobe System開發的強大軟體,主要功能是修圖,也可以用來電繪,有些版本甚至還能用來製作動畫。有多種圖層疊加效果,可以簡單地做出特效。',
         'img': 'ps.jpg'
      }
   ]});
});
router.get('/gallery', function(req, res, next) {
   var files = [];
   var walker = walk.walk('assets/images/2015', {followLinks: false});
   walker.on('file', function(root, start, next) {
      files.push(root + '/' + start.name);
      next();
   });
   walker = walk.walk('assets/images/2016', {followLinks: false});
   walker.on('file', function(root, start, next) {
      files.push(root + '/' + start.name);
      next();
   });
   walker.on('end', function() {
      files.sort();
      res.render('gallery', { title: 'Express', ImageFiles: files });
   });
});

module.exports = router;
