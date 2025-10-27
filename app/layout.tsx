import AuthBootstrap from "@/components/AuthBootstrap";

export const metadata = {
  title: "MapleSense",
  description: "Maple Sense Authentication",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#fcf8f8ff",
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        {/* Bootstraps axios with stored token */}
        <AuthBootstrap />
        {children}
      </body>
    </html>
  );
}