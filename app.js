import { CATEGORIES, MOTORCYCLES, MANUFACTURERS, PARTS } from './parts-data.js';

// Application State
const state = {
  selectedMotorcycle: 'all',
  selectedCategory: 'all',
  searchQuery: '',
  theme: 'dark',
  adminMode: false,
  activeAdminTab: 'parts',
  parts: [],
  motorcycles: [],
  manufacturers: []
};

// DOM Elements
const motoSelector = document.getElementById('moto-selector');
const categorySelector = document.getElementById('category-selector');
const partsGrid = document.getElementById('parts-grid');
const emptyState = document.getElementById('empty-state');
const resultsCount = document.getElementById('results-count');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');
const manufacturersGrid = document.getElementById('manufacturers-grid');
const activeFiltersBar = document.getElementById('active-filters-bar');
const activeFiltersList = document.getElementById('active-filters-list');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const resetSearchBtn = document.getElementById('reset-search-btn');

// Detail Dialog elements
const detailDialog = document.getElementById('part-detail-dialog');
const closeDialogBtn = document.getElementById('close-dialog-btn');
const dialogBody = document.getElementById('dialog-body');

// Admin Controls elements
const adminToggle = document.getElementById('admin-toggle');
const adminControlsBar = document.getElementById('admin-controls-bar');
const addPartBtn = document.getElementById('add-part-btn');
const addMotoBtn = document.getElementById('add-moto-btn');
const addMfgBtn = document.getElementById('add-mfg-btn');
const exportPartsBtn = document.getElementById('export-parts-btn');
const resetPartsBtn = document.getElementById('reset-parts-btn');

// Admin Dashboard Elements
const adminDashboard = document.getElementById('admin-dashboard');
const tabParts = document.getElementById('tab-parts');
const tabMotorcycles = document.getElementById('tab-motorcycles');
const tabManufacturers = document.getElementById('tab-manufacturers');
const panelParts = document.getElementById('admin-panel-parts');
const panelMotorcycles = document.getElementById('admin-panel-motorcycles');
const panelManufacturers = document.getElementById('admin-panel-manufacturers');
const adminPartsCategoriesList = document.getElementById('admin-parts-categories-list');
const adminMotosTableBody = document.getElementById('admin-motos-table-body');
const adminMfgsTableBody = document.getElementById('admin-mfgs-table-body');

// Admin Dashboard Action Triggers (inside dashboard)
const adminAddPartBtn = document.getElementById('admin-add-part-btn');
const adminAddMotoBtn = document.getElementById('admin-add-moto-btn');
const adminAddMfgBtn = document.getElementById('admin-add-mfg-btn');

// Image upload Elements
const formPartImage = document.getElementById('form-part-image');
const formPartImagePreview = document.getElementById('form-part-image-preview');
const formPartImagePreviewContainer = document.getElementById('form-part-image-preview-container');
const formPartImageClearBtn = document.getElementById('form-part-image-clear-btn');

// Temporary image storage
let currentPartImageBase64 = null;

// Login Dialog elements
const loginDialog = document.getElementById('login-dialog');
const closeLoginBtn = document.getElementById('close-login-btn');
const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginErrorMsg = document.getElementById('login-error-msg');

// Part Form Dialog elements
const partFormDialog = document.getElementById('part-form-dialog');
const closeFormDialogBtn = document.getElementById('close-form-dialog-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const partEditorForm = document.getElementById('part-editor-form');
const editPartId = document.getElementById('edit-part-id');
const formPartName = document.getElementById('form-part-name');
const formPartSku = document.getElementById('form-part-sku');
const formPartCategory = document.getElementById('form-part-category');
const formPartManufacturer = document.getElementById('form-part-manufacturer');
const formPartPrice = document.getElementById('form-part-price');
const formPartUrl = document.getElementById('form-part-url');
const formPartDesc = document.getElementById('form-part-desc');
const formCompatGrid = document.getElementById('form-compat-grid');
const formSpecsContainer = document.getElementById('form-specs-container');
const addSpecRowBtn = document.getElementById('add-spec-row-btn');
const formDialogTitle = document.getElementById('form-dialog-title');

// Motorcycle Form Dialog elements
const motoFormDialog = document.getElementById('moto-form-dialog');
const closeMotoFormBtn = document.getElementById('close-moto-form-btn');
const cancelMotoFormBtn = document.getElementById('cancel-moto-form-btn');
const motoEditorForm = document.getElementById('moto-editor-form');
const editMotoId = document.getElementById('edit-moto-id');
const formMotoBrand = document.getElementById('form-moto-brand');
const formMotoModel = document.getElementById('form-moto-model');
const formMotoYear = document.getElementById('form-moto-year');
const formMotoEngine = document.getElementById('form-moto-engine');
const formMotoClass = document.getElementById('form-moto-class');
const motoFormTitle = document.getElementById('moto-form-title');

// Manufacturer Form Dialog elements
const mfgFormDialog = document.getElementById('mfg-form-dialog');
const closeMfgFormBtn = document.getElementById('close-mfg-form-btn');
const cancelMfgFormBtn = document.getElementById('cancel-mfg-form-btn');
const mfgEditorForm = document.getElementById('mfg-editor-form');
const editMfgId = document.getElementById('edit-mfg-id');
const formMfgName = document.getElementById('form-mfg-name');
const formMfgOrigin = document.getElementById('form-mfg-origin');
const formMfgUrl = document.getElementById('form-mfg-url');
const formMfgDesc = document.getElementById('form-mfg-desc');
const mfgFormTitle = document.getElementById('mfg-form-title');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  initAdminSession();
  renderMotoSelectors();
  renderCategorySelectors();
  renderManufacturers();
  renderParts();
  setupEventListeners();
});

// Load / Save dynamic lists from LocalStorage
function loadData() {
  // Parts
  const localParts = localStorage.getItem('parts');
  if (localParts) {
    try {
      state.parts = JSON.parse(localParts);
    } catch (e) {
      console.error("Chyba při načítání dílů:", e);
      state.parts = [...PARTS];
    }
  } else {
    state.parts = [...PARTS];
  }

  // Motorcycles
  const localMotos = localStorage.getItem('motorcycles');
  if (localMotos) {
    try {
      state.motorcycles = JSON.parse(localMotos);
    } catch (e) {
      console.error("Chyba při načítání motocyklů:", e);
      state.motorcycles = [...MOTORCYCLES];
    }
  } else {
    state.motorcycles = [...MOTORCYCLES];
  }

  // Manufacturers
  const localMfgs = localStorage.getItem('manufacturers');
  if (localMfgs) {
    try {
      state.manufacturers = JSON.parse(localMfgs);
    } catch (e) {
      console.error("Chyba při načítání výrobců:", e);
      state.manufacturers = [...MANUFACTURERS];
    }
  } else {
    state.manufacturers = [...MANUFACTURERS];
  }
}

function saveParts() {
  localStorage.setItem('parts', JSON.stringify(state.parts));
}

function saveMotorcycles() {
  localStorage.setItem('motorcycles', JSON.stringify(state.motorcycles));
}

function saveManufacturers() {
  localStorage.setItem('manufacturers', JSON.stringify(state.manufacturers));
}

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  state.theme = savedTheme;
  document.documentElement.className = `theme-${savedTheme}`;
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.className = `theme-${state.theme}`;
  localStorage.setItem('theme', state.theme);
}

// Admin Session Management
function initAdminSession() {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  if (isLoggedIn) {
    setAdminMode(true);
  }
}

function handleAdminToggleClick() {
  if (state.adminMode) {
    // Log out
    setAdminMode(false);
    sessionStorage.removeItem('adminLoggedIn');
  } else {
    // Show login form
    loginForm.reset();
    loginErrorMsg.classList.add('hidden');
    loginDialog.showModal();
  }
}

function setAdminMode(active) {
  state.adminMode = active;
  
  if (active) {
    document.body.classList.add('admin-mode-active');
    adminToggle.classList.add('active');
    adminToggle.querySelector('.admin-lock-icon').textContent = '🔓';
    adminToggle.querySelector('.admin-text').textContent = 'Odhlásit se';
    adminControlsBar.classList.remove('hidden');
    renderAdminDashboard();
  } else {
    document.body.classList.remove('admin-mode-active');
    adminToggle.classList.remove('active');
    adminToggle.querySelector('.admin-lock-icon').textContent = '🔒';
    adminToggle.querySelector('.admin-text').textContent = 'Vstoupit do administrace';
    adminControlsBar.classList.add('hidden');
  }
  
  // Re-render components to show/hide edit tools
  renderMotoSelectors();
  renderManufacturers();
  renderParts();
}

function handleLoginSubmit() {
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value;
  
  if (username === 'Lukas69' && password === 'Moto69*') {
    setAdminMode(true);
    sessionStorage.setItem('adminLoggedIn', 'true');
    loginDialog.close();
  } else {
    loginErrorMsg.classList.remove('hidden');
  }
}

// Render Filters and Selectors
function renderMotoSelectors() {
  motoSelector.innerHTML = '';
  
  // "All" option card
  const allCard = document.createElement('button');
  allCard.type = 'button';
  allCard.className = `moto-card-all ${state.selectedMotorcycle === 'all' ? 'active' : ''}`;
  allCard.setAttribute('aria-pressed', state.selectedMotorcycle === 'all');
  allCard.innerHTML = `
    <span class="all-icon">🏍️</span>
    <span class="all-text">Všechny motocykly</span>
  `;
  allCard.addEventListener('click', () => {
    selectMotorcycle('all');
  });
  motoSelector.appendChild(allCard);
  
  // Custom motorcycle cards from state.motorcycles
  state.motorcycles.forEach(bike => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `moto-card ${state.selectedMotorcycle === bike.id ? 'active' : ''}`;
    card.setAttribute('aria-pressed', state.selectedMotorcycle === bike.id);
    
    // Admin buttons HTML
    const adminActionsHTML = state.adminMode ? `
      <div class="moto-card-admin-actions">
        <button type="button" class="admin-icon-btn edit-moto-btn" data-moto-id="${bike.id}" aria-label="Upravit motocykl">✏️</button>
        <button type="button" class="admin-icon-btn delete-btn delete-moto-btn" data-moto-id="${bike.id}" aria-label="Smazat motocykl">🗑️</button>
      </div>
    ` : '';
    
    card.innerHTML = `
      ${adminActionsHTML}
      <div class="moto-brand">${bike.brand}</div>
      <div class="moto-model" title="${bike.model}">${bike.model}</div>
      <div class="moto-meta">
        <span>${bike.year}</span>
        <span>${bike.engine}</span>
      </div>
    `;
    
    // Select bike unless admin button is clicked
    card.addEventListener('click', (e) => {
      if (e.target.closest('.moto-card-admin-actions')) return;
      selectMotorcycle(bike.id);
    });
    
    if (state.adminMode) {
      card.querySelector('.edit-moto-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openMotoForm(bike.id);
      });
      card.querySelector('.delete-moto-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteMotorcycle(bike.id);
      });
    }
    
    motoSelector.appendChild(card);
  });
}

function renderCategorySelectors() {
  categorySelector.innerHTML = '';
  
  // "All" option chip
  const allChip = document.createElement('button');
  allChip.type = 'button';
  allChip.className = `category-chip ${state.selectedCategory === 'all' ? 'active' : ''}`;
  allChip.setAttribute('aria-pressed', state.selectedCategory === 'all');
  allChip.innerHTML = `🏁 Všechny kategorie`;
  allChip.addEventListener('click', () => {
    selectCategory('all');
  });
  categorySelector.appendChild(allChip);
  
  // Custom categories chips
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `category-chip ${state.selectedCategory === cat.id ? 'active' : ''}`;
    chip.setAttribute('aria-pressed', state.selectedCategory === cat.id);
    chip.innerHTML = `${cat.icon} ${cat.name}`;
    chip.addEventListener('click', () => {
      selectCategory(cat.id);
    });
    categorySelector.appendChild(chip);
  });
}

// Selection Action Handlers
function selectMotorcycle(id) {
  state.selectedMotorcycle = id;
  renderMotoSelectors();
  updateActiveFiltersBar();
  renderParts();
}

function selectCategory(id) {
  state.selectedCategory = id;
  renderCategorySelectors();
  updateActiveFiltersBar();
  renderParts();
}

// Active Filters Visual Management
function updateActiveFiltersBar() {
  const activeFilters = [];
  
  if (state.selectedMotorcycle !== 'all') {
    const bike = state.motorcycles.find(m => m.id === state.selectedMotorcycle);
    if (bike) {
      activeFilters.push({
        type: 'motorcycle',
        label: `${bike.brand} ${bike.model}`
      });
    }
  }
  
  if (state.selectedCategory !== 'all') {
    const cat = CATEGORIES.find(c => c.id === state.selectedCategory);
    if (cat) {
      activeFilters.push({
        type: 'category',
        label: `${cat.icon} ${cat.name}`
      });
    }
  }
  
  if (state.searchQuery.trim() !== '') {
    activeFilters.push({
      type: 'search',
      label: `Hledat: "${state.searchQuery}"`
    });
  }
  
  if (activeFilters.length > 0) {
    activeFiltersBar.classList.remove('hidden');
    activeFiltersList.innerHTML = '';
    
    activeFilters.forEach(filter => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.innerHTML = `
        <span>${filter.label}</span>
        <button type="button" aria-label="Odebrat filtr ${filter.label}">✕</button>
      `;
      
      pill.querySelector('button').addEventListener('click', () => {
        if (filter.type === 'motorcycle') selectMotorcycle('all');
        if (filter.type === 'category') selectCategory('all');
        if (filter.type === 'search') {
          state.searchQuery = '';
          searchInput.value = '';
          updateActiveFiltersBar();
          renderParts();
        }
      });
      activeFiltersList.appendChild(pill);
    });
  } else {
    activeFiltersBar.classList.add('hidden');
  }
}

// Render Parts Grid
function renderParts() {
  partsGrid.innerHTML = '';
  
  // Filter logic based on dynamic state.parts
  const filteredParts = state.parts.filter(part => {
    // Motorcycle filter
    const matchesMotorcycle = state.selectedMotorcycle === 'all' || 
      part.compatibilities.includes(state.selectedMotorcycle);
      
    // Category filter
    const matchesCategory = state.selectedCategory === 'all' || 
      part.category === state.selectedCategory;
      
    // Text search filter
    const searchLower = state.searchQuery.toLowerCase().trim();
    const manufacturer = state.manufacturers.find(m => m.id === part.manufacturerId);
    const mfgName = manufacturer ? manufacturer.name.toLowerCase() : '';
    
    const matchesSearch = searchLower === '' || 
      part.name.toLowerCase().includes(searchLower) ||
      part.description.toLowerCase().includes(searchLower) ||
      part.sku.toLowerCase().includes(searchLower) ||
      mfgName.includes(searchLower);
      
    return matchesMotorcycle && matchesCategory && matchesSearch;
  });
  
  // Update result count text
  if (filteredParts.length === 0) {
    resultsCount.textContent = 'Nebyly nalezeny žádné díly';
    partsGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    let text = `${filteredParts.length} `;
    if (filteredParts.length === 1) text += 'závodní díl nalezen';
    else if (filteredParts.length >= 2 && filteredParts.length <= 4) text += 'závodní díly nalezeny';
    else text += 'závodních dílů nalezeno';
    
    resultsCount.textContent = text;
    partsGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');
  }
  
  // Render cards
  filteredParts.forEach(part => {
    const card = document.createElement('article');
    card.className = 'part-card';
    
    const manufacturer = state.manufacturers.find(m => m.id === part.manufacturerId);
    const mfgName = manufacturer ? manufacturer.name : part.manufacturerId;
    const cat = CATEGORIES.find(c => c.id === part.category);
    const catLabel = cat ? `${cat.icon} ${cat.name}` : part.category;
    
    // Create compatibility badge lists
    const compatListHTML = part.compatibilities.map(compId => {
      const bike = state.motorcycles.find(m => m.id === compId);
      return `<span class="compat-pill">${bike ? bike.model : compId}</span>`;
    }).join('');
    
    // Admin buttons HTML
    const adminActionsHTML = state.adminMode ? `
      <div class="part-card-admin-actions">
        <button type="button" class="admin-icon-btn edit-btn" data-part-id="${part.id}" aria-label="Upravit díl">✏️</button>
        <button type="button" class="admin-icon-btn delete-btn delete-card-btn" data-part-id="${part.id}" aria-label="Smazat díl">🗑️</button>
      </div>
    ` : '';
    
    const imgSectionHTML = `
      <div class="part-card-image">
        ${part.image ? 
          `<img src="${part.image}" alt="${part.name}" loading="lazy">` : 
          `<div class="part-card-image-placeholder">${cat ? cat.icon : '🏍️'}</div>`
        }
      </div>
    `;

    card.innerHTML = `
      ${adminActionsHTML}
      <div class="part-card-header">
        <span class="part-card-category">${catLabel}</span>
        <span class="part-card-brand" data-mfg-id="${part.manufacturerId}">${mfgName}</span>
      </div>
      ${imgSectionHTML}
      <h3 class="part-card-title">${part.name}</h3>
      <div class="part-card-sku">SKU: ${part.sku}</div>
      <p class="part-card-desc">${part.description}</p>
      
      <div class="part-card-compatibilities">
        <div class="compat-title">Kompatibilita superbiků:</div>
        <div class="compat-list">
          ${compatListHTML}
        </div>
      </div>
      
      <div class="part-card-footer">
        <div class="part-card-price">
          <span class="price-label">Orientační cena</span>
          <span class="price-value">${part.price}</span>
        </div>
        <div class="part-card-actions">
          <button type="button" class="btn btn-secondary view-detail-btn" data-part-id="${part.id}">Detail</button>
          <a href="${part.productUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" aria-label="Koupit ${part.name} na webu výrobce">
            Koupit ↗
          </a>
        </div>
      </div>
    `;
    
    // Clicking the manufacturer name in header shows manufacturer info
    card.querySelector('.part-card-brand').addEventListener('click', (e) => {
      e.stopPropagation();
      showManufacturerModal(part.manufacturerId);
    });
    
    // Clicking the detail button opens modal
    card.querySelector('.view-detail-btn').addEventListener('click', () => {
      showPartDetailModal(part.id);
    });
    
    // Bind admin actions if present
    if (state.adminMode) {
      card.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openPartForm(part.id);
      });
      
      card.querySelector('.delete-card-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deletePart(part.id);
      });
    }
    
    partsGrid.appendChild(card);
  });
}

// Render Manufacturer Spotlight List
function renderManufacturers() {
  manufacturersGrid.innerHTML = '';
  
  state.manufacturers.forEach(mfg => {
    const card = document.createElement('article');
    card.className = 'manufacturer-card';
    
    // Admin buttons HTML
    const adminActionsHTML = state.adminMode ? `
      <div class="part-card-admin-actions">
        <button type="button" class="admin-icon-btn edit-mfg-btn" data-mfg-id="${mfg.id}" aria-label="Upravit výrobce">✏️</button>
        <button type="button" class="admin-icon-btn delete-btn delete-mfg-btn" data-mfg-id="${mfg.id}" aria-label="Smazat výrobce">🗑️</button>
      </div>
    ` : '';
    
    card.innerHTML = `
      ${adminActionsHTML}
      <div class="mfg-header">
        <h3>${mfg.name}</h3>
        <span class="mfg-origin">${mfg.origin}</span>
      </div>
      <p class="mfg-desc">${mfg.description}</p>
      <div class="mfg-footer">
        <button type="button" class="btn btn-secondary filter-mfg-btn" data-mfg-name="${mfg.name}">
          Zobrazit díly
        </button>
        <a href="${mfg.url}" target="_blank" rel="noopener noreferrer" class="btn btn-text" aria-label="Webová stránka výrobce ${mfg.name}">
          Web výrobce ↗
        </a>
      </div>
    `;
    
    // Hook show parts by manufacturer
    card.querySelector('.filter-mfg-btn').addEventListener('click', () => {
      state.searchQuery = mfg.name;
      searchInput.value = mfg.name;
      updateActiveFiltersBar();
      renderParts();
      
      // Scroll to parts grid smoothly
      document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    if (state.adminMode) {
      card.querySelector('.edit-mfg-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openMfgForm(mfg.id);
      });
      card.querySelector('.delete-mfg-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteManufacturer(mfg.id);
      });
    }
    
    manufacturersGrid.appendChild(card);
  });
}

// Detail Dialogs Functions
function showPartDetailModal(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;
  
  const mfg = state.manufacturers.find(m => m.id === part.manufacturerId);
  const mfgName = mfg ? mfg.name : part.manufacturerId;
  const cat = CATEGORIES.find(c => c.id === part.category);
  const catLabel = cat ? `${cat.icon} ${cat.name}` : part.category;
  
  // Map compatible bikes
  const compatListHTML = part.compatibilities.map(compId => {
    const bike = state.motorcycles.find(m => m.id === compId);
    return `<span class="compat-pill">${bike ? `${bike.brand} ${bike.model} (${bike.year})` : compId}</span>`;
  }).join('');
  
  // Key specs table body
  let specsHTML = '';
  if (part.specs && Object.keys(part.specs).length > 0) {
    specsHTML = `
      <table class="specs-table">
        <tbody>
          ${Object.entries(part.specs).map(([key, value]) => `
            <tr>
              <th scope="row">${key}</th>
              <td>${value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  dialogBody.innerHTML = `
    <div class="dialog-detail-header">
      <div class="dialog-mfg">${mfgName} | <span style="font-size: 0.8em; font-weight: normal; color: var(--color-text-muted);">${catLabel}</span></div>
      <h2>${part.name}</h2>
      <div class="dialog-price-row">
        <div class="part-card-sku" style="margin-bottom: 0;">Katalogové číslo (SKU): <strong>${part.sku}</strong></div>
        <div class="part-card-price" style="text-align: right;">
          <span class="price-label">Orientační cena</span>
          <span class="price-value" style="font-size: 1.4rem;">${part.price}</span>
        </div>
      </div>
    </div>
    
    <div class="dialog-detail-body">
      ${part.image ? `
      <div class="dialog-detail-image">
        <img src="${part.image}" alt="${part.name}">
      </div>
      ` : ''}
      <h3>Popis produktu</h3>
      <p>${part.description}</p>
      
      ${specsHTML ? `<h3>Technická specifikace</h3>${specsHTML}` : ''}
      
      <div class="dialog-compat-box">
        <div class="compat-box-title">Kompatibilní okruhové motocykly</div>
        <div class="compat-pills">
          ${compatListHTML}
        </div>
      </div>
    </div>
    
    <div class="dialog-footer-actions">
      <button type="button" class="btn btn-secondary close-dialog-action-btn">Zavřít</button>
      <a href="${part.productUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        Otevřít na webu výrobce ↗
      </a>
    </div>
  `;
  
  // Dialog footer buttons close handler
  dialogBody.querySelector('.close-dialog-action-btn').addEventListener('click', () => {
    detailDialog.close();
  });
  
  detailDialog.showModal();
}

function showManufacturerModal(mfgId) {
  const mfg = state.manufacturers.find(m => m.id === mfgId);
  if (!mfg) return;
  
  dialogBody.innerHTML = `
    <div class="dialog-detail-header">
      <div class="dialog-mfg">Detail výrobce</div>
      <h2>${mfg.name}</h2>
      <div class="part-card-sku">Původ: <strong>${mfg.origin}</strong></div>
    </div>
    
    <div class="dialog-detail-body">
      <h3>O výrobci</h3>
      <p>${mfg.description}</p>
      
      <div class="dialog-compat-box">
        <div class="compat-box-title">Závodní portfolio</div>
        <p style="margin: 0; font-size: 0.9rem;">
          Tento výrobce dodává špičkové komponenty pro motocykly, které splňují nejvyšší standardy závodních šampionátů MotoGP a World Superbike.
        </p>
      </div>
    </div>
    
    <div class="dialog-footer-actions">
      <button type="button" class="btn btn-secondary close-dialog-action-btn">Zavřít</button>
      <button type="button" class="btn btn-primary filter-mfg-shortcut-btn">
        Zobrazit díly v katalogu
      </button>
      <a href="${mfg.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        Oficiální web ↗
      </a>
    </div>
  `;
  
  // Dialog buttons close handler
  dialogBody.querySelector('.close-dialog-action-btn').addEventListener('click', () => {
    detailDialog.close();
  });
  
  // Shortcut to filter from dialog
  dialogBody.querySelector('.filter-mfg-shortcut-btn').addEventListener('click', () => {
    state.searchQuery = mfg.name;
    searchInput.value = mfg.name;
    updateActiveFiltersBar();
    renderParts();
    detailDialog.close();
    document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
  });
  
  detailDialog.showModal();
}

// Admin Form Management (Parts Form)
function openPartForm(partId = null) {
  partEditorForm.reset();
  formSpecsContainer.innerHTML = '';
  
  // Populate dropdowns from state lists
  formPartCategory.innerHTML = '<option value="" disabled selected>Vyberte kategorii</option>';
  CATEGORIES.forEach(cat => {
    formPartCategory.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`;
  });
  
  formPartManufacturer.innerHTML = '<option value="" disabled selected>Vyberte výrobce</option>';
  state.manufacturers.forEach(mfg => {
    formPartManufacturer.innerHTML += `<option value="${mfg.id}">${mfg.name}</option>`;
  });
  
  // Populate compatibilities checkboxes from state.motorcycles
  formCompatGrid.innerHTML = '';
  state.motorcycles.forEach(bike => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" name="compatibilities" value="${bike.id}">
      <span>${bike.brand} ${bike.model}</span>
    `;
    formCompatGrid.appendChild(label);
  });
  
  if (partId) {
    // Edit mode
    const part = state.parts.find(p => p.id === partId);
    if (!part) return;
    
    editPartId.value = part.id;
    formDialogTitle.textContent = "Upravit závodní díl";
    
    formPartName.value = part.name;
    formPartSku.value = part.sku;
    formPartCategory.value = part.category;
    formPartManufacturer.value = part.manufacturerId;
    formPartPrice.value = part.price;
    formPartUrl.value = part.productUrl;
    formPartDesc.value = part.description;
    
    // Check compatible checkboxes
    part.compatibilities.forEach(id => {
      const checkbox = formCompatGrid.querySelector(`input[value="${id}"]`);
      if (checkbox) checkbox.checked = true;
    });
    
    // Dynamic specifications
    if (part.specs) {
      Object.entries(part.specs).forEach(([key, value]) => {
        addSpecRow(key, value);
      });
    }

    // Image loading
    if (part.image) {
      currentPartImageBase64 = part.image;
      formPartImagePreview.src = part.image;
      formPartImagePreviewContainer.classList.remove('hidden');
      formPartImageClearBtn.classList.remove('hidden');
    } else {
      clearPartImage();
    }
  } else {
    // Create mode
    editPartId.value = '';
    formDialogTitle.textContent = "Nový závodní díl";
    addSpecRow(); // Add one empty row as template
    clearPartImage();
  }
  
  partFormDialog.showModal();
}

function addSpecRow(key = '', value = '') {
  const row = document.createElement('div');
  row.className = 'spec-row';
  row.innerHTML = `
    <input type="text" class="spec-key" placeholder="Parametr (např. Váha, Materiál)" value="${key}">
    <input type="text" class="spec-value" placeholder="Hodnota (např. 750g, Karbon)" value="${value}">
    <button type="button" class="remove-spec-row-btn" aria-label="Odebrat řádek specifikace">✕</button>
  `;
  
  row.querySelector('.remove-spec-row-btn').addEventListener('click', () => {
    row.remove();
  });
  
  formSpecsContainer.appendChild(row);
}

function savePartForm() {
  // Check checkboxes
  const checkboxes = formCompatGrid.querySelectorAll('input[name="compatibilities"]:checked');
  if (checkboxes.length === 0) {
    alert('Prosím, zvolte alespoň jeden kompatibilní motocykl.');
    return;
  }
  
  const selectedCompat = Array.from(checkboxes).map(cb => cb.value);
  
  // Build specs object
  const specs = {};
  const specRows = formSpecsContainer.querySelectorAll('.spec-row');
  specRows.forEach(row => {
    const key = row.querySelector('.spec-key').value.trim();
    const val = row.querySelector('.spec-value').value.trim();
    if (key && val) {
      specs[key] = val;
    }
  });
  
  const partData = {
    id: editPartId.value || `part-${Date.now()}`,
    name: formPartName.value.trim(),
    category: formPartCategory.value,
    manufacturerId: formPartManufacturer.value,
    compatibilities: selectedCompat,
    sku: formPartSku.value.trim(),
    price: formPartPrice.value.trim(),
    description: formPartDesc.value.trim(),
    productUrl: formPartUrl.value.trim(),
    specs: specs,
    image: currentPartImageBase64
  };
  
  if (editPartId.value) {
    // Edit update
    const index = state.parts.findIndex(p => p.id === editPartId.value);
    if (index !== -1) {
      state.parts[index] = partData;
    }
  } else {
    // Add new
    state.parts.push(partData);
  }
  
  saveParts();
  clearPartImage();
  partFormDialog.close();
  renderParts();
  if (state.adminMode) {
    renderAdminDashboard();
  }
}

function deletePart(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;
  
  if (confirm(`Opravdu chcete smazat závodní díl "${part.name}"?`)) {
    state.parts = state.parts.filter(p => p.id !== partId);
    saveParts();
    renderParts();
    if (state.adminMode) {
      renderAdminDashboard();
    }
  }
}

// Admin Form Management (Motorcycle Form)
function openMotoForm(motoId = null) {
  motoEditorForm.reset();
  
  if (motoId) {
    // Edit Mode
    const bike = state.motorcycles.find(m => m.id === motoId);
    if (!bike) return;
    
    editMotoId.value = bike.id;
    motoFormTitle.textContent = "Upravit motocykl";
    
    formMotoBrand.value = bike.brand;
    formMotoModel.value = bike.model;
    formMotoYear.value = bike.year;
    formMotoEngine.value = bike.engine;
    formMotoClass.value = bike.class;
  } else {
    // Create Mode
    editMotoId.value = '';
    motoFormTitle.textContent = "Nový motocykl";
  }
  
  motoFormDialog.showModal();
}

function saveMotoForm() {
  const motoData = {
    id: editMotoId.value || `moto-${Date.now()}`,
    brand: formMotoBrand.value.trim(),
    model: formMotoModel.value.trim(),
    year: formMotoYear.value.trim(),
    engine: formMotoEngine.value.trim(),
    class: formMotoClass.value.trim()
  };
  
  if (editMotoId.value) {
    // Edit update
    const index = state.motorcycles.findIndex(m => m.id === editMotoId.value);
    if (index !== -1) {
      state.motorcycles[index] = motoData;
    }
  } else {
    // Add new
    state.motorcycles.push(motoData);
  }
  
  saveMotorcycles();
  motoFormDialog.close();
  renderMotoSelectors();
  if (state.adminMode) {
    renderAdminDashboard();
  }
}

function deleteMotorcycle(motoId) {
  const bike = state.motorcycles.find(m => m.id === motoId);
  if (!bike) return;
  
  if (confirm(`Opravdu chcete smazat motocykl "${bike.brand} ${bike.model}"? Tím dojde k jeho odebrání ze seznamu kompatibilit všech dílů.`)) {
    // Remove motorcycle
    state.motorcycles = state.motorcycles.filter(m => m.id !== motoId);
    saveMotorcycles();
    
    // Cascade removal in parts compatibilities list
    state.parts.forEach(part => {
      part.compatibilities = part.compatibilities.filter(id => id !== motoId);
    });
    saveParts();
    
    // Reset selected filter if it was this bike
    if (state.selectedMotorcycle === motoId) {
      state.selectedMotorcycle = 'all';
    }
    
    renderMotoSelectors();
    updateActiveFiltersBar();
    renderParts();
    if (state.adminMode) {
      renderAdminDashboard();
    }
  }
}

// Admin Form Management (Manufacturer Form)
function openMfgForm(mfgId = null) {
  mfgEditorForm.reset();
  
  if (mfgId) {
    const mfg = state.manufacturers.find(m => m.id === mfgId);
    if (!mfg) return;
    
    editMfgId.value = mfg.id;
    mfgFormTitle.textContent = "Upravit výrobce";
    
    formMfgName.value = mfg.name;
    formMfgOrigin.value = mfg.origin;
    formMfgUrl.value = mfg.url;
    formMfgDesc.value = mfg.description;
  } else {
    editMfgId.value = '';
    mfgFormTitle.textContent = "Nový výrobce";
  }
  
  mfgFormDialog.showModal();
}

function saveMfgForm() {
  const id = editMfgId.value || formMfgName.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const mfgData = {
    id: id,
    name: formMfgName.value.trim(),
    origin: formMfgOrigin.value.trim(),
    url: formMfgUrl.value.trim(),
    description: formMfgDesc.value.trim()
  };
  
  if (editMfgId.value) {
    // Edit update
    const index = state.manufacturers.findIndex(m => m.id === editMfgId.value);
    if (index !== -1) {
      // Update parts manufacturer reference if the manufacturer ID changed
      const oldId = editMfgId.value;
      if (oldId !== id) {
        state.parts.forEach(p => {
          if (p.manufacturerId === oldId) p.manufacturerId = id;
        });
        saveParts();
      }
      state.manufacturers[index] = mfgData;
    }
  } else {
    // Check duplication
    if (state.manufacturers.some(m => m.id === id)) {
      alert("Výrobce s tímto názvem již existuje!");
      return;
    }
    state.manufacturers.push(mfgData);
  }
  
  saveManufacturers();
  mfgFormDialog.close();
  renderManufacturers();
  renderParts();
  if (state.adminMode) {
    renderAdminDashboard();
  }
}

function deleteManufacturer(mfgId) {
  const mfg = state.manufacturers.find(m => m.id === mfgId);
  if (!mfg) return;
  
  if (confirm(`Opravdu chcete smazat výrobce "${mfg.name}" a VŠECHNY jeho přidružené díly? Tato operace je nevratná.`)) {
    // Remove manufacturer
    state.manufacturers = state.manufacturers.filter(m => m.id !== mfgId);
    saveManufacturers();
    
    // Cascade delete parts of this manufacturer
    state.parts = state.parts.filter(p => p.manufacturerId !== mfgId);
    saveParts();
    
    renderManufacturers();
    renderParts();
    if (state.adminMode) {
      renderAdminDashboard();
    }
  }
}

// Data Import / Export (Unified JSON file download)
function exportPartsJSON() {
  // Construct the unified data structure
  const exportData = {
    parts: state.parts,
    motorcycles: state.motorcycles,
    manufacturers: state.manufacturers
  };
  
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'alphafairings-data-export.json';
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function resetParts() {
  if (confirm("Opravdu chcete obnovit katalog do výchozího stavu? Všechny vámi přidané/upravené díly, motorky i výrobci budou smazáni.")) {
    localStorage.removeItem('parts');
    localStorage.removeItem('motorcycles');
    localStorage.removeItem('manufacturers');
    loadData();
    renderMotoSelectors();
    renderManufacturers();
    renderParts();
    if (state.adminMode) {
      renderAdminDashboard();
    }
  }
}

// Admin Dashboard rendering
function renderAdminDashboard() {
  if (!state.adminMode) return;
  
  if (state.activeAdminTab === 'parts') {
    renderAdminParts();
  } else if (state.activeAdminTab === 'motorcycles') {
    renderAdminMotorcycles();
  } else if (state.activeAdminTab === 'manufacturers') {
    renderAdminManufacturers();
  }
}

function renderAdminParts() {
  adminPartsCategoriesList.innerHTML = '';
  
  CATEGORIES.forEach(cat => {
    const group = document.createElement('div');
    group.className = 'admin-category-group';
    
    const catParts = state.parts.filter(p => p.category === cat.id);
    
    let partsHTML = '';
    if (catParts.length === 0) {
      partsHTML = `<div style="padding: 20px; text-align: center; color: var(--color-text-muted); font-size: 0.95rem;">Žádné díly v této kategorii.</div>`;
    } else {
      partsHTML = `
        <div class="admin-parts-list">
          ${catParts.map(part => {
            const mfg = state.manufacturers.find(m => m.id === part.manufacturerId);
            const mfgName = mfg ? mfg.name : part.manufacturerId;
            const imgHTML = part.image ? `<img src="${part.image}" alt="${part.name}">` : `<span>${cat.icon}</span>`;
            
            return `
              <div class="admin-part-row" data-id="${part.id}">
                <div class="admin-part-thumb">${imgHTML}</div>
                <div class="admin-part-info">
                  <div class="part-name">${part.name}</div>
                  <div class="part-meta">
                    <span>Výrobce: <strong>${mfgName}</strong></span>
                    <span>Kompatibilita: <strong>${part.compatibilities.map(compId => {
                      const bike = state.motorcycles.find(m => m.id === compId);
                      return bike ? bike.model : compId;
                    }).join(', ')}</strong></span>
                  </div>
                </div>
                <div class="admin-part-price-sku">
                  <div class="part-price">${part.price}</div>
                  <div class="part-sku">SKU: ${part.sku}</div>
                </div>
                <div class="admin-part-actions">
                  <button type="button" class="btn btn-secondary edit-part-row-btn" data-id="${part.id}">✏️ Upravit</button>
                  <button type="button" class="btn btn-secondary delete-btn delete-part-row-btn" data-id="${part.id}">🗑️ Smazat</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
    
    group.innerHTML = `
      <div class="admin-category-header">
        <h4>${cat.icon} ${cat.name}</h4>
      </div>
      ${partsHTML}
    `;
    
    if (catParts.length > 0) {
      group.querySelectorAll('.edit-part-row-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          openPartForm(btn.getAttribute('data-id'));
        });
      });
      group.querySelectorAll('.delete-part-row-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          deletePart(btn.getAttribute('data-id'));
        });
      });
    }
    
    adminPartsCategoriesList.appendChild(group);
  });
}

function renderAdminMotorcycles() {
  adminMotosTableBody.innerHTML = '';
  
  if (state.motorcycles.length === 0) {
    adminMotosTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--color-text-muted);">Žádné motocykly v databázi.</td>
      </tr>
    `;
    return;
  }
  
  state.motorcycles.forEach(bike => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${bike.brand}</strong></td>
      <td>${bike.model}</td>
      <td>${bike.year}</td>
      <td>${bike.engine}</td>
      <td>${bike.class}</td>
      <td class="table-actions-col">
        <div class="admin-part-actions">
          <button type="button" class="admin-icon-btn edit-moto-row-btn" data-id="${bike.id}">✏️</button>
          <button type="button" class="admin-icon-btn delete-btn delete-moto-row-btn" data-id="${bike.id}">🗑️</button>
        </div>
      </td>
    `;
    
    tr.querySelector('.edit-moto-row-btn').addEventListener('click', () => openMotoForm(bike.id));
    tr.querySelector('.delete-moto-row-btn').addEventListener('click', () => deleteMotorcycle(bike.id));
    
    adminMotosTableBody.appendChild(tr);
  });
}

function renderAdminManufacturers() {
  adminMfgsTableBody.innerHTML = '';
  
  if (state.manufacturers.length === 0) {
    adminMfgsTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--color-text-muted);">Žádní výrobci v databázi.</td>
      </tr>
    `;
    return;
  }
  
  state.manufacturers.forEach(mfg => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${mfg.name}</strong></td>
      <td>${mfg.origin}</td>
      <td><a href="${mfg.url}" target="_blank" rel="noopener noreferrer" style="color: var(--color-red-accent); text-decoration: underline;">web ↗</a></td>
      <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${mfg.description}</td>
      <td class="table-actions-col">
        <div class="admin-part-actions">
          <button type="button" class="admin-icon-btn edit-mfg-row-btn" data-id="${mfg.id}">✏️</button>
          <button type="button" class="admin-icon-btn delete-btn delete-mfg-row-btn" data-id="${mfg.id}">🗑️</button>
        </div>
      </td>
    `;
    
    tr.querySelector('.edit-mfg-row-btn').addEventListener('click', () => openMfgForm(mfg.id));
    tr.querySelector('.delete-mfg-row-btn').addEventListener('click', () => deleteManufacturer(mfg.id));
    
    adminMfgsTableBody.appendChild(tr);
  });
}

// Image Upload Processing
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Prosím vyberte platný obrázek.');
    return;
  }

  compressImage(file, (compressedBase64) => {
    currentPartImageBase64 = compressedBase64;
    formPartImagePreview.src = compressedBase64;
    formPartImagePreviewContainer.classList.remove('hidden');
    formPartImageClearBtn.classList.remove('hidden');
  });
}

function clearPartImage() {
  formPartImage.value = '';
  currentPartImageBase64 = null;
  formPartImagePreview.src = '';
  formPartImagePreviewContainer.classList.add('hidden');
  formPartImageClearBtn.classList.add('hidden');
}

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedDataUrl);
    };
  };
}

// Event Listeners Setup
function setupEventListeners() {
  // Real-time Search
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    updateActiveFiltersBar();
    renderParts();
  });
  
  // Theme Toggle Button
  themeToggle.addEventListener('click', toggleTheme);
  
  // Admin Mode toggler
  adminToggle.addEventListener('click', handleAdminToggleClick);
  
  // Login Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLoginSubmit();
  });
  
  // Close Login Modal
  closeLoginBtn.addEventListener('click', () => {
    loginDialog.close();
  });
  
  // Add dialog form triggers
  addPartBtn.addEventListener('click', () => openPartForm());
  addSpecRowBtn.addEventListener('click', () => addSpecRow());
  addMotoBtn.addEventListener('click', () => openMotoForm());
  addMfgBtn.addEventListener('click', () => openMfgForm());
  
  // Export/Reset triggers
  exportPartsBtn.addEventListener('click', exportPartsJSON);
  resetPartsBtn.addEventListener('click', resetParts);

  // Tab Switching inside Admin Dashboard
  const adminTabs = [
    { button: tabParts, panel: panelParts, tabName: 'parts' },
    { button: tabMotorcycles, panel: panelMotorcycles, tabName: 'motorcycles' },
    { button: tabManufacturers, panel: panelManufacturers, tabName: 'manufacturers' }
  ];

  adminTabs.forEach(tabInfo => {
    tabInfo.button.addEventListener('click', () => {
      state.activeAdminTab = tabInfo.tabName;
      
      adminTabs.forEach(t => {
        t.button.classList.toggle('active', t === tabInfo);
        t.button.setAttribute('aria-selected', t === tabInfo);
        t.panel.classList.toggle('hidden', t !== tabInfo);
      });
      
      renderAdminDashboard();
    });
  });

  // Image Upload Listeners
  formPartImage.addEventListener('change', handleImageUpload);
  formPartImageClearBtn.addEventListener('click', clearPartImage);

  // Add triggers inside dashboard
  adminAddPartBtn.addEventListener('click', () => openPartForm());
  adminAddMotoBtn.addEventListener('click', () => openMotoForm());
  adminAddMfgBtn.addEventListener('click', () => openMfgForm());
  
  // Parts Form Submission
  partEditorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    savePartForm();
  });
  
  // Motorcycle Form Submission
  motoEditorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveMotoForm();
  });
  
  // Manufacturer Form Submission
  mfgEditorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveMfgForm();
  });
  
  // Cancel Buttons
  cancelFormBtn.addEventListener('click', () => partFormDialog.close());
  cancelMotoFormBtn.addEventListener('click', () => motoFormDialog.close());
  cancelMfgFormBtn.addEventListener('click', () => mfgFormDialog.close());
  
  // Close dialog buttons
  closeFormDialogBtn.addEventListener('click', () => partFormDialog.close());
  closeMotoFormBtn.addEventListener('click', () => motoFormDialog.close());
  closeMfgFormBtn.addEventListener('click', () => mfgFormDialog.close());
  
  // Close dialogs on backdrop click
  detailDialog.addEventListener('click', (e) => {
    const dialogDimensions = detailDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
      detailDialog.close();
    }
  });
  
  partFormDialog.addEventListener('click', (e) => {
    const dialogDimensions = partFormDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
      partFormDialog.close();
    }
  });
  
  motoFormDialog.addEventListener('click', (e) => {
    const dialogDimensions = motoFormDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
      motoFormDialog.close();
    }
  });
  
  mfgFormDialog.addEventListener('click', (e) => {
    const dialogDimensions = mfgFormDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
      mfgFormDialog.close();
    }
  });
  
  loginDialog.addEventListener('click', (e) => {
    const dialogDimensions = loginDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom
    ) {
      loginDialog.close();
    }
  });
  
  // Reset all filters
  clearFiltersBtn.addEventListener('click', () => {
    state.selectedMotorcycle = 'all';
    state.selectedCategory = 'all';
    state.searchQuery = '';
    searchInput.value = '';
    
    renderMotoSelectors();
    renderCategorySelectors();
    updateActiveFiltersBar();
    renderParts();
  });
  
  // Reset search button (Empty state)
  resetSearchBtn.addEventListener('click', () => {
    state.selectedMotorcycle = 'all';
    state.selectedCategory = 'all';
    state.searchQuery = '';
    searchInput.value = '';
    
    renderMotoSelectors();
    renderCategorySelectors();
    updateActiveFiltersBar();
    renderParts();
  });
}
