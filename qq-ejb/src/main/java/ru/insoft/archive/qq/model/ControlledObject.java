package ru.insoft.archive.qq.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import ru.insoft.archive.extcommons.entity.HasUserInfo;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ControlledObject implements HasUserInfo {
	/*
	 @ManyToOne(optional = false)
	 @JoinColumn(name = "insert_user_id")
	 private AdmUser insertUser;

	 @ManyToOne(optional = false)
	 @JoinColumn(name = "update_user_id")
	 private AdmUser updateUser;
	 */

	@Column(name = "update_date", nullable = false)
	@Temporal(javax.persistence.TemporalType.DATE)
	private Date upDate;

	@Column(name = "insert_date", nullable = false)
	@Temporal(javax.persistence.TemporalType.DATE)
	private Date insDate;

	@Column(name = "insert_user_id")
	private Long insertUserId;

	@Column(name = "update_user_id")
	private Long updateUserId;

	/*
	 public AdmUser getInsertUser() {
	 return insertUser;
	 }

	 public void setInsertUser(AdmUser insertUser) {
	 this.insertUser = insertUser;
	 }

	 public AdmUser getUpdateUser() {
	 return updateUser;
	 }

	 public void setUpdateUser(AdmUser updateUser) {
	 this.updateUser = updateUser;
	 }
	 */
	/**
	 * Возвращает уникальный идентификатор пользователя, создавшего запись.
	 *
	 * @return уникальный идентификатор
	 */
	@Override
	public Long getAddUserId() {
		return insertUserId;
	}

	/**
	 * Возвращает уникальный идентификатор пользователя, обновившего запись.
	 *
	 * @return уникальный идентификатор
	 */
	@Override
	public Long getModUserId() {
		return updateUserId;
	}

	/**
	 * Возвращает дату создания записи.
	 *
	 * @return дата создания
	 */
	@Override
	public Date getInsertDate() {
		return insDate;
	}

	/**
	 * Возвращает дату последнего обновления записи.
	 *
	 * @return дата обновления
	 */
	@Override
	public Date getLastUpdateDate() {
		return upDate;
	}

	/**
	 * Устанавливает уникальный идентификатор пользователя, создавшего запись.
	 *
	 * @param userId уникальный идентификатор
	 */
	@Override
	public void setAddUserId(Long userId) {
		insertUserId = userId;
	}

	/**
	 * Устанавливает уникальный идентификатор пользователя, обновившего запись.
	 *
	 * @param userId уникальный идентификатор
	 */
	@Override
	public void setModUserId(Long userId) {
		updateUserId = userId;
	}

	/**
	 * Устанавливает дату создания записи
	 *
	 * @param insertDate дата создания
	 */
	@Override
	public void setInsertDate(Date insertDate) {
		this.insDate = insertDate;
	}

	/**
	 * Устанавливает дату последнего обновления записи.
	 *
	 * @param lastUpdateDate дата последнего обновления
	 */
	@Override
	public void setLastUpdateDate(Date lastUpdateDate) {
		this.upDate = lastUpdateDate;
	}
}
