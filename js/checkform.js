const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const getHashtags = (value) => {
  const text = value.trim();

  if (text === '') {
    return [];
  }

  return text.split(/\s+/);
};

const checkHashtagsFormat = (value) => {
  const hashtags = getHashtags(value);

  for (let i = 0; i < hashtags.length; i++) {
    if (!HASHTAG_REGEXP.test(hashtags[i])) {
      return false;
    }
  }

  return true;
};

const checkHashtagsCount = (value) => {
  return getHashtags(value).length <= MAX_HASHTAGS;
};

const checkHashtagsUnique = (value) => {
  const hashtags = getHashtags(value);

  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }

  return true;
};

const checkDescription = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

pristine.addValidator(
  hashtagsInput,
  checkHashtagsFormat,
  'Хэш-тег начинается с #, состоит из букв и цифр, длина до 20 символов, хэш-теги разделяются пробелами'
);
pristine.addValidator(
  hashtagsInput,
  checkHashtagsCount,
  'Нельзя указать больше ' + MAX_HASHTAGS + ' хэш-тегов'
);
pristine.addValidator(
  hashtagsInput,
  checkHashtagsUnique,
  'Хэш-теги не должны повторяться'
);
pristine.addValidator(
  descriptionInput,
  checkDescription,
  'Комментарий не может быть длиннее ' + MAX_COMMENT_LENGTH + ' символов'
);

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {
    closeForm();
  }
};

const onFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);

  form.reset();
  fileInput.value = '';
  pristine.reset();
};

fileInput.addEventListener('change', openForm);
cancelButton.addEventListener('click', closeForm);
hashtagsInput.addEventListener('keydown', onFieldKeydown);
descriptionInput.addEventListener('keydown', onFieldKeydown);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
