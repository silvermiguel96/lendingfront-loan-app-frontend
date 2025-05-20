'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function LoanCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-lg border border-gray-600/30 bg-white">
        <CardContent className="p-2 sm:p-8">{children}</CardContent>
      </Card>
    </div>
  );
}
