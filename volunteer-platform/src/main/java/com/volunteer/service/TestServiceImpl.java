package com.volunteer.service;

import com.volunteer.entity.Gyy;
import com.volunteer.mapper.GyyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by gyy_2 on 2018/10/18.
 */
@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private GyyMapper gyyMapper;
    public List<Gyy> getName() {
        return this.gyyMapper.getName();
    }
}
