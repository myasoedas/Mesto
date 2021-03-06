/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
1. Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
2. Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
3. Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/
export default class UserInfo {
  constructor({userNameSelector, userCaptionSelector, userImageSelector}, userInfo) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._userImageSelector = userImageSelector;

    this._about = userInfo.about;
    this._avatar = userInfo.avatar;
    this._cohort = userInfo.cohort;
    this._name = userInfo.name;
    this._id = userInfo._id;

    this._userName = document.querySelector(this._userNameSelector);
    this._userCaption = document.querySelector(this._userCaptionSelector);
    this._userImage = document.querySelector(this._userImageSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      cohort: this._cohort,
      id: this._id
    };
    return userInfo;
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(userInfo) {
    this._about = userInfo.about;
    this._name = userInfo.name;
    this._userName.textContent = userInfo.name;
    this._userCaption.textContent = userInfo.about;
  }

  setUserImage(userInfo) {
    this._userImage.src = userInfo.avatar;
  }


}
