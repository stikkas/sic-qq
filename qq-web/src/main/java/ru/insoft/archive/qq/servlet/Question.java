package ru.insoft.archive.qq.servlet;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.qq.ejb.Constants;
import ru.insoft.archive.qq.entity.Applicant;
import ru.insoft.archive.qq.entity.AttachedFile;

/**
 * @author sorokin
 * @author Благодатских С.А.
 *
 */
@WebServlet(name = "QuestionSaver", urlPatterns = "/api/Question")
public class Question extends CRUDServlet implements Constants {

	@EJB
	private CommonDBHandler cdbh;

	private static final long serialVersionUID = 2583700054345442658L;

	@Override
	protected JsonArray handleArray(JsonArray arr) throws Exception {
		return null;
	}

	@Override
	protected JsonObject handleObject(JsonObject obj) throws Exception {
		ru.insoft.archive.qq.entity.Question q = (ru.insoft.archive.qq.entity.Question) jsonTools.parseJsonObject(obj, ru.insoft.archive.qq.entity.Question.class);

		Applicant a = q.getApplicant();
		if (a != null) {
			a.setQuestion(q);
		}

		for (AttachedFile f : q.getAttachedFiles()) {
		}

		/*
		 if (q.getId() == null) {
		 // Новый запрос
		 q.setInsDate(new Date());
		 q.setInsertUser(q.getRegistrator());
		 }
		 q.setUpDate(new Date());
		 q.setUpdateUser(userInfo.getUser());
		 */
		JsonObjectBuilder result = Json.createObjectBuilder();
		result.add("id", (Long) (cdbh.insertEntity(q, null)).getId());
		return result.build();
	}
}
