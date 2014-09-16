/**
 *
 */
package ru.insoft.archive.qq.ejb;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.json.JsonArray;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.core_model.table.desc.DescriptorValueAttr;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.webmodel.ScalarItem;
import ru.insoft.archive.qq.entity.Applicant;
import ru.insoft.archive.qq.entity.Transmission;

/**
 * @author sorokin
 *
 */
@Stateless
public class QQDictValues {

	@PersistenceContext
	EntityManager em;

	@EJB
	CommonDBHandler cdbh;

	private Logger logger;

	@EJB
	JsonTools jsonTools;

	public QQDictValues() {
		logger = Logger.getLogger(this.getClass().getName());
	}

	public JsonArray getLiteras() throws Exception {
		Long descriptorGroupAttrId = cdbh
			.getDescriptorGroupAttrIdByCode("MEMBER_LETTER");
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<DescriptorValueAttr> cq = cb
			.createQuery(DescriptorValueAttr.class);
		Root<DescriptorValueAttr> rt = cq.from(DescriptorValueAttr.class);
		cq.where(cb.equal(rt.<Long>get("attrId"), descriptorGroupAttrId));
		cq.orderBy(cb.asc(rt.<String>get("value")));
		Query q = em.createQuery(cq);
		ArrayList<ScalarItem> items = new ArrayList<>();
		List<DescriptorValueAttr> result = q.getResultList();
		for (DescriptorValueAttr a : result) {
			ScalarItem si = new ScalarItem();
			si.setId(a.getValueId());
			si.setName(a.getValue());
			items.add(si);
		}
		JsonArray r = jsonTools.getJsonEntitiesList(items);
		return r;
	}

	public JsonArray getExecutorsForJournal() throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmUser> cq = cb.createQuery(AdmUser.class);
		Root<Transmission> from = cq.from(Transmission.class);
		cq.distinct(true);
		cq.select(from.<AdmUser>get("executorName"));
		Query q = em.createQuery(cq);
		List<AdmUser> result = q.getResultList();
		ArrayList<ScalarItem> items = new ArrayList<>();
		for (AdmUser au : result) {
			ScalarItem si = new ScalarItem();
			si.setId(au.getId());
			si.setName(au.getName());
			items.add(si);
		}
		JsonArray itemsJson = jsonTools.getJsonEntitiesList(items);
		return itemsJson;
	}

	public JsonArray getApplicantsForJournal() throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();

		CriteriaQuery<String> cq = cb.createQuery(String.class);
		Root<Applicant> root = cq.from(Applicant.class);

		Expression<String> sn = cb.concat(root.<String>get("surname"), " ");

		Expression<String> fn = cb.concat(root.<String>get("name"), " ");

		Expression<String> snfn = cb.concat(sn, fn);

		Expression<String> snfnfan = cb.concat(snfn,
			root.<String>get("fatherName"));

		Expression<Long> id = root.<Long>get("id");
		// cq.multiselect(id,snfnfan);
		cq.select(snfnfan);
		cq.distinct(true);
		Expression<Boolean> whExp = cb.equal(
			root.get("applicantType").get("code"),
			Constants.Q_VALUE_APPLICANT_TYPE_FFACE);
		cq.where(whExp);
		Query q = em.createQuery(cq);
		List<String> resultList = q.getResultList();
		cq.orderBy(cb.asc(snfnfan));
		CriteriaQuery<String> cqJur = cb.createQuery(String.class);
		Root<Applicant> jurRoot = cqJur.from(Applicant.class);
		Expression<String> selectColumn = jurRoot.get("applicantObject");
		cqJur.select(selectColumn);
		cqJur.orderBy(cb.asc(selectColumn));
		cqJur.distinct(true);
		Expression<Boolean> whEx = cb.equal(
			jurRoot.get("applicantType").get("code"),
			Constants.Q_VALUE_APPLICANT_TYPE_JURFACE);
		Query q2 = em.createQuery(cqJur);
		List result2List = q2.getResultList();
		resultList.addAll(result2List);
		ArrayList<ScalarItem> items = new ArrayList<>();
		long i = 0;
		for (String s : resultList) {
			if (s != null && !"".equals(s.trim())) {
				i++;
				ScalarItem item = new ScalarItem();
				item.setName(s);
				item.setId(i);
				items.add(item);
			}
		}
		JsonArray a = jsonTools.getJsonEntitiesList(items);
		return a;
	}

	public JsonArray getUsers() throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmUser> cq = cb.createQuery(AdmUser.class);
		Root<AdmUser> root = cq.from(AdmUser.class);
		cq.select(root);
		Subquery<Long> subQuery = cq.subquery(Long.class);
		Root<DescriptorValue> subQueryRoot = subQuery
			.from(DescriptorValue.class);
		subQuery.select(subQueryRoot.<Long>get("id"));
		subQuery.where(cb.equal(subQueryRoot.get("code"), "EMPLOYEE"));
		cq.where(cb.equal(root.<Long>get("userTypeId"), subQuery));
		Query q = em.createQuery(cq);

		List<AdmUser> auList = q.getResultList();
		List<ScalarItem> items = new ArrayList<>();
		for (AdmUser u : auList) {
			ScalarItem i = new ScalarItem();
			i.setName(u.getName());
			i.setId(u.getId());
			items.add(i);
		}
		JsonArray arr = jsonTools.getJsonEntitiesList(items);
		return arr;
	}

}
