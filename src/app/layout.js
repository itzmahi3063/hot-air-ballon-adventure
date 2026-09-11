import './globals.css';

export const metadata = {
  title: 'Telegram Mini App',
  description: 'Telegram Mini App with Rewards, Tasks, Lucky Spin, and Wallet',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </head>
      <body className="min-h-screen bg-[#070604] text-white flex justify-center selection:bg-yellow-500 selection:text-black">
        <main className="w-full max-w-md min-h-screen bg-[#0c0a06] shadow-2xl relative flex flex-col pb-24 overflow-y-auto no-scrollbar">
          {children}
        </main>
      </body>
    </html>
  );
}
