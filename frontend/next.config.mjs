/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://ec2-3-107-189-224.ap-southeast-2.compute.amazonaws.com/api/:path*', // replace with your actual EC2 domain
            },
        ];
    },
};

export default nextConfig;
