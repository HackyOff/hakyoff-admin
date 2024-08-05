type HackerAlphabet = {
    [key: string]: string;
  };
  
  // Função para decodificar o nome estilo "hacker" de volta ao nome original
  export function decodeHackerName(hackerName: string) {
    const hackerAlphabet: HackerAlphabet = {
      '4': 'a', '8': 'b', '<': 'c', '|)': 'd', '3': 'e',
      '|=': 'f', '6': 'g', '#': 'h', '!': 'i', '_|': 'j',
      '|<': 'k', '1': 'l', '/\\/\\': 'm', '|\\|': 'n', '0': 'o',
      '|>': 'p', '9': 'q', '2': 'r', '5': 's', '7': 't',
      '|_|': 'u', '\\/': 'v', '\\/\\/': 'w', '%': 'x', '`/': 'y',
      '10': 'z'
    };
  
    return hackerName.toLowerCase().split('').map(char => hackerAlphabet[char] || char).join('');
  }
  