set search_path to 'qq';

CREATE or replace FUNCTION trigger_fct_seq_adm_employee() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.EMPLOYEE_ID is null then

    NEW.EMPLOYEE_ID:=nextval('seq_adm_employee');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_adm_access_rule(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_adm_access_rule() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.ACCESS_RULE_ID is null then

  NEW.ACCESS_RULE_ID:=nextval('seq_adm_access_rule');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_adm_group(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_adm_group() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.GROUP_ID is null then

    NEW.GROUP_ID:=nextval('seq_adm_group');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_adm_user(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_adm_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.USER_ID is null then 

    NEW.USER_ID:=nextval('seq_adm_user');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_core_subsystem(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_core_subsystem() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.SUBSYSTEM_NUMBER is null then

     NEW.SUBSYSTEM_NUMBER:=nextval('seq_core_subsystem');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_descriptor_group(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_descriptor_group() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.DESCRIPTOR_GROUP_ID is null then

    NEW.DESCRIPTOR_GROUP_ID:=nextval('seq_descriptor_group');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_descriptor_group_attr(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_descriptor_group_attr() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

if NEW.DESCRIPTOR_GROUP_ATTR_ID is null then

   NEW.DESCRIPTOR_GROUP_ATTR_ID:=nextval('seq_descriptor_group_attr');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_descriptor_value(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_descriptor_value() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

IF NEW.DESCRIPTOR_VALUE_ID is null then

   NEW.DESCRIPTOR_VALUE_ID:=nextval('seq_descriptor_value');

end if;

RETURN NEW;

end

$$;


--
-- Name: trigger_fct_tbi_descriptor_value_attr(); Type: FUNCTION; Schema: ramdoc_dev; Owner: -
--

CREATE or replace FUNCTION trigger_fct_tbi_descriptor_value_attr() RETURNS trigger
    LANGUAGE plpgsql
    AS $$

begin

IF NEW.DESCRIPTOR_VALUE_ATTR_ID is null then

  NEW.DESCRIPTOR_VALUE_ATTR_ID:=nextval('seq_descriptor_value_attr');

end if;

RETURN NEW;

end

$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: adm_access_rule; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_access_rule (
    access_rule_id numeric(10,0) NOT NULL,
    subsystem_number numeric(10,0) NOT NULL,
    rule_code character varying(30) NOT NULL,
    rule_name character varying(250) NOT NULL
);


--
-- Name: TABLE adm_access_rule; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_access_rule IS 'Право доступа';


--
-- Name: COLUMN adm_access_rule.access_rule_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_access_rule.access_rule_id IS 'ID права доступа';


--
-- Name: COLUMN adm_access_rule.subsystem_number; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_access_rule.subsystem_number IS 'Номер подсистемы';


--
-- Name: COLUMN adm_access_rule.rule_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_access_rule.rule_code IS 'Код права доступа';


--
-- Name: COLUMN adm_access_rule.rule_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_access_rule.rule_name IS 'Наименование права доступа';


--
-- Name: adm_employee; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_employee (
    employee_id numeric(10,0) NOT NULL,
    user_id numeric(10,0),
    department_id numeric(10,0) NOT NULL,
    position_id numeric(10,0) NOT NULL,
    last_name character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    middle_name character varying(150)
);


--
-- Name: TABLE adm_employee; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_employee IS 'Сотрудник архива';


--
-- Name: COLUMN adm_employee.employee_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.employee_id IS 'ID сотрудника архива';


--
-- Name: COLUMN adm_employee.user_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.user_id IS 'ID пользователя';


--
-- Name: COLUMN adm_employee.department_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.department_id IS 'Структурное подразделение';


--
-- Name: COLUMN adm_employee.position_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.position_id IS 'Должность';


--
-- Name: COLUMN adm_employee.last_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.last_name IS 'Фамилия';


--
-- Name: COLUMN adm_employee.first_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.first_name IS 'Имя';


--
-- Name: COLUMN adm_employee.middle_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_employee.middle_name IS 'Отчество';


--
-- Name: adm_group; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_group (
    group_id numeric(10,0) NOT NULL,
    group_name character varying(250) NOT NULL,
    group_note character varying(1000)
);


--
-- Name: TABLE adm_group; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_group IS 'Группа пользователей';


--
-- Name: COLUMN adm_group.group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_group.group_id IS 'ID группы пользователей';


--
-- Name: COLUMN adm_group.group_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_group.group_name IS 'Наименование группы';


--
-- Name: COLUMN adm_group.group_note; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_group.group_note IS 'Описание группы';


--
-- Name: adm_group_rule; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_group_rule (
    group_id numeric(10,0) NOT NULL,
    access_rule_id numeric(10,0) NOT NULL
);


--
-- Name: TABLE adm_group_rule; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_group_rule IS 'Назначение группам прав';


--
-- Name: COLUMN adm_group_rule.group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_group_rule.group_id IS 'ID группы пользователей';


--
-- Name: COLUMN adm_group_rule.access_rule_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_group_rule.access_rule_id IS 'ID права доступа';


--
-- Name: adm_user; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_user (
    user_id numeric(10,0) NOT NULL,
    user_type_id numeric(10,0) NOT NULL,
    login character varying(30) NOT NULL,
    password character varying(100) NOT NULL,
    is_blocked boolean NOT NULL,
    displayed_name character varying(150) NOT NULL
);


--
-- Name: TABLE adm_user; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_user IS 'Пользователь АИС';


--
-- Name: COLUMN adm_user.user_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.user_id IS 'ID пользователя';


--
-- Name: COLUMN adm_user.user_type_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.user_type_id IS 'Тип пользователя';


--
-- Name: COLUMN adm_user.login; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.login IS 'Логин';


--
-- Name: COLUMN adm_user.password; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.password IS 'Пароль';


--
-- Name: COLUMN adm_user.is_blocked; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.is_blocked IS 'Признак блокировки';


--
-- Name: COLUMN adm_user.displayed_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user.displayed_name IS 'Отображаемое имя';


--
-- Name: adm_user_group; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE adm_user_group (
    user_id numeric(10,0) NOT NULL,
    group_id numeric(10,0) NOT NULL
);


--
-- Name: TABLE adm_user_group; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE adm_user_group IS 'Вхождение пользователей в группы';


--
-- Name: COLUMN adm_user_group.user_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user_group.user_id IS 'ID пользователя';


--
-- Name: COLUMN adm_user_group.group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN adm_user_group.group_id IS 'ID группы пользователей';


--
-- Name: core_parameter; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE core_parameter (
    parameter_code character varying(30) NOT NULL,
    subsystem_number numeric(10,0) NOT NULL,
    parameter_name character varying(250) NOT NULL,
    parameter_description character varying(1000),
    parameter_value character varying(4000) NOT NULL
);


--
-- Name: TABLE core_parameter; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE core_parameter IS 'Параметр системы';


--
-- Name: COLUMN core_parameter.parameter_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_parameter.parameter_code IS 'Код параметра системы';


--
-- Name: COLUMN core_parameter.subsystem_number; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_parameter.subsystem_number IS 'Номер подсистемы';


--
-- Name: COLUMN core_parameter.parameter_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_parameter.parameter_name IS 'Наименование параметра';


--
-- Name: COLUMN core_parameter.parameter_description; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_parameter.parameter_description IS 'Описание параметра';


--
-- Name: COLUMN core_parameter.parameter_value; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_parameter.parameter_value IS 'Значение параметра';


--
-- Name: core_subsystem; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE core_subsystem (
    subsystem_number numeric(10,0) NOT NULL,
    subsystem_name character varying(300) NOT NULL,
    subsystem_code character varying(30) NOT NULL
);


--
-- Name: TABLE core_subsystem; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE core_subsystem IS 'Подсистема АИС';


--
-- Name: COLUMN core_subsystem.subsystem_number; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_subsystem.subsystem_number IS 'Номер подсистемы';


--
-- Name: COLUMN core_subsystem.subsystem_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_subsystem.subsystem_name IS 'Наименование подсистемы';


--
-- Name: COLUMN core_subsystem.subsystem_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN core_subsystem.subsystem_code IS 'Код подсистемы';


--
-- Name: desc_datatype; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE desc_datatype (
    datatype_code character varying(30) NOT NULL,
    type_name character varying(100) NOT NULL,
    sort_order numeric(5,0) NOT NULL
);


--
-- Name: TABLE desc_datatype; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE desc_datatype IS 'Тип данных';


--
-- Name: COLUMN desc_datatype.datatype_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN desc_datatype.datatype_code IS 'Код типа данных';


--
-- Name: COLUMN desc_datatype.type_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN desc_datatype.type_name IS 'Наименование типа данных';


--
-- Name: COLUMN desc_datatype.sort_order; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN desc_datatype.sort_order IS 'Порядковый номер';


--
-- Name: descriptor_group; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE descriptor_group (
    descriptor_group_id numeric(10,0) NOT NULL,
    subsystem_number numeric(10,0),
    group_name character varying(300) NOT NULL,
    group_code character varying(30),
    sort_order numeric(5,0) NOT NULL,
    is_system boolean NOT NULL,
    is_hierarchical boolean NOT NULL,
    short_value_supported boolean NOT NULL,
    alphabetic_sort boolean NOT NULL
);


--
-- Name: TABLE descriptor_group; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE descriptor_group IS 'Справочник системы';


--
-- Name: COLUMN descriptor_group.descriptor_group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.descriptor_group_id IS 'ID справочника системы';


--
-- Name: COLUMN descriptor_group.subsystem_number; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.subsystem_number IS 'Номер подсистемы (для системных)';


--
-- Name: COLUMN descriptor_group.group_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.group_name IS 'Наименование справочника';


--
-- Name: COLUMN descriptor_group.group_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.group_code IS 'Код справочника (для системных)';


--
-- Name: COLUMN descriptor_group.sort_order; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.sort_order IS 'Порядковый номер';


--
-- Name: COLUMN descriptor_group.is_system; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.is_system IS 'Признак системности';


--
-- Name: COLUMN descriptor_group.is_hierarchical; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.is_hierarchical IS 'Признак иерархичности структуры';


--
-- Name: COLUMN descriptor_group.short_value_supported; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.short_value_supported IS 'Наличие сокращённых значений';


--
-- Name: COLUMN descriptor_group.alphabetic_sort; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group.alphabetic_sort IS 'Сортировка по алфавиту';


--
-- Name: descriptor_group_attr; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE descriptor_group_attr (
    descriptor_group_attr_id numeric(10,0) NOT NULL,
    descriptor_group_id numeric(10,0) NOT NULL,
    datatype_code character varying(30) NOT NULL,
    attr_name character varying(300) NOT NULL,
    attr_code character varying(30) NOT NULL,
    sort_order numeric(5,0) NOT NULL,
    is_collection boolean NOT NULL,
    is_required boolean NOT NULL,
    ref_descriptor_group_id numeric(10,0)
);


--
-- Name: TABLE descriptor_group_attr; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE descriptor_group_attr IS 'Атрибут справочника';


--
-- Name: COLUMN descriptor_group_attr.descriptor_group_attr_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.descriptor_group_attr_id IS 'ID атрибута справочника';


--
-- Name: COLUMN descriptor_group_attr.descriptor_group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.descriptor_group_id IS 'ID справочника';


--
-- Name: COLUMN descriptor_group_attr.datatype_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.datatype_code IS 'Код типа данных';


--
-- Name: COLUMN descriptor_group_attr.attr_name; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.attr_name IS 'Наименование атрибута';


--
-- Name: COLUMN descriptor_group_attr.attr_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.attr_code IS 'Код атрибута';


--
-- Name: COLUMN descriptor_group_attr.sort_order; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.sort_order IS 'Порядковый номер';


--
-- Name: COLUMN descriptor_group_attr.is_collection; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.is_collection IS 'Признак множественности';


--
-- Name: COLUMN descriptor_group_attr.is_required; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.is_required IS 'Признак обязательности';


--
-- Name: COLUMN descriptor_group_attr.ref_descriptor_group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_group_attr.ref_descriptor_group_id IS 'Ссылка на справочник значений атрибута';


--
-- Name: descriptor_value; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE descriptor_value (
    descriptor_value_id numeric(10,0) NOT NULL,
    descriptor_group_id numeric(10,0) NOT NULL,
    full_value character varying(4000) NOT NULL,
    short_value character varying(250),
    value_code character varying(30),
    sort_order numeric(10,0) NOT NULL,
    parent_value_id numeric(10,0)
);


--
-- Name: TABLE descriptor_value; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE descriptor_value IS 'Значение справочника';


--
-- Name: COLUMN descriptor_value.descriptor_value_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.descriptor_value_id IS 'ID значения справочника';


--
-- Name: COLUMN descriptor_value.descriptor_group_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.descriptor_group_id IS 'ID справочника';


--
-- Name: COLUMN descriptor_value.full_value; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.full_value IS 'Полное значение';


--
-- Name: COLUMN descriptor_value.short_value; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.short_value IS 'Сокращённое значение';


--
-- Name: COLUMN descriptor_value.value_code; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.value_code IS 'Код значения';


--
-- Name: COLUMN descriptor_value.sort_order; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.sort_order IS 'Порядковый номер';


--
-- Name: COLUMN descriptor_value.parent_value_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value.parent_value_id IS 'ID вышестоящего значения';


--
-- Name: descriptor_value_attr; Type: TABLE; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE  TABLE descriptor_value_attr (
    descriptor_value_attr_id numeric(10,0) NOT NULL,
    descriptor_value_id numeric(10,0) NOT NULL,
    descriptor_group_attr_id numeric(10,0) NOT NULL,
    attr_value character varying(4000),
    ref_descriptor_value_id numeric(10,0)
);


--
-- Name: TABLE descriptor_value_attr; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON TABLE descriptor_value_attr IS 'Атрибут значения справочника';


--
-- Name: COLUMN descriptor_value_attr.descriptor_value_attr_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value_attr.descriptor_value_attr_id IS 'ID атрибута значения справочника';


--
-- Name: COLUMN descriptor_value_attr.descriptor_value_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value_attr.descriptor_value_id IS 'ID значения справочника';


--
-- Name: COLUMN descriptor_value_attr.descriptor_group_attr_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value_attr.descriptor_group_attr_id IS 'ID атрибута справочника';


--
-- Name: COLUMN descriptor_value_attr.attr_value; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value_attr.attr_value IS 'Значение атрибута';


--
-- Name: COLUMN descriptor_value_attr.ref_descriptor_value_id; Type: COMMENT; Schema: ramdoc_dev; Owner: -
--

COMMENT ON COLUMN descriptor_value_attr.ref_descriptor_value_id IS 'Ссылка на другое значение справочника';



CREATE  SEQUENCE seq_adm_access_rule
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_adm_employee; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_adm_employee
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_adm_group; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_adm_group
    START WITH 61
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_adm_user; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_adm_user
    START WITH 61
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_core_subsystem; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_core_subsystem
    START WITH 21
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_descriptor_group; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_descriptor_group
    START WITH 81
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_descriptor_group_attr; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_descriptor_group_attr
    START WITH 41
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_descriptor_value; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_descriptor_value
    START WITH 81
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;


--
-- Name: seq_descriptor_value_attr; Type: SEQUENCE; Schema: ramdoc_dev; Owner: -
--

CREATE  SEQUENCE seq_descriptor_value_attr
    START WITH 21
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 20;



CREATE  VIEW v_adm_employee AS
    SELECT ae.employee_id, ae.user_id, dv1.full_value AS department, dv2.full_value AS "position", ae.last_name, ae.first_name, ae.middle_name FROM ((adm_employee ae JOIN descriptor_value dv1 ON ((ae.department_id = dv1.descriptor_value_id))) JOIN descriptor_value dv2 ON ((ae.position_id = dv2.descriptor_value_id)));


--
-- Name: v_adm_group_rule; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_adm_group_rule AS
    SELECT agr.group_id, aar.access_rule_id, cs.subsystem_name, aar.rule_name FROM ((adm_group_rule agr JOIN adm_access_rule aar ON ((agr.access_rule_id = aar.access_rule_id))) JOIN core_subsystem cs ON ((aar.subsystem_number = cs.subsystem_number)));


--
-- Name: v_adm_user; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_adm_user AS
    SELECT au.user_id, au.displayed_name, au.login, au.user_type_id, dv.full_value AS user_type, au.is_blocked, CASE WHEN (au.is_blocked = false) THEN 'Активен'::text WHEN (au.is_blocked = true) THEN 'Заблокирован'::text ELSE NULL::text END AS user_status, ae.department_id FROM ((adm_user au JOIN descriptor_value dv ON ((au.user_type_id = dv.descriptor_value_id))) LEFT JOIN adm_employee ae ON ((au.user_id = ae.user_id)));


--
-- Name: v_adm_user_group; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_adm_user_group AS
    SELECT aug.user_id, ag.group_id, ag.group_name FROM (adm_user_group aug JOIN adm_group ag ON ((aug.group_id = ag.group_id)));


--
-- Name: v_adm_user_rule; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_adm_user_rule AS
    SELECT DISTINCT au.user_id, au.login, au.is_blocked, au.displayed_name, aar.rule_code FROM (((adm_user au JOIN adm_user_group aug ON ((au.user_id = aug.user_id))) JOIN adm_group_rule agr ON ((aug.group_id = agr.group_id))) JOIN adm_access_rule aar ON ((agr.access_rule_id = aar.access_rule_id)));


--
-- Name: v_desc_value_hierarch_full; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_value_hierarch_full AS
    WITH RECURSIVE temp1(id, root, level) AS (SELECT t1.descriptor_value_id, t1.descriptor_value_id, 1 FROM descriptor_value t1 UNION ALL SELECT t2.descriptor_value_id, temp1.root, (temp1.level + 1) FROM (descriptor_value t2 JOIN temp1 ON ((temp1.id = t2.parent_value_id)))) SELECT temp1.id AS child_value_id, temp1.root AS parent_value_id, temp1.level AS value_level FROM temp1;


--
-- Name: v_desc_all_relations; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_all_relations AS
    SELECT v_desc_value_hierarch_full.child_value_id AS descriptor_value_id, v_desc_value_hierarch_full.parent_value_id AS related_value_id FROM v_desc_value_hierarch_full UNION ALL SELECT v_desc_value_hierarch_full.parent_value_id AS descriptor_value_id, v_desc_value_hierarch_full.child_value_id AS related_value_id FROM v_desc_value_hierarch_full;


--
-- Name: v_desc_attr_value; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_attr_value AS
    SELECT dva.descriptor_value_attr_id, dva.descriptor_value_id, dga.attr_code, dga.is_collection, COALESCE(dva.attr_value, dv.value_code) AS attr_value FROM ((descriptor_value_attr dva JOIN descriptor_group_attr dga ON ((dva.descriptor_group_attr_id = dga.descriptor_group_attr_id))) LEFT JOIN descriptor_value dv ON ((dva.ref_descriptor_value_id = dv.descriptor_value_id)));


--
-- Name: v_desc_attrvalue_with_code; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_attrvalue_with_code AS
    SELECT dva.descriptor_value_attr_id, dva.descriptor_value_id, dga.datatype_code, dga.attr_code, dva.attr_value, dva.ref_descriptor_value_id FROM (descriptor_value_attr dva JOIN descriptor_group_attr dga ON ((dva.descriptor_group_attr_id = dga.descriptor_group_attr_id)));


--
-- Name: v_desc_group; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_group AS
    SELECT dg.descriptor_group_id, cs.subsystem_number, cs.subsystem_name, dg.group_name, dg.group_code, dg.sort_order, dg.is_system, dg.is_hierarchical, dg.short_value_supported, dg.alphabetic_sort, count(dv.descriptor_group_id) AS value_cnt FROM ((descriptor_group dg LEFT JOIN core_subsystem cs ON ((dg.subsystem_number = cs.subsystem_number))) LEFT JOIN descriptor_value dv ON (((dg.descriptor_group_id = dv.descriptor_group_id) AND (dv.parent_value_id IS NULL)))) GROUP BY dg.descriptor_group_id, cs.subsystem_number, cs.subsystem_name, dg.group_name, dg.group_code, dg.sort_order, dg.is_system, dg.is_hierarchical, dg.short_value_supported, dg.alphabetic_sort, dv.descriptor_group_id;


--
-- Name: v_desc_group_attr; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_group_attr AS
    SELECT dga.descriptor_group_attr_id, dga.descriptor_group_id, dga.attr_name, dga.attr_code, dd.datatype_code, CASE WHEN ((dd.datatype_code)::text = 'DESCRIPTOR'::text) THEN ((((dd.type_name)::text || ' ('::text) || (dg.group_name)::text) || ')'::text) ELSE (dd.type_name)::text END AS datatype, dga.sort_order, dga.is_required, dga.is_collection, dga.ref_descriptor_group_id, dg.group_name AS ref_group_name, CASE WHEN ((count(dva.attr_value) + count(dva.ref_descriptor_value_id)) = 0) THEN 0 ELSE 1 END AS has_values FROM (((descriptor_group_attr dga JOIN desc_datatype dd ON (((dga.datatype_code)::text = (dd.datatype_code)::text))) LEFT JOIN descriptor_group dg ON ((dga.ref_descriptor_group_id = dg.descriptor_group_id))) LEFT JOIN descriptor_value_attr dva ON ((dga.descriptor_group_attr_id = dva.descriptor_group_attr_id))) GROUP BY dga.descriptor_group_attr_id, dga.descriptor_group_id, dga.attr_name, dga.attr_code, dd.datatype_code, dd.type_name, dg.group_name, dga.sort_order, dga.is_required, dga.is_collection, dga.ref_descriptor_group_id;


--
-- Name: v_desc_subsystem; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_subsystem AS
    SELECT cs.subsystem_number, cs.subsystem_name, CASE WHEN (dg.subsystem_number IS NULL) THEN 0 ELSE 1 END AS has_groups, count(dg.descriptor_group_id) AS group_cnt FROM (core_subsystem cs LEFT JOIN descriptor_group dg ON ((cs.subsystem_number = dg.subsystem_number))) GROUP BY cs.subsystem_number, cs.subsystem_name, dg.subsystem_number ORDER BY cs.subsystem_number;


--
-- Name: v_desc_value; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_value AS
    SELECT dv.descriptor_value_id, dg.descriptor_group_id, dg.group_name, dv.full_value, dv.short_value, dv.value_code, dv.sort_order, dv.parent_value_id, CASE WHEN (dv_ch.parent_value_id IS NULL) THEN 0 ELSE 1 END AS has_children, count(dv_ch.descriptor_value_id) AS children_cnt FROM ((descriptor_value dv JOIN descriptor_group dg ON ((dv.descriptor_group_id = dg.descriptor_group_id))) LEFT JOIN descriptor_value dv_ch ON ((dv.descriptor_value_id = dv_ch.parent_value_id))) GROUP BY dv.descriptor_value_id, dg.descriptor_group_id, dg.group_name, dg.is_hierarchical, dv.full_value, dv.short_value, dv.value_code, dv.sort_order, dv.parent_value_id, dv_ch.parent_value_id;


--
-- Name: v_desc_value_path; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE   VIEW v_desc_value_path AS
    SELECT descriptor_value.descriptor_value_id, descriptor_value.descriptor_group_id, descriptor_value.full_value, descriptor_value.short_value, descriptor_pack.get_full_path(descriptor_value.descriptor_value_id) AS full_path, descriptor_pack.get_short_path(descriptor_value.descriptor_value_id) AS short_path, descriptor_pack.get_id_path(descriptor_value.descriptor_value_id) AS id_path FROM descriptor_value;


--
-- Name: v_desc_value_path_all; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_value_path_all AS
    WITH RECURSIVE temp1(id, group_id, full_value, short_value, full_path, short_path, id_path, level) AS (SELECT t1.descriptor_value_id, t1.descriptor_group_id, t1.full_value, t1.short_value, t1.full_value, (t1.short_value)::character varying(4000) AS short_value, (t1.descriptor_value_id)::character varying(250) AS descriptor_value_id, 1 FROM descriptor_value t1 WHERE (t1.parent_value_id IS NULL) UNION ALL SELECT t2.descriptor_value_id, t2.descriptor_group_id, t2.full_value, t2.short_value, ((((temp1.full_path)::text || '->'::text) || (t2.full_value)::text))::character varying(4000) AS "varchar", ((((temp1.short_path)::text || '->'::text) || (t2.short_value)::text))::character varying(4000) AS "varchar", ((((temp1.id_path)::text || '->'::text) || t2.descriptor_value_id))::character varying(250) AS "varchar", (temp1.level + 1) FROM (descriptor_value t2 JOIN temp1 ON ((temp1.id = t2.parent_value_id)))) SELECT temp1.id AS descriptor_value_id, temp1.group_id AS descriptor_group_id, temp1.full_value, temp1.short_value, temp1.full_path, temp1.short_path, temp1.id_path FROM temp1;


--
-- Name: v_desc_value_with_code; Type: VIEW; Schema: ramdoc_dev; Owner: -
--

CREATE  VIEW v_desc_value_with_code AS
    SELECT dg.group_code, dv.descriptor_value_id, dv.full_value, dv.value_code, dv.sort_order FROM (descriptor_value dv JOIN descriptor_group dg ON ((dv.descriptor_group_id = dg.descriptor_group_id))) WHERE (dg.is_hierarchical = false);

ALTER TABLE ONLY adm_group
    ADD CONSTRAINT ak_adm_group_name UNIQUE (group_name);


--
-- Name: ak_adm_login; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_user
    ADD CONSTRAINT ak_adm_login UNIQUE (login);


--
-- Name: pk_adm_access_rule; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_access_rule
    ADD CONSTRAINT pk_adm_access_rule PRIMARY KEY (access_rule_id);


--
-- Name: pk_adm_employee; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_employee
    ADD CONSTRAINT pk_adm_employee PRIMARY KEY (employee_id);


--
-- Name: pk_adm_group; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_group
    ADD CONSTRAINT pk_adm_group PRIMARY KEY (group_id);


--
-- Name: pk_adm_group_rule; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_group_rule
    ADD CONSTRAINT pk_adm_group_rule PRIMARY KEY (group_id, access_rule_id);


--
-- Name: pk_adm_user; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_user
    ADD CONSTRAINT pk_adm_user PRIMARY KEY (user_id);


--
-- Name: pk_adm_user_group; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY adm_user_group
    ADD CONSTRAINT pk_adm_user_group PRIMARY KEY (user_id, group_id);


--
-- Name: pk_core_parameter; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY core_parameter
    ADD CONSTRAINT pk_core_parameter PRIMARY KEY (parameter_code);


--
-- Name: pk_core_subsystem; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY core_subsystem
    ADD CONSTRAINT pk_core_subsystem PRIMARY KEY (subsystem_number);


--
-- Name: pk_desc_datatype; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY desc_datatype
    ADD CONSTRAINT pk_desc_datatype PRIMARY KEY (datatype_code);


--
-- Name: pk_descriptor_group; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY descriptor_group
    ADD CONSTRAINT pk_descriptor_group PRIMARY KEY (descriptor_group_id);


--
-- Name: pk_descriptor_group_attr; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY descriptor_group_attr
    ADD CONSTRAINT pk_descriptor_group_attr PRIMARY KEY (descriptor_group_attr_id);


--
-- Name: pk_descriptor_value; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY descriptor_value
    ADD CONSTRAINT pk_descriptor_value PRIMARY KEY (descriptor_value_id);


--
-- Name: pk_descriptor_value_attr; Type: CONSTRAINT; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

ALTER TABLE ONLY descriptor_value_attr
    ADD CONSTRAINT pk_descriptor_value_attr PRIMARY KEY (descriptor_value_attr_id);

--
-- Name: fk1_dscgrp_dscgrpatr; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk1_dscgrp_dscgrpatr ON descriptor_group_attr USING btree (descriptor_group_id);


--
-- Name: fk_admaccrul_admgrprul; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_admaccrul_admgrprul ON adm_group_rule USING btree (access_rule_id);


--
-- Name: fk_admgrp_admgrprul; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_admgrp_admgrprul ON adm_group_rule USING btree (group_id);


--
-- Name: fk_admgrp_admusrgrp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_admgrp_admusrgrp ON adm_user_group USING btree (group_id);


--
-- Name: fk_admusr_admemp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_admusr_admemp ON adm_employee USING btree (user_id);


--
-- Name: fk_admusr_admusrgrp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_admusr_admusrgrp ON adm_user_group USING btree (user_id);


CREATE INDEX fk_corsys_admaccrul ON adm_access_rule USING btree (subsystem_number);


--
-- Name: fk_corsys_corpar; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_corsys_corpar ON core_parameter USING btree (subsystem_number);


--
-- Name: fk_corsys_dscgrp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_corsys_dscgrp ON descriptor_group USING btree (subsystem_number);




--
-- Name: fk_dscgrp_dscval; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_dscgrp_dscval ON descriptor_value USING btree (descriptor_group_id);


--
-- Name: fk_dscgrpatr_dscvalatr; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_dscgrpatr_dscvalatr ON descriptor_value_attr USING btree (descriptor_group_attr_id);


--
-- Name: fk_dsctyp_dscgrpatr; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_dsctyp_dscgrpatr ON descriptor_group_attr USING btree (datatype_code);


--
-- Name: fk_dscval_dscval; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_dscval_dscval ON descriptor_value USING btree (parent_value_id);


--
-- Name: fk_dscval_dscvalatr; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_dscval_dscvalatr ON descriptor_value_attr USING btree (descriptor_value_id);


--
-- Name: fk_empdep_admemp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_empdep_admemp ON adm_employee USING btree (department_id);


--
-- Name: fk_emppos_admemp; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_emppos_admemp ON adm_employee USING btree (position_id);


--
-- Name: fk_usrtyp_admusr; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX fk_usrtyp_admusr ON adm_user USING btree (user_type_id);


--
-- Name: itxt_desc_full_value; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX itxt_desc_full_value ON descriptor_value USING btree (full_value);


--
-- Name: itxt_desc_short_value; Type: INDEX; Schema: ramdoc_dev; Owner: -; Tablespace: 
--

CREATE INDEX itxt_desc_short_value ON descriptor_value USING btree (short_value);


--
-- Name: seq_adm_employee; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER seq_adm_employee BEFORE INSERT ON adm_employee FOR EACH ROW EXECUTE PROCEDURE trigger_fct_seq_adm_employee();


--
-- Name: tbi_adm_access_rule; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_adm_access_rule BEFORE INSERT ON adm_access_rule FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_adm_access_rule();


--
-- Name: tbi_adm_group; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_adm_group BEFORE INSERT ON adm_group FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_adm_group();


--
-- Name: tbi_adm_user; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_adm_user BEFORE INSERT ON adm_user FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_adm_user();


--
-- Name: tbi_core_subsystem; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_core_subsystem BEFORE INSERT ON core_subsystem FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_core_subsystem();


--
-- Name: tbi_descriptor_group; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_descriptor_group BEFORE INSERT ON descriptor_group FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_descriptor_group();


--
-- Name: tbi_descriptor_group_attr; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_descriptor_group_attr BEFORE INSERT ON descriptor_group_attr FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_descriptor_group_attr();


--
-- Name: tbi_descriptor_value; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_descriptor_value BEFORE INSERT ON descriptor_value FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_descriptor_value();


--
-- Name: tbi_descriptor_value_attr; Type: TRIGGER; Schema: ramdoc_dev; Owner: -
--

CREATE  TRIGGER tbi_descriptor_value_attr BEFORE INSERT ON descriptor_value_attr FOR EACH ROW EXECUTE PROCEDURE trigger_fct_tbi_descriptor_value_attr();


--
-- Name: fk1_dscgrp_dscgrpatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_group_attr
    ADD CONSTRAINT fk1_dscgrp_dscgrpatr FOREIGN KEY (descriptor_group_id) REFERENCES descriptor_group(descriptor_group_id) MATCH FULL;


--
-- Name: fk2_dscgrp_dscgrpatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_group_attr
    ADD CONSTRAINT fk2_dscgrp_dscgrpatr FOREIGN KEY (ref_descriptor_group_id) REFERENCES descriptor_group(descriptor_group_id) MATCH FULL;


--
-- Name: fk_admaccrul_admgrprul; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_group_rule
    ADD CONSTRAINT fk_admaccrul_admgrprul FOREIGN KEY (access_rule_id) REFERENCES adm_access_rule(access_rule_id) MATCH FULL;


--
-- Name: fk_admgrp_admgrprul; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_group_rule
    ADD CONSTRAINT fk_admgrp_admgrprul FOREIGN KEY (group_id) REFERENCES adm_group(group_id) MATCH FULL ON DELETE CASCADE;


--
-- Name: fk_admgrp_admusrgrp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_user_group
    ADD CONSTRAINT fk_admgrp_admusrgrp FOREIGN KEY (group_id) REFERENCES adm_group(group_id) MATCH FULL;


--
-- Name: fk_admusr_admemp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_employee
    ADD CONSTRAINT fk_admusr_admemp FOREIGN KEY (user_id) REFERENCES adm_user(user_id) MATCH FULL ON DELETE CASCADE;


--
-- Name: fk_admusr_admusrgrp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_user_group
    ADD CONSTRAINT fk_admusr_admusrgrp FOREIGN KEY (user_id) REFERENCES adm_user(user_id) MATCH FULL ON DELETE CASCADE;





--
-- Name: fk_corsys_admaccrul; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_access_rule
    ADD CONSTRAINT fk_corsys_admaccrul FOREIGN KEY (subsystem_number) REFERENCES core_subsystem(subsystem_number) MATCH FULL;


--
-- Name: fk_corsys_corpar; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY core_parameter
    ADD CONSTRAINT fk_corsys_corpar FOREIGN KEY (subsystem_number) REFERENCES core_subsystem(subsystem_number) MATCH FULL;


--
-- Name: fk_corsys_dscgrp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_group
    ADD CONSTRAINT fk_corsys_dscgrp FOREIGN KEY (subsystem_number) REFERENCES core_subsystem(subsystem_number) MATCH FULL;




--
-- Name: fk_dscgrp_dscval; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_value
    ADD CONSTRAINT fk_dscgrp_dscval FOREIGN KEY (descriptor_group_id) REFERENCES descriptor_group(descriptor_group_id) MATCH FULL;


--
-- Name: fk_dscgrpatr_dscvalatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_value_attr
    ADD CONSTRAINT fk_dscgrpatr_dscvalatr FOREIGN KEY (descriptor_group_attr_id) REFERENCES descriptor_group_attr(descriptor_group_attr_id) MATCH FULL;


--
-- Name: fk_dsctyp_dscgrpatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_group_attr
    ADD CONSTRAINT fk_dsctyp_dscgrpatr FOREIGN KEY (datatype_code) REFERENCES desc_datatype(datatype_code) MATCH FULL;


--
-- Name: fk_dscval_dscval; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_value
    ADD CONSTRAINT fk_dscval_dscval FOREIGN KEY (parent_value_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL DEFERRABLE;


--
-- Name: fk_dscval_dscvalatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_value_attr
    ADD CONSTRAINT fk_dscval_dscvalatr FOREIGN KEY (descriptor_value_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL ON DELETE CASCADE;


--
-- Name: fk_empdep_amdemp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_employee
    ADD CONSTRAINT fk_empdep_amdemp FOREIGN KEY (department_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL;


--
-- Name: fk_emppos_admemp; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_employee
    ADD CONSTRAINT fk_emppos_admemp FOREIGN KEY (position_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL;



--
-- Name: fk_refdscval_dscvalatr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY descriptor_value_attr
    ADD CONSTRAINT fk_refdscval_dscvalatr FOREIGN KEY (ref_descriptor_value_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL;

--
-- Name: fk_usrtyp_admusr; Type: FK CONSTRAINT; Schema: ramdoc_dev; Owner: -
--

ALTER TABLE ONLY adm_user
    ADD CONSTRAINT fk_usrtyp_admusr FOREIGN KEY (user_type_id) REFERENCES descriptor_value(descriptor_value_id) MATCH FULL;


--
-- PostgreSQL database dump complete
--

