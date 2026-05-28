import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing your use of the archflow.co.in website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true }
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        subtitle="Last updated 23 May 2026. This is placeholder copy intended to be replaced by counsel before launch."
      />
      {/* PLACEHOLDER: replace with lawyer-reviewed terms of use */}
      <section className="section-y">
        <div className="container-page mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground">
          <Block heading="Acceptance">
            <p>
              By accessing archflow.co.in you agree to these terms. If you do not
              agree, please discontinue use of the site. These terms govern
              only your use of this website, not any separate engagement
              agreement you may sign with ArchFlow.
            </p>
          </Block>
          <Block heading="Use of content">
            <p>
              All content on this site — including copy, design, illustrations,
              and code — is owned by ArchFlow or its licensors and is provided
              for informational purposes. You may share links to public pages.
              You may not reproduce, modify, or commercially exploit the
              content without written permission.
            </p>
          </Block>
          <Block heading="No warranty">
            <p>
              The site and its content are provided &ldquo;as is&rdquo;.
              ArchFlow makes no warranties as to accuracy, completeness, or
              fitness for any particular purpose. Statements about capabilities
              or outcomes are illustrative and not contractual.
            </p>
          </Block>
          <Block heading="Limitation of liability">
            <p>
              To the maximum extent permitted by law, ArchFlow shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of this site.
            </p>
          </Block>
          <Block heading="Governing law">
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of the courts at
              Chandigarh.
            </p>
          </Block>
          <Block heading="Contact">
            <p>
              Questions about these terms? Write to harsh@archflow.co.in.
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
