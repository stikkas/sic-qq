package ru.insoft.archive.qq.servlet.report;

import java.io.OutputStream;
import java.sql.Date;
import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Создает документ "Реестр запросов на контроле" за требуемый период.
 *
 * @author С. Благодатских
 */
@WebServlet(name = "StatControlQuery", urlPatterns = {"/reports/statexecquery4"})
public class StatControlQuery extends ReportServlet {

	@EJB
	ru.insoft.archive.qq.report.StatReport4 generator;

	/**
	 * Начальная дата для выборки данных
	 */
	private String startDate;
	/**
	 * Конечная дата для выборки данных
	 */
	private String endDate;
	/**
	 * Идентификатор архива
	 */
	private Long archive;

	@Override
	protected boolean getParameters(HttpServletRequest request) {
		startDate = request.getParameter("startDate");
		endDate = request.getParameter("endDate");
		String arch = request.getParameter("archive");
		if (arch != null && !arch.isEmpty() && !arch.equals("null")) {
			archive = Long.valueOf(arch);
		}
		return startDate != null && endDate != null;
	}

	@Override
	protected void getDocument(OutputStream out) {
		generator.getDocument(Date.valueOf(startDate), Date.valueOf(endDate),
				archive, out);
	}

	@Override
	protected String getFileName() {
		return "statexecquery4";
	}
}
