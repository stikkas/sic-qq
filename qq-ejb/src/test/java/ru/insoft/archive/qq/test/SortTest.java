package ru.insoft.archive.qq.test;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import ru.insoft.archive.qq.dto.Sort;

/**
 *
 * @author Благодатских С.
 */
public class SortTest {

	@Test
	public void testFromStringGood() {
		Sort sort = Sort.fromString("[{\"property\":\"litera\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("litera", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"number\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("number", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"regDate\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("regDate", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"planDate\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("planDate", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"notiStat\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("notiStat", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"otKogo\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("otKogo", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"status\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("status", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"execOrg\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("execOrg", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"execDate\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("execDate", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"executor\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("executor", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"questionType\",\"direction\":\"ASC\"}]");
		Assert.assertEquals(new Sort("questionType", "ASC"), sort);

		sort = Sort.fromString("[{\"property\":\"litera\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("litera", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"number\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("number", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"regDate\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("regDate", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"planDate\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("planDate", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"notiStat\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("notiStat", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"otKogo\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("otKogo", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"status\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("status", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"execOrg\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("execOrg", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"execDate\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("execDate", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"executor\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("executor", "DESC"), sort);

		sort = Sort.fromString("[{\"property\":\"questionType\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort("questionType", "DESC"), sort);

	}

	@Test
	public void testFromStringBad() {
		Sort sort = Sort.fromString("fdaljfoaifjaoefij");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString("[{\"property\":\"question\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString("[{\"propert\":\"execOrg\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString(" [{\"property\":\"planDate\",\"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString("[{\"property\":\"planDate\",\"direction\":\"DES\"}]");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString("[{\"property\":\"planDate\", \"direction\":\"DESC\"}]");
		Assert.assertEquals(new Sort(), sort);

		sort = Sort.fromString("[{\"property\":\"planDate\",\"direction\":\"ASC\"}] ");
		Assert.assertEquals(new Sort(), sort);
	}

	@Test
	public void testToString() {
		Assert.assertEquals("", new Sort().toString());
		Assert.assertEquals("", new Sort("nofield", "ASC").toString());
		Assert.assertEquals(" ORDER BY litera ASC,id ASC", new Sort("litera", "ASC").toString());
		Assert.assertEquals(" ORDER BY j.numSufix ASC,j.numPrefix ASC", new Sort("number", "ASC").toString());
		Assert.assertEquals(" ORDER BY j.regDate ASC", new Sort("regDate", "ASC").toString());
		Assert.assertEquals(" ORDER BY j.planDate ASC", new Sort("planDate", "ASC").toString());
		Assert.assertEquals(" ORDER BY notiStat ASC,id ASC", new Sort("notiStat", "ASC").toString());
		Assert.assertEquals(" ORDER BY otKogo ASC", new Sort("otKogo", "ASC").toString());
		Assert.assertEquals(" ORDER BY status ASC,id ASC", new Sort("status", "ASC").toString());
		Assert.assertEquals(" ORDER BY execOrg ASC,id ASC", new Sort("execOrg", "ASC").toString());
		Assert.assertEquals(" ORDER BY j.execDate ASC", new Sort("execDate", "ASC").toString());
		Assert.assertEquals(" ORDER BY executor ASC,id ASC", new Sort("executor", "ASC").toString());
		Assert.assertEquals(" ORDER BY questionType ASC,id ASC", new Sort("questionType", "ASC").toString());
		Assert.assertEquals(" ORDER BY litera DESC,id DESC", new Sort("litera", "DESC").toString());
		Assert.assertEquals(" ORDER BY j.numSufix DESC,j.numPrefix DESC", new Sort("number", "DESC").toString());
		Assert.assertEquals(" ORDER BY j.regDate DESC", new Sort("regDate", "DESC").toString());
		Assert.assertEquals(" ORDER BY j.planDate DESC", new Sort("planDate", "DESC").toString());
		Assert.assertEquals(" ORDER BY notiStat DESC,id DESC", new Sort("notiStat", "DESC").toString());
		Assert.assertEquals(" ORDER BY otKogo DESC", new Sort("otKogo", "DESC").toString());
		Assert.assertEquals(" ORDER BY status DESC,id DESC", new Sort("status", "DESC").toString());
		Assert.assertEquals(" ORDER BY execOrg DESC,id DESC", new Sort("execOrg", "DESC").toString());
		Assert.assertEquals(" ORDER BY j.execDate DESC", new Sort("execDate", "DESC").toString());
		Assert.assertEquals(" ORDER BY executor DESC,id DESC", new Sort("executor", "DESC").toString());
		Assert.assertEquals(" ORDER BY questionType DESC,id DESC", new Sort("questionType", "DESC").toString());
	}


}
