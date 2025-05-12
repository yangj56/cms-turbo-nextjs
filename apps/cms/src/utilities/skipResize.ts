import type { BeforeChangeHook } from "node_modules/payload/dist/collections/config/types";

export const skipResizeForWebP: BeforeChangeHook = async ({ req }) => {
  const uploadedFile = req?.file;

  if (uploadedFile?.mimetype === "image/webp") {
    console.log("test");
    req.payloadUploadSizes = {};
  } else {
    console.log("no test");
  }

  return undefined;
};
