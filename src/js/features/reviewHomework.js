const reviewHomework = async () => {
  const studentName = document.querySelector(".personal__name");
  const path =
    "#__layout > div > div.wrapper > main > section.page > div.page__wrapper.container.submission-answer > div > div > div.answer.page__component > form > div.quill-editor.notranslate.quill-editor.notranslate > div.ql-container.ql-snow > div.ql-editor";
  const message = document.querySelector(path);

  const module = document
    .querySelector(".personal__course > div > p:nth-child(3)")
    .textContent.replace(/\s+/g, " ")
    .trim();

  async function detailModule(module) {
    const url = `http://127.0.0.1:8000/api/feedbacks/${module}`;

    try {
      const response = await fetch(url);

      // Verifica se o status é 404 e retorna falso
      if (response.status === 404) {
        return false;
      }

      // Se a resposta não for ok (200-299), lança um erro
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Se a resposta for ok, parseia o JSON
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      // Qualquer erro (inclusive 404) retorna falso
      return false;
    }
  }

  async function saveFeedback(module) {
    const url = `http://127.0.0.1:8000/api/feedbacks/`;
    const feedback = {
      module: module,
      message: message.textContent,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Feedback saved successfully:", responseData);
    } catch (e) {
      console.error("Error:", e);
    }
  }

  function getFirstName(fullName) {
    fullName = fullName.trim();
    const spacePosition = fullName.indexOf(" ");
    return spacePosition === -1
      ? fullName
      : fullName.substring(0, spacePosition);
  }

  async function sendToLLM(message) {
    const url = "http://localhost:11434/api/generate";
    const prompt = `
      Por favor, reescreva o texto abaixo aplicando as técnicas de reescrita definidas, mantendo o significado original e o contexto técnico:

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
      return null;
    }
  }

  const cleanName = getFirstName(studentName.textContent);

  let completeMessage = null;

  const hasFeedback = await detailModule(module);

  if (hasFeedback) {
    completeMessage = `
      Olá, ${cleanName}! Tudo bem?
    
      ${hasFeedback.message}
    
      Se tiver qualquer dúvida, compartilhe conosco.
      
      Um grande abraço e bons estudos!
    
      Atenciosamente, Diogo Saucedo.
      `;
  } else {
    if (message.textContent === "" || message.textContent === "Bueno!") {
      alert("Esse modulo não possui feedback salvo, escreva-o.");
      return false;
    } else {
      saveFeedback(module, message.textContent);
    }

    completeMessage = `
      Olá, ${cleanName}! Tudo bem?
  
      ${message.textContent}
    
      Se tiver qualquer dúvida, compartilhe conosco.
    
      Um grande abraço e bons estudos!
    
      Atenciosamente, Diogo Saucedo.
      `;
  }

  message.textContent = await sendToLLM(completeMessage);
};

export { reviewHomework };
