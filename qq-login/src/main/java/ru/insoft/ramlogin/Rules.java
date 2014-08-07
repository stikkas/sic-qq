package ru.insoft.ramlogin;

import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.extcommons.ejb.UserInfo;
import ru.insoft.archive.extcommons.servlet.AbstractServlet;
import ru.insoft.archive.extcommons.webmodel.UserModel;

/**
 *
 * @author sorokin
 */
@WebServlet(name = "Rules", urlPatterns = "/Rules")
public class Rules extends AbstractServlet {

    @Inject
    @SessionScoped
    private UserInfo ui;

    @Override
    public void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException {
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
