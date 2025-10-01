// app/(site)/privacy-policy/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy — Sufety Games",
  description:
    "How Sufety Games collects, uses and protects data. Email usage, cookies, security, and contact info.",
};

// опционально: убирает SSG и любые попытки пререндерить
export const revalidate = 0;
export const dynamic = "force-dynamic";

function Content() {
  return (
    <main className="relative py-24 pt-48 overflow-hidden z-1 double-page">
      <div className="container prose prose-invert max-w-none">
        <h1>Welcome to sufety.com</h1>
        <p>
          This Privacy Policy outlines how we collect, use, and protect your personal information.
          By using the Website, you consent to the practices described herein. If you do not agree,
          please refrain from using the Website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect the email addresses provided by users who choose to subscribe to our promotional
          emails. We do not collect any personally identifiable information beyond email addresses.
        </p>

        <h2>Use of Information</h2>
        <p>
          The email addresses collected are used solely for the purpose of sending occasional
          promotional emails containing offers provided by third-party websites. We do not sell or
          expose your personal information to any third parties.
        </p>

        <h2>Unsubscribing from Emails</h2>
        <p>
          You can unsubscribe at any time by clicking the &quot;unsubscribe&quot; link at the bottom
          of every promotional email. Your request will be processed within 10 business days.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction. However, no transmission or
          storage is entirely secure, and we cannot guarantee absolute security.
        </p>

        <h2>Cookies and Tracking</h2>
        <p>
          The Website may use cookies and similar tracking technologies to enhance user experience
          and gather non-personal information about user activities. This is used for analytics and
          to improve content and functionality.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Bonus sufety.com is not intended for individuals under 18. We do not knowingly collect
          personal information from individuals under 18. If you believe we have collected such
          information, please contact us to remove it promptly.
        </p>

        <h2>Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this
          page with an updated effective date. Please review periodically.
        </p>

        <h2>Contact Us</h2>
        <p>
          For questions or requests related to your personal information or this Privacy Policy,
          email us at <a href="mailto:support@sufety.com">support@sufety.com</a>.
        </p>
      </div>
    </main>
  );
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}