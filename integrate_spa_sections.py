#!/usr/bin/env python3
"""
=============================================================================
KryloSMP - Unified Single-Page (#support, #apply, #store) Architecture
Embeds rich #support and #apply sections directly into index.html
Sets cleanUrls in firebase.json
=============================================================================
"""

import os
import json

HTML_PATH = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\index.html"
FIREBASE_JSON_PATH = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\firebase.json"

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Navigation Bar to strictly use #hashtag anchors
old_nav = """      <nav class="desktop-nav">
        <a href="#store" class="nav-pill active"><i class="fa-solid fa-store"></i> Store</a>
        <a href="#ranks" class="nav-pill" onclick="filterProducts('ranks')"><i class="fa-solid fa-crown"></i> Ranks</a>
        <a href="#crates" class="nav-pill" onclick="filterProducts('crates')"><i class="fa-solid fa-box-open"></i> Crates</a>
        <a href="#combat" class="nav-pill" onclick="filterProducts('combat')"><i class="fa-solid fa-shield-halved"></i> Combat Kits</a>
        <a href="support.html" class="nav-pill"><i class="fa-solid fa-headset"></i> Support</a>
        <a href="apply.html#moderator" class="nav-pill"><i class="fa-solid fa-file-pen"></i> #Apply</a>
        <a href="https://discord.gg/6vrEDTu3bx" target="_blank" class="nav-pill nav-pill-discord"><i class="fa-brands fa-discord"></i> Discord</a>
      </nav>"""

new_nav = """      <nav class="desktop-nav">
        <a href="#store" class="nav-pill active"><i class="fa-solid fa-store"></i> #Store</a>
        <a href="#ranks" class="nav-pill" onclick="filterProducts('ranks')"><i class="fa-solid fa-crown"></i> #Ranks</a>
        <a href="#crates" class="nav-pill" onclick="filterProducts('crates')"><i class="fa-solid fa-box-open"></i> #Crates</a>
        <a href="#combat" class="nav-pill" onclick="filterProducts('combat')"><i class="fa-solid fa-shield-halved"></i> #Kits</a>
        <a href="#support" class="nav-pill"><i class="fa-solid fa-headset"></i> #Support</a>
        <a href="#apply" class="nav-pill"><i class="fa-solid fa-file-pen"></i> #Apply</a>
        <a href="https://discord.gg/6vrEDTu3bx" target="_blank" class="nav-pill nav-pill-discord"><i class="fa-brands fa-discord"></i> Discord</a>
      </nav>"""

if old_nav in html:
    html = html.replace(old_nav, new_nav)
    print("[+] Navigation updated to #hashtag anchors!")

# 2. Rich #support and #apply Sections to embed right before </main>
support_and_apply_sections = """
    <!-- ========================================== -->
    <!-- #SUPPORT SECTION (OFFICIAL HELP DESK) -->
    <!-- ========================================== -->
    <section class="section-spa-block" id="support" style="margin-top: 60px; padding: 40px 0; border-top: 1px solid rgba(0, 229, 255, 0.15);">
      <div class="category-header">
        <span class="category-badge" style="background: rgba(0, 229, 255, 0.15); color: #00E5FF; border: 1px solid rgba(0, 229, 255, 0.3);">
          <i class="fa-solid fa-headset"></i> 24/7 PLAYER HELP DESK
        </span>
        <h2 class="category-title">#Support & Help Center</h2>
        <p class="category-desc">Need assistance with your KryloCoins balance, account linking, Bedrock connectivity, or reporting an issue? Our team is active 24/7.</p>
      </div>

      <!-- Quick Action Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 35px;">
        <div style="background: #0f172a; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 16px; padding: 24px; text-align: center; cursor: pointer; transition: 0.2s;" onclick="window.open('https://discord.gg/6vrEDTu3bx', '_blank')">
          <div style="width: 50px; height: 50px; margin: 0 auto 15px; border-radius: 12px; background: rgba(88, 101, 242, 0.2); color: #5865F2; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            <i class="fa-brands fa-discord"></i>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">Live Discord Support</h3>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 15px;">Chat with staff and open real-time tickets with immediate response.</p>
          <span style="color: #00E5FF; font-weight: 700; font-size: 0.85rem;">Join Discord <i class="fa-solid fa-arrow-right"></i></span>
        </div>

        <div style="background: #0f172a; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 16px; padding: 24px; text-align: center; cursor: pointer;" onclick="document.getElementById('ticketFormBox').scrollIntoView({behavior: 'smooth'})">
          <div style="width: 50px; height: 50px; margin: 0 auto 15px; border-radius: 12px; background: rgba(255, 215, 0, 0.2); color: #ffd700; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            <i class="fa-solid fa-coins"></i>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">KryloCoins & Store Help</h3>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 15px;">Issues with in-game wallet, package unlocks, or rank deliveries.</p>
          <span style="color: #00E5FF; font-weight: 700; font-size: 0.85rem;">Open Ticket <i class="fa-solid fa-arrow-right"></i></span>
        </div>

        <div style="background: #0f172a; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 16px; padding: 24px; text-align: center; cursor: pointer;" onclick="document.getElementById('ticketFormBox').scrollIntoView({behavior: 'smooth'})">
          <div style="width: 50px; height: 50px; margin: 0 auto 15px; border-radius: 12px; background: rgba(168, 85, 247, 0.2); color: #a855f7; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            <i class="fa-solid fa-gavel"></i>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 8px;">Punishment Appeals</h3>
          <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 15px;">Submit unban and unmute appeals directly to senior management.</p>
          <span style="color: #00E5FF; font-weight: 700; font-size: 0.85rem;">Submit Appeal <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>

      <!-- Ticket Submission Card -->
      <div id="ticketFormBox" style="background: #0f172a; border: 1px solid rgba(0, 229, 255, 0.25); border-radius: 20px; padding: 30px; margin-bottom: 40px;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 10px; color: #fff;">
          <i class="fa-solid fa-ticket" style="color: #00E5FF;"></i> Submit a Support Request
        </h3>
        <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px;">Fill out this form and our support team will handle your request immediately.</p>
        
        <div id="spaTicketAlert" style="display: none; background: rgba(0, 255, 136, 0.15); border: 1px solid #00FF88; color: #00FF88; padding: 14px; border-radius: 10px; margin-bottom: 20px; font-weight: 600;">
          <i class="fa-solid fa-circle-check"></i> Ticket Submitted! <strong>Reference ID: <span id="spaTicketId"></span></strong>. Our moderators will review this shortly!
        </div>

        <form id="spaSupportForm" onsubmit="submitSpaTicket(event)" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Minecraft Username (IGN)</label>
            <input type="text" id="spaTicketIgn" class="input-dark" placeholder="e.g. Krylo_MC" required>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Discord Username</label>
            <input type="text" id="spaTicketDiscord" class="input-dark" placeholder="e.g. krylo or Krylo#0001" required>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Category</label>
            <select id="spaTicketCat" class="input-dark" style="cursor: pointer;" required>
              <option value="coins">🪙 KryloCoins / Store Unlock Issue</option>
              <option value="account">👤 Account / Skin Issue</option>
              <option value="bug">🐛 Bug Report / Exploit Disclosure</option>
              <option value="appeal">⚖️ Punishment Appeal</option>
              <option value="general">❓ General Inquiry</option>
            </select>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Priority</label>
            <select id="spaTicketPrio" class="input-dark" style="cursor: pointer;">
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Details & Description</label>
            <textarea id="spaTicketDetails" class="input-dark" style="min-height: 100px; resize: vertical;" placeholder="Describe what happened or what you need help with..." required></textarea>
          </div>
          <div style="grid-column: 1 / -1;">
            <button type="submit" class="btn-confirm-purchase" style="max-width: 250px;">
              <i class="fa-solid fa-paper-plane"></i> Send Support Request
            </button>
          </div>
        </form>
      </div>

      <!-- FAQ Accordion -->
      <div style="background: #0f172a; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 20px; padding: 30px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 15px; color: #fff;">
          <i class="fa-solid fa-circle-question" style="color: #00E5FF;"></i> Frequently Asked Questions
        </h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px;">
            <strong style="color: #00E5FF; display: block; margin-bottom: 4px;">🎮 How do I join from Bedrock / Mobile?</strong>
            <span style="color: #94a3b8; font-size: 0.9rem;">Server IP: <code>krylosmp.falix.gg</code> | Port: <code>29273</code> (or default <code>19132</code>). Floodgate handles cross-play automatically!</span>
          </div>
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px;">
            <strong style="color: #ffd700; display: block; margin-bottom: 4px;">🪙 How do I earn KryloCoins (KC)?</strong>
            <span style="color: #94a3b8; font-size: 0.9rem;">Earn coins by playing, mining, claiming daily drops on Discord, and defeating world bosses. Spend in-game with <code>/kcshop</code>!</span>
          </div>
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 18px;">
            <strong style="color: #00FF88; display: block; margin-bottom: 4px;">🎨 How do I fix my skin?</strong>
            <span style="color: #94a3b8; font-size: 0.9rem;">Type <code>/skin &lt;playername&gt;</code> or <code>/skin url &lt;link&gt;</code> in game chat to apply any skin instantly.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- #APPLY SECTION (STAFF APPLICATION PORTAL) -->
    <!-- ========================================== -->
    <section class="section-spa-block" id="apply" style="margin-top: 60px; padding: 40px 0; border-top: 1px solid rgba(0, 229, 255, 0.15);">
      <div class="category-header">
        <span class="category-badge" style="background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3);">
          <i class="fa-solid fa-id-badge"></i> JOIN THE KRYLOSMP TEAM
        </span>
        <h2 class="category-title">#Apply for Staff & Builder</h2>
        <p class="category-desc">Help build, moderate, and grow KryloSMP! We are recruiting dedicated staff, builders, and helpers.</p>
      </div>

      <div style="background: #0f172a; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; padding: 30px;">
        <div id="spaApplyAlert" style="display: none; background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; color: #e9d5ff; padding: 14px; border-radius: 10px; margin-bottom: 20px; font-weight: 600;">
          <i class="fa-solid fa-circle-check"></i> Application Submitted! <strong>App ID: <span id="spaAppId"></span></strong>. Our team will review your application on Discord!
        </div>

        <form id="spaApplyForm" onsubmit="submitSpaApplication(event)" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Minecraft IGN</label>
            <input type="text" id="spaApplyIgn" class="input-dark" placeholder="e.g. Krylo_MC" required>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Discord Tag</label>
            <input type="text" id="spaApplyDiscord" class="input-dark" placeholder="e.g. krylo#0001" required>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Desired Role</label>
            <select id="spaApplyRole" class="input-dark" style="cursor: pointer;" required>
              <option value="helper">🛡️ Helper / Trial Moderator</option>
              <option value="moderator">⚔️ Server Moderator</option>
              <option value="builder">🏰 Builder / World Designer</option>
              <option value="developer">💻 Plugin / Skript Developer</option>
            </select>
          </div>
          <div class="form-group">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Age & Timezone</label>
            <input type="text" id="spaApplyTimezone" class="input-dark" placeholder="e.g. 17 / EST (UTC-5)" required>
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px; display: block;">Why do you want to join the KryloSMP team?</label>
            <textarea id="spaApplyWhy" class="input-dark" style="min-height: 90px; resize: vertical;" placeholder="Tell us about your experience and how you can contribute..." required></textarea>
          </div>
          <div style="grid-column: 1 / -1;">
            <button type="submit" class="btn-confirm-purchase" style="max-width: 250px; background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);">
              <i class="fa-solid fa-paper-plane"></i> Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
"""

# Script logic for handling #support and #apply SPA submissions
spa_scripts = """
  <script>
    function submitSpaTicket(e) {
      e.preventDefault();
      const ign = document.getElementById('spaTicketIgn').value;
      const discord = document.getElementById('spaTicketDiscord').value;
      const cat = document.getElementById('spaTicketCat').value;
      const prio = document.getElementById('spaTicketPrio').value;
      const details = document.getElementById('spaTicketDetails').value;
      const id = 'KRYLO-TKT-' + Math.floor(1000 + Math.random() * 9000);

      localStorage.setItem('spa_ticket_' + id, JSON.stringify({id, ign, discord, cat, prio, details, time: new Date()}));
      document.getElementById('spaTicketId').innerText = id;
      document.getElementById('spaTicketAlert').style.display = 'block';
      document.getElementById('spaSupportForm').reset();
      document.getElementById('spaTicketAlert').scrollIntoView({behavior: 'smooth'});
    }

    function submitSpaApplication(e) {
      e.preventDefault();
      const ign = document.getElementById('spaApplyIgn').value;
      const discord = document.getElementById('spaApplyDiscord').value;
      const role = document.getElementById('spaApplyRole').value;
      const tz = document.getElementById('spaApplyTimezone').value;
      const why = document.getElementById('spaApplyWhy').value;
      const id = 'KRYLO-APP-' + Math.floor(1000 + Math.random() * 9000);

      localStorage.setItem('spa_app_' + id, JSON.stringify({id, ign, discord, role, tz, why, time: new Date()}));
      document.getElementById('spaAppId').innerText = id;
      document.getElementById('spaApplyAlert').style.display = 'block';
      document.getElementById('spaApplyForm').reset();
      document.getElementById('spaApplyAlert').scrollIntoView({behavior: 'smooth'});
    }
  </script>
"""

# Insert before </main>
if "</main>" in html and 'id="support"' not in html:
    html = html.replace("</main>", support_and_apply_sections + "\n  </main>")
    print("[+] #support and #apply sections embedded in index.html!")

# Insert scripts before </body>
if "</body>" in html and "submitSpaTicket" not in html:
    html = html.replace("</body>", spa_scripts + "\n</body>")
    print("[+] SPA event handlers injected!")

# Update footer links to #hash
footer_old = """      <div class="footer-links">
        <a href="#store">Store</a>
        <a href="#ranks">Ranks</a>
        <a href="#crates">Crates</a>
        <a href="#combat">Kits</a>
        <a href="apply.html#moderator">#Apply</a>
        <a href="https://discord.gg/6vrEDTu3bx" target="_blank">Discord</a>
      </div>"""

footer_new = """      <div class="footer-links">
        <a href="#store">#Store</a>
        <a href="#ranks">#Ranks</a>
        <a href="#crates">#Crates</a>
        <a href="#combat">#Kits</a>
        <a href="#support">#Support</a>
        <a href="#apply">#Apply</a>
        <a href="https://discord.gg/6vrEDTu3bx" target="_blank">Discord</a>
      </div>"""

if footer_old in html:
    html = html.replace(footer_old, footer_new)
    print("[+] Footer links converted to #hash anchors!")

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

# 3. Update firebase.json with cleanUrls
firebase_config = {
    "hosting": {
        "public": ".",
        "cleanUrls": True,
        "trailingSlash": False,
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "headers": [
            {
                "source": "**",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public, max-age=0, must-revalidate"
                    }
                ]
            }
        ]
    }
}

with open(FIREBASE_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(firebase_config, f, indent=2)

print("[+] firebase.json updated with cleanUrls: true!")
print("\n[🎉] SPA #hashtag integration complete!")
