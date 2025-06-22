import React from 'react';
import { RefreshCw } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center">
            <RefreshCw className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Policy</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <Section title="1. Our Commitment">
            <p>
              At QuoteKaro, we are committed to delivering a smooth and valuable experience to all users. 
              If you're unsatisfied or face any issue, our team will work to make it right.
            </p>
          </Section>

          <Section title="2. Refund Eligibility">
            <p>Refunds may be considered under the following conditions:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Failure to deliver paid services due to system error.</li>
              <li>Duplicate payments caused by technical error.</li>
              <li>Accidental or unauthorized purchases (reported within 7 days).</li>
            </ul>
          </Section>

          <Section title="3. Non-Refundable Items">
            <p>Refunds will not be issued in the following scenarios:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Credits already used or partially used.</li>
              <li>Plans that have been active for more than 7 days.</li>
              <li>Requests beyond the 7-day eligibility window.</li>
              <li>Inability to use the product due to user-side technical issues.</li>
            </ul>
          </Section>

          <Section title="4. Refund Process">
            <p>To initiate a refund, contact us at <strong>quotekaro.official@gmail.com</strong> within 7 days of your transaction.</p>
            <p>
              Include your registered email, transaction ID, and a clear reason for the refund request. Refunds, if approved, will be processed within 5–10 business days to your original payment method.
            </p>
          </Section>

          <Section title="5. Subscription Cancellations">
            <p>
              You may cancel your subscription anytime from your account dashboard. Your plan will remain active until the end of the billing cycle.
            </p>
            <p><strong>No partial refunds</strong> will be given for unused time or credits.</p>
          </Section>

          <Section title="6. Contact Us">
            <p>For questions, concerns, or refund requests:</p>
            <p>
              📧 Email: <strong>quotekaro.official@gmail.com</strong><br />
              
              ⏱️ Response time: 24–48 working hours
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
