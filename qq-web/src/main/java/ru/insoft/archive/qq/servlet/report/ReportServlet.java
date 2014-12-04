package ru.insoft.archive.qq.servlet.report;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Базовый сервелет для всех сервлетов, которые получают какие-то параметры с
 * запросом и отдают документ в формате pdf.
 *
 * @author С. Благодатских
 */
public abstract class ReportServlet extends HttpServlet {

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
		response.setCharacterEncoding("utf-8");

		if (!getParameters(request)) {
			response.sendError(500, "Недостаточно параметров");
		} else {
			String fileName = getFileName();
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".pdf\"");
			response.setContentType("application/x-pdf; name=\"" + fileName + ".pdf\"");

			try (OutputStream out = response.getOutputStream()) {
				getDocument(out);
			} catch (IllegalArgumentException e) {
				Logger.getLogger(getClass().getName()).severe("Неправильные даные запроса");
			}
		}
	}

	/**
	 * Извлекает параметры из запроса и проверят их наличие
	 *
	 * @param request запрос
	 * @return true если все хорошо
	 */
	protected abstract boolean getParameters(HttpServletRequest request);

	/**
	 * Создает документ и записывает в поток
	 *
	 * @param out поток для записи документа
	 */
	protected abstract void getDocument(OutputStream out);

	/**
	 * Возвращает имя файла, который будет передан с ответом
	 *
	 * @return имя файла
	 */
	protected abstract String getFileName();

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
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
