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
        String originalContent = this.getOriginalContent();
        if(null == originalContent){
            this.setTranslationContent("");
            return;
        }
        if(originalContent.trim().isEmpty()){
            this.setTranslationContent(originalContent);
            return;
        }
        //
        if(originalContent.trim().startsWith("![](")){
            this.setTranslationContent("");
            return;
        }
        if(originalContent.trim().startsWith("原文链接:")){
            this.setTranslationContent("");
            return;
        }
        if(originalContent.trim().startsWith("\t")){
            this.setTranslationContent("");
            return;
        }
        if(originalContent.length() > Paragraph.LEN_LIMIT){
            this.setTranslationContent("长度超标,拒绝翻译!");
            return;
        }
        //
        String dest = translationApi.translation(originalContent);
        //
        this.setTranslationContent(dest);
    }
}
