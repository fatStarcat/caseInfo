var webApi = {
  Host: 'http://daniu.51vip.biz:10698/AJGK',
//授权控制器
  Auth : {
    Login: '/api/Auth/Login?unit={unit}&userName={userName}&password={password}', //登录; HttpMethod:GET; NeedToken:False
    GetCurrentUser: '/api/Auth/GetCurrentUser', //获取当前用户信息; HttpMethod:GET; NeedToken:True(承办人, 案管人员, 管理员)
    Logout: '/api/Auth/Logout', //登出; HttpMethod:GET; NeedToken:True(承办人, 案管人员, 管理员)
  },
//系统信息控制器
  SystemInfo : {
    GetUnits: '/api/SystemInfo/GetUnits', //获取所有单位; HttpMethod:GET; NeedToken:False
    GetAJLXs: '/api/SystemInfo/GetAJLXs', //获取所有案件类型列表; HttpMethod:GET; NeedToken:True(承办人, 案管人员, 管理员)
    GetSubUnits: '/api/SystemInfo/GetSubUnits', //获取下级单位列表; HttpMethod:GET; NeedToken:True(案管人员)
  },
//实时提醒
  SSTX : {
    AG_CountAJGKXX: '/api/SSTX/AG_CountAJGKXX?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&ajlx={ajlx}', //计算案件公开信息数量(案管人员); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_CountAJGKXX: '/api/SSTX/CBR_CountAJGKXX?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&ajlx={ajlx}', //计算案件公开信息数量(承办人); HttpMethod:GET; NeedToken:True(承办人)
    AG_GetAJGKXXs: '/api/SSTX/AG_GetAJGKXXs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&ajlx={ajlx}&pageNum={pageNum}&pageSize={pageSize}', //获取案件公开信息列表(案管人员); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_GetAJGKXXs: '/api/SSTX/CBR_GetAJGKXXs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&ajlx={ajlx}&pageNum={pageNum}&pageSize={pageSize}', //获取案件公开信息列表(承办人); HttpMethod:GET; NeedToken:True(承办人)
  },
}

window.webApi = webApi;
