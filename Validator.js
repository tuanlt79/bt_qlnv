let Valid = function() {
    //kiểm tra Rỗng
    this.kiemTraRong = (value,idTB) => {
        if (value.trim() === "") {
            document.getElementById(idTB).innerHTML = "Không được để trống";
            document.getElementById(idTB).style.display='block';
            return false;
        }
        else {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display='none';
            return true;
        }
    };
    this.kiemTraSo = function (value, idTB) {
        if (value.match(/^[0-9]+$/)) {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display = 'none';
            return true;
        }
        else {
            document.getElementById(idTB).innerHTML = "Mã nhân viên phải là số";
            document.getElementById(idTB).style.display = 'block';
            return false;
        }
    };
    this.kiemTraDoDai = (value, idTB, min, max) => {
        if (value.length >= min && value.length <= max) {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display = 'none';
            return true;
        }
        else {
            document.getElementById(idTB).innerHTML = `Mã nhân viên phải từ ${min} đến ${max} số`;
            document.getElementById(idTB).style.display = 'block';
            return false;
        }
    };
    this.kiemTraKyTu = (value, idTB) => {
        kyTu = /^[A-Z a-z]+$/;
        if (value.match(kyTu)) {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display = 'none';
            return true;
        } else {
            document.getElementById(idTB).innerHTML = "Tên nhân viên phải là ký tự";
            document.getElementById(idTB).style.display = 'block';
            return false;
        }
    };
    this.kiemTraSoLuong = (value, idTB, min, max) => {
        if (value >= min && value <= max) {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display = 'none';
            return true;
        }
        else {
            document.getElementById(idTB).innerHTML = `Lương phải từ ${min} đến ${max}`;
            document.getElementById(idTB).style.display = 'block';
            return false;
        }
    };
    this.kiemTraGioLam = (value, idTB, min, max) => {
        if (value >= min && value <= max) {
            document.getElementById(idTB).innerHTML = "";
            document.getElementById(idTB).style.display = 'none';
            return true;
        }
        else {
            document.getElementById(idTB).innerHTML = `Giờ làm phải từ ${min} đến ${max}`;
            document.getElementById(idTB).style.display = 'block';
            return false;
        }
    };
};