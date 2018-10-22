/**  
 * @Title:  ICacheService.java   
 * @Package com.ph.shopping.common.core.cache.redis   
 * @Description:    TODO(用一句话描述该文件做什么)   
 * @author: 李杰    
 * @date:   2017年5月14日 下午9:36:56   
 * @version V1.0 
 * @Copyright: 2017
 */  
package com.volunteer.common.util.rediscache;

import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**   
 * @ClassName:  ICacheService   
 * @Description:cache service  
 * @author: 李杰
 * @date:   2017年5月14日 下午9:36:56     
 * @Copyright: 2017
 */
public interface ICacheService<K,V> {

	/**
	 * 
	 * @Title: set   
	 * @Description:向缓存中写值   
	 * @param: @param k
	 * @param: @param v      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void set(K k, V v);
	/**
	 * 
	 * @Title: set   
	 * @Description: 写入缓存设置时效时间   
	 * @param: @param key
	 * @param: @param value
	 * @param: @param expireTime      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void set(K key, V value, Long expireTime, TimeUnit unit);
	/**
	 * 
	 * @Title: remove   
	 * @Description: 批量删除对应的value  
	 * @param: @param keys      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void removes(K[] keys);
	/**
	 * 
	 * @Title: remove   
	 * @Description: 删除对应的value 
	 * @param: @param key      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void remove(K key);
	/**
	 * 
	 * @Title: exists   
	 * @Description: 判断缓存中是否有对应的value
	 * @param: @param key
	 * @param: @return      
	 * @return: boolean
	 * @author：李杰      
	 * @throws
	 */
	boolean exists(K key);
	/**
	 * 
	 * @Title: removePattern   
	 * @Description:批量删除key
	 * @param: @param pattern      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void removePattern(K pattern);
	/**
	 * 
	 * @Title: hmSet   
	 * @Description:哈希 添加
	 * @param: @param key
	 * @param: @param hashKey
	 * @param: @param value      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void hmSet(K key, Object hashKey, V value);
	/**
	 * 
	 * @Title: hmGet   
	 * @Description:哈希获取数据
	 * @param: @param key
	 * @param: @param hashKey
	 * @param: @return      
	 * @return: Object
	 * @author：李杰      
	 * @throws
	 */
	Object hmGet(K key, Object hashKey);
	/**
	 * 
	 * @Title: hmRemove   
	 * @Description: hash 列表数据删除   
	 * @param: @param key
	 * @param: @param hashKey
	 * @param: @return      
	 * @return: Long
	 * @author：李杰      
	 * @throws
	 */
	Long hmRemove(K key, Object... hashKeys);
	/**
	 * 
	 * @Title: hmExists   
	 * @Description: 判断key 是否存在字段里   
	 * @param: @param key
	 * @param: @param hashKey
	 * @param: @return      
	 * @return: boolean
	 * @author：李杰      
	 * @throws
	 */
	boolean hmExists(K key, Object hashKey);
	/**
	 * 
	 * @Title: lPush   
	 * @Description:列表添加  
	 * @param: @param k
	 * @param: @param v      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	void lPush(K k, V v);
	/**
	 * 
	 * @Title: lRange   
	 * @Description: 列表获取
	 * @param: @param k
	 * @param: @param l
	 * @param: @param lO
	 * @param: @return      
	 * @return: List<Object>
	 * @author：李杰      
	 * @throws
	 */
	List<V> lRange(K k, long l, long lO);
	/**
	 * 
	* @Title: range 
	* @Description: 获取列表数据0,-1
	* @param @param k
	* @param @return    设定文件 
	* @return List<V>    返回类型 
	* @throws
	 */
	List<V> lRange(K k);
	/**
	 * 
	 * @Title: add   
	 * @Description:集合添加
	 * @param: @param key
	 * @param: @param value      
	 * @return: void
	 * @author：李杰      
	 * @throws
	 */
	Long sAdd(K key, V value);
	/**
	 * 
	 * @Title: setMembers   
	 * @Description: 集合获取 
	 * @param: @param key
	 * @param: @return      
	 * @return: Set<Object>
	 * @author：李杰      
	 * @throws
	 */
	Set<V> members(K key);
	/**
	 * 
	 * @Title: sRemove   
	 * @Description: set 删除   
	 * @param: @param key
	 * @param: @param values
	 * @param: @return      
	 * @return: Long
	 * @author：李杰      
	 * @throws
	 */
	Long sRemove(K key, Object... values);
	/**
	 * 
	 * @Title: isMember   
	 * @Description: 判断是否存在set里面   
	 * @param: @param key
	 * @param: @param o
	 * @param: @return      
	 * @return: boolean
	 * @author：李杰      
	 * @throws
	 */
	boolean isMember(K key, Object o);
	/**
	 * 
	 * @Title: add   
	 * @Description:有序集合添加
	 * @param: @param key
	 * @param: @param value
	 * @param: @param score
	 * @param: @return      
	 * @return: Boolean
	 * @author：李杰      
	 * @throws
	 */
	Boolean zadd(K key, V value, double score);
	/**
	 * 
	* @Title: zrange 
	* @Description: 获取有序结合的值
	* @param @param key
	* @param @return    设定文件 
	* @return Set<V>    返回类型 
	* @throws
	 */
	Set<V> zrange(K key);
	/**
	 * 
	 * @Title: rangeByScore   
	 * @Description: 有序集合获取
	 * @param: @param key
	 * @param: @param min
	 * @param: @param max
	 * @param: @return      
	 * @return: Set<V>
	 * @author：李杰      
	 * @throws
	 */
	Set<V> zrangeByScore(K key, double min, double max);
	/**
	 * 
	 * @Title: get   
	 * @Description:读取缓存
	 * @param: @param key
	 * @param: @return      
	 * @return: Object
	 * @author：李杰      
	 * @throws
	 */
	V get(K key);
	/**
	 * 
	 * @Title: expire   
	 * @Description: 修改key 的超时时间    
	 * @param: @param key
	 * @param: @return      
	 * @return: boolean
	 * @author：李杰      
	 * @throws
	 */
	boolean expire(K key, long timeout, TimeUnit unit);
	/**
	 * 
	 * @Title: getExpire   
	 * @Description: 根据key 得到设置的超时时间   
	 * @param: @param key
	 * @param: @return      
	 * @return: Long
	 * @author：李杰      
	 * @throws
	 */
	Long getExpire(K key);
	/**
	 * 
	 * @Title: getExpire   
	 * @Description: 根据key和指定的超时单位 得到设置的超时时间  
	 * @param: @param key
	 * @param: @param timeUnit
	 * @param: @return      
	 * @return: Long
	 * @author：李杰      
	 * @throws
	 */
	Long getExpire(K key, TimeUnit timeUnit);
	/**
	 * 
	* @Title: convertAndSend 
	* @Description: 内容发布
	* @param @param key
	* @param @param value    设定文件 
	* @return void    返回类型 
	* @author lijie
	* @throws
	 */
	void convertAndSend(K key, V value);
	/**
	 * 
	* @Title: setNx 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @param @param key
	* @param @param value
	* @param @return    设定文件 
	* @return boolean    返回类型 
	* @author lijie
	* @throws
	 */
	boolean setNx(K key, V value);
	/**
	 * 
	* @Title: setAndGet 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @param @param key
	* @param @param value
	* @param @return    设定文件 
	* @return V    返回类型 
	* @author lijie
	* @throws
	 */
	V setAndGet(K key, V value);
}
