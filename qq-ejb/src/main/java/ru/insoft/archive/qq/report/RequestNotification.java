package ru.insoft.archive.qq.report;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.VerticalPositionMark;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.CalibriBold;
import ru.insoft.archive.qq.qualifier.RGANTDIcon;
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

	@Inject
	@CalibriBold
	private BaseFont bfcb;

	@Inject
	@RGANTDIcon
	private URL urlIcon;

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private static Font general;
	private static Font generalHat;
	private static Font generalUnderline;
	private static Font boldHat;
	private static Font boldSmallHat;
	private static Font boldHatSic;

	@PostConstruct
	private void init() {
		if (general == null) {
			general = new Font(bf, 14);
		}
		if (generalUnderline == null) {
			generalUnderline = new Font(bf, 14, Font.UNDERLINE);
		}
		if (generalHat == null) {
			generalHat = new Font(bf, 12);
		}
		if (boldHat == null) {
			boldHat = new Font(bfb, 12);
		}
		if (boldSmallHat == null) {
			boldSmallHat = new Font(bfb, 9);
		}
		if (boldHatSic == null) {
			boldHatSic = new Font(bfcb, 12);
		}
	}

	public void getDocument(Long questionId, OutputStream out) {

		Result dbData = getData(questionId);

		float offset = Utilities.millimetersToPoints(10);
		Document doc = new Document();
		doc.setMargins(offset * 2, offset, offset, offset);

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
			Image icon = Image.getInstance(urlIcon);
			icon.scalePercent(40);
			icon.setAlignment(Image.ALIGN_CENTER);
			icon.setSpacingAfter(10);
			leftCell.addElement(icon);

			Paragraph p = createLeftCellParagraph("ФЕДЕРАЛЬНОЕ АРХИВНОЕ АГЕНТСТВО", generalHat);
			p.setLeading(14);
			leftCell.addElement(p);

			p = createLeftCellParagraph("федеральное казенное учереждение\n"
					+ "\u00abРоссийский государственный\n"
					+ "архив научно-технической\nдокументации\u00bb "
					+ "\n(РГАНТД)", boldHat);
			p.setLeading(14);
			leftCell.addElement(p);

			p = createLeftCellParagraph("Справочно-информационный центр\nфедеральных архивов", boldHatSic);
			p.setLeading(14);
			p.setSpacingAfter(6);
			p.setSpacingBefore(6);
			leftCell.addElement(p);

			p = createLeftCellParagraph("ул. Профсоюзная, д. 82, Москва, 117393\n"
					+ "тел/факс: (495) 334-84-76\nemail: sic_faa@mail.rgantd.ru\n"
					+ "сайт: http://www.rgantd.ru", boldSmallHat);
			p.setLeading(12);
			leftCell.addElement(p);
			leftCell.setPaddingLeft(20);
			leftCell.setPaddingRight(25);
			hat.addCell(leftCell);

			PdfPCell rightCell = new PdfPCell(new Phrase(dbData.toWhom, general));
			rightCell.setBorder(0);
			rightCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			rightCell.setPaddingTop(80);
			hat.addCell(rightCell);
			doc.add(hat);

			p = new Paragraph();
			p.setIndentationLeft(50);
			p.add(new Chunk(dbData.regDate, generalUnderline));
			p.add(new Chunk("  № ", general));
			p.add(new Chunk(dbData.docNumber, generalUnderline));
			p.setSpacingBefore(8);
			p.setSpacingAfter(12);
			doc.add(p);
			if (dbData.issueDocNumber != null && !dbData.issueDocNumber.isEmpty()) {
				p = new Paragraph();
				p.setIndentationLeft(35);
				p.add(new Chunk("На № ", general));
				p.add(new Chunk(dbData.issueDocNumber, generalUnderline));
				doc.add(p);
			}

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setSpacingBefore(50);
			p.setFirstLineIndent(50);
			p.setAlignment(Element.ALIGN_JUSTIFIED);
			p.add(new Chunk("Справочно-информационный центр федеральных государственных архивов "
					+ "внимательно рассмотрел Ваше обращение о предоставлении архивной справки ", general));
			p.add(new Chunk(dbData.content, general));
			if (!dbData.content.endsWith(".")) {
				p.add(new Chunk(".", general));
			}
			doc.add(p);

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setFirstLineIndent(50);
			p.setAlignment(Element.ALIGN_JUSTIFIED);
			p.add(new Chunk("Центр осуществил поиск возможных мест хранения запрашиваемых документов. Запрос"
					+ " направлен по принадлежности в ", general));
			p.add(new Chunk(dbData.execOrganization, general));
			p.add(new Chunk(" по адресу: ", general));
			p.add(new Chunk(dbData.orgAddress, general));
			p.add(new Chunk(" для ответа Вам.", general));
			doc.add(p);

			p = new Paragraph();
			p.setIndentationLeft(30);
			p.setSpacingBefore(80);
			p.add(new Chunk("Специалист Центра", general));
			p.add(new Chunk(" ____________________________ ( ____________________ )", general));
			doc.add(p);

			Chunk ck = new Chunk("(подпись)", general);
			ck.setTextRise(6);
			p = new Paragraph(ck);
			p.setIndentationLeft(225);
			p.add(new Chunk(new VerticalPositionMark(), 165, false));
			ck = new Chunk("(Ф.И.О.)", general);
			ck.setTextRise(6);
			p.add(ck);

			doc.add(p);
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(RequestNotification.class.getName()).log(Level.SEVERE, null, ex);
		} catch (IOException ex) {
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
//		p.setSpacingAfter(4);
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
		List<Object[]> results = em.createNativeQuery("SELECT q.NOTI_KOMU, to_char(q.REG_DATE, 'DD.MM.YYYY'), "
				+ "concat(concat(q.PREFIX_VHOD_DOC, '/'), q.SUFIX_VHOD_DOC), q.NUM_ISHOD_DOC, q.CONTENT, d.FULL_VALUE,"
				+ "attr.av from SIC_QUESTION q LEFT JOIN DESCRIPTOR_VALUE d on q.EXEC_ORG_ID = d.DESCRIPTOR_VALUE_ID "
				+ "LEFT JOIN  "
				+ "(SELECT da.DESCRIPTOR_VALUE_ID as dv, da.attr_value as av from DESCRIPTOR_VALUE_ATTR  da "
				+ "LEFT JOIN  DESCRIPTOR_GROUP_ATTR dg on da.DESCRIPTOR_GROUP_ATTR_ID = dg.DESCRIPTOR_GROUP_ATTR_ID "
				+ "where dg.ATTR_CODE='ORG_ADDRESS') attr "
				+ "on q.EXEC_ORG_ID = attr.dv "
				+ "where q.ID = " + questionId)
				.getResultList();
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
