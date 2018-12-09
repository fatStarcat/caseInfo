var webApi = {
  Host: '',
//文书屏蔽控制器
  WSPB : {
    AG_GetWSSLs: '/api/WSPB/AG_GetWSSLs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&nzzt={nzzt}&wslb={wslb}&pageNum={pageNum}&pageSize={pageSize}', //获取文书公开信息列表(案管); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_GetWSSLs: '/api/WSPB/CBR_GetWSSLs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&nzzt={nzzt}&wslb={wslb}&pageNum={pageNum}&pageSize={pageSize}', //获取文书公开信息列表(承办人); HttpMethod:GET; NeedToken:True(承办人)
    AG_CountWSSL: '/api/WSPB/AG_CountWSSL?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&nzzt={nzzt}&wslb={wslb}', //计算文书公开信息数量(案管); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_CountWSSL: '/api/WSPB/CBR_CountWSSL?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&nzzt={nzzt}&wslb={wslb}', //计算文书公开信息数量(承办人); HttpMethod:GET; NeedToken:True(承办人)
    CreateWS: '/api/WSPB/CreateWS?bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}&gkbwsmc={gkbwsmc}', //拟制文书; HttpMethod:POST; NeedToken:True(承办人)
    EditWS: '/api/WSPB/EditWS?bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}&gkbwsmc={gkbwsmc}&gkbwjlj={gkbwjlj}', //修订文书; HttpMethod:POST; NeedToken:True(承办人)
    ReviewWS: '/api/WSPB/ReviewWS?sftg={sftg}&bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}', //审核文书; HttpMethod:POST; NeedToken:True(案管人员)
    GetWSSHJGs: '/api/WSPB/GetWSSHJGs?bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}', //获取文书审核结果列表; HttpMethod:GET; NeedToken:True(承办人, 案管人员)
    GetOriginalWord: '/api/WSPB/GetOriginalWord?bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}&wjlj={wjlj}', //获取原始文书文件; HttpMethod:GET; NeedToken:True(承办人)
    GetPublishWord: '/api/WSPB/GetPublishWord?bmsah={bmsah}&dwbm={dwbm}&wsbh={wsbh}&gkbwjlj={gkbwjlj}', //获取公开版文书文件; HttpMethod:GET; NeedToken:True(承办人)
  },
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
    GetWSLBs: '/api/SystemInfo/GetWSLBs', //获取所有文书类型列表; HttpMethod:GET; NeedToken:True(承办人, 案管人员, 管理员)
    GetSubUnits: '/api/SystemInfo/GetSubUnits', //获取下级单位列表; HttpMethod:GET; NeedToken:True(案管人员)
  },
//实时提醒
  SSTX : {
    AG_CountAJGKXX: '/api/SSTX/AG_CountAJGKXX?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&ajlx={ajlx}', //计算案件公开信息数量(案管人员); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_CountAJGKXX: '/api/SSTX/CBR_CountAJGKXX?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&ajlx={ajlx}', //计算案件公开信息数量(承办人); HttpMethod:GET; NeedToken:True(承办人)
    AG_GetAJGKXXs: '/api/SSTX/AG_GetAJGKXXs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&ajlx={ajlx}&pageNum={pageNum}&pageSize={pageSize}', //获取案件公开信息列表(案管人员); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_GetAJGKXXs: '/api/SSTX/CBR_GetAJGKXXs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&ajlx={ajlx}&pageNum={pageNum}&pageSize={pageSize}', //获取案件公开信息列表(承办人); HttpMethod:GET; NeedToken:True(承办人)
    AG_GetWSSLs: '/api/SSTX/AG_GetWSSLs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&nzzt={nzzt}&wslb={wslb}&pageNum={pageNum}&pageSize={pageSize}', //获取文书公开信息列表(案管); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_GetWSSLs: '/api/SSTX/CBR_GetWSSLs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&nzzt={nzzt}&wslb={wslb}&pageNum={pageNum}&pageSize={pageSize}', //获取文书公开信息列表(承办人); HttpMethod:GET; NeedToken:True(承办人)
    AG_CountWSSL: '/api/SSTX/AG_CountWSSL?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dwbm={dwbm}&bhxj={bhxj}&gkzt={gkzt}&nzzt={nzzt}&wslb={wslb}', //计算文书公开信息数量(案管); HttpMethod:GET; NeedToken:True(案管人员)
    CBR_CountWSSL: '/api/SSTX/CBR_CountWSSL?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&gkzt={gkzt}&nzzt={nzzt}&wslb={wslb}', //计算文书公开信息数量(承办人); HttpMethod:GET; NeedToken:True(承办人)
  },
//数据导出控制器
  SJDC : {
    AG_GetAJGKXXs: '/api/SJDC/AG_GetAJGKXXs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&ajlx={ajlx}&dczt={dczt}&pageNum={pageNum}&pageSize={pageSize}', //获取案件公开信息列表; HttpMethod:GET; NeedToken:True(案管人员)
    AG_CountAJGKXX: '/api/SJDC/AG_CountAJGKXX?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&ajlx={ajlx}&dczt={dczt}', //计算案件公开信息数量; HttpMethod:GET; NeedToken:True(案管人员)
    AG_GetWSSLs: '/api/SJDC/AG_GetWSSLs?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&wslb={wslb}&dczt={dczt}&pageNum={pageNum}&pageSize={pageSize}', //获取文书公开信息列表; HttpMethod:GET; NeedToken:True(案管人员)
    AG_CountWSSL: '/api/SJDC/AG_CountWSSL?startTimeStr={startTimeStr}&endTimeStr={endTimeStr}&dczt={dczt}&wslb={wslb}', //计算文书公开信息数量; HttpMethod:GET; NeedToken:True(案管人员)
    CreatePackage: '/api/SJDC/CreatePackage?flag={flag}&startDate={startDate}&endDate={endDate}', //生成导出数据包; HttpMethod:POST; NeedToken:False
    DownloadPackage: '/api/SJDC/DownloadPackage?packageName={packageName}', //下载包; HttpMethod:POST; NeedToken:False
  },
}

window.webApi = webApi;
