/** @vitest-environment jsdom */
import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhoneNumber, toggleValidation } from '../docs/assets/js/mailto.js';

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('a.b-c+d@domain.co')).toBe(true);
  });
  it('rejects invalid emails', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
    expect(isValidEmail('user@com')).toBe(false);
  });
});

describe('isValidPhoneNumber', () => {
  it('accepts valid numbers', () => {
    expect(isValidPhoneNumber('+4512345678')).toBe(true);
    expect(isValidPhoneNumber('12345678')).toBe(true);
  });
  it('rejects invalid numbers', () => {
    expect(isValidPhoneNumber('abc')).toBe(false);
    expect(isValidPhoneNumber('+12')).toBe(false);
  });
});

describe('toggleValidation', () => {
  function setup() {
    const form = document.createElement('form');
    form.innerHTML = `
      <input id="mt_phone" />
      <select id="mt_phone_cc"></select>
      <div id="mt_phone_error" style="display:none"></div>
      <button class="mt-submit"></button>
      <input name="mt_name" />
      <input name="mt_email" />
      <input type="checkbox" name="mt_consent" />
    `;
    const phoneInput = form.querySelector('#mt_phone');
    const phoneCC = form.querySelector('#mt_phone_cc');
    const phoneError = form.querySelector('#mt_phone_error');
    const submitBtn = form.querySelector('.mt-submit');
    const msgs = { invalidPhone: 'invalid', missing: 'missing' };
    return { form, phoneInput, phoneCC, phoneError, submitBtn, msgs };
  }

  it('disables submit for invalid phone', () => {
    const { form, phoneInput, phoneCC, phoneError, submitBtn, msgs } = setup();
    phoneInput.value = 'abc123';
    toggleValidation({ phoneInput, phoneCC, phoneError, submitBtn, form, msgs });
    expect(phoneError.style.display).toBe('block');
    expect(submitBtn.disabled).toBe(true);
  });

  it('enables submit when data valid', () => {
    const { form, phoneInput, phoneCC, phoneError, submitBtn, msgs } = setup();
    phoneInput.value = '+4512345678';
    form.querySelector('[name="mt_name"]').value = 'John';
    form.querySelector('[name="mt_email"]').value = 'john@example.com';
    form.querySelector('[name="mt_consent"]').checked = true;
    toggleValidation({ phoneInput, phoneCC, phoneError, submitBtn, form, msgs });
    expect(phoneError.style.display).toBe('none');
    expect(submitBtn.disabled).toBe(false);
  });

  it('disables submit for invalid email', () => {
    const { form, phoneInput, phoneCC, phoneError, submitBtn, msgs } = setup();
    phoneInput.value = '+4512345678';
    form.querySelector('[name="mt_name"]').value = 'John';
    form.querySelector('[name="mt_email"]').value = 'invalid';
    form.querySelector('[name="mt_consent"]').checked = true;
    toggleValidation({ phoneInput, phoneCC, phoneError, submitBtn, form, msgs });
    expect(submitBtn.disabled).toBe(true);
  });
});
