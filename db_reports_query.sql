----------------------------------------------------------
-- Получение отчета по зарегестрированному архивом запросу
----------------------------------------------------------
select CONCAT(PREFIX_NUM, CONCAT('/', SUFIX_NUM)) as regnum, 
TO_CHAR(REG_DATE, 'DD.MM.YYYY HH24:MM:SS') as regdate,
CONCAT(QQ_APPLICANT.ORGANIZATION, CONCAT(QQ_APPLICANT.LAST_NAME, CONCAT(' ', 
CONCAT(QQ_APPLICANT.FIRST_NAME, CONCAT(' ', QQ_APPLICANT.MIDDLE_NAME))))) as applicant,
QQ_GET_CONTACT(QQ_APPLICANT.ADDRESS, QQ_APPLICANT.PHONE) as contact,
QQ_QUESTION.CONTENT, TO_CHAR(QQ_QUESTION.PLANNED_FINISH_DATE, 'DD.MM.YYYY') as finishdate,
TO_CHAR(QQ_QUESTION.PLANNED_FINISH_DATE + INTERVAL '1' DAY, 'DD.MM.YYYY') as issuedate,
ADM_USER.DISPLAYED_NAME as registrator
from QQ_QUESTION LEFT JOIN QQ_APPLICANT on QQ_QUESTION.QUESTION_ID=QQ_APPLICANT.QUESTION_ID
LEFT JOIN ADM_USER on QQ_QUESTION.REGISTRATOR_ID = ADM_USER.USER_ID
where PREFIX_NUM = 44 and SUFIX_NUM = 2014 and LITERA_ID = 86;