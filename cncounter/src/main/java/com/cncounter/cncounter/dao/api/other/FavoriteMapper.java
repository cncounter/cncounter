package com.cncounter.cncounter.dao.api.other;

import java.util.List;

import com.cncounter.cncounter.model.other.Favorite;

public interface FavoriteMapper {

    int insert(Favorite record);

    int insertSelective(Favorite record);
    
    int deleteById(Integer id);

    int updateSelective(Favorite record);

    int updateByPrimaryKey(Favorite record);

    Favorite getById(Integer id);
    /**
     * 根据类别取出数据
     * @param id
     * @return
     */
    List<Favorite> listByType(Integer type);
}