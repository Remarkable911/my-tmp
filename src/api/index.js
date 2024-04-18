import request from "../utils/request"
// 登录
export const postLogin =(data)=>{
  return request.post('/login',data)
}
// 首页
export const getHome = (params) =>{
  return request.get('/home',params)
}
// 用户
export const getUser = (params) =>{
  return request.get('/user',params)
}
export const postUser =(data)=>{
  return request.post('/user',data)
}
// 统计
export const getStatistics = (params) =>{
  return request.get('/statistics',params)
}
// 预测
export const postPredict1 =(data)=>{
  return request.post('/predict/1',data)
}
export const postPredict2 =(data)=>{
  return request.post('/predict/2',data)
}
// 导入 需要文件提交
