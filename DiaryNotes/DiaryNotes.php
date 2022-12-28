<?php 
error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "";
$db   = "diarynotes";

$koneksi = mysqli_connect($host,$user,$pass,$db);

$op = $_GET['op'];
switch($op){
    case '':normal();break;
    default:normal();break;
    case 'create':create();break;
    case 'detail':detail();break;
    case 'update':update();break;
    case 'delete':delete();break;
}

function normal(){
    global $koneksi;
    $sql1 = "select * from catatan order by id desc";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'judul' => $r1['judul'],
            'deskripsi' => $r1['deskripsi'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create(){
    global $koneksi;
    $judul = $_POST['judul'];
    $deskripsi = $_POST['deskripsi'];
    $hasil = "Gagal masukkan data";
    if($judul and $deskripsi){
        $sql1 = "insert into catatan(judul,deskripsi) values ('$judul','$deskripsi')";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "select * from catatan where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    while($r1 = mysqli_fetch_array($q1)){
        $hasil[] = array(
            'id' => $r1['id'],
            'judul' => $r1['judul'],
            'deskripsi' => $r1['deskripsi'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update(){
    global $koneksi;
    $id = $_GET['id'];
    $judul = $_POST['judul'];
    $deskripsi = $_POST['deskripsi'];
    if($judul){
        $set[] = "judul='$judul'";
    }
    if($deskripsi){
        $set[] = "deskripsi='$deskripsi'";
    }
    $hasil = "Gagal melakukan update data";
    if($judul or $deskripsi){
        $sql1 = "update catatan set ".implode(",",$set).",tgl_input=now() where id = '$id'";
        $q1 = mysqli_query($koneksi,$sql1);
        if($q1){
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete(){
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "delete from catatan where id = '$id'";
    $q1 = mysqli_query($koneksi,$sql1);
    if($q1){
        $hasil = "Berhasil menghapus data";
    }else{
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}