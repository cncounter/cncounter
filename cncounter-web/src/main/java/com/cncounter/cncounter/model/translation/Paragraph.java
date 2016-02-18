package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 段落
 */
public class Paragraph extends TranslationElement {

    public static int LEN_LIMIT = 200;
    // 问号，句号
    public static String SENTENCE_DEP_REGEX = ".";

    private List<TranslationElement> paraElementList = new ArrayList<TranslationElement>();

    public Paragraph(){
        super(TYPE_PARAGRAPH);
    }

    public void setOriginalContent(String originalContent) {
        this.originalContent = originalContent;
        // 处理拆分元素
        List<TranslationElement> elementList = splitPara2Sentence(originalContent);
        //
        this.paraElementList.addAll(elementList);
    }

    private static List<TranslationElement> splitPara2Sentence(String content){
        List<TranslationElement> elementList = new ArrayList<TranslationElement>();

        // 如果是空白
        if(content.trim().isEmpty()){
            // 当做分隔符号
            SentenceSep sep = new SentenceSep();
            sep.setOriginalContent(content);
            elementList.add(sep);
            return elementList;
        }
        // 看长度
        int len = content.length();
        if(len <= LEN_LIMIT){ // 小于限值，不再拆分
            Sentence sentence = new Sentence();
            sentence.setOriginalContent(content);
            elementList.add(sentence);
            //
            return elementList;
        }
        // TODO 可能还有点问题
        // 拆分
        String text = content.substring(0, LEN_LIMIT);
        //int lastIndex = text.lastIndexOf("\n");
        int lastIndex = getLastParaSepratorIndex(text);
        if(lastIndex > -1){
            // 找到,则构造元素
            String left_str = content.substring(0, lastIndex);
            if(null != left_str && false== left_str.trim().isEmpty()){
                //
                Sentence sentence = new Sentence();
                sentence.setOriginalContent(left_str);
                elementList.add(sentence);
            } else {
                // 当做分隔符号
                SentenceSep sep = new SentenceSep();
                sep.setOriginalContent(content);
                elementList.add(sep);
            }
            //
            if(lastIndex < len - 2){
                // 摘出符号
                String symbol = content.substring(lastIndex, lastIndex+1);
                SentenceSep sep2 = new SentenceSep();
                sep2.setOriginalContent(symbol); //
                elementList.add(sep2);
                //
                // 接着继续往下 + 1
                String rest = content.substring(lastIndex+1);
                // 递归
                List<TranslationElement> restList = splitPara2Sentence(rest);
                //
                elementList.addAll(restList);
            }
        }

        //
        return elementList;
    }

    private static int getLastParaSepratorIndex(String text){
        // 取最大值
        int theLastIndex = -1;

        String[] seps = {".", "?", ":", ","};

        //
        for(String sep : seps){
            int lastIndex = text.lastIndexOf(sep);
            if(lastIndex > theLastIndex){
                theLastIndex = lastIndex;
            }
        }

        if(theLastIndex < 0){
            // 使用空格
            int lastIndex = text.lastIndexOf(" ");
            if(lastIndex > theLastIndex){
                theLastIndex = lastIndex;
            }
        }

        // \n 优先级高
        int lastIndex_n = text.lastIndexOf("\n");
        if(lastIndex_n > 1){
            theLastIndex = lastIndex_n;
        }

        return theLastIndex;

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
        Iterator<TranslationElement> iteratorT = paraElementList.iterator();
        while(iteratorT.hasNext()){
            TranslationElement element = iteratorT.next();
            //
            element.translation(translationApi);
            //
            String dest = element.getTranslationContent();
            //
            builder.append(dest);
        }
        //
        this.setTranslationContent(builder.toString());
    }
}
