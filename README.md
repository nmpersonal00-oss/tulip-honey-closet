# Tulip & Honey Closet — Glossy Polaroid (Save Button Fixed)

Open **index.html** in Chrome/Safari or deploy to GitHub Pages. Both closet tabs, Polaroid photos, captions, editing, rain, and cloud settings remain available.

## What changed
- Fixed the Save button crash in restricted preview browsers that do not have `crypto.randomUUID()`.
- Clothing name is optional when a caption is supplied; an automatic name is used if both are blank.
- Saving tries IndexedDB, then localStorage; if both are blocked by the preview, the Polaroid appears temporarily, and a visible warning recommends exporting a Backup. Temporary preview content is **not** preserved between browser sessions.
- Errors now show under the Save button instead of failing silently.

## Storage
Browser-only items are stored **on that device and website origin**, not synced. Clear site data/private browsing can erase them. Take regular JSON backups. For durable cross-device sync, open on GitHub Pages and sign into the preconfigured Supabase cloud account. Use **Copy browser Polaroids to cloud** for existing browser photos. Upload and private cloud save depend on network access, a valid account and Supabase permissions.

If you opened an older version in another preview address, items saved at that other origin might not appear; use Backup/Restore to transfer.
