/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["m.media-amazon.com", "lh3.googleusercontent.com", "firebasestorage.googleapis.com"]
        
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default nextConfig;
