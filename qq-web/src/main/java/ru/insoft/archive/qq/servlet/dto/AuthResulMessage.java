package ru.insoft.archive.qq.servlet.dto;

/**
 * Класс для передачи сообщения о результате авторизации.
 *
 * @author Благодатских С.
 */
public class AuthResulMessage {

	private boolean result;
	private String msg;

	public AuthResulMessage() {
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
