package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 * Класс для передачи результатов поиска ЖВК для СИЦ
 *
 * @author Благодатских С.
 */
public class SicJvkDto extends JvkDto {

	private String notiStat;
	private String execOrg;

	public SicJvkDto(Long id, String litera, String number, Date regDate, 
			Date controlDate, Date planDate, String otKogo, String status, 
			String executor, String notiStat, String execOrg) {
		super(id, litera, number, regDate, controlDate, planDate, otKogo, 
				status, executor);
		this.notiStat = notiStat;
		this.execOrg = execOrg;
	}

	public String getNotiStat() {
		return notiStat;
	}

	public void setNotiStat(String notiStat) {
		this.notiStat = notiStat;
	}

	public String getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(String execOrg) {
		this.execOrg = execOrg;
	}

}
