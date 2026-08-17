// ==========================================
// 👑 KRYLOSMP OFFICIAL KC STORE & HUB ENGINE
// 100% In-Game KryloCoins (KC) Economy
// ==========================================

const PRODUCTS = [
  {
    id: 'rank_vip',
    name: 'VIP Rank',
    category: 'ranks',
    priceKc: 5000,
    icon: 'fa-crown',
    color: '#00FF88',
    desc: 'Unlock exclusive green [VIP] chat prefix, /fly at spawn, and +15% KryloCoin multiplier.',
    perks: ['🟢 Green [VIP] Chat Badge', '🕊️ /fly in Spawn Hub', '⚡ +15% KC Multiplier', '🏠 3x /sethome slots']
  },
  {
    id: 'rank_mvp',
    name: 'MVP Rank',
    category: 'ranks',
    priceKc: 15000,
    icon: 'fa-gem',
    color: '#00E5FF',
    badge: 'POPULAR',
    desc: 'Cyan [MVP] prefix, /heal, /feed, and Netherite PvP starter gear on every respawn.',
    perks: ['💎 Cyan [MVP] Chat Badge', '💖 /heal & /feed commands', '⚔️ Netherite PvP Gear Pack', '⚡ +35% KC Multiplier', '🏠 6x /sethome slots']
  },
  {
    id: 'rank_executive',
    name: '👑 KRYLO EXECUTIVE',
    category: 'ranks',
    priceKc: 50000,
    icon: 'fa-star',
    color: '#FFD700',
    badge: 'EXECUTIVE',
    desc: 'The ultimate rank. Animated Gold prefix, Private VIP Lounge access, and Unlimited Homes.',
    perks: ['👑 Animated Gold [EXECUTIVE] Prefix', '🚪 Private Executive Lounge Access', '🎁 2x Daily Rewards (+500 KC/day)', '⚡ +100% KC Multiplier', '🏠 Unlimited /sethome slots']
  },
  {
    id: 'combat_titan',
    name: 'Netherite Titan Kit',
    category: 'combat',
    priceKc: 2500,
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
    icon: 'fa-apple-whole',
    color: '#FFAA00',
    desc: '16 Enchanted Golden Apples for unstoppable arena survival.',
    perks: ['🍏 16x Enchanted Golden Apples', '⚡ Instant in-game delivery']
  },
  {
    id: 'sky_ore_gen',
    name: 'Ore Generator Upgrade',
    category: 'skyblock',
    priceKc: 3000,
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
    icon: 'fa-robot',
    color: '#3B82F6',
    desc: '2 Iron Golem Spawners for automated iron farming and KryloCoin trading.',
    perks: ['🤖 2x Iron Golem Spawners', '💰 High-speed iron production', '📦 Auto-collection compatible']
  },
  {
    id: 'cosmetic_aura',
    name: 'Flame & Crystal Aura',
    category: 'cosmetics',
    priceKc: 2000,
    icon: 'fa-wand-magic-sparkles',
    color: '#FF0055',
    desc: 'Rotating particles around your character in the spawn hub and FFA arena.',
    perks: ['✨ Glowing Halo Particle Trail', '👑 Stand out in any crowd']
  },
  {
    id: 'cosmetic_join_msg',
    name: 'Custom Join Broadcast',
    category: 'cosmetics',
    priceKc: 1500,
    icon: 'fa-bullhorn',
    color: '#00FFCC',
    desc: 'Play sound effect & broadcast custom message when you join the server.',
    perks: ['🔊 Global Sound Effect on Join', '📢 Gold Broadcast Message']
  }
];

let currentUser = localStorage.getItem('krylosmp_user') || 'Krylo_MC';
let userBalance = parseInt(localStorage.getItem('krylosmp_balance') || (currentUser === 'Krylo_MC' ? '50000' : '5000'));
let currentFilter = 'all';
let selectedProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  loadUserProfile();
});

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = currentFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card ${p.badge ? 'featured-card' : ''}" style="--item-color: ${p.color}">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      <div class="product-card-top">
        <div class="product-icon-box">
          <i class="fa-solid ${p.icon}"></i>
        </div>
        <div class="product-pricing">
          <span class="price-kc">${p.priceKc.toLocaleString()} KC</span>
        </div>
      </div>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      
      <div class="product-perks-preview">
        ${p.perks.slice(0, 2).map(perk => `<span class="perk-tag">${perk}</span>`).join('')}
      </div>

      <div class="product-card-actions">
        <button class="btn-product-buy" onclick="openProductModal('${p.id}')">
          <i class="fa-solid fa-coins"></i> Redeem with KC
        </button>
      </div>
    </div>
  `).join('');
}

// Category Filter
function filterProducts(cat) {
  currentFilter = cat;
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.toLowerCase().includes(cat) || (cat === 'all' && tab.textContent.includes('All')));
  });
  renderProducts();
}

// Open Product Modal
function openProductModal(id) {
  selectedProduct = PRODUCTS.find(p => p.id === id);
  if (!selectedProduct) return;

  document.getElementById('modalProductTitle').textContent = selectedProduct.name;
  document.getElementById('modalProductPrice').textContent = `${selectedProduct.priceKc.toLocaleString()} KryloCoins`;
  document.getElementById('modalProductDesc').textContent = selectedProduct.desc;
  document.getElementById('modalUsername').textContent = currentUser;
  document.getElementById('modalUserAvatar').src = `https://mc-heads.net/avatar/${encodeURIComponent(currentUser)}/48`;

  const perksContainer = document.getElementById('modalPerksList');
  perksContainer.innerHTML = selectedProduct.perks.map(perk => `
    <div class="modal-perk-item"><i class="fa-solid fa-circle-check"></i> ${perk}</div>
  `).join('');

  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function confirmPurchase() {
  if (!selectedProduct) return;

  if (userBalance < selectedProduct.priceKc) {
    showToast(`❌ Insufficient KryloCoins! You need ${selectedProduct.priceKc.toLocaleString()} KC (You have ${userBalance.toLocaleString()} KC). Play FFA Arena or claim /daily in-game to earn more!`);
    return;
  }

  userBalance -= selectedProduct.priceKc;
  localStorage.setItem('krylosmp_balance', userBalance);
  loadUserProfile();
  closeProductModal();
  showToast(`🎉 SUCCESS! Purchased ${selectedProduct.name} for ${selectedProduct.priceKc.toLocaleString()} KC! Remaining: ${userBalance.toLocaleString()} KC.`);
}

// User Profile Binding
function bindUsername() {
  const input = document.getElementById('mcUsernameInput');
  const val = (input?.value || '').trim();
  if (!val) {
    showToast('⚠️ Please enter a valid Minecraft username.');
    return;
  }

  currentUser = val;
  userBalance = currentUser.toLowerCase() === 'krylo_mc' ? 50000 : 5000;
  localStorage.setItem('krylosmp_user', currentUser);
  localStorage.setItem('krylosmp_balance', userBalance);
  loadUserProfile();
  showToast(`✅ Profile linked to ${currentUser}! Balance: ${userBalance.toLocaleString()} KC`);
  if (input) input.value = '';
}

function loadUserProfile() {
  const heroAvatar = document.getElementById('heroAvatar');
  const heroName = document.getElementById('heroPlayerName');
  const heroRank = document.getElementById('heroPlayerRank');
  const heroBalance = document.getElementById('heroPlayerBalance');
  const userHeader = document.getElementById('userProfileHeader');

  if (heroAvatar) heroAvatar.src = `https://mc-heads.net/avatar/${encodeURIComponent(currentUser)}/64`;
  if (heroName) heroName.textContent = currentUser;
  if (heroRank) heroRank.textContent = currentUser.toLowerCase() === 'krylo_mc' ? '👑 OWNER / EXECUTIVE' : '⚡ VERIFIED PLAYER';
  if (heroBalance) heroBalance.textContent = `${userBalance.toLocaleString()} KryloCoins`;

  if (userHeader) {
    userHeader.innerHTML = `
      <div class="user-pill" onclick="openLoginModal()">
        <img src="https://mc-heads.net/avatar/${encodeURIComponent(currentUser)}/32" alt="Avatar">
        <span>${currentUser} (${userBalance.toLocaleString()} KC)</span>
      </div>
    `;
  }
}

// Modals
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

function submitModalLogin() {
  const input = document.getElementById('modalMcUsername');
  const val = (input?.value || '').trim();
  if (val) {
    currentUser = val;
    userBalance = currentUser.toLowerCase() === 'krylo_mc' ? 50000 : 5000;
    localStorage.setItem('krylosmp_user', currentUser);
    localStorage.setItem('krylosmp_balance', userBalance);
    loadUserProfile();
    closeLoginModal();
    showToast(`✅ Verified and synced with ${currentUser}!`);
  }
}

// Clipboard
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Copied to clipboard: ${text}`);
  }).catch(() => {
    showToast(`Server: ${text}`);
  });
}

function copyServerIp() {
  copyText('62.141.62.37:53568');
}

// Toast
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
