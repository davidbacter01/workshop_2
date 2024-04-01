class Quiz {
    constructor(questions){
        this.questions = questions;
        this.questionContainer = document.getElementById('question');
        this.answerButtons = document.getElementById('answer-buttons');
        this.feedback = document.getElementById('feedback');
        this.nextButton = document.getElementById('next-button');
        this.showQuestion(this.questions[0]);

    }

    showQuestion(question) {
        this.questionContainer.textContent = question.question;
        this.answerButtons.innerHTML = '';
        for (const answer of question.answers) {
            //const answerElement = `<li><button class="btn"></button></li>`;
            const buttonContainer = document.createElement('li');
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('btn');
            buttonElement.textContent = answer.text;
            this.answerButtons.appendChild(buttonContainer);
            buttonContainer.appendChild(buttonElement);

        }
    }
}

async function initQuiz() {
    const fileContent = await fetch('./questions.json');
    const quizQuestions = await fileContent.json();
    console.log(quizQuestions);
    const quiz = new Quiz(quizQuestions);
}

initQuiz();

