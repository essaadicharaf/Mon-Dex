# Mon Dex — Digimon

Une encyclopédie web interactive dédiée à l'univers **Digimon**, développée avec HTML5, Tailwind CSS et JavaScript moderne (Vanilla JS). L'application permet d'explorer un catalogue de créatures numériques, d'afficher leurs statistiques détaillées, de rechercher et filtrer en temps réel, de composer une équipe de combat limitée à 6 membres et d'ajouter de nouveaux Digimon via un formulaire sécurisé par expressions régulières.

---

## 🎯 Univers Choisi

* **Univers :** Digimon


* **Attributs supportés :** Vaccine, Data, Virus


* **Niveaux d'évolution :** Rookie, Champion, Ultimate, Mega


* **Statistiques évaluées :** Puissance (ATK), Défense (DEF), Vitesse (SPD)


* **Source des données et visuels :** [Digimon Public Database / Shadowsmith](https://digimon.shadowsmith.com/)



---

## ✨ Fonctionnalités Obligatoires Implémentées

1. **Affichage dynamique de la grille :** Suppression intégrale des cartes écrites en dur dans le HTML ; génération dynamique des cartes à partir de la collection `creatures` de `data.js`.


2. **Panneau de détail interactif :** Un clic sur n'importe quelle carte affiche ses visuels haute résolution, ses caractéristiques et des barres d'état proportionnelles calculées sur une échelle de 0 à 999.


3. **Recherche en direct :** Filtrage instantané à chaque saisie (`input`), insensible à la casse.


4. **Filtres par attribut :** Boutons de filtrage par type (*Tous*, *Vaccine*, *Data*, *Virus*) fonctionnant en synergie avec la recherche textuelle.


5. **Formulaire de création sécurisé :** Validation stricte par expressions régulières (Regex) avec retour visuel immédiat (bordure rouge/verte et messages contextuels) à la perte de focus (`blur`) et correction active (`input`).


6. **Gestion de l'équipe (Event Delegation) :** Ajout et suppression de créatures gérés par délégation d'événements centralisée via un écouteur sur la grille (`#grid`) et un écouteur sur l'équipe (`#team-list`).


7. **Règles d'équipe et contraintes :**
* Limite stricte de 6 créatures maximum.


* Interdiction totale des doublons.


* Alertes explicites en cas de refus d'action.


* Mise à jour en temps réel des compteurs d'équipe dans l'en-tête et dans le panneau latéral.


* Désactivation automatique (`disabled`, `opacity-50`, `cursor-not-allowed`) des boutons d'ajout pour les créatures déjà sélectionnées ou lorsque l'équipe est complète.





---

## 🧪 Tests des Expressions Régulières (Console Tests)

Conformément aux exigences du brief, chaque expression régulière a été testée rigoureusement dans la console avec au moins 2 valeurs valides et 2 valeurs invalides :

| Champ | Règle du Brief | Expression Régulière | Valeurs Valides (`true`) | Valeurs Invalides (`false`) |
| --- | --- | --- | --- | --- |
| **Numéro**

 | `#` suivi de 3 chiffres, unicité dans la liste

 | `/^#\d{3}$/`

 | `"#013"`<br>

<br>`"#999"` | `"013"` *(manque le dièse)*<br>

<br>`"#12"` *(2 chiffres au lieu de 3)* |
| **Nom**

 | 2 à 30 caractères, commence par lettre/chiffre ; caractères autorisés : lettres, chiffres, espaces, `.`, `'`, `-`

 | `/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/`

 | `"Veemon"`<br>

<br>`"War-Greymon 2"` | `"A"` *(trop court, < 2 car.)*<br>

<br>`" Agumon"` *(débute par un espace)* |
| **Statistiques**

 | Entier de 0 à 999

 | `/^\d{1,3}$/`

 | `"0"`<br>

<br>`"450"` | `"1000"` *(dépasse 3 chiffres)*<br>

<br>`"-50"` *(caractère négatif interdit)* |
| **Lien Image**

 | Lien https se terminant par `.png`, `.jpg`, `.jpeg`, `.webp` ou `.gif`

 | `/^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i`

 | `"[https://site.com/digimon.png](https://site.com/digimon.png)"`<br>

<br>`"[https://domain.org/image.webp](https://domain.org/image.webp)"` | `"[http://site.com/pic.jpg](http://site.com/pic.jpg)"` *(non sécurisé, pas https)*<br>

<br>`"[https://site.com/doc.pdf](https://site.com/doc.pdf)"` *(extension invalide)* |
| **Description**

 | 10 à 200 caractères

 | `/^[\s\S]{10,200}$/`

 | `"Un dragon de feu courageux."` *(28 car.)*<br>

<br>`"Guerrier numérique d'élite protégeant le réseau."` *(49 car.)* | `"Court"` *(< 10 caractères)*<br>

<br>`"Texte...".repeat(50)` *(> 200 caractères)* |

---

## 📁 Architecture du Projet

```text
Mon-Dex/
├── data.js               # Données source : collection de 12 créatures Digimon de base
├── index.html            # Structure sémantique HTML5 & composants Tailwind
├── script.js             # Logique applicative Vanilla JS (DOM, regex, filtres, équipe)
├── tailwind.config.js    # Configuration du thème, tokens d'attributs et couleurs
├── src/
│   └── input.css         # Directives Tailwind et styles de base
├── dist/
│   └── output.css        # Feuille de style compilée et minifiée
└── README.md             # Documentation technique et tests

```

---

## 🚀 Installation et Lancement

1. **Cloner le dépôt :**
```bash
git clone https://github.com/essaadicharaf/Sprint-2-Brief-1-Mon-Dex.git
cd Sprint-2-Brief-1-Mon-Dex

```


2. **Installer les dépendances (compilation Tailwind) :**
```bash
npm install

```


3. **Compiler les feuilles de style Tailwind :**
```bash
# Mode surveillance (Watch) pendant le développement
npm run watch

# Ou compilation unique minifiée pour la production
npm run build

```


4. **Exécuter le projet :**
* Ouvrir simplement `index.html` dans votre navigateur ou via l'extension **Live Server** de VS Code.





---

## 👤 Auteur

* **Développeur :** ESSAADI CHARAF EDDINE


* **Formation :** YouCode Safi — Sprint 2 : Mon Dex