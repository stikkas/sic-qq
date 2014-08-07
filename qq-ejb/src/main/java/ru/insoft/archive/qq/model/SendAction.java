/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Способ отправки (суперкомбо, многие к одному)
 * @author sorokin
 */
@Entity
@Table(name = "qq_send_action")
public class SendAction implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEND_ACTION_IDGEN")
	@SequenceGenerator(allocationSize = 1, name = "SEND_ACTION_IDGEN", sequenceName = "SEQ_QQ_SEND_ACTION")
	@Column(name = "send_action_id")
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "q_id")
	private Question q;

	@OneToOne
	@JoinColumn(name = "send_action_id", nullable = false)
	// Способ отправки
	private DescriptorValue sendAction;

	@Column(name = "send_date", nullable = false)
	private Date sendDate;

	@Override
	public Long getId() {
		return id;
	}
////////--------------GENERATED CODE BELOW--------------------///////////////
	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public DescriptorValue getSendAction() {
		return sendAction;
	}

	public void setSendAction(DescriptorValue sendAction) {
		this.sendAction = sendAction;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
