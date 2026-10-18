# Freya Head Spa Sibiu — DESIGN

**Scena fizică:** o femeie care derulează pe telefon seara, pe canapea, după ce a dat de un reel. Lumina e caldă și slabă. Pagina trebuie să se simtă ca momentul în care intri pe ușa salonului.

**Culorile** (din salonul real, păstrate din sistemul existent)
- `--deep #102c26` / `--forest #183e34`: catifeaua verde a perdelelor și a fotoliilor
- `--gold #c4a574`: arcurile aurii, ramele oglinzilor, neonul
- `--cream #f6f2eb` / `--sand #e9e0d3`: pereții, pampasul, gresia
- Accent doar în hero: violetul și albastrul proiectorului de stele, folosit numai în tranziția spre cer.

**Tipografia:** păstrăm sistemul existent. Titlurile sunt cu serif (Georgia), cu italic auriu pe a doua linie. Etichetele sunt cu majuscule mici și litere spațiate. Nu schimbăm fonturile.

**Hero: coridor 3D (app/scroll-hero.tsx, three.js)**
- Secțiune înaltă (700vh) cu un canvas sticky de `100svh`. Fundalul e verde închis, cu ceață verde, iar în depărtare totul se topește în verde.
- 7 rame aurii plutitoare, așezate alternativ stânga-dreapta: cele 2 videouri reale (cascada, masajul) ca VideoTexture și 5 poze reale (ritual, paturi cu abur, arcul cu apă).
- Particule aurii moi care urcă lent, ca aburul.
- Camera se mișcă la scroll (cu lerp) și urmărește puțin mouse-ul. Videourile rulează doar când sunt aproape.
- Textul: titlul la început, apoi „01 / 07 + eticheta” cu o bară de progres, la final „Aici începe pauza ta” și butonul de WhatsApp.
- Pozele cu recepția și cu camera cu stele (watermark Notino) NU se folosesc.

**Restul paginii, în același stil 3D**
- `app/depth-effects.tsx`: secțiunile (`.reveal`) se ridică din pagină la scroll, cu perspectivă și rotateX. Cardurile de servicii se înclină după mouse și au o strălucire aurie, doar pe desktop. Secțiunile verzi au praf auriu desenat pe un canvas 2D.
- `app/gallery-3d.tsx`: galerie carusel 3D curbată, rotită de scroll, cu 5 poze și 2 videouri reale.
- Oferta: videoul real cu masajul, care rulează în buclă, în locul pozei.
- Toate efectele se opresc la `prefers-reduced-motion`.

**Interzis în acest proiect**
- Fonturi noi, gradiente neon, glassmorphism.
- Smooth-scroll de tip Lenis (strică `position: sticky`).
- Persoane generate de AI și obiecte care nu există în salon.
- Watermark-ul Notino vizibil oriunde pe site.
