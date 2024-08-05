// utils/dateUtils.ts

export class DateUtils {
  static formatDateToPT(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  static formatDateToPTT(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static formatTimeToPT(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }


  static formatTimeToPTT(dateString: Date): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  static formatDateToPTSecond(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(date);
  }

  static formatDateTimeToPT(dateString: string): string {
    return `${DateUtils.formatDateToPT(dateString)} ${DateUtils.formatTimeToPT(dateString)}`;
  }

  static formatDateTimeToPTT(dateString: Date): string {
    return `${DateUtils.formatDateToPTT(dateString)} ${DateUtils.formatTimeToPTT(dateString)}`;
  }


  static formatDateToPTSecondFirebase(date: Date): string {
    // Implementação para formatar data e hora com segundos para PT
    return date.toLocaleString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  static isExpired(date: string): boolean {
    return new Date(date) < new Date();
  };

}
