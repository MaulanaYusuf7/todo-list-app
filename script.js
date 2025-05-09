const inputTugas = document.getElementById("input-tugas");
const tombolTambah = document.getElementById("tombol-tambah");
const daftarTugas = document.getElementById("daftar-tugas");

const simpanTugas = () => {
  const semuaTugas = [];
  daftarTugas.querySelectorAll("li").forEach((li) => {
    semuaTugas.push({
      teks: li.querySelector("span").textContent,
      selesai: li.classList.contains("selesai"),
    });
  });
  localStorage.setItem("tugas", JSON.stringify(semuaTugas));
};

const tambahTugas = () => {
  const teksTugas = inputTugas.value.trim();

  if (teksTugas === "") {
    alert("Silahkan masukan nama tugas!");
    return;
  }

  const li = document.createElement("li");
  const spanTeksTugas = document.createElement("span");
  spanTeksTugas.textContent = teksTugas;
  li.appendChild(spanTeksTugas);

  const divTombolAksi = document.createElement("div");

  const tombolSelesai = document.createElement("button");
  tombolSelesai.textContent = "Selesai";
  tombolSelesai.classList.add("tombol-selesai");
  tombolSelesai.onclick = () => {
    li.classList.toggle("selesai");
    simpanTugas();
  };

  divTombolAksi.appendChild(tombolSelesai);

  const tombolHapus = document.createElement("button");
  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add("tombol-hapus");
  tombolHapus.onclick = () => {
    daftarTugas.removeChild(li);
    simpanTugas();
  };

  divTombolAksi.appendChild(tombolHapus);
  li.appendChild(divTombolAksi);
  daftarTugas.appendChild(li);

  inputTugas.value = "";
  simpanTugas();
};

const memuatTugas = () => {
  const tugasTersimpan = localStorage.getItem("tugas");
  console.log("Data mentah dari localStorage:", tugasTersimpan); // Untuk debugging

  if (tugasTersimpan) {
    try {
      const semuaTugas = JSON.parse(tugasTersimpan);
      semuaTugas.forEach((tugas) => {
        // ... (sisa kode Anda untuk membuat elemen li) ...
        // Pastikan semua properti yang diakses di sini (seperti tugas.teks dan tugas.selesai)
        // sesuai dengan apa yang Anda simpan di fungsi simpanTugas.

        const li = document.createElement("li");
        const spanTeksTugas = document.createElement("span");

        // Pastikan 'tugas.teks' ada dan valid
        if (tugas && typeof tugas.teks !== "undefined") {
          spanTeksTugas.textContent = tugas.teks;
        } else {
          spanTeksTugas.textContent = "Tugas tidak valid"; // Fallback
          console.warn("Objek tugas tidak memiliki properti 'teks':", tugas);
        }
        li.appendChild(spanTeksTugas);

        const divTombolAksi = document.createElement("div");
        const tombolSelesai = document.createElement("button");
        tombolSelesai.textContent = "Selesai";
        tombolSelesai.classList.add("tombol-selesai");

        if (tugas && typeof tugas.selesai === "boolean" && tugas.selesai) {
          li.classList.add("selesai");
        }

        tombolSelesai.onclick = () => {
          li.classList.toggle("selesai");
          simpanTugas();
        };
        divTombolAksi.appendChild(tombolSelesai);

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.classList.add("tombol-hapus");
        tombolHapus.onclick = () => {
          daftarTugas.removeChild(li);
          simpanTugas();
        };
        divTombolAksi.appendChild(tombolHapus);

        li.appendChild(divTombolAksi);
        daftarTugas.appendChild(li);
      });
    } catch (error) {
      console.error("Gagal mem-parse JSON dari localStorage:", error);
      console.error("Data yang bermasalah:", tugasTersimpan);
      // Opsi: Hapus data yang rusak agar tidak menyebabkan error lagi
      // localStorage.removeItem("tugas");
      // alert("Data tugas yang tersimpan rusak dan mungkin telah dihapus. Silakan muat ulang halaman.");
    }
  }
};

(() => {
  localStorage.clear();
  memuatTugas();

  tombolTambah.addEventListener("click", tambahTugas);

  inputTugas.addEventListener("keypress", () => {
    if (event.key === "Enter") {
      tambahTugas();
    }
  });
})();
