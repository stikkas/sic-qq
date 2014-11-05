select org1, cnt_all, cnt_exec from (
  select SHORT_VALUE as org1, count(*) as cnt_all from (
    select SHORT_VALUE from QQ_QUESTION LEFT JOIN DESCRIPTOR_VALUE 
    on EXEC_ORG_ID = DESCRIPTOR_VALUE_ID
    where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QUEST_TYPE_SOCIAL') and REG_DATE BETWEEN '10.01.2014' and '11.01.2014'
  ) 
  group by SHORT_VALUE
) LEFT JOIN (
  select SHORT_VALUE as org2, count(*) as cnt_exec from (
    select SHORT_VALUE from QQ_QUESTION LEFT JOIN DESCRIPTOR_VALUE 
    on EXEC_ORG_ID = DESCRIPTOR_VALUE_ID
    where QUESTION_TYPE_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QUEST_TYPE_SOCIAL') and STATUS_ID = QQ_VALUE_ID_BY_CODE('Q_VALUE_QSTAT_EXEC') 
    and REG_DATE BETWEEN '10.01.2014' and '11.01.2014'
  ) 
  group by SHORT_VALUE
) on org1 = org2;
