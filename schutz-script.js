document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('emotion-select');
  const dynamicContent = document.getElementById('dynamic-content');
  const sections = document.querySelectorAll('.schutz-section');

  const placeholderText = {
    natural: '<p>[Platzhalter: Wie sich diese Emotion als natürliche Bewegung anfühlt.]</p>',
    protection: '<p>[Platzhalter: Wie es aussieht, wenn der Schutz diese Bewegung als Fehler interpretiert und abwehrt.]</p>',
    happening: '<p>[Platzhalter: Zentrale Erklärung, wie Widerstand Leid erzeugt.]</p>',
    flow: '<p>[Platzhalter: Der Verlauf des Erlebens, wenn wir dem Strom vertrauen.]</p>',
    stuck: '<p>[Platzhalter: Der Verlauf, wenn der Schutz uns im Widerstand hält.]</p>',
    reminder: '<p>[Platzhalter: Eine sanfte Rückholung zu sich selbst im Wahrnehmen der Emotion.]</p>',
    peace: '<p>[Platzhalter: Den Schutz annehmen, ohne ihm folgen zu müssen.]</p>'
  };

  const contentMap = {
    'hoffnung': {
      natural: `
        <ul>
          <li>Gedanken wie „Es könnte…“</li>
          <li>innere Bilder von Möglichkeiten</li>
          <li>mehrere Wege werden gleichzeitig sichtbar</li>
          <li>der Blick wird weiter</li>
          <li>ein Gefühl von „mehr ist möglich“ entsteht</li>
          <li>leise Vorfreude oder Lebendigkeit</li>
          <li>Resonanz mit dem, was sein könnte</li>
        </ul>
        <p><em>(Öffnung · Ausdehnung · Aktivierung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich mache mich abhängig“</li>
          <li>„Ich verliere mich“</li>
          <li>„Das ist falsch, mir so etwas vorzustellen“</li>
          <li>„Ich sollte realistisch bleiben“</li>
          <li>Möglichkeiten werden sofort bewertet oder begrenzt</li>
          <li>Energie kippt in Unsicherheit oder Zweifel</li>
          <li>das „könnte“ wird eng gemacht oder abgewertet</li>
        </ul>
        <p><em>(Verdichtung · Zusammenziehen · Aktivierung als Alarm)</em></p>
      `,
      happening: `
        <p>Dein innerer Raum wird weiter.</p>
        <p>Mehr Möglichkeiten werden sichtbar.<br>
        Mehr kann gedacht, gespürt und wahrgenommen werden.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig beginnt sich etwas in dir zu bewegen.<br>
        Ideen, Bilder und Impulse werden lebendiger.</p>
        <p>Das ist Ausdehnung.</p>
        <p>Wenn dein System diese Weite noch nicht gewohnt ist,<br>
        kann es beginnen, sie wieder einzugrenzen.</p>
        <p>Dann wird aus Möglichkeit plötzlich Risiko.<br>
        Aus Weite wird Unsicherheit.<br>
        Aus Bewegung wird Zweifel.</p>
        <p>Nicht weil Hoffnung falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        Weite vorsichtig zu behandeln.</p>
      `,
      flow: `
        <p>Du sitzt mit einer Idee oder einem Gedanken da.</p>
        <p>In dir öffnet sich etwas.<br>
        Du siehst mehrere Möglichkeiten gleichzeitig.</p>
        <p>Dein Blick wird weiter.<br>
        Du musst dich noch nicht entscheiden.</p>
        <p>Etwas in dir wird lebendig.</p>
        <p>Du nimmst wahr, was sein könnte —<br>
        ohne es festzuhalten.</p>
      `,
      stuck: `
        <p>Du sitzt mit derselben Idee da.</p>
        <p>Für einen Moment wird es weit.</p>
        <p>Dann kommt sofort:</p>
        <p>„Vorsicht.“<br>
        „Mach dir nichts vor.“<br>
        „Das wird sowieso nichts.“<br>
        „Du verlierst dich nur.“</p>
        <p>Die Weite zieht sich wieder zusammen.<br>
        Das Mögliche wird bewertet.<br>
        Das Lebendige wird eingegrenzt.</p>
        <p>Nicht weil es falsch war —<br>
        sondern weil dein System versucht, dich zu schützen.</p>
      `,
      reminder: `
        <p>Das ist nicht gefährlich.</p>
        <p>Dein Sichtfeld wird gerade größer.<br>
        Du nimmst mehr wahr.</p>
        <p>Es bedeutet nicht, dass du dich verlierst.<br>
        Es bedeutet, dass dein Horizont weiter wird<br>
        und mehr Möglichkeiten sichtbar werden.</p>
        <p>Du darfst:</p>
        <p>Du darfst Bewegung fließen lassen,<br>
        ohne falsch zu sein.</p>
        <p>Du darfst mehr Möglichkeiten sehen,<br>
        ohne dich zu verlieren.</p>
        <p>Du darfst das „könnte“ empfangen,<br>
        ohne es festhalten zu müssen.</p>
        <p>Du darfst dir einen Moment Zeit nehmen,<br>
        um zu hören, was gerade in dir entstehen möchte.</p>
        <p>Du darfst dir Raum geben,<br>
        um zu spüren, was dir wichtig ist<br>
        und in welche Richtung sich etwas bewegen möchte.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Weite unsicher ist.<br>
        Dass Möglichkeiten enttäuschen können.<br>
        Oder dass es besser ist, vorsichtig zu bleiben.</p>
        <p>Vielleicht hast du Urteile übernommen.<br>
        Oder eigene Erfahrungen gemacht,<br>
        die dich enger haben werden lassen.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du dich selbst noch nicht halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du bist nicht mehr in ihnen gefangen.</p>
        <p>Du kannst sie wahrnehmen,<br>
        ohne ihnen folgen zu müssen.</p>
        <p>Und du darfst beginnen,<br>
        den Raum für Bewegung selbst zu halten.</p>
      `
    },
    'trauer': {
      natural: `
        <ul>
          <li>ein Gefühl von Schwere oder Tiefe</li>
          <li>Rückzug nach innen</li>
          <li>still werden</li>
          <li>weniger Bedürfnis nach äußeren Reizen</li>
          <li>das Spüren von Verlust, Abschied oder Bedeutung</li>
          <li>Tränen oder das Bedürfnis danach</li>
          <li>ein inneres „das war mir wichtig“</li>
        </ul>
        <p><em>(Verdichtung · Zusammenziehen · Loslassen)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich sollte nicht traurig sein“</li>
          <li>„Das bringt nichts“</li>
          <li>„Ich muss mich ablenken“</li>
          <li>Gedanken springen schnell zu Erklärungen oder Schuld</li>
          <li>„Das hätte nicht passieren dürfen“</li>
          <li>das Gefühl wird analysiert oder weggedrückt</li>
          <li>Unruhe statt Stille</li>
        </ul>
        <p><em>(Öffnung als Flucht · Ausdehnung als Gedankenstrom · Aktivierung als Unruhe)</em></p>
      `,
      happening: `
        <p>Etwas in dir hat Bedeutung.</p>
        <p>Trauer ist die Bewegung,<br>
        in der diese Bedeutung spürbar wird.</p>
        <p>Dein System zieht sich nach innen zurück.<br>
        Nicht um dich zu isolieren —<br>
        sondern um Raum zu geben,<br>
        für das, was gerade Gewicht bekommen hat.</p>
        <p>Das ist Verdichtung und Zusammenziehen.</p>
        <p>Gleichzeitig liegt in dieser Bewegung ein natürliches Loslassen.<br>
        Nicht im Sinne von „es ist egal“,<br>
        sondern im Sinne von:</p>
        <p>„Ich erkenne an, dass es so ist.“</p>
        <p>Wenn diese Tiefe ungewohnt oder zu intensiv ist,<br>
        kann dein System versuchen, sie zu vermeiden.</p>
        <p>Dann entsteht Bewegung nach außen:</p>
        <p>Gedanken, Erklärungen, Ablenkung, Aktivität.</p>
        <p>Nicht weil Trauer falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        Tiefe zu regulieren, indem es dich wieder in Bewegung bringt.</p>
      `,
      flow: `
        <p>Du merkst, dass etwas schwerer wird in dir.</p>
        <p>Du wirst ruhiger.<br>
        Vielleicht ziehst du dich etwas zurück.</p>
        <p>Du spürst, dass etwas Bedeutung hat.<br>
        Vielleicht kommen Tränen.<br>
        Vielleicht auch einfach nur Stille.</p>
        <p>Du musst nichts erklären.<br>
        Du musst nichts lösen.</p>
        <p>Du bist einfach mit dem,<br>
        was dir wichtig ist.</p>
        <p>Und mit der Zeit<br>
        wird es weicher.</p>
      `,
      stuck: `
        <p>Du merkst die Schwere.</p>
        <p>Doch fast sofort beginnt Bewegung:</p>
        <p>„Das bringt doch nichts.“<br>
        „Ich muss mich ablenken.“<br>
        „Warum ist das passiert?“<br>
        „Wer ist schuld?“</p>
        <p>Gedanken springen.<br>
        Du suchst Erklärungen.<br>
        Oder du gehst direkt wieder nach außen.</p>
        <p>Die Tiefe wird nicht wirklich gespürt —<br>
        sie wird überdeckt.</p>
        <p>Nicht weil sie falsch ist,<br>
        sondern weil dein System versucht,<br>
        dich vor ihr zu schützen.</p>
      `,
      reminder: `
        <p>Trauer ist nicht falsch.</p>
        <p>Sie zeigt dir,<br>
        dass etwas Bedeutung für dich hat.</p>
        <p>Du musst sie nicht wegmachen.<br>
        Du musst sie nicht erklären.</p>
        <p>Du darfst:</p>
        <p>Du darfst still werden,<br>
        ohne etwas leisten zu müssen.</p>
        <p>Du darfst fühlen,<br>
        ohne dich darin zu verlieren.</p>
        <p>Du darfst spüren,<br>
        was dir wichtig ist.</p>
        <p>Du darfst dir Zeit geben,<br>
        damit sich etwas in dir setzen darf.</p>
        <p>Du darfst zulassen,<br>
        dass etwas weicher wird —<br>
        in deinem Tempo.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Trauer zu viel ist.<br>
        Dass sie dich überwältigen könnte.<br>
        Oder dass sie keinen Platz hat.</p>
        <p>Vielleicht hast du erfahren,<br>
        dass du stark sein musst.<br>
        Oder dass es besser ist, weiterzumachen.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du die Tiefe noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du dich ablenkst oder erklärst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        die Tiefe selbst zu halten,<br>
        die in dir entsteht.</p>
      `
    },
    'zorn': {
      natural: `
        <ul>
          <li>ein klares „das stimmt für mich nicht“</li>
          <li>spürbare Energie im Körper</li>
          <li>ein Impuls, sich auszurichten oder abzugrenzen</li>
          <li>wachere Präsenz</li>
          <li>ein inneres Aufrichten</li>
          <li>Klarheit darüber, was nicht stimmig ist</li>
          <li>ein Bedürfnis nach Ausdruck oder Handlung</li>
        </ul>
        <p><em>(Verdichtung · Aktivierung · Ausdehnung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich darf nicht wütend sein“</li>
          <li>„Das ist zu viel“</li>
          <li>„Ich bin falsch, wenn ich so fühle“</li>
          <li>Unterdrücken oder „runterschlucken“</li>
          <li>Schuld wird nach außen verlagert („die anderen sind schuld“)</li>
          <li>gedankliche Rechtfertigung oder Angriff</li>
          <li>Energie kippt in inneren Druck oder äußeren Konflikt</li>
        </ul>
        <p><em>(Zusammenziehen · Verdichtung als Bewertung · Aktivierung als Überreaktion)</em></p>
      `,
      happening: `
        <p>Zorn entsteht,<br>
        wenn etwas für dich nicht stimmig ist.</p>
        <p>Eine Grenze wird sichtbar.</p>
        <p>Dein System bündelt Energie.<br>
        Das ist Verdichtung.</p>
        <p>Gleichzeitig wird Energie freigesetzt.<br>
        Das ist Aktivierung.</p>
        <p>Und etwas in dir richtet sich aus.<br>
        Das ist Ausdehnung.</p>
        <p>Zorn ist nicht gegen etwas gerichtet.<br>
        Er ist für dich.</p>
        <p>Er zeigt dir,<br>
        wo deine Grenze ist<br>
        und wo etwas nicht mehr mit dir in Resonanz steht.</p>
        <p>Wenn diese Energie als gefährlich oder falsch bewertet wird,<br>
        kann dein System versuchen, sie zu kontrollieren.</p>
        <p>Dann wird sie entweder unterdrückt<br>
        oder ungerichtet nach außen abgegeben.</p>
        <p>Nicht weil Zorn falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        mit dieser Intensität vorsichtig umzugehen.</p>
      `,
      flow: `
        <p>Du spürst Energie in dir.</p>
        <p>Etwas wird klar.</p>
        <p>Du merkst:<br>
        „Das stimmt für mich nicht.“</p>
        <p>Du wirst aufrechter.<br>
        Präsenter.</p>
        <p>Vielleicht sprichst du etwas an.<br>
        Vielleicht setzt du eine Grenze.</p>
        <p>Du musst nicht laut werden.<br>
        Du musst nicht kämpfen.</p>
        <p>Die Energie steht dir zur Verfügung,<br>
        um dich auszurichten.</p>
      `,
      stuck: `
        <p>Du spürst die gleiche Energie.</p>
        <p>Doch sofort kommt:</p>
        <p>„Das darf nicht sein.“<br>
        „Ich darf nicht so reagieren.“<br>
        oder<br>
        „Die anderen sind schuld.“</p>
        <p>Die Energie wird entweder:</p>
        <ul style="margin-bottom: 0;">
          <li>nach innen gedrückt (Unterdrückung)<br>oder</li>
          <li style="margin-top: 0.6rem;">ungerichtet nach außen entladen (Angriff)</li>
        </ul>
        <p>Klarheit wird zu Druck.<br>
        Energie wird zu Konflikt.</p>
        <p>Nicht weil Zorn falsch ist,<br>
        sondern weil dein System versucht,<br>
        dich vor den Folgen dieser Energie zu schützen.</p>
      `,
      reminder: `
        <p>Zorn ist nicht gefährlich.</p>
        <p>Er ist Energie,<br>
        die dir zur Verfügung steht.</p>
        <p>Er zeigt dir,<br>
        wo deine Grenze ist.</p>
        <p>Du darfst:</p>
        <p>Du darfst spüren,<br>
        wenn etwas für dich nicht stimmig ist.</p>
        <p>Du darfst Energie fühlen,<br>
        ohne sie zu unterdrücken oder entladen zu müssen.</p>
        <p>Du darfst klar sein,<br>
        ohne aggressiv zu werden.</p>
        <p>Du darfst dich ausrichten,<br>
        ohne dich rechtfertigen zu müssen.</p>
        <p>Du darfst deiner Energie Raum geben,<br>
        ohne dich darin zu verlieren.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Zorn gefährlich ist.<br>
        Dass er zu Konflikt führt.<br>
        Oder dass du ihn nicht zeigen darfst.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass Energie zu viel war —<br>
        für dich oder für andere.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du diese Kraft noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du unterdrückst oder angreifst —<br>
        ohne dich dafür zu verurteilen.</p>
        <p>Und du darfst beginnen,<br>
        diese Energie bewusst zu halten<br>
        und als Klarheit zu nutzen.</p>
      `
    },
    'angst': {
      natural: `
        <ul>
          <li>erhöhte Wachsamkeit</li>
          <li>der Blick geht in mögliche Zukünfte</li>
          <li>Szenarien tauchen auf („Was könnte passieren…?“)</li>
          <li>der Körper wird aufmerksamer oder angespannter</li>
          <li>ein Impuls, sich abzusichern oder zu orientieren</li>
          <li>feines Wahrnehmen von Unsicherheit</li>
          <li>ein inneres „Ich will sicher sein“</li>
        </ul>
        <p><em>(Öffnung · Aktivierung · Ausdehnung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich darf keine Angst haben“</li>
          <li>„Das ist Schwäche“</li>
          <li>„Ich übertreibe“</li>
          <li>„Ich muss das sofort loswerden“</li>
          <li>Szenarien werden immer weitergesponnen (Gedankenschleifen)</li>
          <li>Kontrolle wird verstärkt (alles absichern wollen)</li>
          <li>Vermeidung von Situationen</li>
          <li>Energie kippt in Daueranspannung</li>
        </ul>
        <p><em>(Verdichtung · Zusammenziehen · Aktivierung als Alarm / Übersteuerung)</em></p>
      `,
      happening: `
        <p>Angst ist eine Bewegung in Richtung Zukunft.</p>
        <p>Dein System öffnet den Blick<br>
        für mögliche Entwicklungen.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig wird dein Körper aktiviert,<br>
        um bereit zu sein.</p>
        <p>Das ist Aktivierung.</p>
        <p>Und dein Denken beginnt,<br>
        Szenarien zu formen.</p>
        <p>Das ist Ausdehnung.</p>
        <p>Angst ist nicht dazu da, dich zu lähmen.<br>
        Sie ist dazu da, dich aufmerksam zu machen.</p>
        <p>Sie zeigt dir:</p>
        <p>„Hier ist etwas unsicher.“<br>
        „Hier ist etwas noch nicht klar.“</p>
        <p>Wenn diese Bewegung jedoch als Gefahr bewertet wird,<br>
        verstärkt sich die Aktivierung.</p>
        <p>Dann entsteht ein Kreislauf:</p>
        <p>mehr Gedanken → mehr Spannung → mehr Kontrolle</p>
        <p>Nicht weil Angst falsch ist —<br>
        sondern weil dein System versucht,<br>
        Sicherheit herzustellen.</p>
      `,
      flow: `
        <p>Du merkst, dass etwas unsicher wirkt.</p>
        <p>Dein Blick geht nach vorne.<br>
        Du siehst mögliche Entwicklungen.</p>
        <p>Dein Körper wird wacher.</p>
        <p>Du nimmst wahr:<br>
        „Hier ist etwas noch nicht klar.“</p>
        <p>Du kannst innehalten.<br>
        Du kannst prüfen, was gerade wirklich relevant ist.</p>
        <p>Du musst nicht alles lösen.</p>
        <p>Die Bewegung darf sich zeigen —<br>
        und wieder abklingen.</p>
      `,
      stuck: `
        <p>Du merkst die gleiche Unsicherheit.</p>
        <p>Doch sofort entsteht Druck:</p>
        <p>„Was, wenn…?“<br>
        „Ich muss das verhindern.“<br>
        „Ich darf keinen Fehler machen.“</p>
        <p>Gedanken beginnen sich zu wiederholen.<br>
        Szenarien werden immer intensiver.</p>
        <p>Du versuchst, alles zu kontrollieren<br>
        oder gehst Situationen aus dem Weg.</p>
        <p>Die Bewegung wird enger.<br>
        Die Spannung bleibt bestehen.</p>
        <p>Nicht weil Angst falsch ist —<br>
        sondern weil dein System versucht,<br>
        Sicherheit zu erzwingen.</p>
      `,
      reminder: `
        <p>Angst ist nicht dein Feind.</p>
        <p>Sie ist Aufmerksamkeit in Bewegung.</p>
        <p>Du musst sie nicht loswerden.<br>
        Du musst sie nicht bekämpfen.</p>
        <p>Du darfst:</p>
        <p>Du darfst wahrnehmen,<br>
        dass etwas unsicher wirkt.</p>
        <p>Du darfst Gedanken sehen,<br>
        ohne ihnen folgen zu müssen.</p>
        <p>Du darfst deinen Körper spüren,<br>
        ohne in Alarm zu gehen.</p>
        <p>Du darfst einen Moment innehalten,<br>
        statt sofort zu reagieren.</p>
        <p>Du darfst dir erlauben,<br>
        nicht alles kontrollieren zu müssen.</p>
        <p>Du darfst Sicherheit in dir finden,<br>
        während sich etwas im Außen noch klärt.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Unsicherheit gefährlich ist.<br>
        Dass du vorbereitet sein musst.<br>
        Oder dass du Fehler vermeiden musst.</p>
        <p>Vielleicht hat dein System früh begonnen,<br>
        für Sicherheit zu sorgen.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du dich selbst noch nicht halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du in Kontrolle oder Vermeidung gehst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        Unsicherheit auszuhalten,<br>
        ohne dich darin zu verlieren.</p>
      `
    },
    'freude': {
      natural: `
        <ul>
          <li>ein Gefühl von Weite, Leichtigkeit oder innerem Aufatmen</li>
          <li>spontane Lebendigkeit</li>
          <li>ein inneres „Ja“</li>
          <li>mehr Kontakt mit dem Moment</li>
          <li>Lust, sich auszudrücken oder zu teilen</li>
          <li>Wärme, Weichheit oder Strahlen im Körper</li>
          <li>ein Gefühl von „das fühlt sich stimmig an“</li>
        </ul>
        <p><em>(Öffnung · Ausdehnung · Loslassen)</em></p>
      `,
      protection: `
        <ul>
          <li>„Das hält sowieso nicht“</li>
          <li>„Ich sollte mich nicht zu früh freuen“</li>
          <li>„Das ist naiv“</li>
          <li>„Ich muss vorsichtig bleiben“</li>
          <li>Freude wird gedämpft oder misstrauisch beobachtet</li>
          <li>aus Leichtigkeit wird Anspannung</li>
          <li>Freude wird als Beweis benutzt: „Jetzt muss alles richtig sein“</li>
          <li>oder sie wird klein gemacht, um nicht aufzufallen</li>
        </ul>
        <p><em>(Verdichtung als Kontrolle · Zusammenziehen · Aktivierung als Vorsicht / innere Bremse)</em></p>
      `,
      happening: `
        <p>Freude öffnet den inneren Raum.</p>
        <p>Etwas fühlt sich leichter an.<br>
        Mehr Kontakt mit dem Moment wird möglich.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig will sich etwas in dir zeigen,<br>
        ausbreiten oder ausdrücken.</p>
        <p>Das ist Ausdehnung.</p>
        <p>Und es liegt ein natürliches Loslassen darin:<br>
        für einen Moment muss nichts gehalten,<br>
        gesichert oder kontrolliert werden.</p>
        <p>Freude ist nicht Oberflächlichkeit.<br>
        Sie ist eine Form von Kontakt.</p>
        <p>Sie zeigt dir:</p>
        <p>„Hier ist etwas lebendig.“<br>
        „Hier ist etwas stimmig.“<br>
        „Hier darf etwas genossen werden.“</p>
        <p>Wenn diese Bewegung jedoch als unsicher, naiv oder zu viel gelesen wird,<br>
        beginnt das System, sie wieder einzuengen.</p>
        <p>Dann wird aus Freude Vorsicht.<br>
        Aus Lebendigkeit wird Kontrolle.<br>
        Oder aus einem Moment wird ein Beweis,<br>
        der plötzlich gehalten werden muss.</p>
        <p>Nicht weil Freude falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        auch Weichheit und Leichtigkeit vorsichtig zu behandeln.</p>
      `,
      flow: `
        <p>Du merkst, dass etwas in dir leichter wird.</p>
        <p>Vielleicht ist da ein inneres Aufatmen.<br>
        Vielleicht ein Lächeln.<br>
        Vielleicht einfach ein stilles, warmes Ja.</p>
        <p>Du nimmst den Moment wahr.<br>
        Du musst ihn nicht festhalten.<br>
        Du musst ihn nicht erklären.</p>
        <p>Etwas darf schön sein,<br>
        ohne dass es bleiben muss.</p>
        <p>Du bist einfach in Kontakt<br>
        mit dem, was gerade lebendig ist.</p>
      `,
      stuck: `
        <p>Du merkst dieselbe Freude.</p>
        <p>Doch fast sofort kommt:</p>
        <p>„Vorsicht.“<br>
        „Freu dich nicht zu früh.“<br>
        „Das ist bestimmt gleich wieder weg.“<br>
        „Wenn ich mich jetzt freue, werde ich enttäuscht.“</p>
        <p>Die Leichtigkeit wird beobachtet.<br>
        Der Moment wird bewertet.<br>
        Oder Freude wird klein gemacht,<br>
        damit sie nicht zu sichtbar wird.</p>
        <p>Was eigentlich Kontakt war,<br>
        wird wieder kontrolliert.</p>
        <p>Nicht weil Freude falsch ist —<br>
        sondern weil dein System versucht,<br>
        dich vor Verlust oder Enttäuschung zu schützen.</p>
      `,
      reminder: `
        <p>Freude ist nicht gefährlich.</p>
        <p>Sie ist Lebendigkeit in Kontakt.</p>
        <p>Du musst sie nicht dämpfen.<br>
        Du musst sie nicht beweisen.</p>
        <p>Du darfst:</p>
        <p>Du darfst wahrnehmen,<br>
        wenn etwas sich leicht und stimmig anfühlt.</p>
        <p>Du darfst genießen,<br>
        ohne es festhalten zu müssen.</p>
        <p>Du darfst dich freuen,<br>
        ohne naiv zu sein.</p>
        <p>Du darfst lebendig sein,<br>
        ohne dich zu rechtfertigen.</p>
        <p>Du darfst spüren,<br>
        dass etwas schön ist,<br>
        ohne dass es für immer bleiben muss.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Freude nicht sicher ist.<br>
        Dass auf Leichtigkeit Enttäuschung folgen kann.<br>
        Oder dass es besser ist, vorsichtig zu bleiben.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass es schmerzt,<br>
        wenn Schönes wieder verschwindet.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du diese Offenheit noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du Freude dämpfst, kontrollierst oder klein machst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        Lebendigkeit wieder zuzulassen,<br>
        ohne sie festhalten zu müssen.</p>
      `
    },
    'dankbarkeit': {
      natural: `
        <ul>
          <li>ein Gefühl von Weichheit oder innerem Ankommen</li>
          <li>ein stilles „das ist da“</li>
          <li>Wahrnehmen von dem, was bereits vorhanden ist</li>
          <li>ein Gefühl von Fülle im Moment</li>
          <li>leise Wärme oder Ruhe im Körper</li>
          <li>Verbundenheit mit sich selbst, anderen oder dem Leben</li>
          <li>ein inneres „das ist wertvoll“</li>
        </ul>
        <p><em>(Öffnung · Verdichtung · Loslassen)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich sollte dankbarer sein“</li>
          <li>„Andere haben es schlimmer“</li>
          <li>„Ich darf mich nicht beschweren“</li>
          <li>Dankbarkeit wird erzwungen oder als Pflicht erlebt</li>
          <li>eigene Bedürfnisse werden übergangen</li>
          <li>Vergleich statt echtes Wahrnehmen</li>
          <li>aus Weichheit wird Druck</li>
          <li>Dankbarkeit wird benutzt, um andere Gefühle zu vermeiden</li>
        </ul>
        <p><em>(Verdichtung als Bewertung · Zusammenziehen · Loslassen blockiert / Aktivierung als innerer Druck)</em></p>
      `,
      happening: `
        <p>Dankbarkeit entsteht,<br>
        wenn du wahrnimmst, was bereits da ist.</p>
        <p>Dein Blick öffnet sich<br>
        für das Vorhandene.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig bekommt etwas Bedeutung.<br>
        Etwas wird als wertvoll erkannt.</p>
        <p>Das ist Verdichtung.</p>
        <p>Und darin liegt ein natürliches Loslassen:<br>
        für einen Moment musst du nichts verändern.</p>
        <p>Das ist Loslassen.</p>
        <p>Dankbarkeit ist kein Konzept.<br>
        Sie ist ein Zustand von Kontakt.</p>
        <p>Sie zeigt dir:</p>
        <p>„Das ist da.“<br>
        „Das ist wertvoll.“<br>
        „Das darf so sein.“</p>
        <p>Wenn diese Bewegung jedoch als Pflicht oder Maßstab benutzt wird,<br>
        verändert sich ihre Qualität.</p>
        <p>Dann wird aus Dankbarkeit ein „Ich sollte“.<br>
        Aus Anerkennung wird Vergleich.<br>
        Aus Weichheit wird Druck.</p>
        <p>Nicht weil Dankbarkeit falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        Gefühle zu regulieren, indem es sich anpasst oder bewertet.</p>
      `,
      flow: `
        <p>Du nimmst etwas wahr.</p>
        <p>Vielleicht etwas Kleines.<br>
        Vielleicht etwas ganz Einfaches.</p>
        <p>Du merkst:<br>
        „Das ist da.“</p>
        <p>Es entsteht eine leise Wärme.<br>
        Eine Ruhe.</p>
        <p>Du musst nichts hinzufügen.<br>
        Du musst nichts festhalten.</p>
        <p>Du bist einfach in Kontakt<br>
        mit dem, was gerade da ist.</p>
      `,
      stuck: `
        <p>Du nimmst etwas wahr.</p>
        <p>Doch sofort kommt:</p>
        <p>„Ich sollte dankbar sein.“<br>
        „Andere haben es schlimmer.“<br>
        „Ich darf mich nicht so fühlen.“</p>
        <p>Statt Kontakt entsteht Druck.<br>
        Statt Weichheit entsteht Bewertung.</p>
        <p>Du benutzt Dankbarkeit,<br>
        um dich zu korrigieren<br>
        oder andere Gefühle zu übergehen.</p>
        <p>Nicht weil Dankbarkeit falsch ist —<br>
        sondern weil dein System versucht,<br>
        dich in eine „richtige“ Haltung zu bringen.</p>
      `,
      reminder: `
        <p>Dankbarkeit ist keine Pflicht.</p>
        <p>Sie ist ein leises Erkennen dessen,<br>
        was bereits da ist.</p>
        <p>Du musst nichts erzwingen.<br>
        Du musst nichts vergleichen.</p>
        <p>Du darfst:</p>
        <p>Du darfst wahrnehmen,<br>
        was gerade da ist.</p>
        <p>Du darfst anerkennen,<br>
        was sich für dich wertvoll anfühlt.</p>
        <p>Du darfst gleichzeitig dankbar sein<br>
        und andere Gefühle haben.</p>
        <p>Du darfst weich werden,<br>
        ohne dich anzupassen.</p>
        <p>Du darfst einfach da sein<br>
        mit dem, was ist.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass du dankbar sein solltest.<br>
        Dass es nicht richtig ist, mehr zu wollen.<br>
        Oder dass du dich nicht beschweren darfst.</p>
        <p>Vielleicht hast du erfahren,<br>
        dass Vergleich Sicherheit gibt<br>
        oder dass Anpassung erwartet wird.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du dich selbst noch nicht frei ausdrücken konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann Dankbarkeit zu Druck wird —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        Dankbarkeit wieder als das zu erleben, was sie ist:</p>
        <p>ein stiller Kontakt<br>
        mit dem, was bereits da ist.</p>
      `
    },
    'neugier': {
      natural: `
        <ul>
          <li>ein offenes Interesse</li>
          <li>ein inneres „Was ist hier?“</li>
          <li>spielerisches Erkunden</li>
          <li>der Wunsch zu verstehen oder zu entdecken</li>
          <li>ein leichter Zug nach vorne</li>
          <li>Aufmerksamkeit ohne Druck</li>
          <li>Offenheit für das Unbekannte</li>
        </ul>
        <p><em>(Öffnung · Ausdehnung · Aktivierung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich sollte das schon wissen“</li>
          <li>„Ich darf keine Fragen stellen“</li>
          <li>„Das ist unnötig“</li>
          <li>Neugier wird unterdrückt oder als kindlich bewertet</li>
          <li>Fragen werden sofort beantwortet statt offen gelassen</li>
          <li>aus Erkunden wird Kontrolle</li>
          <li>aus Interesse wird Druck, alles verstehen zu müssen</li>
          <li>Angst vor „nicht wissen“ entsteht</li>
        </ul>
        <p><em>(Verdichtung als Bewertung · Zusammenziehen · Aktivierung als Druck / Überforderung)</em></p>
      `,
      happening: `
        <p>Neugier öffnet den Raum.</p>
        <p>Etwas ist noch nicht klar —<br>
        und das ist nicht schlimm.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig bewegt sich etwas nach vorne.<br>
        Ein Impuls, zu schauen, zu fühlen, zu entdecken.</p>
        <p>Das ist Ausdehnung.</p>
        <p>Und darin liegt eine leichte Aktivierung:<br>
        Energie steht zur Verfügung,<br>
        ohne dass sie drängt.</p>
        <p>Neugier ist keine Suche nach Kontrolle.<br>
        Sie ist eine Bewegung in Kontakt.</p>
        <p>Sie zeigt dir:</p>
        <p>„Hier gibt es etwas zu entdecken.“<br>
        „Hier ist etwas noch offen.“<br>
        „Hier darf ich hinschauen.“</p>
        <p>Wenn diese Offenheit jedoch als Unsicherheit oder Schwäche bewertet wird,<br>
        verändert sich ihre Qualität.</p>
        <p>Dann wird aus Neugier Druck.<br>
        Aus Offenheit wird „Ich muss wissen“.<br>
        Aus Erkunden wird Kontrolle.</p>
        <p>Nicht weil Neugier falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        dass Nicht-Wissen unsicher sein kann.</p>
      `,
      flow: `
        <p>Du bemerkst etwas, das du noch nicht kennst.</p>
        <p>Ein Gedanke taucht auf.<br>
        Eine Frage entsteht.</p>
        <p>Du bleibst offen.</p>
        <p>Du musst es nicht sofort verstehen.<br>
        Du musst keine Antwort erzwingen.</p>
        <p>Du erkundest.<br>
        Du schaust.</p>
        <p>Du lässt dich ein Stück führen<br>
        von dem, was sich zeigt.</p>
      `,
      stuck: `
        <p>Du bemerkst dieselbe Unklarheit.</p>
        <p>Doch sofort kommt:</p>
        <p>„Ich müsste das wissen.“<br>
        „Das ist peinlich.“<br>
        „Ich sollte das verstehen.“<br>
        „Ich darf keine Fragen stellen.“</p>
        <p>Die Offenheit schließt sich.<br>
        Statt Erkunden entsteht Druck.</p>
        <p>Du versuchst, schnell Antworten zu finden<br>
        oder vermeidest die Situation ganz.</p>
        <p>Was eigentlich Bewegung war,<br>
        wird wieder eng gemacht.</p>
        <p>Nicht weil Neugier falsch ist —<br>
        sondern weil dein System versucht,<br>
        Unsicherheit zu vermeiden.</p>
      `,
      reminder: `
        <p>Neugier ist kein Fehler.</p>
        <p>Sie ist eine offene Bewegung<br>
        in Richtung Verständnis.</p>
        <p>Du musst nicht alles wissen.<br>
        Du musst nichts beweisen.</p>
        <p>Du darfst:</p>
        <p>Du darfst fragen,<br>
        ohne dich dafür zu rechtfertigen.</p>
        <p>Du darfst offen bleiben,<br>
        ohne sofort Antworten zu brauchen.</p>
        <p>Du darfst erkunden,<br>
        ohne ein Ziel haben zu müssen.</p>
        <p>Du darfst nicht wissen,<br>
        ohne falsch zu sein.</p>
        <p>Du darfst dich von dem leiten lassen,<br>
        was dich interessiert.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass du wissen musst.<br>
        Dass Fehler vermieden werden sollen.<br>
        Oder dass Fragen Unsicherheit zeigen.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass Nicht-Wissen bewertet wurde.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du dich noch absichern musstest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann Neugier zu Druck wird —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        Neugier wieder als das zu erleben, was sie ist:</p>
        <p>eine leichte, offene Bewegung<br>
        in Kontakt mit dem Unbekannten.</p>
      `
    },
    'scham': {
      natural: `
        <ul>
          <li>ein Gefühl von „ich werde gesehen“</li>
          <li>Sensibilität für Wirkung nach außen</li>
          <li>ein inneres Wahrnehmen von sich selbst im Kontakt mit anderen</li>
          <li>ein Impuls, sich zu schützen oder zurückzuziehen</li>
          <li>feines Spüren von Verletzlichkeit</li>
          <li>ein inneres „so werde ich wahrgenommen“</li>
          <li>Wunsch nach Zugehörigkeit und Verbindung</li>
        </ul>
        <p><em>(Verdichtung · Zusammenziehen · Öffnung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich bin falsch“</li>
          <li>„Ich darf nicht so sein“</li>
          <li>„Mit mir stimmt etwas nicht“</li>
          <li>Selbstabwertung oder innerer Rückzug</li>
          <li>Verstecken, Anpassen oder Überkompensation</li>
          <li>übermäßige Selbstbeobachtung</li>
          <li>Angst, gesehen zu werden</li>
          <li>starre Kontrolle über Verhalten oder Ausdruck</li>
        </ul>
        <p><em>(Verdichtung als Selbsturteil · starkes Zusammenziehen · Öffnung blockiert)</em></p>
      `,
      happening: `
        <p>Scham entsteht im Kontakt.</p>
        <p>Du nimmst dich selbst wahr —<br>
        im Blick von anderen<br>
        oder im eigenen inneren Spiegel.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig bekommt etwas Bedeutung:<br>
        „So werde ich gesehen“<br>
        „So könnte ich wirken“</p>
        <p>Das ist Verdichtung.</p>
        <p>Und dein System zieht sich zusammen,<br>
        um dich zu schützen.</p>
        <p>Das ist Zusammenziehen.</p>
        <p>Scham ist nicht falsch.<br>
        Sie ist eine Schutzbewegung.</p>
        <p>Sie zeigt dir:</p>
        <p>„Hier bin ich sichtbar.“<br>
        „Hier bin ich verletzlich.“<br>
        „Hier ist mir Zugehörigkeit wichtig.“</p>
        <p>Wenn diese Bewegung jedoch als Beweis für „Ich bin falsch“ gelesen wird,<br>
        verändert sich ihre Qualität.</p>
        <p>Dann wird aus Schutz → Selbstablehnung<br>
        aus Sensibilität → Rückzug<br>
        aus Kontakt → Trennung</p>
        <p>Nicht weil Scham falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        Verletzlichkeit zu schützen, indem es dich kleiner macht.</p>
      `,
      flow: `
        <p>Du merkst, dass du dich gerade selbst wahrnimmst.</p>
        <p>Vielleicht wirst du stiller.<br>
        Vielleicht spürst du dich stärker.</p>
        <p>Du bemerkst:<br>
        „Ich bin sichtbar.“</p>
        <p>Du musst dich nicht verstecken.<br>
        Du musst dich nicht korrigieren.</p>
        <p>Du kannst da sein —<br>
        auch in deiner Verletzlichkeit.</p>
        <p>Die Bewegung darf durch dich hindurchgehen<br>
        und wieder weicher werden.</p>
      `,
      stuck: `
        <p>Du merkst dieselbe Wahrnehmung.</p>
        <p>Doch sofort kommt:</p>
        <p>„Das war falsch.“<br>
        „So darf nicht sein.“<br>
        „Ich bin zu viel / zu wenig.“</p>
        <p>Du ziehst dich zurück.<br>
        Oder beginnst, dich anzupassen.</p>
        <p>Du beobachtest dich ständig selbst.<br>
        Versuchst, dich zu kontrollieren.</p>
        <p>Was eigentlich Schutz war,<br>
        wird zu Selbstablehnung.</p>
        <p>Nicht weil du falsch bist —<br>
        sondern weil dein System versucht,<br>
        dich vor Verletzung zu bewahren.</p>
      `,
      reminder: `
        <p>Scham bedeutet nicht, dass du falsch bist.</p>
        <p>Sie zeigt dir,<br>
        dass dir Verbindung wichtig ist.</p>
        <p>Du musst dich nicht verstecken.<br>
        Du musst dich nicht korrigieren.</p>
        <p>Du darfst:</p>
        <p>Du darfst dich wahrnehmen,<br>
        ohne dich abzuwerten.</p>
        <p>Du darfst sichtbar sein,<br>
        ohne perfekt sein zu müssen.</p>
        <p>Du darfst dich spüren,<br>
        auch in deiner Verletzlichkeit.</p>
        <p>Du darfst da sein,<br>
        ohne dich kleiner zu machen.</p>
        <p>Du darfst erkennen,<br>
        dass du nicht falsch bist —<br>
        sondern fühlst.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Sichtbarkeit unsicher ist.<br>
        Dass du dich anpassen musst, um dazuzugehören.<br>
        Oder dass es besser ist, sich zurückzuhalten.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass Verletzlichkeit bewertet wurde.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du dich selbst noch nicht halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du dich kleiner machst oder zurückziehst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        dich selbst zu halten —<br>
        auch wenn du sichtbar bist.</p>
      `
    },
    'sehnsucht': {
      natural: `
        <ul>
          <li>ein Ziehen in eine bestimmte Richtung</li>
          <li>ein Gefühl von „dorthin möchte ich“</li>
          <li>innere Bilder von etwas, das berührt</li>
          <li>Tiefe und Weite gleichzeitig spürbar</li>
          <li>ein stilles „das bedeutet mir etwas“</li>
          <li>Verbindung zu etwas, das noch nicht ganz da ist</li>
          <li>ein Gefühl von Sinn oder Ausrichtung</li>
        </ul>
        <p><em>(Öffnung · Verdichtung · Ausdehnung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Das werde ich nie haben“</li>
          <li>„Ich darf mir das nicht wünschen“</li>
          <li>„Das macht mich nur unzufrieden“</li>
          <li>Sehnsucht wird als Mangel interpretiert</li>
          <li>Vergleich mit dem, was fehlt</li>
          <li>Rückzug oder Resignation</li>
          <li>Festhalten an einem bestimmten Ergebnis</li>
          <li>Abwertung der eigenen Wünsche</li>
        </ul>
        <p><em>(Verdichtung als Mangel · Zusammenziehen · Aktivierung als Frust oder Druck)</em></p>
      `,
      happening: `
        <p>Sehnsucht entsteht,<br>
        wenn etwas dich berührt<br>
        und gleichzeitig noch nicht ganz da ist.</p>
        <p>Dein Blick öffnet sich<br>
        für etwas, das möglich ist.</p>
        <p>Das ist Öffnung.</p>
        <p>Gleichzeitig bekommt es Bedeutung.<br>
        Es fühlt sich wichtig an.</p>
        <p>Das ist Verdichtung.</p>
        <p>Und etwas in dir bewegt sich darauf zu.<br>
        Ein inneres Ziehen entsteht.</p>
        <p>Das ist Ausdehnung.</p>
        <p>Sehnsucht ist kein Fehler.<br>
        Sie ist Richtung.</p>
        <p>Sie zeigt dir:</p>
        <p>„Das berührt mich.“<br>
        „Das ist mir wichtig.“<br>
        „Dorthin darf ich mich bewegen.“</p>
        <p>Wenn diese Bewegung jedoch als Mangel oder Unzufriedenheit interpretiert wird,<br>
        verändert sich ihre Qualität.</p>
        <p>Dann wird aus Richtung → Frust<br>
        aus Berührung → Schmerz<br>
        aus Offenheit → Enge</p>
        <p>Nicht weil Sehnsucht falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        unerfüllte Bewegung als Problem zu sehen.</p>
      `,
      flow: `
        <p>Du spürst ein Ziehen in dir.</p>
        <p>Etwas berührt dich.<br>
        Vielleicht ein Bild.<br>
        Vielleicht eine Vorstellung.</p>
        <p>Du merkst:<br>
        „Das bedeutet mir etwas.“</p>
        <p>Du musst es nicht sofort erreichen.<br>
        Du musst es nicht festhalten.</p>
        <p>Du lässt die Bewegung da sein.</p>
        <p>Sie zeigt dir eine Richtung —<br>
        und darf sich gleichzeitig frei bewegen.</p>
      `,
      stuck: `
        <p>Du spürst dieselbe Sehnsucht.</p>
        <p>Doch sofort kommt:</p>
        <p>„Das fehlt mir.“<br>
        „Das ist nicht da.“<br>
        „Ich werde das nie haben.“<br>
        „Ich sollte mir das nicht wünschen.“</p>
        <p>Die Bewegung wird eng.<br>
        Aus Berührung wird Mangel.</p>
        <p>Du ziehst dich zurück<br>
        oder beginnst zu kämpfen.</p>
        <p>Was eigentlich Richtung war,<br>
        wird zu Unzufriedenheit.</p>
        <p>Nicht weil Sehnsucht falsch ist —<br>
        sondern weil dein System versucht,<br>
        dich vor Enttäuschung zu schützen.</p>
      `,
      reminder: `
        <p>Sehnsucht ist kein Mangel.</p>
        <p>Sie ist eine Bewegung in Richtung dessen,<br>
        was dich berührt.</p>
        <p>Du musst sie nicht wegmachen.<br>
        Du musst sie nicht erfüllen.</p>
        <p>Du darfst:</p>
        <p>Du darfst spüren,<br>
        was dich berührt.</p>
        <p>Du darfst wünschen,<br>
        ohne dich dafür zu verurteilen.</p>
        <p>Du darfst eine Richtung fühlen,<br>
        ohne sie festhalten zu müssen.</p>
        <p>Du darfst offen sein<br>
        für das, was dich erreicht.</p>
        <p>Du darfst anerkennen,<br>
        dass etwas dir wichtig ist.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Wünsche enttäuschen können.<br>
        Dass es sicherer ist, nichts zu erwarten.<br>
        Oder dass Sehnsucht schmerzt.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass etwas, das dir wichtig war,<br>
        nicht erfüllt wurde.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du diese Tiefe noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann Sehnsucht zu Mangel wird —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        Sehnsucht wieder als das zu erleben, was sie ist:</p>
        <p>eine leise, ehrliche Bewegung<br>
        in Richtung dessen,<br>
        was dich wirklich berührt.</p>
      `
    },
    'beruehrtheit': {
      natural: `
        <ul>
          <li>ein Gefühl von „das geht mich an“</li>
          <li>Weichheit im Körper (z. B. Brust, Bauch, Augen)</li>
          <li>ein Moment von Stillwerden</li>
          <li>gleichzeitige Tiefe und Offenheit</li>
          <li>ein inneres „das ist echt“</li>
          <li>Verbindung zu sich selbst oder zu etwas außerhalb</li>
          <li>Tränen, Wärme oder Gänsehaut können auftreten</li>
        </ul>
        <p><em>(Öffnung · Verdichtung · Loslassen)</em></p>
      `,
      protection: `
        <ul>
          <li>„Das ist zu viel“</li>
          <li>„Ich darf mich nicht so fühlen“</li>
          <li>„Ich muss mich zusammenreißen“</li>
          <li>Abwertung der eigenen Sensibilität</li>
          <li>schnelles Weggehen aus dem Moment</li>
          <li>Rationalisieren („das ist doch nichts Besonderes“)</li>
          <li>Humor oder Ablenkung als Schutz</li>
          <li>inneres Schließen, um Kontrolle zu behalten</li>
        </ul>
        <p><em>(Zusammenziehen · Verdichtung als Abwehr · Aktivierung als Ablenkung / Kontrolle)</em></p>
      `,
      happening: `
        <p>Berührtheit entsteht im direkten Kontakt.</p>
        <p>Etwas trifft dich.<br>
        Ohne Umweg.<br>
        Ohne Abstand.</p>
        <p>Dein innerer Raum öffnet sich.<br>
        Das ist Öffnung.</p>
        <p>Gleichzeitig bekommt der Moment Bedeutung.<br>
        Er wird spürbar wichtig.</p>
        <p>Das ist Verdichtung.</p>
        <p>Und darin liegt ein natürliches Loslassen:<br>
        für einen Moment fällt Kontrolle weg.</p>
        <p>Das ist Loslassen.</p>
        <p>Berührtheit ist kein Problem.<br>
        Sie ist ein Moment von echtem Kontakt.</p>
        <p>Sie zeigt dir:</p>
        <p>„Das berührt mich.“<br>
        „Das ist echt für mich.“<br>
        „Hier bin ich verbunden.“</p>
        <p>Wenn diese Offenheit jedoch als zu intensiv oder unsicher bewertet wird,<br>
        beginnt dein System, sie zu schließen.</p>
        <p>Dann wird aus Berührtheit → Abwehr<br>
        aus Verbindung → Distanz<br>
        aus Echtheit → Kontrolle</p>
        <p>Nicht weil Berührtheit falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        tiefe Offenheit zu regulieren.</p>
      `,
      flow: `
        <p>Du merkst, dass dich etwas berührt.</p>
        <p>Vielleicht wirst du still.<br>
        Vielleicht weich.</p>
        <p>Du spürst den Moment.</p>
        <p>Du musst nichts tun.<br>
        Du musst nichts erklären.</p>
        <p>Du lässt es da sein.</p>
        <p>Für einen Moment bist du einfach<br>
        in Kontakt mit dem, was ist.</p>
      `,
      stuck: `
        <p>Du merkst dieselbe Berührung.</p>
        <p>Doch sofort kommt:</p>
        <p>„Das ist zu viel.“<br>
        „Reiß dich zusammen.“<br>
        „Das ist doch nichts.“</p>
        <p>Du machst einen Witz.<br>
        Du denkst darüber nach.<br>
        Du gehst aus dem Moment raus.</p>
        <p>Die Offenheit schließt sich.<br>
        Die Tiefe wird unterbrochen.</p>
        <p>Nicht weil es falsch war —<br>
        sondern weil dein System versucht,<br>
        dich in Kontrolle zu halten.</p>
      `,
      reminder: `
        <p>Berührtheit ist nicht zu viel.</p>
        <p>Sie ist ein Moment von echtem Kontakt.</p>
        <p>Du musst sie nicht stoppen.<br>
        Du musst sie nicht erklären.</p>
        <p>Du darfst:</p>
        <p>Du darfst dich berühren lassen,<br>
        ohne dich zu schützen.</p>
        <p>Du darfst weich werden,<br>
        ohne dich zu verlieren.</p>
        <p>Du darfst fühlen,<br>
        ohne es kontrollieren zu müssen.</p>
        <p>Du darfst in Kontakt sein,<br>
        ohne dich zurückzuziehen.</p>
        <p>Du darfst einen Moment lang einfach da sein<br>
        mit dem, was dich berührt.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Tiefe zu viel ist.<br>
        Dass Offenheit verletzlich macht.<br>
        Oder dass du dich schützen musst.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass solche Momente nicht gehalten wurden.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du diese Offenheit noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du dich schließt oder ablenkst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        diese Berührung zu halten —<br>
        in deinem Tempo.</p>
      `
    },
    'wut': {
      natural: `
        <ul>
          <li>starke Energie im Körper</li>
          <li>Hitze, Druck oder Intensität</li>
          <li>ein Gefühl von „es ist zu viel“</li>
          <li>ein Impuls, etwas zu entladen</li>
          <li>ungeformte Kraft</li>
          <li>ein inneres „Stopp“ ohne klare Richtung</li>
          <li>erhöhte Aktivität oder Spannung</li>
        </ul>
        <p><em>(Aktivierung · Verdichtung · Ausdehnung)</em></p>
      `,
      protection: `
        <ul>
          <li>„Ich darf nicht so wütend sein“</li>
          <li>„Das ist zu viel“</li>
          <li>„Ich verliere die Kontrolle“</li>
          <li>Unterdrücken oder sofortiges „Runterdrücken“</li>
          <li>impulsives Ausagieren (Schreien, Angreifen)</li>
          <li>Schuldzuweisung nach außen</li>
          <li>Selbstverurteilung nach der Reaktion</li>
          <li>Angst vor der eigenen Energie</li>
        </ul>
        <p><em>(Zusammenziehen · Verdichtung als Selbsturteil · Aktivierung als Übersteuerung / Explosion)</em></p>
      `,
      happening: `
        <p>Wut ist rohe Energie.</p>
        <p>Etwas hat sich aufgebaut.<br>
        Etwas ist zu viel geworden.</p>
        <p>Dein System aktiviert stark.<br>
        Das ist Aktivierung.</p>
        <p>Gleichzeitig bündelt sich Spannung.<br>
        Das ist Verdichtung.</p>
        <p>Und diese Energie will sich bewegen.<br>
        Das ist Ausdehnung.</p>
        <p>Wut ist nicht gegen dich.<br>
        Sie ist Energie ohne Richtung.</p>
        <p>Oft entsteht sie,<br>
        wenn Grenzen lange nicht gehört wurden<br>
        oder wenn sich etwas angestaut hat.</p>
        <p>Sie zeigt dir:</p>
        <p>„Hier ist viel Energie.“<br>
        „Hier wurde etwas überschritten.“<br>
        „Hier braucht etwas Raum.“</p>
        <p>Wenn diese Energie jedoch als gefährlich oder falsch bewertet wird,<br>
        verändert sich ihr Ausdruck.</p>
        <p>Dann wird sie entweder:</p>
        <p>unterdrückt → innerer Druck<br>
        oder<br>
        unkontrolliert entladen → Konflikt</p>
        <br>
        <p>Nicht weil Wut falsch ist —<br>
        sondern weil dein System gelernt hat,<br>
        mit dieser Intensität umzugehen.</p>
      `,
      flow: `
        <p>Du spürst die starke Energie.</p>
        <p>Sie ist da.<br>
        Intensiv.</p>
        <p>Du musst sie nicht sofort loswerden.<br>
        Du musst sie nicht kontrollieren.</p>
        <p>Du gibst ihr Raum im Körper.</p>
        <p>Vielleicht atmest du.<br>
        Vielleicht bewegst du dich.</p>
        <p>Langsam wird sie klarer.</p>
        <p>Aus Wut kann Richtung entstehen.<br>
        Aus Druck wird Klarheit.</p>
      `,
      stuck: `
        <p>Du spürst die gleiche Intensität.</p>
        <p>Doch sofort kommt:</p>
        <p>„Das darf nicht sein.“<br>
        oder<br>
        sie entlädt sich direkt.</p>
        <p>Du unterdrückst sie<br>
        → sie staut sich weiter auf</p>
        <p>oder du reagierst impulsiv<br>
        → danach folgt oft Schuld oder Scham</p>
        <p>Die Energie bleibt unverstanden.</p>
        <p>Nicht weil Wut falsch ist —<br>
        sondern weil dein System versucht,<br>
        mit zu viel Energie schnell umzugehen.</p>
      `,
      reminder: `
        <p>Wut ist nicht gefährlich.</p>
        <p>Sie ist Energie,<br>
        die Raum braucht.</p>
        <p>Du musst sie nicht unterdrücken.<br>
        Du musst sie nicht ausagieren.</p>
        <p>Du darfst:</p>
        <p>Du darfst starke Energie fühlen,<br>
        ohne dich zu verlieren.</p>
        <p>Du darfst dir Raum geben,<br>
        ohne sofort handeln zu müssen.</p>
        <p>Du darfst die Intensität halten,<br>
        ohne sie zu bewerten.</p>
        <p>Du darfst spüren,<br>
        dass etwas zu viel ist.</p>
        <p>Du darfst warten,<br>
        bis aus Wut Klarheit entsteht.</p>
        <p style="margin-top: 2.5rem; color: var(--color-text-faint);"><em>(Du darfst dir diese Sätze in Ich Form als Entkopplung und Erlaubnis zuflüstern, wenn du magst)</em></p>
      `,
      peace: `
        <p>Diese Muster sind nicht dein Feind.</p>
        <p>Vielleicht hast du irgendwann gelernt,<br>
        dass Wut gefährlich ist.<br>
        Dass sie zerstört.<br>
        Oder dass sie unterdrückt werden muss.</p>
        <p>Vielleicht hast du erlebt,<br>
        dass starke Energie nicht gehalten werden konnte.</p>
        <p>Diese Schutzbewegungen haben dich getragen,<br>
        als du diese Intensität noch nicht selbst halten konntest.</p>
        <p>Du musst sie nicht verurteilen.</p>
        <p>Wenn du sie erkennst,<br>
        bist du bereits weiter geworden.</p>
        <p>Du kannst wahrnehmen,<br>
        wann du unterdrückst oder explodierst —<br>
        ohne dich dafür zu kritisieren.</p>
        <p>Und du darfst beginnen,<br>
        diese Energie zu halten,<br>
        bis sie sich klärt.</p>
      `
    }
  };

  function fillData(key) {
    const data = contentMap[key] || placeholderText;
    document.getElementById('content-natural').innerHTML = data.natural;
    document.getElementById('content-protection').innerHTML = data.protection;
    document.getElementById('content-happening').innerHTML = data.happening;
    document.getElementById('content-flow').innerHTML = data.flow;
    document.getElementById('content-stuck').innerHTML = data.stuck;
    document.getElementById('content-reminder').innerHTML = data.reminder;
    document.getElementById('content-peace').innerHTML = data.peace;
  }

  if (select) {
    select.addEventListener('change', (e) => {
      const value = e.target.value;
      if (!value) return;

      // Fade out
      dynamicContent.style.opacity = '0';
      
      setTimeout(() => {
        fillData(value);
        dynamicContent.style.display = 'block';
        
        // Trigger reflow
        void dynamicContent.offsetWidth;
        
        dynamicContent.style.opacity = '1';
        
        // Cascade fade in sections
        sections.forEach((sec, index) => {
          sec.classList.remove('is-visible');
          setTimeout(() => {
            sec.classList.add('is-visible');
          }, index * 180 + 150);
        });

      }, 400); // Wait for fade out
    });

    dynamicContent.style.transition = 'opacity 0.5s ease';
  }
});
