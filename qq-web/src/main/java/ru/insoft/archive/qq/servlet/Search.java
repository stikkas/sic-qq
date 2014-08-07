/**
 * 
 */
package ru.insoft.archive.qq.servlet;

import javax.ejb.EJB;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.qq.ejb.QQSearch;
import ru.insoft.archive.qq.model.SearchCritery;

/**
 * @author sorokin
 *
 */
@WebServlet(urlPatterns="/api/Search",description="Поиск")
public class Search extends AbstractServlet {

	@EJB
	private QQSearch search;
	
	/* (non-Javadoc)
	 * @see ru.insoft.archive.extcommons.servlet.AbstractServlet#handleRequest(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void handleRequest(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		String rawParams = req.getParameter("q");
		logger.info("Критерии поиска: "+rawParams);
		JsonObject jsonParams = jsonTools.getJsonObject(rawParams);
		
		SearchCritery q = jsonTools.parseEntity(jsonParams, SearchCritery.class);
		JsonObject searchResult = search.getSearchResult(q);
		logger.info("Raw search answer: "+searchResult.toString());
		resp.getWriter().write(searchResult.toString());
	}

}
