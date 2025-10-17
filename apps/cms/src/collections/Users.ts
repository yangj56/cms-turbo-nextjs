import type { CollectionConfig } from "payload";
import { authenticated } from "@/access/authenticated";

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: authenticated,
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated,
	},
	admin: {
		useAsTitle: "email",
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
	],
};
