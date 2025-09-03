import { GEMINI_API_KEY, GEMINI_API_URL, GeminiRequest, GeminiResponse } from '../config/gemini';

export class GeminiService {
  private static async makeRequest(prompt: string): Promise<string> {
    try {
      const request: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta da API com erro:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data: GeminiResponse = await response.json();
      console.log('Resposta da API Gemini:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content.parts[0]) {
        let responseText = data.candidates[0].content.parts[0].text;
        
        console.log('Resposta bruta da API:', responseText);
        
        // Remove formatação markdown se presente
        if (responseText.includes('```json')) {
          responseText = responseText.replace(/```json\s*/, '').replace(/\s*```/, '');
          console.log('Resposta após remoção de markdown:', responseText);
        }
        
        return responseText.trim();
      } else {
        console.error('Estrutura da resposta inválida:', data);
        throw new Error('Resposta da API inválida - estrutura incorreta');
      }
    } catch (error) {
      console.error('Erro na API Gemini:', error);
      
      // Log mais detalhado para debug
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Tratamento específico para timeout
        if (error.name === 'AbortError') {
          throw new Error('Timeout na requisição da API (10s)');
        }
      }
      
      throw error;
    }
  }

  static async generateClinicalCase(): Promise<{
    title: string;
    description: string;
    ph: number;
    pco2: number;
    hco3: number;
    be: number;
    correctAnswer: string;
    explanation: string;
  }> {
    const prompt = `Você é um especialista em gasometria arterial. Gere um caso clínico realista para estudantes de fisioterapia.

IMPORTANTE: Responda APENAS com um JSON válido, SEM formatação markdown, SEM código markdown, SEM texto adicional.

Estrutura obrigatória:
{
  "title": "Caso X: Paciente com [condição clínica]",
  "description": "Descrição clínica do paciente e situação atual",
  "ph": [número entre 6.8 e 7.8],
  "pco2": [número entre 20 e 80],
  "hco3": [número entre 10 e 40],
  "be": [número entre -15 e +15],
  "correctAnswer": "Diagnóstico correto baseado nos valores",
  "explanation": "Explicação do diagnóstico e interpretação dos valores"
}

Exemplo de resposta válida:
{
  "title": "Caso 1: Paciente com DPOC exacerbado",
  "description": "Paciente de 68 anos com DPOC há 15 anos, apresenta dispneia e tosse produtiva há 3 dias",
  "ph": 7.28,
  "pco2": 58,
  "hco3": 26,
  "be": 1,
  "correctAnswer": "Acidose Respiratória Parcialmente Compensada",
  "explanation": "pH baixo (7.28) indica acidemia. PCO2 alto (58) indica componente respiratório. HCO3 normal (26) sugere compensação renal inicial. BE positivo (1) confirma compensação."
}

NÃO use formatação markdown ou qualquer texto adicional. Apenas o JSON puro.`;

    try {
      const response = await this.makeRequest(prompt);
      const parsedResponse = JSON.parse(response);
      
      // Validação dos dados
      if (this.validateClinicalCase(parsedResponse)) {
        return parsedResponse;
      } else {
        throw new Error('Dados inválidos retornados pela API');
      }
    } catch (error) {
      throw error;
    }
  }

  static async getComponentInfo(componentName: string): Promise<string> {
    const prompt = `Você é um especialista em gasometria arterial. Forneça informações sobre ${componentName} para estudantes de fisioterapia.

IMPORTANTE: Responda de forma clara e educativa, com no máximo 200 palavras.

Inclua:
- Definição e função do ${componentName}
- Valores normais de referência
- Interpretação clínica das alterações
- Relação com outros parâmetros da gasometria
- Exemplos práticos de interpretação

Seja específico e use linguagem técnica apropriada para estudantes de fisioterapia.`;

    try {
      return await this.makeRequest(prompt);
    } catch (error) {
      throw error;
    }
  }

  private static validateClinicalCase(data: any): boolean {
    return (
      data.title &&
      data.description &&
      typeof data.ph === 'number' && data.ph >= 6.8 && data.ph <= 7.8 &&
      typeof data.pco2 === 'number' && data.pco2 >= 20 && data.pco2 <= 80 &&
      typeof data.hco3 === 'number' && data.hco3 >= 10 && data.hco3 <= 40 &&
      typeof data.be === 'number' && data.be >= -15 && data.be <= 15 &&
      data.correctAnswer &&
      data.explanation
    );
  }
}
