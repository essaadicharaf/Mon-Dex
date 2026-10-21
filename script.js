// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------
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
      <article data-id="${creature.id}" class="flex flex-col gap-3 rounded-xl bg-surface p-3 pb-4 border-2 border-line shadow-md hover:-translate-y-1 hover:border-brand transition-all duration-200 cursor-pointer">
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
