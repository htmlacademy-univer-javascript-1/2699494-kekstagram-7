const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

function createComment(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(text);

  return li;
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function openBigPicture(photo) {
  bigImage.src = photo.url;
  bigImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  commentsList.innerHTML = '';
  for (let i = 0; i < photo.comments.length; i++) {
    commentsList.appendChild(createComment(photo.comments[i]));
  }

  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
}

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
