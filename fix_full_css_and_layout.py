import os
import sys

# Ensure UTF-8 output on Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

HTML_PATH = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\index.html"

new_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KryloSMP | Official Community Store & Support</title>
  <link rel="icon" href="server-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    :root {
      --bg-dark: #07090e;
      --bg-card: #0d1322;
      --bg-card-hover: #131c31;
      --cyan: #00f3ff;
      --cyan-glow: rgba(0, 243, 255, 0.35);
      --purple: #a855f7;
      --gold: #ffd700;
      --green: #10b981;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(0, 243, 255, 0.15);
      --border-focus: rgba(0, 243, 255, 0.5);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Outfit', sans-serif;
      scroll-behavior: smooth;
    }

    body {
      background: radial-gradient(circle at 50% 0%, #111a2e 0%, var(--bg-dark) 80%);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Top Banner */
    .top-bar {
      background: rgba(0, 243, 255, 0.08);
      border-bottom: 1px solid var(--border);
      padding: 8px 16px;
      font-size: 0.85rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #cbd5e1;
    }

    .top-bar-left strong {
      color: var(--gold);
    }

    .btn-top-discord {
      color: #fff;
      background: #5865F2;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.8rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Header Nav */
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
    }

    .nav-inner {
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .brand-img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid var(--cyan);
      box-shadow: 0 0 12px var(--cyan-glow);
    }

    .brand-text {
      font-family: 'Cinzel', serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 0.5px;
    }

    .brand-text span {
      color: var(--cyan);
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 12px;
      list-style: none;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.9rem;
      padding: 8px 14px;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nav-link:hover, .nav-link.active {
      color: #fff;
      background: rgba(0, 243, 255, 0.12);
      border: 1px solid rgba(0, 243, 255, 0.3);
      box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
    }

    .nav-discord {
      background: linear-gradient(135deg, #5865F2, #4752C4);
      color: #fff !important;
      border: none !important;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ip-badge {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-family: 'JetBrains Mono', monospace;
      color: #6ee7b7;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: 0.2s;
    }

    .ip-badge:hover {
      background: rgba(16, 185, 129, 0.2);
      border-color: var(--green);
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--green);
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #0f172a;
      border: 1px solid var(--border);
      padding: 4px 12px 4px 6px;
      border-radius: 30px;
      cursor: pointer;
    }

    .user-pill img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }

    .user-pill-info {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .user-pill-name {
      font-size: 0.8rem;
      font-weight: 700;
      color: #fff;
    }

    .user-pill-kc {
      font-size: 0.7rem;
      color: var(--gold);
      font-family: 'JetBrains Mono', monospace;
    }

    /* Main Container */
    main {
      max-width: 1300px;
      margin: 0 auto;
      padding: 40px 20px 80px;
    }

    /* Hero Banner */
    .hero-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid var(--border);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      margin-bottom: 50px;
      background: #0d1322;
      min-height: 380px;
      display: flex;
      align-items: center;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.35;
      filter: brightness(0.7);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      padding: 40px;
      max-width: 750px;
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 215, 0, 0.15);
      border: 1px solid rgba(255, 215, 0, 0.3);
      color: var(--gold);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 12px;
      line-height: 1.15;
      background: linear-gradient(135deg, #fff 40%, var(--cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-desc {
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    /* Category Filter Tabs */
    .filter-tabs {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    .tab-btn {
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .tab-btn:hover, .tab-btn.active {
      color: #fff;
      background: rgba(0, 243, 255, 0.15);
      border-color: var(--cyan);
      box-shadow: 0 0 15px rgba(0, 243, 255, 0.25);
    }

    /* Products Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 60px;
    }

    .product-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .product-card:hover {
      background: var(--bg-card-hover);
      border-color: var(--cyan);
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 243, 255, 0.15);
    }

    .product-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
    }

    .product-badge.hot { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .product-badge.popular { background: rgba(0, 243, 255, 0.2); color: var(--cyan); border: 1px solid rgba(0, 243, 255, 0.3); }
    .product-badge.best { background: rgba(255, 215, 0, 0.2); color: var(--gold); border: 1px solid rgba(255, 215, 0, 0.3); }

    .product-icon {
      font-size: 1.8rem;
      margin-bottom: 14px;
    }

    .product-name {
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 8px;
    }

    .product-desc {
      color: var(--text-muted);
      font-size: 0.85rem;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .perks-list {
      list-style: none;
      margin-bottom: 20px;
    }

    .perks-list li {
      font-size: 0.8rem;
      color: #cbd5e1;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .price-box {
      display: flex;
      flex-direction: column;
    }

    .price-kc {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--gold);
    }

    .price-sub {
      font-size: 0.7rem;
      color: #64748b;
    }

    .btn-unlock {
      background: linear-gradient(135deg, var(--cyan), #00b4d8);
      color: #07090e;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-unlock:hover {
      transform: scale(1.05);
      box-shadow: 0 0 15px var(--cyan-glow);
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      margin-bottom: 35px;
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 8px;
    }

    .section-subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Support & Help Desk Section */
    .support-section {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 40px;
      margin-bottom: 60px;
    }

    .quick-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .quick-card {
      background: rgba(10, 14, 23, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .quick-card:hover {
      border-color: var(--cyan);
      transform: translateY(-4px);
    }

    .quick-card-icon {
      width: 50px;
      height: 50px;
      margin: 0 auto 12px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }

    /* Forms */
    .form-container {
      background: rgba(10, 14, 23, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 30px;
      margin-bottom: 40px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      .form-grid { grid-template-columns: 1fr; }
      .nav-menu { display: none; }
      .hero-title { font-size: 2rem; }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group.full {
      grid-column: 1 / -1;
    }

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
    }

    input, select, textarea {
      background: #070a12;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 14px;
      color: #fff;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.2s;
    }

    input:focus, select:focus, textarea:focus {
      border-color: var(--cyan);
      box-shadow: 0 0 12px var(--cyan-glow);
    }

    .btn-submit-form {
      background: linear-gradient(135deg, var(--cyan), #00b4d8);
      color: #07090e;
      border: none;
      padding: 12px 28px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-submit-form:hover {
      transform: scale(1.03);
      box-shadow: 0 0 20px var(--cyan-glow);
    }

    /* FAQ Accordion */
    .faq-item {
      background: rgba(10, 14, 23, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      margin-bottom: 10px;
      overflow: hidden;
    }

    .faq-header {
      padding: 14px 18px;
      font-weight: 700;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .faq-header:hover {
      color: var(--cyan);
    }

    .faq-content {
      padding: 0 18px 14px;
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.6;
      display: none;
    }

    .faq-item.open .faq-content {
      display: block;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-box {
      background: #0f172a;
      border: 1px solid var(--border);
      border-radius: 20px;
      max-width: 480px;
      width: 100%;
      padding: 30px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    }

    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: #64748b;
      font-size: 1.2rem;
      cursor: pointer;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 40px 20px 20px;
      background: #05070a;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: var(--cyan);
    }
  </style>
</head>
<body>

  <!-- Top Banner -->
  <div class="top-bar">
    <div class="top-bar-left">
      <i class="fa-solid fa-coins" style="color: var(--gold);"></i>
      <span><strong>KRYLOSMP SEASON 1:</strong> 100% Free-to-Play! All Ranks, Crates & Kits are unlocked with <strong>KryloCoins (KC)</strong>!</span>
    </div>
    <a href="https://discord.gg/6vrEDTu3bx" target="_blank" class="btn-top-discord">
      <i class="fa-brands fa-discord"></i> Discord Support
    </a>
  </div>

  <!-- Header -->
  <header>
    <div class="nav-inner">
      <a href="#store" class="brand">
        <img src="server-icon.png" alt="Logo" class="brand-img">
        <div class="brand-text">KRYLO<span>SMP</span></div>
      </a>

      <ul class="nav-menu">
        <li><a href="#store" class="nav-link active"><i class="fa-solid fa-store"></i> #Store</a></li>
        <li><a href="#ranks" class="nav-link" onclick="filterCategory('ranks')"><i class="fa-solid fa-crown"></i> #Ranks</a></li>
        <li><a href="#crates" class="nav-link" onclick="filterCategory('crates')"><i class="fa-solid fa-box-open"></i> #Crates</a></li>
        <li><a href="#combat" class="nav-link" onclick="filterCategory('combat')"><i class="fa-solid fa-shield-halved"></i> #Kits</a></li>
        <li><a href="#support" class="nav-link"><i class="fa-solid fa-headset"></i> #Support</a></li>
        <li><a href="#apply" class="nav-link"><i class="fa-solid fa-file-pen"></i> #Apply</a></li>
        <li><a href="https://discord.gg/6vrEDTu3bx" target="_blank" class="nav-link nav-discord"><i class="fa-brands fa-discord"></i> Discord</a></li>
      </ul>

      <div class="header-right">
        <div class="ip-badge" onclick="copyIp()" title="Click to copy IP">
          <div class="pulse-dot"></div>
          <span id="ipText">krylosmp.falix.gg:29273</span>
        </div>

        <div class="user-pill" onclick="openLogin()">
          <img src="https://mc-heads.net/avatar/Krylo_MC/32" id="headerAvatar" alt="Avatar">
          <div class="user-pill-info">
            <span class="user-pill-name" id="headerIgn">Krylo_MC</span>
            <span class="user-pill-kc" id="headerKc">250,000 KC</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero Banner -->
    <div class="hero-card">
      <img src="official_banner.jpg" alt="Banner" class="hero-bg">
      <div class="hero-content">
        <div class="hero-tag"><i class="fa-solid fa-coins"></i> 100% KRYLOCOINS (KC) PLAY-TO-EARN</div>
        <h1 class="hero-title">KryloSMP Official Store</h1>
        <p class="hero-desc"><strong>"Built to Inspire. Built to Dominate."</strong> Unlock custom ranks, dragon crates, combat god-kits, and cosmetic perks with instant in-game delivery using KryloCoins (KC) earned by playing!</p>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="#store" class="btn-submit-form" style="text-decoration: none;">
            <i class="fa-solid fa-cart-shopping"></i> Browse Store
          </a>
          <a href="#support" class="tab-btn" style="text-decoration: none;">
            <i class="fa-solid fa-headset"></i> Support Hub
          </a>
        </div>
      </div>
    </div>

    <!-- Store Section -->
    <section id="store" style="margin-bottom: 70px;">
      <div class="section-header">
        <div class="section-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--cyan); border: 1px solid rgba(0, 243, 255, 0.3);">
          <i class="fa-solid fa-layer-group"></i> SEASON 1 CATALOG
        </div>
        <h2 class="section-title">Explore Store Packages</h2>
        <p class="section-subtitle">Select a package to redeem directly to your linked Minecraft account in-game:</p>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="tab-btn active" onclick="filterCategory('all', this)"><i class="fa-solid fa-border-all"></i> All Packages</button>
        <button class="tab-btn" onclick="filterCategory('ranks', this)"><i class="fa-solid fa-crown"></i> Server Ranks</button>
        <button class="tab-btn" onclick="filterCategory('crates', this)"><i class="fa-solid fa-box-open"></i> Crates & Keys</button>
        <button class="tab-btn" onclick="filterCategory('combat', this)"><i class="fa-solid fa-shield-halved"></i> Combat God-Kits</button>
      </div>

      <!-- Grid -->
      <div class="products-grid" id="productsGrid">
        <!-- Injected via JavaScript -->
      </div>
    </section>

    <!-- Support Section -->
    <section id="support" class="support-section">
      <div class="section-header">
        <div class="section-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--cyan); border: 1px solid rgba(0, 243, 255, 0.3);">
          <i class="fa-solid fa-headset"></i> 24/7 HELP DESK
        </div>
        <h2 class="section-title">#Support & Help Center</h2>
        <p class="section-subtitle">Need help with your coins, account linking, or reporting an issue? Our team is active 24/7.</p>
      </div>

      <div class="quick-cards-grid">
        <div class="quick-card" onclick="window.open('https://discord.gg/6vrEDTu3bx', '_blank')">
          <div class="quick-card-icon" style="background: rgba(88, 101, 242, 0.15); color: #5865F2;">
            <i class="fa-brands fa-discord"></i>
          </div>
          <h3 style="margin-bottom: 6px; font-size: 1.1rem;">Live Discord Support</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">Chat directly with online moderators and administrators.</p>
          <span style="color: var(--cyan); font-weight: 700; font-size: 0.85rem;">Join Discord <i class="fa-solid fa-arrow-right"></i></span>
        </div>

        <div class="quick-card" onclick="document.getElementById('ticketForm').scrollIntoView({behavior: 'smooth'})">
          <div class="quick-card-icon" style="background: rgba(255, 215, 0, 0.15); color: var(--gold);">
            <i class="fa-solid fa-coins"></i>
          </div>
          <h3 style="margin-bottom: 6px; font-size: 1.1rem;">Coins & Store Help</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">Assistance with KryloCoins balance and rank delivery.</p>
          <span style="color: var(--cyan); font-weight: 700; font-size: 0.85rem;">Submit Ticket <i class="fa-solid fa-arrow-right"></i></span>
        </div>

        <div class="quick-card" onclick="document.getElementById('ticketForm').scrollIntoView({behavior: 'smooth'})">
          <div class="quick-card-icon" style="background: rgba(168, 85, 247, 0.15); color: var(--purple);">
            <i class="fa-solid fa-gavel"></i>
          </div>
          <h3 style="margin-bottom: 6px; font-size: 1.1rem;">Punishment Appeals</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">Submit unban or unmute requests for review.</p>
          <span style="color: var(--cyan); font-weight: 700; font-size: 0.85rem;">Open Appeal <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>

      <!-- Ticket Form -->
      <div class="form-container" id="ticketForm">
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 8px;">
          <i class="fa-solid fa-ticket" style="color: var(--cyan);"></i> Submit a Support Ticket
        </h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Fill out this form and our support team will handle your request promptly.</p>

        <div id="ticketAlert" style="display: none; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green); color: #6ee7b7; padding: 12px; border-radius: 10px; margin-bottom: 20px; font-weight: 600;">
          <i class="fa-solid fa-circle-check"></i> Ticket Created! <strong>Reference ID: <span id="ticketIdSpan"></span></strong>. Our moderators will follow up!
        </div>

        <form onsubmit="handleSupportSubmit(event)">
          <div class="form-grid">
            <div class="form-group">
              <label>Minecraft Username (IGN)</label>
              <input type="text" id="tIgn" placeholder="e.g. Krylo_MC" required>
            </div>
            <div class="form-group">
              <label>Discord Username / Tag</label>
              <input type="text" id="tDiscord" placeholder="e.g. krylo or Krylo#0001" required>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select id="tCategory" required>
                <option value="coins">🪙 KryloCoins / Store Unlock Issue</option>
                <option value="account">👤 Account / Skin Loading Help</option>
                <option value="bug">🐛 Bug Report / Exploit</option>
                <option value="appeal">⚖️ Punishment Appeal</option>
                <option value="general">❓ General Question</option>
              </select>
            </div>
            <div class="form-group">
              <label>Priority</label>
              <select id="tPriority">
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div class="form-group full">
              <label>Detailed Description</label>
              <textarea id="tDetails" rows="4" placeholder="Describe the issue you are experiencing..." required></textarea>
            </div>
          </div>
          <button type="submit" class="btn-submit-form">
            <i class="fa-solid fa-paper-plane"></i> Send Ticket
          </button>
        </form>
      </div>

      <!-- FAQ Accordion -->
      <div class="form-container">
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 16px;">
          <i class="fa-solid fa-circle-question" style="color: var(--cyan);"></i> Frequently Asked Questions
        </h3>
        
        <div class="faq-item">
          <div class="faq-header" onclick="toggleFaq(this)">
            <span>🎮 How do I join from Bedrock (Mobile / Console / Windows 10)?</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="faq-content">
            Enter <strong>Server IP:</strong> <code>krylosmp.falix.gg</code> and <strong>Port:</strong> <code>29273</code> (or default <code>19132</code>). Floodgate and Geyser handle cross-play automatically!
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-header" onclick="toggleFaq(this)">
            <span>🪙 What are KryloCoins (KC) and how do I earn them?</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="faq-content">
            KryloCoins are the 100% Free Play-to-Earn currency of KryloSMP Season 1. Earn coins by playing, mining, claiming daily drops on Discord, and defeating world bosses. Spend in-game with <code>/kcshop</code>!
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-header" onclick="toggleFaq(this)">
            <span>🎨 How do I fix my skin in-game?</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="faq-content">
            Type <code>/skin &lt;username&gt;</code> or <code>/skin url &lt;direct_png_url&gt;</code> in game chat to apply any skin instantly.
          </div>
        </div>
      </div>
    </section>

    <!-- Apply Section -->
    <section id="apply" class="support-section" style="border-color: rgba(168, 85, 247, 0.3);">
      <div class="section-header">
        <div class="section-badge" style="background: rgba(168, 85, 247, 0.15); color: var(--purple); border: 1px solid rgba(168, 85, 247, 0.3);">
          <i class="fa-solid fa-id-badge"></i> JOIN THE TEAM
        </div>
        <h2 class="section-title">#Apply for Staff & Builder</h2>
        <p class="section-subtitle">Help build, moderate, and grow KryloSMP! We are recruiting dedicated helpers, moderators, and builders.</p>
      </div>

      <div class="form-container">
        <div id="applyAlert" style="display: none; background: rgba(168, 85, 247, 0.15); border: 1px solid var(--purple); color: #e9d5ff; padding: 12px; border-radius: 10px; margin-bottom: 20px; font-weight: 600;">
          <i class="fa-solid fa-circle-check"></i> Application Submitted! <strong>App ID: <span id="appIdSpan"></span></strong>. Our team will review your application on Discord!
        </div>

        <form onsubmit="handleApplySubmit(event)">
          <div class="form-grid">
            <div class="form-group">
              <label>Minecraft IGN</label>
              <input type="text" id="aIgn" placeholder="e.g. Krylo_MC" required>
            </div>
            <div class="form-group">
              <label>Discord Tag</label>
              <input type="text" id="aDiscord" placeholder="e.g. krylo#0001" required>
            </div>
            <div class="form-group">
              <label>Desired Role</label>
              <select id="aRole" required>
                <option value="helper">🛡️ Helper / Trial Mod</option>
                <option value="moderator">⚔️ Server Moderator</option>
                <option value="builder">🏰 Builder / World Designer</option>
                <option value="developer">💻 Plugin / Skript Developer</option>
              </select>
            </div>
            <div class="form-group">
              <label>Age & Timezone</label>
              <input type="text" id="aTz" placeholder="e.g. 17 / EST (UTC-5)" required>
            </div>
            <div class="form-group full">
              <label>Why do you want to join our team?</label>
              <textarea id="aWhy" rows="4" placeholder="Tell us about your experience and why you'd be a great fit..." required></textarea>
            </div>
          </div>
          <button type="submit" class="btn-submit-form" style="background: linear-gradient(135deg, #a855f7, #6366f1); color: #fff;">
            <i class="fa-solid fa-paper-plane"></i> Submit Staff Application
          </button>
        </form>
      </div>
    </section>
  </main>

  <!-- Unlock Modal -->
  <div class="modal-overlay" id="unlockModal">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      <div style="text-align: center; margin-bottom: 20px;">
        <div id="modalIcon" style="font-size: 2.5rem; margin-bottom: 8px;">👑</div>
        <h3 id="modalTitle" style="font-size: 1.4rem; font-weight: 800; color: #fff;">Unlock Package</h3>
        <p id="modalDesc" style="color: var(--text-muted); font-size: 0.85rem;"></p>
      </div>

      <div style="background: #070a12; border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 6px;">
          <span style="color: #cbd5e1;">Target Player:</span>
          <strong id="modalPlayer" style="color: var(--cyan);">Krylo_MC</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: #cbd5e1;">Price:</span>
          <strong id="modalPrice" style="color: var(--gold); font-family: 'JetBrains Mono';">50,000 KC</strong>
        </div>
      </div>

      <button class="btn-submit-form" style="width: 100%; justify-content: center;" onclick="confirmUnlock()">
        <i class="fa-solid fa-bolt"></i> Confirm & Deliver In-Game
      </button>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="footer-links">
      <a href="#store">#Store</a>
      <a href="#ranks">#Ranks</a>
      <a href="#crates">#Crates</a>
      <a href="#combat">#Kits</a>
      <a href="#support">#Support</a>
      <a href="#apply">#Apply</a>
      <a href="https://discord.gg/6vrEDTu3bx" target="_blank">Discord</a>
    </div>
    <p>© 2026 KryloSMP Network. 100% Free-to-Play Community Economy. Not affiliated with Mojang Studios.</p>
  </footer>

  <script>
    const PRODUCTS = [
      { id: 'vip', name: 'VIP Sovereign Rank', cat: 'ranks', icon: '👑', badge: 'starter', price: 50000, desc: 'Unlock exclusive green [VIP] chat prefix, /fly in Hub, and +15% KryloCoins boost.', perks: ['Green [VIP] Chat Badge', '/fly in Spawn Hub', '+15% KC Multiplier', '3x /sethome slots'] },
      { id: 'mvp', name: 'MVP Immortal Rank', cat: 'ranks', icon: '💎', badge: 'popular', price: 100000, desc: 'Cyan [MVP] prefix, /heal, /feed, and Netherite PvP starter gear on respawn.', perks: ['Cyan [MVP] Chat Badge', '/heal & /feed commands', 'Netherite PvP Gear Pack', '+35% KC Multiplier', '6x /sethome slots'] },
      { id: 'mvp_plus', name: 'MVP+ Sovereign Rank', cat: 'ranks', icon: '🔥', badge: 'hot', price: 150000, desc: 'Orange [MVP+] prefix, /workbench, /enderchest anywhere, and priority queue.', perks: ['Orange [MVP+] Chat Prefix', '/craft & /enderchest anywhere', '+50% KC Multiplier', '10x /sethome slots'] },
      { id: 'executive', name: 'KRYLO EXECUTIVE RANK', cat: 'ranks', icon: '⭐', badge: 'best', price: 250000, desc: 'The ultimate rank. Animated Gold prefix, Private VIP Lounge access, and Unlimited Homes.', perks: ['Animated Gold [EXECUTIVE] Prefix', 'Private Executive Lounge Access', '2x Daily Rewards (+1,000 KC/day)', '+100% KC Multiplier', 'Unlimited /sethome slots'] },
      { id: 'mythic_keys', name: '5x Mythic Crate Keys', cat: 'crates', icon: '🔑', badge: 'hot', price: 15000, desc: '5x Mythic Keys with 30% chance for God Armor and 10,000 KC jackpot drops.', perks: ['5x Mythic Keys', '30% God Gear Chance', 'High KC Drops', 'Instant Crate Delivery'] },
      { id: 'dragon_crate', name: 'Legendary Dragon Crate (x10)', cat: 'crates', icon: '🐲', badge: 'best', price: 30000, desc: '10x Ancient Dragon Keys with guaranteed Netherite weapon and elytra drop.', perks: ['10x Dragon Crate Keys', 'Guaranteed Netherite Weapon', 'Elytra + 64 Fireworks', 'Auto-broadcasts unboxing'] },
      { id: 'god_kit', name: 'Netherite God Kit', cat: 'combat', icon: '🛡️', badge: 'hot', price: 25000, desc: 'Full Protection IV Netherite Armor, Sharpness V Sword, 16 Gaps, and 4 Pearls.', perks: ['Full Netherite Prot 4 Armor', 'Netherite Sharp 5 Sword', '16x Golden Apples', '4x Ender Pearls'] },
      { id: 'archer_kit', name: 'Master Archer Kit', cat: 'combat', icon: '🏹', badge: 'popular', price: 15000, desc: 'Power V Infinity Flame Bow, 64 Spectral Arrows, and Speed II Potions.', perks: ['Power 5 Flame Infinity Bow', '3x Speed II Potions (8:00)', '64x Spectral Arrows', 'Diamond Chainmail Armor'] }
    ];

    let currentCat = 'all';
    let currentProduct = null;

    function renderProducts() {
      const grid = document.getElementById('productsGrid');
      const filtered = currentCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentCat);
      
      grid.innerHTML = filtered.map(p => `
        <div class="product-card">
          ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge}</span>` : ''}
          <div>
            <div class="product-icon">${p.icon}</div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <ul class="perks-list">
              ${p.perks.map(perk => `<li><i class="fa-solid fa-check" style="color: var(--green);"></i> ${perk}</li>`).join('')}
            </ul>
          </div>
          <div class="product-footer">
            <div class="price-box">
              <span class="price-kc">${p.price.toLocaleString()} KC</span>
              <span class="price-sub">Play-to-Earn</span>
            </div>
            <button class="btn-unlock" onclick="openUnlock('${p.id}')">
              <i class="fa-solid fa-bolt"></i> Unlock
            </button>
          </div>
        </div>
      `).join('');
    }

    function filterCategory(cat, btn) {
      currentCat = cat;
      document.querySelectorAll('.filter-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderProducts();
    }

    function openUnlock(id) {
      currentProduct = PRODUCTS.find(p => p.id === id);
      if (!currentProduct) return;
      document.getElementById('modalIcon').innerText = currentProduct.icon;
      document.getElementById('modalTitle').innerText = currentProduct.name;
      document.getElementById('modalDesc').innerText = currentProduct.desc;
      document.getElementById('modalPrice').innerText = currentProduct.price.toLocaleString() + ' KC';
      document.getElementById('modalPlayer').innerText = document.getElementById('headerIgn').innerText;
      document.getElementById('unlockModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('unlockModal').classList.remove('active');
    }

    function confirmUnlock() {
      closeModal();
      alert('🎉 SUCCESS! ' + currentProduct.name + ' has been unlocked and dispatched in-game to ' + document.getElementById('headerIgn').innerText + '!');
    }

    function copyIp() {
      navigator.clipboard.writeText('krylosmp.falix.gg:29273');
      const text = document.getElementById('ipText');
      text.innerText = 'COPIED TO CLIPBOARD!';
      setTimeout(() => text.innerText = 'krylosmp.falix.gg:29273', 2000);
    }

    function toggleFaq(el) {
      el.parentElement.classList.toggle('open');
    }

    function handleSupportSubmit(e) {
      e.preventDefault();
      const id = 'KRYLO-TKT-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('ticketIdSpan').innerText = id;
      document.getElementById('ticketAlert').style.display = 'block';
      e.target.reset();
      document.getElementById('ticketAlert').scrollIntoView({behavior: 'smooth'});
    }

    function handleApplySubmit(e) {
      e.preventDefault();
      const id = 'KRYLO-APP-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('appIdSpan').innerText = id;
      document.getElementById('applyAlert').style.display = 'block';
      e.target.reset();
      document.getElementById('applyAlert').scrollIntoView({behavior: 'smooth'});
    }

    // Initialize
    renderProducts();
  </script>
</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(new_html)

print("[+] Clean, pixel-perfect SPA index.html written successfully!")
