import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';

// Configuration
const BATCH_SIZE = 5; // Number of files to process in parallel
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB max file size

// Force Node.js runtime and dynamic rendering since this route uses the filesystem
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface FileResult {
  success: boolean;
  file: string;
  id?: string;
  error?: string;
}

// Process a single file
async function processFile(filePath: string, supabase: any): Promise<FileResult> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    const { data, error } = await supabase
      .from('documents')
      .upsert(
        {
          file_name: fileName,
          content: fileContent,
          file_path: filePath,
          file_size: Buffer.byteLength(fileContent),
          last_modified: new Date().toISOString(),
        },
        { onConflict: 'file_path' }
      )
      .select()
      .single();

    if (error) throw error;
    return { success: true, file: fileName, id: data?.id };
  } catch (error: any) {
    console.error(`Error processing file ${filePath}:`, error);
    return { 
      success: false, 
      file: path.basename(filePath), 
      error: error.message || 'Unknown error'
    };
  }
}

// Process files in batches
async function processFilesInBatches(files: string[], supabase: any): Promise<FileResult[]> {
  const results: FileResult[] = [];
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(file => processFile(file, supabase))
    );
    results.push(...batchResults);
    
    // Small delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < files.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourcePath } = body;

    if (!sourcePath) {
      return new Response(
        JSON.stringify({ error: 'sourcePath is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting bulk upload from ${sourcePath}...`);

    // Get absolute path
    const fullPath = path.resolve(process.cwd(), sourcePath);
    
    try {
      await fs.access(fullPath);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `Source path does not exist: ${fullPath}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Read directory contents
      const files = await fs.readdir(fullPath);
      const markdownFiles = files
        .filter(file => file.endsWith('.md') && !file.startsWith('.') && file !== 'README.md')
        .map(file => path.join(fullPath, file));

      console.log(`Found ${markdownFiles.length} markdown files to upload`);
      
      // Initialize Supabase client
      const supabase = createServiceClient();
      
      // Process files in batches
      const results = await processFilesInBatches(markdownFiles, supabase);
      
      // Calculate summary
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.length - successCount;
      
      // Return the response
      return new Response(
        JSON.stringify({
          success: true,
          total: results.length,
          successCount,
          errorCount,
          results
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      
    } catch (error: any) {
      console.error('Bulk upload error:', error);
      return new Response(
        JSON.stringify({
          error: error.message || 'An error occurred during bulk upload'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error('Error in bulk upload:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An error occurred during bulk upload',
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// GET endpoint to check available files for upload
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sourcePath = searchParams.get('sourcePath') || 'FabriiQ-docs'

    // Get absolute path
    const fullPath = path.resolve(process.cwd(), sourcePath)
    
    if (!fsSync.existsSync(fullPath)) {
      return new Response(
        JSON.stringify({ error: `Source path does not exist: ${fullPath}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Read directory contents
    const files = fsSync.readdirSync(fullPath)
    const markdownFiles = files.filter((file: string) => 
      file.endsWith('.md') && !file.startsWith('.') && file !== 'README.md'
    )

    // Get file stats
    const fileStats = markdownFiles.map((fileName: string) => {
      const filePath = path.join(fullPath, fileName)
      if (!fsSync.existsSync(filePath)) {
        return {
          fileName,
          error: `File does not exist: ${filePath}`
        }
      }
      const stats = fsSync.statSync(filePath);
      const fileContent = fsSync.readFileSync(filePath, 'utf-8');
      
      // Format the title from filename
      const title = fileName
        .replace(/\.md$/, '')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/^\d+_/, '')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        fileName,
        title,
        size: stats.size,
        contentLength: fileContent.length,
        lastModified: stats.mtime.toISOString()
      }
    })

    return NextResponse.json({
      success: true,
      sourcePath: fullPath,
      totalFiles: markdownFiles.length,
      files: fileStats
    })

  } catch (error) {
    console.error('Bulk upload preview API error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}