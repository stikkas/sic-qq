  CREATE TABLE "SIC"."QQ_ASSISTANTS" 
   (	"TRANSMISSION_ID" NUMBER(19,0) NOT NULL ENABLE, 
	"ASSISTANT_ID" NUMBER(19,0) NOT NULL ENABLE, 
	"EXEC_DATE" DATE, 
	 PRIMARY KEY ("TRANSMISSION_ID", "ASSISTANT_ID"), 
	 CONSTRAINT "FK96678CD457935048" FOREIGN KEY ("ASSISTANT_ID")
	  REFERENCES "SIC"."ADM_USER" ("USER_ID") ON DELETE CASCADE ENABLE, 
	 CONSTRAINT "FK96678CD466CC50F7" FOREIGN KEY ("TRANSMISSION_ID")
	  REFERENCES "SIC"."QQ_TRANSMISSION" ("QUESTION_ID") ON DELETE CASCADE ENABLE
   ) ;
 

   COMMENT ON COLUMN "SIC"."QQ_ASSISTANTS"."TRANSMISSION_ID" IS 'Идентификатор запроса';
 
   COMMENT ON COLUMN "SIC"."QQ_ASSISTANTS"."ASSISTANT_ID" IS 'Идентификатор соисполнителя';
 
   COMMENT ON COLUMN "SIC"."QQ_ASSISTANTS"."EXEC_DATE" IS 'Дата исполнения';
