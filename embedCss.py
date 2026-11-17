import os

css_path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\index.css"
html_path = r"C:\Users\naina\.gemini\antigravity\scratch\krylosmp-store-website\index.html"

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

target = '<link rel="stylesheet" href="index.css?v=13.0">'
if target in html:
    replacement = f'<link rel="stylesheet" href="index.css?v=25.0">\n  <style>\n{css}\n  </style>'
    html = html.replace(target, replacement)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Inlined CSS into index.html!")
else:
    print("Warning: target link tag not found in index.html")
