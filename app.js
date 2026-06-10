import { CATEGORIES, MOTORCYCLES, MANUFACTURERS, PARTS } from './parts-data.js';

// Application State
const state = {
  selectedMotorcycle: 'all',
  selectedCategory: 'all',
  searchQuery: '',
  theme: 'dark',
  adminMode: false,
  parts: [] // Loaded dynamically
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
const exportPartsBtn = document.getElementById('export-parts-btn');
const resetPartsBtn = document.getElementById('reset-parts-btn');

// Form Dialog elements
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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadParts();
  renderMotoSelectors();
  renderCategorySelectors();
  renderManufacturers();
  renderParts();
  setupEventListeners();
});

// Load / Save Parts from LocalStorage
function loadParts() {
  const localParts = localStorage.getItem('parts');
  if (localParts) {
    try {
      state.parts = JSON.parse(localParts);
    } catch (e) {
      console.error("Chyba při parsování dílů z localStorage:", e);
      state.parts = [...PARTS];
    }
  } else {
    state.parts = [...PARTS];
  }
}

function saveParts() {
  localStorage.setItem('parts', JSON.stringify(state.parts));
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

// Admin Mode Management
function toggleAdminMode() {
  state.adminMode = !state.adminMode;
  
  if (state.adminMode) {
    document.body.classList.add('admin-mode-active');
    adminToggle.classList.add('active');
    adminToggle.querySelector('.admin-lock-icon').textContent = '🔓';
    adminToggle.querySelector('.admin-text').textContent = 'Odejít z administrace';
    adminControlsBar.classList.remove('hidden');
  } else {
    document.body.classList.remove('admin-mode-active');
    adminToggle.classList.remove('active');
    adminToggle.querySelector('.admin-lock-icon').textContent = '🔒';
    adminToggle.querySelector('.admin-text').textContent = 'Vstoupit do administrace';
    adminControlsBar.classList.add('hidden');
  }
  
  renderParts(); // Re-render to show/hide edit buttons on cards
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
  
  // Custom motorcycle cards
  MOTORCYCLES.forEach(bike => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `moto-card ${state.selectedMotorcycle === bike.id ? 'active' : ''}`;
    card.setAttribute('aria-pressed', state.selectedMotorcycle === bike.id);
    card.innerHTML = `
      <div class="moto-brand">${bike.brand}</div>
      <div class="moto-model" title="${bike.model}">${bike.model}</div>
      <div class="moto-meta">
        <span>${bike.year}</span>
        <span>${bike.engine}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      selectMotorcycle(bike.id);
    });
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
    const bike = MOTORCYCLES.find(m => m.id === state.selectedMotorcycle);
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
    const manufacturer = MANUFACTURERS.find(m => m.id === part.manufacturerId);
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
    
    const manufacturer = MANUFACTURERS.find(m => m.id === part.manufacturerId);
    const mfgName = manufacturer ? manufacturer.name : part.manufacturerId;
    const cat = CATEGORIES.find(c => c.id === part.category);
    const catLabel = cat ? `${cat.icon} ${cat.name}` : part.category;
    
    // Create compatibility badge lists
    const compatListHTML = part.compatibilities.map(compId => {
      const bike = MOTORCYCLES.find(m => m.id === compId);
      return `<span class="compat-pill">${bike ? bike.model : compId}</span>`;
    }).join('');
    
    // Admin buttons HTML
    const adminActionsHTML = state.adminMode ? `
      <div class="part-card-admin-actions">
        <button type="button" class="admin-icon-btn edit-btn" data-part-id="${part.id}" aria-label="Upravit díl">✏️</button>
        <button type="button" class="admin-icon-btn delete-btn delete-card-btn" data-part-id="${part.id}" aria-label="Smazat díl">🗑️</button>
      </div>
    ` : '';
    
    card.innerHTML = `
      ${adminActionsHTML}
      <div class="part-card-header">
        <span class="part-card-category">${catLabel}</span>
        <span class="part-card-brand" data-mfg-id="${part.manufacturerId}">${mfgName}</span>
      </div>
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
  
  MANUFACTURERS.forEach(mfg => {
    const card = document.createElement('article');
    card.className = 'manufacturer-card';
    
    card.innerHTML = `
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
    
    manufacturersGrid.appendChild(card);
  });
}

// Detail Dialogs Functions
function showPartDetailModal(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;
  
  const mfg = MANUFACTURERS.find(m => m.id === part.manufacturerId);
  const mfgName = mfg ? mfg.name : part.manufacturerId;
  const cat = CATEGORIES.find(c => c.id === part.category);
  const catLabel = cat ? `${cat.icon} ${cat.name}` : part.category;
  
  // Map compatible bikes
  const compatListHTML = part.compatibilities.map(compId => {
    const bike = MOTORCYCLES.find(m => m.id === compId);
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
  const mfg = MANUFACTURERS.find(m => m.id === mfgId);
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

// Admin Form Management
function openPartForm(partId = null) {
  partEditorForm.reset();
  formSpecsContainer.innerHTML = '';
  
  // Populate dropdowns
  formPartCategory.innerHTML = '<option value="" disabled selected>Vyberte kategorii</option>';
  CATEGORIES.forEach(cat => {
    formPartCategory.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`;
  });
  
  formPartManufacturer.innerHTML = '<option value="" disabled selected>Vyberte výrobce</option>';
  MANUFACTURERS.forEach(mfg => {
    formPartManufacturer.innerHTML += `<option value="${mfg.id}">${mfg.name}</option>`;
  });
  
  // Populate compatibilities checkboxes
  formCompatGrid.innerHTML = '';
  MOTORCYCLES.forEach(bike => {
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
  } else {
    // Create mode
    editPartId.value = '';
    formDialogTitle.textContent = "Nový závodní díl";
    addSpecRow(); // Add one empty row as template
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
    specs: specs
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
  partFormDialog.close();
  renderParts();
}

function deletePart(partId) {
  const part = state.parts.find(p => p.id === partId);
  if (!part) return;
  
  if (confirm(`Opravdu chcete smazat závodní díl "${part.name}"?`)) {
    state.parts = state.parts.filter(p => p.id !== partId);
    saveParts();
    renderParts();
  }
}

// Data Import / Export (JSON file download)
function exportPartsJSON() {
  // Construct the JSON structure
  const jsonString = JSON.stringify(state.parts, null, 2);
  
  // Wrap into a downloadable blob
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'moto-race-parts-data.json';
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function resetParts() {
  if (confirm("Opravdu chcete obnovit katalog do výchozího stavu? Všechny vámi přidané a upravené díly budou nenávratně smazány.")) {
    localStorage.removeItem('parts');
    loadParts();
    renderParts();
  }
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
  adminToggle.addEventListener('click', toggleAdminMode);
  
  // Add Part Form Modal triggers
  addPartBtn.addEventListener('click', () => openPartForm());
  addSpecRowBtn.addEventListener('click', () => addSpecRow());
  
  // Export/Reset triggers
  exportPartsBtn.addEventListener('click', exportPartsJSON);
  resetPartsBtn.addEventListener('click', resetParts);
  
  // Form submission
  partEditorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    savePartForm();
  });
  
  // Cancel Form
  cancelFormBtn.addEventListener('click', () => {
    partFormDialog.close();
  });
  
  // Close Form Modal
  closeFormDialogBtn.addEventListener('click', () => {
    partFormDialog.close();
  });
  
  // Close dialog on button click
  closeDialogBtn.addEventListener('click', () => {
    detailDialog.close();
  });
  
  // Close dialog on backdrop click
  detailDialog.addEventListener('click', (e) => {
    const dialogDimensions = detailDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      detailDialog.close();
    }
  });
  
  // Close Form dialog on backdrop click
  partFormDialog.addEventListener('click', (e) => {
    const dialogDimensions = partFormDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      partFormDialog.close();
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
