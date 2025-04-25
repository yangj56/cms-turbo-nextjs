import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Product: CollectionConfig = {
  slug: "product",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  endpoints: [
    {
      path: "/search",
      method: "get",
      handler: async (req) => {
        const { query, page, limit } = req.query;
        console.log(`1query`, query);
        console.log(`1page`, page);
        console.log(`limit`, limit);
        const searchResults = await req.payload.find({
          collection: "product",
          where: {
            and: [
              {
                title: {
                  like: query as string,
                },
              },
              {
                sku: {
                  like: query as string,
                },
              },
            ],
          },
          limit: limit as number,
          page: page as number,
          sort: ["sequence:desc", "title:asc"],
          select: {
            title: true,
            sku: true,
            sequence: true,
            description: true,
            category: true,
            color: true,
          },
        });
        return Response.json(searchResults);
      },
    },
  ],
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "sku",
      label: "SKU (no space or special characters *unique)",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-category",
      required: true,
    },
    {
      name: "color",
      type: "array",
      fields: [
        {
          name: "colorName",
          label: "Color name",
          type: "text",
        },
        {
          name: "colorCode",
          label: "Color Code (eg: #000000)",
          type: "text",
        },
        {
          name: "images",
          type: "array",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
    {
      name: "datasheet",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "instruction",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "youtubeUrl",
      type: "text",
      required: false,
    },
    {
      name: "sequence",
      type: "number",
      required: false,
    },
    {
      name: "specificationOverviewInfo",
      type: "array",
      fields: [
        {
          name: "data",
          type: "text",
        },
      ],
    },
    {
      name: "labelValuePairs",
      type: "json",
    },
    {
      name: "compatibleProducts",
      type: "array",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "product",
        },
      ],
    },
  ],
};
