import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const version = process.argv[2];

if (!version) {
  console.error('Usage: tsx update-version.ts <version>');
  process.exit(1);
}

// Update server package.json
const serverPackageJsonPath = join(process.cwd(), 'server', 'package.json');
const serverPackageJson = JSON.parse(readFileSync(serverPackageJsonPath, 'utf-8'));
serverPackageJson.version = version;
writeFileSync(serverPackageJsonPath, JSON.stringify(serverPackageJson, null, '  '));

// Update tauri.conf.json
const tauriConfigPath = join(process.cwd(), 'server', 'src-tauri', 'tauri.conf.json');
const tauriConfig = JSON.parse(readFileSync(tauriConfigPath, 'utf-8'));
tauriConfig.version = version;
writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));

console.log(`Updated version to ${version}`);