'use strict';

/**
 * Mobile navigation for Skovkrogen 37.
 *
 * Toggles the fullscreen mobile menu overlay on small screens.
 * Closes on: close button click, nav link click, or Escape key.
 * Traps keyboard focus within the overlay while it is open.
 */

(function () {
    const menuBtn = document.getElementById('nav-menu-btn');
    const menu = document.getElementById('nav-mobile');
    const closeBtn = document.getElementById('nav-close-btn');

    if (!menuBtn || !menu) return;

    let isOpen = false;

    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusable() {
        return Array.from(menu.querySelectorAll(FOCUSABLE));
    }

    function trapFocus(e) {
        if (e.key !== 'Tab') return;
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    function openMenu() {
        if (isOpen) return;
        isOpen = true;
        menu.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        menu.addEventListener('keydown', trapFocus);
        if (closeBtn) closeBtn.focus();
    }

    // restoreFocus controls whether the trigger regains focus on close.
    // Pass false when a nav link was clicked, so focus moves naturally to the
    // target section rather than jumping back to the hamburger button.
    function closeMenu(restoreFocus) {
        if (!isOpen) return;
        isOpen = false;
        menu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menu.removeEventListener('keydown', trapFocus);
        if (restoreFocus !== false) menuBtn.focus();
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', function () { closeMenu(true); });

    // Nav link clicks: close menu without stealing focus from the target section
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { closeMenu(false); });
    });

    // Close on Escape key — always restore focus to trigger
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closeMenu(true);
    });
})();
