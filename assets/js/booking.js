'use strict';

/**
 * Booking form handler for Skovkrogen 37.
 *
 * Submits the form as JSON to the booking API and shows inline
 * success / error feedback without a full page reload.
 *
 * The API URL is read from the form's `data-api-url` attribute so it can be
 * changed per environment without modifying this script:
 *
 *   <form id="booking-form" data-api-url="https://booking.skovkrogen.dk" …>
 */

(function () {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const apiUrl = (form.dataset.apiUrl || '').replace(/\/$/, '');
    if (!apiUrl) {
        console.warn('Booking form: data-api-url attribute is missing.');
        return;
    }

    const submitBtn = document.getElementById('booking-submit');
    const submitText = document.getElementById('booking-submit-text');
    const spinner = document.getElementById('booking-spinner');
    const successBox = document.getElementById('booking-success');
    const errorBox = document.getElementById('booking-error');
    const errorText = document.getElementById('booking-error-text');

    // Set minimum selectable date to today for both date fields
    const today = new Date().toISOString().split('T')[0];
    const checkinEl = document.getElementById('bf-checkin');
    const checkoutEl = document.getElementById('bf-checkout');
    if (checkinEl) checkinEl.setAttribute('min', today);
    if (checkoutEl) checkoutEl.setAttribute('min', today);

    // Keep checkout min in sync with checkin selection
    if (checkinEl && checkoutEl) {
        checkinEl.addEventListener('change', function () {
            checkoutEl.setAttribute('min', this.value || today);
            if (checkoutEl.value && checkoutEl.value <= this.value) {
                checkoutEl.value = '';
            }
        });
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Honeypot check – if the hidden text field has a value, it's a bot
        const honeypot = form.elements['website'];
        if (honeypot && honeypot.value) return;

        hideMessages();
        setLoading(true);

        const body = {
            name: getValue('name'),
            email: getValue('email'),
            phone: getValue('phone'),
            checkin: getValue('checkin'),
            checkout: getValue('checkout'),
            guests: getValue('guests'),
            message: getValue('message'),
            website: getValue('website'),
        };

        try {
            const res = await fetch(`${apiUrl}/api/booking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                form.classList.add('hidden');
                successBox.classList.remove('hidden');
            } else {
                const t = window.__i18n || {};
                showError(data.error || t['booking.error.server'] || 'An error occurred. Please try again.');
            }
        } catch {
            const t = window.__i18n || {};
            showError(t['booking.error.network'] || 'Could not connect to the server. Check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    });

    function getValue(name) {
        const el = form.elements[name];
        return el ? el.value.trim() : '';
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        const t = window.__i18n || {};
        submitText.textContent = loading
            ? (t['booking.sending'] || 'Sending…')
            : (t['booking.submit'] || 'Send enquiry');
        spinner.classList.toggle('hidden', !loading);
    }

    function hideMessages() {
        errorBox.classList.add('hidden');
        errorText.textContent = '';
    }

    function showError(msg) {
        errorText.textContent = msg;
        errorBox.classList.remove('hidden');
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
})();
