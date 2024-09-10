const reviewQuestion = async () => {
  const studentName = document.querySelector(".ticket-header__h");
  const editor = document.querySelector('[contenteditable="true"].ql-editor');

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
     Please correct all Portuguese errors in the following message, keeping the same writing style as the original message. Return only the corrected message, without explanations or additional comments:

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
  
    ${editor.textContent}
  
    Atenciosamente, Diogo Saucedo.
    `;

  editor.textContent = await sendToLLM(completeMessage);
};

export { reviewQuestion };
