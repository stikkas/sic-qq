package ru.insoft.archive.qq.servlet;

import java.util.List;
import javax.ejb.EJB;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.extcommons.webmodel.OrderBy;
import ru.insoft.archive.qq.ejb.QQSearch;
import ru.insoft.archive.qq.model.SearchCritery;

/**
 * @author sorokin
 *
 */
@WebServlet(urlPatterns = "/api/Search", description = "Поиск")
public class Search extends AbstractServlet {

	@EJB
	private QQSearch search;

	/* (non-Javadoc)
	 * @see ru.insoft.archive.extcommons.servlet.AbstractServlet#handleRequest(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void handleRequest(HttpServletRequest req,
		HttpServletResponse resp) throws Exception {
		HttpSession session = req.getSession();
		String rawParams = req.getParameter("q");
		if (rawParams != null) {
			session.setAttribute("q", rawParams);
		} else {
			rawParams = (String) session.getAttribute("q");
		}
		JsonObject jsonParams = jsonTools.getJsonObject(rawParams);

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
		List<OrderBy> orders = null;
		if (req.getParameter("sort") != null) {
			JsonArray orderJson = jsonTools.getJsonArray(req.getParameter("sort"));
			orders = jsonTools.parseEntitiesList(orderJson, OrderBy.class);
		}
		SearchCritery q = jsonTools.parseEntity(jsonParams, SearchCritery.class);
		JsonObject searchResult = search.getSearchResult(start, limit, q, orders);
		resp.getWriter().write(searchResult.toString());
	}

}
