package ru.insoft.archive.qq.report;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.Arial;

/**
 * Статистика исполнения запросов федеральными архивами и СИЦ
 *
 * @author С. Благодатских
 */
public class StatExecQuery {

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private static final SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");

	@Inject
	@Arial
	private BaseFont bf;

	private static final String[] tematics = {
		"Социально-правовые запросы",
		"Тематические запросы",
		"Генеалогические запросы",
		"Биографические запросы",
		"Всего запросов"
	};
	private static final String[][] status = {{"Получено"},
	{"Исполнено", "Всего", "Выдано полож. ответов", "Выдано отриц. ответов", "Выдано рекомендаций"},
	{"Мотив. отказ"},
	{"Снято с исполнения"}};

	private static final int[] cellWidths = new int[]{2,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1};
	private static Font tableFont;

	@PostConstruct
	void init() {
		if (tableFont == null) {
			tableFont = new Font(bf, 8);
		}
	}

	public void getDocument(Date startDate, Date endDate, OutputStream out) {
		try {
			float offset = Utilities.millimetersToPoints(6);
			Document doc = new Document(PageSize.A4.rotate());
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);
			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Статистика исполнения запросов федеральными архивами и СИЦ");

			Font stampFont = new Font(bf, 11);
			Font titleFont = new Font(bf, 12, Font.BOLD);

			// Заголовок документа
			Paragraph p = new Paragraph("Дата печати:", stampFont);
			p.add(new Chunk("                                                     СТАТИСТИКА ИСПОЛНЕНИЯ ЗАПРОСОВ ФЕДЕРАЛЬНЫМИ", titleFont));
			doc.add(p);
			p = new Paragraph("ГОСУДАРСТВЕННЫМИ АРХИВАМИ И СПРАВОЧНО-ИНФОРМАЦИОННЫМ ЦЕНТРОМ", titleFont);
			p.setAlignment(Element.ALIGN_CENTER);
			doc.add(p);
			p = new Paragraph("ЗА  ПЕРИОД С " + sdf.format(startDate) + " ПО " + sdf.format(endDate), stampFont);
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingBefore(10);
			p.setSpacingAfter(10);
			doc.add(p);

			PdfPTable table = new PdfPTable(36);
			table.setWidthPercentage(100);
			table.setWidths(cellWidths);
			// Шапка таблицы
			PdfPCell cell = new PdfPCell(new TablePhrase("Архив"));
			cell.setRowspan(3);
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
			table.addCell(cell);
			for (String tema : tematics) {
				cell = new PdfPCell(new TablePhrase(tema));
				cell.setColspan(7);
				cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell.setPaddingBottom(6);
				table.addCell(cell);
			}
			for (int i = 0; i < tematics.length; ++i) {
				for (String[] stat : status) {
					cell = new PdfPCell(new TablePhrase(stat[0]));
					if (stat.length == 1) {
						cell.setRotation(90);
						cell.setRowspan(2);
					} else {
						cell.setColspan(stat.length - 1);
						cell.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell.setPaddingBottom(6);
					}
					table.addCell(cell);
				}
			}
			for (int i = 0; i < tematics.length; ++i) {
				for (String[] stat : status) {
					if (stat.length > 1) {
						for (int j = 1; j < stat.length; ++j) {
							cell = new PdfPCell(new TablePhrase(stat[j]));
							cell.setRotation(90);
							table.addCell(cell);
						}
					}
				}
			}

			doc.add(table);

			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatExecQuery.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	private class TablePhrase extends Phrase {

		public TablePhrase(String string) {
			super(string, tableFont);
		}
	}
}
