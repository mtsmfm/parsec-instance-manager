process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

environment.plugins.delete('Compression Brotli')

module.exports = environment.toWebpackConfig()
