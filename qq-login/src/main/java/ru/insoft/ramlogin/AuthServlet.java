
package ru.insoft.ramlogin;

import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.servlet.Auth;
/**
 *
 * @author sorokin
 */
@WebServlet(urlPatterns = "/Auth",name = "ramauth")
public class AuthServlet extends Auth{
    
}
