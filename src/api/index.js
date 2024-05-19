import request from "../utils/request"
// 登录
export const postLogin =(data)=>{
  return request.post('/login',data)
}
// 首页
export const getHome = (params) =>{
  return request.get('/home', { params: params })
}
export const postHome =(data)=>{
  return request.post('/home',data)
}
export const getNet = (params) =>{
  return request.get('/net', { params: params })
}
export const postNet =(data)=>{
  return request.post('/net',data)
}
// 用户
export const getUser = (params) =>{
  return request.get('/user', { params: params })
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
  return request.get('/statistics', { params: params })
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
  return request.get('/order/query', { params: params })
}
export const getWeatherQuery =(params)=>{
  return request.get('/weather/query', { params: params })
}
export const getLinkQuery =(params)=>{
  return request.get('/link/query', { params: params })
}
export const getCrossQuery =(params)=>{
  return request.get('/cross/query', { params: params })
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
export const postOrderImport = (data) => {
  return request.post('/import/order', data, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};
export const postLinkImport =(data)=>{
  return request.post('/import/link',data,{
  headers: {
      'Content-Type': 'multipart/form-data',
  },
})
}
export const postCrossImport =(data)=>{
  return request.post('/import/cross',data,{
    headers: {
    'Content-Type': 'multipart/form-data',
},
})
}
export const postWeatherImport =(data)=>{
  return request.post('/import/weather',data,{
    headers: {
      'Content-Type': 'multipart/form-data',
  },
  })
}

//异常数据处理
export const getCrossAbnormal =(params)=>{
  return request.get('/abnormal/cross', { params: params })
}
export const getLinkAbnormal =(params)=>{
  return request.get('/abnormal/link', { params: params })
}
export const getOrderAbnormal =(params)=>{
  return request.get('/abnormal/order', { params: params })
}
export const putOrder =(data)=>{
  return request.put('/abnormal/order',data)
}
export const deleteOrder = (data) => {
  return request.delete('/abnormal/order', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: data 
  });
};
export const putLink =(data)=>{
  return request.put('/abnormal/link',data)
}
export const deleteLink = (data) => {
  return request.delete('/abnormal/link', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: data 
  });
};
export const putCross =(data)=>{
  return request.put('/abnormal/cross',data)
}
export const deleteCross = (data) => {
  return request.delete('/abnormal/cross', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: data 
  });
};

// 合并
export const getMerge =(params)=>{
  return request.get('/merge', { params: params })
}
export const postMerge =(data)=>{
  return request.post('/merge',data)
}
export const postMergeQuery =(data)=>{
  return request.post('/merge2',data)
}
// 历史记录
export const getRecord = (params) => {
  return request.get('/record', { params: params });
};
export const postRecord =(data)=>{
  return request.post('/record',data)
}