package ru.insoft.archive.qq.service;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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

	@POST
	@Path("{id}")
	@Consumes({"application/json"})
	public void create(@PathParam("id") Long id, AttachedFile entity) {
		super.create(entity);
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, AttachedFile entity) {
		super.edit(entity);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		super.remove(super.find(id));
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
	public List<AttachedFile> filesForExecution(@QueryParam("id") QuestionFilter filter) {
		return super.findByQuestionWhereAnd(filter.getId(),
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
		return super.findByQuestionWhereAnd(filter.getId(),
			new Clause[]{new Clause("type", "Q_VALUE_FILE_TYPE_APP_DOCS")});
	}

}
