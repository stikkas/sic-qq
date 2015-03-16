package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author Благодатских С.
 */
public class BigQuestion implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "SEQ_SIC_QUESTION", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "SEQ_SIC_QUESTION", sequenceName = "SEQ_SIC_QUESTION", allocationSize = 1)
	@Column(name = "ID")
	private Long id;

	@Column(name = "LITERA_ID")
	private Long literaId;

	@Column(name = "PREFIX_VHOD_DOC")
	private Long prefixVhodDoc;

	@Column(name = "SUFIX_VHOD_DOC")
	private Integer sufixVhodDoc;

	@Column(name = "REG_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	@Column(name = "SPOSOB_PEREDACHI_ID")
	private Long sposobPeredachiId;

	@Column(name = "EXEC_ORG_ID")
	private Long execOrgId;

	@Column(name = "REGISTRATOR_ID")
	private Long registratorId;

	@Column(name = "QUESTION_VID_ID")
	private Long questionTypeId;

	@Column(name = "PLAN_EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date planExecDate;

	@Size(max = 4000)
	@Column(name = "CONTENT")
	private String content;

	@Column(name = "FORM_VYDACHI_ANS_ID")
	private Long formaVydachyOtvetaId;

	@Column(name = "MOTIV_OTKAZ")
	private Short motivOtkaz;

	@Column(name = "TIP_ZAYAV_ID")
	private Long tipZayavitelyaId;

	@Size(max = 255)
	@Column(name = "FAMALY")
	private String famaly;

	@Size(max = 255)
	@Column(name = "NAME")
	private String name;

	@Size(max = 255)
	@Column(name = "OTCHESTVO")
	private String otchestvo;

	@Size(max = 255)
	@Column(name = "COUNTRY")
	private String country;

	@Size(max = 255)
	@Column(name = "ADRES")
	private String adres;

	@Size(max = 255)
	@Column(name = "PHONE")
	private String phone;

	@Size(max = 255)
	@Column(name = "ORGANIZATION")
	private String organization;

	@Column(name = "CATEGOR_ZAYAV_ID")
	private Long categoryZayvitelyaId;

	@Size(max = 255)
	@Column(name = "NUM_ISHOD_DOC")
	private String numIshodDoc;

	@Column(name = "DATE_ISHOD_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateIshodDoc;

	@Size(max = 255)
	@Column(name = "FIO_KTO_PODPISAL_ISHOD_DOC")
	private String fioKtoPodpisalIshodDoc;

	@Size(max = 255)
	@Column(name = "PRILOGENIYA")
	private String prilogeniya;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_FAMALY")
	private String naKogoQFamaly;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_NAME")
	private String naKogoQName;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_OTCHESTVO")
	private String naKogoQOtchestvo;

	@Column(name = "NA_KOGO_Q_GOD_ROJDENIYA")
	private Integer naKogoQGodRojdeniya;

	@Column(name = "NOTI_EXECUTOR_ID")
	private Long notificationExecutorId;

	@Column(name = "TIP_DOCS_ID")
	private Long typeNotificationDocs;

	@Size(max = 255)
	@Column(name = "NOTI_KOMU")
	private String notiKomu;

	@Column(name = "NOTI_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiDate;

	@Column(name = "NOTI_SPOSOB_PEREDACHI_ID")
	private Long notificationSposobPeredachiId;

	@Column(name = "NOTI_DATE_OTPRAVKI_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiDateOtpravkiDoc;

	@Column(name = "BOSS_EXECUTOR_ID")
	private Long bossExecutorId;

	@Column(name = "BOSS_EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date bossExecutorDate;

	@Column(name = "EXECUTOR_ID")
	private Long executorId;

	@Column(name = "EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date executorDate;

	@Column(name = "CONTROL")
	private Short control;

	@Column(name = "CONTROL_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date controlDate;

	@Size(max = 255)
	@Column(name = "RESOLUTION_AUTHOR")
	private String resolutionAuthor;

	@Column(name = "STORAGE_TERRITORY_ID")
	private Long storageTerritoryId;

	@Size(max = 255)
	@Column(name = "STORAGE_NAME")
	private String storageName;

	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	@Column(name = "NOTI_PRODLENIE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiProdlenie;

	@Column(name = "ANS_RESULT_ID")
	private Long answerResultId;

	@Column(name = "TEMATIC_ANS_ID")
	private Long tematicAnswerId;

	@Size(max = 4000)
	@Column(name = "RECOMENDATION")
	private String recomendation;

	@Column(name = "CAT_SLOJNOSTI_ID")
	private Long categorySlojnostiId;

	@Size(max = 255)
	@Column(name = "NUM_ISHODYACHEGO")
	private String numIshodyachego;

	@Size(max = 4000)
	@Column(name = "PRIMECHANIE")
	private String primechanie;

	@Column(name = "STATUS_ID")
	private Long statusId;

	@Column(name = "NOTI_STATUS_ID")
	private Long notificationStatusId;

	



}
