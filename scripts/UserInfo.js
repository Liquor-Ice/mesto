export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector).textContent;
    this._about = document.querySelector(aboutSelector).textContent;
  };

  getUserInfo() {
    return userInfo = {
      userName: this._name,
      userAbout: this._about
    };
  };

  setUserInfo({userName, userAbout}) {
    this._name = userName;
    this._about = userAbout;
  };
};