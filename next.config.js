module.exports = {
  async rewrites() {
    return [
      {
        source: '/i/:id',
        destination: '/controllers/images/:id',
      },
    ]
  },
}