import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How ArchFlow handles your data and what we do with it.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true }
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        subtitle="Last updated 23 May 2026. This is placeholder copy intended to be replaced by counsel before launch."
      />
      {/* PLACEHOLDER: replace with lawyer-reviewed privacy policy */}
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <Block heading="Who we are">
            <p>
              ArchFlow is a private technology company based in Chandigarh,
              India. We design and build custom workflow and MIS platforms for
              businesses. This policy explains what information we
              collect from visitors to archflow.co.in, why we collect it, and how
              we handle it.
            </p>
          </Block>
          <Block heading="What we collect">
            <p>
              When you submit our contact form we collect the name, company,
              email address, phone number, project type, and message you
              provide. We also collect basic, anonymised analytics — pages
              visited, referring URL, broad device class — so we can understand
              what content is useful.
            </p>
          </Block>
          <Block heading="Why we collect it">
            <p>
              Form submissions are used solely to respond to your enquiry and,
              with your consent, to follow up about ArchFlow&apos;s services.
              Analytics are used to improve the site. We do not sell, rent, or
              share your information with third parties for their own marketing.
            </p>
          </Block>
          <Block heading="How we store it">
            <p>
              Form submissions are stored in our internal CRM and email systems
              under access controls limited to the founding team. We retain
              enquiry data for as long as the conversation is active and for a
              reasonable follow-up window thereafter.
            </p>
          </Block>
          <Block heading="Your rights">
            <p>
              You can request access to, correction of, or deletion of any
              personal information we hold about you by writing to
              harsh@archflow.co.in. We will respond within a reasonable time and in
              line with applicable Indian data protection law.
            </p>
          </Block>
          <Block heading="Updates">
            <p>
              We may update this policy from time to time. Material changes will
              be reflected by an updated &ldquo;last updated&rdquo; date at the
              top of the page.
            </p>
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({
  heading,
  children
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {heading}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
