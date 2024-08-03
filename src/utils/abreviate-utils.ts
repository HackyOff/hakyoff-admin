import { truncate } from 'lodash'; // ou qualquer biblioteca de corte de string preferida

export class AbreviateString {
    static abbreviate(text: string, maxLength: number): string {
        const trimmedText = truncate(text, { length: maxLength });
        
        if (trimmedText !== text) {
          return `${trimmedText}...`;
        } else {
          const words = text.split(' ');
          
          const newWords: string[] = [];
          let currentWordLengthSum = 0;
      
          for (const word of words) {
            const wordLength = word.length + 1; // Adiciona espaço entre palavras
            
            if (currentWordLengthSum + wordLength <= maxLength) {
              newWords.push(word);
              currentWordLengthSum += wordLength;
            } else {
              break;
            }
          }
      
          return `${newWords.join(' ')}${maxLength - currentWordLengthSum > 0 ? '...' : ''}`;
        }
      }
}