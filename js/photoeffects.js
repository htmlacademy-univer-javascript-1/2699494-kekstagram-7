const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const effectsList = form.querySelector('.effects__list');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectValue = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');

let scale = SCALE_DEFAULT;
let currentEffect = 'none';

const setScale = (value) => {
  scale = value;
  scaleValue.value = scale + '%';
  preview.style.transform = 'scale(' + scale / 100 + ')';
};

scaleSmaller.addEventListener('click', () => {
  if (scale > SCALE_MIN) {
    setScale(scale - SCALE_STEP);
  }
});

scaleBigger.addEventListener('click', () => {
  if (scale < SCALE_MAX) {
    setScale(scale + SCALE_STEP);
  }
});

noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const applyEffect = () => {
  const effect = EFFECTS[currentEffect];
  const value = slider.noUiSlider.get();

  effectValue.value = value;
  preview.style.filter = effect.filter + '(' + value + effect.unit + ')';
};

slider.noUiSlider.on('update', () => {
  if (currentEffect !== 'none') {
    applyEffect();
  }
});

const resetEffects = () => {
  setScale(SCALE_DEFAULT);

  currentEffect = 'none';
  preview.style.filter = '';
  effectValue.value = '';
  effectLevel.classList.add('hidden');
};

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    preview.style.filter = '';
    effectValue.value = '';
    effectLevel.classList.add('hidden');
    return;
  }

  const effect = EFFECTS[currentEffect];

  effectLevel.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    step: effect.step,
    start: effect.max
  });
  applyEffect();
});

resetEffects();

export { resetEffects };
