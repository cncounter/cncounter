package com.cncounter.test.commons;

import com.cncounter.cncounter.model.user.User;
import com.cncounter.util.common.CNC;
import org.springframework.beans.BeanUtils;

/**
 * Created by Administrator on 2016/1/5.
 */
public class TestBeanUtils {

    public  static void main(String[] args){
        //
        User user = new User();
        user.setUsername("renfufei");
        user.setPassword("********");
        //
        Object u2 = CNC.cloneObj(user);
        if(u2 instanceof  User){
            User user2 = (User)u2;
            //
            System.out.println("user.equals(u2): " + user.equals(u2));
            System.out.println("user.getUsername(): " + user.getUsername());
            System.out.println("user2.getUsername(): " + user2.getUsername());
            System.out.println("----------------------------------------");
        }

        User user3 = new User();
        CNC.copyFields(user, user3);
        System.out.println("user.equals(user3): " + user.equals(user3));
        System.out.println("user.getPassword(): " + user.getPassword());
        System.out.println("user3.getPassword(): " + user3.getPassword());
        System.out.println("----------------------------------------");

        //
        User user4 = new User();
        BeanUtils.copyProperties(user, user4);
        System.out.println("user.equals(user4): " + user.equals(user4));
        System.out.println("user.getPassword(): " + user.getPassword());
        System.out.println("user4.getPassword(): " + user4.getPassword());
    }
}
