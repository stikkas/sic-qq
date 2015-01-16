package ru.insoft.archive.qq.servlet.report;

import java.io.OutputStream;
import java.sql.Date;
import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Создает документ "Статистика исполнения запросов федеральными архивами и СИЦ"
 * за требуемый период.
 *
 * @author С. Благодатских
 */
@WebServlet(name = "StatExecQuery", urlPatterns = {"/reports/statexecquery"})
public class StatExecQuery extends ReportServlet {

	@EJB
	ru.insoft.archive.qq.report.StatExecQuery generator;

	/**
	 * Начальная дата для выборки данных
	 */
	private String startDate;
	/**
	 * Конечная дата для выборки данных
	 */
	private String endDate;

	@Override
	protected boolean getParameters(HttpServletRequest request) {
		startDate = request.getParameter("startDate");
		endDate = request.getParameter("endDate");
		return startDate != null && endDate != null;
	}

	@Override
	protected void getDocument(OutputStream out) {
		generator.getDocument(Date.valueOf(startDate), Date.valueOf(endDate), out);
	}

	@Override
	protected String getFileName() {
		return "statexecquery";
	}

}
