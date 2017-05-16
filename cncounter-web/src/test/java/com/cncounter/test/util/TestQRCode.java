package com.cncounter.test.util;

import com.cncounter.util.zxing.ZXingUtil;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *  2017/5/16.
 */
public class TestQRCode {

    // 参考 http://www.cnblogs.com/jtmjx/archive/2012/06/18/2545209.html
    // 需要 JDK1.7 执行环境
    //@Test
    public static void testQRCode() {
        String content = "http://www.cncounter.com/tools/translation.php";
        String pathname = ""+new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())+".jpeg";
        int size = 400;
        String logo = "qq.png";
        //
        OutputStream ostream = null;
        //
        File file = new File(pathname);
        //
        try {
            // 调用另一个方法
            BufferedImage image1 = ZXingUtil.generateQrCode(content, size, size);
            //
            BufferedImage imageLogo = ImageIO.read(TestQRCode.class.getClassLoader().getResourceAsStream(logo));

            // 合并后的新图片
            BufferedImage imageSaved = new BufferedImage(size, size, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = imageSaved.createGraphics();
            g2d.drawImage(image1, null, 0, 0);
            //
            //
            int w2 = imageLogo.getWidth();
            int h2 = imageLogo.getHeight();
            //

            int posw = size/2 - w2/2;
            int posh = size/2 - h2/2;
            g2d.drawImage(imageLogo, null, posw, posh);
            //
            int[] _imgRGB = new int[w2 * h2];
            _imgRGB = imageLogo.getRGB(0, 0, w2, h2, _imgRGB, 0, w2);
            //
            imageSaved.setRGB(posw, posh, w2, h2, _imgRGB, 0, w2);

            //
            ostream = new FileOutputStream(file);

            ImageIO.write(imageSaved, "jpeg", ostream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(null != ostream){
                try {
                    //
                    ostream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        //
        file = new File(pathname);
        if(file.exists() && file.isFile()){
            System.out.println("文件 "+ file.getAbsolutePath()+" 生成成功!");
        }
    }

    public static void main(String[] args) {
        testQRCode();
    }
}
