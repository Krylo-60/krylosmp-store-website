import os
import re

path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\store-site\index.html"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Remove Goal Box HTML
old_goal_box = """    <!-- Monthly Community Goal Meter (Like FlameSMP & FreshSMP) -->
    <div class="goal-box">
      <div class="goal-header">
        <div class="goal-title"><i class="fa-solid fa-fire"></i> <strong>Monthly Server Goal</strong> (Unlocks 2x XP Weekend & Free Drop Parties!)</div>
        <div style="color: var(--gold); font-family: 'JetBrains Mono', monospace;" id="goalPercentText">84% ($840 / $1,000)</div>
      </div>
      <div class="goal-progress-wrap">
        <div class="goal-progress-bar" id="goalBar"></div>
      </div>
    </div>"""

c = c.replace(old_goal_box, "")

# 2. Update Ticker Events to pure KryloCoins and clean in-game items
old_ticker_js = """    // Live Social Proof Rotating Ticker
    const TICKER_EVENTS = [
      { player: 'FlameGamer99', item: 'MVP+ Rank', time: '2m ago' },
      { player: 'DarkNinja_PvP', item: '5x Godly Crate Keys', time: '5m ago' },
      { player: 'Krylo_MC', item: 'Sovereign Rank [OWNER]', time: '8m ago' },
      { player: 'ShadowCraft', item: 'Netherite God Kit', time: '12m ago' },
      { player: 'VortexBuilder', item: '1,000,000 KryloCoins', time: '17m ago' }
    ];"""

new_ticker_js = """    // Live Social Proof Rotating Ticker (Play-to-Earn KC Unlocks)
    const TICKER_EVENTS = [
      { player: 'FlameGamer99', item: 'MVP+ Rank (18,000 KC)', time: '2m ago' },
      { player: 'DarkNinja_PvP', item: '5x Godly Crate Keys (12,000 KC)', time: '5m ago' },
      { player: 'Krylo_MC', item: 'Sovereign Rank [OWNER]', time: '8m ago' },
      { player: 'ShadowCraft', item: 'Netherite God Kit (9,000 KC)', time: '12m ago' },
      { player: 'VortexBuilder', item: '1,000,000 KryloCoins Vault', time: '17m ago' }
    ];"""

c = c.replace(old_ticker_js, new_ticker_js)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("[+] Removed Monthly Goal Box & refined ticker to clean KC unlocks!")
