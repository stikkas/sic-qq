package ru.insoft.archive.qq.producer;

import java.net.URL;
import javax.enterprise.inject.Produces;
import ru.insoft.archive.qq.qualifier.RGANTDIcon;

/**
 *
 * @author Благодатских С.
 */
public class Images {
	@Produces
	@RGANTDIcon
	public URL getRgantdIcon() {
		return getClass().getClassLoader().getResource("images/rgantd.png");
	}
}
