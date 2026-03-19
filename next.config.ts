import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/landing',    // La ruta vieja que da error
        destination: '/',      // A donde quieres que vayan (tu nueva Home)
        permanent: true,       // Esto le dice a Google: "Cámbialo para siempre" (SEO 301)
      },
    ];
  },
};

export default nextConfig;