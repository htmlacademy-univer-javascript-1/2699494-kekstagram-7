let photos = [];
let messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
let names = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Анна', 'Сергей', 'Екатерина'];
let descriptions = [
  'Закат на море',
  'Мой завтрак',
  'Прогулка по городу',
  'Отдых с друзьями',
  'Горы летом',
  'Новая машина',
  'Мой котик',
  'Вечер в парке'
];

let id = 1;

let getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let getMessage = function () {
  let message = messages[getRandomNumber(0, messages.length - 1)];

  if (getRandomNumber(1, 2) === 2) {
    let secondMessage = messages[getRandomNumber(0, messages.length - 1)];

    while (secondMessage === message) {
      secondMessage = messages[getRandomNumber(0, messages.length - 1)];
    }

    message = message + ' ' + secondMessage;
  }

  return message;
};

let getComments = function () {
  let comments = [];
  let count = getRandomNumber(0, 30);

  for (let i = 0; i < count; i++) {
    comments.push({
      id: id++,
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getMessage(),
      name: names[getRandomNumber(0, names.length - 1)]
    });
  }

  return comments;
};

for (let i = 1; i <= 25; i++) {
  photos.push({
    id: i,
    url: 'photos/' + i + '.jpg',
    description: descriptions[getRandomNumber(0, descriptions.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getComments()
  });
}

