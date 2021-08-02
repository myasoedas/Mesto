const urlCards = 'https://mesto.nomoreparties.co/v1/cohort-26/cards';
const urlProfile = 'https://nomoreparties.co/v1/cohort-26/users/me';
const token = '366940f8-1afd-40c8-8095-e44dfdf9116b';

const initialCards =
fetch(urlCards, {
  headers: {
    authorization: token,
  }
})
.then(res => res.json())
.then((result) => {
  const cards = [];
  result.forEach((item) => {
    const cardObject = {
      placeName: item.name,
      placeSrc: item.link,
      placeAlt: item.name,
    };
    cards.push(cardObject);
  });
  console.log(cards);
  return cards;
})
.catch((err) => {
  console.log(err);
});

console.log(initialCards);

/*const Cards = [
  {
    placeName: 'Иркутск',
    placeSrc: 'https://pobedarf.ru/wp-content/uploads/2020/12/irkutsk.jpg',
    placeAlt: 'Центр города'
  },
  {
    placeName: 'Ужур',
    placeSrc: 'https://i1.photo.2gis.com/images/geo/0/30258560054884725_9db9.jpg',
    placeAlt: 'Центр города'
  },
  {
    placeName: 'Сибирский',
    placeSrc: 'http://forumimage.ru/uploads/20151212/144990808502039562.jpg',
    placeAlt: 'Церковь Варвары'
  },
  {
    placeName: 'Новосибирск',
    placeSrc: 'https://www.sobaka.ru/uploads/nsk/Novosibirsk-41.jpg',
    placeAlt: 'Центр города'
  },
  {
    placeName: 'Омск',
    placeSrc: 'https://avatars.mds.yandex.net/get-zen_doc/174930/pub_5afe8eb1a815f1942b55080a_5afe8f7aad0f2251f7e3cd82/scale_1200',
    placeAlt: 'Центр города'
  },
  {
    placeName: 'Оренбург',
    placeSrc: 'http://rasfokus.ru/images/photos/medium/9c307e11a215fad2f1a718224779191f.jpg',
    placeAlt: 'Центр города'
  }
];*/

/*const profileData = {
  name: 'Александр',
  about: 'Веб разработчик',
  avatar: '/13a55efb33d883c738da.jpg',
  _id: "33e7a2ebd644c27697c8a56e",
  cohort: "cohort-26",
};*/

/*function getResponse(url, token) {
  fetch(url, {
    headers: {
      authorization: token,
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return JSON.parse(result);
  })
  .catch((err) => {
    console.log(err);
  });
}*/

/*fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
    method: 'PUT',
    body: JSON.stringify({
      name: 'Александр',
      about: 'Веб разработчик',
      avatar: 'http://localhost:8080/13a55efb33d883c738da.jpg',
      cohort: "cohort-26",
      _id: "33e7a2ebd644c27697c8a56e",
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    }
});*/
