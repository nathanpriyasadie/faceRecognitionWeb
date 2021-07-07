module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://ec2-18-181-167-59.ap-northeast-1.compute.amazonaws.com:8080/api/:path*'
            }
        ]
    }
}