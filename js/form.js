document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("wa-form");
    const setuju = document.getElementById("setuju");
    const submitBtn1 = document.getElementById("submitBtn1");
    const submitBtn2 = document.getElementById("submitBtn2");
    const submitBtn3 = document.getElementById("submitBtn3");
    const bantuanSelect = document.getElementById("bantuan");
    const tingkatSelect = document.getElementById("tingkat");
    const detailPrompt = document.getElementById("detail-prompt");
    
    // Fungsi untuk mengaktifkan atau menonaktifkan tombol submit
    function toggleSubmitButtons() {
      const isChecked = setuju.checked;
      submitBtn1.disabled = !isChecked;
      submitBtn2.disabled = !isChecked;
    }
    
    // Event listener untuk checkbox persetujuan
    setuju.addEventListener("change", toggleSubmitButtons);
    
    // Event listener untuk jenis layanan
    bantuanSelect.addEventListener("change", function() {
      const selectedOption = bantuanSelect.options[bantuanSelect.selectedIndex];
      const difficulty = selectedOption.getAttribute("data-difficulty");
      
      // Reset tingkat kesulitan
      tingkatSelect.value = difficulty || "";
      
      // Tampilkan atau sembunyikan prompt detail untuk opsi "Lainnya"
      if (bantuanSelect.value === "Lainnya") {
        detailPrompt.style.display = "block";
      } else {
        detailPrompt.style.display = "none";
      }
      
      // Aktifkan atau nonaktifkan field tingkat kesulitan berdasarkan pilihan
      if (difficulty) {
        tingkatSelect.disabled = true;
      } else {
        tingkatSelect.disabled = false;
      }
    });
    
    // Fungsi validasi form
    function validateForm() {
      let isValid = true;
      
      const nama = document.getElementById("nama");
      const telp = document.getElementById("telp");
      const bantuan = document.getElementById("bantuan");
      const tingkat = document.getElementById("tingkat");
      const kondisi = document.getElementById("kondisi");
      const lokasiJemput = document.getElementById("lokasiJemput");
      const lokasiAntar = document.getElementById("lokasiAntar");
      const waktu = document.getElementById("waktu");
      const pembayaranOptions = document.getElementsByName("pembayaran");
      
      // Reset validasi
      [nama, telp, bantuan, tingkat, kondisi, lokasiJemput, lokasiAntar, waktu].forEach(el => {
        el.classList.remove('is-invalid');
      });
      
      document.getElementById("pembayaran-error").style.display = "none";
      
      // Validasi input
      if (!nama.value.trim()) {
        nama.classList.add('is-invalid');
        isValid = false;
      }
      
      if (telp.value.trim().length > 20) {
        telp.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!bantuan.value) {
        bantuan.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!tingkat.value) {
        tingkat.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!kondisi.value.trim()) {
        kondisi.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!lokasiJemput.value.trim()) {
        lokasiJemput.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!lokasiAntar.value.trim()) {
        lokasiAntar.classList.add('is-invalid');
        isValid = false;
      }
      
      if (!waktu.value.trim()) {
        waktu.classList.add('is-invalid');
        isValid = false;
      }
      
      let pembayaranValid = false;
      for (const option of pembayaranOptions) {
        if (option.checked) {
          pembayaranValid = true;
          break;
        }
      }
      
      if (!pembayaranValid) {
        document.getElementById("pembayaran-error").style.display = "block";
        isValid = false;
      }
      
      return isValid;
    }
    
    // Fungsi untuk membuat format pesan WhatsApp
    function createWhatsAppMessage() {
      const nama = document.getElementById("nama").value.trim();
      const telp = document.getElementById("telp").value.trim();
      const bantuan = document.getElementById("bantuan").value;
      const tingkat = document.getElementById("tingkat").value;
      const kondisi = document.getElementById("kondisi").value.trim();
      const lokasiJemput = document.getElementById("lokasiJemput").value.trim();
      const lokasiAntar = document.getElementById("lokasiAntar").value.trim();
      const waktu = document.getElementById("waktu").value.trim();
      
      let metodePembayaran = "";
      const pembayaranOptions = document.getElementsByName("pembayaran");
      for (const option of pembayaranOptions) {
        if (option.checked) {
          metodePembayaran = option.value;
          break;
        }
      }
      
      return `*FORMAT ORDER SURUH KAMI*:

Nama: ${nama}
No. HP: ${telp}
Jenis Layanan: ${bantuan}
Tingkat Kesulitan: ${tingkat}
Detail Order: ${kondisi}
Lokasi Jemput: ${lokasiJemput}
Lokasi Tujuan: ${lokasiAntar}
Waktu: ${waktu}
Metode Bayar: ${metodePembayaran}

*Hidup Lebih Mudah Dengan Suruh Kami*
_NB: Jika admin tidak membalas dalam kurun 10 menit maka harap menghubungi admin yang lain_`;
    }
    
    // Event listener untuk tombol-tombol submit
    [submitBtn1, submitBtn2,].forEach(btn => {
      btn.addEventListener("click", function() {
        if (!validateForm()) {
          return;
        }
        
        const phoneNumber = this.getAttribute('data-number');
        
        // Tampilkan SweetAlert2 konfirmasi
        Swal.fire({
          title: "Konfirmasi Pesanan",
          text: "Anda wajib membagikan lokasi setelah pesan terkirim di WhatsApp dan juga bersedia bertanggung jawab atas pesanan yang telah dipesan",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#FB499C",
          cancelButtonColor: "#333333",
          confirmButtonText: "Ya, Saya Setuju",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            const message = createWhatsAppMessage();
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Buka WhatsApp dalam tab baru
            window.open(waUrl, "_blank");
          }
        });
      });
    });
  });