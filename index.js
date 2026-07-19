// Store State Management
const state = {
  mcUsername: '',
  cart: [],
  discountPercentage: 0,
  appliedPromoCode: '',
  products: []
};

// DOM Elements
const mcUsernameInput = document.getElementById('mcUsernameInput');
const btnStartShopping = document.getElementById('btnStartShopping');
const tabButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');
const btnAddToCartList = document.querySelectorAll('.btn-add-to-cart');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartSidebar = document.getElementById('cartSidebar');
const btnCloseCart = document.getElementById('btnCloseCart');
const cartUsernameDisplay = document.getElementById('cartUsernameDisplay');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCount = document.getElementById('cartCount');
const btnCheckout = document.getElementById('btnCheckout');
const successModal = document.getElementById('successModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const successUserDisplay = document.getElementById('successUserDisplay');
const playerCounter = document.querySelector('.player-count');
const btnBuyAll = document.getElementById('btnBuyAll');

// Promo Code & Tax Elements
const promoCodeInput = document.getElementById('promoCodeInput');
const btnApplyPromo = document.getElementById('btnApplyPromo');
const promoStatusMsg = document.getElementById('promoStatusMsg');
const lblSubtotal = document.getElementById('lblSubtotal');
const lblDiscount = document.getElementById('lblDiscount');
const lblTax = document.getElementById('lblTax');

// Login / Register Elements
const btnLoginHeader = document.getElementById('btnLoginHeader');
const userProfileHeader = document.getElementById('userProfileHeader');
const accountModal = document.getElementById('accountModal');
const btnCloseAccountModal = document.getElementById('btnCloseAccountModal');
const modalStep1 = document.getElementById('modalStep1');
const modalStep2 = document.getElementById('modalStep2');
const regMcUsername = document.getElementById('regMcUsername');
const regDiscordId = document.getElementById('regDiscordId');
const btnRequestRegCode = document.getElementById('btnRequestRegCode');
const regCodeInput = document.getElementById('regCodeInput');
const btnConfirmRegCode = document.getElementById('btnConfirmRegCode');

// Initialize Store
document.addEventListener('DOMContentLoaded', () => {
  generateAndRenderProducts();
  setupEventListeners();
  updatePlayerCounter();
  checkActiveSession();
  setInterval(updatePlayerCounter, 30000); // Update status every 30s
});

// Event Listeners Configuration
function setupEventListeners() {
  // Username bind flow
  btnStartShopping.addEventListener('click', bindUsername);
  mcUsernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') bindUsername();
  });

  // Tab filtering
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCategory(btn.getAttribute('data-category'));
    });
  });

  // Cart actions
  cartToggleBtn.addEventListener('click', () => cartSidebar.classList.toggle('open'));
  btnCloseCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
  
  // Add to cart buttons (Event Delegation for dynamic products)
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-cart');
    if (btn) {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToCart(id, name, price);
    }
  });

  // Checkout submit
  btnCheckout.addEventListener('click', processCheckout);
  btnCloseModal.addEventListener('click', () => successModal.classList.remove('open'));

  // Account modal toggles
  btnLoginHeader.addEventListener('click', openLoginModal);
  btnCloseAccountModal.addEventListener('click', () => accountModal.classList.remove('open'));
  btnRequestRegCode.addEventListener('click', handleRequestCode);
  btnConfirmRegCode.addEventListener('click', handleConfirmCode);

  // Promo code button
  btnApplyPromo.addEventListener('click', handleApplyPromo);

  // Buy All Bundle Button click handler
  if (btnBuyAll) {
    btnBuyAll.addEventListener('click', () => {
      addToCart('krylo-ultimate-bundle', 'Krylo Ultimate Bundle (Buy All)', 226983);
      cartSidebar.classList.add('open');
    });
  }

  // Interactive mouse move glow effect for dynamic product cards (Event Delegation)
  productsGrid.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  });
}

// Fetch Minecraft Server Status dynamically
async function updatePlayerCounter() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/3/KryloSmp.play.hosting');
    const data = await res.json();
    if (data.online) {
      playerCounter.innerHTML = `<b style="color: var(--accent-green);">${data.players.online}/${data.players.max}</b> Online`;
    } else {
      playerCounter.innerHTML = `<span style="color: #ff3333;">Offline</span>`;
    }
  } catch {
    playerCounter.innerHTML = `<b style="color: var(--accent-green);">12/50</b> Online`;
  }
}

// Bind Username
function bindUsername() {
  const username = mcUsernameInput.value.trim();
  if (username) {
    state.mcUsername = username;
    
    // Update Cart Username Label
    cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> Linked: <b>${username}</b>`;
    cartUsernameDisplay.style.color = 'var(--accent-green)';
    
    // Smooth transition message to user
    const originalBtnText = btnStartShopping.innerHTML;
    btnStartShopping.innerHTML = `<i class="fa-solid fa-check"></i> Linked!`;
    btnStartShopping.style.background = 'linear-gradient(135deg, var(--accent-green) 0%, #00aa44 100%)';
    btnStartShopping.style.color = '#000';
    
    setTimeout(() => {
      btnStartShopping.innerHTML = originalBtnText;
      btnStartShopping.style.background = '';
      btnStartShopping.style.color = '';
    }, 2000);

    // Scroll smoothly to shop section
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    
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

// Add Item to Cart
function addToCart(id, name, price) {
  state.cart.push({ id, name, price, uid: Date.now() });
  
  // Shake cart button micro-animation
  cartToggleBtn.style.animation = 'pulse 0.4s infinite';
  setTimeout(() => cartToggleBtn.style.animation = '', 400);

  updateCartUI();
  cartSidebar.classList.add('open');
}

// Remove Item from Cart
function removeFromCart(uid) {
  state.cart = state.cart.filter(item => item.uid !== uid);
  updateCartUI();
}

// Update Cart Sidebar UI elements
function updateCartUI() {
  cartCount.textContent = state.cart.length;
  
  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-cart-msg">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.</p>
        <span>Add ranks or items to get started!</span>
      </div>
    `;
    if (lblSubtotal) lblSubtotal.textContent = '0 KC';
    if (lblDiscount) lblDiscount.textContent = '0 KC';
    if (lblTax) lblTax.textContent = '0 KC';
    if (cartSubtotal) cartSubtotal.textContent = '0 KC';
    btnCheckout.disabled = true;
    btnCheckout.innerHTML = `<i class="fa-solid fa-lock"></i> Checkout`;
    return;
  }

  // Render items
  cartItemsList.innerHTML = '';
  let subtotal = 0;
  
  state.cart.forEach(item => {
    subtotal += item.price;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <span class="cart-item-price">${item.price} KC</span>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.uid})">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    cartItemsList.appendChild(row);
  });

  // Apply discount and 3% game tax
  const discountAmount = Math.round(subtotal * (state.discountPercentage / 100));
  const discountedSubtotal = subtotal - discountAmount;
  const taxAmount = Math.round(discountedSubtotal * 0.03);
  const finalTotal = Math.max(0, Math.round(discountedSubtotal + taxAmount));

  if (lblSubtotal) lblSubtotal.textContent = `${subtotal} KC`;
  if (lblDiscount) lblDiscount.textContent = `-${discountAmount} KC`;
  if (lblTax) lblTax.textContent = `+${taxAmount} KC`;
  if (cartSubtotal) cartSubtotal.textContent = `${finalTotal} KC`;

  // Enable/disable checkout based on username bind status
  if (state.mcUsername) {
    btnCheckout.disabled = false;
    btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
  } else {
    btnCheckout.disabled = true;
    btnCheckout.innerHTML = `<i class="fa-solid fa-user-tag"></i> Bind Username to Checkout`;
  }
}

// Apply Promo / Creator Code (20% Discount support)
function handleApplyPromo() {
  const code = promoCodeInput.value.trim().toUpperCase();

  if (!code) {
    state.discountPercentage = 0;
    state.appliedPromoCode = '';
    promoStatusMsg.style.display = 'none';
    updateCartUI();
    return;
  }

  // List of valid 20% discount codes
  const activeCodes = ['KRYLO', 'KRYLOSMP', 'KRISHIV', 'WELCOMESMP'];

  if (activeCodes.includes(code)) {
    state.discountPercentage = 20;
    state.appliedPromoCode = code;
    promoStatusMsg.textContent = `✅ Code '${code}' Applied: 20% OFF!`;
    promoStatusMsg.style.color = 'var(--accent-green)';
    promoStatusMsg.style.display = 'block';
  } else {
    state.discountPercentage = 0;
    state.appliedPromoCode = '';
    promoStatusMsg.textContent = `❌ Invalid or expired code!`;
    promoStatusMsg.style.color = '#ff3333';
    promoStatusMsg.style.display = 'block';
  }

  updateCartUI();
}

window.handleApplyPromo = handleApplyPromo;

// Expose remove function to global scope for onclick handler
window.removeFromCart = removeFromCart;

// Checkout Process Simulation & Economy Check
async function processCheckout() {
  if (!state.mcUsername || state.cart.length === 0) return;

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = subtotal * (state.discountPercentage / 100);
  const finalTotal = Math.max(0, Math.round(subtotal - discountAmount));
  const username = state.mcUsername;

  btnCheckout.disabled = true;
  btnCheckout.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Checkout...`;

  try {
    const res = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'checkout',
        guildId: '1524878881918685405',
        username: username,
        discordUserId: localStorage.getItem('mc_discord_id'),
        cart: state.cart.map(item => item.id),
        promoCode: state.appliedPromoCode
      })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      // Update local profile widget with new balance
      const profileRankElem = document.getElementById('profileRank');
      if (profileRankElem) {
        profileRankElem.innerHTML = `Member • <b style="color: var(--accent-gold);">${data.newBalance} KC</b>`;
      }
      
      // Show success modal & clean cart
      setTimeout(() => {
        successUserDisplay.textContent = username;
        successModal.classList.add('open');
        
        state.cart = [];
        state.discountPercentage = 0;
        state.appliedPromoCode = '';
        if (promoCodeInput) promoCodeInput.value = '';
        if (promoStatusMsg) promoStatusMsg.style.display = 'none';
        
        updateCartUI();
        cartSidebar.classList.remove('open');
      }, 1000);
    } else {
      alert(`Error: ${data.error || 'Failed to complete transaction'}`);
      btnCheckout.disabled = false;
      btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
    }
  } catch (err) {
    console.error("Checkout failed:", err.message);
    alert(`Checkout error: ${err.message}`);
    btnCheckout.disabled = false;
    btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${finalTotal} KC`;
  }
}

// Check Active Session
function checkActiveSession() {
  const user = localStorage.getItem('mc_user');
  const discordId = localStorage.getItem('mc_discord_id');
  if (user && discordId) {
    logInUser(user, discordId);
  }
}

// Open Login Modal
function openLoginModal() {
  // Reset steps
  modalStep1.style.display = 'block';
  modalStep2.style.display = 'none';
  regMcUsername.value = '';
  regDiscordId.value = '';
  regCodeInput.value = '';
  accountModal.classList.add('open');
}

// Handle Request Code (Step 1)
async function handleRequestCode() {
  const mcUsername = regMcUsername.value.trim();
  const discordId = regDiscordId.value.trim();

  if (!mcUsername || !discordId) {
    alert("Please fill in both fields!");
    return;
  }

  btnRequestRegCode.disabled = true;
  btnRequestRegCode.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Checking Database...`;

  try {
    // Check if the user is already verified on Discord!
    const configRes = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_config', guildId: '1524878881918685405' })
    });

    if (configRes.ok) {
      const configData = await configRes.json();
      if (configData.verifiedPlayers && configData.verifiedPlayers[discordId]) {
        const linkedName = configData.verifiedPlayers[discordId].name;
        if (linkedName.toLowerCase() === mcUsername.toLowerCase()) {
          console.log("[Store] Player is already verified on Discord. Logging in instantly!");
          logInUser(linkedName, discordId);
          accountModal.classList.remove('open');
          btnRequestRegCode.disabled = false;
          btnRequestRegCode.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
          return;
        }
      }
    }

    // If not verified, request a verification code
    console.log("[Store] Requesting in-game verification code from API...");
    const verifyRes = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'request_verification',
        guildId: '1524878881918685405',
        name: mcUsername,
        discordUserId: discordId
      })
    });

    if (verifyRes.ok) {
      const data = await verifyRes.json();
      if (data.ok) {
        // Go to Step 2
        state.tempMcUsername = mcUsername;
        state.tempDiscordId = discordId;
        modalStep1.style.display = 'none';
        modalStep2.style.display = 'block';
      } else {
        alert(`Failed: ${data.error || 'Server error'}`);
      }
    } else {
      alert("Failed to connect to verification server.");
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  } finally {
    btnRequestRegCode.disabled = false;
    btnRequestRegCode.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
  }
}

// Handle Confirm Code (Step 2)
async function handleConfirmCode() {
  const code = regCodeInput.value.trim();
  if (!code) {
    alert("Please enter the verification code!");
    return;
  }

  btnConfirmRegCode.disabled = true;
  btnConfirmRegCode.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying...`;

  try {
    const res = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'confirm_verification',
        guildId: '1524878881918685405',
        code: code,
        discordUserId: state.tempDiscordId
      })
    });

    if (res.ok) {
      const result = await res.json();
      if (result.ok) {
        logInUser(state.tempMcUsername, state.tempDiscordId);
        accountModal.classList.remove('open');
      } else {
        alert(`Verification failed: ${result.error || 'Invalid or expired code.'}`);
      }
    } else {
      alert("Failed to connect to verification server.");
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  } finally {
    btnConfirmRegCode.disabled = false;
    btnConfirmRegCode.innerHTML = `Verify & Log In`;
  }
}

// Log In User
async function logInUser(username, discordId) {
  localStorage.setItem('mc_user', username);
  localStorage.setItem('mc_discord_id', discordId);
  
  state.mcUsername = username;
  mcUsernameInput.value = username;

  // Render profile widget in header
  const avatarUrl = `https://mc-heads.net/avatar/${username}`;
  
  // Default Rank
  let rank = 'Member';
  
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

  // Update Cart UI for linked status
  cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> Linked: <b>${username}</b>`;
  cartUsernameDisplay.style.color = 'var(--accent-green)';

  updateCartUI();

  // Dynamically fetch actual user rank & economy details from Vercel config
  try {
    const configRes = await fetch('https://krims-code-chatbot.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_config', guildId: '1524878881918685405' })
    });
    if (configRes.ok) {
      const configData = await configRes.json();
      
      // Resolve Rank from verifiedPlayers entry
      if (configData.verifiedPlayers && configData.verifiedPlayers[discordId]) {
        rank = configData.verifiedPlayers[discordId].rank || 'Member';
      }

      // Update balance if economyData exists
      let balanceStr = '0 KC';
      if (configData.economyData && configData.economyData[username]) {
        const balance = configData.economyData[username].balance || 0;
        balanceStr = `${balance} KC`;
      }
      
      const profileRankElem = document.getElementById('profileRank');
      if (profileRankElem) {
        profileRankElem.innerHTML = `${rank} • <b style="color: var(--accent-gold);">${balanceStr}</b>`;
      }
    }
  } catch (err) {
    console.warn("Failed to retrieve profile rank/economy details:", err.message);
  }
}

// Log Out User
function logOutUser() {
  localStorage.removeItem('mc_user');
  localStorage.removeItem('mc_discord_id');
  
  state.mcUsername = '';
  mcUsernameInput.value = '';

  userProfileHeader.innerHTML = `
    <button class="btn-login-header" id="btnLoginHeader" onclick="openLoginModal()"><i class="fa-solid fa-user-lock"></i> Register / Login</button>
  `;

  cartUsernameDisplay.innerHTML = `<i class="fa-solid fa-user"></i> <span>Not bound</span>`;
  cartUsernameDisplay.style.color = '';

  updateCartUI();
}

// Bind to window for onclick handlers
window.logOutUser = logOutUser;
window.openLoginModal = openLoginModal;

// Programmatic Product Generator (100+ Products)
function generateAndRenderProducts() {
  const products = [];

  // 1. RANKS (10 unique ranks)
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
    { id: 'antigravity-rank', name: 'Antigravity Rank', badge: 'ANTIGRAVITY', icon: 'fa-rocket', color: 'pink', price: 100000, desc: 'The supreme rank of KryloSMP. Includes custom neon pink prefix, toggleable creative mode in base claim, and staff bypass permissions.' }
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

  // Add Supreme Buy All Bundle (16% off + 5% game tax built-in)
  products.push({
    id: 'krylo-ultimate-bundle',
    name: 'Krylo Ultimate Bundle (Buy All)',
    price: 226983,
    category: 'ranks',
    badge: 'ALL BUNDLE',
    icon: 'fa-cubes-stacked',
    color: 'gold',
    desc: 'Unlocks ALL 100 ranks, crate keys, cosmetics, and chat tags instantly. Includes a 16% bundle discount and a 5% game tax.',
    perks: ['All 10 Ranks (VIP to Antigravity)', 'All 15 Key bundles & cosmetics', 'All 50 custom chat suffix tags']
  });

  // 2. CRATE KEYS (15 products of various bundles)
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
        name: `${b}x ${kt.name}s`,
        price: discountedPrice,
        category: 'keys',
        badge: 'KEYS',
        icon: 'fa-key',
        color: 'cyan',
        desc: `Open mystery ${kt.type} loot crates at spawn to win rare weapons and spawners. Bundle of ${b}.`,
        perks: [`Contains ${b}x keys`, 'Chance to win epic items', 'Instant delivery']
      });
    });
  });

  // 3. COSMETICS (trails & auras - 25 items)
  const trails = [
    'Fire', 'Frost', 'Rainbow', 'Emerald', 'Quartz', 'Amethyst', 'Redstone', 'Diamond', 
    'Ender', 'Slime', 'Gold', 'Portal', 'Hearts', 'Smoke', 'Bubble', 'Notes', 'Crit', 'Spark'
  ];
  trails.forEach(t => {
    products.push({
      id: `${t.toLowerCase()}-trail`,
      name: `${t} Particle Trail`,
      price: 250,
      category: 'cosmetics',
      badge: 'TRAIL',
      icon: 'fa-sparkles',
      color: 'pink',
      desc: `Leaves a glowing trail of ${t.toLowerCase()} particles behind you as you walk, run, or fly.`,
      perks: ['Equip via `/aura` command', 'Fully togglable in-game', 'Cosmetic only']
    });
  });

  const auras = ['Nebula', 'Supernova', 'Void', 'Horizon', 'Eclipse', 'Vortex', 'Aurora'];
  auras.forEach(a => {
    products.push({
      id: `${a.toLowerCase()}-aura`,
      name: `${a} Orbiting Aura`,
      price: 500,
      category: 'cosmetics',
      badge: 'AURA',
      icon: 'fa-wand-magic-sparkles',
      color: 'pink',
      desc: `Glowing ${a.toLowerCase()} particles orbit around your character dynamically as you play.`,
      perks: ['Orbiting visual effect', 'Equip via `/aura` command', 'Cosmetic only']
    });
  });

  // 4. CHAT TAGS / SUFFIXES (50 products)
  const tags = [
    'Rich', 'SWEAT', 'Tryhard', 'Pro', 'Noob', 'PvP-God', 'Grinder', 'Merchant', 'Builder', 
    'Farmer', 'Slayer', 'Clown', 'Toxic', 'VIP+', 'MVP+', 'Legend+', 'Challenger', 'Gladiator', 
    'Hunter', 'Miner', 'Explorer', 'Smuggler', 'Warlord', 'Sorcerer', 'Healer', 'Knight', 
    'King', 'Queen', 'Emperor', 'Lord', 'Duke', 'Baron', 'Count', 'Paladin', 'Rogue', 
    'Mage', 'Assassin', 'Ninja', 'Samurai', 'Shogun', 'Sensei', 'Guru', 'Master', 'Elder', 
    'Sage', 'Monk', 'Wizard', 'Warlock', 'Necromancer', 'Alchemist'
  ];

  tags.forEach((t, i) => {
    const isSpecial = i % 5 === 0;
    const price = isSpecial ? 300 : 150;
    products.push({
      id: `tag-${t.toLowerCase()}`,
      name: `Chat Tag: [${t}]`,
      price: price,
      category: 'tags',
      badge: 'TAG',
      icon: 'fa-tags',
      color: isSpecial ? 'gold' : 'green',
      desc: `Unlock the custom suffix tag [${t}] to show off in chat. Can be toggled on or off at any time.`,
      perks: [`Prefix: [${t}]`, 'Unlocks instantly', 'Fully togglable via `/tags`']
    });
  });

  // Render them all dynamically!
  const productsGrid = document.getElementById('productsGrid');
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

  console.log(`[Store Generator] Successfully generated ${products.length} products dynamically!`);
}
