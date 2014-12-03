package ru.insoft.archive.qq.servlet.report;

import java.io.OutputStream;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author С. Благодатских
 */
@WebServlet(name = "Vypiska", urlPatterns = {"/reports/vypiska"})
public class Vypiska extends ReportServlet {

	@Inject
	ru.insoft.archive.qq.report.Vypiska generator;

	/**
	 * Часть номера запроса до слэша
	 */
	private String prefix;
	/**
	 * Часть номера запроса после слэша
	 */
	private String sufix;
	/**
	 * Литера организации, создавшей запрос
	 */
	private String litera;

	@Override
	protected void getParameters(HttpServletRequest request) {
		prefix = request.getParameter("prefix");
		sufix = request.getParameter("sufix");
		litera = request.getParameter("litera");
	}

	@Override
	protected boolean checkParameters() {
		return prefix == null || sufix == null || litera == null;
	}

	@Override
	protected void getDocument(OutputStream out) {
		generator.getDocument(Long.parseLong(prefix), Long.parseLong(sufix),
			Long.parseLong(litera), out);
	}

	@Override
	protected String getFileName() {
		return "vypiska";
	}

}
