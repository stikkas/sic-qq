/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_WAY_TO_SEND")
@NamedQueries({
	@NamedQuery(name = "WayToSend.findAll", query = "SELECT w FROM WayToSend w"),
	@NamedQuery(name = "WayToSend.findByQuestionId", query = "SELECT w FROM WayToSend w WHERE w.questionId = :questionId"),
	@NamedQuery(name = "WayToSend.findByRemark", query = "SELECT w FROM WayToSend w WHERE w.remark = :remark"),
	@NamedQuery(name = "WayToSend.findByIssueNumber", query = "SELECT w FROM WayToSend w WHERE w.issueNumber = :issueNumber"),
	@NamedQuery(name = "WayToSend.findByRenewalNotice", query = "SELECT w FROM WayToSend w WHERE w.renewalNotice = :renewalNotice")})
public class WayToSend implements Serializable {
	private static final long serialVersionUID = 1L;
	// @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "QUESTION_ID")
	private BigDecimal questionId;
	@Size(max = 255)
    @Column(name = "REMARK")
	private String remark;
	@Size(max = 255)
    @Column(name = "ISSUE_NUMBER")
	private String issueNumber;
	@Column(name = "RENEWAL_NOTICE")
    @Temporal(TemporalType.TIMESTAMP)
	private Date renewalNotice;
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
    @OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public WayToSend() {
	}

	public WayToSend(BigDecimal questionId) {
		this.questionId = questionId;
	}

	public BigDecimal getQuestionId() {
		return questionId;
	}

	public void setQuestionId(BigDecimal questionId) {
		this.questionId = questionId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIssueNumber() {
		return issueNumber;
	}

	public void setIssueNumber(String issueNumber) {
		this.issueNumber = issueNumber;
	}

	public Date getRenewalNotice() {
		return renewalNotice;
	}

	public void setRenewalNotice(Date renewalNotice) {
		this.renewalNotice = renewalNotice;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (questionId != null ? questionId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof WayToSend)) {
			return false;
		}
		WayToSend other = (WayToSend) object;
		if ((this.questionId == null && other.questionId != null) || (this.questionId != null && !this.questionId.equals(other.questionId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.WayToSend[ questionId=" + questionId + " ]";
	}

}
