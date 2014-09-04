package ru.insoft.archive.qqlogin;

import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.extcommons.ejb.UserInfo;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.extcommons.webmodel.UserModel;

/**
 * Отдает набор прав доступа для пользователя, от имени, которого открыта
 * сессия. Ответ должен обрабатывать javascript. Предполагается что
 * иницилизирует запрос javascript посредством AJAX технологии.
 *
 * @author С. Благодатских
 */
@WebServlet(name = "Rules", urlPatterns = "/Rules")
public class Rules extends AbstractServlet {

	@EJB
	@SessionScoped
	private UserInfo ui;

	@Override
	protected void handleRequest(HttpServletRequest req, HttpServletResponse resp)
		throws Exception {
		try {
			UserModel um = new UserModel();
			um.setUser(ui.getUser(), ui.getAccessRules());
			JsonObject jo = jsonTools.getJsonForEntity(um);
			resp.getWriter().write(jo.toString());
		} catch (Exception e) {
			ServletException se = new ServletException(e.getMessage());
			e.setStackTrace(se.getStackTrace());
			throw se;
		}

	}

}