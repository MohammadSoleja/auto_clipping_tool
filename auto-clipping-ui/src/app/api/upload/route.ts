import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadsDir, file.name);

  await writeFile(filePath, buffer);
  console.log(`✅ Saved video: ${filePath}`);

  // 🔄 Run the Python backend script
  const pythonScriptPath = path.join(process.cwd(), '..', 'scripts', 'process_video.py');
  const videoArg = path.join('auto-clipping-ui', 'public', 'uploads', file.name);

  const child = spawn('python3', [pythonScriptPath, file.name], {
    cwd: path.join(process.cwd(), '..'), // run from project root
  });

  child.stdout.on('data', (data) => {
    console.log(`📤 [Python STDOUT]: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`❌ [Python STDERR]: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`🎉 Python script exited with code ${code}`);
  });

  return NextResponse.json({ message: 'File uploaded and processing started.', fileName: file.name });
}