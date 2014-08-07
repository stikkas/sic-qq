package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * CСпособ отправки
 * @author sorokin
 */
@Entity
@Table(name="qq_way_to_send")
public class WayToSend implements HasId,JsonIn,JsonOut{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="WAY_TO_SEND_IDGEN")
    @SequenceGenerator(allocationSize=1,sequenceName="SEQ_QQ_WAY_TO_SEND",name="WAY_TO_SEND_IDGEN")
    @Column(name = "way_to_send_id")
    private Long id;
    
    @OneToOne(optional = false)
    @JoinColumn(name = "q_id")
    private Question q;
    
    //Уведомление о продлении сроков
    @Column(name = "renewal_notice")
    private Date renewalNotice;
    
    //Исходящий номер
    @Column(name = "ref_number")
    private String ref_num;
    
    @Column(name = "note")
    private String note;

	@Override
	public Object getId() {
		return id;
	}

////////--------------GENERATED CODE BELOW--------------------///////////////
	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public Date getRenewalNotice() {
		return renewalNotice;
	}

	public void setRenewalNotice(Date renewalNotice) {
		this.renewalNotice = renewalNotice;
	}

	public String getRef_num() {
		return ref_num;
	}

	public void setRef_num(String ref_num) {
		this.ref_num = ref_num;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
