package ru.insoft.archive.qq.report;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
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
public class StatReport4 {

	/**
	 * Возвращает pdf файл в поток ответа сервера
	 *
	 * @param startDate начальная дата регистрации запросов
	 * @param endDate конечная дата регистрации запросов
	 * @param archiveId идентификатор архива
	 * @param out выходной поток
	 */
	public void getDocument(Date startDate, Date endDate, Long archiveId,
			OutputStream out) {
		try {

			float offset = Utilities.millimetersToPoints(6);

			Document doc = new Document();
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);
			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Реестр запросов на контроле");
			doc.add(new Paragraph(startDate.toString()));
			doc.add(new Paragraph(endDate.toString()));
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatReport4.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

}
