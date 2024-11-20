package SW.EduHub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = {"SW.EduHub", "controller", "service"})
public class EduHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduHubApplication.class, args);
	}

}
