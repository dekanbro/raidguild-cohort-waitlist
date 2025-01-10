'use client';
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Brain, Users, Castle, Bot, Workflow } from 'lucide-react'
import { DiscIcon as Discord, X, VolumeX, Volume2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm"></p>
          </div>
          <div className="flex space-x-6">
            <SocialLink href="https://discord.gg/dRygQSSFk3" icon={<Discord size={20} />} label="Discord" />
            <SocialLink href="https://twitter.com/raidguild" icon={<X size={20} />} label="X" />
            <SocialLink href="https://warpcast.com/raidguild" icon={<WIcon size={20} />} label="Warpcast" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function WIcon({ size = 20 }: { size?: number }) {
  return (
    <div 
      style={{ width: size, height: size }} 
      className="flex items-center justify-center font-bold"
    >
      W
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
      <span className="sr-only">{label}</span>
      {icon}
    </Link>
  )
}

function EmailForm() {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, handle, type: 'waitlist' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
      setHandle('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-white/50 border-white/30 text-white placeholder:text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <Input
        type="text"
        placeholder="Enter your Discord handle"
        className="bg-white/50 border-white/30 text-white placeholder:text-white"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        disabled={status === 'loading'}
        required
      />  
      <Button 
        type="submit" 
        variant="secondary" 
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
      </Button>
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

function SpeakerForm() {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [topic, setTopic] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,handle, topic, type: 'speaker' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setStatus('success');
      setMessage('Thanks for registering as a speaker!');
      setEmail('');
      setHandle('');
      setTopic('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-white/50 border-white/30 text-white placeholder:text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <Input
        type="text"
        placeholder="Enter your Discord handle"
        className="bg-white/50 border-white/30 text-white placeholder:text-white"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <Textarea
        placeholder="What would you like to speak about? If you just want to mentor, please say so."
        className="bg-white/50 border-white/30 text-white placeholder:text-white min-h-[100px]"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={status === 'loading'}
        required
      />
      <Button 
        type="submit" 
        variant="secondary" 
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Registering...' : 'Register as Speaker'}
      </Button>
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}

function FormContainer() {
  const [formType, setFormType] = useState<'waitlist' | 'speaker'>('waitlist');

  return (
    <div className="w-full max-w-xs sm:max-w-sm">
      <div className="flex gap-2 mb-4">
        <Button
          variant={formType === 'waitlist' ? 'secondary' : 'ghost'}
          onClick={() => setFormType('waitlist')}
          className="flex-1"
        >
          Join Waitlist
        </Button>
        <Button
          variant={formType === 'speaker' ? 'secondary' : 'ghost'}
          onClick={() => setFormType('speaker')}
          className="flex-1"
        >
          Register as Speaker
        </Button>
      </div>
      {formType === 'waitlist' ? <EmailForm /> : <SpeakerForm />}
    </div>
  );
}

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: isMuted ? 'unMute' : 'mute'
        }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Hero Section */}
<section className="relative h-screen">
  <div className="absolute inset-0 w-full h-full">
    <iframe
      ref={iframeRef}
      className="w-full h-full object-cover"
      src="https://www.youtube.com/embed/w7YHz5-dJF8?autoplay=1&mute=1&loop=1&playlist=w7YHz5-dJF8&controls=0&showinfo=0&rel=0&enablejsapi=1&playsinline=1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ pointerEvents: 'none' }}
    ></iframe>
  </div>
  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-end text-center p-4 pb-8 sm:pb-16 md:pb-24">
  <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>
    <div className="flex flex-col items-center mb-4 sm:mb-8">

      <p className="text-lg sm:text-xl md:text-2xl px-4 sm:px-0">RaidGuild Cohort VIII</p>
    </div>
    <FormContainer />
  </div>
</section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Discover The Cohort</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Brain className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Agent Frameworks"
              description="Learn to build and deploy autonomous AI agents using modern frameworks like LangChain, AutoGPT, and PydanticAi."
            />
            <FeatureCard
              icon={<Bot className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Vertical Agents"
              description="Develop specialized AI agents for specific industries and use cases, from customer service to data analysis."
            />
            <FeatureCard
              icon={<Workflow className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="AI Product Workflows"
              description="Master the end-to-end process of building AI products, from ideation to deployment and monitoring."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg text-center">
      <div className="mb-3 sm:mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-300">{description}</p>
    </div>
  )
}

