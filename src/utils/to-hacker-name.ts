// Definindo um tipo para o alfabeto "hacker"
type HackerAlphabet = {
  [key: string]: string;
};

// Função para converter o nome em um estilo "hacker" substituindo vogais por números
export function toHackerName(name: string) {
  const hackerAlphabet: HackerAlphabet = {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 'u': '5'
    // Adicione outras substituições conforme necessário
  };

  // Convertendo o nome para minúsculas e substituindo caracteres
  const hackerName = name.toLowerCase().split('').map(char => hackerAlphabet[char] || char).join('');

  return hackerName;
}
 