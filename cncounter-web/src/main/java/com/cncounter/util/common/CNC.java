package com.cncounter.util.common;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * CNC 工具类 2016/1/5.
 */
public class CNC {

    public static String getSaltPassword(String password, String salt){
        String saltPassword = MD5Util.md5(password + salt);
        // 此处，可以循环N次,增加暴力计算的计算难度
        return saltPassword;
    }


    /**
     * 拷贝对象,根据同名属性匹配,将 source 的属性拷贝给 dest <br/>
     * 暴力拷贝, 如果需要使用 getter/setter,请使用 :
     * @link{org.springframework.beans.BeanUtils#copyProperties} 方法 或者 apache.commons 工具包
     * @param source 要拷贝属性的 源 对象
     * @param dest 要拷贝属性的 目的 对象
     */
    public static void copyFields(Object source, Object dest){
        boolean deep = false;
        copyFields(source, dest, deep);
    }

    /**
     *
     * 拷贝对象,根据同名属性匹配,将 source 的属性拷贝给 dest
     * @param source 要拷贝属性的 源 对象
     * @param dest 要拷贝属性的 目的 对象
     * @param deep 是否深拷贝
     */
    public static void copyFields(Object source, Object dest, boolean deep){
        if(null == source || null == dest){
            return;
        }
        //
        Class srcClazz = source.getClass();
        Field[] fields = srcClazz.getDeclaredFields();
        //
        for (int i=0; i<fields.length; i++){
            Field field = fields[i];
            //
            String fieldName = field.getName();
            // 暴力设置可访问性
            field.setAccessible(true);
            try {
                Object fieldValue = field.get(source);
                _setField(dest, fieldName, fieldValue, deep);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        return ;
    }

    private static void _setField(Object dest, String fieldName, Object fieldValue, boolean deep){
        // TODO 避免循环引用,应该记录本次已经处理的对象
        // TODO 如果是序列化时，多个对象还可能更复杂
        // 直接赋值
        if(null == dest){
            return;
        }
        //
        Class<?> destClass = dest.getClass();
        Field destField = null;
        try {
            destField = destClass.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
            return;
        }
        if(null == destField) {
            return;
        }
        destField.setAccessible(true);
        // 判断类型
        Class<?> destFieldType = destField.getType();
        // 类型不匹配
        if(false == destFieldType.isInstance(fieldValue)){
            return;
        }

        if(!deep){
            // 如果浅拷贝
            fieldValue = fieldValue;
        } else if(destFieldType.isPrimitive()){
            // 如果是基本类型
            fieldValue = fieldValue;
        } else if(destFieldType.isArray()){
            // 如果是数组类型
            fieldValue = fieldValue;
        } else if(fieldValue instanceof String){
            // String
            fieldValue = String.valueOf(fieldValue);
        }  else if(fieldValue instanceof Map){
            // map, list 等
            fieldValue = (fieldValue);
        } else {
            // 执行深拷贝
            fieldValue = cloneObj(fieldValue, deep);
        }
        try {
            destField.set(dest,fieldValue);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }

    /**
     * (浅)克隆对象,根据对象的类来决定目标类型
     * @param source 源对象
     * @return
     */
    public static Object cloneObj(Object source){
        boolean deep = false;
        return  cloneObj(source, deep);
    }

    /**
     * 克隆对象,根据对象的类来决定目标类型
     * @param source 需要克隆的对象
     * @param deep true 为深克隆, false 为浅克隆
     * @return 克隆后的对象
     */
    public static Object cloneObj(Object source, boolean deep){
        if(null == source){
            return null;
        }
        //
        Object dest = null;
        Class<?> clazz = source.getClass();
        //
        if(source instanceof Cloneable){
            String clone = "clone";
            try {
                Method cloneMethod = clazz.getMethod(clone, new Class[]{});
                cloneMethod.setAccessible(true);
                dest = cloneMethod.invoke(source, new Object[]{});
            } catch (Exception e) {
                e.printStackTrace();
            }
            return dest;
        }
        //
        try {
            dest = clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 调用拷贝属性的方法
        copyFields(source, dest, deep);
        //
        return dest;
    }
}
