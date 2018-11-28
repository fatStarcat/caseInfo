var webApi = {
  Host: 'http://daniu.51vip.biz:10698/AJGK',
//授权控制器
  Auth : {
    Login: '/api/Auth/Login?unit={unit}&userName={userName}&password={password}', //登录; HttpMethod:GET; NeedToken:False
    GetCurrentUser: '/api/Auth/GetCurrentUser', //获取当前用户信息; HttpMethod:GET; NeedToken:True
    Logout: '/api/Auth/Logout', //登出; HttpMethod:GET; NeedToken:True
  },
}

window.webApi = webApi;
