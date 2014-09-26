package ru.insoft.archive.qq.servlet;

import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.servlet.CoreParamsProvider;

/**
 * Интерфейс для получения настроек системы
 *
 * @author С. Благодатских
 */
@WebServlet(urlPatterns = "/api/CoreParameter")
public class CoreParameter extends CoreParamsProvider {

}
