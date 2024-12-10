/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'wormhole.pockethost.io'
            }
        ]
    }
};

export default nextConfig;
