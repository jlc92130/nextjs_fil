import "./globals.css";

export const metadata = {
  title: "Fil d'actu",
  description: "publier des fils d'actu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray">{children}</body>
    </html>
  );
}
