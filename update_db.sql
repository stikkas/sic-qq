INSERT INTO "SIC"."CORE_SUBSYSTEM" (SUBSYSTEM_NUMBER, SUBSYSTEM_NAME, SUBSYSTEM_CODE) VALUES ('0', 'Все системы', 'ALL');
INSERT INTO "SIC"."CORE_PARAMETER" (PARAMETER_CODE, SUBSYSTEM_NUMBER, PARAMETER_NAME, PARAMETER_DESCRIPTION, PARAMETER_VALUE) VALUES ('DOCUMENT_ROOT', '0', 'Корень файловой системы', 'Относительно него указываются пути к файлам', '/tmp/FILES.war');
INSERT INTO "SIC"."CORE_PARAMETER" (PARAMETER_CODE, SUBSYSTEM_NUMBER, PARAMETER_NAME, PARAMETER_DESCRIPTION, PARAMETER_VALUE) VALUES ('URL_ROOT', '0', 'Кореневой путь веб сервера', 'Относительно него строятся ссылка на файл', 'http://localhost:8080/');
INSERT INTO "SIC"."CORE_PARAMETER" (PARAMETER_CODE, SUBSYSTEM_NUMBER, PARAMETER_NAME, PARAMETER_DESCRIPTION, PARAMETER_VALUE) VALUES ('QQ_DOC_ROOT', '6', 'Папка для файлов', 'Папка на файловой системе относительно DOCUMENT_ROOT для файлов АС Запросы', 'QQ_QUERIES');
INSERT INTO "SIC"."CORE_PARAMETER" (PARAMETER_CODE, SUBSYSTEM_NUMBER, PARAMETER_NAME, PARAMETER_DESCRIPTION, PARAMETER_VALUE) VALUES ('QQ_APPLICANT_DOC', '6', 'Папка для файлов заявителя', 'Папка на  файловой системе относительно QQ_DOC_ROOT', 'Applicant');
INSERT INTO "SIC"."CORE_PARAMETER" (PARAMETER_CODE, SUBSYSTEM_NUMBER, PARAMETER_NAME, PARAMETER_DESCRIPTION, PARAMETER_VALUE) VALUES ('QQ_ANSWER_DOC', '6', 'Папка для файлов ответа', 'Папка на файловой системе относительно QQ_DOC_ROOT', 'Archive');
