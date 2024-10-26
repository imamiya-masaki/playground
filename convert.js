const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const inputDir = path.resolve(__dirname, 'input');
const outputDir = path.resolve(__dirname, 'output');

// outputディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// inputフォルダ内のすべてのHEICファイルを取得して変換
fs.readdirSync(inputDir).forEach(file => {
  if (path.extname(file).toLowerCase() === '.heic') {
    const inputPath = path.join(inputDir, file);
    const outputFile = path.basename(file, '.heic') + '.jpg';
    const outputPath = path.join(outputDir, outputFile);

    // squoosh-cliを使用して変換コマンドを実行
    exec(`squoosh-cli --mozjpeg '{quality:75}' -d "${outputDir}" "${inputPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`エラー: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`変換完了: ${inputPath} → ${outputPath}`);
    });
  }
});
