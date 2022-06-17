import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateInput();

function onFormSubmit(e) {
  e.preventDefault();

  const savedData = localStorage.getItem(STORAGE_KEY);
  const savedMessage = savedData ? JSON.parse(savedData) : {};

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(savedMessage);
}

function onInput(e) {
  const { name, value } = e.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    refs.input.value = savedMessage.email || '';
    refs.textarea.value = savedMessage.message || '';
  }
}
