import React from 'react';
import { Shield } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <Section title="Overview">
            <p>
              This Privacy Policy explains how QuoteKaro (“we”, “our”, or “us”) collects, uses, and protects your personal data when you use our platform. Your trust is important to us, and we are committed to safeguarding your information.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              We collect information you provide directly such as name, email address, phone number, studio/business name, and billing details. We also collect technical data such as IP address, browser type, and interaction history for security and analytics purposes.
            </p>
            <p>
              If you use Razorpay for payments, your payment information is securely handled by Razorpay in accordance with their <a href="https://razorpay.com/privacy/" className="text-blue-600 underline" target="_blank">Privacy Policy</a>. We do not store your credit/debit card details.
            </p>
          </Section>

          <Section title="How We Use Your Data">
            <p>
              We use your information to:
            </p>
            <ul className="list-disc pl-6">
              <li>Create and manage your QuoteKaro account</li>
              <li>Generate and share client estimates and invoices</li>
              <li>Process payments securely via third-party gateways</li>
              <li>Send transactional and promotional updates</li>
              <li>Analyze usage to improve our platform features</li>
            </ul>
          </Section>

          <Section title="Data Sharing & Disclosure">
            <p>
              We never sell or rent your personal data. We may share your information with:
            </p>
            <ul className="list-disc pl-6">
              <li>Trusted third-party providers (like payment gateways or analytics tools)</li>
              <li>Government or legal authorities if required by law</li>
            </ul>
            <p>
              All such sharing is done with strict confidentiality and only as necessary for operations.
            </p>
          </Section>

          <Section title="Data Retention & Security">
            <p>
              Your data is stored on secure, access-controlled servers. We retain data only as long as necessary for legal and operational purposes.
            </p>
            <p>
              We follow industry-standard encryption and security protocols to protect against unauthorized access or misuse.
            </p>
          </Section>

          <Section title="User Rights & Control">
            <p>
              You have full rights to access, correct, or delete your personal data. You can update profile details from your dashboard or write to us for assistance.
            </p>
            <p>
              You may also unsubscribe from promotional communications at any time.
            </p>
          </Section>

          <Section title="Cookies & Tracking">
            <p>
              QuoteKaro uses cookies to enhance user experience, remember preferences, and collect usage analytics. You may disable cookies from your browser settings, but some features may not function properly.
            </p>
          </Section>

          <Section title="Changes to this Policy">
            <p>
              We may update this policy from time to time to reflect platform improvements or legal requirements. We will notify users of significant changes via email or dashboard alert.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              For questions, data access requests, or complaints, you can contact us at:
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

export default PrivacyPolicyPage;
