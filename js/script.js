function generatePDF() {
    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const sekolah = document.getElementById('sekolah').value;
    const tanggal = document.getElementById('tanggal').value;
    let alasan = document.getElementById('alasan').value;
    const namaOrtu = document.getElementById('namaOrtu').value;

    // Validasi input jika memilih alasan "Lainnya"
    if (alasan === 'Lainnya') {
        const alasanLainnya = document.getElementById('alasanLainnya').value;
        if (!alasanLainnya) {
            alert("Harap isi alasan lainnya!");
            return;
        }
        alasan = alasanLainnya;
    }

    // Validasi jika ada input yang kosong
    if (!nama || !kelas || !sekolah || !tanggal || !alasan || !namaOrtu) {
        alert("Harap isi semua kolom form!");
        return;
    }

    // Inisialisasi jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Pengaturan margin, spasi, dan lebar halaman
    const marginLeft = 20;
    const marginRight = 190;
    const contentWidth = marginRight - marginLeft;

    doc.setFont("helvetica", "normal");

    // Header Surat
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Surat Izin Siswa", 105, 20, null, null, "center");

    // Spasi antara elemen surat
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Tanggal di bagian kanan atas surat
    const rightAlignX = 170; // Menentukan posisi "kanan"
    doc.text(`Tanggal: ${tanggal}`, rightAlignX, 30, null, null, "right");

    // Isi surat
    doc.text("Yang Terhormat,", marginLeft, 50);
    doc.text(`Bapak/Ibu Guru Wali Kelas ${kelas},`, marginLeft, 60);
    doc.text(`Sekolah ${sekolah}`, marginLeft, 70);

    doc.text("Dengan ini, kami beritahukan bahwa anak saya:", marginLeft, 90);
    doc.text(`Nama: ${nama}`, marginLeft, 100);
    doc.text(`Kelas: ${kelas}`, marginLeft, 110);

    doc.text("Tidak dapat mengikuti kegiatan belajar mengajar pada:", marginLeft, 130);
    doc.text(`Tanggal: ${tanggal}, dikarenakan ${alasan}.`, marginLeft, 140);
    doc.text("Semoga Bapak/Ibu dapat memakluminya. Demikian surat izin ini kami buat.", marginLeft, 150);

    doc.text("Atas perhatian Bapak/Ibu kami ucapkan terima kasih.", marginLeft, 170);

    // Penempatan tanda tangan dan nama orang tua di sebelah kanan sejajar dengan tanggal
    doc.text("Hormat kami,", rightAlignX, 210, null, null, "right");
    doc.text("Orang tua/Wali murid,", rightAlignX, 220, null, null, "right");
    doc.text(`${namaOrtu}`, rightAlignX, 240, null, null, "right");

    // Menyimpan file PDF dengan nama berdasarkan nama siswa
    doc.save(`Surat_Izin_${nama}.pdf`);
}

// Menampilkan input alasan lainnya jika dipilih
function toggleLainnya() {
    const alasan = document.getElementById('alasan').value;
    const lainnyaGroup = document.getElementById('lainnya-group');

    // Tampilkan input "Alasan Lainnya" jika opsi "Lainnya" dipilih
    if (alasan === 'Lainnya') {
        lainnyaGroup.style.display = 'block';
    } else {
        lainnyaGroup.style.display = 'none';
    }
}
