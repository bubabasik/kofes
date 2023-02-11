<?php 
require './libs/phpmailer/PHPMailerAutoload.php';

$mailTo = 'bu.babasik@gmail.com';
$mailCopy = array();

$from_email = $mailTo;
$from_name = 'Доктор Пилюлькин';

$reply = $from;

$site = 'Доктор Пилюлькин';
$title = 'Новая заявка ' . $site;

$amo_text = '';

$html = '';
$name = '';
$email = '';
$phone = '';

if(isset($_POST['name'])){
	$html .= '<br/><strong>Имя:</strong> ' . $_POST['name'];
	$name = $_POST['name'];
}
if(isset($_POST['phone'])){
	$html .= '<br/><strong>Телефон:</strong> ' . $_POST['phone'];
	$phone = $_POST['phone'];
}
if(isset($_POST['email'])){
	$html .= '<br/><strong>E-mail:</strong> ' . $_POST['email'];
	$email = $_POST['email'];
}



if(isset($_POST['animal'])){
	$html .= '<br/><strong>Питомец:</strong> ' . $_POST['animal'];
}else if(isset($_POST['animal_text'])){
	$html .= '<br/><strong>Питомец:</strong> ' . $_POST['animal_text'];
}

if(isset($_POST['problem'])){
	$html .= '<br/><strong>Что беспокоит:</strong> ' . $_POST['problem'];
}else if(isset($_POST['problem_text'])){
	$html .= '<br/><strong>Что беспокоит:</strong> ' . $_POST['problem_text'];
}


if(isset($_POST['when'])){
	$html .= '<br/><strong>Когда появились симптомы:</strong> ' . $_POST['when'];
}


if(isset($_POST['connect'])){
	$html .= '<br/><strong>Средства связи:</strong> ';
	foreach($_POST['connect'] as $connect) {
		$html .= $connect . ' - ';
	}
}



if(isset($_POST['service'])){ 
	$html .= '<br/><strong>Услуга:</strong> ' . $_POST['service'].'<br>';

}
if(isset($_POST['form'])){ 
	$html .= '<br/><strong>Форма:</strong> ' . $_POST['form'].'<br>';
}
$html .= '<br/><strong>Страница:</strong> ' . $_SERVER['HTTP_REFERER'].'<br>';



$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom($from_email, $from_name);
$mail->addReplyTo($reply);
$mail->addAddress($mailTo);
if(count($mailCopy)){
	foreach($mailCopy as $key => $value){
		$mail->addCC($value);
	}
}

if(isset($_FILES['file'])) { 
	if($_FILES['file']['error'] == 0){ 
		$mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']); 
	} 
} 
$mail->Subject = $title;
$mail->msgHTML($html);


$mail->AltBody = $html;
if (!$mail->send()) {
	$return['error'] = $mail->ErrorInfo;
} else {
	$return['success'] = 'success';
	$json = json_encode($return);
	echo $json;
}



?>