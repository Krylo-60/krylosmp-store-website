import os

path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\store-site\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Remove currency-toggle HTML
old_toggle_html = """        <div class="currency-toggle" title="Season 1: KryloCoins (KC) • Season 2: USD ($)">
          <button class="curr-btn active" id="btnCurrKc" onclick="setCurrency('KC')">🪙 Season 1: KC</button>
          <button class="curr-btn" id="btnCurrUsd" onclick="setCurrency('USD')" style="opacity: 0.7;">💵 Season 2: $</button>
        </div>"""
c = c.replace(old_toggle_html, "")

# 2. Update Hero Badge & Description
old_hero_badge = '<div class="store-badge"><i class="fa-solid fa-coins"></i> Season 1: 100% Free Play-to-Earn (KC) • Season 2: Real Money ($ USD)</div>'
new_hero_badge = '<div class="store-badge"><i class="fa-solid fa-bolt"></i> 100% Free Play-to-Earn KryloCoins (KC) Shop</div>'
c = c.replace(old_hero_badge, new_hero_badge)

old_hero_desc = '<p class="store-hero-desc">\n        <strong>Season 1 is 100% Play-to-Earn!</strong> Earn KryloCoins (KC) by mining in BoxPvP, winning 1v1 duels, and completing daily quests to unlock ranks, mythic crate keys, and perks! <em>(Real-money checkout arriving in Season 2)</em>.\n      </p>'
new_hero_desc = '<p class="store-hero-desc">\n        <strong>100% Free Play-to-Earn!</strong> Earn KryloCoins (KC) by mining in BoxPvP, winning 1v1 duels, and completing daily quests to unlock ranks, mythic crate keys, and kits!\n      </p>'
c = c.replace(old_hero_desc, new_hero_desc)

# 3. Clean renderStore & openCheckout to be pure KC
old_render = """    function setCurrency(curr) {
      currentCurrency = curr;
      document.getElementById('btnCurrKc').classList.toggle('active', curr === 'KC');
      document.getElementById('btnCurrUsd').classList.toggle('active', curr === 'USD');
      renderStore();
    }

    function renderStore() {
      const grid = document.getElementById('storeGrid');
      const items = currentStoreCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentStoreCat);
      
      grid.innerHTML = items.map(p => {
        const priceStr = currentCurrency === 'KC' ? `${p.priceKc.toLocaleString()} KC` : `$${p.priceUsd.toFixed(2)} USD`;
        const subLbl = currentCurrency === 'KC' ? 'Free In-Game Earned' : 'Instant Checkout';

        return `
          <div class="product-card">
            ${p.badge ? `<span class="p-badge ${p.badge}">${p.badge}</span>` : ''}
            <div>
              <div class="p-icon-wrap">${p.icon}</div>
              <h3 class="p-title">${p.name}</h3>
              <span class="p-tag">${p.tag}</span>
              <p class="p-desc">${p.desc}</p>
              <ul class="p-perks">
                ${p.perks.map(perk => `<li><i class="fa-solid fa-check"></i> ${perk}</li>`).join('')}
              </ul>
            </div>
            <div class="p-footer">
              <div>
                <div class="p-price-val">${priceStr}</div>
                <div class="p-price-lbl">${subLbl}</div>
              </div>
              <button class="btn-unlock" onclick="openCheckout('${p.id}')">
                <i class="fa-solid fa-bolt"></i> Unlock
              </button>
            </div>
          </div>
        `;
      }).join('');
    }"""

new_render = """    function renderStore() {
      const grid = document.getElementById('storeGrid');
      const items = currentStoreCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentStoreCat);
      
      grid.innerHTML = items.map(p => `
        <div class="product-card">
          ${p.badge ? `<span class="p-badge ${p.badge}">${p.badge}</span>` : ''}
          <div>
            <div class="p-icon-wrap">${p.icon}</div>
            <h3 class="p-title">${p.name}</h3>
            <span class="p-tag">${p.tag}</span>
            <p class="p-desc">${p.desc}</p>
            <ul class="p-perks">
              ${p.perks.map(perk => `<li><i class="fa-solid fa-check"></i> ${perk}</li>`).join('')}
            </ul>
          </div>
          <div class="p-footer">
            <div>
              <div class="p-price-val">${p.priceKc.toLocaleString()} KC</div>
              <div class="p-price-lbl">Free In-Game Earned</div>
            </div>
            <button class="btn-unlock" onclick="openCheckout('${p.id}')">
              <i class="fa-solid fa-bolt"></i> Unlock
            </button>
          </div>
        </div>
      `).join('');
    }"""
c = c.replace(old_render, new_render)

old_open_checkout = """      const priceStr = currentCurrency === 'KC' ? `${selectedProduct.priceKc.toLocaleString()} KC` : `$${selectedProduct.priceUsd.toFixed(2)} USD`;
      document.getElementById('mPrice').innerText = priceStr;"""
new_open_checkout = """      document.getElementById('mPrice').innerText = selectedProduct.priceKc.toLocaleString() + ' KC';"""
c = c.replace(old_open_checkout, new_open_checkout)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("[+] Successfully removed all currency previews! Store is now 100% pure KryloCoins (KC)!")
