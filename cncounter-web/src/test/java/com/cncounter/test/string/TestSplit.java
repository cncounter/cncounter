package com.cncounter.test.string;

public class TestSplit {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String str = "" 
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.ArrayList) [java.util.ArrayList] (6958)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.IOException) [java.io.IOException] (6866)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.List) [java.util.List] (6784)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.HashMap) [java.util.HashMap] (5590)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Map) [java.util.Map] (5413)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.File) [java.io.File] (5097)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.InputStream) [java.io.InputStream] (4234)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Set) [java.util.Set] (3915)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Arrays) [java.util.Arrays] (3884)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Iterator) [java.util.Iterator] (3856)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Collections) [java.util.Collections] (3643)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Date) [java.util.Date] (3461)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.HashSet) [java.util.HashSet] (3278)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.BufferedReader) [java.io.BufferedReader] (3257)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Collection) [java.util.Collection] (3192)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.URL) [java.net.URL] (3168)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.FileInputStream) [java.io.FileInputStream] (3044)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.InputStreamReader) [java.io.InputStreamReader] (3023)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.junit.Test) [org.junit.Test] (3008)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.FileOutputStream) [java.io.FileOutputStream] (2843)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.FileNotFoundException) [java.io.FileNotFoundException] (2669)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.OutputStream) [java.io.OutputStream] (2563)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.regex.Pattern) [java.util.regex.Pattern] (2469)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.Serializable) [java.io.Serializable] (2437)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.LinkedList) [java.util.LinkedList] (2372)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.text.SimpleDateFormat) [java.text.SimpleDateFormat] (2245)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Properties) [java.util.Properties] (2190)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Random) [java.util.Random] (2171)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.lang.reflect.Method) [java.lang.reflect.Method] (2141)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.ByteArrayOutputStream) [java.io.ByteArrayOutputStream] (2112)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.regex.Matcher) [java.util.regex.Matcher] (2012)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.os.Bundle) [android.os.Bundle] (2007)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.logging.Logger) [java.util.logging.Logger] (1999)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.UnsupportedEncodingException) [java.io.UnsupportedEncodingException] (1968)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.junit.Before) [org.junit.Before] (1920)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Comparator) [java.util.Comparator] (1896)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.ByteArrayInputStream) [java.io.ByteArrayInputStream] (1868)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.PrintWriter) [java.io.PrintWriter] (1862)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Calendar) [java.util.Calendar] (1854)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.app.Activity) [android.app.Activity] (1843)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.MalformedURLException) [java.net.MalformedURLException] (1828)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.content.Context) [android.content.Context] (1780)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.view.View) [android.view.View] (1731)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Locale) [java.util.Locale] (1719)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Enumeration) [java.util.Enumeration] (1709)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Map.Entry) [java.util.Map.Entry] (1705)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.FileWriter) [java.io.FileWriter] (1677)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.FileReader) [java.io.FileReader] (1651)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.util.Log) [android.util.Log] (1614)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.content.Intent) [android.content.Intent] (1601)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.lang.reflect.InvocationTargetException) [java.lang.reflect.InvocationTargetException] (1594)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.logging.Level) [java.util.logging.Level] (1557)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.lang.reflect.Field) [java.lang.reflect.Field] (1499)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.StringWriter) [java.io.StringWriter] (1499)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.widget.TextView) [android.widget.TextView] (1442)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.LinkedHashMap) [java.util.LinkedHashMap] (1409)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.Reader) [java.io.Reader] (1390)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.URI) [java.net.URI] (1377)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.Writer) [java.io.Writer] (1339)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.text.ParseException) [java.text.ParseException] (1318)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=junit.framework.TestCase) [junit.framework.TestCase] (1318)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.OutputStreamWriter) [java.io.OutputStreamWriter] (1295)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.StringReader) [java.io.StringReader] (1279)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.BufferedWriter) [java.io.BufferedWriter] (1265)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Vector) [java.util.Vector] (1254)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.StringTokenizer) [java.util.StringTokenizer] (1251)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.text.DateFormat) [java.text.DateFormat] (1246)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.concurrent.TimeUnit) [java.util.concurrent.TimeUnit] (1237)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.BufferedInputStream) [java.io.BufferedInputStream] (1235)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.TreeMap) [java.util.TreeMap] (1227)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.xml.sax.SAXException) [org.xml.sax.SAXException] (1218)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=javax.servlet.http.HttpServletRequest) [javax.servlet.http.HttpServletRequest] (1175)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.io.PrintStream) [java.io.PrintStream] (1168)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.TreeSet) [java.util.TreeSet] (1160)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.widget.Toast) [android.widget.Toast] (1157)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.Hashtable) [java.util.Hashtable] (1154)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.lang.reflect.Constructor) [java.lang.reflect.Constructor] (1139)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.URLEncoder) [java.net.URLEncoder] (1134)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.security.NoSuchAlgorithmException) [java.security.NoSuchAlgorithmException] (1134)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.w3c.dom.Document) [org.w3c.dom.Document] (1130)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.widget.Button) [android.widget.Button] (1129)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.junit.After) [org.junit.After] (1128)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=javax.servlet.http.HttpServletResponse) [javax.servlet.http.HttpServletResponse] (1109)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.awt.Color) [java.awt.Color] (1099)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.URISyntaxException) [java.net.URISyntaxException] (1085)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=javax.servlet.ServletException) [javax.servlet.ServletException] (1081)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=javax.xml.parsers.DocumentBuilderFactory) [javax.xml.parsers.DocumentBuilderFactory] (1076)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.lang.annotation.Retention) [java.lang.annotation.Retention] (1075)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.security.MessageDigest) [java.security.MessageDigest] (1072)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.concurrent.Executors) [java.util.concurrent.Executors] (1062)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.UnknownHostException) [java.net.UnknownHostException] (1057)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.slf4j.Logger) [org.slf4j.Logger] (1054)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.sql.SQLException) [java.sql.SQLException] (1043)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=org.slf4j.LoggerFactory) [org.slf4j.LoggerFactory] (1042)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.UUID) [java.util.UUID] (1040)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.net.InetAddress) [java.net.InetAddress] (1026)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=junit.framework.Assert) [junit.framework.Assert] (1011)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=android.view.ViewGroup) [android.view.ViewGroup] (1005)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.util.concurrent.ConcurrentHashMap) [java.util.concurrent.ConcurrentHashMap] (1001)\n"
			 + "(http://www.programcreek.com/java-api-examples/index.php?api=java.awt.event.ActionEvent) [java.awt.event.ActionEvent] (995)" 
			 ;
		System.out.println(testSplit(str));
	}

	public static String testSplit(String str) {
		String result = "";
		//
		if(null == str){
			return result;
		}
		//
		String[] lines = str.split("\n");
		if(null == lines || lines.length < 1){
			return result;
		}
		int len = lines.length;
		//
		String[] results = new String[len];
		//
		for (int i = 0; i < len; i++) {
			//
			String line = lines[i];
			if(null == line || line.trim().isEmpty()){
				continue;
			}
			//
			String[] tokens = line.split(" ");
			if(null == tokens || tokens.length < 1){
				continue;
			}
			String[] tokenN = new String[3];
			for (int j = 0; j < tokens.length; j++) {
				String token = tokens[j];
				if(null != token){
					if(0 == j){
						tokenN[1] = token; // 0 和1对调
					} else if(1 == j){
						tokenN[0] = token;
					} else if(2 == j){ // 0 和1对调
						tokenN[2] = token;
					}
				}
			}
			//
			String res = "";
			for (int j = 0; j < tokenN.length; j++) {
				String tk = tokenN[j];
				res += tk;
			}
			//
			results[i] = res;
		}
		//
		for (int i = 0; i < results.length; i++) {
			String tk = results[i];
			result += tk +"\n";
		}
		//
		return result;
	}
}
