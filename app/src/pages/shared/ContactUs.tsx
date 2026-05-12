import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Tina Rathore',
      email: 'rathoretina07@gmail.com',
      role: 'Full Stack Developer',
      avatar: 'TR',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      name: 'Bhavya Bindal',
      email: 'bhavyabindal2005@gmail.com',
      role: 'UI/UX Designer & Developer',
      avatar: 'BB',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary/10 via-surface to-secondary/10 pt-20 pb-16 px-gutter text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-sm text-primary hover:text-secondary transition-colors mb-lg font-semibold"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Home
        </button>
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-sm bg-primary-container/20 text-primary px-4 py-2 rounded-full font-label-caps text-label-caps mb-lg border border-primary/20">
            <span className="material-symbols-outlined text-sm">favorite</span>
            Made with passion in 2026
          </div>
          <h1 className="font-h1 text-h1 text-on-surface mb-md">Get in Touch</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
            Have questions about TenantEase? We'd love to hear from you. Reach out to our team directly.
          </p>
        </div>
      </div>

      {/* Team Cards */}
      <div className="max-w-3xl mx-auto px-gutter py-xl">
        <h2 className="font-h2 text-h2 text-on-surface text-center mb-xl">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {team.map((member) => (
            <div
              key={member.email}
              className="bg-surface-container-lowest rounded-2xl p-xl border border-outline-variant/20 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mb-md shadow-lg group-hover:scale-105 transition-transform`}>
                {member.avatar}
              </div>
              <h3 className="font-h3 text-h3 text-on-surface mb-1">{member.name}</h3>
              <p className="font-body-sm text-body-sm text-primary font-semibold mb-md">{member.role}</p>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors group/link"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center group-hover/link:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-sm">mail</span>
                </div>
                <span className="font-body-sm text-body-sm">{member.email}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Project Info */}
        <div className="mt-xl bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-xl border border-primary/10 text-center">
          <div className="flex items-center justify-center gap-sm mb-md">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <span className="font-h2 text-h2 text-on-surface">TenantEase</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-md max-w-lg mx-auto">
            A modern property management platform built with React, Node.js, Express, Prisma, and SQLite.
            Designed for managers and tenants to collaborate seamlessly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-sm">
            {['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'SQLite'].map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps border border-outline-variant/30">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-lg font-body-sm text-body-sm text-outline">
            © 2026 TenantEase · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
