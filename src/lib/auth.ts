import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey, username } from "better-auth/plugins";
import * as authSchema from "@/lib/db/schemas/auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
		usePlural: true,
		schema: {
			...authSchema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
	},
	plugins: [
		apiKey(),
		username({
			usernameValidator: (username) => {
				if (username === "admin") {
					return false;
				} else {
					return true;
				}
			},
		}),
	],
});
