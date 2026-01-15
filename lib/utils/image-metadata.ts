import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ImageMetadataResult {
  width: number;
  height: number;
  format: string;
  colorSpace: string;
}

export async function extractImageMetadata(
  filePath: string
): Promise<ImageMetadataResult> {
  try {
    const command = `identify -format "%w,%h,%m,%[colorspace]" ${filePath}`;
    const { stdout } = await execAsync(command);

    const [width, height, format, colorSpace] = stdout.trim().split(',');

    return {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      format: format.toLowerCase(),
      colorSpace: colorSpace.toLowerCase(),
    };
  } catch (error) {
    throw new Error('Failed to extract image metadata');
  }
}

export async function convertImageFormat(
  inputPath: string,
  outputPath: string,
  targetFormat: string
): Promise<void> {
  const command = `convert ${inputPath} -format ${targetFormat} ${outputPath}`;
  await execAsync(command);
}
