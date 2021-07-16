/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
1. Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
2. Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
3. Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/
export default class UserInfo {
  constructor({userNameSelector, userCaptionSelector}) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userCaption = document.querySelector(this._userCaptionSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userName.textContent,
      userCaption: this._userCaption.textContent
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.userName;
    this._userCaption.textContent = userInfo.userCaption;
  }


}
