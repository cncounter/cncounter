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
        List<TranslationElement> paraElementList = parse2Paragraph(originalContent);
        this.articleElementList = paraElementList;
        // TODO, 按理说，应该分组
//        String[] paraStringArray = originalContent.split(PARA_DEP_REGEX);
//        //
//        ParagraphSep sep = new ParagraphSep();
//        //
//        boolean isCode = false;
//        // 遍历,并且组成新元素
//        for(String paraContent : paraStringArray){
//            //
//            boolean currentisCode = isCode;
//            if(null == paraContent){
//                continue;
//            } else if(paraContent.trim().equals("```")){
//                currentisCode = true;
//                isCode = !isCode;
//
//                ParagraphSep sep2 = new ParagraphSep();
//                sep2.setOriginalContent(paraContent);
//                this.articleElementList.add(sep2);
//                continue;
//            }
//            //
//            Paragraph paragraph = new Paragraph();
//            paragraph.setOriginalContent(paraContent);
//            paragraph.isCode = currentisCode;
//            //
//            this.articleElementList.add(paragraph);
//            // 加分隔符
//            this.articleElementList.add(sep);
//        }

    }

    private void append2Builder(StringBuilder builder, String line){
        builder.append(line).append("\n");
    }

    private static TranslationElement asParagraph(CharSequence builder, boolean code1Started){
        //
        String content = builder.toString();
        if(content.trim().isEmpty()){
            ParagraphSep sep = new ParagraphSep();
            if(content.contains("\n\n")){
            } else if(content.contains("\n")){
                content = content+"\n";
            } else {
                content = "\n"+content+"\n";
            }
            sep.setOriginalContent(content);
            return sep;
        }
        //
        content = content.trim();

        Paragraph paragraph = new Paragraph();
        paragraph.isCode = code1Started; // 决定之前是否是 Code
        paragraph.setOriginalContent(content);
        //
        return paragraph;
    }

    // 将文章解析为段落
    public List<TranslationElement> parse2Paragraph(String originalContent) {
        // TODO 其实可以扫描前后行,确定本行的归属
        // 只有代码段中的连续2个空行会被保留，否则直接作为段落分隔符。
        //
        List<TranslationElement> paraElementList = new ArrayList<TranslationElement>();
        //
        originalContent = originalContent.replace("\r\n", "\n");
        // 以行作为分隔
        String[] lineArray = originalContent.split("\n");
        //
        final String codeLine = "```";
        //
        //ParagraphSep sep = new ParagraphSep();
        //
        boolean code1Started = false;
        boolean code2Started = false;
        boolean prevEmptyLine = false; // 前一行为空
        StringBuilder currentPara = null;
        //boolean isCode = false;
        // 遍历,并且组成新元素
        int lineCount = lineArray.length;
        for(int i = 0; i< lineCount; i++){
            String line = lineArray[i];
            if(null == line){
                line = "";
            }
            if(null == currentPara){
                currentPara = new StringBuilder(); // 新段落
            }
            // 1. ``` 方式的代码段
            // 代码段开始
            if(!code1Started && line.trim().startsWith(codeLine)){
                // 结束之前的 ParaGraph
                TranslationElement paragraph = asParagraph(currentPara, code1Started);
                paraElementList.add(paragraph);
                // 加入当前 para 之中
                currentPara = new StringBuilder();
                append2Builder(currentPara, line);
                code1Started = true;
                prevEmptyLine = false;
                continue; // 继续下一行
            }
            // 代码段结束
            if(code1Started && line.trim().startsWith(codeLine)){
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                TranslationElement paragraph = asParagraph(currentPara, code1Started);
                paraElementList.add(paragraph);
                //
                code1Started = false;
                prevEmptyLine = false;
                currentPara = null;
                continue; // 继续下一行
            }
            // 属于代码段;
            if(code1Started){
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                continue; // 继续下一行
            }

            // 2. 缩进\t方式的代码段

            // 空行标志
            boolean currentEmptyLine = line.trim().isEmpty();
            // 本行匹配代码格式
            boolean thisMatchCode = false;
            if(line.trim().startsWith("    ") || line.trim().startsWith("\t")){
                // 4个空格或者\t; 属于代码
                thisMatchCode = true;
            } else if(currentEmptyLine){
                thisMatchCode = true;
            } else if(line.trim().matches("^!?\\[[^\\]]*\\]\\([^\\)]*\\)$")){
                // 匹配 ![]() 或者 []
                thisMatchCode = true;
            } else if(line.trim().matches("^<http[^>]+>$")){
                // 匹配 <http...>
                thisMatchCode = true;
            }

            // 代码段开始
            if(!code2Started && thisMatchCode && !currentEmptyLine){
                // 结束上一段落
                TranslationElement paragraph = asParagraph(currentPara, code2Started);
                paraElementList.add(paragraph);
                // 新段落
                currentPara = new StringBuilder();
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                code2Started = true;
                prevEmptyLine = false;
                continue; // 继续下一行
            }
            // 代码段结束
            if(code2Started && !thisMatchCode){
                // 结束上一段落
                TranslationElement paragraph = asParagraph(currentPara, code2Started);
                paraElementList.add(paragraph);
                // 新段落
                currentPara = new StringBuilder();//
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                //
                code2Started = false;
                prevEmptyLine = false;
                continue; // 继续下一行
            }

            // 属于代码段
            if(code2Started && thisMatchCode){
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                prevEmptyLine = false;
                continue; // 继续下一行
            }

            //
            code1Started = false;
            code2Started = false;
            // 3. 其他形式


            // 2行空行,继续
            if(prevEmptyLine && currentEmptyLine){
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                prevEmptyLine = currentEmptyLine;
                continue; // 继续下一行
            }
            // 前面空行,属于新段落
            // 或者前面不空行,开始第一个空行
            else if(prevEmptyLine || currentEmptyLine){
                // 结束上一段落
                TranslationElement paragraph = asParagraph(currentPara, code2Started);
                paraElementList.add(paragraph);
                // 新段落
                currentPara = new StringBuilder();//
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                //
                prevEmptyLine = currentEmptyLine;
                continue; // 继续下一行
            }

            // 连续段落
            if(!prevEmptyLine && !currentEmptyLine){
                // 加入当前 para 之中
                append2Builder(currentPara, line);
                prevEmptyLine = currentEmptyLine;
                continue; // 继续下一行
            }
        }
        //
        // 文章还有内容没清理; 如代码未结束等,末尾无空行等；
        if(null != currentPara && !currentPara.toString().isEmpty()){
            // 加入当前 para 之中
            append2Builder(currentPara, "");
            TranslationElement paragraph = asParagraph(currentPara, code1Started || code2Started);
            paraElementList.add(paragraph);
            currentPara = null;
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
            builder.append(orig.trim());
            if(TYPE_PARAGRAPH == elementType){ // 是段落
                builder.append("\n\n");
                builder.append(dest.trim());
                builder.append("\n\n");
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

//    public static void main(String[] args) throws Exception {
//        String fileName = "E:\\CODE_ALL\\02_GIT_ALL\\translation\\tiemao_2017\\30_Runtime_exec\\30_Runtime_exec.md";
//        String content = IOUtils.toString(new FileInputStream(new File(fileName)), "UTF-8");
//        Article article = new Article();
//        article.setOriginalContent(content);
//        //
//        TranslationApi translationApi = new TranslationApi() {
//            @Override
//            public String translation(String originalText) {
//                return "///中文模拟翻译///"+originalText.trim();
//            }
//        };
//        article.translation(translationApi);
//        //
//        String json = JSON.toJSONString(article, SerializerFeature.PrettyFormat);
//        System.out.println("----------------------------------------------");
//        System.out.println(json);
//        System.out.println("----------------------------------------------");
//
//        String fileName2 = "E:\\CODE_ALL\\02_GIT_ALL\\translation\\tiemao_2017\\30_Runtime_exec\\translation.md";
//        IOUtils.write(article.getTranslationContent(), new FileOutputStream(fileName2, false));
//    }
}
