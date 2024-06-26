document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('convert-btn');
    const contactModal = document.getElementById('contactModal');
    const overlay = document.getElementById('overlay');

    if (startButton && contactModal) {
        startButton.addEventListener('click', () => {
            contactModal.style.display = 'flex';
            contactModal.style.justifyContent = 'center';
            contactModal.style.alignItems = 'center';
        });

        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }

    function validateForm() {
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const number = document.getElementById('phone')?.value;

        if (name === '' || email === '' || number === '') {
            alert("Please fill all the fields");
            return false;
        } else if (number.length !== 10) {
            alert("Please enter a valid phone number");
            return false;
        } else if (name.length < 3) {
            alert("Please enter a valid name");
            return false;
        }

        return true;
    }

    const submit = document.getElementById('submit');
    if (submit) {
        submit.addEventListener('click', (event) => {
            if (!validateForm()) {
                event.preventDefault();
            } else {
                window.location.href = './quiz.html';
            }
        });
    }

    const questions = [
        {
            number: 1,
            question: "In the play 'Romeo and Juliet,' what is Juliet's last name?",
            answer: "a) Capulet",
            options: ["a) Capulet", "b) Montague", "c) Verona", "d) Shakespeare"],
        },
        {
            number: 2,
            question: "What is the only planet in our solar system that rotates on its side?",
            answer: "c) Uranus",
            options: ['a) Mars', 'b) Venus', 'c) Uranus', 'd) Neptune'],
        },
        {
            number: 3,
            question: "Which artist holds the record for the most Grammy Awards won in a single night?",
            answer: "d) Michael Jackson",
            options: ['a) Beyoncé', 'b) Adele', 'c) Taylor Swift', 'd) Michael Jackson'],
        },
        {
            number: 4,
            question: "Who was the first female prime minister of the United Kingdom?",
            answer: "a) Margaret Thatcher",
            options: ['a) Margaret Thatcher', 'b) Theresa May', 'c) Angela Merkel', 'd) Queen Elizabeth II'],
        },
        {
            number: 5,
            question: "What was the first ever commercially available computer processor?",
            answer: "a) Intel 4004",
            options: ['a) Intel 4004', 'b) AMD Ryzen', 'c) Apple M1', 'd) IBM POWER9'],
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length);
    const questionElement = document.querySelector('.question');
    const optionListElement = document.querySelector('.option-list');
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentQuestionElement = document.querySelector('.current-question');
    const resultBox = document.getElementById('result-box-hidden');

    if (questionElement && optionListElement && backBtn && nextBtn && currentQuestionElement) {
        function showQuestion(index) {
            const question = questions[index];
            questionElement.textContent = question.question;
            optionListElement.innerHTML = question.options.map(option => `
                <div class="option">
                    <input type="radio" name="option" value="${option}">
                    <span>${option}</span>
                </div>
            `).join('');

            const savedAnswer = userAnswers[index];
            if (savedAnswer) {
                const optionInputs = document.querySelectorAll('input[name="option"]');
                optionInputs.forEach(input => {
                    if (input.value === savedAnswer) {
                        input.checked = true;
                    }
                });
            }

            currentQuestionElement.textContent = `Question ${index + 1}/${questions.length}`;
            backBtn.disabled = index === 0;
            nextBtn.textContent = index === questions.length - 1 ? 'Submit' : 'Next';
        }

        function saveAnswer() {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                userAnswers[currentQuestionIndex] = selectedOption.value;
            }
        }

        function calculateScore() {
            let score = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userAnswers[i] === questions[i].answer) {
                    score++;
                }
            }
            return score;
        }

        function showResult() {
            const score = calculateScore();
            const percentage = Math.round((score / questions.length) * 100);
            resultBox.querySelector('.progress-value').textContent = `${percentage}%`;
            resultBox.querySelector('.score-text').textContent = `Your Score ${score}/${questions.length}`;

            const circularProgress = resultBox.querySelector('.circular-progress');
            let progress = 0;
            const interval = setInterval(() => {
                progress++;
                circularProgress.style.background = `conic-gradient(#97FEED ${progress * 3.6}deg, #fff ${progress * 3.6}deg)`;
                if (progress >= percentage) {
                    clearInterval(interval);
                }
            }, 20);

            resultBox.classList.remove('hidden');
            overlay.style.display = 'block'; // Show overlay
        }

        backBtn.addEventListener('click', () => {
            saveAnswer();
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        });

        nextBtn.addEventListener('click', () => {
            saveAnswer();
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                showResult();
            }
        });

        showQuestion(currentQuestionIndex);
    }
});
