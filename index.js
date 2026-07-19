// Store State Management
const state = {
  mcUsername: '',
  cart: [],
  products: [
    { id: 'vip-rank', name: 'VIP Rank', price: 500 },
    { id: 'mvp-rank', name: 'MVP Rank', price: 1000 },
    { id: 'legend-rank', name: 'Krylo Legend Rank', price: 2500 },
    { id: 'crate-keys', name: '5x Crate Keys', price: 300 },
    { id: 'velocity-aura', name: 'Neon Velocity Aura', price: 200 }
  ]
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
  
  // Add to cart buttons
  btnAddToCartList.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToCart(id, name, price);
    });
  });

  // Checkout submit
  btnCheckout.addEventListener('click', processCheckout);
  btnCloseModal.addEventListener('click', () => successModal.classList.remove('open'));

  // Account modal toggles
  btnLoginHeader.addEventListener('click', openLoginModal);
  btnCloseAccountModal.addEventListener('click', () => accountModal.classList.remove('open'));
  btnRequestRegCode.addEventListener('click', handleRequestCode);
  btnConfirmRegCode.addEventListener('click', handleConfirmCode);

  // Interactive mouse move glow effect for premium product cards
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
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
  productCards.forEach(card => {
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
    cartSubtotal.textContent = '0 KC';
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

  cartSubtotal.textContent = `${subtotal} KC`;

  // Enable/disable checkout based on username bind status
  if (state.mcUsername) {
    btnCheckout.disabled = false;
    btnCheckout.innerHTML = `<i class="fa-solid fa-credit-card"></i> Pay ${subtotal} KC`;
  } else {
    btnCheckout.disabled = true;
    btnCheckout.innerHTML = `<i class="fa-solid fa-user-tag"></i> Bind Username to Checkout`;
  }
}

// Expose remove function to global scope for onclick handler
window.removeFromCart = removeFromCart;

// Checkout Process Simulation
async function processCheckout() {
  if (!state.mcUsername || state.cart.length === 0) return;

  btnCheckout.disabled = true;
  btnCheckout.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;

  // Simulate payment processing / webhook dispatch
  setTimeout(() => {
    // Show success modal
    successUserDisplay.textContent = state.mcUsername;
    successModal.classList.add('open');
    
    // Clear cart and update
    state.cart = [];
    updateCartUI();
    cartSidebar.classList.remove('open');
  }, 1500);
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
      
      // Update balance if economyData exists
      if (configData.economyData && configData.economyData[username]) {
        const balance = configData.economyData[username].balance || 0;
        document.getElementById('profileRank').innerHTML = `${rank} • <b style="color: var(--accent-gold);">${balance} KC</b>`;
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
