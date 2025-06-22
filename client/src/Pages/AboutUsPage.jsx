import React from 'react';
import { Users } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">About QuoteLKaro</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Section title="Who We Are">
            <p><strong>QuoteLKaro</strong> is a next-generation SaaS platform built to simplify quote and estimate creation for creative professionals, freelancers, and businesses.</p>
            <p>Whether you're a photography studio, event manager, or service provider — we empower you to generate professional, branded estimates effortlessly.</p>
          </Section>

          <Section title="Our Mission">
            <p>Our mission is to democratize access to streamlined quoting tools by combining simplicity, personalization, and smart automation.</p>
            <p>We believe everyone deserves a fast, beautiful, and accurate quoting experience without the complexity of spreadsheets or expensive tools.</p>
          </Section>

          <Section title="What We Offer">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>🧾 Create fully customized estimates in minutes</li>
              <li>🎨 Use professionally designed themes that reflect your brand</li>
              <li>📥 Share PDFs instantly or via client portal</li>
              <li>📊 Track credits, analytics, and client interactions</li>
              <li>🔐 Hosted securely with regular backups & SSL encryption</li>
            </ul>
          </Section>

          <Section title="Why Creators Love Us">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Speed:</strong> Drag, drop, and send quotes in seconds</li>
              <li><strong>Design:</strong> Clean templates that wow clients</li>
              <li><strong>Control:</strong> Manage plans, credits, and service lists easily</li>
              <li><strong>Support:</strong> Friendly human help whenever you need it</li>
            </ul>
          </Section>

          <Section title="Meet the Makers">
            <p>QuoteLKaro is founded by passionate engineers and creators who understand the day-to-day struggles of running a service business. We’re building QuoteLKaro to solve real problems we’ve faced ourselves.</p>
          </Section>

          <Section title="Built in India, Loved Globally">
            <p>We are proudly based in India 🇮🇳, and we serve businesses and creatives across the world. From local vendors to international studios — our tools scale with your ambitions.</p>
          </Section>

          <Section title="Let’s Connect">
            <p>We love talking to our users and growing with your feedback.</p>
            <p>Email: <strong>quotekaro.official@gmail.com</strong><br />
              Phone: <strong>+91 7877571101</strong><br />
              Address: <em>3v/1 Prabhat Nagar, Udaipur, Rajasthan, India </em><br />
              Hours: Monday – Friday, 9:00 AM – 6:00 PM IST
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
