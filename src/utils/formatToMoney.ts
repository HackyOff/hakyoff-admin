export const formatMoney = (value: number): string => {
    // Converter o número para string e arredondar para 2 casas decimais
    const stringValue = value.toFixed(2);
  
    // Adicionar separador de milhar
    const parts = stringValue.split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    // Adicionar o símbolo da moeda Kz
    return ` ${integerPart}.${parts[1]} Kz`;
  };
  