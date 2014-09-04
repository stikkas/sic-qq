
  CREATE TABLE "SIC"."QQ_QUESTION" 
   (	"QUESTION_ID" NUMBER(19,0) NOT NULL ENABLE, 
	"INSERT_DATE" TIMESTAMP (6) NOT NULL ENABLE, 
	"UPDATE_DATE" TIMESTAMP (6) NOT NULL ENABLE, 
	"CONTENT" VARCHAR2(255 CHAR), 
	"INBOX_NUM" VARCHAR2(255 CHAR), 
	"MOTIVATED_REFUSAL" NUMBER(1,0), 
	"PLANNED_FINISH_DATE" TIMESTAMP (6), 
	"REG_DATE" TIMESTAMP (6), 
	"REQUEST_FATHER_NAME" VARCHAR2(255 CHAR), 
	"REQUEST_OBJECT_NAME" VARCHAR2(255 CHAR), 
	"REQUEST_OBJECT_SURNAME" VARCHAR2(255 CHAR), 
	"REQUEST_OBJECT_BIRTHYEAR" NUMBER(10,0), 
	"INSERT_USER_ID" NUMBER(19,0) NOT NULL ENABLE, 
	"UPDATE_USER_ID" NUMBER(19,0) NOT NULL ENABLE, 
	"ANSWER_FORM_TYPE_ID" NUMBER(19,0), 
	"CREATE_ORG_ID" NUMBER(19,0), 
	"EXECUTION_ORGANIZATION_ID" NUMBER(19,0), 
	"LITERA_ID" NUMBER(19,0), 
	"QUESTION_TYPE_ID" NUMBER(19,0), 
	"REGISTRATOR_ID" NUMBER(19,0), 
	"STATUS_ID" NUMBER(19,0), 
	"TRANSFER_TYPE_ID" NUMBER(19,0), 
	 PRIMARY KEY ("QUESTION_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SIC_DATA"  ENABLE, 
	 CONSTRAINT "FK4D4543258DB60394" FOREIGN KEY ("REGISTRATOR_ID")
	  REFERENCES "SIC"."ADM_USER" ("USER_ID") ENABLE, 
	 CONSTRAINT "FK4D454325C1A40D23" FOREIGN KEY ("CREATE_ORG_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D45432523739AD0" FOREIGN KEY ("ANSWER_FORM_TYPE_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D454325DDF0016" FOREIGN KEY ("TRANSFER_TYPE_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D454325CFF6967" FOREIGN KEY ("LITERA_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D45432563019AC5" FOREIGN KEY ("UPDATE_USER_ID")
	  REFERENCES "SIC"."ADM_USER" ("USER_ID") ENABLE, 
	 CONSTRAINT "FK4D4543257E0134B5" FOREIGN KEY ("INSERT_USER_ID")
	  REFERENCES "SIC"."ADM_USER" ("USER_ID") ENABLE, 
	 CONSTRAINT "FK4D454325BE4020B2" FOREIGN KEY ("STATUS_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D454325C746A0AA" FOREIGN KEY ("EXECUTION_ORGANIZATION_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE, 
	 CONSTRAINT "FK4D454325A6EE5911" FOREIGN KEY ("QUESTION_TYPE_ID")
	  REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SIC_DATA" ;
