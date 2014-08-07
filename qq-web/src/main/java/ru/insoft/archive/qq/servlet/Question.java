package ru.insoft.archive.qq.servlet;

import java.util.Date;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.servlet.annotation.WebServlet;

import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.ejb.UserInfo;
import ru.insoft.archive.qq.ejb.Constants;
import ru.insoft.archive.qq.model.Applicant;
import ru.insoft.archive.qq.model.AttachedFile;

/**
 * @author sorokin
 *
 */
@WebServlet(name="QuestionSaver",urlPatterns="/api/Question")
public class Question extends CRUDServlet implements Constants {

	@EJB
	private CommonDBHandler cdbh;

	@EJB
	private UserInfo userInfo;
	private static final long serialVersionUID = 2583700054345442658L;

	@Override
	protected JsonArray handleArray(JsonArray arr) throws Exception {
		return null;
	}

	@Override
	protected JsonObject handleObject(JsonObject obj) throws Exception {
		logger.info("json object from client for save:");
		logger.info(obj.toString());
		logger.info("инициализирую пользователя в бине UserInfo");
		userInfo.initUserForDev();
		
//		ru.insoft.archive.qq.model.Question q = jsonTools.parseEntity(obj, ru.insoft.archive.qq.model.Question.class);
		ru.insoft.archive.qq.model.Question q = (ru.insoft.archive.qq.model.Question) jsonTools.parseJsonObject(obj,ru.insoft.archive.qq.model.Question.class);
		
		Applicant a = q.getApplicant();
		if (a!=null){
		logger.info("Applicant of question: "+q.getApplicant().getName());
		logger.info("Applicant's question: "+ a.getQ());
		a.setQ(q);
		}
		
		logger.info("прикрепленные файлы");
		for (AttachedFile f: q.getFiles()){
			logger.info("attached file 1");
			logger.info("fileName: "+f.getFileName());
			logger.info("fileType: "+f.getFileType());
//			f.setFileType(cdbh.getDescValueByCodes(Q_DICT_FILE_TYPE	,Q_VALUE_FILE_TYPE_ANSWER));
		}
		
		q.setInsDate(new Date());
		q.setUpDate(new Date());
		q.setInsertUser(userInfo.getUser());
		q.setUpdateUser(userInfo.getUser());
		cdbh.insertEntity(q, null);
		return Json.createObjectBuilder().build();
	}



}
