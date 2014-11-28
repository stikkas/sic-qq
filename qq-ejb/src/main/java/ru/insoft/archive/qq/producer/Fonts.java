package ru.insoft.archive.qq.producer;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.BaseFont;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.inject.Produces;
import ru.insoft.archive.qq.qualifier.Arial;
import ru.insoft.archive.qq.report.Vypiska;

/**
 * Предоставляет базовые шрифты для pdf документов.
 *
 * @author С. Благодатских
 */
public class Fonts {

	@Produces
	@Arial
	public BaseFont getFont() { // Вызывается только первый раз, потом существует до закрытия всего приложение (jboss stop)
		BaseFont bf = null;
		try {
			bf = BaseFont.createFont(getFontFileName(),
				BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		} catch (DocumentException | IOException ex) {
			Logger.getLogger(Vypiska.class.getName()).log(Level.SEVERE, null, ex);
		}
		return bf;
	}

	private String getFontFileName() {
		String fileName = "fonts/arial.ttf";
//		if (!new File(fileName).exists()) {
		try (InputStream is = getClass().getClassLoader().getResourceAsStream(fileName)) {
//				OutputStream out = new FileOutputStream(fileName)) {
//				byte[] bts = new byte[4096];
//				int readed;
//				while ((readed = is.read(bts, 0, bts.length)) != -1) {
//					out.write(bts, 0, readed);
//				}
		} catch (IOException ex) {
			Logger.getLogger(Vypiska.class.getName()).log(Level.SEVERE, ex.getMessage());
		}
//		}
		return fileName;
	}
}
