package ru.insoft.archive.qq.servlet;

import javax.ejb.EJB;
import javax.json.JsonArray;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.extcommons.servlet.DescValuesProvider;
import ru.insoft.archive.qq.ejb.QQDictValues;

@WebServlet(name = "DictValues", urlPatterns = "/api/DictValues",description="Значения справочников")
public class DictValues extends DescValuesProvider {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6286028737529253437L;

	@EJB
	private QQDictValues qdv;
	
	@Override
	protected void handleRequest(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		String dictCode =  req.getParameter(dictParamKey);
		JsonArray result = null;
		switch (dictCode) {
		case "QQ_ORG_STRUCT_LITERAS":
			result = qdv.getLiteras();
			break;
		case "QQ_USERS":
			result = qdv.getUsers();
			break;
		case "QQ_JOURNAL_APPLICANT_FILTER":
			result = qdv.getApplicantsForJournal();
			break;
		case "QQ_JOURNAL_EXECUTOR":
			result = qdv.getExecutorsForJournal();
			break;
		default:
			super.handleRequest(req, resp);
		}
		if (result!=null){
			resp.getWriter().write(result.toString());
		}
	}
}
