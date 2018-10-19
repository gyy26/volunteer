package com.volunteer.common.util.date;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
* @ClassName: ThreadLocalDateUtil  
* @Description: 时间转换 
* @author lijie  
* @date 2017年3月23日  
*
 */
public class SyncDateUtil {
	/**
	 * 私有构造方法
	 */
	private SyncDateUtil() {}

	/**
	 * 日志log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SyncDateUtil.class);
	/**
	 * 构造线程隔离DateFormat
	 */
	private static final ThreadLocal<DateFormat> THREAD_LOCAL = new ThreadLocal<DateFormat>();
	/**
	 * 构造时间格式化格式（使用线程隔离）
	 */
	private static final ThreadLocal<String> PATTERN_LOCAL = new ThreadLocal<String>();
	/**
	 * 计算每月最大日期
	 */
	public static final String MONTH_MAX = "max";
	/**
	 * 计算每月最小日期
	 */
	public static final String MONTH_MIN = "min";
	/**
	 * 根据时间格式获取DateFormat
	 * 
	 * @param pattern
	 * @return
	 */
	private static DateFormat getDateFormat(String pattern) {
		if (StringUtils.isBlank(pattern)) {
			throw new NullPointerException("generate DateFormat pattern is null");
		}
		DateFormat df = THREAD_LOCAL.get();
		if (df == null) {
			df = new SimpleDateFormat(pattern);
			THREAD_LOCAL.set(df);
			PATTERN_LOCAL.set(pattern);
		} else {
			String parm = PATTERN_LOCAL.get();
			if (!pattern.equals(parm)) {
				df = new SimpleDateFormat(pattern);
				THREAD_LOCAL.set(df);
				PATTERN_LOCAL.set(pattern);
			}
		}
		return df;
	}
	/**
	 * 
	* @Title: remove 
	* @Description: 调用释放资源:在没有传指定移除时需要手动调用
	* @param     设定文件 
	* @return void    返回类型 
	* @author lijie
	* @throws
	 */
	public static void remove(){
		PATTERN_LOCAL.remove();
		THREAD_LOCAL.remove();
	}
	/**
	 * string转date
	 * 
	 * @return
	 */
	public static Date strToDate(String pattern, String dateStr, boolean isRemove) {
		Date date = null;
		if (StringUtils.isBlank(dateStr) || StringUtils.isBlank(pattern)) {
			return date;
		}
		try {
			date = getDateFormat(pattern).parse(dateStr);
		} catch (Exception e) {
			logger.error("String to date error", e);
		} finally {
			if (isRemove) {
				remove();
			}
		}
		return date;
	}

	/**
	 * string转date
	 * 
	 * @return
	 */
	public static Date strToDate(String dateStr, boolean isRemove) {
		Date date = null;
		if (StringUtils.isBlank(dateStr)) {
			return date;
		}
		try {
			date = strToDateByYmdHms(dateStr, isRemove);
		} catch (Exception e) {
			logger.error("String to date error", e);
			date = strToDateByYmd(dateStr, isRemove);
		} finally {
			if (isRemove) {
				remove();
			}
		}
		return date;
	}
	/**
	 * 
	* @Title: strToDateByYmdHms  
	* @Description: yyyy-MM-dd HH:mm:ss
	* @param @param dateStr
	* @param @return    参数  
	* @return Date    返回类型  
	* @throws
	 */
	public static Date strToDateByYmdHms(String dateStr, boolean isRemove) {
		Date date = null;
		if (StringUtils.isBlank(dateStr)) {
			return date;
		}
		try {
			date = getDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateStr);
		} catch (Exception e) {
			logger.error("String to date error yyyy-MM-dd HH:mm:ss ", e);
		} finally {
			if (isRemove) {
				remove();
			}
		}
		return date;
	}
	/**
	 * 
	* @Title: strToDateByYmd  
	* @Description: yyyy-MM-dd  
	* @param @param dateStr
	* @param @return    参数  
	* @return Date    返回类型  
	* @throws
	 */
	public static Date strToDateByYmd(String dateStr, boolean isRemove) {
		Date date = null;
		if (StringUtils.isBlank(dateStr)) {
			return date;
		}
		try {
			date = getDateFormat("yyyy-MM-dd").parse(dateStr);
		} catch (ParseException e) {
			logger.error("String to date error yyyy-MM-dd ", e);
		} finally {
			if (isRemove) {
				remove();
			}
		}
		return date;
	}
	/**
	 * date转string
	 * 
	 * @param sdf
	 * @param date
	 * @return
	 */
	public static String dateToString(String pattern, Date date, boolean isRemove) {
		String str = null;
		if (null == date || StringUtils.isBlank(pattern)) {
			return str;
		}
		try {
			str = getDateFormat(pattern).format(date);
		} catch (Exception e) {
			logger.error("date to string error ", e);
		} finally {
			if (isRemove) {
				remove();
			}
		}
		return str;
	}

	/**
	 * 将时间字符串格式化成制定格式
	 * 
	 * @param dateStr
	 *            pattern格式参数
	 * @return
	 */
	public static String strToFormat(String dateStr, String pattern, boolean isRemove) {

		return dateToString(pattern, strToDate(pattern, dateStr, isRemove), isRemove);
	}
	/**
	 * 
	* @Title: dateToFormat 
	* @Description:将时间转换成指定时间格式 
	* @param @param newDate
	* @param @param pattern
	* @param @param isRemove
	* @param @return    设定文件 
	* @return Date    返回类型 
	* @author lijie
	* @throws
	 */
	public static Date dateToFormat(Date newDate, String pattern, boolean isRemove) {

		return strToDate(pattern, dateToString(pattern, newDate, isRemove), isRemove);
	}
	/**
	 * 
	* @Title: getDate 
	* @Description: 跟据月份计算当前月的最大与最小时间
	* @param @param time
	* @param @param size
	* @param @return    设定文件 
	* @return Date    返回类型 
	* @author lijie
	* @throws
	 */
	public static Date getDate(String time, String size) {
		if (StringUtils.isBlank(time)) {
			Calendar c = Calendar.getInstance();// 可以对每个时间域单独修改
			int year = c.get(Calendar.YEAR);
			int month = c.get(Calendar.MONTH) + 1;
			StringBuilder sbud = new StringBuilder();
			sbud.append(year).append("-");
			if(month < 10){
				sbud.append("0").append(month);
			}else{
				sbud.append(month);
			}
			time = sbud.toString();
		}
		String[] strs = time.split("-");
		if (MONTH_MAX.equals(size)) {
			StringBuilder sbud = new StringBuilder(time)
					.append("-")
					.append(getMaxDayByYearMonth(Integer.parseInt(strs[0]), Integer.parseInt(strs[1])))
					.append(" 23:59:59");
			time = sbud.toString();
			return strToDateByYmdHms(time, true);
		} else if (MONTH_MIN.equals(size)) {
			StringBuilder sbud = new StringBuilder(time)
					.append("-01")
					.append(" 00:00:00");
			time = sbud.toString();
			return strToDateByYmdHms(time, true);
		}
		throw new RuntimeException("跟据月份计算当前月的最大与最小时间错误，请检查计算格式");
	}
	/**
	 * 
	* @Title: getMaxDayByYearMonth 
	* @Description: 每月最大值 
	* @param @param year
	* @param @param month
	* @param @return    设定文件 
	* @return int    返回类型 
	* @author lijie
	* @throws
	 */
	public static int getMaxDayByYearMonth(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year - 1);
		calendar.set(Calendar.MONTH, month);
		return calendar.getActualMaximum(Calendar.DATE);
	}
	
	public static void main(String[] args) {
		System.out.println(dateToString("yyyy-MM-dd HH:mm:ss",getDate(null, MONTH_MIN),true));
	}
}
