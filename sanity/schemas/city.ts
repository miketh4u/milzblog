import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "City",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});
