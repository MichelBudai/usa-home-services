import { headers } from "next/headers";
import { getSiteConfig } from "@/config";

export function getCurrentSiteConfig() {
  try {
    const headersList = headers();
    const hostname = headersList.get("x-hostname") ?? "localhost:3000";
    return getSiteConfig(hostname);
  } catch {
    // Appelé hors contexte requête (generateStaticParams, build)
    return getSiteConfig("localhost:3000");
  }
}
