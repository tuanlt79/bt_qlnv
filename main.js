
let layDanhSachNhanVien = () => {
    axios({
        method: "GET",
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
    }).then(function (result) {
        danhSachNV = result.data;
        // console.log(result.data);
        hienThiDanhSachNV(danhSachNV);
    }).catch(function (err) {
    })
};
layDanhSachNhanVien();
let validatorNV = new Valid();
let danhSachNV = [];

document.getElementById("btnXacNhan").addEventListener("click", function () {
    let nv = new NhanVien();
    nv.maNhanVien = document.getElementById("maNhanVien").value;
    nv.tenNhanVien = document.getElementById("tenNhanVien").value;
    let chucVu2 = document.querySelector("#chucVu").options;
    let viTriChucVu = document.querySelector('#chucVu').selectedIndex;
    nv.chucVu = chucVu2[viTriChucVu].innerHTML;
    nv.luongCoBan = document.getElementById("luongCoBan").value;
    nv.soGioLamTrongThang = document.getElementById("soGioLamTrongThang").value;
    nv.heSoChucVu = document.getElementById("chucVu").value;
    let valid = validatorNV.kiemTraRong(nv.maNhanVien, "kiemTra__mnv") && validatorNV.kiemTraSo(nv.maNhanVien, "kiemTra__mnv") && validatorNV.kiemTraDoDai(nv.maNhanVien, "kiemTra__mnv", 4, 6);
    valid &= validatorNV.kiemTraRong(nv.tenNhanVien, "kiemTra__tenNV") && validatorNV.kiemTraKyTu(nv.tenNhanVien, "kiemTra__tenNV");
    valid &= validatorNV.kiemTraRong(nv.luongCoBan, "kiemTra__luongNV") && validatorNV.kiemTraSo(nv.luongCoBan, "kiemTra__luongNV") && validatorNV.kiemTraSoLuong(nv.luongCoBan, "kiemTra__luongNV", 1000000, 20000000);
    valid &= validatorNV.kiemTraRong(nv.soGioLamTrongThang, "kiemTra__gioNV") && validatorNV.kiemTraSo(nv.soGioLamTrongThang, "kiemTra__gioNV") && validatorNV.kiemTraGioLam(nv.soGioLamTrongThang, "kiemTra__gioNV", 50, 150);

    if (valid) {
        axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv
        }).then((res) => {
            layDanhSachNhanVien();
        }).catch((err) => {

        })
    }
});
let hienThiDanhSachNV = (dsnv) => {
    let contentAddBody = ``;
    for (let i = 0; i < dsnv.length; i++) {
        let nv = new NhanVien();
        nv.maNhanVien = dsnv[i].maNhanVien;
        nv.tenNhanVien = dsnv[i].tenNhanVien;
        nv.chucVu = dsnv[i].chucVu;
        nv.luongCoBan = dsnv[i].luongCoBan;
        nv.soGioLamTrongThang = dsnv[i].soGioLamTrongThang;
        nv.heSoChucVu = dsnv[i].heSoChucVu;

        contentAddBody += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${nv.xepLoaiNhanVien()}
        
        </td>
        <td><button class = "btn btn-danger " onclick = "xoaNhanVien('${nv.maNhanVien}')">Xoá</button>
        </td>
        <td><button class = "btn btn-success" onclick = "suaNhanVien('${nv.maNhanVien}')">Sửa</button>
        </td>
        </tr>
        `;
    }
    document.getElementById("addBody").innerHTML = contentAddBody;

};
let xoaNhanVien = (maNhanVien) => {
    axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE',
    }).then((res) => {
        // console.log(res);
        layDanhSachNhanVien();
    }).catch((err) => { })
};
let suaNhanVien = (maNhanVien) => {
    axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET',
    }).then((res) => {
        // console.log(res.data);
        let nhanVienSua = res.data;
        document.getElementById("maNhanVien").value = nhanVienSua.maNhanVien;
        document.getElementById("tenNhanVien").value = nhanVienSua.tenNhanVien;
        document.getElementById("chucVu").value = nhanVienSua.chucVu;
        document.getElementById("luongCoBan").value = nhanVienSua.luongCoBan;
        document.getElementById("gioLamTrongThang").value = nhanVienSua.gioLamTrongThang;
        document.getElementById("tenNhanVien").value = nhanVienSua.tenNhanVien;
    }).catch((err) => { })

    document.getElementById('maNhanVien').disabled = true;
    document.getElementById('btnLuuThongTin').disabled = false;
    document.getElementById('btnXacNhan').style.display = 'none';
};
document.getElementById("btnLuuThongTin").addEventListener("click", () => {
    let nv = new NhanVien();
    nv.maNhanVien = document.getElementById("maNhanVien").value;
    nv.tenNhanVien = document.getElementById("tenNhanVien").value;
    // let _chucVu = document.querySelector("#chucVu").value;
    let chucVu2 = document.querySelector("#chucVu").options;
    let viTriChucVu = document.querySelector('#chucVu').selectedIndex;
    nv.chucVu = chucVu2[viTriChucVu].innerHTML;
    nv.luongCoBan = document.getElementById("luongCoBan").value;
    nv.soGioLamTrongThang = document.getElementById("soGioLamTrongThang").value;
    nv.heSoChucVu = document.getElementById("chucVu").value;
    let valid2 = validatorNV.kiemTraRong(nv.maNhanVien, "kiemTra__mnv") && validatorNV.kiemTraSo(nv.maNhanVien, "kiemTra__mnv") && validatorNV.kiemTraDoDai(nv.maNhanVien, "kiemTra__mnv", 4, 6);
    valid2 &= validatorNV.kiemTraRong(nv.tenNhanVien, "kiemTra__tenNV") && validatorNV.kiemTraKyTu(nv.tenNhanVien, "kiemTra__tenNV");

    valid2 &= validatorNV.kiemTraRong(nv.luongCoBan, "kiemTra__luongNV") && validatorNV.kiemTraSo(nv.luongCoBan, "kiemTra__luongNV") && validatorNV.kiemTraSoLuong(nv.luongCoBan, "kiemTra__luongNV", 1000000, 20000000);
    valid2 &= validatorNV.kiemTraRong(nv.soGioLamTrongThang, "kiemTra__gioNV") && validatorNV.kiemTraSo(nv.soGioLamTrongThang, "kiemTra__gioNV") && validatorNV.kiemTraGioLam(nv.soGioLamTrongThang, "kiemTra__gioNV", 50, 150);

    if (valid2) {
        axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`,
            method: 'PUT',
            data: nv
        }).then((res) => {
            layDanhSachNhanVien();
        }).catch(() => { })
    }
});