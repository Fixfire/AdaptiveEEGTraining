package model;

import java.sql.ResultSet;

public interface DataManager {

	/**
	 * 
	 * @return true if the data storage is connected
	 */
	boolean connected();

	/**
	 * Connect to the data storage
	 */
	void connect();

	/**
	 * Execute a query (not selection) on the storage
	 * @param sql query
	 * @return true if the query is done correctly
	 */
	boolean execute(String sql);
	
	/**
	 * Select data from storage
	 * @param sql select query
	 * @return ResultSet with selected data
	 */
	ResultSet select(String sql);
	
	/**
	 * Insert data into storage
	 * @param table of the storage
	 * @param fields Array with name of the fields to insert
	 * @param values Array with values to insert ordered by fields
	 */
	//void insert(String table, String[] fields, Object[] values);

	/**
	 * Select data from storage
	 * @param table of the storage
	 * @param fields Array with name of the fields to select
	 * @param sqlCondition sql query with other conditions without ';'
	 * @return a ResultSet with selected data
	 */
	//ResultSet select(String table, String[] fields, String sqlCondition);

}