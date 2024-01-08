var models = require('../db');

var express = require('express');

var router = express.Router();

var mysql = require('mysql');


// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
  var params = req.body;
  var sql = 'insert into user(Uname,Psw) values (?, ?)';
  console.log(params);
  conn.query(sql, [params.username,params.password], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/addManager', (req, res) => {
  var params = req.body;
  var sql = 'insert into SchoolManager(Mname,Mpassword,Sid) values (?,?, ?)';
  console.log(params);
  conn.query(sql, [params.Mname,params.Mpassword,params.Sid], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

router.post('/addNotice', (req, res) => {
  var params = req.body;
  var sql = 'insert into noti (Nheader,Ncontent,Sid) values (?,?, ?)';
  console.log(params);
  conn.query(sql, [params.Nheader,params.Ncontent,params.Sid], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 查询用户接口
// 登录判断
router.post('/queryUser', (req, res) => {
    var params = req.body;
    var sql = " select * from user where Uname = ? and Psw = ?";
    console.log(params);
    conn.query(sql, [params.username,params.password], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result.length);
        if(result.length === 0 ){
          console.log("不存在该用户");
          jsonWrite(res, result);
        }
        else {
          console.log("存在该用户");
          jsonWrite(res, result);
        }
      }
    })
  });
router.post('/queryManager', (req, res) => {
    var params = req.body;
    var sql = " select * from SchoolManager where Mname = ? and Mpassword = ? and Sid=?";
    console.log(params);
    conn.query(sql, [params.Mname,params.Mpassword,params.Sid], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result.length);
        if(result.length === 0 ){
          console.log("不存在该用户");
          jsonWrite(res, result);
        }
        else {
          console.log("存在该用户");
          jsonWrite(res, result);
        }
      }
    })
  });

// 删除通知
router.post('/deleteNotice', (req, res) => {
    var params = req.body;
    var sql = " delete from noti where Nid = ?";
    console.log(params);
    conn.query(sql, [params.Nid], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(res);
        jsonWrite(res, result);
      }
    })
  });

router.post('/searchSchool',(req,res)=>{
  var params=req.body;
  var name="%"+params.search+"%";
  var sql='select * from school where xxmc like ?';
  console.log(params);
  conn.query(sql,name,function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})
router.post('/searchSchool2',(req,res)=>{
  var params=req.body;
  var sql='select * from school where Sid = ?';
  console.log(params);
  conn.query(sql,params.Sid,function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})


router.post('/getComments',(req,res)=>{
  var params=req.body;
  var sql='select * from comment where Sid = ?';
  console.log(params);
  conn.query(sql,params.Sid,function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post('/addComment',(req,res)=>{
  var params=req.body;
  var sql = 'insert into comment(Sid,Uid,Uname,Ccontent,LikeCount) values (?, ?,?,?,?)';
  console.log(params);
  conn.query(sql,[params.Sid,params.Uid,params.Uname,params.Ccontent,params.LikeCount],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post('/filterSchool',(req,res)=>{
  var params=req.body;
  var Xxmc='';
  var Xxbsm='';
  var Zgbm='';
  var Szd='';
  var Bxcc='';
  var name1='\'\'';
  var name2='\'\'';
  var name3='\'\'';
  var name4='\'\'';
  var name5='\'\'';
  if(params.Xxmc!=""){
      Xxmc="%"+params.Xxmc+"%";
      name1='Xxmc';
  }
  if(params.Xxbsm!=""){
      Xxbsm="%"+params.Xxbsm+"%";
      name2='Xxbsm';
  }
  if(params.Zgbm!=""){
      Zgbm="%"+params.Zgbm+"%";
      name3='Zgbm';
  }
  if(params.Szd!=""){
      Szd="%"+params.Szd+"%";
      name4='Szd';
  }
  if(params.Bxcc!=""){
      Bxcc="%"+params.Bxcc+"%";
      name5='Bxcc';
  }

  var sql=
  'select * from school where '+name1+' like ? and '+name2+' like ? and '+name3+' like ? and '+name4+' like ? and '+name5+' like ?';
  console.log(params);
  conn.query(sql,[Xxmc,Xxbsm,Zgbm,Szd,Bxcc],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post('/getNotices',(req,res)=>{
  var params=req.body;
  var sql='select * from noti where Sid = ?';
  console.log(params);
  conn.query(sql,params.Sid,function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})
router.post('/getoneNotice',(req,res)=>{
  var params=req.body;
  var sql='select * from noti where Nid = ?';
  console.log(params);
  conn.query(sql,params.Nid,function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})


module.exports = router;

