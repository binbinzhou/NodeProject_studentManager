var express = require('express');
var router = express.Router();
var dbUtil = require('dbUtil');

router.use('/',function (req,res,next) {
    console.log('中间件');
    next();
});

/* GET home page.
点击logo或者主页跳转到首页
维护一个变量currentPage,在jade中判断currentPage是什么值，然后给哪个li添加active,使li激活状态
*/
router.get('/toIndex', function(req, res, next) {
    //res.local可以存放变量，并且可以在jade中直接访问res.locals中的变量
    res.locals.currentPage = 'index';
    //渲染index.jade文件,这里也可以将后缀省略，并且将渲染好的index.html发送到浏览器
    res.render('index.jade');
});

/* GET login page. 跳转到登录界面*/
router.get('/toLogin', function(req, res, next) {
    res.locals.currentPage = 'login';
    res.render('login');
});

/* GET register page. 跳转到注册界面*/
router.get('/toRegister', function(req, res, next) {
    res.locals.currentPage = 'register';
    res.locals.msg = req.query.msg;
    res.render('register');
});

/* 注册表单功能*/
router.post('/register', function(req, res, next) {
    //1.接收到用户提交的参数
    var student = req.body;
    console.log(student);
    if(student.password === student.repassword){
        //2.如果参数无误，将数据存储到数据库中
        delete student.repassword;
        var sql = 'insert into tbl_student set ?';
        dbUtil.execute(sql,student,function(){
            //插入成功，跳转到登录页面 /toLogin
            res.redirect('/toLogin');
        });
    } else{
       //跳转到注册页面，继续注册，将错误信息提示
        res.redirect('/toRegister?msg="您两次输入的密码不一致"');
    }
});

module.exports = router;
