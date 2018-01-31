/*
 * @Author: monodev 
 * @Date: 2018-01-30 16:20:44 
 * @Last Modified by: monodev
 * @Last Modified time: 2018-01-30 16:41:45
 * @Description: auth 路由
  */
const router = require('koa-router')()
const User = require('../../models/user')
const tokenService = require('../../services/tokenService')


//登录
router.post('/login', async ctx => {
    const {userName, passwd} = ctx.request.body
    try{
      const user = await User.findByName(userName)
      if(user){
        const isMatch = await user.comparePassword(passwd);
        if(!isMatch){
          ctx.throw(423, '用户名或密码错误！')
        }
        const token = tokenService.signToke(user)
        
        ctx.body = { 
          code: 200, 
          message: '登录成功!', 
          token: token
        }
      }
      else{
        ctx.throw(423, 'not found')
      }
     
    }catch(e){
      ctx.throw(e)
    }
  })
  
  //注册
  router.post('/register', async ctx => {
    const {userName, passwd} = ctx.request.body
  
    let user = new User({
      user_name: userName,
      password: passwd
    })
    let result = await user.save();
    console.log('result: ', result)
  
    ctx.body = {
      code: 200,
      message: '注册成功！'
    }
  })

  module.exports = router