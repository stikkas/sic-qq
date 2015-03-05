package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Отдает пользователю его профиль
 * @author Благодатских С.
 */
@Produces(MediaType.APPLICATION_JSON)
@Path("userinfo")
public class UserService {

	@Inject
	UserProfile profile;

	@GET
	public UserData getInfo() {
		return profile.getData();
	}
}
