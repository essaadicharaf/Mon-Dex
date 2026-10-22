// 1- Affichage. Supprimez les cartes écrites à la main et construisez la grille à partir du tableau creatures.
const grid = document.querySelector("#grid");

const listCards = () => {
  grid.innerHTML = "";

  creatures.forEach((creature) => {
    let badgeStyle = "border-green-800 text-attribute-vaccine";
    if (creature.type === "Data") {
      badgeStyle = "border-blue-800 text-attribute-data";
    } else if (creature.type === "Virus") {
      badgeStyle = "border-red-800 text-attribute-virus";
    }

    const card = `
      <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
        <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
          <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
          <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
        </div>
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
          <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
        </div>
        <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
        <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
          Ajouter à l'équipe
        </button>
      </article>
    `;

    grid.innerHTML += card;
  });
};
listCards();

// 2-Détail. Un clic sur une carte ouvre le panneau de détail : image, description, et statistiques affichées en barres.
const detailPanel = document.querySelector("#detail");

function showDetail(creature) {
  if (!creature || !detailPanel) return;

  const badgeColor = creature.type === "Vaccine" ? "border-green-800 text-attribute-vaccine" : creature.type === "Data" ? "border-blue-800 text-attribute-data" : "border-red-800 text-attribute-virus";

  const atkPercent = Math.min(100, Math.round((creature.stats.attack / 999) * 100));
  const defPercent = Math.min(100, Math.round((creature.stats.defence / 999) * 100));
  const spdPercent = Math.min(100, Math.round((creature.stats.speed / 999) * 100));

  detailPanel.classList.remove("p-8");
  detailPanel.innerHTML = `
     <section id="detail" aria-label="Détail de la créature" class="flex flex-col gap-4   sm:p-6 w-full max-w-full ms:max-w-60 overflow-hidden shadow-lg">
            <div class="flex items-center justify-between">
              <span class="font-mono text-sm text-muted">${creature.id} · Détail</span>
              <button type="button" aria-label="Fermer le détail" class="btn-outline w-9 h-9 flex items-center justify-center p-0">✕</button>
            </div>
            <div class="flex sm:max-h-60 sm:max-w-60 lg:min-h-80 lg:min-w-80 lg:ml-5 ms:ml-5 items-end justify-center rounded-2xl bg-brand-light border border-line/40 overflow-hidden">
              <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
            </div>
            <div class="flex items-center justify-between">
              <h2 class="font-display text-2xl font-extrabold text-ink">${creature.name}</h2>
              <span class="rounded-full px-3 py-1.5 bg-white border ${badgeColor} text-xs font-bold">Vaccine</span>
            </div>
            <p class="text-muted text-xs text-start sm:text-sm leading-relaxed">${creature.description}</p>

            <div class="flex flex-col gap-2.5 text-xs">
              <div class="grid grid-cols-[70px_1fr_40px] items-center gap-2">
                <span class="font-bold text-ink">Puissance</span>
                <div class="h-2.5 rounded-full bg-ground overflow-hidden border border-line">
                  <div class="h-full rounded-full bg-brand" style="width: ${atkPercent}%"></div>
                </div>
                <span class="text-right font-mono font-bold text-ink">${creature.stats.attack}</span>
              </div>
              <div class="grid grid-cols-[70px_1fr_40px] items-center gap-2">
                <span class="font-bold text-ink">Défense</span>
                <div class="h-2.5 rounded-full bg-ground overflow-hidden border border-line">
                  <div class="h-full rounded-full bg-attribute-data" style="width: ${defPercent}%"></div>
                </div>
                <span class="text-right font-mono font-bold text-ink">${creature.stats.defence}</span>
              </div>
              <div class="grid grid-cols-[70px_1fr_40px] items-center gap-2">
                <span class="font-bold text-ink">Vitesse</span>
                <div class="h-2.5 rounded-full bg-ground overflow-hidden border border-line">
                  <div class="h-full rounded-full bg-attribute-vaccine" style="width: ${spdPercent}%"></div>
                </div>
                <span class="text-right font-mono font-bold text-ink">${creature.stats.speed}</span>
              </div>
            </div>

            <button type="button" class="btn-add-team btn-primary w-full py-2.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">Ajouter à l'équipe</button>
          </section>
`;

  document.getElementById("btn-close-detail").addEventListener("click", () => {
    detailPanel.innerHTML = `
                   <div class="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-display text-base font-bold text-ink">Aucun Digimon sélectionné</h3>
              <p class="text-xs text-muted m-1 max-w-[220px]">Cliquez sur une carte de la grille pour afficher ses détails et ses statistiques.</p>
            </div>
            `;
  });
}

grid.addEventListener("click", (e) => {
  if (e.target.closest('[data-action="add-team"]')) return;

  const card = e.target.closest("article");
  if (!card) return;

  const creatureId = card.getAttribute("data-id");

  const selectedCreature = creatures.find((c) => c.id === creatureId);

  if (selectedCreature) {
    showDetail(selectedCreature);
  }
});

// 3- Recherche. La liste se met à jour pendant la saisie d'un nom (sans tenir compte des majuscules).
const inputSearch = document.querySelector("#search");
inputSearch.addEventListener("keyup", () => {
  // console.log(inputSearch.value)
  grid.innerHTML = "";
  creatures.forEach((creature) => {
    if (creature.name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
      // console.log(inputSearch.value + "--- " + creature.name );
      let badgeStyle = "border-green-800 text-attribute-vaccine";
      if (creature.type === "Data") {
        badgeStyle = "border-blue-800 text-attribute-data";
      } else if (creature.type === "Virus") {
        badgeStyle = "border-red-800 text-attribute-virus";
      }

      const card = `
            <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
              <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
                <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
                <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
              </div>
              <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
              <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
                Ajouter à l'équipe
              </button>
            </article>
          `;

      grid.innerHTML += card;
    }
  });
});

// 4- Filtre. Les boutons de type n'affichent que les créatures de ce type ; « Tous » réinitialise le filtre. La recherche et le filtre fonctionnent ensemble.
const btnVaccine = document.querySelector('[data-type="Vaccine"]');
const btnData = document.querySelector('[data-type="Data"]');
const btnVirus = document.querySelector('[data-type="Virus"]');
const btnAll = document.querySelector('[data-type="all"]');

btnVaccine.addEventListener("click", () => {
  grid.innerHTML = "";
  creatures.forEach((creature) => {
    if (creature.type === "Vaccine") {
      let badgeStyle = "border-green-800 text-attribute-vaccine";
      if (creature.type === "Data") {
        badgeStyle = "border-blue-800 text-attribute-data";
      } else if (creature.type === "Virus") {
        badgeStyle = "border-red-800 text-attribute-virus";
      }

      const card = `
            <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
              <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
                <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
                <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
              </div>
              <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
              <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
                Ajouter à l'équipe
              </button>
            </article>
          `;

      grid.innerHTML += card;
    }
  });
});
btnData.addEventListener("click", () => {
  grid.innerHTML = "";
  creatures.forEach((creature) => {
    if (creature.type === "Data") {
      let badgeStyle = "border-green-800 text-attribute-vaccine";
      if (creature.type === "Data") {
        badgeStyle = "border-blue-800 text-attribute-data";
      } else if (creature.type === "Virus") {
        badgeStyle = "border-red-800 text-attribute-virus";
      }

      const card = `
            <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
              <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
                <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
                <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
              </div>
              <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
              <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
                Ajouter à l'équipe
              </button>
            </article>
          `;

      grid.innerHTML += card;
    }
  });
});
btnVirus.addEventListener("click", () => {
  grid.innerHTML = "";
  creatures.forEach((creature) => {
    if (creature.type === "Virus") {
      let badgeStyle = "border-green-800 text-attribute-vaccine";
      if (creature.type === "Data") {
        badgeStyle = "border-blue-800 text-attribute-data";
      } else if (creature.type === "Virus") {
        badgeStyle = "border-red-800 text-attribute-virus";
      }

      const card = `
            <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
              <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
                <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
                <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
              </div>
              <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
              <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
                Ajouter à l'équipe
              </button>
            </article>
          `;

      grid.innerHTML += card;
    }
  });
});
btnAll.addEventListener("click", () => {
  grid.innerHTML = "";
  creatures.forEach((creature) => {
    let badgeStyle = "border-green-800 text-attribute-vaccine";
    if (creature.type === "Data") {
      badgeStyle = "border-blue-800 text-attribute-data";
    } else if (creature.type === "Virus") {
      badgeStyle = "border-red-800 text-attribute-virus";
    }

    const card = `
            <article onclick="cardSelected()" data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
              <div class="relative flex h-50 w-full items-center justify-center rounded-xl bg-brand-light border border-line/50 overflow-hidden">
                <img src="${creature.image}" alt="${creature.name}" class="rounded-xl p-[1px] object-cover pointer-events-none" />
                <span class="absolute left-3 top-2 font-mono text-xs text-muted font-bold">${creature.id}</span>
              </div>
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-ink">${creature.name}</h3>
                <span class="rounded-full px-3 py-1 bg-white border ${badgeStyle} text-xs font-bold">${creature.type}</span>
              </div>
              <p class="text-xs text-muted">${creature.level} · Attaque ${creature.stats.attack}</p>
              <button type="button" data-action="add-team" data-id="${creature.id}" class="btn-add-team btn-outline mt-1 text-sm py-2 text-white bg-brand border-none">
                Ajouter à l'équipe
              </button>
            </article>
          `;

    grid.innerHTML += card;
  });
});

// 5 - Créer une créature. Le formulaire ajoute une nouvelle créature au tableau et à la grille, après validation par expressions régulières (tableau ci-dessous).

// const form = document.querySelector('#creature-form');
// const idInput = document.querySelector('input[name="id"]');
// const nameInput = document.querySelector('input[name="name"]');
// const typeSelect = document.querySelector('select[name="type"]'); 
// const levelInput = document.querySelector('select[name="level"]');
// const stat1Input = document.querySelector('input[name="stat1"]');
// const stat2Input = document.querySelector('input[name="stat2"]');
// const stat3Input = document.querySelector('input[name="stat3"]');
// const imageInput = document.querySelector('input[name="image"]');
// const descriptionInput = document.querySelector('textarea[name="description"]');

// //

// const REGEX_RULES = {
//   id: /^#\d{3}$/,                                             
//   name: /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,           
//   level: /^[A-Za-zÀ-ÿ0-9 -]{2,20}$/,                          
//   stat1: /^\d{1,3}$/,                                          
//   stat2: /^\d{1,3}$/,
//   stat3: /^\d{1,3}$/,
//   image: /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,            
//   description: /^[\s\S]{10,200}$/                              
// };
// // validate Id
// function validateId() {
//   const value = idInput.value.trim();
//   const errorSpan = idInput.parentElement.querySelector('.error-message');
//     const isFormatValid = regId.test(value);
//     const isDuplicate = creatures.some(c => c.id === value);

//   if (!isFormatValid) {
//     idInput.classList.add('!border-attribute-virus');
//     idInput.classList.remove('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "Format attendu : # suivi de 3 chiffres (ex: #013).";
//     console.log("id invalid (format)");
//     return false;
//   } else if (isDuplicate) {
//     idInput.classList.add('!border-attribute-virus');
//     idInput.classList.remove('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "Ce numéro existe déjà dans le Dex.";
//     console.log("id invalid (doublon)");
//     return false;
//   } else {
//     idInput.classList.remove('!border-attribute-virus');
//     idInput.classList.add('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "";
//     console.log("id valid");
//     return true;
//   }
// }

// idInput.addEventListener("keyup", validateId);
// idInput.addEventListener("input", () => {
//   if (idInput.classList.contains('!border-attribute-virus')) {
//     validateId();
//   }
// });
// //  validate Puissance
// function validatePuissance() {
//   const value = stat1.value.trim();
//   const errorSpan = stat1.parentElement.querySelector('.error-message');
//     const isFormatValid = regStat.test(value);
    

//   if (!isFormatValid) {
//     stat1.classList.add('!border-attribute-virus');
//     stat1.classList.remove('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "Format attendu : 3 chiffres (ex: 123).";
//     // console.log("invalid (");
//     return false;
//   } else {
//     stat1.classList.remove('!border-attribute-virus');
//     stat1.classList.add('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "validate Puissance"; errorSpan.sty
//     // console.log("id valid");
//     return true;
//   }
// }

// stat1.addEventListener("keyup", validatePuissance);
// stat1.addEventListener("input", () => {
//   if (stat1.classList.contains('!border-attribute-virus')) {
//     validatePuissance();
//   }
// });

// //  validate Défense
// function validateDefense() {
//   const value = stat2.value.trim();
//   const errorSpan = stat2.parentElement.querySelector('.error-message');
//     const isFormatValid = regStat.test(value);
    

//   if (!isFormatValid) {
//     stat2.classList.add('!border-attribute-virus');
//     stat2.classList.remove('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "Format attendu : 3 chiffres (ex: 123).";
//     // console.log("invalid (");
//     return false;
//   } else {
//     stat2.classList.remove('!border-attribute-virus');
//     stat2.classList.add('!border-attribute-vaccine');
//     if (errorSpan) errorSpan.textContent = "validate Puissance"; errorSpan.sty
//     // console.log("id valid");
//     return true;
//   }
// }

// stat2.addEventListener("keyup", validateDefense);
// stat2.addEventListener("input", () => {
//   if (stat2.classList.contains('!border-attribute-virus')) {
//     validatePuissance();
//   }
// });

