const FONT_FAMILY = '"Noto Music", "Apple Symbols", "Segoe UI Symbol", serif';
const PRESET_COLORS = [
  '#000000', '#ffffff', '#e91e63', '#f44336', '#ff9800', '#ffeb3b',
  '#4caf50', '#009688', '#2196f3', '#3f51b5', '#9c27b0', '#795548',
];

const state = {
  symbol: SYMBOL_GROUPS[0].symbols[0],
  color: '#e91e63',
  size: 256,
  background: 'transparent',
};

const els = {
  groups: document.getElementById('symbol-groups'),
  picker: document.getElementById('color-picker'),
  hex: document.getElementById('color-hex'),
  presets: document.getElementById('presets'),
  size: document.getElementById('size'),
  sizeValue: document.getElementById('size-value'),
  background: document.getElementById('background'),
  canvas: document.getElementById('preview'),
  name: document.getElementById('symbol-name'),
  download: document.getElementById('download'),
};

function charOf(symbol) {
  return String.fromCodePoint(symbol.code);
}

function renderSymbolGrid() {
  for (const group of SYMBOL_GROUPS) {
    const heading = document.createElement('h3');
    heading.textContent = group.label;
    const grid = document.createElement('div');
    grid.className = 'symbol-grid';

    for (const symbol of group.symbols) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'symbol-button';
      button.textContent = charOf(symbol);
      button.title = symbol.name;
      button.setAttribute('aria-label', symbol.name);
      button.dataset.id = symbol.id;
      button.addEventListener('click', () => {
        state.symbol = symbol;
        updateSelection();
        draw();
      });
      grid.appendChild(button);
    }
    els.groups.append(heading, grid);
  }
  updateSelection();
}

function updateSelection() {
  for (const button of els.groups.querySelectorAll('.symbol-button')) {
    button.classList.toggle('selected', button.dataset.id === state.symbol.id);
  }
}

function renderPresets() {
  for (const color of PRESET_COLORS) {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'swatch';
    swatch.style.background = color;
    swatch.title = color;
    swatch.setAttribute('aria-label', color);
    swatch.addEventListener('click', () => setColor(color));
    els.presets.appendChild(swatch);
  }
}

function setColor(color) {
  state.color = color.toLowerCase();
  els.picker.value = state.color;
  els.hex.value = state.color;
  els.hex.classList.remove('invalid');
  for (const swatch of els.presets.children) {
    swatch.classList.toggle('selected', swatch.title === state.color);
  }
  draw();
}

// Draw the glyph centered in a square canvas of state.size px
function draw() {
  const { canvas } = els;
  const ctx = canvas.getContext('2d');
  const size = state.size;
  canvas.width = size;
  canvas.height = size;

  if (state.background !== 'transparent') {
    ctx.fillStyle = state.background;
    ctx.fillRect(0, 0, size, size);
  } else {
    ctx.clearRect(0, 0, size, size);
  }

  const text = charOf(state.symbol);
  const padding = size * 0.1;
  const target = size - padding * 2;

  // Measure at a reference size, then scale so the glyph fits in the box
  const refSize = 100;
  ctx.font = `${refSize}px ${FONT_FAMILY}`;
  const m = ctx.measureText(text);
  const w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  const scale = w > 0 && h > 0 ? target / Math.max(w, h) : 1;
  const fontSize = refSize * scale;

  ctx.font = `${fontSize}px ${FONT_FAMILY}`;
  ctx.fillStyle = state.color;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  const x = (size - w * scale) / 2 + m.actualBoundingBoxLeft * scale;
  const y = (size - h * scale) / 2 + m.actualBoundingBoxAscent * scale;
  ctx.fillText(text, x, y);

  els.name.textContent = `${state.symbol.name}（${state.color}）`;
}

function download() {
  els.canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.symbol.id}_${state.color.slice(1)}_${state.size}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

function bindEvents() {
  els.picker.addEventListener('input', (e) => setColor(e.target.value));
  els.hex.addEventListener('input', (e) => {
    let value = e.target.value.trim();
    if (!value.startsWith('#')) value = `#${value}`;
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      setColor(value);
    } else {
      els.hex.classList.add('invalid');
    }
  });
  els.size.addEventListener('input', (e) => {
    state.size = Number(e.target.value);
    els.sizeValue.textContent = state.size;
    draw();
  });
  els.background.addEventListener('change', (e) => {
    state.background = e.target.value;
    draw();
  });
  els.download.addEventListener('click', download);
}

renderSymbolGrid();
renderPresets();
bindEvents();
setColor(state.color);

// Redraw once the web font has loaded so canvas uses the correct glyphs
document.fonts.load('100px "Noto Music"', '\u{1D11E}').then(draw).catch(() => {});
document.fonts.ready.then(draw);
