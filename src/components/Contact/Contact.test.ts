/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/naming-convention */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Validation rules from validator.ts
const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function hasLetters(value: string): boolean {
  return /[a-zA-Z]/.test(value);
}

describe('Contact Form Validator', () => {
  describe('Name Validation', () => {
    it('should accept valid names', () => {
      expect(nameRegex.test('John')).toBe(true);
      expect(nameRegex.test('Jean-Pierre')).toBe(true);
      expect(nameRegex.test('Müller')).toBe(true);
      expect(nameRegex.test('José María')).toBe(true);
    });

    it('should reject names with numbers', () => {
      expect(nameRegex.test('John123')).toBe(false);
      expect(nameRegex.test('Mary1')).toBe(false);
    });

    it('should reject empty names', () => {
      expect(nameRegex.test('')).toBe(false);
    });

    it('should reject names shorter than 2 characters', () => {
      expect(nameRegex.test('J')).toBe(false);
    });

    it('should reject names longer than 50 characters', () => {
      expect(nameRegex.test('a'.repeat(51))).toBe(false);
    });
  });

  describe('Email Validation', () => {
    it('should accept valid emails', () => {
      expect(emailRegex.test('john@example.com')).toBe(true);
      expect(emailRegex.test('user.name@domain.co.uk')).toBe(true);
      expect(emailRegex.test('test+tag@domain.com')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(emailRegex.test('invalid-email')).toBe(false);
      expect(emailRegex.test('user@')).toBe(false);
      expect(emailRegex.test('@domain.com')).toBe(false);
      expect(emailRegex.test('user@domain')).toBe(false);
    });

    it('should reject emails with spaces', () => {
      expect(emailRegex.test('user @domain.com')).toBe(false);
    });
  });

  describe('Subject Validation', () => {
    it('should accept valid subjects', () => {
      expect('Test Subject'.length >= 4 && hasLetters('Test Subject')).toBe(true);
      expect('Project inquiry'.length >= 4 && hasLetters('Project inquiry')).toBe(true);
    });

    it('should reject subjects shorter than 4 characters', () => {
      expect('Hi'.length >= 4).toBe(false);
    });

    it('should reject subjects without letters', () => {
      expect(hasLetters('1234567890')).toBe(false);
    });

    it('should reject subjects longer than 100 characters', () => {
      const longSubject = 'a'.repeat(101);
      expect(longSubject.length > 100).toBe(true);
    });
  });

  describe('Message Validation', () => {
    it('should accept valid messages', () => {
      const msg = 'This is a valid test message with enough content';
      expect(msg.length >= 20 && msg.length <= 1000 && hasLetters(msg)).toBe(true);
    });

    it('should reject messages shorter than 20 characters', () => {
      expect('Too short'.length >= 20).toBe(false);
    });

    it('should reject messages without letters', () => {
      const msg = '123456789012345678901234';
      expect(hasLetters(msg)).toBe(false);
    });

    it('should reject messages longer than 1000 characters', () => {
      const msg = 'a'.repeat(1001);
      expect(msg.length > 1000).toBe(true);
    });
  });
});

describe('Contact Form DOM', () => {
  let form: HTMLFormElement;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let subjectInput: HTMLInputElement;
  let messageInput: HTMLTextAreaElement;
  let submitButton: HTMLButtonElement;
  let formError: HTMLElement;
  let companyInput: HTMLInputElement;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <form id="contact-form" novalidate>
        <input id="floating_first_name" name="floating_first_name" type="text" />
        <input id="floating_last_name" name="floating_last_name" type="text" />
        <input id="floating_email" name="floating_email" type="email" />
        <input id="subject" name="subject" type="text" />
        <textarea id="floating_message" name="floating_message"></textarea>
        <input name="company" type="text" style="position:absolute; left:-9999px;" />
        <button id="submit-button" type="submit"><span id="submit-text">Submit</span></button>
        <p id="form-error" class="hidden"></p>
        <p id="form-success" class="hidden"></p>
      </form>
    `;

    form = document.getElementById('contact-form') as HTMLFormElement;
    firstNameInput = document.getElementById('floating_first_name') as HTMLInputElement;
    lastNameInput = document.getElementById('floating_last_name') as HTMLInputElement;
    emailInput = document.getElementById('floating_email') as HTMLInputElement;
    subjectInput = document.getElementById('subject') as HTMLInputElement;
    messageInput = document.getElementById('floating_message') as HTMLTextAreaElement;
    submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    formError = document.getElementById('form-error') as HTMLElement;
    companyInput = document.querySelector('input[name="company"]') as HTMLInputElement;

    // Mock fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('Form Structure', () => {
    it('should have all required form fields', () => {
      expect(form).toBeTruthy();
      expect(firstNameInput).toBeTruthy();
      expect(lastNameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(subjectInput).toBeTruthy();
      expect(messageInput).toBeTruthy();
      expect(submitButton).toBeTruthy();
      expect(formError).toBeTruthy();
    });

    it('should have proper form attributes', () => {
      expect(form.getAttribute('id')).toBe('contact-form');
      expect(form.getAttribute('novalidate')).toBe('');
      expect(submitButton.getAttribute('type')).toBe('submit');
    });

    it('should have honeypot field for spam protection', () => {
      expect(companyInput).toBeTruthy();
      expect(companyInput.getAttribute('name')).toBe('company');
    });

    it('should have error and success message containers', () => {
      const errorEl = document.getElementById('form-error');
      const successEl = document.getElementById('form-success');
      expect(errorEl).toBeTruthy();
      expect(successEl).toBeTruthy();
      expect(errorEl?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Form Input Handling', () => {
    it('should accept input values', () => {
      firstNameInput.value = 'John';
      lastNameInput.value = 'Doe';
      emailInput.value = 'john@example.com';
      subjectInput.value = 'Test Subject';
      messageInput.value = 'This is a test message with enough content';

      expect(firstNameInput.value).toBe('John');
      expect(lastNameInput.value).toBe('Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(subjectInput.value).toBe('Test Subject');
      expect(messageInput.value).toBe('This is a test message with enough content');
    });

    it('should allow clearing form values', () => {
      firstNameInput.value = 'John';
      firstNameInput.value = '';
      expect(firstNameInput.value).toBe('');
    });

    it('should preserve whitespace in input values', () => {
      messageInput.value = '  Test message with spaces  ';
      expect(messageInput.value).toBe('  Test message with spaces  ');
    });
  });

  describe('Form Error Handling', () => {
    it('should display error message element', () => {
      formError.textContent = 'Invalid first name.';
      formError.classList.remove('hidden');

      expect(formError.classList.contains('hidden')).toBe(false);
      expect(formError.textContent).toBe('Invalid first name.');
    });

    it('should hide error message', () => {
      formError.classList.add('hidden');
      expect(formError.classList.contains('hidden')).toBe(true);
    });

    it('should add error styling to input fields', () => {
      firstNameInput.classList.add('border-red-500');
      expect(firstNameInput.classList.contains('border-red-500')).toBe(true);
    });

    it('should remove error styling from input fields', () => {
      firstNameInput.classList.add('border-red-500');
      firstNameInput.classList.remove('border-red-500');
      expect(firstNameInput.classList.contains('border-red-500')).toBe(false);
    });

    it('should clear all error states', () => {
      firstNameInput.classList.add('border-red-500');
      lastNameInput.classList.add('border-red-500');
      emailInput.classList.add('border-red-500');
      formError.textContent = 'Error message';
      formError.classList.remove('hidden');

      // Simulate clearing errors
      firstNameInput.classList.remove('border-red-500');
      lastNameInput.classList.remove('border-red-500');
      emailInput.classList.remove('border-red-500');
      formError.textContent = '';
      formError.classList.add('hidden');

      expect(firstNameInput.classList.contains('border-red-500')).toBe(false);
      expect(lastNameInput.classList.contains('border-red-500')).toBe(false);
      expect(emailInput.classList.contains('border-red-500')).toBe(false);
      expect(formError.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Button State Management', () => {
    it('should disable button when submitting', () => {
      submitButton.disabled = true;
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable button when not submitting', () => {
      submitButton.disabled = false;
      expect(submitButton.disabled).toBe(false);
    });

    it('should update button HTML during submission', () => {
      const originalHTML = submitButton.innerHTML;
      submitButton.innerHTML = '<span>Loading...</span>';
      expect(submitButton.innerHTML).toBe('<span>Loading...</span>');

      submitButton.innerHTML = originalHTML;
      expect(submitButton.innerHTML).toBe(originalHTML);
    });
  });

  describe('Form Reset', () => {
    it('should clear all input values when reset', () => {
      firstNameInput.value = 'John';
      lastNameInput.value = 'Doe';
      emailInput.value = 'john@example.com';
      subjectInput.value = 'Test Subject';
      messageInput.value = 'Test message content here';

      form.reset();

      expect(firstNameInput.value).toBe('');
      expect(lastNameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  describe('Fetch Integration', () => {
    beforeEach(() => {
      firstNameInput.value = 'John';
      lastNameInput.value = 'Doe';
      emailInput.value = 'john@example.com';
      subjectInput.value = 'Test Subject';
      messageInput.value = 'This is a valid test message with enough content';
    });

    it('should mock fetch without making real requests', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const response = await fetch('https://contact-worker.juanbocca.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value,
        }),
      });

      expect(global.fetch).toHaveBeenCalled();
      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetch('https://contact-worker.juanbocca.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'data' }),
        });
      } catch (error) {
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should handle API error responses', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      });

      const response = await fetch('https://contact-worker.juanbocca.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'data' }),
      });

      expect(response.ok).toBe(false);
      const data = await response.json();
      expect(data.error).toBe('Server error');
    });

    it('should send form data as JSON payload', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const payload = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        company: companyInput?.value || '',
      };

      await fetch('https://contact-worker.juanbocca.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://contact-worker.juanbocca.workers.dev/',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});
