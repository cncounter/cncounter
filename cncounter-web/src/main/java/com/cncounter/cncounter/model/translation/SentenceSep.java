package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

/**
 * 句子分隔符
 */
public class SentenceSep extends TranslationElement {

    public SentenceSep(){
        super(TYPE_SENTENCE_SEP);
    }
    /**
     * 翻译(分隔符不执行翻译)
     *
     * @param translationApi
     */
    @Override
    public void translation(TranslationApi translationApi) {
        //直接写入译文内容
        setTranslationContent(this.getOriginalContent());
    }
}
