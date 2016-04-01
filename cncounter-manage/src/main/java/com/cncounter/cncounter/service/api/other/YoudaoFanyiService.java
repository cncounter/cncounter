package com.cncounter.cncounter.service.api.other;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

/**
 * 有道翻译服务
 */
public interface YoudaoFanyiService extends TranslationApi {

    public String translationToCN(String textEnglish);
}
