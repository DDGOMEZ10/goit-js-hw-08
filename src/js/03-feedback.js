import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const updateLocalStorage = () => {
  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormState));
  console.log('Feedback form state updated:', feedbackFormState);
};

const throttledUpdateLocalStorage = throttle(updateLocalStorage, 500);

feedbackForm.addEventListener('input', () => {
  throttledUpdateLocalStorage();
});

feedbackForm.addEventListener('submit', () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log('Feedback form submitted:', feedbackFormState);
});

document.addEventListener('DOMContentLoaded', () => {
  const feedbackFormState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (feedbackFormState) {
    emailInput.value = feedbackFormState.email;
    messageInput.value = feedbackFormState.message;
    console.log('Feedback form state loaded:', feedbackFormState);
  }
});
