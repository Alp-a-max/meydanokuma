const sahteLoglar = [
  "Sistem dinleniyor...",
  "Güvenlik duvarı taranıyor...",
  "Bağlantı noktaları kontrol ediliyor...",
  "Şifreleme anahtarı aranıyor...",
  "Erişim denemesi sürüyor...",
  "Kamera sistemleri devre dışı bırakılıyor...",
  "Güvenlik protokolleri analiz ediliyor...",
  "Şüpheli bağlantı güvenlik merkezine bildiriliyor..."
];

const toplamAdim = 40;
const adimAraligiMs = 500;
let ilerleme = 0;
let gecenAdim = 0;
let kilitKirmaZamanlayici = null;

const baslatButonu = document.getElementById("baslatButonu");
const ilerlemeMetni = document.getElementById("ilerlemeMetni");
const ilerlemeCubugu = document.getElementById("ilerlemeCubugu");
const ilerlemeDolumu = document.getElementById("ilerlemeDolumu");
const sistemMesaji = document.getElementById("sistemMesaji");
const logListesi = document.getElementById("logListesi");

function logEkle() {
  const rastgeleIndeks = Math.floor(Math.random() * sahteLoglar.length);
  const log = document.createElement("li");
  log.textContent = sahteLoglar[rastgeleIndeks];
  logListesi.appendChild(log);
  logListesi.scrollTop = logListesi.scrollHeight;
}

function barDoldur() {
  gecenAdim += 1;
  ilerleme = Math.min((gecenAdim / toplamAdim) * 100, 100);

  ilerlemeMetni.textContent = `${ilerleme}%`;
  ilerlemeDolumu.style.width = `${ilerleme}%`;
  ilerlemeCubugu.setAttribute("aria-valuenow", String(ilerleme));

  if (gecenAdim % 3 === 0) {
    logEkle();
  }

  if (ilerleme >= 100) {
    clearInterval(kilitKirmaZamanlayici);
    kilitKirmaZamanlayici = null;
    sistemMesaji.textContent = "SİSTEM KİLİTLENDİ - POLİS ARANIYOR";
    sistemMesaji.classList.add("alarm");
    baslatButonu.disabled = false;
    baslatButonu.textContent = "YENİDEN BAŞLAT";
  }
}

function simülasyonuBaslat() {
  if (kilitKirmaZamanlayici !== null) {
    return;
  }

  ilerleme = 0;
  gecenAdim = 0;
  ilerlemeMetni.textContent = "0%";
  ilerlemeDolumu.style.width = "0%";
  ilerlemeCubugu.setAttribute("aria-valuenow", "0");
  sistemMesaji.textContent = "SİSTEME ERİŞİM DENENİYOR...";
  sistemMesaji.classList.remove("alarm");
  logListesi.replaceChildren();
  logEkle();
  baslatButonu.disabled = true;
  baslatButonu.textContent = "SİMÜLASYON ÇALIŞIYOR...";

  kilitKirmaZamanlayici = setInterval(barDoldur, adimAraligiMs);
}

baslatButonu.addEventListener("click", simülasyonuBaslat);
