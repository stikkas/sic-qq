-------------------------------------------------------------------------
-- Получает адрес и телефон, либо что-то одно и преобразует в одну строку,
-- добавляее перерд телефоном ', тел. '
-------------------------------------------------------------------------
create or replace FUNCTION QQ_GET_CONTACT
(
  ADDRESS IN VARCHAR2
, PHONE IN VARCHAR2
) RETURN VARCHAR2 IS
  RESULT VARCHAR2(255);
BEGIN
  RESULT := NULL;
  if ADDRESS IS NOT NULL THEN
    RESULT := ADDRESS;
  ELSIF PHONE IS NOT NULL  THEN
    RESULT := PHONE;
  end if;
  if LENGTH(RESULT) is NOT NULL THEN
    if RESULT like ADDRESS and PHONE IS NOT NULL THEN
      RESULT := CONCAT(RESULT, CONCAT(', тел. ', PHONE));
    elsif RESULT like PHONE THEN
      RESULT := CONCAT('тел. ', PHONE);
    end if;
  else
     RESULT := ' ';
  end if;

  return RESULT;
END QQ_GET_CONTACT;
--------------------------------------------------
-- Получает ID по коду из таблицы Descriptor_Value
--------------------------------------------------
create or replace FUNCTION QQ_VALUE_ID_BY_CODE
(
  CODE IN VARCHAR2
) RETURN NUMBER AS
  RESULT NUMBER(19);
BEGIN
  select DESCRIPTOR_VALUE_ID into RESULT from DESCRIPTOR_VALUE WHERE VALUE_CODE = CODE;

  RETURN RESULT;
END QQ_VALUE_ID_BY_CODE;
------------------------------------------------------------------------------
-- Получает количество исполненных запросов за определенный промежуток времени
------------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_EXEC_COUNT
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_EXEC_COUNT;
--------------------------------------------------------------------------
-- Получает кол-во исполненных запросов за определенный промежуток времени
-- с отрицательными ответами
--------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_EXEC_NEG
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
      if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
      if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_PAID'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_NEPROF'), QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_MINUS_WVIEW'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_EXEC_NEG;
--------------------------------------------------------------------------
-- Получает кол-во исполненных запросов за определенный промежуток времени
-- с положительными ответами
--------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_EXEC_POS
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_PLUS_PAID'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_EXEC_POS;
--------------------------------------------------------------------------
-- Получает кол-во исполненных запросов за определенный промежуток времени
-- с рекомендациями
--------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_EXEC_REC
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
       QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
       QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
        QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC')
      and ANSWER_RESULT_ID in (QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REDIRECT'),
       QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_DOP_INFO'))
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_EXEC_REC;
--------------------------------------------------------------------------
-- Получает кол-во зарегистрированных запросов за определенный промежуток времени
--------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_QUERY_COUNT
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
     select count(*) into RESULT from QQ_QUESTION
     where REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
     select count(*) into RESULT from QQ_QUESTION
     where EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
     and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
    if REQ_TYPE is NULL then
     select count(*) into RESULT from QQ_QUESTION
     where EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
     and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_QUERY_COUNT;
-------------------------------------------------------------------------------------------------
-- Получает кол-во запросов со статусом "Мотивированный отказ" за определенный промежуток времени
-------------------------------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_REFUS_COUNT
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where MOTIVATED_REFUSAL = 1
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and MOTIVATED_REFUSAL = 1
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where MOTIVATED_REFUSAL = 1
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and MOTIVATED_REFUSAL = 1
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
      if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION
      where MOTIVATED_REFUSAL = 1
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and MOTIVATED_REFUSAL = 1
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_REFUS_COUNT;
----------------------------------------------------------------------------------
-- Получает кол-во запросов снятых с исполнения за определенный промежуток времени
----------------------------------------------------------------------------------
create or replace FUNCTION QQ_ON_INTERVAL_REJECT_COUNT
(
  REQ_TYPE IN VARCHAR2
, EXEC_ORG IN VARCHAR2
, BEG_DATE IN VARCHAR2
, END_DATE IN VARCHAR2
) RETURN VARCHAR2 AS
  RESULT VARCHAR2(20);

BEGIN
  if EXEC_ORG is NULL then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  elsif EXEC_ORG = '-1' then
    if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and EXEC_ORG_ID != QQ_VALUE_ID_BY_CODE('Q_VALUE_MEMBER_SIC')
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  else
      if REQ_TYPE is NULL then
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    else
      select count(*) into RESULT from QQ_QUESTION LEFT JOIN QQ_EXECUTION
      on QQ_QUESTION.QUESTION_ID = QQ_EXECUTION.QUESTION_ID
      where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE(REQ_TYPE)
      and ANSWER_RESULT_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_RESULT_REJECTED')
      and EXEC_ORG_ID = QQ_VALUE_ID_BY_CODE(EXEC_ORG)
      and REG_DATE BETWEEN BEG_DATE and END_DATE;
    end if;
  end if;
  if RESULT = 0 then
    return ' ';
  else
    return CONCAT('', RESULT);
  end if;
END QQ_ON_INTERVAL_REJECT_COUNT;
