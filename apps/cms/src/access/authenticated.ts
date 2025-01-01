import type { User } from "@repo/ui";
import type { AccessArgs } from "payload";

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
    return Boolean(user);
};
