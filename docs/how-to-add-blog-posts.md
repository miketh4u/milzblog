# How to Add Blog Posts (Sanity Guide)

This is the guide for managing content on **milzonthemove.com**. All content lives in Sanity, a content management system built right into the site.

---

## 1. Logging in

1. Go to **https://www.milzonthemove.com/studio**
2. Sign in with the account the studio was set up with (Google, GitHub, or email — whichever you used when the Sanity project was created).
3. You'll land in the "Milz on the Move CMS" dashboard. The left sidebar lists the content types: **Post**, **Category**, **Subcategory**, **Country**, **City**.

> Tip: bookmark the /studio link — it's the only URL you need.

---

## 2. Creating a new blog post

1. Click **Post** in the sidebar.
2. Click the **compose icon** (pencil, top of the list) to create a new post.
3. Fill in the fields (explained below).
4. Click the green **Publish** button at the bottom when you're done.

Nothing is public until you press **Publish** — you can save drafts and come back anytime. Your edits auto-save as a draft while you type.

---

## 3. What each field means

### Title *(required)*
The headline of the post. Shows at the top of the article and in post cards around the site.

### Slug *(required)*
The post's web address, e.g. `three-days-in-lisbon` becomes `milzonthemove.com/blog/three-days-in-lisbon`. Just click **Generate** after typing the title — it creates a clean URL for you. Avoid changing it after publishing (old links would break).

### Published At *(required)*
The date shown on the post and used for ordering (newest first). Set it to today, or backdate it if you're importing older content.

### Excerpt
A 1–2 sentence teaser. Shows on post cards on the homepage and blog listing, and is used as the description in search results if no SEO description is set. Keep it under ~160 characters.

### Featured Image
The main photo — shows at the top of the post and on every card that links to it. See [Adding pictures](#5-adding-pictures) below.

### Body
The article itself. It's a rich-text editor — type normally and use the toolbar for headings, bold, links, and lists. The **+ (insert)** menu lets you drop in special blocks between paragraphs:

- **Image** — a photo inside the article, with optional caption.
- **Pull Quote** — a big styled quote to break up long text.
- **YouTube Video** — paste just the **video ID** (the part after `watch?v=` in a YouTube link, e.g. `dQw4w9WgXcQ`), not the whole URL.
- **Affiliate Product** — a product card with name, your affiliate link, a product photo, and price (e.g. `$39`).

### Category
The main section of the blog the post belongs to (e.g. *Destinations*, *Travel Tips*, *Outfits*). Pick one from the dropdown. Categories are managed under **Category** in the sidebar.

### Subcategory
A more specific topic *inside* a category — for example, category *Travel Tips* might have subcategories *Packing*, *Budgeting*, *Solo Travel*. Each subcategory belongs to one parent category, so pick a subcategory that matches the category you chose. Create new ones under **Subcategory** in the sidebar (you'll be asked for a name and its parent category).

### Country
Which country the post is about. This is what connects a post to the **destinations map and country pages** — posts with a country appear on that country's page, and the country's pin shows on the interactive map. Leave empty for posts that aren't about a specific place (e.g. general packing tips).

### City
Same idea, one level down — links the post to a city page (e.g. *Lisbon* under *Portugal*). Only pick a city if the post is really about that city.

### Tags
Free-form keywords (press Enter after each one), e.g. `beach`, `budget`, `weekend trip`. Used for the tag pages and search.

### Sponsored Post
Turn this on if the post is a paid partnership — it adds a sponsored disclosure label. Off by default.

### Featured Post
Turn this on to make the post eligible for the **Featured Stories** section on the homepage. Only a few posts should have this on at a time.

### Reading Time (minutes)
A number like `7`. Shows as "7 min read" on the post. Rough rule: word count ÷ 200.

### SEO
Optional overrides for search engines and social sharing:
- **Meta Title** — what Google shows instead of the post title (only set it if you want something different).
- **Meta Description** — the snippet under the title in Google results (~155 characters).
- **OG Image** — the image shown when the post is shared on social media/WhatsApp. If empty, the Featured Image is used.

---

## 4. Countries and cities (for the destinations map)

Before you can pick a country on a post, that country needs to exist:

1. Click **Country** in the sidebar → compose icon.
2. Fill in: **Name**, **Slug** (click Generate), **Region** (pick from the list — controls how countries are grouped on the Destinations page).
3. **Hero Image** — shows as the country's card, page header, **and inside its pin on the interactive map**, so pick a good one.
4. **Map Coordinates** — the latitude/longitude of the pin on the map. Google the country name + "lat long" (e.g. Portugal ≈ lat `39.4`, lng `-8.2`). Latitude goes in **Lat**, longitude in **Lng** (negative = west/south).
5. Publish.

Cities work the same but simpler: name, slug, the country they belong to, hero image, description.

---

## 5. Adding pictures

Anywhere you see an image field (Featured Image, Body images, hero images):

1. Click the field → **Upload** and pick a photo from your computer (or drag & drop the file onto the field).
2. **Alt Text** — a short description of what's in the photo (e.g. "Sunset over the Lisbon rooftops"). Fill this in every time: it's what screen readers announce and what Google reads, and it shows if the image fails to load.
3. **Hotspot (the crop tool)** — after uploading, click the ✏️ / crop icon on the image. Drag the **circle** onto the most important part of the photo (usually your face!). The site crops images to different shapes on different pages, and the hotspot makes sure your chosen point always stays in frame.
4. Body images also have a **Caption** field — shows in small text under the photo.

**Photo tips**
- Use JPG for photos; keep files under ~1.5 MB (export around 2000px on the long edge — the site automatically serves smaller versions to phones).
- Featured images display landscape on most cards, so landscape photos crop most predictably.

---

## 6. When do changes appear on the site?

The site caches pages for speed, so **a new or edited post can take up to an hour to show up** on the live site. The post itself usually appears quickly; homepage/listing updates lag the longest. If something looks stale after an hour, do a hard refresh (Cmd+Shift+R).

---

## 7. Editing and removing posts

- **Edit:** click the post in the Post list, change anything, press **Publish** again.
- **Unpublish:** open the post → click the arrow next to Publish → **Unpublish** (takes it off the site but keeps it as a draft).
- **Delete:** same menu → **Delete** (permanent — prefer Unpublish if unsure).
