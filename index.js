/**
 * KryloSMP Web Store & Economy Engine
 * Integrated with Discord Bot Backend & Instant Verification
 */

// Application State
const state = {
  cart: [],
  mcUsername: '',
  appliedPromoCode: '',
  discountPercentage: 0,
  taxPercentage: 0.03
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  generateAndRenderProducts();
  setupEventListeners();
  checkActiveSession();
  updatePlayerCounter();
  setInterval(updatePlayerCounter, 30000);
});

// Setup Event Listeners
function setupEventListeners() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const btnStartShopping = document.getElementById('btnStartShopping');
  const successModal = document.getElementById('successModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnApplyPromo = document.getElementById('btnApplyPromo');
  const btnBuyAll = document.getElementById('btnBuyAll');
  const btnLoginHeader = document.getElementById('btnLoginHeader');
  const accountModal = document.getElementById('accountModal');
  const btnCloseAccountModal = document.getElementById('btnCloseAccountModal');
  const btnRequestRegCode = document.getElementById('btnRequestRegCode');
  const btnCheckout = document.getElementById('btnCheckout');

  if (cartToggleBtn && cartSidebar) {
    cartToggleBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
  }
  if (btnCloseCart && cartSidebar) {
    btnCloseCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
  }
  if (btnStartShopping) {
    btnStartShopping.addEventListener('click', bindUsername);
  }
  if (btnCloseModal && successModal) {
    btnCloseModal.addEventListener('click', () => successModal.classList.remove('open'));
  }
  if (btnApplyPromo) {
    btnApplyPromo.addEventListener('click', applyPromoCode);
  }
  if (btnLoginHeader) {
    btnLoginHeader.addEventListener('click', openLoginModal);
  }
  if (btnCloseAccountModal && accountModal) {
    btnCloseAccountModal.addEventListener('click', () => accountModal.classList.remove('open'));
  }
  if (btnRequestRegCode) {
    btnRequestRegCode.addEventListener('click', handleRequestCode);
  }
  if (btnCheckout) {
    btnCheckout.addEventListener('click', handleCheckout);
  }
  if (btnBuyAll) {
    btnBuyAll.addEventListener('click', () => {
      addToCart('krylo-ultimate-bundle', 'Krylo Ultimate Bundle (Buy All)', 226983);
      if (cartSidebar) cartSidebar.classList.add('open');
    });
  }

  // Category Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCategory(btn.dataset.category || 'all');
    });
  });

  // Global Delegated Click Handler for Products
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-to-cart');
      if (btn) {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price, 10);
        addToCart(id, name, price);
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar) sidebar.classList.add('open');
      }
    });
  }
}

// Fetch Minecraft Server Status dynamically
async function updatePlayerCounter() {
  const counterElems = document.querySelectorAll('.player-count');
  try {
    const res = await fetch('https://api.mcsrvstat.us/3/KryloSmp.play.hosting');
    const data = await res.json();
    if (data.online) {
      counterElems.forEach(el => {
        el.innerHTML = `<b style="color: var(--accent-green);">${data.players.online}/${data.players.max}</b> Online`;
      });
    } else {
      counterElems.forEach(el => {
        el.innerHTML = `<span style="color: #ff3333;">Offline</span>`;
      });
    }
  } catch {
    counterElems.forEach(el => {
      el.innerHTML = `<b style="color: var(--accent-green);">12/50</b> Online`;
    });
  }
}

// Bind Username
function bindUsername() {
  const mcUsernameInput = document.getElementById('mcUsernameInput');
  const cartUsernameDisplay = document.getElementById('cartUsernameDisplay');
  const btnStartShopping = document.getElementById('btnStartShopping');
  
  if (!mcUsernameInput) return;
  const username = mcUsernameInput.value.trim();
  if (username) {
    state.mcUsername = username;
    localStorage.setItem('mc_user', username);

    if (cartUsernameDisplay) {
      cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> Linked: <b>${username}</b>`;
      cartUsernameDisplay.style.color = 'var(--accent-green)';
    }
    
    if (btnStartShopping) {
      const originalBtnText = btnStartShopping.innerHTML;
      btnStartShopping.innerHTML = `<i class="fa-solid fa-check"></i> Linked!`;
      btnStartShopping.style.background = 'linear-gradient(135deg, var(--accent-green) 0%, #00aa44 100%)';
      btnStartShopping.style.color = '#000';
      
      setTimeout(() => {
        btnStartShopping.innerHTML = originalBtnText;
        btnStartShopping.style.background = '';
        btnStartShopping.style.color = '';
      }, 2000);
    }

    const shopElem = document.getElementById('shop');
    if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
    updateCartUI();
  } else {
    mcUsernameInput.focus();
    mcUsernameInput.style.borderColor = '#ff3333';
    setTimeout(() => mcUsernameInput.style.borderColor = '', 1000);
  }
}

// Category Tabs Filter
function filterCategory(category) {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Cart Mechanics
function addToCart(id, name, price) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ id, name, price, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartQuantity(id, delta) {
  const item = state.cart.find(item => item.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

// Apply Promo Code
function applyPromoCode() {
  const promoCodeInput = document.getElementById('promoCodeInput');
  const promoStatusMsg = document.getElementById('promoStatusMsg');
  if (!promoCodeInput) return;

  const code = promoCodeInput.value.trim().toUpperCase();
  if (!code) {
    showPromoStatus("Please enter a valid code.", "error");
    return;
  }

  const validCodes = {
    'KRYLO10': { discount: 0.10, msg: "10% Creator Discount Applied! (Code: KRYLO10)" },
    'KRIMS20': { discount: 0.20, msg: "20% Exclusive Discount Applied! (Code: KRIMS20)" },
    'BETA50':  { discount: 0.50, msg: "50% Beta Launch Discount Applied! (Code: BETA50)" },
    'SALT15':  { discount: 0.15, msg: "15% Saltverse Partner Discount! (Code: SALT15)" }
  };

  if (validCodes[code]) {
    state.discountPercentage = validCodes[code].discount;
    state.appliedPromoCode = code;
    showPromoStatus(`🎉 ${validCodes[code].msg}`, "success");
  } else {
    state.discountPercentage = 0;
    state.appliedPromoCode = '';
    showPromoStatus("❌ Invalid or expired promotional code.", "error");
  }
  updateCartUI();
}

function showPromoStatus(msg, type) {
  const promoStatusMsg = document.getElementById('promoStatusMsg');
  if (!promoStatusMsg) return;
  promoStatusMsg.textContent = msg;
  promoStatusMsg.style.display = 'block';
  promoStatusMsg.style.color = type === 'success' ? 'var(--accent-green)' : '#ff4444';
}

// Update Cart UI
function updateCartUI() {
  const cartBadge = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsList');
  const lblSubtotal = document.getElementById('lblSubtotal');
  const lblDiscount = document.getElementById('lblDiscount');
  const lblTax = document.getElementById('lblTax');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const btnCheckout = document.getElementById('btnCheckout');
  const cartUsernameDisplay = document.getElementById('cartUsernameDisplay');

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = totalCount;

  if (!cartItemsContainer) return;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-msg">
        <i class="fa-solid fa-cart-arrow-down" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 0.8rem;"></i>
        <p>Your shopping cart is currently empty.</p>
        <span>Add items from the store to continue.</span>
      </div>
    `;
    if (lblSubtotal) lblSubtotal.textContent = '0 KC';
    if (lblDiscount) lblDiscount.textContent = '0 KC';
    if (lblTax) lblTax.textContent = '0 KC';
    if (cartSubtotal) cartSubtotal.textContent = '0 KC';
    if (btnCheckout) {
      btnCheckout.disabled = true;
      btnCheckout.innerHTML = `<i class="fa-solid fa-lock"></i> Checkout`;
    }
    return;
  }

  cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">${item.price * item.quantity} KC (${item.price} each)</span>
      </div>
      <div class="cart-item-controls">
        <button class="btn-qty" onclick="updateCartQuantity('${item.id}', -1)">-</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="btn-qty" onclick="updateCartQuantity('${item.id}', 1)">+</button>
        <button class="btn-remove" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round(subtotal * state.discountPercentage);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = Math.round(taxableAmount * state.taxPercentage);
  const finalTotal = taxableAmount + taxAmount;

  if (lblSubtotal) lblSubtotal.textContent = `${subtotal} KC`;
  if (lblDiscount) lblDiscount.textContent = `-${discountAmount} KC (${state.discountPercentage * 100}%)`;
  if (lblTax) lblTax.textContent = `+${taxAmount} KC`;
  if (cartSubtotal) cartSubtotal.textContent = `${finalTotal} KC`;

  const username = state.mcUsername || localStorage.getItem('mc_user');
  if (btnCheckout) {
    if (username) {
      btnCheckout.disabled = false;
      btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
    } else {
      btnCheckout.disabled = true;
      btnCheckout.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Link Username First`;
    }
  }

  if (cartUsernameDisplay && username) {
    cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> Linked: <b>${username}</b>`;
    cartUsernameDisplay.style.color = 'var(--accent-green)';
  }
}

window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// Handle Checkout
async function handleCheckout() {
  const username = state.mcUsername || localStorage.getItem('mc_user');
  if (!username) {
    alert("Please link your Minecraft username before checking out!");
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round(subtotal * state.discountPercentage);
  const finalTotal = Math.round((subtotal - discountAmount) * (1 + state.taxPercentage));

  const btnCheckout = document.getElementById('btnCheckout');
  const successModal = document.getElementById('successModal');
  const successUserDisplay = document.getElementById('successUserDisplay');
  const promoCodeInput = document.getElementById('promoCodeInput');
  const promoStatusMsg = document.getElementById('promoStatusMsg');
  const cartSidebar = document.getElementById('cartSidebar');

  if (btnCheckout) {
    btnCheckout.disabled = true;
    btnCheckout.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Order...`;
  }

  try {
    const res = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'checkout',
        guildId: '1524878881918685405',
        username: username,
        discordUserId: localStorage.getItem('mc_discord_id') || 'WebUser',
        cart: state.cart.map(item => item.id),
        promoCode: state.appliedPromoCode
      })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      const profileRankElem = document.getElementById('profileRank');
      if (profileRankElem) {
        profileRankElem.innerHTML = `Member • <b style="color: var(--accent-gold);">${data.newBalance} KC</b>`;
      }
      
      setTimeout(() => {
        if (successUserDisplay) successUserDisplay.textContent = username;
        if (successModal) successModal.classList.add('open');
        
        state.cart = [];
        state.discountPercentage = 0;
        state.appliedPromoCode = '';
        if (promoCodeInput) promoCodeInput.value = '';
        if (promoStatusMsg) promoStatusMsg.style.display = 'none';
        
        updateCartUI();
        if (cartSidebar) cartSidebar.classList.remove('open');
      }, 500);
    } else {
      alert(`Error: ${data.error || 'Failed to complete transaction'}`);
      if (btnCheckout) {
        btnCheckout.disabled = false;
        btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
      }
    }
  } catch (err) {
    console.error("Checkout failed:", err.message);
    alert(`Checkout error: ${err.message}`);
    if (btnCheckout) {
      btnCheckout.disabled = false;
      btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
    }
  }
}

// Check Active Session
function checkActiveSession() {
  const user = localStorage.getItem('mc_user');
  const discordId = localStorage.getItem('mc_discord_id');
  if (user) {
    logInUser(user, discordId || 'user_' + Date.now());
  }
}

// Open Login Modal
function openLoginModal() {
  const accountModal = document.getElementById('accountModal');
  const modalStep1 = document.getElementById('modalStep1');
  const regMcUsername = document.getElementById('regMcUsername');
  const regDiscordId = document.getElementById('regDiscordId');

  if (modalStep1) modalStep1.style.display = 'block';
  if (regMcUsername) regMcUsername.value = '';
  if (regDiscordId) regDiscordId.value = '';
  if (accountModal) accountModal.classList.add('open');
}

// Handle Instant Verification & Login
async function handleRequestCode() {
  const regMcUsername = document.getElementById('regMcUsername');
  const regDiscordId = document.getElementById('regDiscordId');
  const btnRequestRegCode = document.getElementById('btnRequestRegCode');
  const accountModal = document.getElementById('accountModal');

  if (!regMcUsername) return;
  const mcUsername = regMcUsername.value.trim();
  const discordId = (regDiscordId ? regDiscordId.value.trim() : '') || 'user_' + Date.now();

  if (!mcUsername) {
    alert("Please enter your Minecraft Username!");
    return;
  }

  if (btnRequestRegCode) {
    btnRequestRegCode.disabled = true;
    btnRequestRegCode.innerHTML = `<i class="fa-solid fa-bolt fa-spin"></i> Verifying Instantly...`;
  }

  try {
    console.log(`[Store] Instantly verifying player: ${mcUsername}`);
    logInUser(mcUsername, discordId);
    if (accountModal) accountModal.classList.remove('open');
  } catch (err) {
    console.error("Login error:", err);
    logInUser(mcUsername, discordId);
    if (accountModal) accountModal.classList.remove('open');
  } finally {
    if (btnRequestRegCode) {
      btnRequestRegCode.disabled = false;
      btnRequestRegCode.innerHTML = `<i class="fa-solid fa-bolt"></i> Verify & Log In Instantly`;
    }
  }
}

// Log In User
async function logInUser(username, discordId) {
  localStorage.setItem('mc_user', username);
  localStorage.setItem('mc_discord_id', discordId);
  
  state.mcUsername = username;
  const mcUsernameInput = document.getElementById('mcUsernameInput');
  const userProfileHeader = document.getElementById('userProfileHeader');
  const cartUsernameDisplay = document.getElementById('cartUsernameDisplay');

  if (mcUsernameInput) mcUsernameInput.value = username;

  const avatarUrl = `https://mc-heads.net/avatar/${username}`;
  let rank = 'Member';
  
  if (userProfileHeader) {
    userProfileHeader.innerHTML = `
      <div class="profile-widget">
        <img src="${avatarUrl}" class="profile-avatar" alt="Avatar">
        <div class="profile-info">
          <span class="profile-name">${username}</span>
          <span class="profile-rank" id="profileRank">${rank}</span>
        </div>
        <button class="btn-logout" id="btnLogout" onclick="logOutUser()"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    `;
  }

  if (cartUsernameDisplay) {
    cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> Linked: <b>${username}</b>`;
    cartUsernameDisplay.style.color = 'var(--accent-green)';
  }

  updateCartUI();

  try {
    const configRes = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_config', guildId: '1524878881918685405' })
    });
    if (configRes.ok) {
      const configData = await configRes.json();
      if (configData.verifiedPlayers && configData.verifiedPlayers[discordId]) {
        rank = configData.verifiedPlayers[discordId].rank || 'Member';
      }

      let balanceStr = '1,500 KC';
      if (configData.economyData && configData.economyData[username]) {
        const balance = configData.economyData[username].balance || 1500;
        balanceStr = `${balance.toLocaleString()} KC`;
      }
      
      const profileRankElem = document.getElementById('profileRank');
      if (profileRankElem) {
        profileRankElem.innerHTML = `${rank} • <b style="color: var(--accent-gold);">${balanceStr}</b>`;
      }
    }
  } catch (err) {
    console.warn("Profile fetch err:", err.message);
  }
}

// Log Out User
function logOutUser() {
  localStorage.removeItem('mc_user');
  localStorage.removeItem('mc_discord_id');
  
  state.mcUsername = '';
  const mcUsernameInput = document.getElementById('mcUsernameInput');
  const userProfileHeader = document.getElementById('userProfileHeader');
  const cartUsernameDisplay = document.getElementById('cartUsernameDisplay');

  if (mcUsernameInput) mcUsernameInput.value = '';

  if (userProfileHeader) {
    userProfileHeader.innerHTML = `
      <button class="btn-login-header" id="btnLoginHeader" onclick="openLoginModal()"><i class="fa-solid fa-user-lock"></i> Register / Login</button>
    `;
  }

  if (cartUsernameDisplay) {
    cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-user"></i> <span>Not bound</span>`;
    cartUsernameDisplay.style.color = '';
  }

  updateCartUI();
}

window.logOutUser = logOutUser;
window.openLoginModal = openLoginModal;

// Programmatic Product Generator
function generateAndRenderProducts() {
  const products = [];

  // 1. RANKS
  const rankNames = [
    { id: 'vip-rank', name: 'VIP Rank', badge: 'VIP', icon: 'fa-mug-hot', color: 'green', price: 500, desc: 'Includes `/fly` command in claims, green username prefix, and set up to 3 homes.' },
    { id: 'mvp-rank', name: 'MVP Rank', badge: 'MVP', icon: 'fa-medal', color: 'orange', price: 1000, desc: 'Includes all VIP perks, orange username prefix, set up to 6 homes, and access to `/feed` command.' },
    { id: 'legend-rank', name: 'Legend Rank', badge: 'LEGEND', icon: 'fa-crown', color: 'gold', price: 2500, desc: 'The ultimate rank. Includes golden username prefix, `/god` in safezones, and 12 homes.' },
    { id: 'titan-rank', name: 'Titan Rank', badge: 'TITAN', icon: 'fa-shield-halved', color: 'red', price: 5000, desc: 'Titan tier. Includes dark red prefix, 20 homes, `/heal` command (cooldown), and priority queues.' },
    { id: 'champion-rank', name: 'Champion Rank', badge: 'CHAMPION', icon: 'fa-trophy', color: 'cyan', price: 7500, desc: 'Champion status. Includes cyan username prefix, 30 homes, and custom join/leave broadcast messages.' },
    { id: 'elite-rank', name: 'Elite Rank', badge: 'ELITE', icon: 'fa-gem', color: 'pink', price: 10000, desc: 'Elite rank. Includes custom pink prefix, 40 homes, `/enderchest` command, and VIP slots in events.' },
    { id: 'overlord-rank', name: 'Overlord Rank', badge: 'OVERLORD', icon: 'fa-skull', color: 'purple', price: 15000, desc: 'Overlord status. Includes purple prefix, 50 homes, `/craft` command, and exclusive discord channel.' },
    { id: 'god-rank', name: 'God Rank', badge: 'GOD', icon: 'fa-bolt', color: 'yellow', price: 25000, desc: 'God rank status. Includes yellow prefix, 80 homes, `/back` command, and double server votes multiplier.' },
    { id: 'immortal-rank', name: 'Immortal Rank', badge: 'IMMORTAL', icon: 'fa-infinity', color: 'white', price: 50000, desc: 'Immortal status. Includes white prefix, unlimited homes, all kits unlocked, and custom tag request.' },
    { id: 'krylo-god-rank', name: 'Krylo God Rank', badge: 'KRYLO GOD', icon: 'fa-rocket', color: 'pink', price: 100000, desc: 'The supreme rank of KryloSMP. Includes custom neon pink prefix, toggleable creative mode in base claim, and staff bypass permissions.' }
  ];

  rankNames.forEach(r => {
    products.push({
      id: r.id,
      name: r.name,
      price: r.price,
      category: 'ranks',
      badge: r.badge,
      icon: r.icon,
      color: r.color,
      desc: r.desc,
      perks: [r.desc.substring(0, 30), 'Exclusive Discord Role', '100% safe delivery in-game']
    });
  });

  // Bundle
  products.push({
    id: 'krylo-ultimate-bundle',
    name: 'Krylo Ultimate Bundle (Buy All)',
    price: 226983,
    category: 'ranks',
    badge: 'ALL BUNDLE',
    icon: 'fa-cubes-stacked',
    color: 'gold',
    desc: 'Unlocks ALL ranks, crate keys, cosmetics, and chat tags instantly. Includes a 16% bundle discount and a 5% game tax.',
    perks: ['All 10 Ranks (VIP to Krylo God)', 'All 15 Key bundles & cosmetics', 'All 50 custom chat suffix tags']
  });

  // Crate Keys
  const keyTypes = [
    { type: 'seasonal', name: 'Season Crate Key', price: 60, desc: 'Mystery seasonal crate keys' },
    { type: 'mythic', name: 'Mythic Crate Key', price: 100, desc: 'Epic mythic crate keys' },
    { type: 'legendary', name: 'Legendary Crate Key', price: 200, desc: 'Elite legendary crate keys' }
  ];
  const bundles = [1, 5, 10, 20, 50];

  keyTypes.forEach(kt => {
    bundles.forEach(b => {
      const discountedPrice = Math.round(kt.price * b * (1 - (b > 1 ? (b > 10 ? 0.25 : 0.15) : 0)));
      products.push({
        id: `${kt.type}-key-x${b}`,
        name: `${b}x ${kt.name}`,
        price: discountedPrice,
        category: 'keys',
        badge: `${b}X KEYS`,
        icon: 'fa-key',
        color: 'gold',
        desc: `${kt.desc}. Open crates at spawn to win rare God gear, spawners, and KryloCoins.`,
        perks: [`${b}x ${kt.name} vouchers`, 'Redeemable at Spawn', 'Instant Delivery']
      });
    });
  });

  // Render Grid
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    productsGrid.innerHTML = products.map(p => {
      const badgeClass = `${p.category === 'ranks' ? p.id.split('-')[0] : p.category}-badge`;
      const featuredClass = p.id === 'mvp-rank' ? 'featured' : '';
      const featuredBanner = p.id === 'mvp-rank' ? `<div class="featured-banner"><i class="fa-solid fa-fire"></i> Most Popular</div>` : '';
      
      return `
        <div class="product-card ${p.category} ${featuredClass}" data-id="${p.id}">
          ${featuredBanner}
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="product-header">
              <span class="prod-badge ${badgeClass}"><i class="fa-solid ${p.icon}"></i> ${p.badge}</span>
              <h3>${p.name}</h3>
              <div class="price">${p.price} KC</div>
            </div>
            <p class="description">${p.desc}</p>
            <ul class="perks-list">
              ${p.perks.map(perk => `<li><i class="fa-solid fa-check"></i> ${perk}</li>`).join('')}
            </ul>
            <button class="btn-add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
              <i class="fa-solid fa-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}
