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

  const lang = (document.documentElement.lang || 'en').substring(0,2);
  const tpl = templates[lang] || templates.en;

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

  document.querySelectorAll('.mailto-prefill-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = {
        name: form.querySelector('[name="mt_name"]').value.trim(),
        email: form.querySelector('[name="mt_email"]').value.trim(),
        phone: form.querySelector('[name="mt_phone"]').value.trim(),
        arrival: form.querySelector('[name="mt_arrival"]').value,
        departure: form.querySelector('[name="mt_departure"]').value,
        guests: form.querySelector('[name="mt_guests"]').value,
        message: form.querySelector('[name="mt_message"]').value.trim(),
        consent: form.querySelector('[name="mt_consent"]').checked
      };
      if(!fields.name || !fields.email || !fields.consent){
        const s = form.querySelector('.mt-status'); if(s) s.textContent = 'Udfyld navn, e-mail og samtykke.';
        return;
      }
      // analytics (optional)
      try{ if(typeof gtag === 'function') gtag('event','mailto_initiated',{method:'prefill',lang}); }catch(e){}
      window.location.href = buildMailto(fields);
    });
  });

  document.querySelectorAll('.mailto-direct').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      try{ if(typeof gtag === 'function') gtag('event','mailto_clicked',{method:'direct',lang}); }catch(e){}
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(a.dataset.subject || tpl.subject)}`;
    });
  });
});

