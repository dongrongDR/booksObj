<?php header("Content-Type: text/html; charset=utf-8");



	require_once("util/db.php");

	$name = $_GET['name'];			//书名
	$author = $_GET['author'];		//作者
	$publisher = $_GET['publisher'];//出版社
	$price = $_GET['price'];		//价格
	$p_date = $_GET['p_date'];		//出版日期
	$classify = $_GET['classify'];	// 类别
	$status = $_GET['status'];		//上架状态
	$borrow = $_GET['borrow_status'];//借出状态

	$data = Array (
        "name" => $name,
        "author" => $author,
        "publisher"=> $publisher,
		"price" => $price,
		"p_date" => $p_date,
		"status" => $status,
		"borrow_status" => $borrow,
		"classify" => $classify
    );
	sleep(2);
	$id = $db->insert ('books', $data);

	if ($id > 0) {
        echo json_encode(array("success" => true, "message" => "图书保存成功"));
    } else {
        echo json_encode(array("success" => false, "message" => "保存失败"));
    }












/*
	
	$mysql_server_name='localhost'; //改成自己的mysql数据库服务器
	 
	$mysql_username='root'; //改成自己的mysql数据库用户名
	 
	$mysql_password=''; //改成自己的mysql数据库密码
	 
	$mysql_database='test'; //改成自己的mysql数据库名


	$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password) or die("error connecting") ;//连接数据库
	 
	mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.南昌网站建设公司百恒网络PHP工程师建议用UTF-8 国际标准编码.
	 
	mysql_select_db($mysql_database); //打开数据库
	 
	$sql ="select * from books "; //SQL语句

	 // $userName=$_GET['bookName'];

	
	$result = mysql_query($sql,$conn); //查询
	
	// json_encode($result);


	/*
	while($row = mysql_fetch_array($result))
	 
	{
		echo "<script>var ccc=[];ccc.push(<?php $row['bookName']?> +);console.log(ccc[2])
		</script>";
	
		echo $row['bookName'];
		
	 
	}
*/


/*
	// 写入数据库	
	$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库
 
	mysql_query("set names 'utf8'"); //数据库输出编码
	 
	mysql_select_db($mysql_database); //打开数据库
	 
	$sql = "insert into messageboard (Topic,Content,Enabled,Date) values ('$Topic','$Content','1','2011-01-12')";
	 
	mysql_query($sql);
	 
	mysql_close(); //关闭MySQL连接

*/	
?>