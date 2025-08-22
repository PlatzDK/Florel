// docs/assets/js/mailto.js
document.addEventListener('DOMContentLoaded', () => {
  const recipientUser = 'info';    // EDIT: change here if needed
  const recipientDomain = 'florelfiskeri.dk';
  const recipient = recipientUser + '@' + recipientDomain;

  const templates = {
    da: { subject: 'Reservationsforespørgsel - Florel', intro: 'Hej,%0D%0AJeg vil gerne foresp%C3%B8rge om reservation af sommerhuset.%0D%0A%0D%0A' },
    en: { subject: 'Reservation request - Florel', intro: 'Hello,%0D%0AI would like to inquire about booking the cabin.%0D%0A%0D%0A' },
    de: { subject: 'Buchungsanfrage - Florel', intro: 'Guten Tag,%0D%0AIch moechte eine Anfrage zur Buchung des Ferienhauses stellen.%0D%0A%0D%0A' }
  };

  const messages = {
    da: {
      invalidPhone: 'Ugyldigt telefonnummer. Brug kun cifre og start med landekode (fx +45).',
      missing: 'Udfyld navn, e-mail og accepter behandlingen.',
      invalidEmail: 'Ugyldig e-mail-adresse.'
    },
    en: {
      invalidPhone: 'Invalid phone number. Use only digits and start with country code (e.g. +45).',
      missing: 'Please fill name, email and accept processing.',
      invalidEmail: 'Invalid email address.'
    },
    de: {
      invalidPhone: 'Ungültige Telefonnummer. Verwenden Sie nur Ziffern und beginnen Sie mit der Ländervorwahl (z.B. +45).',
      missing: 'Bitte Name, E-Mail und Zustimmung ausfüllen.',
      invalidEmail: 'Ungültige E-Mail-Adresse.'
    }
  };

  const lang = (document.documentElement.lang || 'en').substring(0,2);
  const tpl = templates[lang] || templates.en;
  const msgs = messages[lang] || messages.en;

  function encode(s){ return encodeURIComponent(String(s || '')).replace(/%20/g, '+'); }

  function buildMailto(fields) {
    let body = tpl.intro;
    body += `Name: ${encode(fields.name)}%0D%0A`;
    body += `Email: ${encode(fields.email)}%0D%0A`;
    if(fields.phone) body += `Phone: ${encode(fields.phone)}%0D%0A`;
    if(fields.arrival) body += `Arrival: ${encode(fields.arrival)}%0D%0A`;
    if(fields.departure) body += `Departure: ${encode(fields.departure)}%0D%0A`;
    if(fields.guests) body += `Guests: ${encode(fields.guests)}%0D%0A`;
    if(fields.message) body += `%0D%0A${encode(fields.message)}%0D%0A`;
    body += `%0D%0A---%0D%0AI have given consent to process this data.`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(tpl.subject)}&body=${body}`;
    return mailto;
  }

  // phone validation & submit enhancement
  document.querySelectorAll('.mailto-prefill-form').forEach(form => {
    const phoneInput = form.querySelector('#mt_phone');
    const phoneCC = form.querySelector('#mt_phone_cc');
    const phoneError = form.querySelector('#mt_phone_error');
    const submitBtn = form.querySelector('.mt-submit');
    const status = form.querySelector('.mt-status');

    function normalizePhone(s) {
      return String(s || '').replace(/[^\d+]/g, '');
    }

    function isValidPhoneNumber(number) {
      if (!number) return false;
      if (/^\+\d{6,15}$/.test(number)) return true;
      if (/^\d{6,15}$/.test(number)) return true;
      return false;
    }

    function isValidEmail(email) {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email || '').trim());
    }

    const toggleValidation = () => {
      const val = phoneInput.value.trim();
      const cc = phoneCC.value.trim();
      let full = val;
      if (cc && cc.startsWith('+') && !val.startsWith('+')) {
        full = cc + val.replace(/^\+/, '');
      }
      const norm = normalizePhone(full);
      const nameOk = !!(form.querySelector('[name="mt_name"]').value||'').trim();
      const emailVal = (form.querySelector('[name="mt_email"]').value||'').trim();
      const emailOk = isValidEmail(emailVal);
      const consentOk = !!(form.querySelector('[name="mt_consent"]').checked);
      if (norm && !isValidPhoneNumber(norm)) {
        phoneError.textContent = msgs.invalidPhone;
        phoneError.style.display = 'block';
      } else {
        phoneError.style.display = 'none';
      }
      submitBtn.disabled = !(nameOk && emailOk && consentOk && (norm === '' || isValidPhoneNumber(norm)));
      submitBtn.style.opacity = submitBtn.disabled ? 0.5 : 1;
    };

    phoneInput.addEventListener('input', toggleValidation);
    phoneCC.addEventListener('change', toggleValidation);
    form.querySelectorAll('[name="mt_name"], [name="mt_email"], [name="mt_consent"]').forEach(el => {
      el.addEventListener('input', toggleValidation);
      el.addEventListener('change', toggleValidation);
    });
    toggleValidation();

    if (!form._mailtoBound) {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        status.textContent = '';
        const name = (form.querySelector('#mt_name').value || '').trim();
        const email = (form.querySelector('#mt_email').value || '').trim();
        const phoneVal = (form.querySelector('#mt_phone').value || '').trim();
        const cc = (form.querySelector('#mt_phone_cc').value || '').trim();
        let phoneFull = phoneVal;
        if (cc && cc.startsWith('+') && !phoneVal.startsWith('+')) phoneFull = cc + phoneVal.replace(/^\+/, '');
        phoneFull = normalizePhone(phoneFull);

        const consent = !!form.querySelector('#mt_consent').checked;
        if (!name || !email || !consent) {
          status.textContent = msgs.missing;
          return;
        }
        if (!isValidEmail(email)) {
          status.textContent = msgs.invalidEmail;
          return;
        }
        if (phoneFull && !isValidPhoneNumber(phoneFull)) {
          phoneError.textContent = msgs.invalidPhone;
          phoneError.style.display = 'block';
          return;
        }
        phoneError.style.display = 'none';

        const fields = {
          name,
          email,
          phone: phoneFull,
          arrival: form.querySelector('#mt_arrival').value,
          departure: form.querySelector('#mt_departure').value,
          guests: form.querySelector('#mt_guests').value,
          message: form.querySelector('#mt_message').value.trim()
        };

        try { if (typeof gtag === 'function') gtag('event','mailto_sent',{method:'prefill',lang}); } catch(e){}
        window.location.href = buildMailto(fields);
      });
      form._mailtoBound = true;
    }
  });

  document.querySelectorAll('.mailto-direct').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      try{ if(typeof gtag === 'function') gtag('event','mailto_clicked',{method:'direct',lang}); }catch(e){}
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(a.dataset.subject || tpl.subject)}`;
    });
  });
});

