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
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.itextpdf.text.pdf.draw.VerticalPositionMark;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.qualifier.TimesNewRoman;
import ru.insoft.archive.qq.qualifier.TimesNewRomanBold;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class StatReport3 {

	@Inject
	@TimesNewRoman
	private BaseFont bf;

	@Inject
	@TimesNewRomanBold
	private BaseFont bfb;

	@Inject
	SimpleDateFormat sdf;

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private static Font general;
	private static Font generalBold;
	private static Long sicId;
	private static Map<Long, String> archives;

	private static String[] tableHeaders = new String[]{
		"№ п/п", "Дата регистрации", "Литера", "Номер запроса",
		"ФИО / Организация заявителя"};

	private static int[] cellWidths = new int[] {1, 2, 2, 3, 9};

	@PostConstruct
	private void init() {
		if (general == null) {
			general = new Font(bf, 12);
		}
		if (generalBold == null) {
			generalBold = new Font(bfb, 12);
		}
		if (sicId == null) {
			List<Long> ids = em.createQuery("SELECT d.id from DescriptorValue d "
					+ "WHERE d.code = 'Q_VALUE_MEMBER_SIC'").getResultList();
			if (!ids.isEmpty()) {
				sicId = ids.get(0);
			}
		}
		if (archives == null) {
			archives = new HashMap<>();
		}
	}

	/**
	 * Возвращает pdf файл в поток ответа сервера. Pdf файл содержит информацию
	 * о поступивших запросах с литерой СИЦ за определенный интервал времени.
	 *
	 * @param startDate начальная дата регистрации запросов
	 * @param endDate конечная дата регистрации запросов
	 * @param archiveId идентификатор архива
	 * @param out выходной поток
	 */
	public void getDocument(Date startDate, Date endDate, Long archiveId,
			OutputStream out) {
		try {

			float offset = Utilities.millimetersToPoints(10);

			Document doc = new Document();
			doc.setMargins(offset, offset, offset, offset);
			PdfWriter.getInstance(doc, out);

			doc.open();
			doc.addAuthor("INSOFT");
			doc.addCreator("INSOFT");
			doc.addTitle("Реестр поступивших запросов");

			Paragraph p = new Paragraph("РЕЕСТР ПОСТУПИВШИХ ЗАПРОСОВ", generalBold);
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(4);
			doc.add(p);

			p = new Paragraph("за период с ", general);
			p.add(new Chunk(sdf.format(startDate), general));
			p.add(new Chunk(" по ", general));
			p.add(new Chunk(sdf.format(endDate), general));
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(4);
			doc.add(p);

			p = new Paragraph("Архив: ", general);
			p.add(new Chunk(getArchiveName(archiveId), general));
			p.setAlignment(Element.ALIGN_CENTER);
			p.setSpacingAfter(12);
			doc.add(p);

			PdfPTable table = new PdfPTable(5);
			table.setWidthPercentage(100);
			table.setWidths(cellWidths);

			for (String header : tableHeaders) {
				table.addCell(createCell(header));
			}

			List<Result> results = getData(startDate, endDate, archiveId);
			int max = results.size();

			for (int i = 0; i < max; ++i) {
				Result res = results.get(i);
				table.addCell(createCell(String.valueOf(i + 1)));
				table.addCell(createCell(sdf.format(res.regDate)));
				table.addCell(createCell("СИЦ"));
				table.addCell(createCell(res.number));
				table.addCell(createCell(res.fioOrgName));
			}

//			table.setHorizontalAlignment(PdfPTable.ALIGN_CENTER);
			table.setSpacingAfter(20);
			doc.add(table);

			p = new Paragraph("Руководитель СИЦ ФГА", general);

			p.add(new Chunk(new VerticalPositionMark(), 240, false));
			p.add(new Chunk("__________________________________", general));
			p.add(new Chunk(" С.А. Лашкевич", general));
			doc.add(p);

			Chunk ck = new Chunk("(подпись)", general);
			ck.setTextRise(6);
			p = new Paragraph(ck);
			p.setIndentationLeft(340);
			doc.add(p);

			doc.close();
		} catch (DocumentException ex) {
			Logger.getLogger(StatReport3.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	/**
	 * Создает ячейку таблицы
	 * @param content содержимое для ячейки
	 * @return ячейку
	 */
	private PdfPCell createCell(String content) {
		PdfPCell cell = new PdfPCell(new Phrase(content, general));
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		cell.setPadding(3);
		return cell;
	}
	/**
	 * Получает полное наименование архива
	 *
	 * @param archiveId идентификатор архива
	 * @return наименование архива либо пустая строка
	 */
	private String getArchiveName(Long archiveId) {
		if (archives.containsKey(archiveId)) {
			return archives.get(archiveId);
		}

		List<String> res = em.createQuery("SELECT d.value from DescriptorValue d WHERE d.id = :id")
				.setParameter("id", archiveId)
				.getResultList();
		if (res.isEmpty()) {
			return "";
		}
		String value = res.get(0);
		archives.put(archiveId, value);
		return value;
	}

	/**
	 * Получает данные из базы
	 *
	 * @param start начальная дата периода
	 * @param end конечная дата периода
	 * @param archiveId идентификатор архива
	 * @return список данных для заполнения таблицы
	 */
	private List<Result> getData(Date start, Date end, Long archiveId) {
		// TODO разобраться почему не находятся данные для верхней границы, приходится искуственно 
		// увеличивать диапазон на 1 день
		Calendar cal = new GregorianCalendar();
		cal.setTime(end);
		cal.add(Calendar.DAY_OF_YEAR, 1);
		end = cal.getTime();

		List<Object[]> objects = em.createQuery("SELECT q.regDate, "
				+ "q.prefixNum, q.sufixNum, q.applicant.organization, q.applicant.lastName, "
				+ "q.applicant.firstName, q.applicant.middleName FROM Question q WHERE "
				+ "q.regDate BETWEEN :start AND :end AND q.execOrg = :archive AND q.litera = :litera"
				+ " ORDER BY q.regDate, q.prefixNum")
				.setParameter("start", start)
				.setParameter("end", end)
				.setParameter("archive", archiveId)
				.setParameter("litera", sicId)
				.getResultList();

		List<Result> results = new ArrayList<>();
		for (Object[] obj : objects) {
			results.add(new Result(obj));
		}
		return results;
	}

	private class Result {

		public final Date regDate;
		public final String number;
		public final String fioOrgName;

		public Result(Object[] data) {
			regDate = (Date) data[0];
			number = (Long) data[1] + "/" + (Long) data[2];
			if (data[3] != null) {
				fioOrgName = (String) data[3];
			} else {
				String tmp = (String) data[4] + " " + (String) data[5];
				if (data[6] != null) {
					tmp += " " + data[6];
				}
				fioOrgName = tmp;
			}
		}

	}
}
