# Self-hosting fonts (optional)

This project currently loads Google Fonts via CSS import in `src/index.css`:

```
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
```

To self-host fonts while keeping the current CSP hardened:

1. Download font files
   - Playfair Display (wght 400/600/700)
   - Montserrat (wght 300/400/500/600)
   - Preferred format: `.woff2`

2. Place them under `public/fonts/`
   - Example:
     - `public/fonts/PlayfairDisplay-400.woff2`
     - `public/fonts/PlayfairDisplay-600.woff2`
     - `public/fonts/PlayfairDisplay-700.woff2`
     - `public/fonts/Montserrat-300.woff2`
     - `public/fonts/Montserrat-400.woff2`
     - `public/fonts/Montserrat-500.woff2`
     - `public/fonts/Montserrat-600.woff2`

3. Add @font-face declarations in `src/index.css` and switch the font-family to use local files:
   ```
   @font-face {
     font-family: 'Playfair Display';
     src: url('/fonts/PlayfairDisplay-400.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: 'Playfair Display';
     src: url('/fonts/PlayfairDisplay-600.woff2') format('woff2');
     font-weight: 600;
     font-style: normal;
     font-display: swap;
   }
   @font-face {
     font-family: 'Playfair Display';
     src: url('/fonts/PlayfairDisplay-700.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'Montserrat';
     src: url('/fonts/Montserrat-300.woff2') format('woff2');
     font-weight: 300;
     font-style: normal;
     font-display: swap;
   }
   /* repeat for 400/500/600 */
   ```

4. Remove the Google Fonts @import line from `src/index.css`.

5. Optionally tighten CSP in `public/_headers`:
   - Remove `https://fonts.googleapis.com` and `https://fonts.gstatic.com` from style-src/font-src.
   - Keep: `style-src 'self'`, `font-src 'self' data:`.
   - Script-src remains `'self'`.

This keeps all assets served from your domain and avoids external font requests.