import os

path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\store-site\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update hero badge and description
old_hero_badge = '<div class="store-badge"><i class="fa-solid fa-bolt"></i> 100% Free Play-to-Earn & Direct In-Game Delivery</div>'
new_hero_badge = '<div class="store-badge"><i class="fa-solid fa-coins"></i> Season 1: 100% Free Play-to-Earn (KC) • Season 2: Real Money ($ USD)</div>'
c = c.replace(old_hero_badge, new_hero_badge)

old_hero_desc = '<p class="store-hero-desc">\n        Unlock elite in-game ranks, mythic crate keys, personal XP boosters, and economy vaults using in-game <strong>KryloCoins (KC)</strong> or direct checkout!\n      </p>'
new_hero_desc = '<p class="store-hero-desc">\n        <strong>Season 1 is 100% Play-to-Earn!</strong> Earn KryloCoins (KC) by mining in BoxPvP, winning 1v1 duels, and completing daily quests to unlock ranks, mythic crate keys, and perks! <em>(Real-money checkout arriving in Season 2)</em>.\n      </p>'
c = c.replace(old_hero_desc, new_hero_desc)

# 2. Update currency toggle to show Season 1 KC Active vs Season 2 Coming Soon
old_toggle = """        <div class="currency-toggle">
          <button class="curr-btn active" id="btnCurrKc" onclick="setCurrency('KC')">🪙 KC</button>
          <button class="curr-btn" id="btnCurrUsd" onclick="setCurrency('USD')">💵 USD</button>
        </div>"""

new_toggle = """        <div class="currency-toggle" title="Season 1: KryloCoins (KC) • Season 2: USD ($)">
          <button class="curr-btn active" id="btnCurrKc" onclick="setCurrency('KC')">🪙 Season 1: KC</button>
          <button class="curr-btn" id="btnCurrUsd" onclick="setCurrency('USD')" style="opacity: 0.7;">💵 Season 2: $</button>
        </div>"""
c = c.replace(old_toggle, new_toggle)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("[+] Updated web store for Season 1 KC & Season 2 Money!")
