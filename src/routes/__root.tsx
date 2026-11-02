import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "@/components/site/layout";
import { luxButton } from "@/components/site/ui";
import { clinic } from "@/config/clinic";

function NotFoundComponent() {
  return (
    <div className="bg-ink-grad flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="font-display text-[140px] leading-none text-gold">404</p>
        <h1 className="mt-4 text-3xl text-ivory">This page took a little <em className="text-gold-soft">dental leave</em>.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className={luxButton({ variant: "gold" })}>Home</Link>
          <Link to="/contact" className={luxButton({ variant: "outlineGold" })}>Contact</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pretty Smile Dental Clinic, Dubai" },
      { name: "description", content: clinic.tagline },
      { property: "og:site_name", content: clinic.name },
      { name: "theme-color", content: "#0B2A33" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: clinic.name,
          url: clinic.website,
          telephone: clinic.phone,
          email: clinic.email,
          address: { "@type": "PostalAddress", streetAddress: "M-05 Al Meraikhi Tower, Sheikh Zayed Road, Trade Centre First", addressLocality: "Dubai", addressCountry: "AE" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: clinic.rating, reviewCount: clinic.reviews },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "18:00" },
          ],
          sameAs: [clinic.social.facebook, clinic.social.instagram],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
