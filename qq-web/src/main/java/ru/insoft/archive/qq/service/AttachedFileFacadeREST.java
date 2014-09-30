package ru.insoft.archive.qq.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.insoft.archive.qq.entity.AttachedFile;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("attachedfile")
public class AttachedFileFacadeREST extends AbstractFacade<AttachedFile> {

	public AttachedFileFacadeREST() {
		super(AttachedFile.class);
	}

	/**
	 * Удаляет файлы из файловой системы. В базе никаких действий не производит.
	 * Должен вызываться только при удалении запроса. После удалении файлов
	 * удаляет директорию запроса.
	 *
	 * @param file данные передаваемые в теле запроса {@link FilesToDelete}
	 */
	@POST
	@Path("delete")
	@Consumes({"application/json"})
	public void deleteFiles(FilesToDelete file) {
		String dir = file.getDir();
		System.out.println("dir = " + dir);
		for (String name : file.getName()) {
			new File(dir + name).delete();
		}
		new File(dir).delete();
	}

	@DELETE
	@Path("{id}")
	@Override
	public void remove(@PathParam("id") Long id) {
		super.remove(id);
	}

	@GET
	@Path("{id}")
	@Produces({"application/json"})
	@Override
	public AttachedFile find(@PathParam("id") Long id) {
		return super.find(id);
	}

	/**
	 * Возвращает файлы принадлежащие секции "Исполнение запроса".
	 *
	 * @param filter параметры запрос, содержащий id {@code Question}
	 * @return список файлов
	 */
	@GET
	@Path("execution")
	@Produces({"application/json"})
	public List<AttachedFile> filesForExecution(@QueryParam("filter") QuestionFilter filter) {
		Long id = filter.getId();
		return id == -1L ? new ArrayList<AttachedFile>() : super.findByQuestionWhereAnd(id,
			new Clause[]{new Clause("type", "Q_VALUE_FILE_TYPE_ANSWER")});
	}

	/**
	 * Возвращает файлы принадлежащие секции "Регистрация запроса".
	 *
	 * @param filter параметр запроса, содержащий id {@code Question}
	 * @return список файлов
	 */
	@GET
	@Path("question")
	@Produces({"application/json"})
	public List<AttachedFile> filesForQuestion(@QueryParam("filter") QuestionFilter filter) {
		Long id = filter.getId();
		return id == -1L ? new ArrayList<AttachedFile>() : super.findByQuestionWhereAnd(id,
			new Clause[]{new Clause("type", "Q_VALUE_FILE_TYPE_APP_DOCS")});
	}

}
