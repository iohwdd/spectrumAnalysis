import request from '@/utils/request'
//get
export function autoLogin(code) {
  return request({
    url: `/login?code=${code}`,
    //url: `/api-usersystem/login/autoLogin?code=${code}`,
    method: 'get'
  })
}
//post
export function taskInsert(params) {
  return request({
    url: `/user/insert`,
    method: 'post',
    data: params
  })
}

export function test(params) {
  request({
    url: `/test`,
    method: 'post',
    data: params
  })
}
