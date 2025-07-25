document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transaction-form");
    const tabelBody = document.querySelector("#tabel-transaksi tbody");
  
    let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
    let editIndex = null; // Penanda mode edit
  
    function simpanData() {
      localStorage.setItem("transaksi", JSON.stringify(transaksi));
    }
  
    function tampilkanTransaksi() {
      tabelBody.innerHTML = "";
      transaksi.forEach((item, index) => {
        const baris = document.createElement("tr");
        baris.innerHTML = `
          <td>${item.nama}</td>
          <td>${item.jumlah}</td>
          <td>${item.tanggal}</td>
          <td>${item.jenis}</td>
          <td>${item.keterangan}</td>
          <td>
            <button onclick="edit(${index})">Edit</button>
            <button onclick="hapus(${index})">Hapus</button>
          </td>
        `;
        tabelBody.appendChild(baris);
      });
    }
  
    window.hapus = function(index) {
      if (confirm("Yakin ingin menghapus data ini?")) {
        transaksi.splice(index, 1);
        simpanData();
        tampilkanTransaksi();
      }
    };
  
    window.edit = function(index) {
      const item = transaksi[index];
      document.getElementById("nama-barang").value = item.nama;
      document.getElementById("jumlah").value = item.jumlah;
      document.getElementById("tanggal").value = item.tanggal;
      document.getElementById("jenis").value = item.jenis;
      document.getElementById("keterangan").value = item.keterangan;
  
      editIndex = index;
      form.querySelector("button[type=submit]").textContent = "Simpan Perubahan";
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const data = {
        nama: document.getElementById("nama-barang").value.trim(),
        jumlah: document.getElementById("jumlah").value.trim(),
        tanggal: document.getElementById("tanggal").value,
        jenis: document.getElementById("jenis").value,
        keterangan: document.getElementById("keterangan").value.trim(),
      };
  
      if (!data.nama || !data.jumlah || !data.tanggal) {
        alert("Harap lengkapi semua kolom yang wajib diisi.");
        return;
      }
  
      if (editIndex === null) {
        // Tambah baru
        transaksi.push(data);
      } else {
        // Simpan perubahan
        transaksi[editIndex] = data;
        editIndex = null;
        form.querySelector("button[type=submit]").textContent = "Tambah Transaksi";
      }
  
      simpanData();
      tampilkanTransaksi();
      form.reset();
    });
  
    tampilkanTransaksi();
  });
  