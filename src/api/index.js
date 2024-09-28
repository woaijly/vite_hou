import http from '@/utils/request';

// 发送验证码接口
export const GetCode = (data) => {
  return http.post('/get/code', data);
};

// 注册接口
export const userAuthentication = (data) => {
  return http.post('/user/authentication', data);
};


// 登录接口
export const login = (data) => {
  return http.post('/login', data);
};

// 权限管理
export const authAdmin = (params) => {
  return http.get('/auth/admin', {params});
};
// 菜单权限数据
export const userGetmenu = (params) => {
  return http.get('/user/getmenu' );
}


// 权限修改
export const userSetmenu = (data) => {
  return http.post('/user/setmenu', data);
};

// 菜单权限列表
export const menuList = (params) => {
  return http.get('/menu/list',{params} );
}

// 权限下拉列表
export const menuSelectlist = ( ) => {
  return http.get('/menu/selectlist'  );
}

// 用户数据修改
export const updateUser = (data) => {
  return http.post('update/user', data);
}

// 用户菜单权限

 export const menuPermissions = ( ) => {
  return http.get('menu/permissions' );
}

// 陪护师头像列表
export const photoList= ( ) => {
  return http.get('photo/list' );
}
// 陪护师的创建
export const v3pzCompanion=(data) => {
  return http.post('/companion', data);
}

// 陪护师列表
export const companionList=(params) => {
  return http.get('/companion/list',{params});
}
// 陪护师的删除接口
export const deleteCompanion=(data) => {
  return http.post('/delete/companion',data);

}
// 订单列表
export const adminOrder=(params) => {
  return http.get('/admin/order',{params});
}
// 订单服务完成
export const updateOrder=(data) => {
  return http.post('/update/order',data);


}

