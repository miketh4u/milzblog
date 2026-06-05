import { defineField, defineType } from "sanity";

export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Middle East"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "cities", title: "Cities", type: "array", of: [{ type: "reference", to: [{ type: "city" }] }] }),
    defineField({
      name: "mapCoordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
  ],
});
