package ru.insoft.archive.qq.report;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.OutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.Arial;
import ru.insoft.archive.qq.qualifier.ArialBold;

/**
 * Создает документ "Выписка"
 *
 * @author С. Благодатских
 */
public class Vypiska {

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	@Inject
	@Arial
	private BaseFont arial;

	@Inject
	@ArialBold
	private BaseFont arialBold;

	public void getDocument(Long prefix, Integer sufix, Long litera,
		OutputStream out) {
		try {
			VypiskaInfo vi = getData(prefix, sufix, litera);

			float offset = Utilities.millimetersToPoints(6);
			// По умолчанию создается A4
			Document doc = new Document();
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);
			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Выписка");

			Font blank = new Font(arial, 6);
			Font uderline = new Font(arial, 12, Font.UNDERLINE);
			Font title = new Font(arial, 14);
			Font title_bold = new Font(arialBold, 14);
			Font value = new Font(arialBold, 13);
			Font general = new Font(arial, 12);

			Font font;
			int align;
			Paragraph paragraph;
			for (int i = 0; i < template.length; ++i) {
				align = Paragraph.ALIGN_CENTER;
				if (i == 0) {
					font = title;
				} else if (i == 10 || i == 11) {
					font = title_bold;
				} else if (i == 24 || i == 25) {
					align = Paragraph.ALIGN_LEFT;
					font = general;
				} else if (i == 34) {
					font = uderline;
				} else if (i > 39) {
					align = Paragraph.ALIGN_RIGHT;
					font = general;
				} else if (i == 23) { // Пропускаем сведения о предаставленнных документах
					i += 2;
					continue;
				} else {
					font = general;
				}
				paragraph = new Paragraph(template[i], font);
				if (i == 13) {
					Phrase phrase1 = new Phrase(template[i], general);
					phrase1.add(new Chunk(prefix + "/" + sufix, value));
					i += 2;

					Phrase phrase2 = new Phrase(template[i], general);
					phrase2.add(new Chunk(vi.getRegDate(), value));

					doc.add(createTable(new PdfPCell[]{createCell(phrase1, Element.ALIGN_LEFT, Rectangle.BOTTOM | Rectangle.TOP),
						createCell(phrase2, Element.ALIGN_RIGHT, Rectangle.BOTTOM | Rectangle.TOP)}));
					++i;
					continue;
				} else if (i == 18) { // Заявитель
					doc.add(createTable(createCell(new Phrase(vi.getApplicant(), value), Element.ALIGN_LEFT, Rectangle.BOTTOM)));
					continue;
				} else if (i == 20) { // Адрес
					doc.add(createTable(createCell(new Phrase(vi.getAddress(), general), Element.ALIGN_LEFT, Rectangle.BOTTOM)));
					continue;
				} else if (i == 22) { // Архивная справка
					doc.add(new Paragraph(" ", blank));
					doc.add(createTable(createCell(new Phrase(template[i], general), Element.ALIGN_LEFT, Rectangle.BOTTOM)));
					continue;
				} else if (i == 27) { // Содержание запроса
					doc.add(createTable(createCell(new Phrase(vi.getContent(), general),
						Element.ALIGN_JUSTIFIED, Rectangle.BOTTOM)));
					continue;
				} else if (i == 28) { // Не позднее
					paragraph.add(new Chunk(vi.getPlannedDate(), value));
					paragraph.setAlignment(Element.ALIGN_LEFT);
					doc.add(paragraph);
					doc.add(new Paragraph(" ", blank));
					++i;
					continue;
				} else if (i == 30) { // Дата выдачи
//					doc.add(createTable(createCell(new Phrase(template[i] + vi.getFinishDate(), value),
					doc.add(createTable(createCell(new Phrase("       ", value),
						Element.ALIGN_CENTER, Rectangle.BOTTOM)));
					++i;
					doc.add(new Paragraph(" ", blank));
					continue;
				} else if (i == 32) { // регистратор
					doc.add(createTable(createCell(new Phrase(template[i] + vi.getRegistrator() + template[i += 2], general),
						Element.ALIGN_CENTER, Rectangle.BOTTOM)));
					continue;
				} else if (i == 36) {
					doc.add(new Paragraph(" ", blank));
					doc.add(createTable(new PdfPCell[]{createCell(new Phrase(template[i], general), Element.ALIGN_LEFT, Rectangle.BOTTOM),
						createCell(new Phrase(template[++i], general), Element.ALIGN_RIGHT, Rectangle.BOTTOM)}));
					paragraph = new Paragraph(template[++i], general); // конечный документ // 38
					paragraph.setAlignment(Element.ALIGN_CENTER);
					doc.add(paragraph);
					doc.add(new Paragraph(" ", blank));
					doc.add(createTable(createCell(new Phrase(template[++i]), Element.ALIGN_CENTER, Rectangle.BOTTOM))); // 39
					paragraph = new Paragraph(template[++i], general); // 40
					paragraph.setAlignment(Element.ALIGN_CENTER);
					doc.add(paragraph);
					doc.add(new Paragraph(" ", blank));
					paragraph = new Paragraph(template[++i], general); // 41
					paragraph.setAlignment(Element.ALIGN_LEFT);
					doc.add(paragraph);
					paragraph = new Paragraph(template[++i], general); // 42
					paragraph.setAlignment(Element.ALIGN_CENTER);
					doc.add(paragraph);
					paragraph = new Paragraph(template[++i], general); // 43
					paragraph.setAlignment(Element.ALIGN_RIGHT);
					doc.add(paragraph);
					continue;
				}
				paragraph.setAlignment(align);
				doc.add(paragraph);
			}
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(Vypiska.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	/**
	 * Создает ячейку
	 *
	 * @param phrase содержимое ячейки
	 * @param align горизонтальное выравнивание
	 * @param border отображение границы
	 * @return ячейка
	 */
	private PdfPCell createCell(Phrase phrase, int align, int border) {
		PdfPCell cell = new PdfPCell(phrase);
		cell.setPaddingBottom(10);
		cell.setHorizontalAlignment(align);
		cell.setBorder(border);
		return cell;
	}

	/**
	 * Создает таблицу с одной ячейкой
	 *
	 * @param cell ячейка
	 * @return таблица
	 */
	private PdfPTable createTable(PdfPCell cell) {
		PdfPTable table = new PdfPTable(1);
		table.setWidthPercentage(100);
		table.addCell(cell);
		return table;
	}

	/**
	 * Создает таблицу с несколькими ячейками
	 *
	 * @param cells массив ячеек
	 * @return таблица
	 */
	private PdfPTable createTable(PdfPCell[] cells) {
		PdfPTable table = new PdfPTable(cells.length);
		table.setWidthPercentage(100);
		for (PdfPCell cell : cells) {
			table.addCell(cell);
		}
		return table;
	}
	private VypiskaInfo getData(Long prefix, Integer sufix, Long litera) {
		List<VypiskaInfo> results = em.createQuery("SELECT NEW ru.insoft.archive.qq.report.VypiskaInfo("
			+ "q.regDate, q.orgName, q.lName, q.fName, q.mName, q.adres, q.phone, q.content, q.planDate, "
			+ "u.displayedName) from Question q JOIN q.registratorValue u WHERE "
			+ "q.prefix = :prefix and q.sufix = :sufix and q.litera = :litera")
			.setParameter("prefix", prefix).setParameter("sufix", sufix).setParameter("litera", litera)
			.getResultList();
		if (results.isEmpty()) {
			return new VypiskaInfo();
		} else {
			return results.get(0);
		}
	}
	private static final String[] template = new String[]{
		"Справочно-информационный центр федеральных государственных архивов", // 0
		"        ", // 1
		"Адрес: г. Москва, ул. Профсоюзная, д. 82.  Телефон для справок: 8 (495) 334-82-42", // 2
		"Факс Центра: 8 (495) 334-84-76", // 3
		"Часы приёма заявителей:", // 4
		"Пон. – чт: с 10.00 до 17.00 часов; пятн.: с 10.00 до 16.00 часов; обед: с 12.30 до 13.15 часов.", // 5
		"Почтовый адрес Центра:", // 6
		"ул. Профсоюзная, д. 82, Москва, 117393 (для Справочно-информационного Центра)", // 7
		"Электронная почта: sic_faa@mail.rgantd.ru", // 8
		"        ", // 9
		"Выписка из Электронного журнала регистрации и контроля", // 10
		"за обращениями заявителей", // 11
		"        ", // 12
		"Регистрационный номер: ", // 13
		"1234134/2014", // 14
		"Дата регистрации: ", // 15
		"25.03.2014  8:54:50", // 16
		"Заявитель:", // 17
		"Баринова Луиза Владимировна", // 18
		"Адрес, контактные телефоны, адреса эл. почты:", // 19
		"410069, г. Саратов, ул. Черниговская, д.241, тел.937-2258186", // 20
		"Наименование запрашиваемого документа/кол-во экземпляров:    ", // 21
		"Архивная справка                                        Экз: 1", // 22
		"Перечень представленных заявителем документов:", // 23
		"Паспорт", // 24
		"Копия трудовой книжки", // 25
		"Содержание запроса:", // 26
		"Просьба подтвердить трудовой стаж- ПМК-2 треста «Союзспецгазремстрой» ГГК «Газпром», 23.09.1991 – 18.06.1996 гг.", // 27
		"  Ваш документ будет исполнен не позднее:    ", // 28
		"22.04.2014", // 29
		"Дата выдачи:    ", // 30
		"23.04.2014", // 31
		"Сотрудник, принявший документы:    ", // 32
		"Кудашова Т.А.", // 33
		"        ______________(подпись)", // 34
		"Подпись заявителя, подтверждающего сдачу представленных документов в СИЦ", // 35
		"Дата", // 36
		"____________________          ", // 37
		"Должность, фамилия, инициалы сотрудника, выдавшего конечный документ:", // 38
		"_______________________________________________________________________________", // 39
		"Подпись заявителя, подтверждающего получение конечного документа", // 40
		"__________________________________________________     ________________(подпись)", // 41
		"Расшифровка подписи (ФИО)                                                      ", // 42
		"Дата  ____________________" // 43
	};

}
