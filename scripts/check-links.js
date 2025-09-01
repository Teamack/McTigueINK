const { execSync } = require('child_process');

try {
  execSync('npx linkinator ./ --recurse --skip "https?://"', {
    stdio: 'inherit'
  });
} catch (err) {
  process.exit(err.status || 1);
}
