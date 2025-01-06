const reviewMessage = async () => {
  const editor = document.querySelectorAll(
    '[data-placeholder="Insert text here ..."].ql-editor'
  );

  async function sendToLLM(message) {
    const url = "http://localhost:11434/api/generate";
    const prompt = `
     Por favor, corrija todos os erros de português na mensagem a seguir:

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

  const completeMessage = `
    Olá! Tudo bem?
  
    ${editor[editor.length - 1].textContent}
    
    Atenciosamente,  Diogo Saucedo.
    `;

  editor[editor.length - 1].textContent = await sendToLLM(completeMessage);
};

export { reviewMessage };
