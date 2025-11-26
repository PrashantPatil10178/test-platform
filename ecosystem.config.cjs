module.exports = {
  apps: [
    {
      name: "mhtcet-prep",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/ubuntu/mhtcet-prep",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3050,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3050,
      },
      // Logging
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/home/ubuntu/logs/mhtcet-prep-error.log",
      out_file: "/home/ubuntu/logs/mhtcet-prep-out.log",
      merge_logs: true,
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
