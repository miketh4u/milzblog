import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        },
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [defineField({ name: "text", type: "string", title: "Quote Text" })],
        },
        {
          type: "object",
          name: "videoEmbed",
          title: "YouTube Video",
          fields: [
            defineField({ name: "videoId", type: "string", title: "YouTube Video ID" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        },
        {
          type: "object",
          name: "affiliateWidget",
          title: "Affiliate Product",
          fields: [
            defineField({ name: "productName", type: "string", title: "Product Name" }),
            defineField({ name: "url", type: "url", title: "Affiliate URL" }),
            defineField({ name: "image", type: "image", title: "Product Image", options: { hotspot: true } }),
            defineField({ name: "price", type: "string", title: "Price" }),
          ],
        },
      ],
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "subcategory", title: "Subcategory", type: "reference", to: [{ type: "subcategory" }] }),
    defineField({ name: "country", title: "Country", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "city", title: "City", type: "reference", to: [{ type: "city" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "isSponsored", title: "Sponsored Post", type: "boolean", initialValue: false }),
    defineField({ name: "isFeatured", title: "Featured Post", type: "boolean", initialValue: false }),
    defineField({ name: "readingTime", title: "Reading Time (minutes)", type: "number" }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", type: "string", title: "Meta Title" }),
        defineField({ name: "metaDescription", type: "text", title: "Meta Description", rows: 2 }),
        defineField({ name: "ogImage", type: "image", title: "OG Image" }),
      ],
    }),
  ],
  orderings: [{ title: "Published, New", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", media: "featuredImage", subtitle: "publishedAt" },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "" };
    },
  },
});
