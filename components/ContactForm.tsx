'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Failed to send. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6  shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Say Hello to Olalifestyle !!</h2>
      <form 
      // onSubmit={handleSubmit}
      className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border text-yellow caret-yellow outline-none border-white/20 bg-white/20 rounded-2xl"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 border text-yellow caret-yellow outline-none border-white/20 bg-white/20 rounded-2xl"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-3 border text-yellow caret-yellow outline-none border-white/20 bg-white/20 rounded-2xl"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-yellow rounded-2xl text-white p-3  hover:bg-blue transition"
        >
          Send Message
        </button>
        <p className="text-center text-sm text-green-500">{status}</p>
      </form>
    </div>
  );
}
