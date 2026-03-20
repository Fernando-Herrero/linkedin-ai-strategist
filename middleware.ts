import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
    "/:locale/dashboard(.*)",
    "/:locale/profile(.*)",
    "/:locale/audit(.*)",
    "/:locale/keywords(.*)",
    "/:locale/ghostwriter(.*)",
    "/:locale/roadmap(.*)",
    "/:locale/settings(.*)",
    "/:locale/jobs(.*)",
    "/:locale/matching(.*)",
    "/:locale/candidates(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
    return intlMiddleware(req);
});

export const config = {
    matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
