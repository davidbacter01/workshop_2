class Quiz {
    constructor(questions){
        this.questions = questions;
        this.questionContainer = document.getElementById('question');
        this.answerButtons = document.getElementById('answer-buttons');
        this.feedback = document.getElementById('feedback');
        this.nextButton = document.getElementById('next-button');
        this.currentQuestionIndex = 0;
        this.showQuestion(this.questions[this.currentQuestionIndex]);
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        document.getElementById('reset-button').addEventListener('click', () => window.location.reload());
    }

    showQuestion(question) {
        this.questionContainer.textContent = question.question;
        this.answerButtons.innerHTML = '';
        for (const answer of question.answers) {
            this.configAnswer(answer, question);
        }
    }

    configAnswer(answer, question) {
        const buttonContainer = document.createElement('li');
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('btn');
        buttonElement.textContent = answer.text;
        this.answerButtons.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonElement);
        buttonElement.addEventListener('click', () => this.selectAnswers(answer, question, buttonElement));
    }

    selectAnswers(answer, question, button) {
        const correct = answer.correct;
        if (correct) {
            this.nextButton.classList.remove('hide');
            this.feedback.textContent = question.explanation;
            button.classList.add('correct');
            this.feedback.classList.remove('text-wrong');
            this.feedback.classList.add('text-correct');
        } else {
            button.classList.add('wrong');
            this.feedback.textContent = 'Răspuns incorect. Te rog să încerci din nou';
            this.feedback.classList.add('text-wrong');
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.resetQuestion();
        if(this.currentQuestionIndex >= this.questions.length) {
           this.showQuizEndModal();
        } else {
            this.showQuestion(this.questions[this.currentQuestionIndex]);
        }
    }

    resetQuestion() {
        this.feedback.classList.remove('text-correct', 'text-wrong');
        this.feedback.innerHTML = '';
        this.nextButton.classList.add('hide');
    }

    showQuizEndModal() {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.remove('hide');
    }
}


async function initQuiz() {
    const fileContent = await fetch('./questions.json');
    const quizQuestions = await fileContent.json();
    const quiz = new Quiz(quizQuestions);
}

document.addEventListener('DOMContentLoaded', () => initQuiz());

