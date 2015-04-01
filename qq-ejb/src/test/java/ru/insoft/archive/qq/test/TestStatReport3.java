package ru.insoft.archive.qq.test;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import ru.insoft.archive.qq.dto.JvkDto;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.ejb.Store;
import ru.insoft.archive.qq.entity.AdmUser;
import ru.insoft.archive.qq.producer.Fonts;
import ru.insoft.archive.qq.qualifier.TimesNewRoman;
import ru.insoft.archive.qq.report.StatReport3;

/**
 *
 * @author Благодатских С.
 */
@RunWith(Arquillian.class)
public class TestStatReport3 {

	@Deployment
	public static Archive createEjb() {
		Archive archive = ShrinkWrap.create(WebArchive.class, "stat-report3-test.war")
				.addClass(StatReport3.class)
				.addPackages(true, Store.class.getPackage(),
						TimesNewRoman.class.getPackage(),
						AdmUser.class.getPackage(),
						JvkDto.class.getPackage(),
						Fonts.class.getPackage())
				.addAsResource("persistence.xml", "META-INF/persistence.xml")
				.addAsResource("fonts")
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
				.addAsLibraries(Maven.resolver().resolve("com.itextpdf:itext-pdfa:5.5.3")
						.withTransitivity().asFile());
		return archive;
	}

	@Inject
	StatReport3 report;

	@Inject
	Store store;

	@Test
	public void reportTest() {
		Assert.assertNotNull("StatReport3 is null", report);
		Assert.assertNotNull("Store is null", store);

		Calendar start = new GregorianCalendar(2015, 1, 20);
		Calendar end = new GregorianCalendar(2015, 1, 28);
		Path p = Paths.get(System.getProperty("jboss.server.temp.dir"), "output.pdf");
		try (OutputStream out = Files.newOutputStream(p)) {
			report.getDocument(start.getTime(), end.getTime(),
					store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC), out);

			Runtime.getRuntime().exec("/usr/bin/evince " + p.toString());

		} catch (IOException ex) {
			Logger.getLogger(TestStatReport3.class.getName()).log(Level.SEVERE, null, ex);
		}

	}
}
