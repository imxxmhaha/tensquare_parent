package com.tensquare.recruit;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.tensquare.recruit.dao")
public class RecruitApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(RecruitApplication.class, args);
	}
	
	
	
}