package ru.insoft.archive.qqlogin;

import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.servlet.Auth;

/**
 * Обрабатывает запросы c параметром 'action' равным 'logout'
 *
 * @author С. Благодатских
 */
@WebServlet(name = "qqauth", urlPatterns = "/Auth")
public class AuthServlet extends Auth {

}
