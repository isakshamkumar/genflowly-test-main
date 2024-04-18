// http-server.config.js
module.exports = {
    root: './build', // Assuming your build output is in the 'build' directory
    index: 'index.html', // Specify the index file
    historyApiFallback: true, // Enable history API fallback
    open: true, // Automatically open the browser when the server starts
    port: 8080, // Specify the port
   };
   