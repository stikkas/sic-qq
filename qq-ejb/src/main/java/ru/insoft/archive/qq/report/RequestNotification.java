package ru.insoft.archive.qq.report;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.VerticalPositionMark;
import java.io.OutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.TimesNewRoman;
import ru.insoft.archive.qq.qualifier.TimesNewRomanBold;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class RequestNotification {

	@Inject
	@TimesNewRoman
	private BaseFont bf;

	@Inject
	@TimesNewRomanBold
	private BaseFont bfb;

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private static Font generalFont;
	private static Font generalUnderlineFont;
	private static Font titleBoldFont;
	private static Font titleBoldSmallFont;

	@PostConstruct
	private void init() {
		if (generalFont == null) {
			generalFont = new Font(bf, 14);
		}
		if (generalUnderlineFont == null) {
			generalUnderlineFont = new Font(bf, 14, Font.UNDERLINE);
		}
		if (titleBoldFont == null) {
			titleBoldFont = new Font(bfb, 12);
		}
		if (titleBoldSmallFont == null) {
			titleBoldSmallFont = new Font(bfb, 10);
		}
	}

	public void getDocument(Long questionId, OutputStream out) {

		Result dbData = getData(questionId);

		float offset = Utilities.millimetersToPoints(10);
		Document doc = new Document();
		doc.setMargins(offset, offset, offset, offset);

		try {
			PdfWriter.getInstance(doc, out);

			doc.open();

			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Уведомление заявителя");

			PdfPTable hat = new PdfPTable(2);
			hat.setWidthPercentage(100);

			PdfPCell leftCell = new PdfPCell();

			leftCell.setBorder(0);
			leftCell.addElement(createLeftCellParagraph("ФЕДЕРАЛЬНОЕ АРХИВНОЕ АГЕНТСТВО", generalFont));

			leftCell.addElement(createLeftCellParagraph("федеральное казенное учереждение\n"
					+ "\u00abРоссийский государственный\n"
					+ "архив научно-технической\nдокументации\u00bb "
					+ "\n(РГАНТД)", titleBoldFont));

			leftCell.addElement(createLeftCellParagraph("Справочно-информационный центр\nфедеральных архивов", titleBoldFont));
			leftCell.addElement(createLeftCellParagraph("ул. Профсоюзная, д. 82, Москва, 117393\n"
					+ "тел/факс: (495) 334-84-76\nemail: sic_faa@mail.rgantd.ru\n"
					+ "сайт: http://www.rgantd.ru", titleBoldSmallFont));
			leftCell.setPaddingLeft(20);
			leftCell.setPaddingRight(25);
			hat.addCell(leftCell);

			PdfPCell rightCell = new PdfPCell(new Phrase(dbData.toWhom, generalFont));
			rightCell.setBorder(0);
			rightCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			rightCell.setPaddingTop(60);
			hat.addCell(rightCell);
			doc.add(hat);

			Paragraph p = new Paragraph();
			p.setIndentationLeft(50);
			p.add(new Chunk(dbData.regDate, generalUnderlineFont));
			p.add(new Chunk("  № ", generalFont));
			p.add(new Chunk(dbData.docNumber, generalUnderlineFont));
			p.setSpacingBefore(10);
			p.setSpacingAfter(15);
			doc.add(p);

			if (dbData.issueDocNumber != null && !dbData.issueDocNumber.isEmpty()) {
				p = new Paragraph();
				p.setIndentationLeft(35);
				p.add(new Chunk("На № " + dbData.issueDocNumber, generalFont));
				doc.add(p);
			}

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setSpacingBefore(60);
			p.setFirstLineIndent(50);
			p.add(new Chunk("Справочно-информационный центр федеральных государственных архивов "
					+ "внимательно рассмотрел Ваше обращение о предоставлении архивной справки ", generalFont));
			p.add(new Chunk(dbData.content, generalFont));
			if (!dbData.content.endsWith(".")) {
				p.add(new Chunk(".", generalFont));
			}
			doc.add(p);

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setFirstLineIndent(50);
			p.add(new Chunk("Центр осуществил поиск возможных мест хранения запрашиваемых документов. Запрос"
					+ " направлен по принадлежности в ", generalFont));
			p.add(new Chunk(dbData.execOrganization, generalFont));
			p.add(new Chunk(" по адресу: ", generalFont));
			p.add(new Chunk(dbData.orgAddress, generalFont));
			p.add(new Chunk(" для ответа Вам.", generalFont));
			doc.add(p);

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setSpacingBefore(80);
			p.add(new Chunk("Руководитель Центра", generalFont));
			p.add(new Chunk(new VerticalPositionMark(), 400, false));
			p.add(new Chunk("С.А. Лашкевич", generalFont));
			doc.add(p);
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(RequestNotification.class.getName()).log(Level.SEVERE, null, ex);
		}

	}

	/**
	 * Создает параграф для заголовка
	 *
	 * @param line текст параграфа
	 * @param font шрифт для параграфа
	 * @return параграф
	 */
	private Paragraph createLeftCellParagraph(String line, Font font) {
		Paragraph p = new Paragraph();
		p.setSpacingAfter(6);
		p.setAlignment(Element.ALIGN_CENTER);
		p.add(new Chunk(line, font));
		return p;
	}

	/**
	 * Получает данные из базы
	 *
	 * @param questionId идентификатор запроса
	 * @return объект с данными
	 */
	private Result getData(Long questionId) {
		String query = "select n.to_whom,to_char(q.REG_DATE, 'DD.MM.YYYY'),"
				+ "concat(concat(q.PREFIX_NUM, '/'), q.sufix_num), app.issue_doc_num, q.CONTENT, d.full_value,"
				+ "attr.av from QQ_QUESTION q LEFT JOIN QQ_APPLICANT app on q.QUESTION_ID = app.QUESTION_ID "
				+ "LEFT JOIN QQ_NOTIFICATION n on q.QUESTION_ID = n.QUESTION_ID "
				+ "LEFT JOIN DESCRIPTOR_VALUE d  on q.EXEC_ORG_ID = d.DESCRIPTOR_VALUE_ID "
				+ "LEFT JOIN  "
				+ "(SELECT da.DESCRIPTOR_VALUE_ID as dv, da.attr_value as av from DESCRIPTOR_VALUE_ATTR  "
				+ "da LEFT JOIN  DESCRIPTOR_GROUP_ATTR dg  "
				+ "on da.DESCRIPTOR_GROUP_ATTR_ID = dg.DESCRIPTOR_GROUP_ATTR_ID where dg.ATTR_CODE='ORG_ADDRESS') attr "
				+ "on q.EXEC_ORG_ID = attr.dv "
				+ "where q.QUESTION_ID = " + questionId;
		List<Object[]> results = em.createNativeQuery(query).getResultList();
		Object[] source;
		if (results.isEmpty()) {
			source = new Object[]{"", "", "", "", "", "", ""};
		} else {
			source = results.get(0);
		}
		return new Result(source);
	}

	/**
	 * Объект для хранения данных
	 */
	private class Result {

		public final String toWhom;
		public final String regDate;
		public final String docNumber;
		public final String issueDocNumber;
		public final String content;
		public final String execOrganization;
		public final String orgAddress;

		public Result(Object[] source) {
			toWhom = (String) source[0];
			regDate = (String) source[1];
			docNumber = (String) source[2];
			issueDocNumber = (String) source[3];
			content = (String) source[4];
			execOrganization = (String) source[5];
			orgAddress = (String) source[6];
		}

	}
}
