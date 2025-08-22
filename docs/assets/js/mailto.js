// docs/assets/js/mailto.js
// Prefill + mailto builder with obfuscated recipient, multi-language templates and GA event.
//
// USAGE:
// - Include <script src="../assets/js/mailto.js"></script> before </body> for pages in docs/<lang>/.
// - Use HTML blocks (see tasks) for the UI placement.

document.addEventListener('DOMContentLoaded', () => {
  // Configure recipient parts here (no cleartext email in HTML)
  const recipientUser = 'info';
  const recipientDomain = 'florelfiskeri.dk';
  const recipient = recipientUser + '@' + recipientDomain;

  // Templates per language (subject + intro)
  const templates = {
    da: {
      subject: 'Reservationsforespørgsel - Florel',
      intro: 'Hej,%0D%0AJeg%20vil%20gerne%20foresp%C3%B8rge%20om%20reservation%20af%20sommerhuset.%0D%0A%0D%0A'
    },
    en: {
      subject: 'Reservation request - Florel',
      intro: 'Hello,%0D%0AI%20would%20like%20to%20inquire%20about%20booking%20the%20cabin.%0D%0A%0D%0A'
    },
    de: {
      subject: 'Buchungsanfrage - Florel',
      intro: 'Guten%20Tag,%0D%0AIch%20moechte%20eine%20Anfrage%20zur%20Buchung%20des%20Ferienhauses%20stellen.%0D%0A%0D%0A'
    }
  };

  const lang = (document.documentElement.lang || 'en').substring(0,2);
  const tpl = templates[lang] || templates.en;

  // Helper: build structured body and open mail client
  function openMailFromFields(fields) {
    // minimal validation
    if (!fields.name || !fields.email || !fields.consent) {
      return { ok: false, message: 'Udfyld venligst navn, email og accept.' };
    }

    // build body lines (use encodeURIComponent per value)
    const enc = (s) => encodeURIComponent(String(s || '')).replace(/%20/g, '+');
    let body = tpl.intro;
    body += 'Navn: ' + enc(fields.name) + '%0D%0A';
    body += 'Email: ' + enc(fields.email) + '%0D%0A';
    if (fields.phone) body += 'Telefon: ' + enc(fields.phone) + '%0D%0A';
    if (fields.arrival) body += 'Ankomst: ' + enc(fields.arrival) + '%0D%0A';
    if (fields.departure) body += 'Afrejse: ' + enc(fields.departure) + '%0D%0A';
    if (fields.guests) body += 'Gæster: ' + enc(fields.guests) + '%0D%0A';
    if (fields.message) body += '%0D%0A' + enc(fields.message) + '%0D%0A';
    body += '%0D%0A---%0D%0AJeg+accepterer+at+mine+oplysninger+behandles+af+Florel.';

    const subject = encodeURIComponent(tpl.subject);
    const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // analytics: try send gtag event if available
    try { if (typeof gtag === 'function') gtag('event', 'mailto_initiated', { method: 'prefill', lang }); } catch(e){}

    // open mail client
    window.location.href = mailto;
    return { ok: true, message: 'Opening mail client' };
  }

  // Attach handlers for any .mailto-prefill forms on the page
  document.querySelectorAll('.mailto-prefill-form').forEach(form => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const fields = {
        name: form.querySelector('[name="mt_name"]')?.value || '',
        email: form.querySelector('[name="mt_email"]')?.value || '',
        phone: form.querySelector('[name="mt_phone"]')?.value || '',
        arrival: form.querySelector('[name="mt_arrival"]')?.value || '',
        departure: form.querySelector('[name="mt_departure"]')?.value || '',
        guests: form.querySelector('[name="mt_guests"]')?.value || '',
        message: form.querySelector('[name="mt_message"]')?.value || '',
        consent: form.querySelector('[name="mt_consent"]')?.checked || false
      };
      const res = openMailFromFields(fields);
      const status = form.querySelector('.mt-status');
      if (status) status.textContent = res.message;
    });
  });

  // Attach handlers for any simple mailto direct links (.mailto-direct)
  document.querySelectorAll('.mailto-direct').forEach(a => {
    a.addEventListener('click', (e) => {
      // send analytics
      try { if (typeof gtag === 'function') gtag('event', 'mailto_clicked', { method: 'direct', lang }); } catch(e){}
      // recipient still constructed in JS: replace placeholder href if any
      if (a.dataset.recipient === 'obfuscated') {
        e.preventDefault();
        a.href = 'mailto:' + recipient + (a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : '');
        window.location.href = a.href;
      }
    });
  });

});

