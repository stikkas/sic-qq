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
import java.util.List;
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

	private static final SimpleDateFormat printFormat = new SimpleDateFormat("dd.MM.yyyy");

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
//	private static final String[] temaCodes = {
//		"Q_VALUE_QUEST_TYPE_SOCIAL",
//		"Q_VALUE_QUEST_TYPE_TEMATIC",
//		"Q_VALUE_QUEST_TYPE_GENEA",
//		"Q_VALUE_QUEST_TYPE_BIO",
//		""
//	};

	private static final String[][] status = {{"Получено"},
	{"Исполнено", "Всего", "Выдано полож. ответов", "Выдано отриц. ответов", "Выдано рекомендаций"},
	{"Мотив. отказ"},
	{"Снято с исполнения"}};

	private static final String[] literaCodes = {
		"ГАРФ", "Q_VALUE_MEMBER_GARF",
		"РГАЭ", "Q_VALUE_MEMBER_RGAE",
		"РГАНТД", "Q_VALUE_MEMBER_RGANTD",
		"РГАЛИ", "Q_VALUE_MEMBER_RGALI",
		"РГАСПИ", "Q_VALUE_MEMBER_RGASPI",
		"РГАНИ", "Q_VALUE_MEMBER_RGANI",
		"РГВА", "Q_VALUE_MEMBER_RGBA",
		"Подитог", "-1",
		"СИЦ", "Q_VALUE_MEMBER_SIC",
		"Итого", ""
	};
	private static final int[] cellWidths = new int[]{2,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1};
	private static final String stringQuery = "select "
		+ "QQ_ON_INTERVAL_QUERY_COUNT(:social,:member,:start,:end) as soc_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_COUNT(:social,:member,:start,:end) as soc_exec_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_POS(:social,:member,:start,:end) as soc_exec_pos,"
		+ "QQ_ON_INTERVAL_EXEC_NEG(:social,:member,:start,:end) as soc_exec_neg,"
		+ "QQ_ON_INTERVAL_EXEC_REC(:social,:member,:start,:end) as soc_exec_rec,"
		+ "QQ_ON_INTERVAL_REFUS_COUNT(:social,:member,:start,:end) as soc_otkaz,"
		+ "QQ_ON_INTERVAL_REJECT_COUNT(:social,:member,:start,:end) as soc_reject,"
		+ "QQ_ON_INTERVAL_QUERY_COUNT(:tematic,:member,:start,:end) as tem_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_COUNT(:tematic,:member,:start,:end) as tem_exec_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_POS(:tematic,:member,:start,:end) as tem_exec_pos,"
		+ "QQ_ON_INTERVAL_EXEC_NEG(:tematic,:member,:start,:end) as tem_exec_neg,"
		+ "QQ_ON_INTERVAL_EXEC_REC(:tematic,:member,:start,:end) as tem_exec_rec,"
		+ "QQ_ON_INTERVAL_REFUS_COUNT(:tematic,:member,:start,:end) as tem_otkaz,"
		+ "QQ_ON_INTERVAL_REJECT_COUNT(:tematic,:member,:start,:end) as tem_reject,"
		+ "QQ_ON_INTERVAL_QUERY_COUNT(:genia,:member,:start,:end) as gen_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_COUNT(:genia,:member,:start,:end) as gen_exec_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_POS(:genia,:member,:start,:end) as gen_exec_pos,"
		+ "QQ_ON_INTERVAL_EXEC_NEG(:genia,:member,:start,:end) as gen_exec_neg,"
		+ "QQ_ON_INTERVAL_EXEC_REC(:genia,:member,:start,:end) as gen_exec_rec,"
		+ "QQ_ON_INTERVAL_REFUS_COUNT(:genia,:member,:start,:end) as gen_otkaz,"
		+ "QQ_ON_INTERVAL_REJECT_COUNT(:genia,:member,:start,:end) as gen_reject,"
		+ "QQ_ON_INTERVAL_QUERY_COUNT(:bio,:member,:start,:end) as bio_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_COUNT(:bio,:member,:start,:end) as bio_exec_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_POS(:bio,:member,:start,:end) as bio_exec_pos,"
		+ "QQ_ON_INTERVAL_EXEC_NEG(:bio,:member,:start,:end) as bio_exec_neg,"
		+ "QQ_ON_INTERVAL_EXEC_REC(:bio,:member,:start,:end) as bio_exec_rec,"
		+ "QQ_ON_INTERVAL_REFUS_COUNT(:bio,:member,:start,:end) as bio_otkaz,"
		+ "QQ_ON_INTERVAL_REJECT_COUNT(:bio,:member,:start,:end) as bio_reject,"
		+ "QQ_ON_INTERVAL_QUERY_COUNT(:all,:member,:start,:end) as cnt,"
		+ "QQ_ON_INTERVAL_EXEC_COUNT(:all,:member,:start,:end) as exec_cnt,"
		+ "QQ_ON_INTERVAL_EXEC_POS(:all,:member,:start,:end) as exec_pos,"
		+ "QQ_ON_INTERVAL_EXEC_NEG(:all,:member,:start,:end) as exec_neg,"
		+ "QQ_ON_INTERVAL_EXEC_REC(:all,:member,:start,:end) as exec_rec,"
		+ "QQ_ON_INTERVAL_REFUS_COUNT(:all,:member,:start,:end) as otkaz,"
		+ "QQ_ON_INTERVAL_REJECT_COUNT(:all,:member,:start,:end) as reject_ "
		+ "from dual";
	private static Font tableFont;

	private Object[] execRequest(String member, Date start, Date end) {
		List<Object[]> result = em.createNativeQuery(stringQuery)
			.setParameter("social", "Q_VALUE_QUEST_TYPE_SOCIAL")
			.setParameter("tematic", "Q_VALUE_QUEST_TYPE_TEMATIC")
			.setParameter("genia", "Q_VALUE_QUEST_TYPE_GENEA")
			.setParameter("bio", "Q_VALUE_QUEST_TYPE_BIO")
			.setParameter("all", "")
			.setParameter("member", member)
			.setParameter("start", start)
			.setParameter("end", end).getResultList();
		if (result.isEmpty()) {
			return new Object[0];
		}
		return result.get(0);
	}

	@PostConstruct
	void init() {
		if (tableFont == null) {
			tableFont = new Font(bf, 9);
		}
	}

	public void getDocument(Date startDate, Date endDate, OutputStream out) {
		try {
			float offset = Utilities.millimetersToPoints(6);

			String start = printFormat.format(startDate);
			String end = printFormat.format(endDate);
			String now = printFormat.format(new Date());

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
			p = new Paragraph(now, stampFont);
			p.add(new Chunk("                                        ГОСУДАРСТВЕННЫМИ АРХИВАМИ И СПРАВОЧНО-ИНФОРМАЦИОННЫМ ЦЕНТРОМ", titleFont));
			doc.add(p);
			p = new Paragraph("ЗА  ПЕРИОД С " + start + " ПО " + end, stampFont);
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

			addSubTitle(table, "Федеральные государственные архивы", titleFont);

			int endArchivesIndex = literaCodes.length - 4;
			int k = 0;
			for (; k < endArchivesIndex; ++k) {
				createRowData(table, literaCodes[k], literaCodes[++k], startDate, endDate);
			}

			addSubTitle(table, "Справочно-информационный центр", titleFont);

			for (; k < literaCodes.length; ++k) {
				createRowData(table, literaCodes[k], literaCodes[++k], startDate, endDate);
			}
			doc.add(table);

			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatExecQuery.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	/**
	 * Вставляет в таблицу заголовок шириной во всю таблицу.
	 *
	 * @param table таблица
	 * @param title строка для заголовка
	 * @param font шрифт для заголовка
	 */
	private void addSubTitle(PdfPTable table, String title, Font font) {
		PdfPCell cell = new PdfPCell(new Phrase(title, font));
		cell.setColspan(36);
		cell.setPaddingBottom(12);
		cell.setPaddingTop(8);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(cell);
	}

	/**
	 * Вставляет в таблицу строку с данными для каждого архива и подитога и
	 * итога.
	 *
	 * @param table таблица
	 * @param title строка для первой яцейки
	 * @param member кодовое значение архива
	 * @param start начальная дата
	 * @param end конечная дата
	 */
	private void createRowData(PdfPTable table, String title, String member, Date start, Date end) {
		PdfPCell cell = new PdfPCell(new TablePhrase(title));
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setPaddingBottom(4);
		table.addCell(cell);
		for (Object count : execRequest(member, start, end)) {
			cell = new PdfPCell(new TablePhrase((String) count));
			cell.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell.setPaddingBottom(4);
			table.addCell(cell);
		}
	}

	/**
	 * Элемент для вставки в таблицу с заранее определенным шрифтом
	 */
	private class TablePhrase extends Phrase {

		public TablePhrase(String string) {
			super(string, tableFont);
		}
	}
}
