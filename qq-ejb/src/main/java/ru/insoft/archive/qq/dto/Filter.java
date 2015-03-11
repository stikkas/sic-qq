package ru.insoft.archive.qq.dto;

/**
 * Класс для передачи критериев поиска
 *
 * @author Благодатских С.
 */
public class Filter {
	/*
	 [{"property":"litera","value":86},
	{"property":"number","value":"dafd"},
	{"property":"regDate","value":"2015-03-12T00:00:00"},
	{"property":"questionType","value":246},
	{"property":"otKogo","value":"dfasdfa fasdfas"},
	{"property":"status","value":306},
	{"property":"execDate","value":"2015-03-04T00:00:00"},
	{"property":"executor","value":446}]
	 */
	/*
	[{"property":"litera","value":89},
	{"property":"number","value":"dfasdf"},
	{"property":"regDate","value":"2015-03-12T00:00:00"},
	{"property":"planDate","value":"2015-03-04T00:00:00"},
	{"property":"notiStat","value":327},
	{"property":"otKogo","value":"fasdfdf asda"},
	{"property":"status","value":306},
	{"property":"execOrg","value":90},
	{"property":"executor","value":252}]
	*/
	public static Filter fromString (String json) {
		System.out.println("I GET " + json);
		return new Filter();
	}
}
