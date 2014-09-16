package org.netbeans.rest.application.config;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author С. Благодатских
 */
@javax.ws.rs.ApplicationPath("rest")
public class ApplicationConfig extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new java.util.HashSet<>();
		addRestResourceClasses(resources);
		return resources;
	}

	/**
	 * Do not modify addRestResourceClasses() method. It is automatically
	 * populated with all resources defined in the project. If required, comment
	 * out calling this method in getClasses().
	 */
	private void addRestResourceClasses(Set<Class<?>> resources) {
		resources.add(ru.insoft.archive.qq.service.ApplicantFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.AttachedFileFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.CoordintationFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.DeliveryActionFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.DescriptorGroupFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.DescriptorValueFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.ExecutionFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.NotificationFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.QuestionFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.SendActionFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.TransmissionFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.UsedMaterialFacadeREST.class);
		resources.add(ru.insoft.archive.qq.service.WayToSendFacadeREST.class);
		resources.add(ru.insoft.archive.qq.servlet.QuestionREST.class);
	}

}
