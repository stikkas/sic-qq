package ru.insoft.archive.qq.report;

/**
 * контейнер для сбора информации
 *
 * @author Благодатских С.
 */
public class Stat {

	/**
	 * Получено
	 */
	public long recived;
	/**
	 * Исполнено всего
	 */
	public long executed;
	/**
	 * Исполнено выдано положительных ответов
	 */
	public long execPlus;
	/**
	 * Исполнено выдано отрицательных ответов
	 */
	public long execMinus;
	/**
	 * Исполнено выдано рекомендаций
	 */
	public long execRecomend;
	/**
	 * Мотивированный отказ
	 */
	public long refused;
	/**
	 * Снято с исполнения
	 */
	public long reseted;

	/**
	 * Увеличивает значения полей на величину полей заданного объекта
	 *
	 * @param other объект, величины полей которого, будут приплюсованы к
	 * величинам полей
	 */
	public void increase(final Stat other) {
		recived += other.recived;
		executed += other.executed;
		execPlus += other.execPlus;
		execMinus += other.execMinus;
		execRecomend += other.execRecomend;
		refused += other.refused;
		reseted += other.reseted;
	}

	public String getRecived() {
		return getValue(recived);
	}

	public String getExecuted() {
		return getValue(executed);
	}

	public String getExecPlus() {
		return getValue(execPlus);
	}

	public String getExecMinus() {
		return getValue(execMinus);
	}

	public String getExecRecomend() {
		return getValue(execRecomend);
	}

	public String getRefused() {
		return getValue(refused);
	}

	public String getReseted() {
		return getValue(reseted);
	}

	private String getValue(long value) {
		if (value == 0) {
			return "";
		}
		return String.valueOf(value);
	}

	@Override
	public String toString() {
		return "Получено: " + recived + ", Исполнено( всего: "
				+ executed + ", полож: " + execPlus + ", отриц: " + execMinus
				+ ", реком: " + execRecomend + " ), мот. отказ: " + refused
				+ ", снято: " + reseted;
	}
}
