package ru.insoft.archive.qq.report;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Utilities;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.OutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.Arial;

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
	private BaseFont bf;

	public void getDocument(Long prefix, Long sufix, Long litera,
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

			Font title = new Font(bf, 14);
			Font title_bold = new Font(bf, 14, Font.BOLD);
			Font value = new Font(bf, 13, Font.BOLD);
			Font general = new Font(bf, 12);
			Font font;
			int align;
			Paragraph paragraph;
			for (int i = 0; i < template.length; ++i) {
				align = Paragraph.ALIGN_CENTER;
				if (i == 0) {
					font = title;
				} else if (i == 10 || i == 11) {
					font = title_bold;
				} else if (i == 18) { // Заявитель
					template[i] = vi.getApplicant();
					font = value;
					align = Paragraph.ALIGN_LEFT;
				} else if (i == 20) { // Адрес
					template[i] = vi.getAddress();
					align = Paragraph.ALIGN_LEFT;
					font = general;
				} else if (i == 22 || i == 24 || i == 25 || i == 36) {
					align = Paragraph.ALIGN_LEFT;
					font = general;
				} else if (i == 27) { // Содержание запроса
					template[i] = vi.getContent();
					align = Paragraph.ALIGN_JUSTIFIED;
					font = general;
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
					paragraph.add(new Chunk(prefix + "/" + sufix, value));
					i += 2;
					paragraph.add(new Chunk(template[i], font));
					paragraph.add(new Chunk(vi.getRegDate(), value));
					++i;
				} else if (i == 28) { // Не позднее
					align = Paragraph.ALIGN_LEFT;
					paragraph.add(new Chunk(vi.getPlannedDate(), value));
					++i;
				} else if (i == 30) { // Дата выдачи
					align = Paragraph.ALIGN_LEFT;
					paragraph.add(new Chunk(vi.getFinishDate(), value));
					++i;
				} else if (i == 32) { // регистратор
					align = Paragraph.ALIGN_LEFT;
					paragraph.add(new Chunk(vi.getRegistrator(), value));
					i += 2;
					paragraph.add(new Chunk(template[i], font));
				}
				/*
				 if (i > 11) {
				 paragraph.setSpacingAfter(6);
				 }
				 */
				paragraph.setAlignment(align);
				doc.add(paragraph);
			}
			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(Vypiska.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	private VypiskaInfo getData(Long prefix, Long sufix, Long litera) {
		List<VypiskaInfo> results = em.createQuery("SELECT NEW ru.insoft.archive.qq.report.VypiskaInfo("
			+ "q.regDate, q.applicant.organization, q.applicant.lastName, "
			+ "q.applicant.firstName, q.applicant.middleName, q.applicant.address, "
			+ "q.applicant.phone, q.content, q.plannedFinishDate, "
			+ "q.registratorId.name) from Question q WHERE "
			+ "q.prefixNum = :prefix and q.sufixNum = :sufix and q.litera = :litera")
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
		"Регистрационный номер:  ", // 13
		"1234134/2014", // 14
		"				                        								Дата регистрации:  ", // 15
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
		"Ваш документ будет исполнен не позднее:    ", // 28
		"22.04.2014", // 29
		"Дата выдачи:    ", // 30
		"23.04.2014", // 31
		"Сотрудник, принявший документы:    ", // 32
		"Кудашова Т.А.", // 33
		"                           (подпись)", // 34
		"Подпись заявителя, подтверждающего сдачу представленных документов в СИЦ", // 35
		"Дата													", // 36
		"Должность, фамилия, инициалы сотрудника, выдавшего конечный документ:", // 37
		"                    ", // 38
		"Подпись заявителя, подтверждающего получение конечного документа в СИЦ", // 39
		"(подпись)", // 40
		"Расшифровка подписи (ФИО)                                                      ", // 41
		"Дата                                              " // 42
	};

}
