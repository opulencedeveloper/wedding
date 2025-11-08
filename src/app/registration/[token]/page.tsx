'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

import LeftRoseImage from "@/assets/home/images/register-rose-left.png";
import RightRoseImage from "@/assets/home/images/register-rose-right.png";
import DropDownIcon from "@/assets/home/images/drop-down.svg";

interface AnimatedDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function AnimatedDropdown({ label, options, value, onChange, placeholder }: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-c136207 font-nunito text-sm mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border border-c136207 outline-none rounded-[100px] bg-white text-cb0b0b0 font-nunito-400 text-sm flex items-center justify-between pr-10"
        >
          <span className={value ? '' : 'text-cb0b0b0'}>{value || placeholder || 'Select...'}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 pointer-events-none"
          >
            <Image
              src={DropDownIcon}
              alt="dropdown"
              className="w-6 h-6"
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left text-c136207 font-nunito-400 text-sm hover:bg-green-50 ${
                    value === option ? 'bg-green-50' : ''
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RegistrationForm() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [office, setOffice] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('1');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'invalid' | 'used' | 'other' | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isGuestToken, setIsGuestToken] = useState(false);

  const titleOptions = ['Mr', 'Mrs.', 'Pastor', 'Deaconess', 'Deacon', 'Sister', 'Brother'];
  const officeOptions = ['Zonal Pastor', 'Group Pastor', 'Deacon', 'Deaconess', 'Pastor', 'SOM', 'Other'];
  const childrenOptions = ['0', '1', '2', '3', '4'];

  // Fetch registration data if token exists
  useEffect(() => {
    if (token) {
      // If token is "guest", show message without making API request
      if (token === 'guest') {
        setLoading(false);
        setIsValidToken(false);
        setIsGuestToken(true);
        setErrorType(null);
        setError('');
        return;
      }

      setLoading(true);
      setError('');
      fetch(`/api/get-registration?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            if (data.error === 'invalid_link') {
              setErrorType('invalid');
              setError('');
            } else if (data.error.includes('already submitted')) {
              setErrorType('used');
              setError(data.error);
            } else {
              setErrorType('other');
              setError(data.error);
            }
            setIsValidToken(false);
          } else {
            setIsValidToken(true);
            setIsGuestToken(false);
            setErrorType(null);
            setFullName(data.fullName || '');
            setTitle(data.title || '');
            setOffice(data.office || '');
            setEmail(data.email || '');
            setCountry(data.country || '');
            setNumberOfChildren(data.numberOfChildren || '1');
          }
        })
        .catch((err) => {
          setErrorType('other');
          setError('Failed to load registration data');
          setIsValidToken(false);
          setIsGuestToken(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsValidToken(false);
      setIsGuestToken(false);
      setErrorType('invalid');
      setError('');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    
    // Only clear error if it's not a validation error from token check
    if (!error.includes('not a valid invitation link') && !error.includes('already submitted')) {
      setError('');
    }

    if (!email) {
      setError('Email is required');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName,
          title,
          office,
          country,
          numberOfChildren,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit registration');
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setIsValidToken(false); // Prevent further submissions
      // Optionally redirect or show success message
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row md:h-dvh overflow-scroll md:overflow-hidden">
      <div className="h-[710px] border px-4 md:h-full w-full bg-c1c1c1e relative flex items-center justify-center">
        
         <Image
            src={RightRoseImage}
            alt="rose"
            className="absolute top-0 right-0 h-[288.81px] w-[219.35px] md:w-[345.93px] md:h-[455.47px] pointer-events-none"
          />
          <Image
            src={LeftRoseImage}
            alt="rose"
            className="absolute bottom-0 left-0 w-[219.35px] h-[288.81px] md:w-[345.93px] md:h-[455.47px] pointer-events-none"
          />
          <div className=" bg-black/29 max-w-[643px] w-full backdrop-blur-sm rounded-[20px] px-2.5 md:px-5.5 py-[140px] md:py-40 overflow-hidden relative z-10 flex flex-col items-center justify-center text-center">
       
            <h1 className="text-white font-greatvibes-400 text-[40px] md:text-6xl mb-4 leading-tight">
              Oluwadoyinsola & Oluwaseyi
            </h1>
            
            <p className="text-white font-nunito-400 leading-0 mt-2.5 text-lg md:text-xl">
              Saturday
            </p>
            <p className="text-white font-greatvibes-400 text-[40px] md:text-[54.84px] mb-3 leading-tight">
              October 12. 2025
            </p>
            
            <p className="text-white leading-0 mt-1 font-greatvibes-400 text-3xl">
              Toronto, Canada
            </p>
        </div>
      </div>
      <div className="h-full w-full bg-white flex items-center justify-center px-5 overflow-y-auto py-[51px]">
        <div className="w-full max-w-[384px] my-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-c136207 font-greatvibes-400 text-5xl md:text-[50px] mb-2.5">
              Kindly Register
            </h2>
            <p className="text-c136207 font-nunito-400 text-base md:text-lg">
              We can't wait to see you
            </p>
          </div>

          {/* Guest Token Message */}
          {isGuestToken && (
            <div className="text-center py-8 md:py-12">
              <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200/60 rounded-3xl p-8 md:p-10 shadow-xl">
                <div className="mb-6">
                  <div className="text-7xl mb-5">💌</div>
                  <h3 className="text-c136207 font-greatvibes-400 text-5xl md:text-6xl mb-4">
                    Welcome!
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-6"></div>
                </div>
                <p className="text-c136207 font-nunito-700 text-xl md:text-2xl mb-4">
                  Request Your Invitation Link
                </p>
                <p className="text-cb0b0b0 font-nunito-400 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6">
                  To register for our special day, please contact the wedding organizers to receive your personalized invitation link. We can't wait to celebrate with you!
                </p>
                <div className="mt-8 pt-6 border-t border-amber-200/50">
                  <p className="text-c136207 font-nunito-500 text-sm md:text-base mb-6">
                    📧 Please reach out to the wedding organizers to request your invitation link
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-c136207 text-white font-nunito-600 text-base rounded-[100px] hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invalid Link Message */}
          {errorType === 'invalid' && !isGuestToken && (
            <div className="text-center py-8 md:py-12">
              <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 border-2 border-rose-200/60 rounded-3xl p-8 md:p-10 shadow-xl">
                <div className="mb-6">
                  <div className="text-7xl mb-5 animate-bounce">💔</div>
                  <h3 className="text-c136207 font-greatvibes-400 text-5xl md:text-6xl mb-4">
                    Oops!
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6"></div>
                </div>
                <p className="text-c136207 font-nunito-700 text-xl md:text-2xl mb-4">
                  This invitation link is not valid
                </p>
                <p className="text-cb0b0b0 font-nunito-400 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6">
                  The link you're trying to access may have expired or doesn't exist. Please ask the wedding organizers for a valid invitation link.
                </p>
                <div className="mt-8 pt-6 border-t border-rose-200/50">
                  <p className="text-c136207 font-nunito-500 text-sm md:text-base mb-6">
                    💌 Please contact the wedding organizers to request an invitation link
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-c136207 text-white font-nunito-600 text-base rounded-[100px] hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Already Used Message */}
          {errorType === 'used' && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-c136207 font-greatvibes-400 text-4xl md:text-5xl mb-3">
                  Thank You!
                </h3>
                <p className="text-c136207 font-nunito-600 text-lg md:text-xl mb-2">
                  Your invitation has already been submitted
                </p>
                <p className="text-cb0b0b0 font-nunito-400 text-sm md:text-base max-w-md mx-auto mb-6">
                  We've already received your registration. We look forward to celebrating with you!
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="px-8 py-3 bg-c136207 text-white font-nunito-600 text-base rounded-[100px] hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* Other Error Message */}
          {errorType === 'other' && error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 text-center">
              <p className="text-red-600 text-base font-nunito-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-center py-8 md:py-12">
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200/60 rounded-3xl p-8 md:p-10 shadow-xl">
                <div className="mb-6">
                  <div className="text-7xl mb-5 animate-bounce">🎉</div>
                  <h3 className="text-c136207 font-greatvibes-400 text-5xl md:text-6xl mb-4">
                    Thank You!
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent mx-auto mb-6"></div>
                </div>
                <p className="text-c136207 font-nunito-700 text-xl md:text-2xl mb-4">
                  Your registration has been submitted successfully
                </p>
                <p className="text-cb0b0b0 font-nunito-400 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6">
                  We've received your registration and we're so excited to celebrate with you!
                </p>
                <div className="mt-8 pt-6 border-t border-green-200/50">
                  <p className="text-c136207 font-nunito-500 text-sm md:text-base mb-6">
                    💕 We look forward to seeing you at the wedding!
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-c136207 text-white font-nunito-600 text-base rounded-[100px] hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-c136207 font-nunito-400">Loading...</p>
            </div>
          ) : isValidToken && !errorType && !success && !isGuestToken ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4.5">
                {/* Full Name */}
                <div>
                  <label className="block text-c136207 font-nunito text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-c136207 outline-none rounded-[100px] bg-white text-cb0b0b0 font-nunito-400 text-sm focus:n"
                  />
                </div>

                {/* Title */}
                <AnimatedDropdown
                  label="Title"
                  options={titleOptions}
                  value={title}
                  onChange={setTitle}
                  placeholder="Select title"
                />

                {/* Office */}
                <AnimatedDropdown
                  label="Office"
                  options={officeOptions}
                  value={office}
                  onChange={setOffice}
                  placeholder="Select office"
                />

                {/* Email Address */}
                <div>
                  <label className="block text-c136207 font-nunito text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    placeholder="Enter email"
                    required
                    className="w-full px-4 py-3 border border-c136207 outline-none rounded-[100px] bg-gray-50 text-c136207 font-nunito-400 text-sm focus:n cursor-not-allowed"
                  />
                </div>

                {/* Country */}
                <div className="relative">
                  <label className="block text-c136207 font-nunito text-sm mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-c136207 outline-none rounded-[100px] bg-white text-cb0b0b0 font-nunito-400 text-sm appearance-none focus:n pr-10"
                    >
                      <option value="">Select country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image
                        src={DropDownIcon}
                        alt="dropdown"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of children coming */}
                <AnimatedDropdown
                  label="Number of children coming"
                  options={childrenOptions}
                  value={numberOfChildren}
                  onChange={setNumberOfChildren}
                  placeholder="Select number"
                />
              </div>

              {/* Buttons */}
              <div className="pt-10 space-y-3 max-w-[228px] mx-auto">
                <button
                  type="submit"
                  disabled={submitting || !token}
                  className="w-full bg-c136207 text-white font-nunito-400 py-3 rounded-[100px] hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full bg-transparent text-cb0b0b0 font-nunito-400 py-4 rounded-[100px] hover:text-c136207 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
      
    </section>
  );
}

// Note: Metadata must be exported from a server component
// Since this is a client component, metadata is handled in layout.tsx or via generateMetadata
export default function RegistrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-c136207 font-nunito-400">Loading...</p>
      </div>
    }>
      <RegistrationForm />
    </Suspense>
  );
}

