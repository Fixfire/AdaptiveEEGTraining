package model;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * @author Michele
 *
 */
public class DbManager implements DataManager {
	
	private Connection c;
	
	/**
	 * Constructor method
	 */
	public DbManager(){
		c = null;
	}
	
	/* (non-Javadoc)
	 * @see model.DataManager#connected()
	 */
	@Override
	public boolean connected(){
		return c == null;
	}
	
	/**
	 * Function to verify if the db is already created
	 * @return true if is already created
	 */
	private boolean existsDb(){
		File file = new File("test.db");
		return file.isFile();
	}
	
	/**
	 * DB init function, with tables creation
	 */
	private void dbInitialization(){
		System.out.println("Inizializzo db....");
		createTable("CREATE TABLE COMPANY " +
                "(ID INT PRIMARY KEY     NOT NULL," +
                " NAME           TEXT    NOT NULL)");
		//TODO
	}
	
	/**
	 * @see model.DataManager#connect()
	 */
	@Override
	public void connect(){
		try {
			Class.forName("org.sqlite.JDBC");
			if(!existsDb()){
				c = DriverManager.getConnection("jdbc:sqlite:test.db");
				dbInitialization();
			} else{
		    	c = DriverManager.getConnection("jdbc:sqlite:test.db");
		    }
		} catch ( Exception e ) {
		    System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		    System.exit(0);
		}
		System.out.println("Opened database successfully");
	}
	
	/**
	 * Create DB table
	 * @param sql create query to perform
	 */
	private void createTable(String sql){
		Statement stmt = null;
		try {
			if(!connected()){
				this.connect();
			}
		    stmt = c.createStatement();
		    stmt.executeUpdate(sql);
		    stmt.close();
		    c.close();
		 } catch ( Exception e ) {
		    System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		    System.exit(0);
		 }
		 System.out.println("Table created successfully");
	}
	
	/**
	 * @see model.DataManager#execute(java.lang.String)
	 */
	public boolean execute(String sql){
		Statement stmt = null;
		try {
	    	if(!connected()){
				this.connect();
			}
	    	c.setAutoCommit(false);
	    	stmt = c.createStatement();
	    	
	    	stmt.executeUpdate(sql);

	    	stmt.close();
	    	c.commit();
	    	c.close();
	    	return true;
	    } catch ( Exception e ) {
	    	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	    	System.exit(0);
	    }
	    System.out.println("Query executed");
	    
		return false;
	}
	
	/**
	 * @see model.DataManager#select(java.lang.String)
	 */
	public ResultSet select(String sql){
		Statement stmt = null;
		try {
	    	if(!connected()){
				this.connect();
			}
	    	c.setAutoCommit(false);
	    	stmt = c.createStatement();
	    	
	    	ResultSet rs = stmt.executeQuery(sql);
	    	
	    	/*
	    	while ( rs.next() ) {
		         int id = rs.getInt("id");
		         String  name = rs.getString("name");
		         System.out.println( "ID = " + id );
		         System.out.println( "NAME = " + name );
		      }
		    rs.close();
	    	*/
	    	
	    	stmt.close();
	    	c.commit();
	    	c.close();
			return rs;
	    } catch ( Exception e ) {
	    	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	    	System.exit(0);
	    }
	    System.out.println("Query executed");
	    return null;

	}
	
	/* (non-Javadoc)
	 * @see model.DataManager#insert(java.lang.String)
	 */
	/*
	@Override
	public void insert(String table, String[] fields, Object[] values){
		Statement stmt = null;
	    try {
	    	if(!connected()){
				this.connect();
			}
	    	c.setAutoCommit(false);

	    	stmt = c.createStatement();
	    	String sql = "INSERT INTO "+table+" (";
	    	for(int i=0; i<fields.length-1;i++){
	    		sql = sql+fields[i]+",";
	    	}
	    	sql = sql+fields[fields.length-1]+") ";
	    	sql = sql+"VALUES (";
	    	for(int i=0; i<values.length-1;i++){
	    		if(values[i] instanceof String){
	    			sql = sql+"'"+values[i]+"'"+",";
	    		}else{
	    			sql = sql+values[i]+",";
	    		}
	    	}
	    	if(values[values.length-1] instanceof String){
	    		sql = sql+"'"+values[values.length-1]+"'"+");";
	    	}else{
	    		sql = sql+values[values.length-1]+");";
	    	}
	    	
	    	stmt.executeUpdate(sql);

	    	stmt.close();
	    	c.commit();
	    	c.close();
	    } catch ( Exception e ) {
	    	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	    	System.exit(0);
	    }
	    System.out.println("Records created successfully");
	}
	
	/* (non-Javadoc)
	 * @see model.DataManager#select(java.lang.String)
	 */
	/*@Override
	public ResultSet select(String table, String[] fields, String sqlCondition){
		Statement stmt = null;
		try {
			if(!connected()){
				this.connect();
			}
		    c.setAutoCommit(false);

		    stmt = c.createStatement();
		    
		    String sql = "SELECT ";
	    	for(int i=0; i<fields.length-1;i++){
	    		sql = sql+fields[i]+",";
	    	}
	    	sql = sql+fields[fields.length-1];
	    	sql = sql+" FROM "+table;
	    	if(sqlCondition != null && sqlCondition instanceof String){
	    		sql = sql+sqlCondition;
	    	}
	    	sql = sql+";";

		    ResultSet rs = stmt.executeQuery(sql);
		    while ( rs.next() ) {
		         int id = rs.getInt("id");
		         String  name = rs.getString("name");
		         System.out.println( "ID = " + id );
		         System.out.println( "NAME = " + name );
		      }
		    rs.close();
		    
		    stmt.close();
		    c.close();
		    System.out.println("Selection done successfully");
		    return rs;
		 } catch ( Exception e ) {
		   	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		   	System.exit(0);
		   	return null;
		 }
	}*/
	
	/**
	 * Update data into db
	 * @param sql update query to perform
	 */
	/*public void update(String sql){
		Statement stmt = null;
		try {
			if(!connected()){
				this.connect();
			}
		    c.setAutoCommit(false);

		    stmt = c.createStatement();
		  
		    stmt.executeUpdate(sql);
		    c.commit();
		    
		    stmt.close();
		    c.close();
		    
		 } catch ( Exception e ) {
		  	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		   	System.exit(0);
		 }
		System.out.println("Update done successfully");
	}*/
	
	/**
	 * Delete data from db
	 * @param sql delete query to perform
	 */
	/*public void delete(String sql){
		Statement stmt = null;
		try {
			if(!connected()){
				this.connect();
			}
		    c.setAutoCommit(false);

		    stmt = c.createStatement();
		  
		    stmt.executeUpdate(sql);
		    c.commit();
		    
		    stmt.close();
		    c.close();
		    
		 } catch ( Exception e ) {
		  	System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		   	System.exit(0);
		 }
		System.out.println("Deletion done successfully");
	}
	*/
}
