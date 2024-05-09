import request from "../utils/request"
// 登录
export const postLogin =(data)=>{
  return request.post('/login',data)
}
// 首页
export const getHome = (params) =>{
  return request.get('/home',params)
}
export const postHome =(data)=>{
  return request.post('/home',data)
}
export const getNet = (params) =>{
  return request.get('/net',params)
}
export const postNet =(data)=>{
  return request.post('/net',data)
}
// 用户
export const getUser = (params) =>{
  return request.get('/user',params)
}
export const postUser =(data)=>{
  return request.post('/user',data)
}
export const putUser =(data)=>{
  return request.put('/user',data)
}
export const deleteUser = (data) => {
  return request.delete('/user', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: data 
  });
};

// 统计
export const getStatistics = (params) =>{
  return request.get('/statistics',params)
}
// 预测
export const postPredict1 =(data)=>{
  return request.post('/forecast/1',data)
}
export const postPredict2 =(data)=>{
  return request.post('/forecast/2',data)
}
// 查询
export const getOrderQuery =(params)=>{
  return request.get('/order/query',params)
}
export const getWeatherQuery =(params)=>{
  return request.get('/weather/query',params)
}
export const getLinkQuery =(params)=>{
  return request.get('/link/query',params)
}
export const getCrossQuery =(params)=>{
  return request.get('/cross/query',params)
}
export const postOrderQuery =(data)=>{
  return request.post('/order/query',data)
}
export const postWeatherQuery =(data)=>{
  return request.post('/weather/query',data)
}
export const postLinkQuery =(data)=>{
  return request.post('/link/query',data)
}
export const postCrossQuery =(data)=>{
  return request.post('/cross/query',data)
}
// 导入

//异常数据处理
export const getCrossAbnormal =(params)=>{
  return request.get('/abnormal/cross',params)
}
export const getLinkAbnormal =(params)=>{
  return request.get('/abnormal/link',params)
}
export const getOrderAbnormal =(params)=>{
  return request.get('/abnormal/order',params)
}
// 合并
export const getMerge =(params)=>{
  return request.get('/merge',params)
}
export const postMerge =(data)=>{
  return request.post('/merge',data)
}
export const postMergeQuery =(data)=>{
  return request.post('/merge2',data)
}