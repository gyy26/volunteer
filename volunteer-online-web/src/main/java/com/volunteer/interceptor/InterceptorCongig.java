package com.volunteer.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by gyy_2 on 2018/10/22.
 */
@SpringBootConfiguration
@Component
public class InterceptorCongig extends WebMvcConfigurerAdapter {

    @Autowired
    private UserInterceptor  userInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor).addPathPatterns("/**").excludePathPatterns("");
    }
}
