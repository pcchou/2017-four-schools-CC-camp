var express = require('express');
var router = express.Router();
var multer  = require('multer');
var { ObjectID } = require('mongodb'); // MongoDB _id
var walk = require('walk');
var path = require('path');
var basicAuth = require('basic-auth');
var sha256 = require('sha256');

var storage = multer.diskStorage({
   destination: function(req, file, callback) {
      callback(null, './uploads');
   },
   filename: function(req, file, callback) {
      console.log(file);
      var name=req.body.full_name+'_'+Date.now()+path.extname(file.originalname);
      req.body.parental_consent = name;
      callback(null, name);
   }
})

var upload = multer({ storage: storage });
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
         'text': 'AviUtl是由KENくん（匿名的程式開發者）個人開發的免費動畫編輯軟體，AviUtl本身所占硬碟空間並不大、啟動時對電腦負荷很小，同時卻擁有著許多完善的功能，除了影片可以隨使用者選擇輕易轉檔成方便上傳至niconico或youtube上所需要的格式外，各種能簡單使用的特效功能使影片成品並不輸給市售的影片剪輯軟體，且網路上有許多AviUtl的使用者願意將自己研究出來的特效的專案檔分享配布出來，供其他使用者使用，也使得AviUtl能做到的事情更加全面化。',
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
router.post('/register', upload.single('parental_consent'), function(req, res, next) {
   console.log(req.body);
   var MongoClient = require('mongodb').MongoClient,
      assert = require('assert');
   var url = "mongodb://localhost:27017/2017-fscc";
   var param1 = req.body;
   if(!param1.full_name         ||
      !param1.gender            ||
      !param1.clothe_size       ||
      !param1.parent_name       ||
      !param1.phone_number      ||
      !param1.email             ||
      !param1.id_number         ||
      !param1.birthday          ||
      !param1.transport         ||
      !param1.emergency_contact ||
      !param1.parental_consent  ){
      console.log(param1);
      res.status(400).send('Error');
   }else{
      MongoClient.connect(url, function(err, db) {
         db.collection('register').insert(param1, function(err, doc) {
            if (err)
               res.status(500).send('Error');
            else
               res.send('Success');
         });
      });
   }
});
var authorize = function(req, res, next){
   function unauth(res){
      res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
      return res.status('401').send("Authorization Required");
   }
   var user = basicAuth(req);
   if(!user || !user.name || !user.pass){
      return unauth(res);
   }
   if(sha256(sha256(user.name)) === '6c2fa041b7fdff1adafc7d0c7ad4d6ce5643418a545d683bb317f43207e0dd8a' && sha256(sha256(user.pass)) === 'a67f9a9f77fbbd5d273a8a4b22a21302e01f94914a89b3fdb72aad3d532e6cd1'){
      return next();
   }else{
      return unauth(res);
   }
};
router.get('/adminView', authorize , function(req, res, next){
   var MongoClient = require('mongodb').MongoClient;
   var mongoLink = "mongodb://localhost:27017/2017-fscc";
   MongoClient.connect(mongoLink, function(err, db) {
      db.collection('register').find().toArray(function(err , results){
         if(err){
            throw err;
         }else{
            res.render("panel", {title: "Express", Data: results});
            db.close();
         }
      });
   });
});
module.exports = router;
