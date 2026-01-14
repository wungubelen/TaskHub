// Inisialisasi AOS (Animasi Muncul saat Scroll)
// Pastikan library AOS sudah dipanggil di index.html
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}

// Fitur Utama: Manajemen Tugas menggunakan LocalStorage
// Memuat data yang sudah tersimpan di browser
let tasks = JSON.parse(localStorage.getItem('taskhub_data')) || [];

// Fungsi untuk menampilkan daftar tugas ke layar
function renderTasks() {
    const container = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    
    if (!container) return; // Mencegah error jika elemen tidak ditemukan

    container.innerHTML = '';
    taskCount.innerText = `${tasks.length} Tugas`;

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-clipboard-list text-slate-200 text-5xl mb-4"></i>
                <p class="text-slate-400 italic">Belum ada tugas hari ini. Mulai dengan menambah tugas baru!</p>
            </div>
        `;
        return;
    }

    tasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = "task-card bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm mb-4";
        div.innerHTML = `
            <div class="flex items-center space-x-4">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})" class="w-5 h-5 accent-blue-600 cursor-pointer">
                <div>
                    <h4 class="font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'} transition-all">${task.title}</h4>
                    <p class="text-xs text-slate-400 font-medium">
                        <i class="far fa-calendar-alt mr-1"></i> Deadline: ${task.date || 'Tidak ada'}
                    </p>
                </div>
            </div>
            <button onclick="deleteTask(${index})" class="text-slate-300 hover:text-red-500 transition-colors px-2">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        container.appendChild(div);
    });

    // Simpan perubahan ke memori browser
    localStorage.setItem('taskhub_data', JSON.stringify(tasks));
}

// Fungsi untuk menambah tugas baru
function addTask() {
    const input = document.getElementById('taskInput');
    const date = document.getElementById('dateInput');

    if (!input.value.trim()) {
        alert("Silakan isi nama tugas terlebih dahulu!");
        return;
    }

    tasks.push({
        title: input.value,
        date: date.value,
        completed: false
    });

    // Reset input setelah menambah
    input.value = '';
    date.value = '';
    renderTasks();
}

// Fungsi untuk menandai tugas selesai/belum
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
    if (confirm("Hapus tugas ini?")) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Menjalankan fungsi render pertama kali saat web dibuka
document.addEventListener('DOMContentLoaded', renderTasks);
