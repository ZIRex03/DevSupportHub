const sidebar = document.getElementById('sidebar');

function sidebarOpen() {
    sidebar.classList.toggle('active');

    document.getElementById('sidebar-arrow').classList.toggle('active');

}

sidebar.addEventListener('click', () => {
    sidebarOpen();
})

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

        if (sidebar.classList.contains('active')) {

            const boxId = box.id;
            const title = box.querySelector('.title');
            const arrow = box.querySelector('.arrow-down');
            const subtitleBox = document.querySelector(`#${boxId}-subtitle`);
            const image = box.querySelector('.menu-box-icon');
            const src = image.getAttribute('src');
            const isActive = title.classList.contains('active');

            if (isActive) {
                return;
            }

            // Убираем активность у всех табов
            document
                .querySelectorAll(".tab-box")
                .forEach((tab) => tab.classList.remove("active"));

            document.getElementById(box.dataset.tab).classList.add("active");

            setTimeout(() => {
                document.getElementById(box.dataset.tab)
                    .scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Сброс всех активных состояний
            document.querySelectorAll('.title').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.arrow-down').forEach(a => a.classList.remove('rotated'));
            document.querySelectorAll('.subtitle-box').forEach(s => s.style.display = 'none');
            document.querySelectorAll('.menu-box-icon').forEach(s => s.classList.remove('active'));

            // Обновляем текущее состояние
            if (!isActive) {
                title.classList.add('active');
                if (arrow) {
                    arrow.classList.add('rotated');
                }
                if (subtitleBox) {
                    subtitleBox.style.display = 'flex';
                }

                image.classList.add('active');
                // Меняем путь иконки на -active
                const newSrc = src.replace('.png', '-active.png');
                image.setAttribute('src', newSrc);
            }

            // Сбрасываем иконки у других
            document.querySelectorAll('.menu-box-icon').forEach(img => {
                if (img !== image) {
                    const originalSrc = img.getAttribute('src').replace('-active.png', '.png');
                    img.setAttribute('src', originalSrc);
                }
            });
        }
    });
});


document.getElementById('back-problems').addEventListener('click', () => {

    document.getElementById("errors-tab-content").style.display = "flex";
    document.getElementById("chat-container").style.display = "none";
});

const dialogues = {

    noTask: {
        question: "Задачи не отображаются в списке? Давайте проверим возможные причины шаг за шагом. Начнем с простого: вы видите пустой экран или сообщение об ошибке?",
        answers: {
            yes: {
                question: "Это похоже на проблему с фильтрами. Вы проверяли настройки фильтров в верхней панели инструментов?",
                answers: {
                    yes: {
                        question: "Хорошо! Попробуйте сбросить фильтры к значениям по умолчанию. После этого задачи появились?",
                        answers: {
                            yes: {
                                message: "Отлично! Теперь вы знаете, что проблема была в настройках фильтров. Рекомендую сохранить этот параметр как шаблон."
                            },
                            no: {
                                question: "Понял. Давайте проверим кэш браузера. Вы готовы очистить кэш и перезагрузить страницу?",
                                answers: {
                                    yes: {
                                        message: "После перезагрузки проверьте список задач. Если проблема осталась, напишите в поддержку, указав ваш браузер и версию системы."
                                    },
                                    no: {
                                        message: "Рекомендую обратиться к системному администратору с просьбой проверить настройки вашего профиля."
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Давайте проверим фильтры вместе. Видите выпадающий список 'Все задачи' в правом верхнем углу? Выберите там вариант 'Все активные'. Задачи появились?",
                        answers: {
                            yes: {
                                message: "Отлично! Видимо, у вас был применен строгий фильтр. Советую сохранить эти настройки."
                            },
                            no: {
                                question: "Странно. Вы работаете через VPN или корпоративную сеть? Возможно, есть ограничения доступа.",
                                answers: {
                                    yes: {
                                        message: "Попробуйте отключиться от VPN и обновить страницу. Если не поможет - обратитесь к администратору сети."
                                    },
                                    no: {
                                        question: "Последняя проверка: откройте консоль разработчика (F12) и посмотрите, есть ли ошибки на вкладке 'Console'. Видите красные сообщения?",
                                        answers: {
                                            yes: {
                                                message: "Скопируйте текст ошибок и отправьте в техподдержку. Это поможет быстрее решить проблему."
                                            },
                                            no: {
                                                message: "Рекомендую: 1) Попробовать другой браузер 2) Очистить cookies 3) Проверить доступ у коллеги. Если ничего не поможет - нужна детальная диагностика у администратора."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            no: {
                question: "Вы видите конкретное сообщение об ошибке? Например: 'Доступ запрещен' или 'Нет соединения'?",
                answers: {
                    yes: {
                        question: "Это упрощает диагностику! Сообщение содержит слова 'permission', 'access' или 'authorization'?",
                        answers: {
                            yes: {
                                message: "Проблема с правами доступа. Обратитесь к руководителю, чтобы он проверил ваши разрешения в системе."
                            },
                            no: {
                                question: "В сообщении есть упоминание о 'connection', 'network' или 'failed'?",
                                answers: {
                                    yes: {
                                        message: "Проверьте интернет-соединение. Если с ним всё в порядке, возможно, проводятся технические работы. Попробуйте через 15 минут."
                                    },
                                    no: {
                                        message: "Лучше сделать скриншот ошибки и отправить в поддержку. Укажите: 1) Ваши действия перед ошибкой 2) Время возникновения 3) Ваш часовой пояс."
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Очень странно. Вы можете: 1) Создать новую тестовую задачу 2) Перезайти в систему. Пробовали это?",
                        answers: {
                            yes: {
                                message: "Значит проблема именно с отображением существующих задач. Срочно свяжитесь с поддержкой и сообщите, что стандартные методы не помогли."
                            },
                            no: {
                                question: "Давайте проверим базовые вещи: 1) Вы точно залогинены? 2) Проект/спринт выбран в левом меню?",
                                answers: {
                                    yes: {
                                        message: "Тогда это требует глубокой диагностики. Напишите в поддержку, указав: версию браузера, ОС и точное время проблемы."
                                    },
                                    no: {
                                        message: "Ага, вот и причина! Обновите страницу, правильно выберите проект и проверьте список задач снова. Должно помочь!"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    errorNewProject: {
        question: "Ой, не получается создать новый проект? Давайте разберёмся вместе. Сначала уточню: при попытке создания вы видите конкретное сообщение об ошибке или просто ничего не происходит?",
        answers: {
            yes: {
                question: "Понял. В сообщении есть слова 'доступ', 'permission' или 'authorization'? Это может быть важно.",
                answers: {
                    yes: {
                        question: "Похоже на проблему с правами. Ваш аккаунт точно имеет роль 'Менеджер проектов' или 'Администратор' в системе?",
                        answers: {
                            yes: {
                                question: "Странно... А вы не меняли организацию/команду в правом верхнем углу? Иногда доступы привязаны к конкретной организации.",
                                answers: {
                                    yes: {
                                        message: "Попробуйте вернуть прежнюю организацию или попросите администратора проверить ваши права в новой."
                                    },
                                    no: {
                                        message: "Тогда нужно проверить: 1) Настройки вашей роли в AD 2) Лимиты проектов в вашей подписке. Обратитесь к администратору с этими деталями."
                                    }
                                }
                            },
                            no: {
                                message: "Вот в чём дело! Попросите вашего руководителя повысить права до 'Менеджера проектов'. Обычно это делается за 5 минут в настройках команды."
                            }
                        }
                    },
                    no: {
                        question: "Хорошо. В ошибке упоминается 'диск', 'storage' или 'превышен лимит'? Это поможет определить направление.",
                        answers: {
                            yes: {
                                message: "Значит, закончилось место в хранилище. Что можно сделать: 1) Удалить старые тестовые проекты 2) Попросить администратора увеличить квоту 3) Очистить вложения в существующих проектах."
                            },
                            no: {
                                question: "Последняя проверка: откройте консоль разработчика (F12 → Console). Видите там красные ошибки при попытке создать проект?",
                                answers: {
                                    yes: {
                                        message: "Отлично! Сохраните скриншот этих ошибок (Ctrl+P → Save as PDF) и отправьте в поддержку. Обязательно укажите: 1) Точное время ошибки 2) Ваш браузер и версию."
                                    },
                                    no: {
                                        message: "Очень нестандартный случай. Попробуйте: 1) Другой браузер 2) Режим инкогнито 3) VPN. Если не поможет — нужна удалённая диагностика. Обратитесь в поддержку с пометкой 'Срочно'."
                                    }
                                }
                            }
                        }
                    }
                }
            },
            no: {
                question: "Понял. Давайте проверим базовые вещи: вы точно нажимаете кнопку '+ Новый проект' в правом верхнем углу, а не через меню 'Файл'? (Иногда это важно)",
                answers: {
                    yes: {
                        question: "Хорошо. А в момент создания курсор не превращается в 'песочные часы' даже на секунду?",
                        answers: {
                            yes: {
                                question: "Странно... Вы работаете через VPN или корпоративную сеть? Возможно, блокируются запросы.",
                                answers: {
                                    yes: {
                                        message: "Попробуйте: 1) Отключить VPN на минуту 2) Использовать мобильный интернет 3) Проверить, открывается ли сайт через телефон."
                                    },
                                    no: {
                                        question: "Попробуйте создать пустой проект без параметров (просто нажмите 'Пропустить настройку'). Сработало?",
                                        answers: {
                                            yes: {
                                                message: "Значит проблема в шаблоне проекта. Попробуйте другой шаблон или создайте пустой, а настройки добавьте позже."
                                            },
                                            no: {
                                                message: "Срочно обратитесь в поддержку и укажите: 1) Вашу ОС и версию браузера 2) Были ли недавние обновления системы 3) Примерное время, когда перестало работать."
                                            }
                                        }
                                    }
                                }
                            },
                            no: {
                                message: "Значит система получает запрос, но не отвечает. Подождите 5 минут и проверьте вкладку 'Мои проекты' — возможно, он создался, но интерфейс не обновился."
                            }
                        }
                    },
                    no: {
                        message: "Ага, вот и причина! Кнопка в меню 'Файл' сейчас не работает — используйте главную кнопку создания. Мы уже чиним эту проблему в следующем обновлении!"
                    }
                }
            }
        }
    },

    errorReport: {
        question: "Ой, отчет не формируется? Давайте разберемся, что происходит. Когда вы нажимаете 'Создать отчет', система выдает ошибку или просто ничего не происходит?",
        answers: {
            yes: {
                question: "Понял. В сообщении об ошибке есть слова 'формат', 'недоступен' или 'неподдерживаемый'? Это важно для диагностики.",
                answers: {
                    yes: {
                        question: "Вы пытаетесь экспортировать в PDF, Excel или другой формат? Может, попробовать другой вариант?",
                        answers: {
                            yes: {
                                message: "Отлично! Значит, проблема с конкретным форматом. Попробуйте: 1) Экспорт в CSV 2) Печать в PDF через виртуальный принтер. Если нужно именно этот формат - сообщите в поддержку."
                            },
                            no: {
                                question: "А в настройках профиля у вас выбран язык 'Русский'? Иногда бывают проблемы с кодировкой при других языках.",
                                answers: {
                                    yes: {
                                        message: "Тогда это системная ошибка. Нажмите Ctrl+Shift+I → вкладка Console → сделайте скриншот красных сообщений и отправьте в поддержку с пометкой 'Ошибка экспорта'."
                                    },
                                    no: {
                                        message: "Попробуйте временно переключиться на русский язык в настройках профиля и повторить попытку. Часто это решает проблемы с кодировкой."
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "В ошибке упоминается 'память', 'memory' или 'превышен лимит'? Это поможет определить направление.",
                        answers: {
                            yes: {
                                message: "Значит, не хватает ресурсов. Что можно сделать: 1) Уменьшить период отчета 2) Убрать некоторые колонки 3) Попробовать ночью, когда нагрузка на сервер меньше."
                            },
                            no: {
                                question: "Откройте консоль разработчика (F12 → Console). Видите там ошибки при попытке генерации?",
                                answers: {
                                    yes: {
                                        message: "Отлично! Сохраните эти ошибки (правой кнопкой → Save as) и прикрепите к заявке в поддержку. Укажите: 1) Точное время 2) Размер данных 3) Выбранный формат."
                                    },
                                    no: {
                                        message: "Очень нестандартный случай. Попробуйте: 1) Другой браузер 2) Режим инкогнито 3) Очистить кэш. Если не поможет — нужна удаленная диагностика. Обратитесь в поддержку с пометкой 'Срочно'."
                                    }
                                }
                            }
                        }
                    }
                }
            },
            no: {
                question: "Понял. Давайте проверим: вы точно выбрали правильный период для отчета? Не превышает ли он 3 месяцев? (Для больших периодов есть отдельная функция)",
                answers: {
                    yes: {
                        question: "Хорошо. А все обязательные поля (отмеченные *) заполнены? Курсор не мигает в незаполненных полях?",
                        answers: {
                            yes: {
                                question: "Странно... Вы нажимаете 'Сформировать' или 'Экспортировать'? Попробуйте сначала сформировать для просмотра, потом экспортировать.",
                                answers: {
                                    yes: {
                                        message: "Ага! Значит проблема именно в экспорте. Попробуйте: 1) Просмотреть отчет в веб-версии 2) Скопировать таблицу вручную 3) Использовать 'Печать' → 'Сохранить как PDF'."
                                    },
                                    no: {
                                        message: "Тогда попробуйте сократить количество колонок или применить фильтры. Если отчет все равно не генерируется — обратитесь в поддержку, указав параметры запроса."
                                    }
                                }
                            },
                            no: {
                                message: "Вот в чем дело! Система подсвечивает незаполненные поля красным. Заполните их и попробуйте снова. Если не видите подсветки — обновите страницу."
                            }
                        }
                    },
                    no: {
                        question: "Вы пытаетесь сформировать отчет за большой период? Для периодов больше 3 месяцев используйте 'Расширенный отчет' в меню 'Аналитика'.",
                        answers: {
                            yes: {
                                message: "Попробуйте: 1) Разбить период на части 2) Использовать 'Расширенный отчет' 3) Запросить автоматическую выгрузку у администратора."
                            },
                            no: {
                                message: "Тогда проверьте: 1) Дату начала не позже даты окончания 2) Корректность формата дат 3) Не стоят ли специальные фильтры. Если все верно — обратитесь в поддержку."
                            }
                        }
                    }
                }
            }
        }
    },

    errorLogin: {
        question: "Не получается войти в систему? Давайте вместе разберёмся. Когда вы вводите логин/пароль, что происходит: появляется сообщение об ошибке или просто ничего не меняется?",
        answers: {
            yes: {
                question: "Понял. Сообщение содержит слова 'неверный пароль', 'учётная запись не найдена' или 'аккаунт заблокирован'? Это важно для диагностики.",
                answers: {
                    yes: {
                        question: "Если это 'неверный пароль' - вы недавно меняли его? Возможно, старый пароль сохранился в браузере.",
                        answers: {
                            yes: {
                                message: "Попробуйте: 1) Очистить автозаполнение паролей в браузере 2) Ввести пароль вручную 3) Проверить раскладку клавиатуры (особенно если есть символы)."
                            },
                            no: {
                                question: "У вас включён Caps Lock или Num Lock? Иногда это влияет на ввод пароля.",
                                answers: {
                                    yes: {
                                        message: "Попробуйте отключить эти клавиши и ввести пароль заново. Обратите внимание на индикаторы на клавиатуре."
                                    },
                                    no: {
                                        message: "Тогда воспользуйтесь функцией 'Забыли пароль'. Если письмо не приходит в течение 5 минут - проверьте папку 'Спам' или обратитесь к администратору."
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Сообщение говорит о 'блокировке' или 'превышении попыток'?",
                        answers: {
                            yes: {
                                message: "Подождите 15 минут и попробуйте снова. Если проблема повторяется - возможно, кто-то пытается войти под вашим логином. Срочно сообщите администратору."
                            },
                            no: {
                                question: "Откройте консоль разработчика (F12 → Console). Видите там красные ошибки при попытке входа?",
                                answers: {
                                    yes: {
                                        message: "Сохраните скриншот ошибок (Ctrl+Shift+P → 'Capture screenshot') и отправьте в поддержку. Укажите: 1) Ваш браузер 2) Время ошибки 3) Используете ли вы VPN."
                                    },
                                    no: {
                                        message: "Попробуйте: 1) Другой браузер 2) Режим инкогнито 3) Отключить все расширения. Если не поможет - нужна удалённая диагностика."
                                    }
                                }
                            }
                        }
                    }
                }
            },
            no: {
                question: "Понял. Давайте проверим базовые вещи: страница полностью загружается? Кнопка 'Войти' реагирует на нажатие (меняет цвет)?",
                answers: {
                    yes: {
                        question: "Странно... Вы работаете через VPN или корпоративный прокси? Возможно, блокируются запросы.",
                        answers: {
                            yes: {
                                message: "Попробуйте: 1) Отключить VPN на 2 минуты 2) Использовать мобильный интернет 3) Проверить вход с другого устройства."
                            },
                            no: {
                                question: "На вашем компьютере недавно обновлялась дата/время? Неправильные настройки времени могут мешать авторизации.",
                                answers: {
                                    yes: {
                                        message: "Исправьте дату и время (должны определяться автоматически), затем очистите кэш браузера и попробуйте снова."
                                    },
                                    no: {
                                        message: "Очень необычный случай. Попробуйте: 1) Очистить cookies сайта 2) Отключить файервол на минуту 3) Проверить, открывается ли сайт у коллег. Если нет - срочно сообщите в IT-отдел."
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Страница зависает при вводе логина? Или после нажатия 'Войти' просто обновляется форма?",
                        answers: {
                            yes: {
                                message: "Попробуйте: 1) Обновить страницу (Ctrl+F5) 2) Очистить кэш 3) Проверить интернет-соединение. Если проблема останется - возможно, повреждены файлы сайта в кэше."
                            },
                            no: {
                                message: "Значит, проблема с отправкой данных. Проверьте: 1) Работает ли интернет 2) Не блокирует ли антивирус соединение 3) Попробуйте другой браузер. Если не поможет - обратитесь в поддержку."
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
    document.getElementById('chat-buttons').style.display = 'flex';
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

        setTimeout(() => {
            const chatBox = document.getElementById("chat");
            const message = document.createElement("div");
            message.classList.add('final-message');
            const text = document.createElement('p');
            text.textContent = 'Данный диалог завершен';
            message.appendChild(text);
            chatBox.appendChild(message);

            chatBox.scrollTop = chatBox.scrollHeight;

            document.getElementById('chat-buttons').style.display = 'none';
        }, 1000)



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


