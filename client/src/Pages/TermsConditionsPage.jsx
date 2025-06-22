import React from 'react';
import { FileText } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using QuoteKaro ("Service"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the platform.
            </p>
          </Section>

          <Section title="2. Service Description">
            <p>
              QuoteKaro is a SaaS platform that allows studios and businesses to create professional estimates, manage clients, and track credits. All features are subject to the user’s selected plan.
            </p>
          </Section>

          <Section title="3. Account Registration">
            <p>
              To use certain features, you must register an account and provide accurate information. You are solely responsible for maintaining the confidentiality of your credentials and for any activity under your account.
            </p>
          </Section>

          <Section title="4. Subscription & Payments">
            <p>
              Access to premium features requires a valid subscription or credit purchase. All payments are securely processed via Razorpay or authorized third-party gateways.
            </p>
            <p>
              Prices may change at our discretion. We will notify users of any changes before they become effective.
            </p>
          </Section>

          <Section title="5. Refund & Cancellation Policy">
            <p>
              Credits and subscription fees are generally non-refundable once purchased. However, you may contact our support team in case of duplicate or failed transactions for assistance.
            </p>
            <p>
              QuoteKaro reserves the right to suspend or terminate accounts in case of abuse, fraudulent activity, or violation of these terms.
            </p>
          </Section>

          <Section title="6. Data Usage & Privacy">
            <p>
              Your data is used only to provide and improve the services. By using the platform, you agree to our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>.
            </p>
            <p>
              We implement reasonable security measures to protect user data but cannot guarantee 100% security.
            </p>
          </Section>

          <Section title="7. User Conduct">
            <p>
              You agree not to misuse the platform, upload illegal content, or disrupt platform performance. Any misuse may lead to account suspension.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content, logos, designs, and code associated with QuoteKaro are the intellectual property of the company. You may not reuse or distribute them without written permission.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              QuoteKaro shall not be liable for any indirect, incidental, or consequential damages arising from use of the platform. Our maximum liability is limited to the amount paid by you in the past 3 months.
            </p>
          </Section>

          <Section title="10. Termination & Suspension">
            <p>
              We reserve the right to suspend or terminate your access at any time for violation of these terms or for suspicious activity, without prior notice.
            </p>
          </Section>

          <Section title="11. Changes to the Terms">
            <p>
              These Terms may be updated occasionally. Continued use of the platform after updates constitutes your acceptance of the new Terms.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              For any questions regarding these Terms, contact us at:
            </p>
            <p>
              Email: quotekaro.official@gmail.com <br />
              
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
