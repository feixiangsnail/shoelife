/**
 * apiAlias.js
 * @date Created on 2016/11/15
 * @author Jamie
 * users|file|order|product|operations
 */
const USERS = '/users', OPERATIONS = '/operations', PRODUCT = '/product', ORDER = '/order', FILE = '/file';
module.exports = {
  /**
   * 打包配置
   */

  //h5分享地址:
  //功能测试环境地址:http://113.105.183.114:9000
  'H5_URL': "http://192.168.60.115/",
  //'H5_URL': "http://221.4.138.161:9000",
  //阿里云环境地址：http://www.shoelives.com
  //'H5_URL': "http://www.shoelives.com/",

  //概况URL 功能环境
  'HOME_URL': "http://192.168.60.116:8080/",

  //阿里云
  //'HOME_URL': "http://www.shoelives.com/",

  //图片地址  功能环境
  'IMG_URL': "http://shoelives-qc.oss-cn-beijing.aliyuncs.com/",

  //阿里云
  //'IMG_URL': "http://shoelives.oss-cn-shenzhen.aliyuncs.com/",

  /**
   * users
   */
  //获取概况页url和相关信息
  'USERS_BASIC': OPERATIONS + "/common/general",

  //后台用户登录
  'USERS_LOGIN': USERS + "/common/login",

  //退出登录
  'USERS_LOGINOUT': USERS + "/common/loginout",

  //获取验证码图片
  'SECUR_CODE': USERS + "/common/securitycode",

  //后台验证是否登录
  'USERS_IS_LOGIN': USERS + "/is-login",

  //修改密码
  'USERS_MODIFY_PASS': USERS + "/common/modifyPass",

  //忘记密码
  'USERS_FORGOT_PASS': USERS + "/common/forget/send-mail",

  //重置密码
  'USERS_FORGOT_RESET': USERS + "/common/forget/reset",

  //获查询所有用户信息
  'SELECT_USERS': USERS + "/admin/user/select/users",

  //根据公司id获取设计师 设计师列表
  'DESIGNER_LIST': USERS + "/admin/user/designerlist",

  //获取所有的主编 /admin/user/editores
  'EDITOR_LIST': USERS + "/admin/user/editores",
  //按照条件查询主编申请信息
  'EDITOR_APPLAY_LIST': USERS + "/admin/editor/applay/applicants",
  // 删除主编申请
  'EDITOR_APPLAY_DELELTE': USERS + "/admin/editor/applay/delelte/",
  //驳回主编申请
  'EDITOR_APPLAY_REFUSE': USERS + "/admin/editor/applay/refuse/",
  //撤销主编
  'EDITOR_APPLAY_REVOKE': USERS + "/admin/editor/applay/revoke/",
  //主编申请通过审核
  'EDITOR_APPLAY_PASS': USERS + "/admin/editor/applay/success/",

  //获取所有平台角色
  'ADMIN_EMP_ROLE_LIST': USERS + "/admin/admin-emp/admin-role",

  //查询所有平台用户
  'ADMIN_EMP_LIST': USERS + "/admin/admin-emp/select-admins",

  //删除平台用户
  'ADMIN_EMP_DEL': USERS + "/admin/admin-emp/delete/",

  //禁用平台用户
  'ADMIN_EMP_UPLOAD': USERS + "/admin/admin-emp/un-allow-upload/",

  //恢复平台用户
  'ADMIN_EMP_RECOVER': USERS + "/admin/admin-emp/recover/",

  //添加平台用户
  'ADMIN_EMP_ADD': USERS + "/admin/admin-emp/add",

  //查询单个平台用户
  'ADMIN_EMP_GET': USERS + "/admin/admin-emp/select/",

  //更新平台用户
  'ADMIN_EMP_UPDATE': USERS + "/admin/admin-emp/update",

  //获取所有企业角色
  'ADMIN_COMPANY_ROLE_LIST': USERS + "/admin/company-employee/comp-role",

  //查询商家用户
  'ADMIN_COMPANY_LIST': USERS + "/admin/company-employee/select",

  //删除商家用户
  'ADMIN_COMPANY_DEL': USERS + "/admin/company-employee/delete/",

  //禁用商家用户
  'ADMIN_COMPANY_UPLOAD': USERS + "/admin/company-employee/unallow/",

  //恢复商家用户
  'ADMIN_COMPANY_RECOVER': USERS + "/admin/company-employee/recover/",

  //添加商家用户
  'ADMIN_COMPANY_ADD': USERS + "/admin/company-employee/add",

  //查询单个商家用户

  'ADMIN_COMPANY_GET': USERS + "/admin/company-employee/select/",

  //更新商家用户
  'ADMIN_COMPANY_UPDATE': USERS + "/admin/company-employee/update",

  //查询所有用户信息  注册用户列表
  'ADMIN_USERS_LIST': USERS + "/admin/user/select/users",

  //获取用户详细信息
  'ADMIN_USERS_GET': USERS + "/admin/user/user-detail/",

  //根据搜索条件查询意见反馈
  'COMMON_FEEDBACK_LIST': USERS + "/common/my/searchfeedback",

  //根据Id删除意见反馈
  'COMMON_FEEDBACK_DEL': USERS + "/admin/my/delfeedback/",

  //根据Feedback更新意见反馈
  'COMMON_FEEDBACK_UPD': USERS + "/common/my/updfeedback",

  // 修改设计师履历
  'ADMIN_DES_RECORD_UPDATE': USERS + "/admin/company-designer/update",

  // 查询设计师履历列表
  'ADMIN_COMPANY_DESIGNER_LIST': USERS + "/admin/company-designer/list",

  // 查询设计师
  'ADMIN_COMPANY_DESIGNER_GET': USERS + "/admin/company-designer/get/",

  //平台设计师列表
  'ADMIN_DESIGNER_LIST': USERS + "/admin/designer/list",

  //平台设计师推荐
  'ADMIN_DESIGNER_RECOMMEND': USERS + "/admin/designer/recommend/",

  /**
   * operations
   */

  //根据分类Category查询对应类型分类必填信息：categoryType  分类类型：1为商品分类，2为材料分类，3为内容分类，4为设计风格
  'ADMIN_CATEGORY_LIST': OPERATIONS + "/common/category/querytypecategory",

  //查询对应所有分类
  'ADMIN_ALL_CATEGORY_LIST': OPERATIONS + "/common/category/querycategory",

  //顶级分类查询
  'ADMIN_TOP_CATEGORY_LIST': OPERATIONS + "/common/category/querytypetopcategory",

  //添加分类
  'ADMIN_ADD_CATEGORY': OPERATIONS + "/admin/category/addcategory",

  //修改分类
  'ADMIN_MODIFY_CATEGORY': OPERATIONS + "/admin/category/updatecategory",

  //分类管理列表  分类类型：1为商品分类，2为材料分类，3为内容分类，4为设计风格
  'ADMIN_SEARCH_CATEGORY_LIST': OPERATIONS + "/common/category/searchcategory",

  //删除分类
  'ADMIN_DELETE_CATEGORY': OPERATIONS + "/admin/category/delete/",

  //查询材料详情
  'CATEGORY_GET': OPERATIONS + "/common/category/get/",

  //材料管理列表  材料类型:1为楦头，2为材料，3为装饰
  'ADMIN_MATERIAL_LIST': OPERATIONS + "/admin/material/search",

  'ADMIN_MATERIAL_LIST_P': PRODUCT + "/admin/material/search",


  //品牌管理列表
  'ADMIN_SELECT_BRANDS': OPERATIONS + "/admin/brand/selectbrands",

  //删除单个品牌
  'ADMIN_SELECT_BRANDS_DEL': OPERATIONS + "/admin/brand/deletebrand/",

  //查询单个品牌
  'ADMIN_SELECT_BRANDS_GET': OPERATIONS + "/admin/brand/selectbrand/",

  //添加品牌
  'ADMIN_SELECT_BRANDS_ADD': OPERATIONS + "/admin/brand/addbrand",

  //修改品牌
  'ADMIN_SELECT_BRANDS_UPDATE': OPERATIONS + "/admin/brand/updatebrand",

  //根据搜索条件查询材料必填信息
  'MATERIAL_SEARCH': OPERATIONS + "/admin/material/search",
  //根据搜索条件查询材料必填信息
  'MATERIAL_SEARCH_P': PRODUCT + "/admin/material/search",
  //根据材料编号和公司id删除材料
  'MATERIAL_DEL': OPERATIONS + "/admin/material/delete/",

  'MATERIAL_DEL_P': PRODUCT + "/admin/material/delete/",

  //新增材料
  'MATERIAL_ADD': OPERATIONS + "/admin/material/add",

  'MATERIAL_ADD_P': PRODUCT + "/admin/material/add",
  //查询材料详情
  'MATERIAL_GET': OPERATIONS + "/admin/material/get/",

  'MATERIAL_GET_P': PRODUCT + "/admin/material/get/",

  //修改材料信息
  'MATERIAL_UPDATE': OPERATIONS + "/admin/material/update",

  'MATERIAL_UPDATE_P': PRODUCT + "/admin/material/update",

  //分页查询文章  /common/article/search
  'ARTICALE_LIST': OPERATIONS + "/common/article/search",

  //根据文章id删除文章
  'ARTICALE_DEL': OPERATIONS + "/admin/article/delete/",

  //根据Article对象发布文章必填信息：articleId
  'ARTICALE_RELEASE': OPERATIONS + "/admin/article/release",

  //添加文章  /admin/article/add
  'ARTICALE_ADD': OPERATIONS + "/admin/article/add",

  //修改文章  /admin/article/update
  'ARTICALE_UPDATE': OPERATIONS + "/admin/article/update",

  //根据id查询单个文章
  'ARTICALE_GET': OPERATIONS + "/common/article/get/",

  //查询系统参数
  'SYSTEM_PARAM_LIST': OPERATIONS + "/admin/systemparameter/querySystemParameter",

  //根据id查询系统参数
  'SYSTEM_PARAM_GET': OPERATIONS + "/admin/systemparameter/querySystemParameterById/",

  //根据id更新系统参数
  'SYSTEM_PARAM_UPDATE': OPERATIONS + "/admin/systemparameter/updateSystemParameter",

  //根据搜索条件分页查询动态信息
  'ADMIN_DYNAMIC_LIST': OPERATIONS + "/common/dynamic/searchbytime",

  //推荐或取消推荐动态信息,状态 0为不推荐，1为推荐
  'ADMIN_DYNAMIC_UPDATE': OPERATIONS + "/admin/dynamic/recommend",

  //根据DynamicId删除信息
  'ADMIN_DYNAMIC_DEL': OPERATIONS + "/admin/dynamic/delete/",

  //多角度图片-图片参数
  'SYSTEM_PARAM_QUERY': OPERATIONS + "/common/systemparameter/querybycode/",

  // H5页面-查询
  'ADMIN_H5_LIST': OPERATIONS + "/admin/h5/search",

  // H5页面-删除
  'ADMIN_H5_DEL': OPERATIONS + "/admin/h5/del/",

  // H5页面-修改
  'ADMIN_H5_UPDATE': OPERATIONS + "/admin/h5/update",

  // H5页面-新增
  'ADMIN_H5_ADD': OPERATIONS + "/admin/h5/add",

  // H5页面-详情
  'ADMIN_H5_GET': OPERATIONS + "/admin/h5/get/",

  // 广告-查询
  'ADMIN_AD_LIST': OPERATIONS + "/admin/ad/search",

  // 广告-删除
  'ADMIN_AD_DEL': OPERATIONS + "/admin/ad/del/",

  // 广告-修改
  'ADMIN_AD_UPDATE': OPERATIONS + "/admin/ad/update",

  // 广告-更新状态
  'ADMIN_AD_STATUS': OPERATIONS + "/admin/ad/status",

  // 广告-新增
  'ADMIN_AD_ADD': OPERATIONS + "/admin/ad/add",

  // 广告-详情
  'ADMIN_AD_GET': OPERATIONS + "/admin/ad/get/",

  // 广告位-查询
  'ADMIN_SPACE_LIST': OPERATIONS + "/admin/space/all",

  // 广告位-新增
  'ADMIN_SPACE_ADD': OPERATIONS + "/admin/space/add",

  // 广告位-删除
  'ADMIN_SPACE_DEL': OPERATIONS + "/admin/space/del/",

  // 广告位-修改
  'ADMIN_SPACE_UPDATE': OPERATIONS + "/admin/space/update",

  // 创建设计师动态
  'ADMIN_DES_DYNAMIC_ADD': OPERATIONS + "/admin/designerdynamic/add",

  // 删除设计师动态
  'ADMIN_DES_DYNAMIC_DEL': OPERATIONS + "/admin/designerdynamic/delete/",

  // 发布设计师动态信息
  'ADMIN_DES_DYNAMIC_RELEASE': OPERATIONS + "/admin/designerdynamic/release",

  // 修改设计师动态信息
  'ADMIN_DES_DYNAMIC_UPDATE': OPERATIONS + "/admin/designerdynamic/update",

  // 查询设计师动态内容
  'ADMIN_DES_DYNAMIC_GET': OPERATIONS + "/common/designerdynamic/get/",

  // 分页查询设计师动态
  'ADMIN_DES_DYNAMIC_LIST': OPERATIONS + "/common/designerdynamic/search",
  /**
   * order
   */
  //商家订单分页查询
  'ORDER_COMPANY_LIST': ORDER + "/admin/order/searchbycompany",
  //查询订单详情
  'ORDER_GET': ORDER + "/common/order/queryorder/",

  //更新订单状态
  'ORDER_UPDATE': ORDER + "/common/order/updorder",

  //根据AfterSale对象查询企业售后服务单  列表
  'ADMIN_AFTER_SALE_LIST': ORDER + "/admin/aftersale/searchbycompany",

  //根据AfterSale对象更新售后服务单  拒绝/接受/更新状态
  'ADMIN_AFTER_SALE_UPD': ORDER + "/admin/aftersale/upd",

  //根据AfterSaleid查询单个售后服务单
  'ADMIN_AFTER_SALE_GET': ORDER + "/common/aftersale/get/",

  //根据AfterSale对象更新售后服务单  确认收货
  'ADMIN_AFTER_SALE_CONFIRM': ORDER + "/admin/aftersale/updaddorder",

  //查询交易明细  财务中心
  'ADMIN_TRADE_LIST': ORDER + "/admin/trade/search",

  //查询交易小计
  'ADMIN_TRADE_COUNT': ORDER + "/admin/trade/tradecount",

  //财务列表导出
  'ADMIN_TRADE_EXPORT': ORDER + "/admin/trade/export",

  //订单-定制详情
  'ORDER_CUSTOM_GET': ORDER + "/common/order/querycustomized/",

  //根据物流单号查看物流信息
  'ORDER_LOGISTICS_GET': ORDER + "/common/order/querylogistics",
  //售后服务excel导出
  'ORDER_AFTERSALE_EXPORT': ORDER + "/admin/aftersale/export",

  //订单批量excel导出
  'ORDER_LIST_EXPORT': ORDER + "/admin/order/down-order-list",

  //订单详情excel导出
  'ORDER_DETAIL_EXPORT': ORDER + "/common/order/export/",

  // 代金券新增
  'ORDER_VOUCHER_ADD': ORDER + "/admin/voucher/add",

  // 代金券列表-不包括已删除的
  'ORDER_VOUCHER_LIST': ORDER + "/admin/voucher/search",

  // 代金券修改
  'ORDER_VOUCHER_UPD': ORDER + "/admin/voucher/upd",

  // 代金券详情
  'ORDER_VOUCHER_GET': ORDER + "/common/voucher/get/",

  // 代金券删除
  'ORDER_VOUCHER_DEL': ORDER + "/admin/voucher/del/",

  // 代金券领用详情列表
  'ORDER_VOUCHER_GET_LIST': ORDER + "/admin/voucher/seedsearch",

  // 订单反馈分页查询
  'ORDER_FEEDBACK_LIST':ORDER + "/admin/order/searchorderfeedback",

  // 已取消订单分页查询
  'ORDER_CANCEL_LIST':ORDER + "/admin/order/searchcancelorder",

  /**
   * product
   */

  //定制商品搜索/列表
  'SHOE_CUSTOM_LIST': PRODUCT + "/admin/customize/search",

  //定制商品-推荐
  'SHOE_CUSTOM_RECOM': PRODUCT + "/admin/customize/recommend/",

  //获得定制商品基本信息
  'SHOE_CUSTOM_GET': PRODUCT + "/common/customize3d/detail/",

  //鞋款搜索/列表
  'SHOE_SEARCH': PRODUCT + "/admin/shoe/search",

  //鞋款搜索/列表
  'SHOE_SHOE3D': PRODUCT + "/admin/shoe3d/search",

  //设置/修改鞋状态/上/下架
  'SHOE_STATUS': PRODUCT + "/admin/shoe/status",
  //设置/修改鞋状态/上/下架
  'SHOE_3D_STATUS': PRODUCT + "/admin/shoe3d/status",
  //根据shoe对象创建鞋，并返回鞋ID
  'ADMIN_SHOE_ADD': PRODUCT + "/admin/shoe/add",
  'ADMIN_SHOE_ADD_NEW': PRODUCT + "/admin/shoe3d/add",
  //更新鞋基本信息
  'ADMIN_SHOE_UPDATE': PRODUCT + "/admin/shoe/update",
  'ADMIN_SHOE_UPDATE_NEW': PRODUCT + "/admin/shoe3d/update",

  //获取鞋基本信息
  'ADMIN_SHOE_GET': PRODUCT + "/admin/shoe/get/",
  'ADMIN_SHOE_GET_NEW': PRODUCT +"/admin/shoe3d/shoe-info/",

  //删除鞋
  'ADMIN_SHOE_DEL': PRODUCT + "/admin/shoe/del/",
  'ADMIN_SHOE_DEL_NEW': PRODUCT + "/admin/shoe3d/del/",

  //通过鞋ID获得鞋款
  'ADMIN_SHOE_STYLE': PRODUCT + "/admin/shoe-style/getbyshoeid/",

  //添加鞋款
  'ADMIN_SHOE_STYLE_ADD': PRODUCT + "/admin/shoe-style/add",

  //获取鞋款
  'ADMIN_SHOE_STYLE_GET': PRODUCT + "/admin/shoe-style/get/",

  //更新鞋款信息
  'ADMIN_SHOE_STYLE_UPDATE': PRODUCT + "/admin/shoe-style/update",

  //设置默认鞋款
  'ADMIN_SHOE_STYLE_SET': PRODUCT + "/admin/shoe-style/set-defalut/",

  //款式是否新建
  'ADMIN_SHOE_STYLE_NEW': PRODUCT + "/admin/shoe-style/isnew/",

  //获取商品的印记信息
  'ADMIN_SHOE_MARK': PRODUCT + "/admin/shoe-mark/getbyshoeid/",

  //删除/下架鞋款
  'ADMIN_SHOE_STYLE_DEL': PRODUCT + "/admin/shoe-style/del/",

  //通过鞋款获得可变区域/装饰
  'ADMIN_SHOE_POSITION_LIST': PRODUCT + "/admin/shoe-position/getbystyleid/",

  //删除可变区域/装饰
  'ADMIN_SHOE_POSITION_DEL': PRODUCT + "/admin/shoe-position/del/",

  //设置默认装饰
  'ADMIN_SHOE_POSITION_DEFALUT': PRODUCT + "/admin/shoe-position/set-defalut/",

  //创建可变区域/装饰
  'ADMIN_SHOE_POSITION_ADD': PRODUCT + "/admin/shoe-position/add",

  //获得可变区域/装饰详情
  'ADMIN_SHOE_POSITION_GET': PRODUCT + "/admin/shoe-position/get/",

  //更新可变区域/装饰
  'ADMIN_SHOE_POSITION_UPDATE': PRODUCT + "/admin/shoe-position/update",

  //通过鞋款获得可变区域/装饰 /admin/shoe-material/search   /admin/shoe-material/getbypositionid/
  'ADMIN_SHOE_MATERIAL_LIST': PRODUCT + "/admin/shoe-material/search",

  //新增用料
  'ADMIN_SHOE_MATERIAL_ADD': PRODUCT + "/admin/shoe-material/add",

  //批量新增
  'ADMIN_SHOE_MATERIAL_ADDS': PRODUCT + "/admin/shoe-material/adds",

  //删除用料
  'ADMIN_SHOE_MATERIAL_DEL': PRODUCT + "/admin/shoe-material/del/",

  //设置默认用料
  'ADMIN_SHOE_MATERIAL_SET': PRODUCT + "/admin/shoe-material/set-defalut/",

  //获得用料信息
  'ADMIN_SHOE_MATERIAL_GET': PRODUCT + "/admin/shoe-material/get/",

  //更新用料
  'ADMIN_SHOE_MATERIAL_UPDATE': PRODUCT + "/admin/shoe-material/update",

  //多图
  'ADMIN_SHOE_IMAGE_SET': PRODUCT + "/admin/shoe-image/set",

  //多图详情
  'ADMIN_SHOE_IMAGE_GET': PRODUCT + "/admin/shoe-image/get/",

  //款式-推荐 /admin/shoe-style/recommend/{id}
  'ADMIN_SHOE_STYLE_RECOM': PRODUCT + "/admin/shoe-style/recommend/",

  //款式-取消推荐 /admin/shoe-style/unrecommended/
  'ADMIN_SHOE_STYLE_UNRECOM': PRODUCT + "/admin/shoe-style/unrecommended/",

  //鞋用料-推荐
  'ADMIN_SHOE_MATERIAL_RECOM': PRODUCT + "/admin/shoe-material/recommend/",

  //鞋用料-取消推荐
  'ADMIN_SHOE_MATERIAL_UNRECOM': PRODUCT + "/admin/shoe-material/unrecommended/",

  //图片批量
  'FILE_UPLOAD_MORE': PRODUCT + "/common/shoe-image/upload",

  //更新用料加价金额
  'ADMIN_SHOE_MATERIAL_UPDATEPRICE': PRODUCT + "/admin/shoe-material/updateprice",

  //新增印记信息
  'ADMIN_SHOE_MARK_ADD': PRODUCT + "/admin/shoe-mark/add",

  //获取印记信息
  'ADMIN_SHOE_MARK_GET': PRODUCT + "/admin/shoe-mark/get/",

  //更新印记信息
  'ADMIN_SHOE_MARK_UPDATE': PRODUCT + "/admin/shoe-mark/update",

  //设置默认印记
  'ADMIN_SHOE_MARK_SET': PRODUCT + "/admin/shoe-mark/set-defalut/",

  //删除印记
  'ADMIN_SHOE_MARK_DEL': PRODUCT + "/admin/shoe-mark/del/",

  // 鞋部位数据字典-查询
  'ADMIN_DICT_LIST': PRODUCT + "/admin/dict/list",

  // 鞋部位数据字典-新增
  'ADMIN_DICT_ADD': PRODUCT + "/admin/dict/addline/",

  // 鞋部位数据字典-修改
  'ADMIN_DICT_UPDATE': PRODUCT + "/admin/dict/up",

  // 鞋部位数据字典-删除
  'ADMIN_DICT_DEL': PRODUCT + "/admin/dict/del/",
  //OBJ文件是否分组
  'DICT_IS_NULL': PRODUCT + "/admin/dict/is-null",
  //获取3d模型
  'GET_3DOBJ': PRODUCT + "/admin/shoe3d/get/",
  //设置 模型 默认
  'SET_STYLE_DEF': PRODUCT +'/admin/3d/style/def/',
  //配置 效果图
  'SET_STYLE_PICTURE': PRODUCT +'/admin/3d/style/picture',
  //修改 3D模型名称
  'UP_STYLE3D': PRODUCT +'/admin/3d/style/up',
  //修改 3D模型部位名称
  'UP_MODE_NAME': PRODUCT +'/admin/3d/mode/update',
  //修改 部位或装饰
  'UP_MODE_TYPE':PRODUCT +'/admin/3d/mode/type',
  'GET_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/search',
  //添加材料
  'ADD_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/add',
  //删除模型材料
  'DEL_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/del/',
  //设置模型默认用料
  'DEF_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/def/',
  //设置模型推荐用料
  'SET_COMMEND_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/commend/',
  //取消模型推荐用料
  'UN_COMMEND_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/un-commend/',
  //修改模型信息（价格，渲染参数）
  'UP_MODE_MATERIAL':PRODUCT +'/admin/3d/mode-material/up',
  //款式材料
  'GET_STYLE_MATRIALS':PRODUCT +'/admin/3d/style/matrials/',
  //设为主要
  'SET_MODE_MAIN':PRODUCT +'/admin/3d/mode/main/',
  //关联用料
  'ADD_MATRIALS_SIMILE':PRODUCT +'/admin/3d/matrial-similer/add',
  //解除关联
  'DEL_MATRIALS_SIMILE':PRODUCT +'/admin/3d/matrial-similer/del',
  //修改部份模型文件
  'UP_3D_MODE':PRODUCT +'/admin/3d/mode/update-mode/',
  //修改部份模型上下架
  'UP_MODE_3D_PUT':PRODUCT +'/admin/3d/style/put/',
  //查询鞋款关联
  'GET_3D_SHOE_RELATIVE':PRODUCT +'/admin/shoe3d/relative',
  //关联跟高鞋面款式
  'ADD_BOUND_UP':PRODUCT +'/admin/shoe3d/bound-up',
  'UN_BIND':PRODUCT +'/admin/shoe3d/unbind/',
  'CUSTOMIZABLE':PRODUCT +'/admin/3d/mode/customizable/',
  //修改基本信息
  'SHOE_3D_UPDATE':PRODUCT +'/admin/shoe3d/update',
  //更新鞋效果
  'SHOE_3D_RENDER':PRODUCT +'/admin/shoe3d/render',
  //查询材料
  'GET_MATERIAL_MODE':PRODUCT +'/admin/3d/mode-material/list/',
  //保存用料
  'SAVE_MATERIAL_3D':PRODUCT +'/admin/material3d3d/keep/',
  //保存用料
  'SAVE_MATERIAL_3D_NEW':PRODUCT +'/common/material3d/keep/',
  // 专题信息-搜索
  'ADMIN_SUBJECT_SEARCH': PRODUCT + "/admin/shoe-subject/search",

  // 新增专题
  'ADMIN_SUBJECT_ADD': PRODUCT + "/admin/shoe-subject/add",

  // 删除专题
  'ADMIN_SUBJECT_DEL': PRODUCT + "/admin/shoe-subject/del/",

  // 获取专题
  'ADMIN_SUBJECT_GET': PRODUCT + "/admin/shoe-subject/get/",

  // 专题信息-设置状态
  'ADMIN_SUBJECT_STATUS': PRODUCT + "/admin/shoe-subject/status",

  // 更新专题信息
  'ADMIN_SUBJECT_UPDATE': PRODUCT + "/admin/shoe-subject/update",

  // 新增合集
  'ADMIN_COLLECT_ADD': PRODUCT + "/admin/shoe-collection/add",

  // 删除合集
  'ADMIN_COLLECT_DEL': PRODUCT + "/admin/shoe-collection/del/",

  // 合集信息-搜索
  'ADMIN_COLLECT_LIST': PRODUCT + "/admin/shoe-collection/search",

  // 合集信息-排序
  'ADMIN_COLLECT_SORT': PRODUCT + "/admin/shoe-collection/sort",

  // 合集信息-设置状态
  'ADMIN_COLLECT_STATUS': PRODUCT + "/admin/shoe-collection/status",

  // 更新合集信息
  'ADMIN_COLLECT_UPDATE': PRODUCT + "/admin/shoe-collection/update",
  /**
   * file
   */
  //图片上传
  'FILE_UPLOAD': FILE + "/common/oss/importauto",
  'FILE_UPLOAD_NATIVE': FILE + '/common/oss/importnative',
  //3D模型上传
  'FILE_UPOBJ':PRODUCT + "/admin/shoe3d/upobj",
  //添加3d款式
  'FILE_3D_STYLE':PRODUCT + "/admin/3d/mode/add-style/",

  /**
   * 运营-版本控制
   */
//创建
  'VERSION_ADD': OPERATIONS + "/admin/version/add",
//获取
  'VERSION_GET': OPERATIONS + "/admin/version/get/",
//发布
  'VERSION_PUBLISHED': OPERATIONS + "/admin/version/published",
//分页查询
  'VERSION_SEARCH': OPERATIONS + "/admin/version/search",
//更新
  'VERSION_UPDATE': OPERATIONS + "/admin/version/update",
//删除
  'VERSION_DEL': OPERATIONS + "/admin/version/del",
//设置升级方式
  'VERSION_UPGRADE': OPERATIONS + "/admin/version/upgrade",

}
