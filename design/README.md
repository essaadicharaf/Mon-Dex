# Maquette

La maquette de la version finale (desktop, mobile et états) est disponible ici :

[lien de la maquette — à ajouter par le formateur]

Suivez-la pour le thème, la section « Mon équipe » et les états (survol, focus, erreur, désactivé).
<<<<<<< HEAD
=======


### 🧪 Tests des Expressions Régulières (Console Tests)

| Champ | Regex | Valeurs Valides (true) | Valeurs Invalides (false) |
| :--- | :--- | :--- | :--- |
| **Numéro** | `/^#\d{3}$/` | `"#001"`<br>`"#999"` | `"001"` (manque #)<br>`"#12"` (2 chiffres au lieu de 3) |
| **Nom** | `/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/` | `"Agumon"`<br>`"War-Greymon 2"` | `"A"` (trop court, < 2 car.)<br>`" Nom"` (commence par un espace) |
| **Statistique** | `/^\d{1,3}$/` | `"0"`<br>`"450"` | `"1000"` (> 3 chiffres)<br>`"-10"` (caractère négatif non autorisé) |
| **Image** | `/^https:\/\/\S+\.(png\|jpe?g\|webp\|gif)$/i` | `"https://site.com/img.png"`<br>`"https://dex.com/agumon.webp"` | `"http://site.com/img.png"` (non sécurisé, pas https)<br>`"https://site.com/doc.pdf"` (extension invalide) |
| **Description** | `/^[\s\S]{10,200}$/` | `"Un Digimon très courageux."` (27 car.)<br>`"Dragon de feu puissant au combat numérique."` (43 car.) | `"Court"` (< 10 caractères)<br>`"a".repeat(201)` (> 200 caractères) |
>>>>>>> feature/partie-2-javascript
