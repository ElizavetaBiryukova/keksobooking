const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const USER_PHOTO_EMPTY = 'img/muffin-grey.svg';
const PHOTO_ALT = 'Фотография жилья';

const userPhotoInput = document.querySelector('.ad-form-header__input');
const userPhotoImage = document.querySelector('.ad-form-header__preview img');
const housingPhotoInput = document.querySelector('.ad-form__input');
const housingPhotoContainer = document.querySelector('.ad-form__photo');

const checkFile = (input, place) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      place.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

userPhotoInput.addEventListener('change', (evt) => {
  checkFile(evt.target, userPhotoImage)
});

const createOneImage = (container, alt) => {
  if (container.hasChildNodes()) {
    container.innerHTML = '';
  }
  const image = document.createElement('img');
  image.style.width = '100%';
  image.style.height = '100%';
  image.style.objectFit = 'cover';
  image.alt = alt;
  housingPhotoContainer.appendChild(image);
  return image;
};

housingPhotoInput.addEventListener('change', (evt) => {
  const housingPhotoImage = createOneImage(housingPhotoContainer, PHOTO_ALT)
  checkFile(evt.target, housingPhotoImage)
});

const resetPreviews = () => {
  userPhotoImage.src = USER_PHOTO_EMPTY;
  housingPhotoContainer.innerHTML = '';
};

export { resetPreviews }
