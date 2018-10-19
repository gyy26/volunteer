package com.volunteer.entity;
import com.alibaba.druid.support.monitor.annotation.MTable;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by gyy_2 on 2018/10/18.
 * 数据表
 */
@Table(name="gyy")
public class Gyy
{
    @Column
    private String name;

}
