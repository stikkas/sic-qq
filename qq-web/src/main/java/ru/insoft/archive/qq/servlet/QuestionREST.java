package ru.insoft.archive.qq.servlet;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

/**
 *
 * @author С. Благодатских
 */
@Path("/questionmodel")
public class QuestionREST {

	@GET
	@Path("/{param}")
	public Response printMessage(@PathParam("param") String msg) {

		String result = "Restful example : " + msg;

		return Response.status(200).entity(result).build();

	}

	@POST
	public Response createMessage(String msg) {

		String result = "Restful example : " + msg;

		return Response.status(200).entity(result).build();

	}

}
