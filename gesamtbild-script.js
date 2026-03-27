/* ================================================
   Lebendiges Gesamtbild — Interaction Script
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('gesamtbild-text-container');
    if (!textContainer) return;

    const bilderArea = document.getElementById('bilder-area');
    const mosaic = document.getElementById('bilder-mosaic');
    const backBtn = document.getElementById('bilder-back');
    const allViews = textContainer.querySelectorAll('.topic-view');
    const introView = textContainer.querySelector('[data-view="intro"]');
    const allCards = mosaic.querySelectorAll('.bilder-card');

    let activeBild = null;

    // --- Card click ---
    allCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.bilder-link')) return;

            const bild = card.dataset.bild;
            if (!bild) return;

            if (activeBild === bild) {
                showOverview();
                return;
            }

            openBild(bild);
        });
    });

    // --- Mini-list link click ---
    const allLinks = mosaic.querySelectorAll('.bilder-link');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const bild = link.dataset.bild;
            if (!bild) return;
            openBild(bild);
        });
    });

    // --- Back button ---
    backBtn.addEventListener('click', () => {
        showOverview();
    });

    function openBild(bild) {
        activeBild = bild;

        bilderArea.classList.add('has-active');
        allCards.forEach(card => {
            if (card.dataset.bild === bild) {
                card.classList.add('is-active');
                card.classList.remove('is-dimmed');
            } else {
                card.classList.add('is-dimmed');
                card.classList.remove('is-active');
            }
        });

        backBtn.classList.add('is-visible');
        showView(bild);
    }

    function showOverview() {
        activeBild = null;

        bilderArea.classList.remove('has-active');
        allCards.forEach(card => {
            card.classList.remove('is-active', 'is-dimmed');
        });

        backBtn.classList.remove('is-visible');

        hideAllViews();
        introView.classList.add('topic-view--active');
    }

    function showView(bild) {
        hideAllViews();
        const view = textContainer.querySelector(`[data-view="${bild}"]`);
        if (view) {
            view.classList.add('topic-view--active');
        }
    }

    function hideAllViews() {
        allViews.forEach(v => v.classList.remove('topic-view--active'));
    }

    // ================================================
    // TABS — within each topic-view
    // ================================================

    textContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.topic-tab');
        if (!tab) return;

        const tabNav = tab.closest('.topic-tabs');
        const topicView = tab.closest('.topic-view');
        if (!tabNav || !topicView) return;

        const tabName = tab.dataset.tab;
        if (!tabName) return;

        // Deactivate all tabs in this nav
        tabNav.querySelectorAll('.topic-tab').forEach(t => {
            t.classList.remove('topic-tab--active');
        });
        tab.classList.add('topic-tab--active');

        // Show the matching tab-content, hide others
        const scroll = topicView.querySelector('.topic-scroll');
        if (!scroll) return;

        scroll.querySelectorAll('.tab-content').forEach(tc => {
            tc.classList.remove('tab-content--active');
        });

        const target = scroll.querySelector(`[data-tab-content="${tabName}"]`);
        if (target) {
            target.classList.add('tab-content--active');
        }
    });

    // ================================================
    // ACCORDION — Perspektive panels (multi-open)
    // ================================================

    textContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.perspektive-panel__header');
        if (!header) return;

        const panel = header.closest('.perspektive-panel');
        if (!panel) return;

        const isOpen = panel.classList.contains('is-open');

        // Simply toggle the clicked panel
        if (isOpen) {
            panel.classList.remove('is-open');
            header.setAttribute('aria-expanded', 'false');
        } else {
            panel.classList.add('is-open');
            header.setAttribute('aria-expanded', 'true');
        }
    });
});
