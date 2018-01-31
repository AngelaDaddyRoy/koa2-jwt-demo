/*
 * @Author: monodev 
 * @Date: 2018-01-30 16:20:54 
 * @Last Modified by: monodev
 * @Last Modified time: 2018-01-30 16:45:10
 * @Description: 总路由
  */
const router = require('koa-router')()
const authRouter = require('./subRoutes/authRouter')
const userRouter = require('./subRoutes/userRouter')
router.prefix('/api')

router.use('/auth',authRouter.routes(),authRouter.allowedMethods)
router.use('/users',userRouter.routes(),userRouter.allowedMethods)



module.exports = router