'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RegistrationRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      router.replace(`/registration/${token}`);
    } else {
      router.replace('/');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-c136207 font-nunito-400">Redirecting...</p>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-c136207 font-nunito-400">Loading...</p>
      </div>
    }>
      <RegistrationRedirect />
    </Suspense>
  );
}
