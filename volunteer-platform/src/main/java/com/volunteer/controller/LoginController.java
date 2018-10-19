package com.volunteer.controller;

import com.volunteer.common.util.date.DateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by gyy_2 on 2018/10/19.
 * 登录Controller
 */
@Controller
public class LoginController {

    /**
     * 访问就去登录界面
     * @return
     */
    @RequestMapping("/")
    public String toLogin(){
        return "login";
    }
}
