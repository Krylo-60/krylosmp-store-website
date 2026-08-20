// ==========================================
// 👑 KRYLOSMP OFFICIAL STORE & HUB ENGINE
// FreshSMP & RedishSMP Style Catalog
// ==========================================

let currentPlatform = 'java';
let currentCurrency = 'KC';
let currentCategory = 'all';

const PRODUCTS = [
  // RANKS
  {
    id: 'rank_vip',
    name: 'VIP Rank',
    category: 'ranks',
    priceKc: 5000,
    priceUsd: 4.99,
    icon: 'fa-crown',
    color: '#00FF88',
    desc: 'Unlock exclusive green [VIP] chat prefix, /fly in Hub, and +15% KryloCoins boost.',
    perks: ['🟢 Green [VIP] Chat Badge', '🕊️ /fly in Spawn Hub', '⚡ +15% KC Multiplier', '🏠 3x /sethome slots']
  },
  {
    id: 'rank_mvp',
    name: 'MVP Rank',
    category: 'ranks',
    priceKc: 15000,
    priceUsd: 9.99,
    icon: 'fa-gem',
    color: '#00E5FF',
    badge: 'POPULAR',
    desc: 'Cyan [MVP] prefix, /heal, /feed, and Netherite PvP starter gear on respawn.',
    perks: ['💎 Cyan [MVP] Chat Badge', '💖 /heal & /feed commands', '⚔️ Netherite PvP Gear Pack', '⚡ +35% KC Multiplier', '🏠 6x /sethome slots']
  },
  {
    id: 'rank_mvpplus',
    name: 'MVP+ Rank',
    category: 'ranks',
    priceKc: 30000,
    priceUsd: 19.99,
    icon: 'fa-fire',
    color: '#FF6B35',
    badge: 'HOT',
    desc: 'Orange [MVP+] prefix, /workbench, /enderchest anywhere, and priority queue.',
    perks: ['🔥 Orange [MVP+] Chat Prefix', '🧰 /craft & /enderchest everywhere', '⚡ +50% KC Multiplier', '🏠 10x /sethome slots']
  },
  {
    id: 'rank_executive',
    name: '👑 KRYLO EXECUTIVE',
    category: 'ranks',
    priceKc: 50000,
    priceUsd: 34.99,
    icon: 'fa-star',
    color: '#FFD700',
    badge: 'EXECUTIVE',
    desc: 'The ultimate rank. Animated Gold prefix, Private VIP Lounge access, and Unlimited Homes.',
    perks: ['👑 Animated Gold [EXECUTIVE] Prefix', '🚪 Private Executive Lounge Access', '🎁 2x Daily Rewards (+500 KC/day)', '⚡ +100% KC Multiplier', '🏠 Unlimited /sethome slots']
  },

  // CRATES & KEYS (FreshSMP Style)
  {
    id: 'crate_mythic_5',
    name: '5x Mythic Crate Keys',
    category: 'crates',
    priceKc: 4500,
    priceUsd: 3.99,
    icon: 'fa-key',
    color: '#A855F7',
    desc: '5x Mythic Keys with 30% chance for God Armor and 10,000 KC jackpot drops.',
    perks: ['🗝️ 5x Mythic Keys', '🎁 30% God Gear Chance', '💰 High KC Drops', '⚡ Instant Crate Delivery']
  },
  {
    id: 'crate_legendary_bundle',
    name: 'Legendary Dragon Crate (x10)',
    category: 'crates',
    priceKc: 10000,
    priceUsd: 7.99,
    icon: 'fa-dragon',
    color: '#FF4444',
    badge: 'BEST VALUE',
    desc: '10x Ancient Dragon Keys with guaranteed Netherite weapon and elytra drop.',
    perks: ['🐉 10x Dragon Crate Keys', '🛡️ Guaranteed Netherite Weapon', '🪽 Elytra + 64 Fireworks', '⚡ Auto-broadcasts unboxing']
  },

  // GEMS & KRYLOCOINS (FreshSMP Style)
  {
    id: 'gems_starter',
    name: '10,000 KryloCoins Pack',
    category: 'gems',
    priceKc: 1000,
    priceUsd: 2.99,
    icon: 'fa-coins',
    color: '#00FF88',
    desc: 'Starter economy boost to trade, bid on auctions, and unlock kits.',
    perks: ['💰 10,000 KryloCoins in-game', '⚡ Direct delivery to /balance']
  },
  {
    id: 'gems_tycoon',
    name: '50,000 KryloCoins Tycoon',
    category: 'gems',
    priceKc: 5000,
    priceUsd: 9.99,
    icon: 'fa-sack-dollar',
    color: '#00E5FF',
    badge: 'POPULAR',
    desc: 'The best economy pack for clan vaults, black market, and spawners.',
    perks: ['💰 50,000 KryloCoins in-game', '🎁 Bonus 2x Crate Keys included', '⚡ Direct delivery to /balance']
  },
  {
    id: 'gems_infinity',
    name: '250,000 KryloCoins Vault',
    category: 'gems',
    priceKc: 20000,
    priceUsd: 29.99,
    icon: 'fa-vault',
    color: '#FFD700',
    badge: 'MEGA PACK',
    desc: 'Dominate the server economy and claim top #1 on the clan leaderboard.',
    perks: ['💰 250,000 KryloCoins in-game', '🏆 Instant Clan Leaderboard rank', '⚡ Direct delivery to /balance']
  },

  // COMBAT & FFA KITS (RedishSMP Style)
  {
    id: 'combat_titan',
    name: 'Netherite Titan Kit',
    category: 'combat',
    priceKc: 2500,
    priceUsd: 2.49,
    icon: 'fa-shield-halved',
    color: '#FF4444',
    desc: 'Full Protection IV Netherite Armor, Sharpness V Sword, 16 Gaps, and 4 Ender Pearls.',
    perks: ['🛡️ Full Netherite Prot 4 Armor', '🗡️ Netherite Sharp 5 Sword', '🍏 16x Golden Apples', '🔮 4x Ender Pearls']
  },
  {
    id: 'combat_archer',
    name: 'Elite Sniper Bow Kit',
    category: 'combat',
    priceKc: 1500,
    priceUsd: 1.49,
    icon: 'fa-crosshairs',
    color: '#FF6B35',
    desc: 'Power V Flame Infinity Bow with Speed II combat potions.',
    perks: ['🏹 Power V Flame Infinity Bow', '🧪 3x Speed II Potions (8:00)', '🧪 2x Strength II Potions']
  },
  {
    id: 'combat_gaps',
    name: 'God Apple Bundle (x16)',
    category: 'combat',
    priceKc: 1000,
    priceUsd: 0.99,
    icon: 'fa-apple-whole',
    color: '#FFAA00',
    desc: '16 Enchanted Golden Apples for unstoppable arena survival.',
    perks: ['🍏 16x Enchanted Golden Apples', '⚡ Instant in-game delivery']
  },

  // SKYBLOCK BOOSTERS
  {
    id: 'sky_ore_gen',
    name: 'Ore Generator Upgrade',
    category: 'skyblock',
    priceKc: 3000,
    priceUsd: 3.49,
    icon: 'fa-cubes-stacked',
    color: '#00E5FF',
    desc: 'Upgrades your island cobblestone generator to spawn Diamonds and Ancient Debris!',
    perks: ['💎 +15% Diamond Spawn Rate', '🔥 Ancient Debris Generator', '⚡ Faster mining speed']
  },
  {
    id: 'sky_island_size',
    name: 'Island Size Upgrade (+50)',
    category: 'skyblock',
    priceKc: 4000,
    priceUsd: 4.49,
    icon: 'fa-expand',
    color: '#A855F7',
    desc: 'Expands your private SkyBlock island boundary to a massive 150x150 build zone.',
    perks: ['📐 +50 Block Border Radius', '🏰 150x150 Total Building Area', '👥 +2 Max Island Team Members']
  },
  {
    id: 'sky_spawners',
    name: 'Iron Golem Spawner Pack',
    category: 'skyblock',
    priceKc: 5000,
    priceUsd: 5.49,
    icon: 'fa-robot',
    color: '#3B82F6',
    desc: '2 Iron Golem Spawners for automated iron farming and KryloCoin trading.',
    perks: ['🤖 2x Iron Golem Spawners', '💰 High-speed iron production', '📦 Auto-collection compatible']
  }
];

// Active state
let currentUser = localStorage.getItem('krylo_user') || '';
let selectedProduct = null;

// Platform Selector
function setPlatform(plat) {
  currentPlatform = plat;
  document.getElementById('platJava').classList.toggle('active', plat === 'java');
  document.getElementById('platBedrock').classList.toggle('active', plat === 'bedrock');
  showToast(`Switched catalog to ${plat === 'java' ? 'Java Edition 1.21.x' : 'Bedrock Edition (Geyser)'}!`);
}

// Currency Selector
function changeCurrency(curr) {
  currentCurrency = curr;
  renderProducts();
  showToast(`Currency updated to ${curr}!`);
}

function getFormattedPrice(prod) {
  if (currentCurrency === 'KC') {
    return `${prod.priceKc.toLocaleString()} KC`;
  }
  const rateMap = { USD: 1.0, EUR: 0.92, GBP: 0.79, INR: 83.5 };
  const symMap = { USD: '$', EUR: '€', GBP: '£', INR: '₹' };
  const rate = rateMap[currentCurrency] || 1.0;
  const sym = symMap[currentCurrency] || '$';
  return `${sym}${(prod.priceUsd * rate).toFixed(2)}`;
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = currentCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === currentCategory);

  filtered.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
      ${prod.badge ? `<span class="badge" style="border-color: ${prod.color}; color: ${prod.color};">${prod.badge}</span>` : ''}
      <div class="product-icon" style="color: ${prod.color}; background: ${prod.color}15; border-color: ${prod.color}40;">
        <i class="fa-solid ${prod.icon}"></i>
      </div>
      <h3>${prod.name}</h3>
      <p class="product-desc">${prod.desc}</p>
      <div class="product-features">
        ${prod.perks.slice(0, 3).map(p => `<span><i class="fa-solid fa-check" style="color: #00FF88;"></i> ${p}</span>`).join('')}
      </div>
      <div class="product-footer">
        <div class="product-price">${getFormattedPrice(prod)}</div>
        <button class="btn-buy" onclick="openProductModal('${prod.id}')">
          <i class="fa-solid fa-cart-shopping"></i> Purchase
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProducts(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderProducts();
}

function openProductModal(id) {
  selectedProduct = PRODUCTS.find(p => p.id === id);
  if (!selectedProduct) return;

  document.getElementById('modalProductTitle').innerText = selectedProduct.name;
  document.getElementById('modalProductPrice').innerText = getFormattedPrice(selectedProduct);
  document.getElementById('modalProductDesc').innerText = selectedProduct.desc;
  
  const perksContainer = document.getElementById('modalPerksList');
  perksContainer.innerHTML = selectedProduct.perks.map(p => `
    <div class="modal-perk-item"><i class="fa-solid fa-circle-check"></i> ${p}</div>
  `).join('');

  const displayUser = currentUser || 'Krylo_MC';
  document.getElementById('modalUsername').innerText = displayUser;
  document.getElementById('modalUserAvatar').src = `https://mc-heads.net/avatar/${encodeURIComponent(displayUser)}/64`;

  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function confirmPurchase() {
  const user = currentUser || 'Krylo_MC';
  closeProductModal();
  showToast(`🎉 Order Placed for ${selectedProduct.name}! In-game delivery assigned to ${user}.`);
}

function bindUsername() {
  const val = document.getElementById('mcUsernameInput').value.trim();
  if (!val) return showToast('Please enter a valid Minecraft username!');
  currentUser = val;
  localStorage.setItem('krylo_user', val);
  document.getElementById('headerUserLabel').innerText = val;
  showToast(`Linked Minecraft profile: ${val}!`);
}

function copyServerIp() {
  navigator.clipboard.writeText('krylosmp.play.hosting:25754');
  showToast('📋 Server IP copied: krylosmp.play.hosting:25754');
}

function showToast(msg) {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// Inline Locator Engine & Hash Router Support
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) { h = 0; } 
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, v };
}

function hsvToRgb(h, s, v) {
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

async function calcInlineLocator() {
  const input = document.getElementById('inlineLocatorInput').value.trim() || 'Krylo_MC';
  document.getElementById('inlineDispName').innerText = input;
  document.getElementById('inlineHead').src = `https://mc-heads.net/avatar/${encodeURIComponent(input)}/128`;
  document.getElementById('inlineBarIcon').src = `https://mc-heads.net/avatar/${encodeURIComponent(input)}/64`;

  let uuid = '';
  try {
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(input)}`);
    if (res.ok) {
      const data = await res.json();
      uuid = data.id;
      document.getElementById('inlineDispName').innerText = data.name;
    }
  } catch (e) {}

  if (!uuid) {
    uuid = Array.from(input).reduce((acc, c) => acc + c.charCodeAt(0).toString(16), '').padEnd(32, '0').slice(0, 32);
  }

  document.getElementById('inlineDispUuid').innerText = `${uuid.slice(0,8)}-${uuid.slice(8,12)}-${uuid.slice(12,16)}-${uuid.slice(16,20)}-${uuid.slice(20)}`;

  const part1 = parseInt(uuid.slice(0, 8), 16) || 0;
  const part2 = parseInt(uuid.slice(8, 16), 16) || 0;
  const part3 = parseInt(uuid.slice(16, 24), 16) || 0;
  const part4 = parseInt(uuid.slice(24, 32), 16) || 0;
  const combined = (part1 ^ part2 ^ part3 ^ part4) & 0xFFFFFF;

  const rawR = (combined >> 16) & 0xFF;
  const rawG = (combined >> 8) & 0xFF;
  const rawB = combined & 0xFF;
  const rawHex = `#${rawR.toString(16).padStart(2, '0')}${rawG.toString(16).padStart(2, '0')}${rawB.toString(16).padStart(2, '0')}`.toUpperCase();

  const hsv = rgbToHsv(rawR, rawG, rawB);
  const normHex = hsvToRgb(hsv.h, Math.max(hsv.s, 0.70), 0.90).toUpperCase();

  document.getElementById('inlineHexNorm').innerText = normHex;
  document.getElementById('inlinePillNorm').style.background = normHex;
  document.getElementById('inlineHexRaw').innerText = rawHex;
  document.getElementById('inlinePillRaw').style.background = rawHex;
  document.getElementById('inlineHue').innerText = `${Math.round(hsv.h * 360)}° / 90%`;
  document.getElementById('inlineBarFill').style.background = normHex;
}

// Handle hash routing for #locator, #locater, #test
function handleHashRouting() {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#locator' || hash === '#locater') {
    const el = document.getElementById('locator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#test') {
    const el = document.getElementById('test');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#ranks') {
    filterProducts('ranks');
    const el = document.getElementById('store');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (hash === '#crates') {
    filterProducts('crates');
    const el = document.getElementById('store');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('hashchange', handleHashRouting);
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  calcInlineLocator();
  if (currentUser) {
    document.getElementById('headerUserLabel').innerText = currentUser;
    document.getElementById('mcUsernameInput').value = currentUser;
  }
  setTimeout(handleHashRouting, 300);
});
