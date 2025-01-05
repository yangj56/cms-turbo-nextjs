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
  endpoints: [
    {
      path: "/:id/products",
      method: "get",
      handler: async (req) => {
        const id = (await req.routeParams?.id) as string;
        if (!id) {
          return Response.json({ error: "id is required" }, { status: 400 });
        }
        const products = await req.payload.find({
          collection: "product",
          where: {
            category: {
              equals: id,
            },
          },
          select: {
            color: true,
            title: true,
          },
        });
        return Response.json(products);
      },
    },
  ],
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
    },
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
