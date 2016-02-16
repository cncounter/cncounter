package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

/**
 * 句子
 */
public class Sentence extends TranslationElement {

    public Sentence(){
        super(TYPE_SENTENCE);
    }
    /**
     * 翻译
     *
     * @param translationApi
     */
    @Override
    public void translation(TranslationApi translationApi) {
        //直接根据原内容,执行翻译，接着写入译文内容
        //
        String dest = translationApi.translation(this.getOriginalContent());
        //
        this.setTranslationContent(dest);
    }
}
