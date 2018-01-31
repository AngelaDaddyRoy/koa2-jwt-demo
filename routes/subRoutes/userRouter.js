const router = require('koa-router')()
const User = require('../../models/user')
const tokenService = require('../../services/tokenService')

//获取用户信息
router.get('/:id', async ctx => { 
    const user = await tokenService.checkToken(ctx, User, true)
    ctx.body = {
      code: 200,
      message: '获取用户信息成功！',
      userName: user.user_name,
      token: base.signToke(user)
    }
  })

module.exports = router