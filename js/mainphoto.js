const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

let currentComments = [];
let shownCount = 0;

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

function showMoreComments() {
  let end = shownCount + COMMENTS_STEP;

  if (end > currentComments.length) {
    end = currentComments.length;
  }

  for (let i = shownCount; i < end; i++) {
    commentsList.appendChild(createComment(currentComments[i]));
  }

  shownCount = end;

  commentCounter.innerHTML = shownCount + ' из <span class="comments-count">' + currentComments.length + '</span> комментариев';

  if (shownCount === currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
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
  caption.textContent = photo.description;

  currentComments = photo.comments;
  shownCount = 0;
  commentsList.innerHTML = '';

  commentCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  showMoreComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
}

commentsLoader.addEventListener('click', showMoreComments);
closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
