const express = require('express');
const app = express();
app.use(express.json());

// Simulasi Database User sementara
const users = [];

// Endpoint: Registrasi Akun[cite: 1]
app.post('/api/register', (req, res) => {
    const { nama, email, password, role } = req.body;
    
    // Validasi sederhana
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email dan password wajib diisi", errors: [] });
    }

    // Pembuatan user baru (Pada sistem asli, password akan di-hash bcrypt[cite: 1])
    const newUser = { id: Date.now(), nama, email, password, role: role || 'Pengguna' };
    users.push(newUser);
    
    res.status(201).json({ success: true, data: newUser });
});

// Endpoint: Login Akun[cite: 1]
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Cek kecocokan data
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Mengembalikan token JWT dummy jika berhasil[cite: 1]
        res.json({ success: true, message: "Login berhasil", token: "dummy-jwt-token-123" });
    } else {
        res.status(401).json({ success: false, message: "Email atau kata sandi salah", errors: [] });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend Core JARA berjalan di http://localhost:${PORT}`);
});