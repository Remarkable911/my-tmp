import Mock from 'mockjs'
export default{
    postLogin:config=>{
      const { username,password } =JSON.parse(config.body)
      console.log("Mock:",username,password)
      if (username==='admin'&& password === 'admin'){
        return {
          code:200,
          data:{
            token:Mock.Random.guid(),
            message:'获取成功'
          }
        }
      }
    }
  }
