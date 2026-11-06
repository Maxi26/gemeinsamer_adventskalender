# Adventskalender (Hugo)

Doppelkalender für zwei: je 24 Türchen pro Hälfte, Inhalte in `data/tage.yaml`.

- Lokal testen: `hugo server`, dann `/?preview=1` bzw. `/maxi/?preview=1` (alle Türchen offen) oder `?tag=10` (simuliert Tag 10)
- Namen, Jahr, Hochzeitsdatum: `hugo.toml`
- Texte ändern/ergänzen: `data/tage.yaml` (a = Hälfte Maxi, b = Hälfte Anna-Lena)
- Build: `hugo --minify` → Ordner `public/` (z. B. Render Static Site, Publish Directory `public`)
- Geöffnete Türchen merkt sich der Browser (localStorage), pro Hälfte
