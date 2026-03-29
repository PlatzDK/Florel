'use strict';

/**
 * Lightweight i18n (internationalisation) for Skovkrogen 37.
 *
 * Supported languages: Danish (da), English (en), German (de).
 *
 * Usage in HTML:
 *   <element data-i18n="key">Fallback text</element>
 *   <element data-i18n-html="key">Fallback with <br> tags</element>
 *   <input data-i18n-placeholder="key" placeholder="Fallback">
 *
 * The active language is persisted in localStorage under the key "lang".
 * On first visit the browser's preferred language is used, falling back to DA.
 *
 * Call window.setLang('en') to switch language programmatically.
 * Listen to the "langchange" CustomEvent on document for reactive updates.
 */

(function () {
    var SUPPORTED = ['da', 'en', 'de'];
    var DEFAULT = 'da';

    /* ------------------------------------------------------------------ */
    /* Translations                                                         */
    /* ------------------------------------------------------------------ */
    var translations = {

        /* ---- Danish -------------------------------------------------- */
        da: {
            'nav.about':      'Om stedet',
            'nav.gallery':    'Galleri',
            'nav.facilities': 'Faciliteter',
            'nav.book':       'Book Nu',

            'hero.tagline':     'Anglerens Fristed',
            'hero.title':       'The Karup Å',
            'hero.subtitle':    'Skovhyttens Skjulested',
            'hero.description': 'Direkte adgang til Skygge Å. Naturlig havørred &amp; bækørred på stedet.<br>20 km til Silkeborg.',
            'hero.scroll':      'Scroll',

            'about.title.pre':  'De',
            'about.title.main': 'Vigtigste',

            'about.water.label':    'Vand',
            'about.water.value':    'Skygge Å (Karup Å system) + Egen sø',
            'about.water.note':     'Fiskeret på grunden',

            'about.species.label':  'Arter',
            'about.species.value':  'Havørred, Bækørred',
            'about.species.note':   'Seriøst fiskeri for den øvede',

            'about.area.label':     'Område',
            'about.area.value':     '10+ Put &amp; Take søer &lt; 20 km',
            'about.area.note':      'Perfekt til backup eller begyndere',

            'about.tech.label':     'Tech',
            'about.tech.value':     'Ingen WiFi. Begrænset 4G',
            'about.tech.note':      'Medbring bøger, ikke PlayStation',

            'about.beds.label':     'Sovepladser',
            'about.beds.value':     '3 Værelser (2 senge pr. rum)',
            'about.beds.note':      'Ideelt til 4–6 voksne',

            'about.location.label': 'Lokation',
            'about.location.value': 'Isoleret i skov. 100% Ro.',
            'about.location.note':  'Kræver bil',

            'gallery.title':    'Galleri',
            'gallery.subtitle': '01 — STEMNING',
            'gallery.loading':  'Indlæser galleri…',
            'gallery.cat.living_room': 'Stue',
            'gallery.cat.kitchen':     'Køkken',
            'gallery.cat.rooms':       'Rum',
            'gallery.cat.nature':      'Natur',
            'gallery.cat.bathroom':    'Badeværelse',
            'gallery.cat.cover':       'Udvendig',

            'features.tagline':          'Designet til Lystfiskere',
            'features.cleaning.title':   'Rensestation',
            'features.cleaning.desc':    'Dedikeret udendørs facilitet med rindende vand og rustfrie ståloverflader. Falder naturligt ind i omgivelserne.',
            'features.freezer.title':    'Dybfryser',
            'features.freezer.desc':     'Industriel fryskapacitet sikrer, at dit fangst forbliver perfekt. Pålidelig og rummelig.',
            'features.drying.title':     'Gear-tørring',
            'features.drying.desc':      'Ventileret opbevaring til waders og stænger. Hold dit gear tørt og klar til morgenkastet.',

            'booking.title':           'Anmod om adgang',
            'booking.quote':           '"Vi værner om ro og privatliv – skriv til os for at høre om ledige perioder."',
            'booking.success.title':   'Forespørgsel modtaget',
            'booking.success.text':    'Tak for din henvendelse. Vi vender tilbage hurtigst muligt med en bekræftelse eller afslag – hold øje med din indbakke.',
            'booking.name':            'Navn',
            'booking.email':           'E-mail',
            'booking.phone':           'Telefon',
            'booking.checkin':         'Ankomst',
            'booking.checkout':        'Afrejse',
            'booking.guests.label':    'Antal gæster',
            'booking.guests.select':   'Vælg antal',
            'booking.guests.1':        '1 person',
            'booking.guests.2':        '2 personer',
            'booking.guests.3':        '3 personer',
            'booking.guests.4':        '4 personer',
            'booking.guests.5':        '5 personer',
            'booking.guests.6':        '6 personer',
            'booking.message.label':        'Besked (valgfri)',
            'booking.message.placeholder':  'Fortæl os gerne lidt om jer og jeres fiskeerfaring…',
            'booking.phone.placeholder':    '+45 12 34 56 78',
            'booking.submit':   'Send forespørgsel',
            'booking.sending':  'Sender…',
            'booking.error.server':  'Der opstod en fejl. Prøv venligst igen.',
            'booking.error.network': 'Kunne ikke oprette forbindelse til serveren. Tjek din internetforbindelse og prøv igen.',

            'footer.copyright': '© 2024 Skovkrogen',
            'footer.location':  'Silkeborg, Danmark',
        },

        /* ---- English ------------------------------------------------- */
        en: {
            'nav.about':      'About',
            'nav.gallery':    'Gallery',
            'nav.facilities': 'Facilities',
            'nav.book':       'Book Now',

            'hero.tagline':     "The Angler's Sanctuary",
            'hero.title':       'The Karup Å',
            'hero.subtitle':    'Tributary Hideaway',
            'hero.description': 'Direct access to Skygge Å. Native Brown Trout &amp; Sea Trout on location.<br>20 km to Silkeborg.',
            'hero.scroll':      'Scroll',

            'about.title.pre':  'The',
            'about.title.main': 'Stats',

            'about.water.label':    'Water',
            'about.water.value':    'Skygge Å (Karup Å system) + Private Lake',
            'about.water.note':     'Fishing rights on the property',

            'about.species.label':  'Species',
            'about.species.value':  'Sea Trout, Brown Trout',
            'about.species.note':   'Serious fishing for the experienced',

            'about.area.label':     'Area',
            'about.area.value':     '10+ Put &amp; Take lakes &lt; 20 km',
            'about.area.note':      'Perfect for backup or beginners',

            'about.tech.label':     'Tech',
            'about.tech.value':     'No WiFi. Limited 4G',
            'about.tech.note':      'Bring books, not PlayStation',

            'about.beds.label':     'Sleeping',
            'about.beds.value':     '3 Bedrooms (2 beds per room)',
            'about.beds.note':      'Ideal for 4–6 adults',

            'about.location.label': 'Location',
            'about.location.value': 'Secluded in forest. 100% Peace.',
            'about.location.note':  'Car required',

            'gallery.title':    'Gallery',
            'gallery.subtitle': '01 — ATMOSPHERE',
            'gallery.loading':  'Loading gallery…',
            'gallery.cat.living_room': 'Living Space',
            'gallery.cat.kitchen':     'Kitchen',
            'gallery.cat.rooms':       'Rooms',
            'gallery.cat.nature':      'Nature',
            'gallery.cat.bathroom':    'Bathroom',
            'gallery.cat.cover':       'Exterior',

            'features.tagline':          'Designed for Anglers',
            'features.cleaning.title':   'Cleaning Station',
            'features.cleaning.desc':    'Dedicated outdoor facility with running water and stainless steel surfaces. Blends into the surroundings.',
            'features.freezer.title':    'Deep Freeze',
            'features.freezer.desc':     'Industrial grade freezer capacity ensures your catch stays pristine. Reliable and spacious.',
            'features.drying.title':     'Gear Drying',
            'features.drying.desc':      'Ventilated storage for waders and rods. Keep your gear dry and ready for the morning cast.',

            'booking.title':           'Request Access',
            'booking.quote':           '"We cherish peace and privacy — write to us to hear about available periods."',
            'booking.success.title':   'Request received',
            'booking.success.text':    'Thank you for your enquiry. We will get back to you as soon as possible with a confirmation or decline — keep an eye on your inbox.',
            'booking.name':            'Name',
            'booking.email':           'E-mail',
            'booking.phone':           'Phone',
            'booking.checkin':         'Arrival',
            'booking.checkout':        'Departure',
            'booking.guests.label':    'Number of guests',
            'booking.guests.select':   'Select number',
            'booking.guests.1':        '1 person',
            'booking.guests.2':        '2 people',
            'booking.guests.3':        '3 people',
            'booking.guests.4':        '4 people',
            'booking.guests.5':        '5 people',
            'booking.guests.6':        '6 people',
            'booking.message.label':        'Message (optional)',
            'booking.message.placeholder':  'Tell us a little about yourselves and your fishing experience…',
            'booking.phone.placeholder':    '+45 12 34 56 78',
            'booking.submit':   'Send enquiry',
            'booking.sending':  'Sending…',
            'booking.error.server':  'An error occurred. Please try again.',
            'booking.error.network': 'Could not connect to the server. Check your internet connection and try again.',

            'footer.copyright': '© 2024 Skovkrogen',
            'footer.location':  'Silkeborg, Denmark',
        },

        /* ---- German -------------------------------------------------- */
        de: {
            'nav.about':      'Über uns',
            'nav.gallery':    'Galerie',
            'nav.facilities': 'Ausstattung',
            'nav.book':       'Jetzt Buchen',

            'hero.tagline':     'Das Angler-Refugium',
            'hero.title':       'The Karup Å',
            'hero.subtitle':    'Waldversteck am Fluss',
            'hero.description': 'Direkter Zugang zur Skygge Å. Heimische Meerforelle &amp; Bachforelle vor Ort.<br>20 km bis Silkeborg.',
            'hero.scroll':      'Scrollen',

            'about.title.pre':  'Die',
            'about.title.main': 'Fakten',

            'about.water.label':    'Gewässer',
            'about.water.value':    'Skygge Å (Karup-Å-System) + Privatsee',
            'about.water.note':     'Fischereirecht auf dem Grundstück',

            'about.species.label':  'Arten',
            'about.species.value':  'Meerforelle, Bachforelle',
            'about.species.note':   'Ernsthaftes Angeln für Erfahrene',

            'about.area.label':     'Umgebung',
            'about.area.value':     '10+ Put-&amp;-Take-Seen &lt; 20 km',
            'about.area.note':      'Ideal als Alternative oder für Anfänger',

            'about.tech.label':     'Technik',
            'about.tech.value':     'Kein WLAN. Eingeschränktes 4G',
            'about.tech.note':      'Bücher mitbringen, keine Spielkonsole',

            'about.beds.label':     'Schlafplätze',
            'about.beds.value':     '3 Zimmer (2 Betten pro Zimmer)',
            'about.beds.note':      'Ideal für 4–6 Erwachsene',

            'about.location.label': 'Lage',
            'about.location.value': 'Abgelegen im Wald. 100% Ruhe.',
            'about.location.note':  'Auto erforderlich',

            'gallery.title':    'Galerie',
            'gallery.subtitle': '01 — ATMOSPHÄRE',
            'gallery.loading':  'Galerie wird geladen…',
            'gallery.cat.living_room': 'Wohnraum',
            'gallery.cat.kitchen':     'Küche',
            'gallery.cat.rooms':       'Zimmer',
            'gallery.cat.nature':      'Natur',
            'gallery.cat.bathroom':    'Badezimmer',
            'gallery.cat.cover':       'Außenbereich',

            'features.tagline':          'Konzipiert für Angler',
            'features.cleaning.title':   'Reinigungsstation',
            'features.cleaning.desc':    'Dedizierte Außenanlage mit fließendem Wasser und Edelstahloberflächen. Fügt sich harmonisch in die Umgebung ein.',
            'features.freezer.title':    'Tiefkühlanlage',
            'features.freezer.desc':     'Industrielle Gefrierkapazität hält Ihren Fang in einwandfreiem Zustand. Zuverlässig und geräumig.',
            'features.drying.title':     'Ausrüstungstrocknung',
            'features.drying.desc':      'Belüfteter Stauraum für Wathosen und Ruten. Ausrüstung trocken und bereit für den Morgenauswurf.',

            'booking.title':           'Anfrage stellen',
            'booking.quote':           '"Wir schätzen Ruhe und Privatsphäre – schreiben Sie uns, um freie Zeiträume zu erfragen."',
            'booking.success.title':   'Anfrage eingegangen',
            'booking.success.text':    'Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich mit einer Bestätigung oder Absage – halten Sie Ihren Posteingang im Blick.',
            'booking.name':            'Name',
            'booking.email':           'E-Mail',
            'booking.phone':           'Telefon',
            'booking.checkin':         'Anreise',
            'booking.checkout':        'Abreise',
            'booking.guests.label':    'Anzahl der Gäste',
            'booking.guests.select':   'Anzahl wählen',
            'booking.guests.1':        '1 Person',
            'booking.guests.2':        '2 Personen',
            'booking.guests.3':        '3 Personen',
            'booking.guests.4':        '4 Personen',
            'booking.guests.5':        '5 Personen',
            'booking.guests.6':        '6 Personen',
            'booking.message.label':        'Nachricht (optional)',
            'booking.message.placeholder':  'Erzählen Sie uns etwas über sich und Ihre Angelerfahrung…',
            'booking.phone.placeholder':    '+45 12 34 56 78',
            'booking.submit':   'Anfrage senden',
            'booking.sending':  'Wird gesendet…',
            'booking.error.server':  'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
            'booking.error.network': 'Verbindung zum Server nicht möglich. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',

            'footer.copyright': '© 2024 Skovkrogen',
            'footer.location':  'Silkeborg, Dänemark',
        },
    };

    /* ------------------------------------------------------------------ */
    /* Language detection                                                   */
    /* ------------------------------------------------------------------ */
    function detectLang() {
        var stored = localStorage.getItem('lang');
        if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
        var browser = ((navigator.language || navigator.userLanguage || '').toLowerCase()).split('-')[0];
        if (SUPPORTED.indexOf(browser) !== -1) return browser;
        return DEFAULT;
    }

    /* ------------------------------------------------------------------ */
    /* Apply translations to DOM                                            */
    /* ------------------------------------------------------------------ */
    function applyLang(lang) {
        var t = translations[lang] || translations[DEFAULT];

        document.documentElement.lang = lang;

        /* Plain text */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.dataset.i18n;
            if (t[key] !== undefined) el.textContent = t[key];
        });

        /* HTML content (for strings that contain tags such as <br>) */
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.dataset.i18nHtml;
            if (t[key] !== undefined) el.innerHTML = t[key];
        });

        /* Placeholder attributes */
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.dataset.i18nPlaceholder;
            if (t[key] !== undefined) el.placeholder = t[key];
        });

        /* Language-switcher button states */
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            var active = btn.dataset.langBtn === lang;
            btn.classList.toggle('text-sand', active);
            btn.classList.toggle('font-bold', active);
            btn.classList.toggle('text-smoke', !active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        /* Expose for other scripts */
        window.__currentLang = lang;
        window.__i18n = t;

        localStorage.setItem('lang', lang);

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang, t: t } }));
    }

    /* ------------------------------------------------------------------ */
    /* Public API                                                           */
    /* ------------------------------------------------------------------ */
    window.setLang = function (lang) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        applyLang(lang);
    };

    document.addEventListener('DOMContentLoaded', function () {
        applyLang(detectLang());
    });
})();
