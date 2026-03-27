/* ================================================
   Emotions-Atlas — Interaction Script
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('emotions-text-container');
    if (!textContainer) return;

    const svg = document.getElementById('emotions-svg');
    if (!svg) return;

    const topicTitle = document.getElementById('emotions-topic-title');
    const movementTitle = document.getElementById('emotions-movement-title');
    const introView = textContainer.querySelector('[data-view="intro"]');
    const genericDetailView = textContainer.querySelector('[data-view="topic-detail"]');
    const metaDetailView = textContainer.querySelector('[data-view="meta-detail"]');
    const baseMovementDetailView = textContainer.querySelector('[data-view="base-movement-detail"]');
    const allViews = textContainer.querySelectorAll('.topic-view');

    // Element type classification
    const baseMovements = new Set([
        'aktivierung', 'loslassen',
        'verdichtung', 'oeffnung',
        'zusammenziehen', 'ausdehnung'
    ]);

    const centerElements = new Set(['e-liebe']);

    const metaElements = new Set([
        'em-beruehrung', 'em-uebergang',
        'em-anhaftung', 'em-durchlass'
    ]);

    function getTopicType(topic) {
        if (centerElements.has(topic)) return 'center';
        if (metaElements.has(topic)) return 'meta';
        if (baseMovements.has(topic)) return 'base_movement';
        return 'emotion';
    }

    // Nice display names for data-topic values
    const displayNames = {
        // Inner ring (3 polarity pairs)
        'aktivierung': 'Aktivierung',
        'loslassen': 'Loslassen',
        'verdichtung': 'Verdichtung',
        'oeffnung': 'Öffnung',
        'zusammenziehen': 'Zusammenziehen',
        'ausdehnung': 'Ausdehnung',
        // Outer ring
        'trauer': 'Trauer',
        'freude': 'Freude',
        'angst': 'Angst',
        'wut': 'Wut',
        'zorn': 'Zorn',
        'scham': 'Scham',
        'dankbarkeit': 'Dankbarkeit',
        'sehnsucht': 'Sehnsucht',
        'beruehrtheit': 'Berührtheit',
        'neugier': 'Neugier',
        'hoffnung': 'Hoffnung',
        // Center
        'e-liebe': 'Liebe',
        // Meta-Ebene
        'em-beruehrung': 'Berührung',
        'em-uebergang': 'Übergang',
        'em-anhaftung': 'Anhaftung',
        'em-durchlass': 'Durchlass'
    };

    let activeTopic = null;

    // --- Node click ---
    const allNodes = svg.querySelectorAll('.atlas-node');

    allNodes.forEach(node => {
        node.addEventListener('click', () => {
            const topic = node.dataset.topic;
            if (!topic) return;

            // Toggle: clicking same node again returns to intro
            if (activeTopic === topic) {
                showIntro();
                return;
            }

            activeTopic = topic;
            showDetail(topic);
            highlightNode(topic);
        });
    });

    // --- Tab switching (delegated to container) ---
    textContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.topic-tab');
        if (!tab) return;

        // Find the parent view of this tab
        const parentView = tab.closest('.topic-view');
        if (!parentView) return;

        const target = tab.dataset.tab;
        const tabs = parentView.querySelectorAll('.topic-tab');
        const tabContents = parentView.querySelectorAll('.tab-content');

        tabs.forEach(t => t.classList.remove('topic-tab--active'));
        tab.classList.add('topic-tab--active');
        tabContents.forEach(tc => {
            tc.classList.toggle('tab-content--active', tc.dataset.tabContent === target);
        });
    });

    function hideAllViews() {
        allViews.forEach(v => v.classList.remove('topic-view--active'));
    }

    function resetTabs(view) {
        const tabs = view.querySelectorAll('.topic-tab');
        const tabContents = view.querySelectorAll('.tab-content');
        tabs.forEach(t => t.classList.remove('topic-tab--active'));
        if (tabs[0]) tabs[0].classList.add('topic-tab--active');
        tabContents.forEach(tc => tc.classList.remove('tab-content--active'));
        if (tabContents[0]) tabContents[0].classList.add('tab-content--active');
    }

    function showIntro() {
        activeTopic = null;
        hideAllViews();
        introView.classList.add('topic-view--active');
        clearHighlights();
    }

    function showDetail(topic) {
        hideAllViews();

        // Check if a dedicated view exists for this topic
        const dedicatedView = textContainer.querySelector(`[data-view="${topic}"]`);

        if (dedicatedView) {
            dedicatedView.classList.add('topic-view--active');
            resetTabs(dedicatedView);
        } else {
            // Use type-appropriate fallback
            const type = getTopicType(topic);

            if (type === 'base_movement' && baseMovementDetailView) {
                baseMovementDetailView.classList.add('topic-view--active');
                movementTitle.textContent = displayNames[topic] || topic;
                resetTabs(baseMovementDetailView);
            } else if (type === 'meta' && metaDetailView) {
                metaDetailView.classList.add('topic-view--active');
                const metaTitle = metaDetailView.querySelector('.text-column__title');
                if (metaTitle) metaTitle.textContent = displayNames[topic] || topic;
                resetTabs(metaDetailView);
            } else {
                genericDetailView.classList.add('topic-view--active');
                topicTitle.textContent = displayNames[topic] || topic;
                resetTabs(genericDetailView);
            }
        }
    }

    // Counter-pole mapping for Grund-Bewegungen
    const counterPoles = {
        'aktivierung': 'loslassen',
        'loslassen': 'aktivierung',
        'verdichtung': 'oeffnung',
        'oeffnung': 'verdichtung',
        'zusammenziehen': 'ausdehnung',
        'ausdehnung': 'zusammenziehen'
    };

    // Emotion to Basic Movements mapping
    const emotionToMovements = {
        'trauer': ['verdichtung', 'loslassen', 'zusammenziehen'],
        'freude': ['oeffnung', 'ausdehnung', 'aktivierung'],
        'angst': ['aktivierung', 'zusammenziehen', 'verdichtung'],
        'wut': ['aktivierung', 'ausdehnung', 'verdichtung'],
        'zorn': ['aktivierung', 'ausdehnung', 'verdichtung'],
        'scham': ['verdichtung', 'zusammenziehen', 'loslassen'],
        'dankbarkeit': ['verdichtung', 'oeffnung', 'loslassen'],
        'sehnsucht': ['verdichtung', 'ausdehnung', 'aktivierung'],
        'beruehrtheit': ['verdichtung', 'oeffnung', 'loslassen'],
        'neugier': ['aktivierung', 'oeffnung', 'ausdehnung'],
        'hoffnung': ['oeffnung', 'ausdehnung', 'aktivierung']
    };

    function highlightNode(topic) {
        clearHighlights();
        svg.classList.add('has-active');

        // Add category class to SVG for structural prominence control
        if (topic.startsWith('em-')) {
            svg.classList.add('has-active-meta');
        }

        const counterPole = counterPoles[topic] || null;
        const relatedMovements = emotionToMovements[topic] || [];

        allNodes.forEach(node => {
            const nodeTopic = node.dataset.topic;
            if (nodeTopic === topic) {
                node.classList.add('is-active');
            } else if (counterPole && nodeTopic === counterPole) {
                node.classList.add('is-counter-pole');
            } else if (relatedMovements.includes(nodeTopic)) {
                node.classList.add('is-counter-pole'); // Reuse styling for now as requested
            } else {
                node.classList.add('is-dimmed');
            }
        });
    }

    function clearHighlights() {
        svg.classList.remove('has-active', 'has-active-meta');
        allNodes.forEach(node => {
            node.classList.remove('is-active', 'is-dimmed', 'is-counter-pole');
        });
    }

    // --- Click on empty SVG area to deselect ---
    svg.addEventListener('click', (e) => {
        if (e.target === svg || e.target.tagName === 'circle' && e.target.classList.contains('ring-whisper')) {
            showIntro();
        }
    });
});

