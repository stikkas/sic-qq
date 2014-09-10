package ru.insoft.archive.qq.webmodel;

import java.util.List;
import ru.insoft.archive.core_model.table.adm.AdmEmployee;
import ru.insoft.archive.core_model.table.adm.AdmUser;

/**
 * Использую свою модель так как меня не устраивает используемое.
 *
 * @author С. Благодатских
 */
public class UserModel extends ru.insoft.archive.extcommons.webmodel.UserModel {

	/**
	 * Организация, в которой числится пользователь, идентификатор
	 */
	private Long organization;

	public void setUser(AdmUser user, AdmEmployee employee, List<String> rules) {
		super.setUser(user, rules);
		organization = employee.getDepartmentId();
	}
}
