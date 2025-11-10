'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoveIcon from '@/assets/home/images/love.svg';
import LeftRoseImage from '@/assets/home/images/register-rose-left.png';
import RightRoseImage from '@/assets/home/images/register-rose-right.png';
import GreenRose from '@/assets/home/images/green-rose.svg';

interface Registration {
  email: string;
  token: string;
  submitted: boolean;
  createdAt: string;
  updatedAt: string;
  link: string;
  fullName: string;
  title: string;
  office: string;
  country: string;
  numberOfChildren: string;
  date: string;
  day: string;
}

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted'>('pending');

  // Normalize link to point to home page with token as dynamic path
  const normalizeLink = (link: string, token: string): string => {
    try {
      const url = new URL(link);
      // Always construct invitation link with token as dynamic path
      return `${url.origin}/invitation/${token}`;
    } catch {
      // If URL parsing fails, construct from token
      if (typeof window !== 'undefined') {
        return `${window.location.origin}/invitation/${token}`;
      }
      // Server-side fallback
      return `/invitation/${token}`;
    }
  };

  // Fetch all registrations
  const fetchRegistrations = async () => {
    try {
      setLoadingList(true);
      const response = await fetch('/api/get-all-registrations', {
        cache: 'no-store',
      });
      const data = await response.json();

      if (response.ok) {
        // Normalize all links to ensure they're in the path format
        const normalizedRegistrations = (data.registrations || []).map((reg: Registration) => ({
          ...reg,
          link: normalizeLink(reg.link, reg.token),
        }));
        setRegistrations(normalizedRegistrations);
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Clear email
      setEmail('');
      setSuccess('Invitation link generated successfully!');
      
      // Add the new registration to the existing list (at the beginning since it's newest)
      if (data.token && data.email) {
        const newRegistration: Registration = {
          email: data.email,
          token: data.token,
          submitted: data.submitted || false,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          link: normalizeLink(data.link || `${window.location.origin}/invitation/${data.token}`, data.token),
          fullName: data.fullName || '',
          title: data.title || '',
          office: data.office || '',
          country: data.country || '',
          numberOfChildren: data.numberOfChildren || '',
          date: data.date || '',
          day: data.day || '',
        };
        
        // Add to the beginning of the list
        setRegistrations(prev => [newRegistration, ...prev]);
      }
      
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to verify email. Please try again.');
      setLoading(false);
    }
  };

  const copyToClipboard = (link: string, token: string) => {
    navigator.clipboard.writeText(link);
    // Use token as identifier since it's unique
    const tokenIndex = registrations.findIndex(r => r.token === token);
    setCopiedIndex(tokenIndex);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30 px-5 py-8 md:py-12 relative overflow-hidden">
      {/* Decorative rose images */}
      <Image
        src={RightRoseImage}
        alt="rose"
        className="absolute top-0 right-0 h-[200px] w-[150px] md:w-[300px] md:h-[400px] pointer-events-none opacity-20"
      />
      <Image
        src={LeftRoseImage}
        alt="rose"
        className="absolute bottom-0 left-0 w-[150px] h-[200px] md:w-[300px] md:h-[400px] pointer-events-none opacity-20"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-c136207 font-greatvibes-400 text-3xl md:text-4xl mb-6">
            Oluwadoyinsola & Oluwaseyi
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-c136207 font-greatvibes-400 text-5xl md:text-7xl">
              Invitation
            </h1>
            <div className="h-[50px] md:h-[70px] w-[53px] md:w-[74px]">
              <Image
                src={LoveIcon}
                alt="love"
                className="h-full w-full"
                height={70}
                width={74}
              />
            </div>
            <h1 className="text-c136207 font-greatvibes-400 text-5xl md:text-7xl">
              Links
            </h1>
          </div>
          <p className="text-c136207 font-nunito-400 text-lg md:text-xl max-w-2xl mx-auto">
            Create and manage invitation links for your wedding guests
          </p>
        </div>

        {/* Generate New Link Form */}
        <div className="bg-white/80 backdrop-blur-sm border border-c136207/20 rounded-3xl p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-c136207 font-nunito-700 text-xl md:text-2xl mb-6">
            Generate New Invitation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-c136207 font-nunito-600 text-sm mb-2">
                Guest Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter guest email address"
                required
                className="w-full px-4 py-3 border border-c136207 outline-none rounded-[100px] bg-white text-c136207 font-nunito-400 text-sm focus:border-c136207 focus:ring-2 focus:ring-c136207/20 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-nunito-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm font-nunito-400">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-c136207 text-white font-nunito-600 py-3 rounded-[100px] hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Generating...' : 'Generate Invitation Link'}
            </button>
          </form>
        </div>

        {/* List of Invitation Links */}
        <div className="bg-white/80 backdrop-blur-sm border border-c136207/20 rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-c136207 font-nunito-700 text-xl md:text-2xl">
              All Invitation Links
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-c136207 font-nunito-400">
                Total: {registrations.length}
              </span>
              <span className="text-sm text-green-600 font-nunito-400">
                Accepted: {registrations.filter(r => r.submitted).length}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-c136207/10">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 font-nunito-600 text-sm md:text-base transition-all duration-300 relative ${
                activeTab === 'pending'
                  ? 'text-c136207'
                  : 'text-cb0b0b0 hover:text-c136207'
              }`}
            >
              Pending Invitations
              {activeTab === 'pending' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-c136207"></div>
              )}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-nunito-600">
                {registrations.filter(r => !r.submitted).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`px-6 py-3 font-nunito-600 text-sm md:text-base transition-all duration-300 relative ${
                activeTab === 'accepted'
                  ? 'text-c136207'
                  : 'text-cb0b0b0 hover:text-c136207'
              }`}
            >
              Accepted Invitations
              {activeTab === 'accepted' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-c136207"></div>
              )}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-nunito-600">
                {registrations.filter(r => r.submitted).length}
              </span>
            </button>
          </div>

          {loadingList ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-c136207"></div>
              <p className="text-c136207 font-nunito-400 mt-4">Loading invitations...</p>
            </div>
          ) : (() => {
            const filteredRegistrations = registrations.filter(reg => 
              activeTab === 'pending' ? !reg.submitted : reg.submitted
            );
            
            return filteredRegistrations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {activeTab === 'pending' ? '💌' : '✅'}
                </div>
                <p className="text-cb0b0b0 font-nunito-400 text-lg">
                  {activeTab === 'pending' 
                    ? 'No pending invitations' 
                    : 'No accepted invitations yet'}
                </p>
                <p className="text-cb0b0b0 font-nunito-400 text-sm mt-2">
                  {activeTab === 'pending'
                    ? 'All invitations have been accepted'
                    : 'Invitations will appear here once guests accept them'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {filteredRegistrations.map((reg, index) => (
                <div
                  key={reg.token}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    reg.submitted
                      ? 'bg-gradient-to-br from-green-50 via-emerald-50/30 to-white border-2 border-green-200/60 shadow-lg'
                      : 'bg-gradient-to-br from-white via-rose-50/20 to-white border-2 border-rose-200/40 hover:border-rose-300/60 hover:shadow-xl'
                  }`}
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-c136207/10 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-c136207/10 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-c136207/10 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-c136207/10 rounded-br-2xl"></div>
                  
                  {/* Flower decorations */}
                  <div className="absolute top-4 right-4 w-12 h-12 opacity-20 pointer-events-none">
                    <Image
                      src={GreenRose}
                      alt="flower"
                      className="w-full h-full"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 opacity-20 pointer-events-none rotate-180">
                    <Image
                      src={GreenRose}
                      alt="flower"
                      className="w-full h-full"
                      width={40}
                      height={40}
                    />
                  </div>
                  
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-col gap-5">
                      {/* Header Section */}
                      <div className="text-center border-b-2 border-c136207/10 pb-5 mb-5">
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <div className="w-8 h-8 opacity-30">
                            <Image
                              src={GreenRose}
                              alt="flower"
                              className="w-full h-full"
                              width={32}
                              height={32}
                            />
                          </div>
                          <h3 className="text-c136207 font-greatvibes-400 text-3xl md:text-4xl">
                            Wedding Invitation
                          </h3>
                          <div className="w-8 h-8 opacity-30">
                            <Image
                              src={GreenRose}
                              alt="flower"
                              className="w-full h-full"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xl">📧</span>
                            <p className="text-c136207 font-nunito-700 text-base md:text-lg truncate">
                              {reg.email}
                            </p>
                          </div>
                          <span
                            className={`px-5 py-2 rounded-full text-sm font-nunito-600 whitespace-nowrap ${
                              reg.submitted
                                ? 'bg-green-100 text-green-700 border-2 border-green-300 shadow-sm'
                                : 'bg-amber-100 text-amber-700 border-2 border-amber-300 shadow-sm'
                            }`}
                          >
                            {reg.submitted ? '✓ Invitation Accepted' : '⏳ Pending'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Invitation Link Section */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-c136207/20">
                        <label className="block text-c136207 font-nunito-600 text-sm mb-3">
                          Invitation Link
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <input
                            type="text"
                            value={normalizeLink(reg.link, reg.token)}
                            readOnly
                            className="flex-1 px-5 py-3 border border-c136207/30 rounded-lg bg-white text-c136207 font-nunito-400 text-sm md:text-base focus:outline-none focus:border-c136207"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(normalizeLink(reg.link, reg.token), reg.token)}
                            className="px-8 py-3 bg-c136207 text-white font-nunito-600 text-sm md:text-base rounded-lg hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md"
                          >
                            {copiedIndex === registrations.findIndex(r => r.token === reg.token) ? '✓ Copied!' : 'Copy Link'}
                          </button>
                        </div>
                      </div>
                      
                      
                      {/* Registration Details Section */}
                      {reg.submitted && (
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-c136207/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-6 opacity-40">
                              <Image
                                src={GreenRose}
                                alt="flower"
                                className="w-full h-full"
                                width={24}
                                height={24}
                              />
                            </div>
                            <p className="text-c136207 font-nunito-700 text-base md:text-lg">Guest Information</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {reg.fullName && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Full Name</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.fullName}</span>
                              </div>
                            )}
                            {reg.title && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Title</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.title}</span>
                              </div>
                            )}
                            {reg.office && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Office</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.office}</span>
                              </div>
                            )}
                            {reg.country && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Country</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.country}</span>
                              </div>
                            )}
                            {reg.numberOfChildren && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Number of Children</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.numberOfChildren}</span>
                              </div>
                            )}
                            {reg.day && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Day</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.day}</span>
                              </div>
                            )}
                            {reg.date && (
                              <div className="flex flex-col">
                                <span className="text-cb0b0b0 font-nunito-400 text-sm mb-1.5">Wedding Attendance Date</span>
                                <span className="text-c136207 font-nunito-600 text-base">{reg.date}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Footer with dates */}
                      <div className="flex items-center justify-center gap-4 text-sm text-cb0b0b0 font-nunito-400 pt-5 border-t-2 border-c136207/10">
                        <span>Created: {new Date(reg.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                        {reg.submitted && (
                          <>
                            <span className="text-c136207/30">•</span>
                            <span>Accepted: {new Date(reg.updatedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
