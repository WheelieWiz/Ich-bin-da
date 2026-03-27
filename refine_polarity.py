
import os

file_path = r"c:\Users\Startklar\.gemini\antigravity\playground\shadow-bohr\emotions.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace titles "Verdichtung ↔ Öffnung" with "DICHTE-ACHSE"
content = content.replace('<h3 class="text-column__subtitle">Verdichtung ↔ Öffnung</h3>', '<h3 class="text-column__subtitle">DICHTE-ACHSE</h3>')

# 2. Unbold Leitsatz
# Target: <p><strong>Bedeutung zeigt sich im Erleben<br>\n                                        nicht nur auf eine Weise.</strong></p>
old_leitsatz = '<p><strong>Bedeutung zeigt sich im Erleben<br>\n                                        nicht nur auf eine Weise.</strong></p>'
new_leitsatz = '<p>Bedeutung zeigt sich im Erleben<br>\n                                        nicht nur auf eine Weise.</p>'

content = content.replace(old_leitsatz, new_leitsatz)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
