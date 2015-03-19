package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import ru.insoft.archive.qq.dao.JvkDao;
import ru.insoft.archive.qq.dto.ArchiveJvkDto;
import ru.insoft.archive.qq.dto.Filter;
import ru.insoft.archive.qq.dto.PageDto;
import ru.insoft.archive.qq.dto.SearchDto;
import ru.insoft.archive.qq.dto.SicJvkDto;
import ru.insoft.archive.qq.dto.Sort;

/**
 * Точка доступа для ЖВК.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("jvk")
public class JvkService {

	@Inject
	JvkDao jd;

	@Inject
	UserProfile up;

	/**
	 * Возвращает список запросов для СИЦ
	 *
	 * @param start начальная запись
	 * @param limit максимальное кол-во записей
	 * @param sort параметры сортировки
	 * @param filter ограницение поиска по критериям
	 * @return найденные записи
	 */
	@GET
	@Path("sic")
	public PageDto<SicJvkDto> getSicJvk(@QueryParam("start") int start,
			@QueryParam("limit") int limit, @QueryParam("sort") Sort sort,
			@QueryParam("filter") Filter filter) {
		return jd.getSicJvk(start, limit, sort, filter);
	}

	/**
	 * Возвращает список запросов для архива
	 *
	 * @param start начальная запись
	 * @param limit максимальное кол-во записей
	 * @param sort параметры сортировки
	 * @param filter ограницение поиска по критериям
	 * @return найденные записи
	 */
	@GET
	@Path("archive")
	public PageDto<ArchiveJvkDto> getArchiveJvk(@QueryParam("start") int start,
			@QueryParam("limit") int limit, @QueryParam("sort") Sort sort,
			@QueryParam("filter") Filter filter) {
		return jd.getArchiveJvk(start, limit, sort, up.getOrganization(), filter);
	}

	/**
	 * Возвращает список запросов по критериям поиска.
	 * Это тотже самый жвк только вид сбоку. Так что я решил не заводить для него
	 * отдельный сервис.
	 *
	 * @param start начальная запись
	 * @param limit максимальное кол-во записей
	 * @param sort параметры сортировки
	 * @param filter ограницение поиска по критериям
	 * @return найденные записи
	 */
	@GET
	@Path("search")
	public PageDto<SearchDto> search(@QueryParam("start") int start,
			@QueryParam("limit") int limit, @QueryParam("sort") Sort sort,
			@QueryParam("filter") Filter filter) {
		return jd.search(start, limit, sort, filter, up.getOrganization());
	}

}
