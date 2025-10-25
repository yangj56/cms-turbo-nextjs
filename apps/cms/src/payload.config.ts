import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig, type PayloadRequest } from "payload";
import sharp from "sharp";
import { BlogPost } from "./collections/BlogPost";
import { Feature } from "./collections/Feature";
import { Hero } from "./collections/Hero";
import { Introduction } from "./collections/Introduction";
import { Media } from "./collections/Media";
import { Product } from "./collections/Product";
import { ProductCategory } from "./collections/ProductCategory";
import { ProductCollection } from "./collections/ProductCollection";
import { Social } from "./collections/Social";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		components: {
			beforeDashboard: ["/components/publish#PublishButton"],
			logout: {
				Button: "/components/custom-add-on#CustomDashboard",
			},
		},
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	endpoints: [
		{
			path: "/revalidate",
			method: "post",
			handler: async (req: PayloadRequest): Promise<Response> => {
				try {
					if (!req.user) {
						console.log("cms unauthorized");
						return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
					}
					const token = process.env.REVALIDATE_TOKEN;
					if (!token) {
						console.log("cms revalidate token not set");
						return Response.json({ ok: false, message: "REVALIDATE_TOKEN is not set" }, { status: 500 });
					}

					const upstream = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/revalidate`, {
						method: "POST",
						headers: {
							"x-revalidate-token": token,
							"content-type": "application/json",
						},
					});

					const data = await upstream.json().catch(() => ({}));
					return Response.json(data, { status: upstream.status });
				} catch (e) {
					return Response.json({ ok: false, error: `${e}` }, { status: 500 });
				}
			},
		},
	],
	collections: [
		Media,
		ProductCategory,
		Product,
		Users,
		Hero,
		Social,
		Introduction,
		Feature,
		ProductCollection,
		BlogPost,
	],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: mongooseAdapter({
		url: process.env.MONGODB_URI || "",
	}),
	sharp,
	plugins: [
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || "",
			config: {
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
				},
				region: process.env.S3_REGION,
			},
		}),
	],
});
