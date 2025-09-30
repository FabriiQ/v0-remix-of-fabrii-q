import OpenAI from 'openai';

interface EmbeddingData {
  embedding: number[];
  index: number;
  object: string;
}

class OpenAIEmbeddingService {
  private static instance: OpenAIEmbeddingService;
  private client: OpenAI;
  private model: string;
  private dimensions: number;

  private constructor() {
    this.model = 'google/embeddinggemma-300m';
    this.dimensions = 1024; // Default dimensions for the model
    
    this.client = new OpenAI({
      baseURL: 'https://api.deepinfra.com/v1/openai',
      apiKey: process.env.DEEPINFRA_API_KEY || 'jlTfz4C4eaqATleQSDDSQkzDOyDUTWxp',
    });
  }

  public static getInstance(): OpenAIEmbeddingService {
    if (!OpenAIEmbeddingService.instance) {
      OpenAIEmbeddingService.instance = new OpenAIEmbeddingService();
    }
    return OpenAIEmbeddingService.instance;
  }

  public async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.client.embeddings.create({
        model: this.model,
        input: text,
        encoding_format: 'float',
      });

      if (!response.data?.[0]?.embedding) {
        throw new Error('No embedding data received');
      }

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error(`Embedding generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async generateEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      const response = await this.client.embeddings.create({
        model: this.model,
        input: texts,
        encoding_format: 'float',
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No embedding data received');
      }

      return (response.data as unknown as EmbeddingData[]).map((item: EmbeddingData) => item.embedding);
    } catch (error) {
      console.error('Error generating batch embeddings:', error);
      throw new Error(`Batch embedding generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public getModelInfo() {
    return {
      name: this.model,
      dimensions: this.dimensions,
      provider: 'DeepInfra (OpenAI compatible)'
    };
  }
}

// Export singleton instance
export const openAIEmbeddings = OpenAIEmbeddingService.getInstance();

// Helper functions for backward compatibility
export async function generateEmbedding(text: string): Promise<number[]> {
  return openAIEmbeddings.generateEmbedding(text);
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  return openAIEmbeddings.generateEmbeddings(texts);
}
