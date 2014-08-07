package ru.insoft.archive.qq.servlet;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ru.insoft.archive.extcommons.servlet.AbstractServlet;

/**
 * Абстрактный класс для обработки операций CRUD для конкретного объекта.
 * 
 * @author sorokin
 * 
 */
public abstract class CRUDServlet extends AbstractServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1204272940137400579L;

	@Override
	protected void handleRequest(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		String rawData = readRequestData(req);
		JsonObjectBuilder obdr = Json.createObjectBuilder();
		try {
			if (jsonTools.isJsonArray(rawData)) {
				JsonArray arr = jsonTools.getJsonArray(rawData);
				JsonArray r = handleArray(arr);
				obdr.add("success", true);
				obdr.add("msg", "Операция выполнена успешно");
				obdr.add("data", r);
			} else {
				JsonObject obj = jsonTools.getJsonObject(rawData);
				JsonObject r = handleObject(obj);
				obdr.add("success", true);
				obdr.add("msg", "Операция выполнена успешно");
				obdr.add("data", r);
			}
		} catch (Exception e) {
			obdr.add("success", false);
			if (e.getMessage()!=null){
				obdr.add("msg", e.getMessage());
			}
			e.printStackTrace();
		}
		resp.getWriter().write(obdr.build().toString());
	}

	protected abstract JsonArray handleArray(JsonArray arr) throws Exception;

	protected abstract JsonObject handleObject(JsonObject obj) throws Exception;

}
