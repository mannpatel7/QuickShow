import React from 'react';

const AboutUs = () => {
  const values = [
    {
      icon: '🎬',
      title: 'Movie Passion',
      description: 'We love cinema and believe in making movie experiences accessible to everyone.'
    },
    {
      icon: '⚡',
      title: 'Fast & Easy',
      description: 'Our streamlined booking process lets you reserve tickets in seconds.'
    },
    {
      icon: '🛡️',
      title: 'Secure',
      description: 'Your data and transactions are protected with industry-leading security standards.'
    },
    {
      icon: '🤝',
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide 24/7 customer support.'
    }
  ];

  const stats = [
    { number: '500K+', label: 'Happy Customers' },
    { number: '100+', label: 'Partner Cinemas' },
    { number: '10M+', label: 'Tickets Sold' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const team = [
    {
      name: 'John Anderson',
      role: 'Founder & CEO',
      image: '👨‍💼'
    },
    {
      name: 'Sarah Mitchell',
      role: 'VP of Technology',
      image: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'VP of Operations',
      image: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Support',
      image: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">About QuickShow</h1>
          <p className="text-red-100 mt-4 text-lg">Your gateway to unforgettable cinema experiences</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            QuickShow was founded in 2020 with a simple vision: to revolutionize how people book movie tickets. We recognized that the movie-going experience should be as enjoyable as the movie itself.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Starting as a small startup in a garage, we've grown into a leading online ticket booking platform serving over 500,000 customers across hundreds of cinemas. Our journey has been driven by our commitment to innovation, reliability, and exceptional customer service.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Today, QuickShow continues to evolve, introducing new features, expanding our network of partner cinemas, and setting new standards in the entertainment ticketing industry.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">{stat.number}</div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 text-center">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-300 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="text-8xl mb-6 text-center">{member.image}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-red-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gray-800 p-12 rounded-lg border border-red-500">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            To transform the movie booking experience by providing a seamless, secure, and enjoyable platform that connects cinema lovers with their favorite films. We are committed to making entertainment accessible, affordable, and unforgettable for everyone.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Magic?</h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts who are already using QuickShow to discover and book their favorite movies with ease.
          </p>
          <a href="/movies" className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300">
            Browse Movies Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;