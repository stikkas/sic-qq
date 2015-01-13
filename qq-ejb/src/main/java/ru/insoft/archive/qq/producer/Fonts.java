package ru.insoft.archive.qq.producer;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.BaseFont;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.enterprise.inject.Produces;
import ru.insoft.archive.qq.qualifier.Arial;
import ru.insoft.archive.qq.qualifier.ArialBold;
import ru.insoft.archive.qq.qualifier.ArialBoldItalic;
import ru.insoft.archive.qq.qualifier.ArialItalic;

/**
 * Предоставляет базовые шрифты для pdf документов.
 *
 * @author С. Благодатских
 */
public class Fonts {

	@Produces
	@Arial
	public BaseFont getArial() {
		return getFont("fonts/Arial.ttf");
	}

	@Produces
	@ArialBold
	public BaseFont getArialBold() {
		return getFont("fonts/Arial_Bold.ttf");
	}

	@Produces
	@ArialBoldItalic
	public BaseFont getArialBoldItalic() {
		return getFont("fonts/Arial_Bold_Italic.ttf");
	}

	@Produces
	@ArialItalic
	public BaseFont getArialItalic() {
		return getFont("fonts/Arial_Italic.ttf");
	}

	private BaseFont getFont(String resourceFileName) {
		BaseFont font = null;
		try {
			getClass().getClassLoader().getResourceAsStream(resourceFileName);
			font = BaseFont.createFont(resourceFileName,
					BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		} catch (DocumentException | IOException ex) {
			Logger.getLogger(Fonts.class.getName()).log(Level.SEVERE, null, ex);
		}
		return font;
	}

}
