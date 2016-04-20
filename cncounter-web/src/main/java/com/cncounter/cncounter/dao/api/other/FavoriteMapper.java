package com.cncounter.cncounter.dao.api.other;

import com.cncounter.cncounter.model.other.Favorite;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("oldFavoriteMapper")
public interface FavoriteMapper {

    int insertSelective(Favorite favorite);

    int updateSelective(Favorite favorite);

    int deleteById(Integer id);

    Favorite getById(Integer id);

    int countBy(Map<String, Object> params);

    List<Favorite> listPage(Map<String, Object> params);

    /**
     * 根据类别取出数据
     * @param type
     * @return
     */
    List<Favorite> listByType(Integer type);
}