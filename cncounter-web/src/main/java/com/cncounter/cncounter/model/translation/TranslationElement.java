package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

/**
 * 翻译元素
 */
public abstract class TranslationElement {

    /**
     * 类型: 句子
     */
    public static final int TYPE_SENTENCE = 0;
    /**
     * 类型: 句子分隔符
     */
    public static final int TYPE_SENTENCE_SEP = 1;

    /**
     * 类型: 段落
     */
    public static final int TYPE_PARAGRAPH = 2;
    /**
     * 类型: 段落分隔符
     */
    public static final int TYPE_PARAGRAPH_SEP = 3;
    /**
     * 类型: 文章
     */
    public static final int TYPE_ARTICLE = 4;

    /**
     * 有参数的构造函数, 要求子类必须设置 elementType
     * @param elementType
     */
    public TranslationElement(int elementType){
        this.setElementType(elementType);
    }

    /**
     * 要求子类必须设置 elementType
     */
    private TranslationElement(){}

    /**
     * 翻译
     * @param translationApi
     */
    public abstract void translation(TranslationApi translationApi);

    // 原文内容
    protected String originalContent;
    // 译文内容
    protected String translationContent;
    //
    protected int elementType;

    /**
     * 取得原文内容
     * @return
     */
    public String getOriginalContent() {
        return originalContent;
    }

    public void setOriginalContent(String originalContent) {
        this.originalContent = originalContent;
    }

    /**
     * 取得译文内容
     * @return
     */
    public String getTranslationContent() {
        return translationContent;
    }

    public void setTranslationContent(String translationContent) {
        this.translationContent = translationContent;
    }

    /**
     * 取得所属类型
     * @return
     */
    public int getElementType() {
        return elementType;
    }

    public void setElementType(int elementType) {
        this.elementType = elementType;
    }

}
