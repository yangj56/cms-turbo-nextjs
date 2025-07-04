import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { skipResizeForWebP } from "@/utilities/skipResize";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  hooks: {
    beforeChange: [skipResizeForWebP],
  },
};
