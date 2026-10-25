TULIP & HONEY CLOSET — COZY IPHONE LAYOUT UPDATE
================================================

This is an ADD-ON to your existing app, not a replacement.
It changes layout ONLY on narrow screens (720 CSS pixels or less).
It does NOT modify Supabase, cloud sync, local saved records,
existing categories, wardrobe photos, saved outfits, or password/login code.
There are NO external libraries, no analytics, and no stock photos.
Desktop layout remains unchanged.

INSTALL ON GITHUB (two small steps):

1) Open https://github.com/nmpersonal00-oss/tulip-honey-closet
   Choose Add file > Upload files.
   Upload ONLY tulip-honey-mobile-layout.js into the repository root
   (the folder where index.html lives), and commit the addition.

2) Open index.html in github.dev. Open Find and Replace.
   Find this exact text, which occurs once at the end:

      </body></html>

   Replace it with:

      <script defer src="./tulip-honey-mobile-layout.js"></script></body></html>

   Save and Commit & Push.

DO NOT replace index.html with an older preview file.
DO NOT upload preview sample clothing as real wardrobe items.

WHAT CHANGES ON IPHONE:
- Original glossy pink/lavender translucent appearance retained.
- Original categories appear in a horizontally swipable row.
- Outfits is removed from that row and opened via bottom Outfits tab.
- Edit/Remove photo controls are accessible through a small three-dot menu.
- Cloud, privacy settings, backups, sorting and rain controls appear under More.
- The existing button and cloud actions are kept, only moved on screen.
- Desktop layout stays unchanged.

WHAT DOES NOT CHANGE:
- Your existing index.html business logic and data structures.
- Your login storage key, session handling, and Supabase connection.
- Photos, captions, records, outfits or cloud data.
- Existing app icons or graphics. No stock photos or people are added.

REVERT IF YOU WANT YOUR ORIGINAL LAYOUT BACK:
In index.html, remove exactly this line:

   <script defer src="./tulip-honey-mobile-layout.js"></script>

Commit and push; no data migration or deletion is necessary.
You may leave the unused .js in the repo or delete it later.

TESTED:
- Syntax check passed.
- Basic browser simulation passed for mobile, More, Outfits, Collections,
  photo action menus, and restoration to desktop width.
- Actual Supabase login against your account was deliberately NOT performed.
  Test sign-in and cloud status on your devices after deployment.
