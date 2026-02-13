import React from 'react';

const Privacy = () => {
  const sections = [
    {
      title: 'Introduction',
      content: 'Welcome to QuickShow. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website and services.'
    },
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, book tickets, or contact us. This may include your name, email address, phone number, payment information, and booking preferences. We also automatically collect certain information about your device and how you interact with our service, including IP addresses, browser type, and pages viewed.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to: Process your bookings and payments, Provide customer support, Send you updates and promotional content, Improve our services and user experience, Detect and prevent fraud, and Comply with legal obligations.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We may share your information with: Payment processors to process transactions, Email service providers to send communications, Analytics providers to improve our services, and Law enforcement when required by law.'
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You can manage your account settings or contact us to exercise these rights. You may also opt out of promotional communications at any time.'
    },
    {
      title: 'Cookies',
      content: 'We use cookies to enhance your experience on our website. These help us remember your preferences, understand user behavior, and personalize content. You can disable cookies through your browser settings.'
    },
    {
      title: 'Third-Party Links',
      content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.'
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@quickshow.com or write to us at the address provided on our Contact page.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-red-100 mt-4 text-lg">Last updated: February 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg mb-12 leading-relaxed">
            QuickShow ("we", "us", "our") values your privacy and is committed to being transparent about how we collect and use your data. Please read this Privacy Policy carefully to understand our practices.
          </p>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-8">
                <h2 className="text-2xl font-bold text-white mb-4">{index + 1}. {section.title}</h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 p-8 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">
              <strong>Note:</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top of this policy. Your continued use of QuickShow following the posting of revised Privacy Policy means that you accept and agree to the changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;