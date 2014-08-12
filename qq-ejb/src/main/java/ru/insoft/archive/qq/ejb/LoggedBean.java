/**
 *
 */
package ru.insoft.archive.qq.ejb;

import java.util.logging.Logger;

/**
 * @author sorokin
 *
 */
public class LoggedBean {

	protected Logger logger;

	public LoggedBean() {
		this.logger = Logger.getLogger(this.getClass().getName());
	}

}
