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

// Initialize Store
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updatePlayerCounter();
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
