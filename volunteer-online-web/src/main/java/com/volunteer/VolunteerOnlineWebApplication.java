package com.volunteer;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.volunteer.mapper")
public class VolunteerOnlineWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerOnlineWebApplication.class, args);
	}
}
