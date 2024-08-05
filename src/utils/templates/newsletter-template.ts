// Template de e-mail de notícia
export const newsEmailTemplate = (title: string, content: string, cover: string, idNews: string) => `
  <h1>${title}</h1>
  
  <img style="width: 100%" src='${cover}'/>
  <p>
  Olá HakyOffer, <br><br>
  ${content}</p>
<br>
<br>
  <a href='https://academy.hakyoff.com/dashboard/news/${idNews}'>Ver noticia completa</a>
`;