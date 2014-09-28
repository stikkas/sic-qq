package ru.insoft.archive.qq.service;

/**
 * Класс для принятия JSON типа {"name": ["name1", "name2"], "dir" : "dir"}.
 * Нужен для удаления файлов из файловой системы.
 *
 * @author basa
 */
public class FilesToDelete {

	private String[] name;
	private String dir;

	public String[] getName() {
		return name;
	}

	public void setName(String[] name) {
		this.name = name;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public FilesToDelete() {
	}
}
