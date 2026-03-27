
import os

file_path = r"c:\Users\Startklar\.gemini\antigravity\playground\shadow-bohr\emotions.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

richtungs_achse_content = """                                <h3 class="text-column__subtitle">RICHTUNGS-ACHSE</h3>
                                <p>Diese Achse beschreibt,<br>
                                    wohin sich Energie im Erleben bewegt.</p>

                                <p>Manche Erfahrungen führen dazu,<br>
                                    dass Energie sich nach innen sammelt.</p>

                                <p>Andere bringen sie in Bewegung nach außen.</p>

                                <p>Beides sind natürliche Richtungen.</p>

                                <p>Ein lebendiges System<br>
                                    kennt Sammlung und Kontakt.</p>

                                <h3 class="text-column__subtitle">Die beiden Pole</h3>
                                <p><strong>Zusammenziehen ↔ Ausdehnung</strong></p>

                                <p>Bei Zusammenziehen sammelt sich Energie nach innen.<br>
                                    Aufmerksamkeit kehrt näher zu sich zurück.<br>
                                    Etwas bleibt bei sich, schützt sich oder ordnet sich.</p>

                                <p>Bei Ausdehnung bewegt sich Energie nach außen.<br>
                                    Ausdruck wird spürbarer.<br>
                                    Etwas geht in Kontakt, zeigt sich oder nimmt Raum ein.</p>

                                <p>Ausdehnung bedeutet nicht,<br>
                                    dass etwas besser oder freier ist.</p>

                                <p>Sie ist nur eine andere Richtung der Bewegung.</p>

                                <h3 class="text-column__subtitle">Gleichwertigkeit</h3>
                                <p>Keine dieser Bewegungen ist besser.</p>

                                <p>Zusammenziehen ermöglicht<br>
                                    Sammlung, Schutz und Integration.</p>

                                <p>Ausdehnung ermöglicht<br>
                                    Ausdruck, Kontakt und Sichtbarkeit.</p>

                                <p>Ein lebendiges System braucht beides.</p>

                                <p>Wenn Zusammenziehen ohne Ausdehnung bleibt,<br>
                                    kann Erleben eng oder isoliert werden.</p>

                                <p>Wenn Ausdehnung ohne Zusammenziehen geschieht,<br>
                                    kann Energie sich verlieren oder übergehen.</p>

                                <p>Gesunde Bewegung entsteht dort,<br>
                                    wo sich Sammlung und Ausdruck abwechseln.</p>

                                <p>Energie darf bei sich bleiben.<br>
                                    Und sie darf wieder nach außen bewegen.</p>

                                <h3 class="text-column__subtitle">Leitsatz</h3>
                                <p>Energie bewegt sich im Erleben<br>
                                    nicht nur in eine Richtung.</p>

                                <p>Manchmal sammelt sie sich nach innen.<br>
                                    Manchmal bewegt sie sich nach außen.</p>

                                <p>Beides gehört zum Leben.</p>"""

# Find the views
views = [
    ('<div class="topic-view" data-view="zusammenziehen">', '</div>'),
    ('<div class="topic-view" data-view="ausdehnung">', '</div>')
]

for start_tag, end_tag in views:
    start_idx = content.find(start_tag)
    if start_idx == -1:
        print(f"Start tag {start_tag} not found")
        continue
    
    # Find the next view or end of container to limit search
    next_view_idx = content.find('<div class="topic-view"', start_idx + 1)
    if next_view_idx == -1:
        next_view_idx = len(content)
        
    # Find polaritaet tab within this view
    polaritaet_idx = content.find('<div class="tab-content" data-tab-content="polaritaet">', start_idx, next_view_idx)
    if polaritaet_idx == -1:
        print(f"Polaritaet tab not found in view {start_tag}")
        continue
        
    # Replace placeholder
    target = '<p><em>Inhalt folgt</em></p>'
    target_idx = content.find(target, polaritaet_idx, next_view_idx)
    if target_idx != -1:
        content = content[:target_idx] + richtungs_achse_content + content[target_idx + len(target):]
        print(f"Replaced placeholder in {start_tag}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
