const reviewHomeworkParcial = async () => {
    const studentName = document.querySelector(".personal__name");
    const path = "#__layout > div > div.wrapper > main > section.page > div.page__wrapper.container.submission-answer > div > div > div.answer.page__component > form > div.quill-editor.notranslate.quill-editor.notranslate > div.ql-container.ql-snow > div.ql-editor";
    const message = document.querySelector(path);
    
    function getFirstName(fullName) {
      fullName = fullName.trim();
      const spacePosition = fullName.indexOf(" ");
      return spacePosition === -1 ? fullName : fullName.substring(0, spacePosition);
    }
    
    async function sendToLLM(message) {
      const url = "http://localhost:11434/api/generate";
      const prompt = `
      Por favor, corrija todos os erros de português na mensagem a seguir, mantendo o mesmo estilo de escrita da mensagem original. Retorne apenas a mensagem corrigida, sem explicações ou comentários adicionais:

      ${message}
      `;
      const data = {
        model: "pequi",
        prompt: prompt,
        stream: false,
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData.response;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    const cleanName = getFirstName(studentName.textContent);
    const completeMessage = `
    Olá, ${cleanName}! Tudo bem?
  
    ${message.textContent}
  
    Se tiver qualquer dúvida, compartilhe conosco.
  
    Um grande abraço e bons estudos!
  
    Atenciosamente, Diogo Saucedo.
    `;
    message.textContent = await sendToLLM(completeMessage);
  };

  export {reviewHomeworkParcial}