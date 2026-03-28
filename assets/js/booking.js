document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const checkInInput = form.querySelector('[name="check_in"]');
    const checkOutInput = form.querySelector('[name="check_out"]');
    const submitBtn = document.getElementById('booking-submit');

    // Set minimum selectable date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // When check-in changes, push check-out minimum to the next day
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', () => {
            if (!checkInInput.value) return;
            const next = new Date(checkInInput.value);
            next.setDate(next.getDate() + 1);
            const nextStr = next.toISOString().split('T')[0];
            checkOutInput.min = nextStr;
            if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
                checkOutInput.value = '';
            }
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Rely on native HTML constraint validation for required/email fields
        if (!form.reportValidity()) return;

        // Extra date logic: check-out must be strictly after check-in
        if (checkInInput && checkOutInput &&
            checkInInput.value && checkOutInput.value &&
            checkOutInput.value <= checkInInput.value) {
            showFormMessage('Check-out date must be after check-in date.', 'error');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(form)
            });
            const result = await response.json();

            if (result.success) {
                showFormMessage(
                    'Your request has been sent! We\u2019ll be in touch within 24\u00a0hours.',
                    'success'
                );
                form.reset();
                if (checkInInput) checkInInput.min = today;
                if (checkOutInput) checkOutInput.min = today;
            } else {
                showFormMessage(
                    result.message || 'Something went wrong. Please try again.',
                    'error'
                );
            }
        } catch (err) {
            console.error('Booking form submission error:', err);
            showFormMessage(
                'Unable to send your request. Please try again or contact us directly.',
                'error'
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    function showFormMessage(message, type) {
        const existing = document.getElementById('form-message');
        if (existing) existing.remove();

        const msg = document.createElement('p');
        msg.id = 'form-message';
        msg.textContent = message;
        const isSuccess = type === 'success';
        msg.className = [
            'text-center text-sm tracking-wider py-4 px-6 mt-2 border',
            isSuccess
                ? 'text-copper border-copper/30 bg-copper/5'
                : 'text-rust border-rust/30 bg-rust/5'
        ].join(' ');

        const footer = form.querySelector('.booking-form-footer');
        if (footer) {
            footer.after(msg);
        } else {
            form.appendChild(msg);
        }

        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
