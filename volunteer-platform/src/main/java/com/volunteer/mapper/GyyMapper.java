package com.volunteer.mapper;

import com.volunteer.common.util.base.BaseMapper;
import com.volunteer.entity.Gyy;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by gyy_2 on 2018/10/18.
 */
@Repository
public interface GyyMapper extends BaseMapper<Gyy>{
    List<Gyy> getName();
}
