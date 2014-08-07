/**
 * 
 */
package ru.insoft.archive.qq.servlet;

import java.util.List;

import javax.ejb.EJB;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.extcommons.webmodel.FilterBy;
import ru.insoft.archive.extcommons.webmodel.OrderBy;
import ru.insoft.archive.qq.ejb.QQSearch;

/**
 * @author sorokin
 * 
 */
@WebServlet(urlPatterns = "/api/Journal", description = "Journal handler", displayName = "Journal loader Servlet")
public class Journal extends AbstractServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7317065480089594150L;
	@EJB
	private QQSearch search;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * ru.insoft.archive.extcommons.servlet.AbstractServlet#handleRequest(javax
	 * .servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void handleRequest(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		String startSt = req.getParameter(startParamKey);
		String limitSt = req.getParameter(limitParamKey);
		Integer start = null;
		Integer limit = null;
		if (startSt != null) {
			start = Integer.parseInt(startSt);
		}
		if (limitSt != null) {
			limit = Integer.parseInt(limitSt);
		}
		List<FilterBy> filters = null;
		if (req.getParameter("filter") != null) {
			JsonArray filtersJson = jsonTools.getJsonArray(req
					.getParameter("filter"));
			filters = jsonTools.parseEntitiesList(filtersJson, FilterBy.class);
		}
		List<OrderBy> orders = null;
		if (req.getParameter("sort") !=null){
			JsonArray orderJson = jsonTools.getJsonArray(req.getParameter("sort"));
			orders = jsonTools.parseEntitiesList(orderJson, OrderBy.class);
		}

		JsonObject journalResult = search.getJournalData(start, limit, filters,orders);
		resp.getWriter().write(journalResult.toString());

	}

}
