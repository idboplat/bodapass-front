module.exports = {
  apps: [
    {
      name: "client",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      // instances: 0,
      autorestart: true,
      watch: false, // dev
      env: {
        NODE_ENV: "production",
        PORT: 3050,
      },
    },
  ],
};
