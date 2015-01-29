package ru.insoft.archive.qq.servlet.report;

import java.io.OutputStream;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Печать "Уведоление заявителя"
 *
 * @author Благодатских С.
 */
@WebServlet(name = "RequestNotification", urlPatterns = {"/reports/uvedomlenie"})
public class RequestorNotification extends ReportServlet {

	@Inject
	ru.insoft.archive.qq.report.RequestNotification generator;

	/**
	 * Идентификатор запроса
	 */
	private Long requestId;

	@Override
	protected boolean getParameters(HttpServletRequest request) {
		requestId = Long.valueOf(request.getParameter("id"));
		return requestId != null;
	}

	@Override
	protected void getDocument(OutputStream out) {
		generator.getDocument(requestId, out);
	}

	@Override
	protected String getFileName() {
		return "uvedomlenie";
	}

}
