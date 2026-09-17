# Menggunakan base image Node.js versi ringan
FROM node:18-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dari folder todoapp ke dalam container
COPY todoapp/package.json ./

# Menginstal dependensi (Express, dll)
RUN npm install

# Menyalin seluruh sisa kode aplikasi dari folder todoapp
COPY todoapp/ ./

# Membuka port 3000 agar bisa diakses
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "server.js"]