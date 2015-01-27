package ru.insoft.archive.qq.report;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.OutputStream;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class StatReport2 {

	/**
	 * Возвращает pdf файл в поток ответа сервера
	 *
	 * @param startDate начальная дата регистрации запросов
	 * @param endDate конечная дата регистрации запросов
	 * @param archiveId идентификатор архива
	 * @param queryTypeId идентификатор типа запроса
	 * @param out выходной поток
	 */
	public void getDocument(Date startDate, Date endDate, Long archiveId,
			Long queryTypeId, OutputStream out) {
		try {

			float offset = Utilities.millimetersToPoints(6);

			Document doc = new Document(PageSize.A4);
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);
			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Статистика исполнения запросов федеральными архивами и СИЦ");
			doc.add(new Paragraph(startDate.toString()));
			doc.add(new Paragraph(endDate.toString()));
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatReport2.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}
