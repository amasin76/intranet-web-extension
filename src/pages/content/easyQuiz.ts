const css = `
      .quiz_questions_show_container .quiz_questions_results {
        position: fixed;
        bottom: 38px;
        right: 99px;
        background-color: #120101;
        border-radius: 5px;
      }
	  .quiz_questions_show_container .quiz_questions_results button {
        width: 150px;
      }
      .quiz_questions_show_container .quiz_questions_results .error {
        margin: 0px;
    display: block;
      }
      @media (min-width: 769px) and (max-width: 1024px) {
    .quiz_questions_show_container .quiz_questions_results {
      bottom: 26px;
      right: 82px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    .quiz_questions_show_container .quiz_questions_results {
      bottom: 15px;
      right: 73px;
    }
  }
    `;

const easyQuiz = () => {
	const style = document.createElement("style");
	style.appendChild(document.createTextNode(css));
	document.head.appendChild(style);
	const submitButton = document.querySelector(".quiz_questions_results .btn");
	if (submitButton) {
		submitButton.textContent = "Quiz Submit";
	}
	const errorDiv = document.querySelector(".quiz_questions_results .error");
	if (errorDiv) {
		errorDiv.textContent = "Ready";
	}
};

export default easyQuiz;
