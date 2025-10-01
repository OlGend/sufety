// app/(site)/privacy-policy/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Terms and conditions — Sufety Games",
  description:
    "How Sufety Games collects, uses and protects data. Email usage, cookies, security, and contact info.",
};

// опционально: убирает SSG и любые попытки пререндерить
export const revalidate = 0;
export const dynamic = "force-dynamic";

function Content() {

  return (
    <main className="relative py-24 pt-48 overflow-hidden z-1 double-page">

      <div className="container">
        <h1 className="mb-6">Welcome to sufety.com</h1>
        <p className="mb-3">
          Where you have the opportunity to get spins in the Fortune Wheel that
          can be easily converted into real money and withdrawn to your crypto
          wallet. Our platform offers a transparent and straightforward process
          for accumulating and utilising these points. Earning points is a
          seamless experience. Engage in various activities across our casino
          brands and participate in promotions to accumulate free spins. Simply
          visit the Fortune Wheel page and select a site where you haven&apos;t
          registered yet. Upon making a deposit and playing on the chosen brand,
          you will automatically receive free spins within 24 hours.
        </p>
        <p className="mb-3">
          With every new first deposit, delight in 50 spins on the Fortune
          Wheel. Each spin carries the promise of yielding between 0.2 USD to
          0.4 USD in the Fortune Wheel. Minimum withdrawal limits depend on the
          withdrawal method you choose. Effortlessly initiate withdrawals by
          visiting the &apos;Withdrawal Request&apos; page and placing your order.
          Withdrawals are available after your next deposit of 30 USD, 25 EUR,
          45 AUD, 40 CAD, or the equivalent, to any of the ‘Fortune Wheel
          brands’ casinos. Stay updated on payment status through our live chat
          support. Embrace our community today and unlock a world of benefits!
        </p>
        <h2 className="mb-6">Terms and Conditions</h2>
        <p className="mb-3">
          These terms and conditions (&apos;Terms&apos;) govern your participation in the
          rewards and cashback program (&apos;Program&apos;) offered by sufety.com (&apos;we,&apos;
          &apos;us,&apos; or &apos;our&apos;). By participating in the Program, you agree to abide
          by these Terms. Please read them carefully.
        </p>
        <h2 className="mb-3">Deposit Requirements:</h2>
        <p className="mb-3">
          1.1. In order for your deposit to be considered qualified, it must be
          equal to or greater than 30 USD, 25 EUR, 45 AUD, 40 CAD, or the
          equivalent amount in other currencies.
        </p>
        <p className="mb-3">
          1.2. We credit spins only upon receiving deposit-related information.
          However, this may not occur due to reasons such as cookie issues,
          which could affect spin crediting across certain platforms or brands.
          Therefore, it&apos;s always advisable, before navigating from our &apos;Fortune
          Wheel&apos; page to register on any brand, to clear your cookie files to
          avoid any situations related to non-accreditation of free spins
        </p>
        <h2 className="mb-6">Withdrawal Process:</h2>
        <p className="mb-3">
          2.1 Please note that all blockchain commissions for your withdrawals
          are on your shoulders. You will eventually receive the amount left
          after deducting the actual commissions at the moment of the
          transaction.
        </p>
        <h2 className="mb-6">Limitations on Winnings:</h2>
        <p className="mb-3">
          3.1. Please note that a player cannot withdraw more than the amount
          they have deposited on the brands associated with sufety.com Our
          project serves as a cashback tool and not a source of income.
        </p>
        <p className="mb-3">
          3.2. Confirmation of spin allocation solely relies on our email
          notification. We reserve the right to credit or withhold any amount of
          spins at our discretion for any user activity.
        </p>
        <h2 className="mb-6">Abuse and Violation of Terms:</h2>
        <p className="mb-3">
          4.1. Any attempt to abuse or violate our terms and conditions will
          result in the immediate blocking of the player&apos;s account and deduction
          of their funds. Eligible Brands:
        </p>
        <p className="mb-3">
          5.1. All rewards for a player&apos;s activity are available only if that
          activity takes place on one of the brands listed in the &apos;Fortune
          Wheel&apos; section on our platform.
        </p>
        <h2 className="mb-6">Support Chat Information:</h2>
        <p className="mb-3">
          6.1. All information received through the support chat is provided for
          informational purposes only and should not be considered a public
          offering.
        </p>
        <h2 className="mb-6">Contact Information:</h2>
        <p className="mb-3">
          7.1. For further inquiries regarding your account balance,
          withdrawals, or any other related information, please contact us via
          email at support@sufety.com.
        </p>
        <p className="mb-3">
          By participating in the Program, you acknowledge that you have read,
          understood, and agreed to these Terms. We reserve the right to modify
          or terminate the Program or these Terms at any time without prior
          notice. It is your responsibility to review these Terms regularly to
          stay informed of any updates or changes. Your continued participation
          in the Program after any modifications indicates your acceptance of
          the revised Terms.
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