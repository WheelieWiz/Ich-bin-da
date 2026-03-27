import re

def update_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add the new tab button to all .topic-tabs
    # Find: <button class="topic-tab" data-tab="erlaubnis">Erlaubnis</button>
    # Replace with: same + \n            <button class="topic-tab" data-tab="beziehungen">Beziehungen</button>
    
    # We must be careful not to double add it
    if 'data-tab="beziehungen"' not in content:
        content = re.sub(
            r'(<button class="topic-tab" data-tab="erlaubnis">Erlaubnis</button>)',
            r'\1\n            <button class="topic-tab" data-tab="beziehungen">Beziehungen</button>',
            content
        )

    # 2. Add the relationships tab content placeholder
    # We need to find the end of the erlaubnis tab-content, which is:
    #             </div>
    #           </div>
    #           
    #           </div><!-- end topic-scroll -->
    # For every view (topics), we need to inject the new tab content just before </div><!-- end topic-scroll -->
    
    # First let's build the HTML we want to inject (the placeholder version)
    placeholder_html = """
            <!-- Tab: Beziehungen -->
            <div class="tab-content" data-tab-content="beziehungen">
              <div class="text-column__body">
                <p class="beziehungen-tab__leitsatz">Inhalt folgt</p>

                <!-- Stabilisiert durch (Ocker) -->
                <div class="accordion-group accordion-group--stabilisiert">
                  <h4 class="accordion-group-title">Stabilisiert durch</h4>
                  <div class="accordion-item">
                    <button class="accordion-header">Beziehung folgt</button>
                    <div class="accordion-content">
                      <p>Inhalt folgt</p>
                    </div>
                  </div>
                </div>

                <!-- Erkennbar durch (Blau) -->
                <div class="accordion-group accordion-group--erkennbar">
                  <h4 class="accordion-group-title">Erkennbar durch</h4>
                  <div class="accordion-item">
                    <button class="accordion-header">Beziehung folgt</button>
                    <div class="accordion-content">
                      <p>Inhalt folgt</p>
                    </div>
                  </div>
                </div>

                <!-- Wird spürbar in (Grün) -->
                <div class="accordion-group accordion-group--spuerbar">
                  <h4 class="accordion-group-title">Wird spürbar in</h4>
                  <div class="accordion-item">
                    <button class="accordion-header">Beziehung folgt</button>
                    <div class="accordion-content">
                      <p>Inhalt folgt</p>
                    </div>
                  </div>
                </div>

                <!-- Genährt durch (Rosé) -->
                <div class="accordion-group accordion-group--genaehrt">
                  <h4 class="accordion-group-title">Genährt durch</h4>
                  <div class="accordion-item">
                    <button class="accordion-header">Beziehung folgt</button>
                    <div class="accordion-content">
                      <p>Inhalt folgt</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
"""

    # We can inject it using regex targeting the end of each topic-view inner wrapper
    # The pattern matches the closing tags of the Erlaubnis tab's .text-column__body and .tab-content
    # followed by the </div><!-- end topic-scroll -->
    
    # Note: intro view doesn't have topic-tabs or topic-scroll, it's just a div.
    # The actual topics have:
    #             <!-- Tab: Erlaubnis -->
    #             <div class="tab-content" data-tab-content="erlaubnis">
    #               ...
    #               </div>
    #             </div>
    # 
    #           </div><!-- end topic-scroll -->
    
    # regex to find the `</div><!-- end topic-scroll -->` and insert exactly before it.
    
    # Actually, the safest way is to find:
    #             <!-- Tab: Erlaubnis -->
    #             <div class="tab-content" data-tab-content="erlaubnis">
    #                 [anything]
    #             </div>
    #           </div>...
    
    # Let's just find `</div><!-- end topic-scroll -->` and replace it with `placeholder_html + "\n          </div><!-- end topic-scroll -->"
    
    if 'data-tab-content="beziehungen"' not in content:
        # Avoid inserting into intro if intro doesn't have topic-scroll (it shouldn't)
        content = content.replace(
            '</div><!-- end topic-scroll -->',
            placeholder_html + '          </div><!-- end topic-scroll -->'
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_html('c:/Users/Startklar/.gemini/antigravity/playground/shadow-bohr/index.html')
