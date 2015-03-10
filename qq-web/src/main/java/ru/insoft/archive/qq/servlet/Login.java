package ru.insoft.archive.qq.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import ru.insoft.archive.qq.service.UserProfile;
import ru.insoft.archive.qq.servlet.dto.AuthResulMessage;

/**
 * Сервлет аутентификации. Используется вместо стандартного, чтобы более
 * наглядно определять результ авторизации через ajax запрос.
 *
 * @author Благодатских С.
 */
@WebServlet(name = "Login", urlPatterns = {"/login"})
public class Login extends HttpServlet {

	@Inject
	UserProfile up;

	/**
	 * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
	 * methods.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String password = request.getParameter("j_password");
		String username = request.getParameter("j_username");
		AuthResulMessage answer = new AuthResulMessage();
		try {
			request.login(username, password);
			answer.setResult(true);
		} catch (ServletException e) {
			answer.setMsg(e.getLocalizedMessage());
		}

		response.setContentType(MediaType.APPLICATION_JSON);
		try (PrintWriter out = response.getWriter()) {
			new ObjectMapper().writeValue(out, answer);
		}
		// Вызываем чтобы иницилизировать bean перед тем как пользователь к нему обратится
		if (answer.isResult()) {
			up.isSic();
		}
	}

	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processRequest(request, response);
	}

}
