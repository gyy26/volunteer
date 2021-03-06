package com.volunteer;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan()
public class VolunteerPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerPlatformApplication.class, args);
	}
}
