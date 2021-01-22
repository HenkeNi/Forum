module.exports = {
    devServer: {
      proxy:
      {
        "^/rest/": { target: "http://localhost:4000", ws: true, changeOrigin: true },
        "^/api/":  { target: "http://localhost:4000", ws: true, changeOrigin: true },
        "^/auth/": { target: "http://localhost:4000", ws: true, changeOrigin: true },
      }
    }
  }