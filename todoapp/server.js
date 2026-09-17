const express = require('express');
const app = express();
app.use(express.json());

// --- DATABASE DUMMY ---
const users = [];
const projects = [];
const tasks = [];

// ==========================================
// FITUR 1: AUTENTIKASI (Dari PRD Programmer 1)
// ==========================================
app.post('/api/register', (req, res) => {
    const { nama, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    const newUser = { id: Date.now(), nama, email, password, role: role || 'Pengguna' };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) res.json({ success: true, token: "dummy-jwt-token-123", user });
    else res.status(401).json({ success: false, message: "Login gagal" });
});

// ==========================================
// FITUR 2: WORKSPACE & TASK (Dari PRD Programmer 2)
// ==========================================
// 1. Buat Proyek Baru[cite: 1]
app.post('/api/projects', (req, res) => {
    const { nama, deskripsi, owner_id } = req.body;
    const newProject = { id: Date.now(), nama, deskripsi, owner_id, members: [owner_id] };
    projects.push(newProject);
    res.status(201).json({ success: true, data: newProject });
});

// 2. Buat Tugas di dalam Proyek (Enum: Belum dikerjakan, Sedang dikerjakan, Selesai)[cite: 1]
app.post('/api/projects/:projectId/tasks', (req, res) => {
    const { judul, prioritas, status } = req.body;
    const projectId = parseInt(req.params.projectId);
    
    const newTask = { 
        id: Date.now(), 
        project_id: projectId, 
        judul, 
        prioritas: prioritas || 'Sedang', 
        status: status || 'Belum dikerjakan' 
    };
    tasks.push(newTask);
    res.status(201).json({ success: true, data: newTask });
});

// 3. Kalkulasi Progres Proyek (Selesai / Total * 100)[cite: 1]
app.get('/api/projects/:projectId/progress', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const projectTasks = tasks.filter(t => t.project_id === projectId);
    
    if (projectTasks.length === 0) {
        return res.json({ success: true, progress_percentage: 0 });
    }

    const completedTasks = projectTasks.filter(t => t.status === 'Selesai').length;
    const progress = Math.round((completedTasks / projectTasks.length) * 100);

    res.json({ success: true, progress_percentage: progress, total_tasks: projectTasks.length });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend Core JARA berjalan di http://localhost:${PORT}`);
});