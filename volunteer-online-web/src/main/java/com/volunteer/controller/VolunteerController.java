package com.volunteer.controller;

import com.volunteer.entity.Gyy;
import com.volunteer.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by gyy_2 on 2018/10/18.
 */
@Controller
@RequestMapping("/gyy")
public class VolunteerController {
    @Autowired
    private TestService testService;
    @RequestMapping(value = "qu",method = RequestMethod.GET)
    @ResponseBody
    public List<Gyy> hello(){
        //aaa
        List<Gyy> list=this.testService.getName();
        return list;
    }

    @RequestMapping("toHtml")
    public String toHtml(){
        return "product/list";
    }

}
