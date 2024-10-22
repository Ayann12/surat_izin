// Fungsi untuk menampilkan input 'alasan lainnya' jika dipilih
function toggleLainnya() {
    const alasanSelect = document.getElementById('alasan');
    const lainnyaGroup = document.getElementById('lainnya-group');

    if (alasanSelect.value === 'Lainnya') {
        // Tampilkan input untuk alasan lainnya
        lainnyaGroup.style.display = 'block';
    } else {
        // Sembunyikan input jika alasan lainnya tidak dipilih
        lainnyaGroup.style.display = 'none';
    }
}

function generatePDF() {
    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const sekolah = document.getElementById('sekolah').value;
    const tanggal = document.getElementById('tanggal').value;
    let alasan = document.getElementById('alasan').value;

    // Jika memilih alasan lainnya, ambil nilai dari input tambahan
    if (alasan === 'Lainnya') {
        const alasanLainnya = document.getElementById('alasanLainnya').value;
        if (!alasanLainnya) {
            alert("Harap isi alasan lainnya!");
            return;
        }
        alasan = alasanLainnya;
    }

    if (!nama || !kelas || !sekolah || !tanggal || !alasan) {
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
    doc.text(`Yang Terhormat,`, 20, 40);
    doc.text(`Bapak/Ibu Guru Wali Kelas ${kelas},`, 20, 50);
    doc.text(`Sekolah ${sekolah}`, 20, 60);

    doc.text(`Dengan ini, kami orang tua dari:`, 20, 80);
    doc.text(`Nama: ${nama}`, 20, 90);
    doc.text(`Kelas: ${kelas}`, 20, 100);
    doc.text(`Memberitahukan bahwa anak kami tidak dapat mengikuti kegiatan`, 20, 120);
    doc.text(`belajar mengajar pada tanggal ${tanggal}, dikarenakan ${alasan}.`, 20, 130);

    doc.text(`Demikian surat izin ini kami buat, atas perhatian Bapak/Ibu`, 20, 150);
    doc.text(`kami ucapkan terima kasih.`, 20, 160);

    doc.text(`Hormat kami,`, 20, 190);
    doc.text(`Orang tua/Wali murid`, 20, 200);

    // Menyimpan file PDF
    doc.save(`Surat_Izin_${nama}.pdf`);
}
