function generatePDF() {
    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const sekolah = document.getElementById('sekolah').value;
    const tanggal = document.getElementById('tanggal').value;
    let alasan = document.getElementById('alasan').value;
    const namaOrtu = document.getElementById('namaOrtu').value;

    // Jika memilih alasan lainnya, ambil nilai dari input tambahan
    if (alasan === 'Lainnya') {
        const alasanLainnya = document.getElementById('alasanLainnya').value;
        if (!alasanLainnya) {
            alert("Harap isi alasan lainnya!");
            return;
        }
        alasan = alasanLainnya;
    }

    if (!nama || !kelas || !sekolah || !tanggal || !alasan || !namaOrtu) {
        alert("Harap isi semua kolom form!");
        return;
    }

    // Inisialisasi jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Menulis surat di PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Surat Izin Siswa", 105, 20, null, null, "center");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const marginLeft = 20; // Margin kiri
    const marginRight = 190; // Batas margin kanan

    // Menambahkan isi surat dengan perataan rata kanan-kiri
    doc.text(`Yang Terhormat,`, marginLeft, 40);
    doc.text(`Bapak/Ibu Guru Wali Kelas ${kelas},`, marginLeft, 50);
    doc.text(`Sekolah ${sekolah}`, marginLeft, 60);
    doc.text(`Dengan ini, kami beritahukan bahwa anak saya yang ber:`, marginLeft, 80);
    doc.text(`Nama: ${nama}`, marginLeft, 90);
    doc.text(`Kelas: ${kelas}`, marginLeft, 100);
    doc.text(`Memberitahukan bahwa anak kami tidak dapat mengikuti kegiatan`, marginLeft, 120);
    doc.text(`belajar mengajar pada tanggal ${tanggal}, dikarenakan ${alasan}.`, marginLeft, 130);
    doc.text(`Demikian surat izin ini kami buat, atas perhatian Bapak/Ibu kami ucapkan terima kasih.`, marginLeft, 140);

    // Menempatkan Hormat kami dan nama orang tua di sebelah kanan
    const rightMargin = 170;  // Mengatur posisi lebih ke kanan
    doc.text(`Hormat kami,`, rightMargin, 190, null, null, "right");
    doc.text(`Orang tua/Wali murid`, rightMargin, 200, null, null, "right");
    doc.text(`${namaOrtu}`, rightMargin, 220, null, null, "right");

    // Menyimpan file PDF
    doc.save(`Surat_Izin_${nama}.pdf`);
}
