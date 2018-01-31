/*
 * @Author: monodev 
 * @Date: 2018-01-30 16:22:08 
 * @Last Modified by: monodev
 * @Last Modified time: 2018-01-30 16:36:56
 * @Description: jwt service 
  */
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')
//生成token
function signToke(user){
    const token = jwt.sign({
        id: user._id,
        secret: user.app_secret
    }, config.jwt_secret, {expiresIn: 3600})
    return token
}

//检查并更新token
async function checkToken(ctx, User, getUser){
    const token = ctx.state.user // 获取jwt 
    if(token) {
      const user = await User.checkToken(token)
      if(user){
          if(getUser){
              return user
          }else{
            return this.signToke(user)
          }
      }else{
        ctx.throw(501, 'token信息异常')
      }
    } else {
      ctx.throw(404, 'token丢失')
    }
}

module.exports = {
    signToke : signToke,
    checkToken: checkToken
}