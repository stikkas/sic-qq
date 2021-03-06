-----------------------------------------------------------------------------------------------------------
-- СТАТИСТИКА ИСПОЛНЕНИЯ ЗАПРОСОВ ФЕДЕРАЛЬНЫМИ ГОСУДАРСТВЕННЫМИ АРХИВАМИ И СПРАВОЧНО-ИНФОРМАЦИОННЫМ ЦЕНТРОМ
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-- Настройка для sqldeveloper и sqlplus (для birt не нужна)
-- column soc_cnt format a4;
-- column soc_exec_cnt format a4;
-- column soc_exec_pos format a4;
-- column soc_exec_neg format a4;
-- column soc_exec_rec format a4;
-- column soc_otkaz format a4;
-- column soc_reject format a4;
-- column tem_cnt format a4;
-- column tem_exec_cnt format a4;
-- column tem_exec_pos format a4;
-- column tem_exec_neg format a4;
-- column tem_exec_rec format a4;
-- column tem_otkaz format a4;
-- column tem_reject format a4;
-- column gen_cnt format a4;
-- column gen_exec_cnt format a4;
-- column gen_exec_pos format a4;
-- column gen_exec_neg format a4;
-- column gen_exec_rec format a4;
-- column gen_otkaz format a4;
-- column gen_reject format a4;
-- column bio_cnt format a4;
-- column bio_exec_cnt format a4;
-- column bio_exec_pos format a4;
-- column bio_exec_neg format a4;
-- column bio_exec_rec format a4;
-- column bio_otkaz format a4;
-- column bio_reject format a4;
-- column cnt format a4;
-- column exec_cnt format a4;
-- column exec_pos format a4;
-- column exec_neg format a4;
-- column exec_rec format a4;
-- column otkaz format a4;
-- column reject_ format a4;
-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
-- Заполнение таблицы для архивов и СИЦ (вместо Q_VALUE_MEMBER_SIC подставить код интересующего архива)
-----------------------------------------------------------------------------------------------------------
select
QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as soc_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as tem_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_GENEA','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as gen_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_BIO','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as bio_reject,

QQ_ON_INTERVAL_QUERY_COUNT('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as cnt,
QQ_ON_INTERVAL_EXEC_COUNT('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as exec_neg,
QQ_ON_INTERVAL_EXEC_REC('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('','Q_VALUE_MEMBER_SIC','10.01.2014','11.01.2014') as reject_
from dual;

-----------------------------------------------------------------------------------------------------------
-- Подитог
-----------------------------------------------------------------------------------------------------------
select
QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','-1','10.01.2014','11.01.2014') as soc_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','-1','10.01.2014','11.01.2014') as tem_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_GENEA','-1','10.01.2014','11.01.2014') as gen_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_BIO','-1','10.01.2014','11.01.2014') as bio_reject,

QQ_ON_INTERVAL_QUERY_COUNT('','-1','10.01.2014','11.01.2014') as cnt,
QQ_ON_INTERVAL_EXEC_COUNT('','-1','10.01.2014','11.01.2014') as exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('','-1','10.01.2014','11.01.2014') as exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('','-1','10.01.2014','11.01.2014') as exec_neg,
QQ_ON_INTERVAL_EXEC_REC('','-1','10.01.2014','11.01.2014') as exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('','-1','10.01.2014','11.01.2014') as otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('','-1','10.01.2014','11.01.2014') as reject_
from dual;

-----------------------------------------------------------------------------------------------------------
-- Итого
-----------------------------------------------------------------------------------------------------------
select
QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_SOCIAL','','10.01.2014','11.01.2014') as soc_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_TEMATIC','','10.01.2014','11.01.2014') as tem_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_GENEA','','10.01.2014','11.01.2014') as gen_reject,

QQ_ON_INTERVAL_QUERY_COUNT('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_cnt,
QQ_ON_INTERVAL_EXEC_COUNT('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_exec_neg,
QQ_ON_INTERVAL_EXEC_REC('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('Q_VALUE_QUEST_TYPE_BIO','','10.01.2014','11.01.2014') as bio_reject,

QQ_ON_INTERVAL_QUERY_COUNT('','','10.01.2014','11.01.2014') as cnt,
QQ_ON_INTERVAL_EXEC_COUNT('','','10.01.2014','11.01.2014') as exec_cnt,
QQ_ON_INTERVAL_EXEC_POS('','','10.01.2014','11.01.2014') as exec_pos,
QQ_ON_INTERVAL_EXEC_NEG('','','10.01.2014','11.01.2014') as exec_neg,
QQ_ON_INTERVAL_EXEC_REC('','','10.01.2014','11.01.2014') as exec_rec,
QQ_ON_INTERVAL_REFUS_COUNT('','','10.01.2014','11.01.2014') as otkaz,
QQ_ON_INTERVAL_REJECT_COUNT('','','10.01.2014','11.01.2014') as reject_
from dual;

