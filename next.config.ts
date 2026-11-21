import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Short links to my other projects. Temporary (307) so the targets can change.
  async redirects() {
    return [
      {
        source: "/excel",
        destination: "https://abdisalan-excel-insights.streamlit.app",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
