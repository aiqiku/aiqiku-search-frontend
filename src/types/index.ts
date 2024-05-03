export interface Post {
  id: number;
  title?: string;
  content?: string;
  tags?: string;
  thumbNum?: number;
  favourNum?: number;
  userId?: number;
}

export interface User {
  id: number;
  userAccount?: string; //"账号",
  userPassword?: string; //"密码",
  unionId?: string; //"微信开放平台id",
  mpOpenId?: string; //"公众号openId",
  userName?: string; //"用户昵称",
  userAvatar?: string; //"用户头像",
  userProfile?: string; //"用户简介",
  userRole?: string; // '用户角色：user/admin/ban',
}
