package ru.insoft.archive.qq.servlet;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ru.insoft.archive.extcommons.ejb.FileUploadBean;
import ru.insoft.archive.extcommons.servlet.FileUploadServlet;
import ru.insoft.archive.qq.ejb.AttachedFileHandler;

/**
 * Сервлет для загрузки прикрепленных файлов на сервер.
 *
 * @author С. Благодатских
 */
@WebServlet(name = "SaveAttachedFiles", urlPatterns = "/api/SaveAttachedFiles",
		description = "Сохранение прикрепленных файлов к запросу и к исполнению запроса")
public class SaveAttachedFiles extends FileUploadServlet {

	@EJB
	AttachedFileHandler handler;

	@Override
	protected FileUploadBean getBean() {
		return handler;
	}

	@Override
	protected void handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		try {
			super.handleRequest(req, resp);
		} catch (Exception e) {
			resp.getWriter().println(e.getMessage());
		}
	}

}
