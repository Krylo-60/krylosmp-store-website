import os

path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\store-site\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update brand link in header
c = c.replace('<a href="https://krylosmp.web.app/" class="brand">', '<a href="https://krylosmp-store.web.app/" class="brand">')

# 2. Fix activePlayerIgn default
c = c.replace("localStorage.getItem('krylo_ign') || 'Krylo'", "'Krylo_MC'")
c = c.replace("localStorage.getItem('krylo_ign') || 'Krylo_MC'", "'Krylo_MC'")

# 3. Update getPlayerBalance & updateUserPill
old_funcs = """    function getPlayerBalance(ign) {
      if (ign.toLowerCase() === 'krylo_mc' || ign.toLowerCase() === 'krylo' || ign.toLowerCase() === 'kryloplays') {
        return '∞ INF';
      }
      if (userBalances[ign.toLowerCase()] !== undefined) {
        return userBalances[ign.toLowerCase()].toLocaleString();
      }
      return '10,000'; // Default 10k Starter Balance
    }

    function updateUserPill() {
      const balStr = getPlayerBalance(activePlayerIgn);
      document.getElementById('navIgnDisplay').innerText = activePlayerIgn + ' (' + balStr + ' KC)';
      document.getElementById('navAvatar').src = 'https://mc-heads.net/avatar/' + activePlayerIgn + '/24';
    }"""

new_funcs = """    function getPlayerBalance(ign) {
      const clean = (ign || '').toLowerCase().trim();
      if (clean === 'krylo_mc' || clean === 'krylo' || clean === 'kryloplays') {
        return '∞ INF';
      }
      if (userBalances[clean] !== undefined) {
        return userBalances[clean].toLocaleString();
      }
      return '10,000'; // Default 10k Starter Balance
    }

    function updateUserPill() {
      const balStr = getPlayerBalance(activePlayerIgn);
      const isOwner = activePlayerIgn.toLowerCase() === 'krylo_mc' || activePlayerIgn.toLowerCase() === 'krylo';
      const badge = isOwner ? '👑 ' : '';
      document.getElementById('navIgnDisplay').innerText = badge + activePlayerIgn + ' (' + balStr + ' KC)';
      document.getElementById('navAvatar').src = 'https://mc-heads.net/avatar/' + encodeURIComponent(activePlayerIgn) + '/24';
    }"""

c = c.replace(old_funcs, new_funcs)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("[✅] Successfully updated store-site for Krylo_MC!")
