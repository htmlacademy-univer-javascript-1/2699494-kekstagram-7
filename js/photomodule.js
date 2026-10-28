import { photos } from './data.js';

const picturesBlock = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

function create(photo) {
  const element = template.cloneNode(true);

  const image = element.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;

  return element;
}

function render() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const picture = create(photos[i]);
    fragment.appendChild(picture);
  }

  picturesBlock.appendChild(fragment);
}

render();
