const { environment } = require('@rails/webpacker')

environment.config.set('output.filename', (pathData) => {
  if (pathData.chunk.name === 'service-worker') {
    return 'js/[name].js';
  } else {
    return 'js/[name]-[contenthash].js';
  }
})

module.exports = environment
