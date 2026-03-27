/* ================================================
   Bewusstseins-Atlas — Interactions
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const svg = document.getElementById('atlas-svg');
    const textContainer = document.getElementById('text-container');
    const allNodes = svg.querySelectorAll('.atlas-node[data-topic]');
    const identityFrame = document.getElementById('identity-frame');
    const beziehungsfaeden = document.getElementById('beziehungsfaeden');

    let activeTopic = null;

    // ------------------------------------------------
    // Topic selection (click on SVG node)
    // ------------------------------------------------

    allNodes.forEach(node => {
        node.addEventListener('click', () => {
            const topic = node.dataset.topic;

            // If clicking the same topic again, deselect → return to intro
            if (activeTopic === topic) {
                deactivateTopic();
                return;
            }

            activateTopic(topic, node);
        });

        // Keyboard support
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                node.click();
            }
        });
    });

    // ------------------------------------------------
    // Identity frame click
    // ------------------------------------------------

    if (identityFrame) {
        identityFrame.addEventListener('click', (e) => {
            e.stopPropagation();
            const topic = identityFrame.dataset.topic;

            if (activeTopic === topic) {
                deactivateTopic();
                return;
            }

            activateIdentity(topic);
        });

        identityFrame.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                identityFrame.click();
            }
        });
    }

    function activateIdentity(topic) {
        activeTopic = topic;

        // Clear regular node states
        svg.classList.remove('has-active');
        allNodes.forEach(n => n.classList.remove('is-active'));

        // Set identity-specific state
        svg.classList.add('has-active-identity');
        identityFrame.classList.add('is-active');

        // Switch text view
        const views = textContainer.querySelectorAll('.topic-view');
        views.forEach(v => v.classList.remove('topic-view--active'));

        const targetView = textContainer.querySelector(`[data-view="${topic}"]`);
        if (targetView) {
            targetView.classList.add('topic-view--active');
            const firstTab = targetView.querySelector('.topic-tab');
            if (firstTab) switchTab(targetView, firstTab.dataset.tab);
        } else {
            const introView = textContainer.querySelector('[data-view="intro"]');
            introView.classList.add('topic-view--active');
        }

        textContainer.scrollTop = 0;

        // Show Beziehungsfäden for identity
        updateBeziehungsfaeden('identitaet');
    }

    function activateTopic(topic, node) {
        activeTopic = topic;

        // Clear identity state
        svg.classList.remove('has-active-identity');
        if (identityFrame) identityFrame.classList.remove('is-active');

        // SVG: add active class
        svg.classList.add('has-active');
        allNodes.forEach(n => n.classList.remove('is-active'));
        node.classList.add('is-active');

        // Text: switch to topic view
        const views = textContainer.querySelectorAll('.topic-view');
        views.forEach(v => v.classList.remove('topic-view--active'));

        const targetView = textContainer.querySelector(`[data-view="${topic}"]`);
        if (targetView) {
            targetView.classList.add('topic-view--active');

            // Reset tabs to first tab
            const firstTab = targetView.querySelector('.topic-tab');
            if (firstTab) {
                switchTab(targetView, firstTab.dataset.tab);
            }
        } else {
            // No specific view yet → show intro with a note
            const introView = textContainer.querySelector('[data-view="intro"]');
            introView.classList.add('topic-view--active');
        }

        // Scroll text container to top
        textContainer.scrollTop = 0;

        // Show/hide Beziehungsfäden
        updateBeziehungsfaeden(topic);
    }

    function deactivateTopic() {
        activeTopic = null;

        // SVG: remove all active states
        svg.classList.remove('has-active');
        svg.classList.remove('has-active-identity');
        allNodes.forEach(n => n.classList.remove('is-active'));
        if (identityFrame) identityFrame.classList.remove('is-active');

        // Text: return to intro
        const views = textContainer.querySelectorAll('.topic-view');
        views.forEach(v => v.classList.remove('topic-view--active'));

        const introView = textContainer.querySelector('[data-view="intro"]');
        introView.classList.add('topic-view--active');

        textContainer.scrollTop = 0;

        // Hide Beziehungsfäden
        updateBeziehungsfaeden(null);
    }

    // ------------------------------------------------
    // Beziehungsfäden — show/hide relationship lines
    // ------------------------------------------------

    // Relationship map
    const beziehungsMap = {
        selbstbeziehung: {
            stabilisiert: ['sicherheit', 'wuerdigkeit', 'liebe'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['freiheit'],
            genaehrt: ['identitaet']
        },
        identitaet: {
            stabilisiert: ['selbstbeziehung'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['selbstbeziehung', 'freiheit']
        },
        wuerdigkeit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['zugehoerigkeit', 'liebe', 'sicherheit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['freiheit', 'reichtum']
        },
        sicherheit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['wuerdigkeit', 'liebe', 'zugehoerigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['vertrauen', 'gelassenheit']
        },
        liebe: {
            genaehrt: ['identitaet'],
            stabilisiert: ['sicherheit', 'wuerdigkeit', 'zugehoerigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['empfaenglichkeit', 'hingabe']
        },
        freiheit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['wuerdigkeit', 'sicherheit', 'liebe'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['leichtigkeit', 'kreativitaet']
        },
        zugehoerigkeit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['liebe', 'sicherheit', 'wuerdigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['gelassenheit', 'empfaenglichkeit']
        },
        leichtigkeit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['freiheit', 'sicherheit', 'wuerdigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['vitalitaet', 'gelassenheit']
        },
        vitalitaet: {
            genaehrt: ['identitaet'],
            stabilisiert: ['wuerdigkeit', 'sicherheit', 'liebe', 'freiheit'],
            erkennbar: ['gesundheit'],
            spuerbar: ['leichtigkeit', 'reichtum']
        },
        vertrauen: {
            genaehrt: ['identitaet'],
            stabilisiert: ['sicherheit', 'wuerdigkeit', 'liebe'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['gelassenheit', 'hingabe']
        },
        gelassenheit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['sicherheit', 'vertrauen', 'zugehoerigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['leichtigkeit', 'hingabe']
        },
        reichtum: {
            genaehrt: ['identitaet'],
            stabilisiert: ['wuerdigkeit', 'sicherheit', 'empfaenglichkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['fuelle', 'vertrauen']
        },
        gesundheit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['sicherheit', 'liebe', 'freiheit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['vitalitaet', 'leichtigkeit']
        },
        empfaenglichkeit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['liebe', 'sicherheit', 'zugehoerigkeit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['kreativitaet', 'reichtum']
        },
        fuelle: {
            genaehrt: ['identitaet'],
            stabilisiert: ['reichtum', 'empfaenglichkeit', 'gelassenheit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['vertrauen', 'hingabe']
        },
        kreativitaet: {
            genaehrt: ['identitaet'],
            stabilisiert: ['freiheit', 'empfaenglichkeit', 'sicherheit'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['fuelle', 'leichtigkeit']
        },
        hingabe: {
            genaehrt: ['identitaet'],
            stabilisiert: ['vertrauen', 'gelassenheit', 'liebe'],
            erkennbar: ['wahrnehmung'],
            spuerbar: ['leichtigkeit', 'fuelle']
        },
        wahrnehmung: {
            genaehrt: ['identitaet'],
            stabilisiert: ['sicherheit', 'gelassenheit', 'selbstbeziehung'],
            erkennbar: ['emotion', 'stimmigkeit'],
            spuerbar: ['stimmigkeit', 'ideen']
        },
        emotion: {
            genaehrt: ['identitaet'],
            stabilisiert: ['liebe', 'sicherheit', 'selbstbeziehung'],
            erkennbar: ['wahrnehmung', 'stimmigkeit'],
            spuerbar: ['stimmigkeit', 'ideen']
        },
        stimmigkeit: {
            genaehrt: ['identitaet'],
            stabilisiert: ['selbstbeziehung', 'gelassenheit', 'freiheit'],
            erkennbar: ['wahrnehmung', 'emotion'],
            spuerbar: ['ideen']
        },
        ideen: {
            genaehrt: ['identitaet'],
            stabilisiert: ['stimmigkeit', 'freiheit', 'empfaenglichkeit'],
            erkennbar: ['wahrnehmung', 'emotion'],
            spuerbar: ['kreativitaet']
        }
    };

    function updateBeziehungsfaeden(topic) {
        if (!beziehungsfaeden) return;

        // Always clear previous highlights and group visibility
        clearBeziehungHighlights();
        const groups = beziehungsfaeden.querySelectorAll('.bezug-group');
        groups.forEach(g => g.classList.remove('is-active'));

        if (topic && beziehungsMap[topic]) {
            beziehungsfaeden.classList.add('beziehungsfaeden--visible');

            // Show specific group for this topic
            const activeGroup = beziehungsfaeden.querySelector(`.bezug-group[data-for="${topic}"]`);
            if (activeGroup) activeGroup.classList.add('is-active');

            applyBeziehungHighlights(beziehungsMap[topic]);
        } else {
            beziehungsfaeden.classList.remove('beziehungsfaeden--visible');
        }
    }

    function applyBeziehungHighlights(map) {
        for (const [type, topics] of Object.entries(map)) {
            topics.forEach(t => {
                if (t === 'identitaet') {
                    // Color the identity frame and its direct children for reliable SVG styling
                    if (identityFrame) {
                        identityFrame.classList.add(`bezug-highlight--${type}`);
                        const rect = identityFrame.querySelector('.identity-frame__rect');
                        const text = identityFrame.querySelector('.identity-frame__label');
                        if (rect) rect.classList.add(`bezug-highlight--${type}`);
                        if (text) text.classList.add(`bezug-highlight--${type}`);
                    }
                } else {
                    // Color the atlas node
                    const node = svg.querySelector(`.atlas-node[data-topic="${t}"]`);
                    if (node) {
                        node.classList.add(`bezug-highlight--${type}`);
                    }
                }
            });
        }
    }

    function clearBeziehungHighlights() {
        const highlightClasses = [
            'bezug-highlight--stabilisiert',
            'bezug-highlight--erkennbar',
            'bezug-highlight--spuerbar',
            'bezug-highlight--genaehrt'
        ];

        // Clear from all atlas nodes
        svg.querySelectorAll('.atlas-node').forEach(node => {
            highlightClasses.forEach(cls => node.classList.remove(cls));
        });

        // Clear from identity frame
        if (identityFrame) {
            highlightClasses.forEach(cls => {
                identityFrame.classList.remove(cls);
                const rect = identityFrame.querySelector('.identity-frame__rect');
                const text = identityFrame.querySelector('.identity-frame__label');
                if (rect) rect.classList.remove(cls);
                if (text) text.classList.remove(cls);
            });
        }
    }

    // ------------------------------------------------
    // Tab switching (within topic views)
    // ------------------------------------------------

    textContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.topic-tab');
        if (!tab) return;

        const topicView = tab.closest('.topic-view');
        switchTab(topicView, tab.dataset.tab);
    });

    function switchTab(topicView, tabName) {
        // Update tab buttons
        const tabs = topicView.querySelectorAll('.topic-tab');
        tabs.forEach(t => t.classList.remove('topic-tab--active'));

        const activeTab = topicView.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) activeTab.classList.add('topic-tab--active');

        // Update tab content
        const contents = topicView.querySelectorAll('.tab-content');
        contents.forEach(c => c.classList.remove('tab-content--active'));

        const activeContent = topicView.querySelector(`[data-tab-content="${tabName}"]`);
        if (activeContent) activeContent.classList.add('tab-content--active');
    }

    // ------------------------------------------------
    // Accordion interaction (Beziehungen tab)
    // ------------------------------------------------

    textContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const item = header.closest('.accordion-item');
        if (item) {
            item.classList.toggle('is-open');
        }
    });

    // ------------------------------------------------
    // Entrance animations
    // ------------------------------------------------

    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '';
        }, 100);
    });

});
