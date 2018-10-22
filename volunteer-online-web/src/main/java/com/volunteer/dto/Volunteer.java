package com.volunteer.dto;

import lombok.Data;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;

/**
 * Created by gyy_2 on 2018/10/19.
 * 传递参数
 */
@Data
public class Volunteer {
    private Long id;

    private String name;
}
