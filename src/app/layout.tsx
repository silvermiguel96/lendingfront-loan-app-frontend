import './globals.css'; 
import { LoanAppProvider } from '@/context/LoanAppProvider';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LoanAppProvider>{children}</LoanAppProvider>
      </body>
    </html>
  );
}
