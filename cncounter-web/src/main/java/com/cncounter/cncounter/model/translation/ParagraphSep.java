package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

/**
 * 段落分隔符
 */
public class ParagraphSep extends TranslationElement {

    public ParagraphSep(){
        super(TYPE_PARAGRAPH_SEP);
        //
        this.originalContent = "\n\n\n";
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
