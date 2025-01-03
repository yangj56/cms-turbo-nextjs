import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const ProductCategory: CollectionConfig = {
  slug: "product-category",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "secondaryImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "show",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
  ],
};
