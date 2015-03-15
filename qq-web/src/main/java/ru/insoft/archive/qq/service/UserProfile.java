package ru.insoft.archive.qq.service;

import ru.insoft.archive.qq.service.dto.UserData;
import java.io.Serializable;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import ru.insoft.archive.qq.dao.AdmUserDao;
import ru.insoft.archive.qq.dao.DictDao;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.ejb.Store;
import ru.insoft.archive.qq.entity.CoreParameter;

/**
 * Предоставляет данные по пользователю сессии
 *
 * @author Благодатских С.
 */
@SessionScoped
public class UserProfile implements Serializable {

	@Inject
	private AdmUserDao userDao;

	@Inject 
	private DictDao dd;

	@Inject
	private Store store;

	/**
	 * Папка для файлов этого приложения
	 */
	private String qqPath;
	/**
	 * Папка для файлов уведомления заявителю
	 */
	private String notiFilesPath;
	/**
	 * Папка для файлов заявителя
	 */
	private String applicantFilesPath;
	/**
	 * Папка для файлов ответа
	 */
	private String replyFilesPath;
	/**
	 * Данные пользователя. Делается именно так, иначе REST не может правильно
	 * игнорировать userDao при передаче пользователю и вываливается с ошибкой.
	 */
	private UserData data = new UserData();

	@PostConstruct
	private void init() {
		Object[] info = userDao.getUserInfo();
		data.userId = (Long) info[0];
		data.name = (String) info[1];
		data.organization = (Long) info[2];

		List<Long> rules = userDao.getUserRules(data.userId);
		data.coor = rules.contains(store.getIdByCode(DictCodes.Q_RULE_COORDINATOR));
		data.exec = rules.contains(store.getIdByCode(DictCodes.Q_RULE_EXECUTOR));
		data.reg = rules.contains(store.getIdByCode(DictCodes.Q_RULE_REGISTRATOR));
		data.superex = rules.contains(store.getIdByCode(DictCodes.Q_RULE_SEXECUTOR));
		data.supervis = rules.contains(store.getIdByCode(DictCodes.Q_RULE_SUPERVISOR));

		data.sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);

		data.sic = data.organization.equals(data.sicId);
		String rootPath = "";
		for (CoreParameter p : dd.getCoreParams(Arrays.asList(DictCodes.DOCUMENT_ROOT,
				DictCodes.QQ_DOC_ROOT, DictCodes.QQ_INFO_DOC, DictCodes.QQ_APPLICANT_DOC,
				DictCodes.QQ_ANSWER_DOC))) {
			switch (p.getCode()) {
				case DictCodes.DOCUMENT_ROOT:
					rootPath = p.getValue();
					break;
				case DictCodes.QQ_DOC_ROOT:
					qqPath = p.getValue();
					break;
				case DictCodes.QQ_INFO_DOC:
					notiFilesPath = p.getValue();
					break;
				case DictCodes.QQ_APPLICANT_DOC:
					applicantFilesPath = p.getValue();
					break;
				case DictCodes.QQ_ANSWER_DOC:
					replyFilesPath = p.getValue();
			}
		}
		qqPath = Paths.get(rootPath, qqPath).toString();
	}

	public Long getOrganization() {
		return data.organization;
	}

	public boolean isSic() {
		return data.sic;
	}

	public String getName() {
		return data.name;
	}

	public Long getUserId() {
		return data.userId;
	}

	public UserData getData() {
		return data;
	}

	public AdmUserDao getUserDao() {
		return userDao;
	}

	public String getQqPath() {
		return qqPath;
	}

	public String getNotiFilesPath() {
		return notiFilesPath;
	}

	public String getApplicantFilesPath() {
		return applicantFilesPath;
	}

	public String getReplyFilesPath() {
		return replyFilesPath;
	}

}
