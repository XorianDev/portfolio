/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable operator-linebreak */
/* eslint-disable max-depth */
/* eslint-disable max-params */
/* eslint-disable max-nested-callbacks */
/* eslint-disable complexity */

type ValidationResult = {
  valid: boolean;
  message?: string;
  field?: HTMLInputElement | HTMLTextAreaElement;
};

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
};

/* ======================
   Config
====================== */

const WORKER_URL = 'https://contact-worker.juanbocca.workers.dev/';
const TOAST_DURATION = 6000;

/* ======================
   Regex & helpers
====================== */

const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function hasLetters(value: string): boolean {
  return /[a-zA-Z]/.test(value);
}

/* ======================
   Toast
====================== */

function showToast(message: string, type: 'success' | 'error' = 'success'): void {
  let container = document.getElementById('toast-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3';
    document.body.appendChild(container);
  }

  const id = `toast-${crypto.randomUUID()}`;

  const toast = document.createElement('div');
  toast.id = id;
  toast.className = 'flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800';
  toast.setAttribute('role', 'alert');

  toast.innerHTML = `
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${type === 'success'
      ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'
      : 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
    }">
      ${type === 'success'
      ? '✓'
      : '!'
    }
    </div>
    <div class="ml-3 text-sm font-normal text-gray-900 dark:text-white">
      ${message}
    </div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
      data-dismiss-target="#${id}"
      aria-label="Close"
    >
      ✕
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
    if (container && container.childElementCount === 0) {
      container.remove();
    }
  }, TOAST_DURATION);
}

/* ======================
   Error helpers
====================== */

function setError(
  field: HTMLInputElement | HTMLTextAreaElement,
  message: string
): void {
  const error = document.getElementById('form-error');
  if (!error) {
    return;
  }

  error.textContent = message;
  error.classList.remove('hidden');

  field.classList.add('border-red-500');
  field.focus();
}

function clearErrors(form: HTMLFormElement): void {
  const error = document.getElementById('form-error');
  if (error) {
    error.textContent = '';
    error.classList.add('hidden');
  }

  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      '.border-red-500'
    )
    .forEach(el => el.classList.remove('border-red-500'));
}

/* ======================
   Validation logic
====================== */

function validateFirstName(form: HTMLFormElement): ValidationResult {
  const firstName = form.querySelector<HTMLInputElement>('#floating_first_name');
  if (!firstName || !nameRegex.test(firstName.value.trim())) {
    return {
      valid: false,
      ...(firstName && { field: firstName }),
      message: 'Invalid first name.'
    };
  }
  return { valid: true };
}

function validateLastName(form: HTMLFormElement): ValidationResult {
  const lastName = form.querySelector<HTMLInputElement>('#floating_last_name');
  if (!lastName || !nameRegex.test(lastName.value.trim())) {
    return {
      valid: false,
      ...(lastName && { field: lastName }),
      message: 'Invalid last name.'
    };
  }
  return { valid: true };
}

function validateEmail(form: HTMLFormElement): ValidationResult {
  const email = form.querySelector<HTMLInputElement>('#floating_email');
  const isInvalid = !email || email.value.length > 254 || !emailRegex.test(email.value.trim());
  if (isInvalid) {
    return {
      valid: false,
      ...(email && { field: email }),
      message: 'Invalid email.'
    };
  }
  return { valid: true };
}

function validateSubject(form: HTMLFormElement): ValidationResult {
  const subject = form.querySelector<HTMLInputElement>('#subject');
  const trimmed = subject?.value.trim() || '';
  const isInvalid = !subject || trimmed.length < 4 || trimmed.length > 100 || !hasLetters(subject.value);
  if (isInvalid) {
    return {
      valid: false,
      ...(subject && { field: subject }),
      message: 'Invalid subject.'
    };
  }
  return { valid: true };
}

function validateMessage(form: HTMLFormElement): ValidationResult {
  const message = form.querySelector<HTMLTextAreaElement>('#floating_message');
  const trimmed = message?.value.trim() || '';
  const isInvalid = !message || trimmed.length < 20 || trimmed.length > 1000 || !hasLetters(message.value);
  if (isInvalid) {
    return {
      valid: false,
      ...(message && { field: message }),
      message: 'Invalid message.'
    };
  }
  return { valid: true };
}

function validateForm(form: HTMLFormElement): ValidationResult {
  const validators = [validateFirstName, validateLastName, validateEmail, validateSubject, validateMessage];
  for (const validator of validators) {
    const result = validator(form);
    if (!result.valid) {
      return result;
    }
  }
  return { valid: true };
}

/* ======================
   Submit handler
====================== */

function setLoadingState(button: HTMLButtonElement): void {
  button.disabled = true;
  button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Sending…</span>';
}

function restoreButtonState(button: HTMLButtonElement, html: string): void {
  button.disabled = false;
  button.innerHTML = html;
}

function getFormPayload(form: HTMLFormElement): ContactPayload {
  const get = (selector: string): string => (form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement).value.trim();
  return {
    firstName: get('#floating_first_name'),
    lastName: get('#floating_last_name'),
    email: get('#floating_email'),
    subject: get('#subject'),
    message: get('#floating_message'),
    company: (form.querySelector('input[name="company"]') as HTMLInputElement)?.value || '',
  };
}

async function submitFormToWorker(payload: ContactPayload): Promise<void> {
  const response = await fetch(WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error || 'Submission failed');
  }
}

async function handleFormSubmit(e: Event, form: HTMLFormElement, btn: HTMLButtonElement, html: string): Promise<void> {
  e.preventDefault();
  clearErrors(form);
  const result = validateForm(form);
  if (!result.valid && result.field && result.message) {
    setError(result.field, result.message);
    return;
  }
  setLoadingState(btn);
  try {
    await submitFormToWorker(getFormPayload(form));
    form.reset();
    showToast('Thanks! Your message was sent successfully.', 'success');
  } catch (error) {
    console.error(error);
    showToast('Something went wrong. Please try again later.', 'error');
  } finally {
    restoreButtonState(btn, html);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) {
    return;
  }
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const html = btn.innerHTML;
  form.addEventListener('submit', e => handleFormSubmit(e, form, btn, html));
});
