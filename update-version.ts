import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const CONFIG_PATH = 'src/config/app.config.ts';

function generateNewVersion(currentVersion: string): string {
  const today = new Date();
  const yy = today.getFullYear().toString().slice(-2);
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const datePart = yy + mm + dd;

  if (currentVersion === '00') {
    return datePart + '01';
  }

  if (currentVersion.startsWith(datePart)) {
    const seq = parseInt(currentVersion.slice(-2), 10) + 1;
    return datePart + String(seq).padStart(2, '0');
  }

  return datePart + '01';
}

function updateVersion() {
  try {
    const configPath = join(process.cwd(), CONFIG_PATH);
    let content = readFileSync(configPath, 'utf8');

    const versionRegex = /(version\s*:\s*['"])(\d{2,8})(['"])/;
    const match = content.match(versionRegex);

    if (!match) throw new Error('Version format not found');

    const newVersion = generateNewVersion(match[2]);
    content = content.replace(versionRegex, `$1${newVersion}$3`);
    writeFileSync(configPath, content);

    execSync(`git add ${configPath}`);
  } catch (error) {
    console.error('Error updating version:', error);
    process.exit(0);
  }
}

updateVersion();
