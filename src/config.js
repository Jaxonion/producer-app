module.exports = {
    API_URL: process.env.API_URL || 'https://radiant-dusk-15656.herokuapp.com',
    output: {
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    }
}