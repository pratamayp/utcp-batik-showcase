export const useProducts = () => {
  const products = [
    {
      id: "parang-kusumo-sogan",
      nama: "Parang Kusumo Sogan",
      asal: "Solo",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590736962104-039986381613?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Motif Parang Kusumo yang klasik dengan warna sogan alam yang hangat dan berwibawa. Dibuat dengan teknik tulis tradisional oleh pengrajin berpengalaman di Solo.",
      filosofi:
        "Menggambarkan bunga yang sedang mekar, melambangkan kehidupan yang harus dijalani dengan penuh perjuangan namun tetap indah. Parang Kusumo juga melambangkan bangsawan dan keningratan.",
      seller: "Batik Danar Hadi",
      umkmPhone: "628123456789",
      umkmLocation: "Laweyan",
    },
    {
      id: "wahyu-tumurun-canting",
      nama: "Wahyu Tumurun Canting",
      asal: "Yogyakarta",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1590736962104-039986381613?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Batik tulis halus dengan motif Wahyu Tumurun yang penuh dengan simbol keberkahan. Menggunakan pewarna alami yang ramah lingkungan dan tahan lama.",
      filosofi:
        "Melambangkan turunnya petunjuk atau anugerah dari Yang Maha Kuasa untuk masa depan yang lebih baik. Sering digunakan oleh pasangan pengantin dengan harapan mendapatkan berkah keturunan.",
      seller: "Batik Winotosastro",
      umkmPhone: "628123456789",
      umkmLocation: "Mantrijeron",
    },
    {
      id: "pekalongan-buketan",
      nama: "Pekalongan Buketan",
      asal: "Pekalongan",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Ciri khas batik pesisir dengan motif rangkaian bunga yang cerah dan dinamis. Menonjolkan perpaduan warna yang berani dan teknik colet yang presisi.",
      filosofi:
        "Terinspirasi dari pengaruh Eropa dan Cina, melambangkan keterbukaan dan akulturasi budaya yang harmonis. Buketan sendiri berasal dari kata 'bouquet' yang berarti rangkaian bunga.",
      seller: "Oey Soe Tjoen",
      umkmPhone: "628123456789",
      umkmLocation: "Kedungwuni",
    },
    {
      id: "semarangan-warak-ngendog",
      nama: "Semarangan Warak Ngendog",
      asal: "Semarang",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1590736962104-039986381613?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Motif unik yang terinspirasi dari ikon budaya Semarang, Warak Ngendog. Perpaduan antara seni batik dan kearifan lokal yang sangat khas.",
      filosofi:
        "Simbol persatuan tiga etnis: Jawa, Arab, dan Cina yang hidup rukun berdampingan di Semarang. Menanamkan nilai toleransi dan kebersamaan.",
      seller: "Batik Semarang 16",
      umkmPhone: "628123456789",
      umkmLocation: "Tembalang",
    },
    {
      id: "sidomukti-magetan",
      nama: "Sidomukti Magetan",
      asal: "Solo",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Motif klasik yang sering digunakan dalam upacara adat pernikahan Jawa. Dibuat dengan ketelitian tinggi menggunakan canting nol.",
      filosofi:
        "Sido berarti jadi, Mukti berarti mulia. Berharap pemakainya mendapatkan kemuliaan dan kesejahteraan dalam hidup berumah tangga.",
      seller: "Batik Keris",
      umkmPhone: "628123456789",
      umkmLocation: "Grogol",
    },
    {
      id: "nitik-karawitan",
      nama: "Nitik Karawitan",
      asal: "Yogyakarta",
      image: "/images/hero.webp",
      images: [
        "/images/hero.webp",
        "https://images.unsplash.com/photo-1590736962104-039986381613?q=80&w=1000&auto=format&fit=crop",
      ],
      deskripsi:
        "Motif Nitik yang menyerupai anyaman, dibuat dengan ketelitian tingkat tinggi melalui teknik titik-titik kecil yang sangat rumit.",
      filosofi:
        "Melambangkan kesederhanaan, ketenangan, dan keteraturan dalam menjalani kehidupan bermasyarakat. Mencerminkan kearifan lokal dalam memandang alam.",
      seller: "Batik Rara Djonggrang",
      umkmPhone: "628123456789",
      umkmLocation: "Tirtodipuran",
    },
  ];

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return {
    products,
    getProductById,
  };
};
