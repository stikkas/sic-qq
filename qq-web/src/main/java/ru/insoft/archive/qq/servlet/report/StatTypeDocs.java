package ru.insoft.archive.qq.servlet.report;

import java.io.OutputStream;
import java.sql.Date;
import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Создает документ "Отчет по типам подготовленных по запросам документов" за
 * требуемый период.
 *
 * @author С. Благодатских
 */
@WebServlet(name = "StatTypeDocs", urlPatterns = {"/reports/statexecquery2"})
public class StatTypeDocs extends ReportServlet {

	@EJB
	ru.insoft.archive.qq.report.StatReport2 generator;

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
	private String archive;
	/**
	 * Идентификатор типа запроса
	 */
	private String queryType;

	@Override
	protected boolean getParameters(HttpServletRequest request) {
		startDate = request.getParameter("startDate");
		endDate = request.getParameter("endDate");
		archive = request.getParameter("archive");
		queryType = request.getParameter("queryType");
		return startDate != null && endDate != null;
	}

	@Override
	protected void getDocument(OutputStream out) {
		generator.getDocument(Date.valueOf(startDate), Date.valueOf(endDate),
				archive != null ? Long.valueOf(archive) : null, 
				queryType != null ? Long.valueOf(queryType) : null,
				out);
	}

	@Override
	protected String getFileName() {
		return "statexecquery2";
	}
}
