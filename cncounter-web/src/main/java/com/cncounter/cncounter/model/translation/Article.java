package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 文章
 */
public class Article extends TranslationElement {

    public static String PARA_DEP_REGEX = "\\n\\n+";

    // 文章元素
    private List<TranslationElement> articleElementList = new ArrayList<TranslationElement>();

    public Article() {
        super(TYPE_ARTICLE);
    }

    public void setOriginalContent(String originalContent) {
        this.originalContent = originalContent;
        // 处理拆分元素
        //
        originalContent = originalContent.replace("\r\n", "\n");
        // TODO, 按理说，应该分组
        String[] paraStringArray = originalContent.split(PARA_DEP_REGEX);
        //
        ParagraphSep sep = new ParagraphSep();
        // 遍历,并且组成新元素
        for(String paraContent : paraStringArray){
            //
            Paragraph paragraph = new Paragraph();
            paragraph.setOriginalContent(paraContent);
            //
            this.articleElementList.add(paragraph);
            // 加分隔符
            this.articleElementList.add(sep);
        }

    }

    /**
     * 翻译
     *
     * @param translationApi
     */
    @Override
    public void translation(TranslationApi translationApi) {
        //? 根据原内容,拆分到段落元素中
        // 依次遍历子元素，然后执行翻译， 接着写入译文内容
        //
        StringBuilder builder = new StringBuilder();
        //
        Iterator<TranslationElement> iteratorT = articleElementList.iterator();
        while(iteratorT.hasNext()){
            TranslationElement element = iteratorT.next();
            //
            element.translation(translationApi);
            //
            String orig = element.getOriginalContent();
            //
            String dest = element.getTranslationContent();
            //
            int elementType = element.getElementType();
            //
            builder.append(orig);
            if(TYPE_PARAGRAPH == elementType){ // 是段落
                builder.append("\n\n");
                builder.append(dest);
            }
        }
        //
        this.setTranslationContent(builder.toString());
    }
}
