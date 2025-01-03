import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { LabelValue } from "@/blocks/LabelValue";

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
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "show",
      type: "checkbox",
      defaultValue: false,
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
          name: "color",
          type: "text",
        },
        {
          name: "colorCode",
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
      required: true,
    },
    {
      name: "specificationOverview",
      type: "richText",
    },
    {
      name: "labelValuePairs",
      type: "blocks",
      label: "Label-Value Pairs",
      blocks: [LabelValue],
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
