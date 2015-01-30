package ru.insoft.archive.qq.report;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.qq.qualifier.TimesNewRoman;
import ru.insoft.archive.qq.qualifier.TimesNewRomanBold;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class StatReport2 {

	@Inject
	@TimesNewRoman
	private BaseFont bf;

	@Inject
	@TimesNewRomanBold
	private BaseFont bfb;

	@Inject
	private SimpleDateFormat sdf;

	private static Font generalFont;
	private static Font boldFont;

	@PostConstruct
	private void init() {
		if (generalFont == null) {
			generalFont = new Font(bf, 12);
		}
		if (boldFont == null) {
			boldFont = new Font(bfb, 12);
		}
	}

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

			float offset = Utilities.millimetersToPoints(10);

			Document doc = new Document(PageSize.A4.rotate());
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);
			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Отчет по типам подготовленных по запросам документов");

			Paragraph p = new Paragraph("Дата печати:", generalFont);
			doc.add(p);
			p = new Paragraph(sdf.format(new Date()), generalFont);
			doc.add(p);

			doc.add(new Paragraph(startDate.toString()));
			doc.add(new Paragraph(endDate.toString()));
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatReport2.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}
