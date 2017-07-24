package com.cncounter.cncounter.model.translation;

import com.cncounter.cncounter.model.translation.api.TranslationApi;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 文章
 */
public class Article extends TranslationElement {

    public static String PARA_DEP_REGEX = "\\n\\n+";

    private  Log logger = LogFactory.getLog(this.getClass());

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
        //
        boolean isCode = false;
        // 遍历,并且组成新元素
        for(String paraContent : paraStringArray){
            //
            boolean currentisCode = isCode;
            if(null == paraContent){
                continue;
            } else if(paraContent.trim().equals("```")){
                currentisCode = true;
                isCode = !isCode;

                ParagraphSep sep2 = new ParagraphSep();
                sep2.setOriginalContent(paraContent);
                this.articleElementList.add(sep2);
                continue;
            }
            //
            Paragraph paragraph = new Paragraph();
            paragraph.setOriginalContent(paraContent);
            paragraph.isCode = currentisCode;
            //
            this.articleElementList.add(paragraph);
            // 加分隔符
            this.articleElementList.add(sep);
        }

    }

    // 将文章解析为段落
    public List<TranslationElement> parse2Paragraph(String originalContent) {
        // TODO 其实可以扫描前后行,确定本行的归属
        //
        List<TranslationElement> paraElementList = new ArrayList<TranslationElement>();
        //
        originalContent = originalContent.replace("\r\n", "\n");
        // 以行作为分隔
        String[] lineArray = originalContent.split("\n");
        //
        final String codeLine = "```";
        //
        ParagraphSep sep = new ParagraphSep();
        //
        boolean code1Started = false;
        boolean code2Started = false;
        boolean prevEmptyLine = false; // 前一行为空
        StringBuilder currentPara = null;
        boolean isCode = false;
        // 遍历,并且组成新元素
        int lineCount = lineArray.length;
        for(int i = 0; i< lineCount; i++){
            String line = lineArray[i];
            if(null == line){
                continue; // 应该不会出现 null
            }
            if(null == currentPara){
                currentPara = new StringBuilder(); // 新段落
            }
            // 空行标志
            boolean currentEmptyLine = line.trim().isEmpty();
            // 代码段开始起始
            if(!code1Started && codeLine.trim().equals(line.trim())){
                // 加入当前 para 之中
                currentPara.append(line);
                code1Started = true;
                prevEmptyLine = false;
                continue; // 继续下一行
            }
            // 代码段结束
            if(code1Started && codeLine.trim().equals(line.trim())){
                // 加入当前 para 之中
                currentPara.append(line);
                //
                Paragraph paragraph = new Paragraph();
                paragraph.isCode = code1Started;
                paragraph.setOriginalContent(currentPara.toString());
                paraElementList.add(paragraph);
                code1Started = false;
                prevEmptyLine = false;
                currentPara = null; // 继续下一行
                continue;
            }
            // 属于代码段;
            if(code1Started){
                // 加入当前 para 之中
                currentPara.append(line);
                continue; // 继续下一行
            }
            // 本行匹配代码格式
            boolean thisMatchCode = false;
            if(line.trim().startsWith("    ") || line.trim().startsWith("\t")){
                // 4个空格或者\t; 属于代码
                thisMatchCode = true;
            } else if(currentEmptyLine){
                thisMatchCode = true;
            }


            // 另一种代码段
            if(prevEmptyLine && !currentEmptyLine){ // 上一行是空行; 可能是代码段开始; 或者普通段落开始
                if(thisMatchCode){
                    if(!code2Started){
                        // 之前不是代码
                        // 结束上一段落
                        Paragraph paragraph = new Paragraph();
                        paragraph.isCode = code2Started; // 决定之前是否是 Code
                        paragraph.setOriginalContent(currentPara.toString());
                        paraElementList.add(paragraph);
                        // 新段落
                        currentPara = new StringBuilder();
                    }
                    // 加入当前 para 之中
                    currentPara.append(line);
                    code2Started = true; // 如果没有开始, 则开始代码
                    prevEmptyLine = currentEmptyLine;
                    continue;// 继续下一行
                } else {
                    // 本行不为空,也不是代码格式; 则不属于代码...
                    // 结束上一段落
                    Paragraph paragraph = new Paragraph();
                    paragraph.isCode = code2Started; // 决定之前是否是 Code
                    paragraph.setOriginalContent(currentPara.toString());
                    paraElementList.add(paragraph);
                    //
                    code2Started = false;
                    prevEmptyLine = currentEmptyLine;
                    // 新段落
                    currentPara = new StringBuilder();
                    // 加入当前 para 之中
                    currentPara.append(line);
                    continue; // 继续下一行
                }
            }

            // 本行是空行
            if(currentEmptyLine){
                // 加入当前 para 之中
                currentPara.append(line);
                prevEmptyLine = currentEmptyLine;
                continue;
            }
            // 本行非空
            if(thisMatchCode && code2Started){
                // 匹配普通代码
                // 加入当前 para 之中
                currentPara.append(line);
                prevEmptyLine = currentEmptyLine;
                continue;
            }

            // 最后一段
            if(i+1 == lineCount){
                // 加入当前 para 之中
                currentPara.append(line);
                Paragraph paragraph = new Paragraph();
                paragraph.isCode = code2Started; // 决定之前是否是 Code
                paragraph.setOriginalContent(currentPara.toString());
                paraElementList.add(paragraph);
                code2Started = false;
                prevEmptyLine = currentEmptyLine;
                // 新段落
                currentPara = null;
                continue;
            }  else {
                // 普通段落
                // 加入当前 para 之中
                currentPara.append(line);
                prevEmptyLine = currentEmptyLine;
                continue;
            }
        }
        //
        return paraElementList;
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
        int success_num = 0;
        long time_start = System.currentTimeMillis();
        //
        Iterator<TranslationElement> iteratorT = articleElementList.iterator();
        while(iteratorT.hasNext()){
            TranslationElement element = iteratorT.next();
            //
            try{
                element.translation(translationApi);
            } catch (Exception e){
                try{
                    // 再来一次
                    element.translation(translationApi);
                } catch (Exception e2){
                    if(TYPE_PARAGRAPH == elementType) { // 是段落
                        success_num--;
                    }
                    element.setTranslationContent("!! 翻译失败");
                    logger.error("!! 翻译失败; 原文内容为: \n" + element.getOriginalContent() + "\n\n", e2);
                }
            }
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
                //
                success_num ++;
                logger.debug("翻译成功: " + success_num + "条; 最新 orig.length="+orig.length() );
            }
        }
        long time_end = System.currentTimeMillis();
        logger.debug("翻译结束,共: " + success_num + "条;" +
                "耗时: "+ (time_end - time_start)+ " ms;"+
                " length()="+builder.length() );
        //
        this.setTranslationContent(builder.toString());
    }
}
