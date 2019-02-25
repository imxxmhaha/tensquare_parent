package com.tensquare.user.spring.config;

import com.tensquare.utils.IdWorker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 将IdWorker  交给Spring管理
 */

@Configuration
public class IdWorkerConfig {


    @Bean
    public IdWorker idWorker() {
        IdWorker idWorker = new IdWorker();
        return idWorker;
    }

}