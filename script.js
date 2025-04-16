const sidebar = document.getElementById('sidebar');

function sidebarOpen() {
    sidebar.classList.toggle('active');

    document.getElementById('sidebar-arrow').classList.toggle('active');

}

sidebar.addEventListener('click', () => {
    sidebarOpen();
})

// const checkboxTheme = document.getElementById('theme');

// var isDark = true;

// checkboxTheme.checked = isDark;

// checkboxTheme.addEventListener('change', () => {

//     isDark = checkboxTheme.checked;

//     if (isDark) {
//         document.querySelector('body').className = 'dark';
//     }
//     else {
//         document.querySelector('body').className = '';
//     }
// })

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

    realTimeUpdateIssue: {
        question: "Данные в системе не обновляются автоматически? Давайте проверим возможные причины. Первый вопрос: вы видите старые данные или вообще пустой экран?",
        answers: {
            yes: {
                question: "Проблема проявляется при действиях других пользователей? (Например, они создают задачу, но вы её не видите)",
                answers: {
                    yes: {
                        question: "Проверьте консоль браузера (F12 → вкладка 'Console'). Есть ли ошибки красным цветом?",
                        answers: {
                            yes: {
                                message: "Полная инструкция по исправлению ошибок в консоли:\n\n1. Копирование ошибки:\n   - В консоли нажмите ЛЕВОЙ кнопкой мыши на текст ошибки\n   - Нажмите Ctrl+C (Windows) или Cmd+C (Mac) для копирования\n   - Вставьте в текстовый файл (Ctrl+V) или сразу в письмо поддержки\n\n2. Проверка интернета:\n   - Посмотрите на значок Wi-Fi/сети в правом нижнем углу (Windows) или вверху экрана (Mac)\n   - Если значок с восклицательным знаком ❗ — кликните по нему и выберите 'Устранение неполадок'\n\n3. Для ошибок WebSocket/Socket.io:\n   - Отключите VPN:\n     1. Найдите значок VPN в той же панели\n     2. Кликните правой кнопкой → 'Отключиться'\n   - Отключите антивирус на 5 минут:\n     1. Найдите иконку антивируса около часов\n     2. Правой кнопкой → 'Временно отключить защиту'\n   - Жесткая перезагрузка:\n     1. Нажмите Ctrl+F5 (удерживайте Ctrl и нажмите F5)\n     2. Или зажмите Shift и кликните по значку обновления в браузере\n\n4. Если проблема осталась:\n   - Сфотографируйте экран (кнопка PrintScreen или Win+Shift+S)\n   - Напишите в поддержку:\n     1. Текст ошибки (который скопировали)\n     2. Ваш браузер и версию (находится в Настройках → 'О браузере')\n     3. Что вы уже пробовали (из пунктов выше)"
                            },
                            no: {
                                question: "Ваш браузер — Chrome/Firefox последней версии?",
                                answers: {
                                    yes: {
                                        message: "Подробная инструкция по очистке кэша:\n\n1. Очистка кэша браузера:\n   - Нажмите одновременно клавиши: Ctrl + Shift + Delete (Windows) или Cmd + Shift + Delete (Mac)\n   - В открывшемся окне выберите: \n     ✓ 'Файлы cookie и другие данные сайтов'\n     ✓ 'Изображения и другие файлы, сохраненные в кэше'\n   - Установите диапазон времени 'Все время'\n   - Нажмите 'Удалить данные'\n\n2. Перезаход в систему:\n   - Нажмите на значок профиля в правом верхнем углу браузера\n   - Выберите 'Выйти'\n   - Закройте все вкладки браузера\n   - Откройте браузер снова и авторизуйтесь\n\n3. Проверка в другом браузере:\n   - Скачайте альтернативный браузер (если нет):\n     - Chrome: https://www.google.com/chrome/\n     - Firefox: https://www.mozilla.org/firefox/\n   - Установите и откройте новый браузер\n   - Попробуйте выполнить те же действия\n\n4. Ручное обновление:\n   - Находясь на нужной странице, нажмите F5 или иконку обновления\n   - Для полного обновления (без кэша): Ctrl + F5 (Windows) или Cmd + Shift + R (Mac)"
                                    },
                                    no: {
                                        message: "Срочное обновление браузера:\n\n1. Для Google Chrome:\n   - Нажмите на три точки в правом верхнем углу → 'Справка' → 'О браузере Google Chrome'\n   - Браузер автоматически проверит обновления\n   - Нажмите 'Перезапустить', если будет доступно обновление\n\n2. Для Mozilla Firefox:\n   - Нажмите на три линии в правом верхнем углу → 'Справка' → 'О Firefox'\n   - Дождитесь завершения проверки обновлений\n   - Нажмите 'Перезапустить для обновления'\n\n3. Альтернативные варианты:\n   - Если обновление невозможно, скачайте свежую версию:\n     - Chrome: https://www.google.com/chrome/\n     - Firefox: https://www.mozilla.org/firefox/\n   - Удалите старую версию через 'Панель управления' → 'Программы и компоненты'\n   - Установите скачанную версию\n\n4. Проверка версии:\n   - После обновления снова зайдите в 'О браузере'\n   - Убедитесь, что версия последняя (на момент 2024 года):\n     - Chrome: версия 120+\n     - Firefox: версия 120+"
                                    }
                                }
                            }
                        }
                    },
                    no: {
                        question: "Проблема только с некоторыми типами данных? (Например, задачи обновляются, а комментарии — нет)",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Проверьте настройки уведомлений (колокольчик в правом верхнем углу)\n2. Попросите коллегу изменить данные\n3. Если проблема только для одного раздела — сообщите в поддержку с примером данных."
                            },
                            no: {
                                message: "Инструкция:\n1. Выйдите из системы (полностью через 'Выход')\n2. Закройте все вкладки системы\n3. Откройте новую вкладку в режиме инкогнито (Ctrl+Shift+N)\n4. Авторизуйтесь и проверьте работу."
                            }
                        }
                    }
                }
            },
            no: {
                question: "Система показывает сообщение об ошибке вместо данных?",
                answers: {
                    yes: {
                        question: "В ошибке есть слова 'WebSocket', 'Connection' или 'Network'?",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Проверьте интернет-соединение\n2. Отключите VPN/прокси\n3. Если в офисе — спросите у коллег, есть ли у них такая же проблема\n4. Попробуйте подключиться с мобильного интернета."
                            },
                            no: {
                                message: "Инструкция:\n1. Сделайте скриншот ошибки\n2. Перезагрузите роутер\n3. Попробуйте зайти с другого устройства\n4. Отправьте скриншот и шаги воспроизведения в поддержку."
                            }
                        }
                    },
                    no: {
                        question: "Ручное обновление (F5) решает проблему?",
                        answers: {
                            yes: {
                                "message": "Временное решение проблемы с real-time обновлением:\n\n1. О проблеме:\n   - Ручное обновление работает, значит соединение в реальном времени нестабильно\n   - Это может быть вызвано:\n     • Проблемами с WebSocket соединением\n     • Блокировкой со стороны клиента\n\n2. Проверка блокировщиков:\n   - Найдите иконку расширения (обычно справа от адресной строки)\n   - Для AdBlock/uBlock:\n     1. Кликните по иконке\n     2. Выберите 'Не запускать на страницах этого сайта'\n     3. Нажмите 'Исключить' или 'Отключить'\n\n3. Проверка других расширений:\n   - Введите в адресной строке: chrome://extensions/\n   - Поочередно отключайте расширения кнопкой 'Выкл.'\n   - После каждого отключения проверяйте работу real-time\n\n4. Для поддержки:\n   - Зафиксируйте частоту проблем:\n     • 'Требуется обновлять каждые 5-10 минут'\n     • 'После 30 минут бездействия перестает работать'\n   - Укажите какие расширения у вас установлены"
                            },
                            no: {
                                "message": "Серьезная диагностика проблемы:\n\n1. Проверка API соединений:\n   - Откройте DevTools: F12 или Ctrl+Shift+I\n   - Перейдите на вкладку 'Network'\n   - В поле фильтра введите: 'api/' или 'socket'\n   - Обновите страницу (F5)\n\n2. Анализ статусов:\n   - Нормальные статусы: 200 (OK) или 101 (WebSocket)\n   - Проблемные статусы:\n     • 403 - Нет доступа (попробуйте выйти и зайти)\n     • 500 - Ошибка сервера (нужна помощь администратора)\n     • 404 - Неверный URL (сообщите разработчикам)\n\n3. Действия по статусам:\n   - Для 403:\n     1. Нажмите 'Выйти' в системе\n     2. Закройте все вкладки приложения\n     3. Откройте новую вкладку и авторизуйтесь\n   - Для 500/404:\n     1. Сделайте скриншот вкладки Network\n     2. Скопируйте текст ошибки из консоли (F12 → Console)\n     3. Отправьте в поддержку\n\n4. Если все статусы 200:\n   - Сохраните логи:\n     1. В консоли (F12 → Console) нажмите правой кнопкой\n     2. Выберите 'Save as...'\n     3. Отправьте файл администратору"
                            }
                        }
                    }
                }
            }
        }
    },

    nodejsCrashIssue: {
        question: "Сервер падает при увеличении нагрузки? Давайте диагностируем. Первое: падение происходит в случайные моменты или при конкретных действиях?",
        answers: {
            yes: {
                question: "В логах сервера перед падением есть сообщения об ошибках памяти (OOM) или CPU?",
                answers: {
                    yes: {
                        message: "Подробная инструкция по устранению проблем с памятью и CPU:\n\n1. СРОЧНЫЕ МЕРЫ:\n\n   • Увеличение лимитов памяти в PM2:\n     1. Остановите приложение: \n        `pm2 stop your_app_name`\n     2. Запустите с новыми настройками:\n        `pm2 start app.js --name your_app_name --max-memory-restart 1G`\n     3. Проверьте статус:\n        `pm2 list`\n\n   • Добавление swap-файла (для серверов с малым объемом RAM):\n     1. Создайте swap-файл (4GB):\n        `sudo fallocate -l 4G /swapfile`\n     2. Настройте права:\n        `sudo chmod 600 /swapfile`\n     3. Активируйте:\n        `sudo mkswap /swapfile`\n        `sudo swapon /swapfile`\n     4. Добавьте в fstab для автозагрузки:\n        `echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`\n\n2. ОПТИМИЗАЦИЯ ПРИЛОЖЕНИЯ:\n\n   • Поиск утечек памяти:\n     1. Запустите приложение в режиме дебага:\n        `node --inspect app.js`\n     2. Откройте в Chrome: chrome://inspect\n     3. Во вкладке 'Memory' сделайте heap snapshot\n\n   • Анализ дампов памяти:\n     1. Установите heapdump:\n        `npm install heapdump`\n     2. Добавьте в код:\n        `const heapdump = require('heapdump');`\n        `process.on('SIGUSR2', () => {\n          heapdump.writeSnapshot();\n        });`\n     3. Для создания дампа:\n        `kill -USR2 ваш_процесс_id`\n\n3. МОНИТОРИНГ И ПРОФИЛАКТИКА:\n\n   • Настройка алертов в PM2:\n     1. Установите pm2-metrics:\n        `pm2 install pm2-metrics`\n     2. Настройте мониторинг:\n        `pm2 monit`\n\n   • Рекомендации по конфигурации:\n     - Для Node.js приложений выделяйте 80% доступной RAM\n     - Установите лимит:\n       `export NODE_OPTIONS=--max_old_space_size=4096` (для 4GB)\n\n   • Полезные команды для диагностики:\n     - Мониторинг памяти в реальном времени:\n       `htop` или `glances`\n     - Проверка использования CPU:\n       `mpstat -P ALL 1`\n     - Анализ нагрузки:\n       `vmstat 1`"
                    },
                    no: {
                        question: "Падение происходит во время запросов к базе данных?",
                        answers: {
                            yes: {
                                message: "Решение проблем с базой данных:\n\n1. СРОЧНЫЕ МЕРЫ:\n\n   • Проверка активных соединений:\n     1. Откройте MySQL консоль:\n        `mysql -u ваш_логин -p`\n     2. Введите команду:\n        `SHOW PROCESSLIST;`\n     3. Что искать:\n        - Долгие запросы (колонка Time > 10)\n        - Зависшие соединения (State = 'Locked')\n\n   • Ограничение соединений:\n     1. Для Node.js приложений найдите в коде настройки базы данных\n     2. Установите лимит (пример для Sequelize):\n        `pool: { max: 5, min: 0, idle: 10000 }`\n\n2. ОПТИМИЗАЦИЯ БАЗЫ ДАННЫХ:\n\n   • Добавление индексов:\n     1. Найдите медленные запросы в логах MySQL\n     2. Для часто используемых полей в WHERE создайте индекс:\n        `ALTER TABLE имя_таблицы ADD INDEX (поле);`\n\n   • Настройка кэширования:\n     1. Установите Redis: `sudo apt install redis-server`\n     2. В коде приложения для популярных запросов добавьте:\n        ```\n        if(есть_в_redis) {\n          вернуть_из_кэша\n        } else {\n          выполнить_запрос_к_бд\n          сохранить_в_redis\n        }\n        ```\n\n3. НАДЕЖНОСТЬ СОЕДИНЕНИЙ:\n\n   • Автопереподключение:\n     1. В настройках подключения к БД добавьте:\n        `retry: { max: 3, timeout: 5000 }`\n     2. Обрабатывайте ошибки соединения:\n        ```\n        try { запрос_к_бд } \n        catch(err) { переподключиться }\n        ```"
                            },
                            no: {
                                message: "Решение общих проблем сервера:\n\n1. ВКЛЮЧЕНИЕ ЛОГИРОВАНИЯ:\n\n   • Логирование запросов:\n     1. Установите morgan: `npm install morgan`\n     2. Добавьте в начало вашего приложения (app.js):\n        ```\n        const morgan = require('morgan');\n        app.use(morgan('combined'));\n        ```\n\n   • Ловим необработанные ошибки:\n     1. Добавьте в основной файл приложения:\n        ```\n        process.on('uncaughtException', (err) => {\n          console.error('Критическая ошибка:', err);\n        });\n        ```\n\n2. ПРОВЕРКА ФОНОВЫХ ПРОЦЕССОВ:\n\n   • Найдите все cron-задачи:\n     `crontab -l`\n\n   • Проверьте запущенные процессы:\n     `ps aux | grep ваш_процесс`\n\n   • Для подозрительных процессов:\n     1. Запишите их ID (вторая колонка)\n     2. Остановите: `kill -9 ID_процесса`\n\n3. ТЕСТИРОВАНИЕ НАГРУЗКИ:\n\n   • Установите Artillery:\n     `npm install -g artillery`\n\n   • Создайте тестовый сценарий (test.yml)\n • Запустите тест:\n     `artillery run test.yml`\n\n   • Анализируйте отчет (появится после завершения)"
                            }
                        }
                    }
                }
            },
            no: {
                question: "Сервер перезагружается сам (например, через PM2) или полностью падает?",
                answers: {
                    yes: {
                        question: "PM2 настроен на автоматический перезапуск при ошибках?",
                        answers: {
                            yes: {
                                message: "Инструкция по решению:\n1. Анализ:\n   - Проверьте логи: `pm2 logs --lines 200`\n   - Найдите паттерн перед перезапусками\n2. Настройка:\n   - Уменьшите частоту перезапусков: `--restart-delay 5000`\n   - Ограничьте попытки: `--max-restarts 10`\n3. Добавьте мониторинг через `pm2-monit`"
                            },
                            no: {
                                message: "Инструкция по решению:\n1. Настройте базовый мониторинг:\n   - `pm2 startup` + `pm2 save`\n   - Логирование в файл: `--log date.log`\n2. Установите лимиты:\n   - `--max-memory-restart 500M`\n   - `--exp-backoff-restart-delay 100`\n3. Для production используйте кластер: `-i max`"
                            }
                        }
                    },
                    no: {
                        question: "После падения требуется ручной запуск сервера?",
                        answers: {
                            yes: {
                                message: "Критическая инструкция:\n1. Немедленно:\n   - Добавьте systemd-юнит для Node.js\n   - Настройте `Restart=always` и `RestartSec=3`\n2. Диагностика:\n   - Проверьте `dmesg` на наличие OOM-killer\n   - Анализируйте core-дампы\n3. Резервирование:\n   - Разверните backup-экземпляр сервера"
                            },
                            no: {
                                message: "Инструкция по глубокой диагностике:\n1. Включите:\n   - Логирование событий цикла событий\n   - Трассировку асинхронных операций\n2. Проверьте:\n   - Состояние event loop при падении\n   - Активность потоков Worker'ов\n3. Инструменты:\n   - Clinic.js\n   - Async_hooks\n   - Визуализатор потоков"
                            }
                        }
                    }
                }
            }
        }
    },

    mysqlSlowQueryIssue: {
        question: "Запросы к MySQL выполняются дольше обычного? Начнем диагностику. Первое: проблема проявляется для всех запросов или только определенных?",
        answers: {
            yes: {
                question: "Заметили ли вы резкое ухудшение (например, вчера работало быстро, сегодня медленно)?",
                answers: {
                    yes: {
                        question: "Были ли изменения в структуре БД/коде приложения перед появлением проблемы?",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Откатите последние изменения схемы БД\n2. Проверьте ALTER-запросы в логах MySQL\n3. Для больших таблиц используйте pt-online-schema-change\n4. Оптимизируйте новые индексы: ANALYZE TABLE problematic_table"
                            },
                            no: {
                                message: "Инструкция:\n1. Проверьте нагрузку на сервер (top/htop)\n2. Запустите: SHOW PROCESSLIST для выявления блокировок\n3. Проверьте свободное место на диске\n4. Проанализируйте логи MySQL на предмет ошибок InnoDB"
                            }
                        }
                    },
                    no: {
                        question: "Медленные запросы содержат JOIN или подзапросы?",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Выполните EXPLAIN для проблемного запроса\n2. Оптимизируйте JOIN: \n   - Добавьте индексы на поля связи\n   - Уменьшите размер выборки (LIMIT)\n3. Замените подзапросы временными таблицами\n4. Проверьте статистику таблиц: ANALYZE TABLE"
                            },
                            no: {
                                message: "Инструкция:\n1. Включите slow-query-log\n2. Проверьте: SHOW INDEX FROM table_name\n3. Для простых SELECT добавьте покрывающие индексы\n4. Увеличьте sort_buffer_size и read_buffer_size"
                            }
                        }
                    }
                }
            },
            no: {
                question: "Проблема возникает только в определенное время суток?",
                answers: {
                    yes: {
                        question: "Совпадает ли это время с бэкапами или другими scheduled-задачами?",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Перенесите бэкапы на ночное время\n2. Оптимизируйте cron-задачи: \n   - Разнесите по времени\n   - Установите низкий приоритет (nice/ionice)\n3. Для mysqldump используйте --single-transaction"
                            },
                            no: {
                                message: "Инструкция:\n1. Настройте мониторинг (Prometheus + Grafana)\n2. Проверьте периодические процессы:\n   - Очистка логов\n   - Генерация отчетов\n3. Оптимизируйте триггеры и хранимые процедуры"
                            }
                        }
                    },
                    no: {
                        question: "При выполнении SHOW PROCESSLIST видно много запросов в состоянии 'Sending data' или 'Copying to tmp table'?",
                        answers: {
                            yes: {
                                message: "Инструкция:\n1. Оптимизируйте запросы с временными таблицами:\n   - Увеличьте tmp_table_size\n   - Добавьте индексы для GROUP BY/ORDER BY\n2. Проверьте размеры таблиц\n3. Рассмотрите партиционирование больших таблиц"
                            },
                            no: {
                                message: "Инструкция:\n1. Проверьте конфигурацию InnoDB:\n   - innodb_buffer_pool_size (должен быть ~80% RAM)\n   - innodb_io_capacity\n2. Обновите статистику: ANALYZE TABLE\n3. Проверьте диск (iowait в top)"
                            }
                        }
                    }
                }
            }
        }
    },

    corsErrorIssue: {
        question: "Получаете ошибку CORS при обращении к API? Давайте разберёмся. Первое: ошибка возникает в development (локально) или production?",
        answers: {
            yes: {
                question: "Ошибка содержит сообщение 'Access-Control-Allow-Origin'?",
                answers: {
                    yes: {
                        question: "Ваш фронтенд и бэкенд работают на разных доменах/портах?",
                        answers: {
                            yes: {
                                message: "Полное решение CORS для разных доменов:\n\n1. Настройка бэкенда (Node.js/Express):\n\n   • Установите пакет CORS:\n     `npm install cors`\n\n   • Добавьте в основной файл сервера (app.js/server.js):\n     ```javascript\n     const cors = require('cors');\n     \n     // Простейшая настройка (для разработки)\n     app.use(cors({\n       origin: 'http://localhost:3000', // Укажите ваш фронтенд-адрес\n       methods: ['GET', 'POST', 'PUT', 'DELETE'],\n       credentials: true\n     }));\n     ```\n\n2. Настройка Nginx (если используете):\n\n   • Откройте конфиг сайта:\n     `sudo nano /etc/nginx/sites-available/your-site`\n\n   • Добавьте в server {...}:\n     ```nginx\n     location / {\n       add_header 'Access-Control-Allow-Origin' 'http://ваш-фронтенд';\n       add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\n       add_header 'Access-Control-Allow-Headers' 'Content-Type';\n       \n       if ($request_method = OPTIONS) {\n         return 204;\n       }\n     }\n     ```\n\n3. Перезапуск сервисов:\n\n   • Для Node.js: просто перезапустите сервер\n   • Для Nginx:\n     ```bash\n     sudo nginx -t  # Проверить конфиг\n     sudo systemctl restart nginx\n     ```"
                            },
                            no: {
                                message: "Решение проблем CORS при одинаковых доменах:\n\n1. Проверка совпадения доменов:\n\n   • В браузере сравните точные адреса:\n     - Фронтенд: посмотрите в адресной строке\n     - Бэкенд: откройте DevTools (F12) → Network → посмотрите адрес запроса\n     \n   • Что должно совпадать:\n     - http vs https\n     - www.example.com vs example.com\n     - Порт (если указан)\n\n2. Включение логов CORS:\n\n   • Добавьте в ваш Express-сервер:\n     ```javascript\n     app.use((req, res, next) => {\n       console.log('=== CORS DEBUG ===');\n       console.log('Origin:', req.headers.origin);\n       console.log('Method:', req.method);\n       console.log('Headers:', req.headers);\n       next();\n     });\n     ```\n\n3. Проверка дублирования CORS:\n\n   • Найдите в вашем коде все места где есть:\n     - `app.use(cors())`\n     - Ручные установки заголовков (`res.header()`)\n   \n   • Оставьте ТОЛЬКО ОДНУ настройку CORS\n\n4. Дополнительные проверки:\n\n   • Если используете прокси (Nginx, Apache) - проверьте его настройки\n   • Отключите на время Cloudflare или другие CDN\n   • Попробуйте отправить запрос через Postman - если работает, проблема именно в CORS"
                            }
                        }
                    },
                    no: {
                        question: "Ошибка возникает только для POST/PUT запросов?",
                        answers: {
                            yes: {
                                message: "Решение проблем с preflight-запросами:\n\n1. Обработка OPTIONS-запросов:\n\n   • Добавьте в ваш Express-сервер (до всех роутов!):\n     ```javascript\n     // Разрешаем preflight-запросы для всех маршрутов\n     app.options('*', cors());\n     \n     // Или для конкретного маршрута\n     app.options('/your-route', cors());\n     ```\n\n2. Настройка обязательных заголовков:\n\n   • В вашем middleware CORS добавьте:\n     ```javascript\n     app.use((req, res, next) => {\n       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');\n       res.header('Access-Control-Allow-Credentials', 'true');\n       next();\n     });\n     ```\n\n3. Настройка фронтенда (Axios):\n\n   • В файле инициализации API:\n     ```javascript\n     import axios from 'axios';\n     \n     axios.defaults.withCredentials = true;\n     \n     // Для всех запросов\n     axios.interceptors.request.use(config => {\n       config.headers['Content-Type'] = 'application/json';\n       return config;\n     });\n     ```"
                            },
                            no: {
                                message: "Общее решение CORS-проблем:\n\n1. Проверка порядка middleware:\n\n   • Убедитесь, что CORS middleware подключен ДО роутов:\n     ```javascript\n     // Правильный порядок:\n     app.use(cors());\n     app.use(express.json());\n     app.use('/api', yourRoutes); // Роуты подключаются последними\n     ```\n\n2. Проверка заголовков ответа:\n\n   • Убедитесь, что заголовки устанавливаются ДО отправки ответа:\n     ```javascript\n     // Неправильно:\n     res.send(data);\n     res.header('X-Header', 'Value'); // Уже поздно!\n     \n     // Правильно:\n     res.header('X-Header', 'Value');\n     res.send(data);\n     ```\n\n3. Настройка Cloudflare/CDN:\n\n   • Временное отключение CORS-защиты:\n     1. Зайдите в панель Cloudflare\n     2. Выберите ваш домен → Правила → Page Rules\n     3. Добавьте правило для вашего API-адреса:\n        ```\n        URL-шаблон: api.yoursite.com/*\n        Настройки: CORS Protection → Off\n        ```\n   • Альтернативно - отключите проксирование (серый облачко → оранжевое)"
                            }
                        }
                    }
                }
            },
            no: {
                question: "Ошибка появляется после деплоя на production?",
                answers: {
                    yes: {
                        question: "Используете ли вы CDN/прокси (Cloudflare, Nginx)?",
                        answers: {
                            yes: {
                                message: "Решение:\n1. В Cloudflare:\n   - Отключите 'CORS Protection' в Rules\n   - Добавьте Page Rule с заголовками\n2. В Nginx/Apache:\n   ```nginx\n   location /api {\n     if ($request_method = OPTIONS) {\n       add_header 'Access-Control-Allow-Origin' '$http_origin';\n       add_header 'Access-Control-Allow-Methods' 'GET,POST,PUT,DELETE,OPTIONS';\n       return 204;\n     }\n   }\n   ```\n3. Проверьте SSL-сертификаты (должны быть валидные)"
                            },
                            no: {
                                message: "Production-решение:\n1. Настройте CORS для домена:\n   ```javascript\n   const allowedOrigins = ['https://ваш-продакшен.сайт'];\n   app.use(cors({\n     origin: (origin, callback) => {\n       if (!origin || allowedOrigins.includes(origin)) {\n         callback(null, true);\n       } else {\n         callback(new Error('Not allowed by CORS'));\n       }\n     }\n   }));\n   ```\n2. Включите HTTPS на фронтенде"
                            }
                        }
                    },
                    no: {
                        question: "Ошибка возникает при работе с внешним API (не вашим)?",
                        answers: {
                            yes: {
                                message: "Обход CORS для внешних API:\n1. Варианты решения:\n   - Настройте прокси-сервер (Nginx/Node.js)\n   - Используйте CORS-прокси (cors-anywhere.herokuapp.com)\n   - Запросите доступ у владельца API\n2. Для локальной разработки:\n   - В package.json:\n   ```json\n   \"proxy\": \"http://api-адрес\"\n   ```\n   - Или используйте расширение браузера 'Moesif CORS'"
                            },
                            no: {
                                message: "Комплексное решение:\n1. Проверьте:\n   - Точный URL в запросе (косые черты, регистр)\n   - Заголовок Origin в DevTools → Network\n   - Куки/SameSite атрибуты\n2. Включите детальное логирование CORS:\n   ```javascript\n   app.use((req, res, next) => {\n     console.log('CORS Headers:', {\n       origin: req.headers.origin,\n       method: req.method\n     });\n     next();\n   });\n   ```"
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

    // document.getElementById('chat-name').textContent = chatName;
    // document.getElementById('chat-buttons').style.display = 'flex';
    // currentNode = dialogues[problemKey];
    // history = [];
    // document.getElementById('chat').innerHTML = ``;
    // document.getElementById("errors-tab-content").style.display = "none";
    // document.getElementById("chat-container").style.display = "flex";
    // setTimeout(() => {
    //     document.getElementById("chat-container").scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 100);
    // addMessage(currentNode.question, "bot");

    document.getElementById('chat-title').textContent = chatName;
    document.getElementById("errors-tab-content").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
    document.getElementById('question-box').style.display = 'inherit';
    document.getElementById('chat-buttons').style.display = 'flex';
    document.getElementById('answer-container').style.display = 'none';
    currentNode = dialogues[problemKey];
    history = [];

    addMessage(currentNode.question, "bot");
}

// function addMessage(text, sender) {
//     const chatBox = document.getElementById("chat");
//     const message = document.createElement("div");

//     message.classList.add("message", sender);

//     const image = document.createElement('img');

//     const messageBox = document.createElement('div');
//     messageBox.classList.add('message-box');

//     const messageSender = document.createElement('p');
//     messageSender.classList.add('message-sender');

//     const messageText = document.createElement('p');
//     messageText.classList.add('message-text');
//     messageText.textContent = text;

//     if (sender === 'bot') {
//         image.src = './icons/bot.png';
//         image.classList.add('message-icon');

//         messageSender.textContent = 'Тех-поддержка';
//     }
//     else {
//         image.src = './icons/user.png';
//         image.classList.add('message-icon', sender);

//         messageSender.textContent = 'Пользователь';
//     }

//     messageBox.appendChild(messageSender);
//     messageBox.appendChild(messageText);
//     message.appendChild(image);
//     message.appendChild(messageBox);

//     chatBox.appendChild(message);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }

function addMessage(text, sender) {
    const questionText = document.getElementById('question-text');
    questionText.textContent = text;
}


function handleAnswer(answer) {
    if (!currentNode.answers || !currentNode.answers[answer]) return;

    history.push(currentNode);
    currentNode = currentNode.answers[answer];


    if (currentNode.message) {

        document.getElementById('question-box').style.display = 'none';
        document.getElementById('chat-buttons').style.display = 'none';
        document.getElementById('answer-container').style.display = 'flex';

        const answerText = document.getElementById('answer-text');
        // answerText.innerText = currentNode.message;

        const answerBox = document.getElementById('answer-box');

        const imageContainer = document.getElementById('image-container');

        imageContainer.innerHTML = '';

        if (typeof currentNode.message === 'string') {
            answerText.innerText = currentNode.message;

            answerBox.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else {
            answerText.innerText = currentNode.message.text;

            if (currentNode.message.images) {
                currentNode.message.images.forEach(img => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img.url;
                    imageContainer.appendChild(imgElement);
                })
            }
        }


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

// document.addEventListener("DOMContentLoaded", function () {
//     const subtitles = document.querySelectorAll(".subtitle");
//     const sections = document.querySelectorAll(".tab-subtitle");
//     const mainScroll = document.getElementById("main-scroll");

//     function onScroll() {
//         let scrollPosition = mainScroll.scrollTop + mainScroll.clientHeight / 4.5;

//         sections.forEach((section) => {
//             let id = section.id;
//             let subtitle = document.querySelector(`.subtitle[data-target="${id}"]`);

//             if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
//                 subtitles.forEach((s) => s.classList.remove("active"));
//                 subtitle.classList.add("active");
//             }
//         });
//     }

//     function scrollToSection(event) {
//         const targetId = event.currentTarget.getAttribute("data-target");
//         const targetSection = document.getElementById(targetId);

//         if (targetSection) {
//             mainScroll.scrollTo({
//                 top: targetSection.offsetTop - 120, // Немного отступа для удобства
//                 behavior: "smooth",
//             });
//         }
//     }

//     subtitles.forEach((subtitle) => {
//         subtitle.addEventListener("click", scrollToSection);
//     });

//     mainScroll.addEventListener("scroll", onScroll);
//     onScroll(); // Вызов при загрузке страницы
// });


