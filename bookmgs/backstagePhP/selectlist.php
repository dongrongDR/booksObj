<?php header("Content-Type: text/html; charset=utf-8");



	require_once("util/db.php");

	// $name = $_GET['name'];			//书名
	// $author = $_GET['author'];		//作者
	// $publisher = $_GET['publisher'];//出版社
	// $price = $_GET['price'];		//价格
	// $p_date = $_GET['p_date'];		//出版日期
	// $classify = $_GET['classify'];	// 类别
	// $status = $_GET['status'];		//上架状态
	// $borrow = $_GET['borrow_status'];//借出状态
	$selsql='select * from books order by id desc';
	$books = $db -> rawQuery($selsql);
	

	// $id = $db->rawQuery ('books', $selsql);


	$selcount='select count(*) as count from books';

	$books_count = $db -> rawQuery($selcount);
	$total = $books_count[0]['count'];

	sleep(2);

	if ($total > 0) {
        echo json_encode(array("success" => true, "message" => "图书保存成功","total"=>$total,"data"=>$books));
    } else {
        echo json_encode(array("success" => false, "message" => "保存失败"));
    }



?>