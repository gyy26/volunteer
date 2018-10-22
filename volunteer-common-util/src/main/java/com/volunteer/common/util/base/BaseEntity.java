/**
 *
 */
package com.volunteer.common.util.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.io.Serializable;
import java.util.*;

/**
 * @项目：phshopping-common-core
 * @描述：实体base类
 * @作者： Mr.chang
 * @创建时间：2017年3月8日
 * @Copyright @2017 by Mr.chang
 * @author Mr.Chang
 */
@Data
public class BaseEntity implements Serializable {

    public final static String[] BASE_FIELD_STRINGS = new String[]{"id", "createrId", "createTime", "updaterId", "updateTime"};
    /**
     *
     */
    private static final long serialVersionUID = -5300113985007593228L;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name = "createTime")
    private Date createTime;

    @Id
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name = "updateTime")
    private Date updateTime;

    @Column(name = "createrId")
    private Long createrId;

    @Column(name = "updaterId")
    private Long updaterId;

    /**
     * 实体验证
     * @return
     * @author Mr.Chang
     */
    public List<String> validateForm() {
        List<String> errorList = new ArrayList<>(0);
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<BaseEntity>> constraintViolation = validator.validate(this);
        if (constraintViolation.size() > 0){
            errorList = new ArrayList<String>(constraintViolation.size());
        }
        for (ConstraintViolation<BaseEntity> violation : constraintViolation) {
            errorList.add(violation.getMessage());
        }
        return errorList;
    }

    public void basic(Long userId) {
        if (Objects.nonNull(userId)) {
            Date date = new Date();
            if (Objects.isNull(this.getCreaterId())) {
                this.setCreaterId(userId);
            }
            if (Objects.isNull(this.getCreateTime())) {
                this.setCreateTime(date);
            }
            this.setUpdaterId(userId);
            this.setUpdateTime(date);
        }
    }
}