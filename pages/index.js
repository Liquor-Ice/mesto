const profile = document.querySelector('.profile'); 
const popup = document.querySelector('.popup');
const editButton = profile.querySelector('.profile__edit');
const closeButton = popup.querySelector('.popup__close');
const submitButton = popup.querySelector('.popup__button');
let profileName = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;
  togglePopup();
});
closeButton.addEventListener('click', togglePopup);
submitButton.addEventListener('click', function () {
  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup();
});