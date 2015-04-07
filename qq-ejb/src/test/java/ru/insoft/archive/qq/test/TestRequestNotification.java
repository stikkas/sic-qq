package ru.insoft.archive.qq.test;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.producer.Fonts;
import ru.insoft.archive.qq.qualifier.TimesNewRoman;
import ru.insoft.archive.qq.report.RequestNotification;

/**
 *
 * @author Благодатских С.
 */
@RunWith(Arquillian.class)
public class TestRequestNotification {

	@Deployment
	public static Archive createEjb() {
		Archive archive = ShrinkWrap.create(WebArchive.class, "stat-requestnotification-test.war")
				.addClass(RequestNotification.class)
				.addPackages(true, 
						TimesNewRoman.class.getPackage(),
						Fonts.class.getPackage())
				.addAsResource("persistence.xml", "META-INF/persistence.xml")
				.addAsResource("fonts")
				.addAsResource("images")
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
				.addAsLibraries(Maven.resolver().resolve("com.itextpdf:itext-pdfa:5.5.3")
						.withTransitivity().asFile());
		return archive;
	}

	@Inject
	RequestNotification report;

	@PersistenceContext
	EntityManager em;

	private List<BigDecimal> ids;

	@Before 
	public void setQuestion() {
		ids = em.createNativeQuery("select id from sic_question where noti_komu is not null and rownum < 2")
				.getResultList();
	}

	@Test
	public void reportTest() {
		Assert.assertNotNull("RequestNotification is null", report);
		if (ids.isEmpty()) {
			System.out.println("Not found acceptable questions");
			return;
		}

		Path p = Paths.get(System.getProperty("jboss.server.temp.dir"), "output_1.pdf");
		try (OutputStream out = Files.newOutputStream(p)) {
			report.getDocument(ids.get(0).longValue(), out);
			Runtime.getRuntime().exec("/usr/bin/evince " + p.toString());
		} catch (IOException ex) {
			Logger.getLogger(TestStatReport3.class.getName()).log(Level.SEVERE, null, ex);
		}

	}
}
