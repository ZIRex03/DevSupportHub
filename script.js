function sidebarOpen() {
    document.getElementById('sidebar').classList.toggle('active');

    document.getElementById('sidebar-arrow').classList.toggle('active');
}

const checkboxTheme = document.getElementById('theme');

var isDark = true;

checkboxTheme.checked = isDark;

checkboxTheme.addEventListener('change', () => {

    isDark = checkboxTheme.checked;

    if (isDark) {
        document.querySelector('body').className = 'dark';
    }
    else {
        document.querySelector('body').className = '';
    }
})


document.querySelectorAll('.title-box').forEach(box => {
    box.addEventListener('click', () => {
        const boxId = box.id;
        const title = box.querySelector('.title');
        const arrow = box.querySelector('.arrow-down');
        const subtitleBox = document.querySelector(`#${boxId}-subtitle`);
        const isActive = title.classList.contains('active');

        document
            .querySelectorAll(".tab-box")
            .forEach((tab) => tab.classList.remove("active"));

        document.getElementById(box.dataset.tab).classList.add("active");

        setTimeout(() => {
            document.getElementById(box.dataset.tab)
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        document.querySelectorAll('.title').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.arrow-down').forEach(a => a.classList.remove('rotated'));
        document.querySelectorAll('.subtitle-box').forEach(s => s.style.display = 'none');

        if (!isActive) {
            title.classList.add('active');
            if (arrow) {
                arrow.classList.add('rotated');
            }
            if (subtitleBox) {
                subtitleBox.style.display = 'flex';
            }
        }
    });
});

document.getElementById('back-problems').addEventListener('click', () => {

    document.getElementById("errors-tab-content").style.display = "flex";
    document.getElementById("chat-container").style.display = "none";
});

const dialogues = {

    noTask: {
        question: "Ваши фильтры отображения задач настроены правильно?",
        answers: {
            yes: {
                question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                answers: {
                    yes: {
                        message: 'Рад, что смог помочь вам!'
                    },
                    no: {
                        message: 'Обратитесь к системному администратору',
                    }
                }
            },
            no: {
                question: "Измените фильтры отображения задач и повторите попытку. Помогло данное решение?",
                answers: {
                    yes: {
                        message: 'Рад, что смог помочь вам!'
                    },
                    no: {
                        question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                        answers: {
                            yes: {
                                message: 'Рад, что смог помочь вам!'
                            },
                            no: {
                                message: 'Обратитесь к системному администратору',
                            }
                        }
                    }
                }
            }
        }
    },

    errorNewProject: {
        question: 'Вы вошли в систему под свой учетной записью?',
        answers: {
            no: {
                question: 'Зайдите в систему под своей учетной записью и повторите попытку. Помог данный совет?',
                answers: {
                    yes: {
                        message: 'Рад, что смог помочь вам!'
                    },
                    no: {
                        question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                        answers: {
                            yes: {
                                message: 'Рад, что смог помочь вам!'
                            },
                            no: {
                                message: 'Обратитесь к системному администратору',
                            }
                        }
                    }
                }
            },
            yes: {
                question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                answers: {
                    yes: {
                        message: 'Рад, что смог помочь вам!'
                    },
                    no: {
                        message: 'Обратитесь к системному администратору',
                    }
                }
            }
        }
    },

    errorReport: {
        question: 'Правильно ли введены все данные?',
        answers: {
            yes: {
                question: 'Проверьте подключение к принтеру и настройки экспорта файла. Помог ли данный ответ?',
                answers: {
                    yes: {
                        message: 'Очень рад, обращайтесь за помощью!'
                    },
                    no: {
                        question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                        answers: {
                            yes: {
                                message: 'Рад, что смог помочь вам!'
                            },
                            no: {
                                message: 'Обратитесь к системному администратору',
                            }
                        }
                    }
                }

            },
            no: {
                question: 'Введите верные данные и повторите попытку. Был ли полезен данный совет?',
                answers: {
                    yes: {
                        message: 'Отлично! Рад, что смог помочь!'
                    },
                    no: {
                        question: 'Проверьте подключение к принтеру и настройки экспорта файла. Помог ли данный ответ?',
                        answers: {
                            yes: {
                                message: 'Очень рад, обращайтесь за помощью!'
                            },
                            no: {
                                question: 'Обновите страницу веб-приложения и перезагрузите браузер. Помогло данное решение?',
                                answers: {
                                    yes: {
                                        message: 'Рад, что смог помочь вам!'
                                    },
                                    no: {
                                        message: 'Обратитесь к системному администратору',
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    },

    errorLogin: {
        question: "Вы уверены, что используете правильный логин и пароль?",
        answers: {
            yes: {
                question: "Попробуйте использовать функцию восстановления пароля и повторите попытку. Вам помог данный совет?",
                answers: {
                    yes: {
                        message: "Отлично, обращайтесь за помощью!"
                    },
                    no: {
                        message: "Обратитесь к системному администратору"
                    }
                }
            },
            no: {
                question: "Попробуйте ввести логин и пароль еще раз. Вы смогли войти в систему?",
                answers: {
                    yes: {
                        message: 'Рад, что смог помочь вам!'
                    },
                    no: {
                        question: "Попробуйте использовать функцию восстановления пароля и повторите попытку. Вам помог данный совет?",
                        answers: {
                            yes: {
                                message: "Отлично, обращайтесь за помощью!"
                            },
                            no: {
                                message: "Обратитесь к системному администратору"
                            }
                        }
                    }
                }
            }
        }
    }
};

let currentNode = null;
let history = [];


function startChat(problemKey, chatName) {

    document.getElementById('chat-name').textContent = chatName;
    currentNode = dialogues[problemKey];
    history = [];

    document.getElementById('chat').innerHTML = ``;
    document.getElementById("errors-tab-content").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";

    setTimeout(() => {
        document.getElementById("chat-container").scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    addMessage(currentNode.question, "bot");
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chat");
    const message = document.createElement("div");

    message.classList.add("message", sender);

    const image = document.createElement('img');

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');

    const messageSender = document.createElement('p');
    messageSender.classList.add('message-sender');

    const messageText = document.createElement('p');
    messageText.classList.add('message-text');
    messageText.textContent = text;

    if (sender === 'bot') {
        image.src = './icons/bot.png';
        image.classList.add('message-icon');

        messageSender.textContent = 'Тех-поддержка';
    }
    else {
        image.src = './icons/user.png';
        image.classList.add('message-icon', sender);

        messageSender.textContent = 'Пользователь';
    }

    messageBox.appendChild(messageSender);
    messageBox.appendChild(messageText);
    message.appendChild(image);
    message.appendChild(messageBox);

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleAnswer(answer) {
    if (!currentNode.answers || !currentNode.answers[answer]) return;

    history.push(currentNode);
    currentNode = currentNode.answers[answer];

    if (answer === 'yes') {
        addMessage('Да', 'user');
    }
    else {
        addMessage('Нет', 'user');
    }


    if (currentNode.message) {
        addMessage(currentNode.message, "bot");
    } else if (currentNode.question) {
        addMessage(currentNode.question, "bot");
    }
}

function goBack() {
    if (history.length === 0) return;
    currentNode = history.pop();
    addMessage("Назад...", "user");
    addMessage(currentNode.question, "bot");
}

document.addEventListener("DOMContentLoaded", function () {
    const subtitles = document.querySelectorAll(".subtitle");
    const sections = document.querySelectorAll(".tab-subtitle");
    const mainScroll = document.getElementById("main-scroll");

    function onScroll() {
        let scrollPosition = mainScroll.scrollTop + mainScroll.clientHeight / 4.5;

        sections.forEach((section) => {
            let id = section.id;
            let subtitle = document.querySelector(`.subtitle[data-target="${id}"]`);

            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                subtitles.forEach((s) => s.classList.remove("active"));
                subtitle.classList.add("active");
            }
        });
    }

    function scrollToSection(event) {
        const targetId = event.currentTarget.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            mainScroll.scrollTo({
                top: targetSection.offsetTop - 120, // Немного отступа для удобства
                behavior: "smooth",
            });
        }
    }

    subtitles.forEach((subtitle) => {
        subtitle.addEventListener("click", scrollToSection);
    });

    mainScroll.addEventListener("scroll", onScroll);
    onScroll(); // Вызов при загрузке страницы
});


